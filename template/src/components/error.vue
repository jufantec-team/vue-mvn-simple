<template>
  <div>
    <h1>{{ $route.params.msg }}</h1>
  </div>
</template>
<script type="text/javascript">
  export default {
    created (){
      this.$message.error(this.$route.params.msg);
    }
  }
</script>