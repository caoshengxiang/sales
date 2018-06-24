<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
      1 <br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailInfo',
    data () {
      return {}
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../styles/common";
</style>
