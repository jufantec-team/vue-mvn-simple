<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>测试页面1：接口测试</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="接口ID：">
            <el-input v-model="form.service_code"></el-input>
          </el-form-item>
          <el-form-item label="参数：">
            <el-input type="textarea" v-model="form.json" :rows="5" placeholder="请输入json字符串"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        service_code: 'helloServiceTest',
        json: '{}'
      }
    }
  },
  methods: {
    submit () {
      try{
        let json = JSON.parse(this.form.json);
        console.log(json);
        this.$api.call(this.form.service_code, json).then(data=>{
          this.$alert(JSON.stringify(data), '服务端返回：', {type: 'success'})
        }) 
      }catch(e){
        this.$alert(e, 'json 格式错误：', {type: 'warning'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

