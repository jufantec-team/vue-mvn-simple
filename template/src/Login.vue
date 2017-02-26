<template>
  <div class="body">
    <el-row>
      <el-col :span="8">&nbsp;</el-col>
      <el-col :span="8">
        <div class="jf-grid-content">
          <div class="jf-page-title">欢迎使用</div>
          <form class="jf-login-form">
            <el-input v-model="user" placeholder="请输入用户名"></el-input>
            <el-input v-model="psw" type="password" placeholder="请输入密码"></el-input>
            <el-button type="primary" @click="login" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
          </form>
        </div>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        user: 'admin',
        psw: '123123',
        fullscreenLoading: false
      }
    },
    methods: {
      login () {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          if (this.user === 'admin' && this.psw === '123123'){
            location.href='app.html'
          }
        }, 1000);
      }
    }
  }
</script>
<style type="text/css">
  body{
    margin: 0px;
  }
  .body{
    background-image: url(assets/login-back.jpg);
    /*background-color: #58B7FF;*/
    width: 100%;
    height: 850px;
  }
  .jf-grid-content {
    border-radius: 8px;
    min-height: 36px;
    width: 100%;
    height: 360px;
    background-color: #F9FAFC;
    margin-top: 120px;
  }
  .jf-grid-content:hover{
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
  }
  .jf-page-title{
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 32px;
  }
  .jf-login-form{
    margin: 50px auto;
    width: 80%;
    text-align: center;
  }
  .jf-login-form input{
    margin-bottom: 20px;
  }
</style>