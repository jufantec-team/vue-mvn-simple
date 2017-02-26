<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>测试页面5：js orm</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form ref="form" label-width="160px">
          <el-form-item label="from: ">
            <el-input v-model="from"></el-input>
          </el-form-item>
          <el-form-item label="data：">
            <el-input type="textarea" v-model="data" :rows="5" placeholder="请输入json字符串"></el-input>
          </el-form-item>
          <el-form-item label="where：">
            <el-input type="textarea" v-model="where" :rows="3" placeholder="请输入json字符串"></el-input>
          </el-form-item>
          <el-form-item label="select：">
            <el-input v-model="select"></el-input>
          </el-form-item>
          <el-form-item label="asc：">
            <el-input v-model="asc"></el-input>
          </el-form-item>
          <el-form-item label="desc：">
            <el-input v-model="desc"></el-input>
          </el-form-item>
          <el-form-item label="sql：">
            <el-input v-model="sql" readonly></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">save</el-button>
            <el-button type="primary" @click="merge">merge</el-button>
            <el-button type="primary" @click="del">delete</el-button>
            <el-button type="primary" @click="query">query</el-button>
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
      data: '',
      where: '',
      select: '',
      from: '',
      asc: '',
      desc: '',
      sql:''
    }
  },
  methods: {
    save(){
      try{
        let opt = this.$api.save(this.from)
          .data(JSON.parse(this.data))
        this.sql = JSON.stringify(opt.sql)
        opt.exec().then((data)=>{
          console.log()
        }, (head)=>{
          console.log('失败回调：', head)
        })
      }catch(e){
        this.$alert('json字符串格式错误')
      }   
    },
    merge(){
      try{
        let opt = this.$api.merge(this.from)
          .data(JSON.parse(this.data))
          .where(JSON.parse(this.where))
        this.sql = JSON.stringify(opt.sql)
        opt.exec()
      }catch(e){
        this.$alert('json字符串格式错误')
      }   
    },
    del(){
      try{
        let opt = this.$api.delete(this.from)
          .where(JSON.parse(this.where))
        this.sql = JSON.stringify(opt.sql)
        opt.exec()
      }catch(e){
        this.$alert('json字符串格式错误')
      }   
    },
    query(){
      try{
        let opt = this.$api.query(this.from)
          .where(JSON.parse(this.where))
          .asc(this.asc)
          .desc(this.desc)
        this.sql = JSON.stringify(opt.sql)
        opt.exec((data)=>{
          console.log(data)
        })
      }catch(e){
        this.$alert('json字符串格式错误')
      }
    }
  }
}
</script>
