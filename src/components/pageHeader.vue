<template>
  <div class="page-header">
    <div class="left">众智联邦销售管理系统</div>
    <div class="right">
      <ul>
        <li class="item">
          <i class="el-icon-picture"></i>
          <a>注销</a>
        </li>
        <li class="item">
          <el-badge :value="3" class="badge">
            <i class="el-icon-picture"></i>
          </el-badge>
        </li>
        <li class="item">
          <el-badge :value="3" class="badge">
            <i class="el-icon-picture"></i>
          </el-badge>
        </li>
        <li class="item item-hello">下午好，张三</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageHeader',
    data () {
      return {}
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.page-header {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  .left {
    font-size: 18px;
    margin-left: 20px;
  }
  .right {
    margin-right: 20px;
    .item {
      float: right;
      margin: 0 0 0 20px;
      .badge {
        margin-bottom: -5px;
      }
      &.item-hello {
        margin-right: 10px;
      }
    }
  }
}
</style>
