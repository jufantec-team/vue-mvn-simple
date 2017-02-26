<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>测试页面4：数据查询新版API</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <el-form :model="form" :inline="true">
          <el-form-item>
            <el-input v-model="form.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-table :data="cutPage.result" border style="width: 100%;" :height="530" v-loading="isLoading" element-loading-text="查询中，请稍候...">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="user_id" label="用户id" width="220"></el-table-column>
          <el-table-column prop="username" label="用户名" width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80"></el-table-column>
          <el-table-column prop="age" label="年龄" width="80"></el-table-column>
          <el-table-column label="状态" width="100">
            <template scope="scope">
              {{ getStatusParam[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column prop="create_date" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template scope="scope">
              <el-tooltip effect="dark" content="修改" placement="top" style="display: inline-block">
                <el-button size="mini" type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="top" style="display: inline-block">
                <el-button size="mini" type="danger" icon="delete" @click="handleDel(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <page-number :cut-page="cutPage" :search="search" className="page-number"></page-number>
      </el-col>
    </el-row>
    <!-- 给弹出窗口绑定回调事件 -->
    <test4-edit v-model="row" :show="editVisible" v-on:hide="hide" v-on:submit="submitEdit"></test4-edit>
    <test4-add v-model="addVisible" v-on:submit="submitAdd"></test4-add>
  </div>
</template>

<script>
import test4Edit from './test4-edit.vue'
import test4Add from './test4-add.vue'
import { mapGetters } from 'vuex'

//设置页面默认的 ajax 等待提示
let options = {
  before (){
    this.isLoading = true
  },
  after(){
    this.isLoading = false
  }
};

export default {
  data () {
    return {
      form: {
        name: ''
      },
      cutPage: this.$api.getCutPage(),
      isLoading: false,
      editVisible: false,   //弹出窗口显示
      addVisible: false,
      row: {
        sex: '',   //必须给下拉列表一个初始值
        status: ''
      },    //选中的行
      chooseRow: -1   //选中的行号
    }
  },
  computed: {
    ...mapGetters(['getParamets']),
    getStatusParam (){
      return this.getParamets['pl_user.status']
    }
  },
  methods: {
    search () {
      this.$api.cutPage('search_user_test', this.form, this.cutPage, options, this).then(array =>{
        console.log('res array: ', array)
      })
    },
    handleEdit (line, row){
      this.editVisible = true   //显示弹出窗口
      this.chooseRow = line     //保存选中的行号
      for(let i in row){        //此种方式可取消row与result[line]之间的响应式变量，为了保证弹出窗口只有在点击保存时才修改的表格中的内容
        this.row[i] = row[i]
      }
      //如果弹出窗口只用来显示， this.row=row即可，也不需要 chooseRow 变量
    },
    handleDel (line, row){
      this.$confirm(`确定要删除 ${row.name} 用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$api.delete('pl_user').where({user_id: row.user_id}).exec(options, this);
      }).then(data =>{
        this.cutPage.result.splice(line, 1);
        this.cutPage.count --;
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      });
    },
    submitEdit (){
      //点击编辑的回调
      let row = this.cutPage.result[this.chooseRow];
      Object.assign(row, this.row)    //合并对象
    },
    submitAdd (user){
      //点击新增的回调
      this.cutPage.result.push(user)
      this.cutPage.count ++
    },
    hide (v){
      //关闭窗口回调
      this.editVisible = v
    }
  },
  components: {
    test4Edit, test4Add
  }
}
</script>

<style type="text/css">
  .page-number{
    text-align: center;
    margin-top: 5px;
  }
</style>