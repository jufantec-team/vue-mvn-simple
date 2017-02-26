<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>测试页面2：数据查询</h1>
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
          <el-table-column prop="status" label="状态" width="80"></el-table-column>
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
        <div style="text-align:center; margin-top: 5px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cutPage.page"
            :page-size="cutPage.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 50, 100, 200]"
            :total="cutPage.count">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 给弹出窗口绑定回调事件 -->
    <test2-edit v-model="row" :show="editVisible" v-on:hide="hide" v-on:submit="submitEdit"></test2-edit>
    <test2-add v-model="addVisible" v-on:submit="submitAdd"></test2-add>
  </div>
</template>

<script>
import test2Edit from './test2-edit.vue'
import test2Add from './test2-add.vue'

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
      cutPage: {
        result: [],
        count: 0,
        page: 1,
        page_size: 100
      },
      isLoading: false,
      editVisible: false,   //弹出窗口显示
      addVisible: false,
      row: {
        sex: ''   //必须给下拉列表一个初始值
      },    //选中的行
      chooseRow: -1   //选中的行号
    }
  },
  methods: {
    search () {
      this.$api.call(
        'S90003',
        {
          name: this.form.name, 
          page_size: this.cutPage.page_size, 
          page: this.cutPage.page
        }, 
        options,
        this
      ).then(data=>{
        console.log(data)
        this.$set(this.cutPage, 'result', data.result)
        this.cutPage.count = data.count
        this.cutPage.page = data.page
      })
    },
    handleEdit (line, row){
      this.editVisible = true   //显示弹出窗口
      this.chooseRow = line     //保存选中的行号
      Object.assign(this.row, row)    //合并对象，基本等同于下面的for
      // for(let i in row){        //此种方式可取消row与result[line]之间的响应式变量，为了保证弹出窗口只有在点击保存时才修改的表格中的内容
      //   this.row[i] = row[i]
      // }
      //如果弹出窗口只用来显示， this.row=row即可，也不需要 chooseRow 变量
    },
    handleDel (line, row){
      this.$confirm(`确定要删除 ${row.name} 用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.call(
          'P90003', 
          {user_id: row.user_id},
          options,
          this
        ).then(data=>{
          this.cutPage.result.splice(line, 1);
          this.cutPage.count --;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.cutPage.page_size = val
      this.search()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.cutPage.page = val
      this.search()
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
    test2Edit, test2Add
  }
}
</script>
