<template>
  <el-dialog title="新增用户信息" v-model="value" size="tiny" v-on:close="close">
    <el-form :model="user" label-width="80px" v-loading="isLoading" element-loading-text="正在保存，请稍候...">
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="user.sex" placeholder="性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="user.age"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
  export default {
    props: ['value'],
    data (){
      return {
        user: {
          sex: ''   //下拉列表必须有一个初始值
        },
        isLoading: false
      }
    },
    methods: {
      close (){
        this.$emit('input', false)    //传递弹出窗口的 input 事件，该事件由 v-model 绑定
      },
      submit (){
        this.$api.call('P90001', 
          this.user, 
          {
            before (){
              this.isLoading = true
            },
            after(){
              this.isLoading = false
            }
          }, 
          this
        ).then(data =>{
          this.$set(this.user, 'user_id', data.user_id)
          this.$emit('submit', this.user)
          this.$set(this, 'user', {})
          this.close()
        })
      }
    }
  };
</script>