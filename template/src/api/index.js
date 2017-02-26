import Vue from 'vue'
import VueResource from 'vue-resource'
import { MessageBox } from 'element-ui';
import { Loading } from 'element-ui';
import DataTemplate from './data-template'
import md5 from './md5'
import pageNumber from './components/page-number.vue'

Vue.use(VueResource)

Vue.component('page-number', pageNumber);

const projectName = 'java-web'
const apiUrl = '/' + projectName +'/api/{service}.do';
const jsonUrl = '/' + projectName + '/json.do';
const key = '514En*mJ0hVeL&e0M!fFQ3o&xhAch#zC'
const CUT_PAGE_SERVICE = 'cutPageOracle';
const GET_DATA_SERVICE = 'getDataFrame'
const SAVE_DATA_SERVICE = 'applyDataFrame'
const QUERY_SCRIPT_SERIVCE = 'queryScriptFrame'
const MODIFY_SCRIPT_SERVICE = 'modifyScriptFrame'
const TRANSCACT_SERVICE = 'transactFrame'

const isDebug = Vue.config.debug || !Vue.config.silent;
const nolog = ()=>{}    //空函数
const debug = (...args) =>{
  if (isDebug && console){
    console.log(...args)
  }
}
const warn = (...args) =>{
  if (console.warn){
    console.warn(...args)
  }else{
    console.log && console.log(...args)
  }
}
const error = (...args) =>{
  if (console.error){
    console.error(...args)
  }else{
    console.log && console.log(...args)
  }
}

/**
 * 生成一个签名头
 */
function signJson(json){
  let jsonStr = JSON.stringify(json);
  let Timestamp = new Date().getTime().toString();
  let sign = md5(`${jsonStr}^${Timestamp}^${key}`)
  return {
    Timestamp: Timestamp,
    Sesame: sign
  }
}

/**
 * vue 插件中的 this.$api 对象
 */
const api = {
  name: projectName,
  /**
   * 返回一个Promise，后续使用then增加成功与失败回调
   * opt为 vue-resource 的post方法参数，增加以下属性：
   * noAlert：为true时不弹出失败提示，只针对业务失败
   * 如果需要在 before 与 after 函数中使用 this, 需要传入 context=this
   */
  call (service, body={}, opt={}, context){
    let url = apiUrl.replace('{service}', service)
    // body.service_code = service     //把Service放入请求body
    return new Promise((success, err)=>{
      let timeout = opt.timeout || 30000    //如果没有设置超时时间，使用默认的时间
      //合并请求的 vue-resource 插件选项
      let options = {
        headers: signJson(body),
        timeout,
        ...opt
      }
      //自定义失败回调函数，如果设置了noAlert参数，将不再弹出提示框
      let fail = options.noAlert ? err : (responseMsg)=>{
        MessageBox.alert(`${responseMsg.code} - ${responseMsg.desc}`, '请求失败：', {
          type: 'error',
          confirmButtonText: '确定'
        }).then(()=>{
          err(responseMsg)
        })
      }
      //请求超时定时器
      let timer = setTimeout(()=>{
        debug('request timeout!')
        after()     //超时也是请求结果，需要执行after
        //超时的提示报文
        let responseMsg = {
          code: '901',
          desc: '请求超时，请检查操作是否成功！'
        }
        fail(responseMsg)   //执行
      }, timeout)

      let loadingInstance     //窗口等待提示句柄
      let before = options.before   //由于需要修改 before 与 after 函数的上下文this，此处先缓存bofore函数
      options.before = ()=>{    //设置 vue-resource 的 before 函数，如果用户定义了before，将不再进入默认before
        if (typeof (before) === 'function'){
          if (context && context.$api){
            before.call(context)      //给自定义的before设置上下文this
          }else{
            throw new Error('未传入 context 配置，参考：this.$api.call(service, body={}, opt={}, context)');
          }
        }else{
          loadingInstance = Loading.service({
            body: true,
            fullscreen: true,
            lock: true,
            text: '加载中...'
          });
        }
      }
      //定义 after，请求结束后不管成功失败，都会进入
      let after = ()=>{
        timer && clearTimeout(timer)    //判断是否需要取消定时器
        loadingInstance && loadingInstance.close()    //判断是否需要关闭提示框
        if (typeof(options.after) === 'function'){    //进入参数中的after函数
          if (context && context.$api){
            options.after.call(context)     //给自定义的after设置上下文this
          }else{
            throw new Error('未传入 context 配置，参考：this.$api.call(service, body={}, opt={}, context)');
          }
        }
      }

      //开始请求
      Vue.http.post(url, body, options)
      .then(res => {
        //执行成功
        after()   //成功时也是请求结果
        //结果转json
        res.json().then(data=>{
          debug('response body: ', data)
          let head = data.head
          //从服务端返回成功后，还需要判断业务是否执行成功
          if (!head){
            error('响应头格式错误')
            fail({
              code: '903',
              desc: '响应头格式错误'
            })
          }else if (head.response_code === '000000'){
            success(data)
          }else{
            error('调用失败：', head)
            fail({
              code: head.response_code,
              desc: head.response_desc
            })
          }
        }, error=>{
          //结果转json失败
          error('响应报文格式错误：', error)
          fail({
            code: '902',
            desc: '响应报文格式错误',
            error: error
          })
        })
      }, res => {
        //请求失败
        after()   //失败时也需要执行after
        error('response error: ', res)
        fail({
          code: res.status,
          desc: res.statusText,
          response: res
        })
      })
    })
  },

  /**
   * 返回一个 sql 对象，参数可为空
   */
  data (json){
    return new DataApi().data(json)
  },

  query (table){
    return new DataApi().from(table).option('select')
  },

  save (table){
    return new DataApi().from(table).option('insert')
  },

  merge (table){
    return new DataApi().from(table).option('update')
  },

  delete (table){
    return new DataApi().from(table).option('delete')
  },

  /**
   * 执行查询SQL语句，sql语句中不能有?号
   * @sql{string} sqlName
   * @args{object} sql参数
   */
  queryScript (sql, args, options, context){
    let body = {
      sql, args
    }
    return api.call(QUERY_SCRIPT_SERIVCE, body, options, context)
  },

  /**
   * 执行更新sql语句，sql语句中不能有？号
   * @sql{string} sqlName
   * @args{object} sql参数
   */
  modifyScript (sql, args, options, context){
    let body = {
      sql, args
    }
    return api.call(MODIFY_SCRIPT_SERVICE, body, options, context)
  },

  /**
   * 在事务中执行我个sql
   * @list[array] DataTemplate 对象的数组 
   */
  transcact(list, options, context){
    let body = {
      transact: list
    }
    return api.call(TRANSCACT_SERVICE, body, options, context)
  },

  /**
   * 分页查询
   * @param sql 执行的SQL，service不为默认值时有效
   * @param args 参数
   * @param options vue-resoure的options
   * @param context 通常为this
   * @param service 
   */
  cutPage(sql, args, page, options, context, service=CUT_PAGE_SERVICE){
    let body = {
      sql, args,
      page_size: page.page_size, 
      page: page.page
    }
    return api.call(service, body, options, context).then(data => {
      this.setCutPage(page, data)
      return new Promise((suc, err) => {
        suc(data.result)
      })
    })
  },

  /**
   * 返回一个分页查询的请求json
   */
  getCutPage(){
    return{
      result: [],
      count: 0,
      page: 1,
      page_size: 100
    }
  },

  /**
   * 从返回数据中设置页码
   */
  setCutPage(cutPage, data){
    Vue.set(cutPage, 'result', data.result)
    cutPage.count = data.count
    cutPage.page = data.page
  }

}

/**
 * 继承基础的sql类，增加运行SQL的功能代码
 */
class DataApi extends DataTemplate{
  constructor(){
    super()
  }

  /**
   * 运行SQL，并返回一个 promise 对象
   */
  exec(opt, context){
    debug('执行数据操作：', this.sql)
    if (this.sql.option === 'select'){
      return api.call(GET_DATA_SERVICE, {data: this.sql}, opt, context)
    }else{
      return api.call(SAVE_DATA_SERVICE, {data: this.sql}, opt, context)
    }
  }
}

/**
 * 装载 vue 插件
 */
function install(Vue){  
    if (install.installed) {
        return;
    }

    Vue.prototype.$api = api
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  install, api
}