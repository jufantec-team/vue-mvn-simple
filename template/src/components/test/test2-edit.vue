<template>  
  <el-dialog title="修改用户信息" v-model="show" size="tiny" v-on:close="close">
    <el-form :model="value" label-width="80px" v-loading="isLoading" element-loading-text="正在保存，请稍候...">
      <el-form-item label="用户ID">
        <el-input v-model="value.user_id" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="value.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="value.sex" placeholder="性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="value.age"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="value.create_date"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
  export default {
    props: ['value', 'show'],
    data (){
      return {
        isLoading: false
      }
    },
    methods: {
      close (){
        this.$emit('hide', false)
      },
      submit (){
        this.$api.call('P90002', 
          this.value, 
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
          this.$emit('hide', false)
          this.$emit('submit')
        })
      }
    }
  };
</script>