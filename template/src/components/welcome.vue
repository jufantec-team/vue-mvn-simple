<template>
  <el-row>
    <el-col :span="5">
      <el-row>
        <div class="jf-welcome-top">
          <div class="jf-logo"> <img src="../assets/logo.png"> </div>
          <p class="jf-logo-title">欢迎使用：admin</p>
        </div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="jf-welcome-menu">
            <el-menu class="el-menu-vertical-demo" @select="handleSelect" theme="dark">
              <pl-menu v-for="item in getRoutes" :menu-node="item"></pl-menu>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="19">
      <el-row>
        <el-col :span="24">
          <div class="jf-nav">
            <!-- <div class="jf-nav-search">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="jf-nav-left">
              <el-button type="primary" icon="search">搜索</el-button>
            </div> -->
            <div class="jf-nav-right">
              <el-button type="primary" icon="upload2">退出</el-button>
            </div>
            <div class="jf-nav-right">
              <el-button type="primary" icon="setting">设置</el-button>
            </div>
            <div class="jf-nav-right">
              <el-button type="primary" icon="message">信息</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="jf-work-area">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="jf-buttom">
            版权所有：jufantech
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import plMenu from './pl-menu.vue'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    created (){
      this.loadParamets()
    },
    computed:{
      ...mapGetters(['getRoutes'])
    },
    methods: {
      ...mapActions(['loadParamets']),
      handleSelect(key, keyPath){
        var menuObj = this.getMenu(key);
        console.log('选择的菜单：', menuObj);
        var tab = {
          name: key,
          title: menuObj.name
        };
        this.$router.push(key)    //路由跳转到页面
      },
      getMenu ( path) {
        var stack = [];
        for(var i=0, len=this.getRoutes.length; i<len; i++){
          stack.push(this.getRoutes[i])
        }
        var obj;
        while(stack.length && !obj){
          var menu = stack.pop();
          if (menu.path === path){
            return menu;
          }
          if (menu.children){
            for(var i=0, len=menu.children.length; i<len; i++){
              stack.push(menu.children[i])
            }
          }
        }
        return null;
      }
    },
    components: {
      plMenu
    }
  }
</script>
<style type="text/css">
  body{
    background-color: #fff;
    margin: 0px;
  }
  .jf-welcome-top{
    width: 100%;
    height: 120px;
    background-color: #324057;
    padding-top: 20px;
  }
  .jf-welcome-menu{
    height: 680px;
    overflow-y: auto;
  }

  .jf-welcome-menu::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .jf-logo{
    width:60px; 
    height:60px; 
    background-color: #fff;
    border-radius:50%; 
    margin: auto;
    overflow:hidden;
  }
  .jf-logo img{
    width: 60px;
    height: 60px;
  }
  .jf-logo-title{
    text-align: center;
    color: #fff;
  }
  .jf-tabs{
    /*background-color: #555;*/
  }
  .jf-nav{
    width: 100%;
    height: 40px;
    background-color: #20a0ff;
  }
  .jf-nav .jf-nav-search{
    float: left;
    width: 240px;
    height: 40px;
    margin-left: 35%;
    line-height: 36px;
  }
  .jf-nav .jf-nav-left{
    float: left;
    height: 40px;
    margin-left: 5px;
    line-height: 36px;
  }
  .jf-nav .jf-nav-right{
    float: right;
    height: 40px;
    margin-right: 10px;
    line-height: 36px;
  }
  .jf-work-area{
    padding: 5px 10px 5px 10px;
    height: 735px;
    overflow-y: auto;
  }
  .jf-buttom{
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #EFF2F7;
    font-size: 14px;
  }

  /* 修改element-ui框架的样式 */
  .el-tabs__item{
    float: none;
    display: inline-block;
  }
  .el-tabs__header{
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .el-menu{
    border-radius: 0px;
  }
  .el-tabs__header{
    /*background-color: #58B7FF;*/
  }
</style>