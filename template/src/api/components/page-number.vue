<template>
  <div :class="className">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cutPage.page"
      :page-size="cutPage.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 50, 100, 200]"
      :total="cutPage.count">
    </el-pagination>
  <div>
</template>
<script type="text/javascript">
  export default {
    props: {
      cutPage: Object,
      search: Function,
      className: {
        type: String,
        default: 'page-number-default'
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cutPage.page_size = val
        this.search()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.cutPage.page = val
        this.search()
      }
    }
  }
</script>

<style type="text/css">
  .page-number-default{
    text-align:center;
    margin-top: 5px;
  }
</style>