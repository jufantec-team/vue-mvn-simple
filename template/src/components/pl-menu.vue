<template>
<div>
  <el-submenu :index="menuNode.path">
    <template slot="title">{{ menuNode.name }}</template>
    <!-- 递归组件，调用自身 -->
    <pl-menu v-if="menuNode.children && menuNode.children.length" v-for="item in fileterChildren(menuNode.children, '1')" :menu-node="item"></pl-menu>
    <el-menu-item v-for="child in fileterChildren(menuNode.children, '0')" :index="child.path">{{ child.name }}</el-menu-item>
  </el-submenu>
</div>
</template>
<script type="text/javascript">
  export default {
    name: 'pl-menu',
    props: {
      menuNode: Object
    },
    methods: {
      fileterChildren (menu, type){
        const arr = [];
        for(var i in menu){
          if (menu[i].type == type){
            arr.push(menu[i])
          }
        }
        return arr;
      }
    }
  }
</script>