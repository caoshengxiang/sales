<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>todo <span class="com-d-tap">平台直属/平台控股子公司</span></h3>
          <p>
            <span class="com-d-item">服务地区: <span> todo</span></span>
            <span class="com-d-item">联系电话: <span>todo</span></span>
            <span class="com-d-item">服务类目: <span>todo、todo</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="operateOptions('delete')">编辑</li>
        </ul>
      </div>
    </div>
    <div class="com-bar">
      <div class="com-info-left">
        <p> todo</p>
        <p> todo</p>
      </div>
      <div class="com-info-right">
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <p class="table-title">客户基本信息</p>
        <table class="detail-table">
          <tr>
            <td class="td-title">公司名称</td>
            <td>todo</td>
            <td class="td-title">营业执照</td>
            <td>todo</td>
            <td class="td-title">客户级别</td>
            <td>todo</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        enterState: [
          {value: '申请认证'},
          {value: '认证审核'},
          {value: '管家面签'},
          {value: '缴纳保证金'},
          {value: '保证金审核'},
          {value: '入驻成功'},
        ]
      }
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
