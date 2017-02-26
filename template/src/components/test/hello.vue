<template>
  <div class="hello">
    <h1>测试页面 hello world</h1>
    <p></p>
    <el-button @click="hello" class="btn">调用成功</el-button>
    <el-button @click="fail" class="btn">调用失败</el-button>
    <el-button @click="custom" class="btn">自定时失败提示</el-button>
    <el-button @click="timeout" class="btn">调用超时</el-button>
    <el-button @click="query" class="btn">查询sql</el-button>
    <el-button @click="update" class="btn">更新sql</el-button>
  </div>
</template>

<script>
import { Loading } from 'element-ui';

export default {
  data () {
    return {
    }
  },
  methods: {
    hello () {
      this.$api.call('helloServiceTest').then((data)=>{
        this.$alert(`服务端返回：${data.str}`, '调用成功：', {type: 'success'})
      })
    },
    fail () {
      this.$api.call()
    },
    custom () {
      this.$api.call('', {}, {noAlert: true}).then(null, (head)=>{
        this.$alert('自定义的失败提示', '调用失败！', {type: 'warning'})
      })
    },
    timeout (){
      this.$api.call('helloServiceTest', {timeout: 5}, {timeout: 3000}).then((data)=>{
        console.log('调用成功：', data)
      }, (head)=>{
        console.log(`调用失败：${head.code} - ${head.desc}`)
      })
    },
    query (){
      this.$api.queryScript('get_user_test', {username: 'lianzt'}).then(data =>{
        this.$alert(JSON.stringify(data))
      })
    },
    update (){
      this.$api.modifyScript('del_user_test', {user_id: 'test'}).then(data =>{
        this.$alert(JSON.stringify(data))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  margin-left: 50px;
}
</style>
