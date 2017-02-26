import Vue from 'vue'
import VueRouter from 'vue-router'
import { MessageBox } from 'element-ui';

import store from '../store'

import limit from '../data/limit.json'   //权限测试数据

Vue.use(VueRouter)

const welcomeChildren = []

//对于路由信息，可以在进入页面时加载所有路由，路由信息只有两层结构，菜单信息是多层结构。
const menu = store.getters.getRoutes

//延时路由构造器，由于js作用域问题，需要单独封装成函数
const getResolve = component => {
  return resolve => {
    //先设置一个定时器，显示打开失败提示
    let timer = setTimeout((comp)=>{
      MessageBox.alert(component, '打开页面失败：', {
                    type: 'error',
                    confirmButtonText: '确定'
                  })
      }, 
    800, component);

    require(['../components' + component], (comp)=>{
      clearTimeout(timer)   //请求成功后取消定时器，失败提示就不会再显示
      resolve(comp)
    })

    // 使用webpack 2.0 版本以上时， require 会返回 promise 对象，可以更好地处理异常
    // require(['../components' + component], resolve)
    // .then(()=>{
    //   //成功回调，什么也不做
    // },(e)=>{    //失败回调
    //   alert(e)    //打开页面错误的时候组出提示
    // })
  }
}

//把菜单加载到路由中，菜单是多级的，但是嵌套路由只是二级的
const put = (menu) => {
  for (var i in menu) {
    var m = menu[i]
    if (m.children) {
      m.path = '/welcome/' + m.m_id
      put(m.children)
    } else {
        welcomeChildren.push({
          path: m.path,
          component: getResolve(m.template)
      })
    }
  }
}
//加载路由信息
put(menu)

//异常页面
welcomeChildren.push({ path: '/welcome/error/:msg', component: require('../components/error.vue') })

const routes = [
  // { path: '/login', component: require('../components/Login.vue') },
  { path: '/welcome', component: require('../components/welcome.vue'), children: welcomeChildren },
]

console.log(routes)

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/**
 * 权限判断，虽然菜单中只包含了有权限的菜单，但是路由中包含了全部菜单，所以需要增加权限判断，当用户试图进入权限外的菜单时，给出提示
 */
router.beforeEach((to, from, next) => {
  console.log('跳转到：' + to.path)
  //一些系统框架的菜单不参与权限校验
  if (to.path.indexOf('/error/') === -1 && to.path.indexOf('/welcome') === 0 && to.path !== '/welcome'){
    let mId = to.path.split('/').pop()
    console.log(`m_id: ${mId}, limit:${mId in limit}`)
    // 把to与菜单中的权限做比较
    if (limit.indexOf(mId) === -1){
      console.log('权限不足：' + to.path)
      next('/welcome/error/权限不足')
      return
    }
  }
  next()
})

router.push('/welcome')
// router.push('/welcome')

export default router;