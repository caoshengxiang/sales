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
          <li @click="operateOptions('delete')">转移</li>
          <li @click="operateOptions('delete')">退单</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="服务派单加工" name="operate">
            <p class="table-title">我负责的服务内容</p>
            <table class="detail-table">
              <tr v-for="(item, index) in workingListMy" :key="index">
                <td style="height: 50px;" class="td-center">{{item.serviceName}}[{{item.managerName}}]</td>
                <td colspan="5">
                  <div class="com-icon-text-box com-icon-text-h"
                       v-for="op in item.orderModuleComposites" :key="op.type">
                    <i style="font-size: 30px;" class="el-icon-picture"></i>
                    <span class="com-icon-t">{{op.title}}</span>
                  </div>
                </td>
              </tr>
            </table>
            <p class="table-title">相关的服务内容</p>
            <table class="detail-table">
              <tr v-for="(item, index) in workingListAbout" :key="index">
                <td style="height: 50px;" class="td-center">{{item.serviceName}}[{{item.managerName}}]</td>
                <td colspan="5">
                  <div class="com-icon-text-box com-icon-text-h"
                       v-for="op in item.orderModuleComposites" :key="op.type">
                    <!--高亮是待处理stage===2  完成stage===1-->
                    <img :src="'/static/images/'+ op.stage===1?'green':'gray' + '/' + 'icon_call.png'" alt="">
                    <span class="com-icon-t">{{op.title}}</span>
                  </div>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="工单相关信息" name="related">
            <p class="table-title">服务客户</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">服务客户名称</td>
                <td class="td-title">统一信用码</td>
                <td class="td-title">注册资本金</td>
                <td class="td-title">所属行业</td>
                <td class="td-title">企业联系人及电话</td>
              </tr>
            </table>

            <p class="table-title">订单信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">订单下单时间</td>
              </tr>
            </table>

            <p class="table-title">客满相关 <span>（2）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">单号</td>
                <td class="td-title">客满项目名称</td>
                <td class="td-title">状态</td>
                <td class="td-title">客服人员</td>
                <td class="td-title">生成时间</td>
              </tr>
            </table>

            <p class="table-title">历史订单 <span>（2）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">服务完成时间</td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import iconText from '../../../../components/iconText/iconText'
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'operate', // operate，related
        detail: {}, // 详情
        workingListMy: [], // 加工,我的
        workingListAbout: [], // 加工，相关
        userInfo: {},
      }
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      iconText,
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'serviceWorkOrderDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, id: this.$route.query.id},
        })
      },
      getWorkOrderDetail () {
        API.workOrder.detail(this.$route.query.id, (da) => {
          this.detail = da.data
        })
      },
      getOrderWorkingList () {
        API.workOrder.orderWorkingList({orderId: this.$route.query.orderId}, (da) => {
          this.workingListMy = []
          this.workingListAbout = []
          let data = da.data || []
          data.forEach(item => {
            if (item.managerId === this.userInfo.id) {
              this.workingListMy.push(item)
            } else {
              this.workingListAbout.push(item)
            }
          })
        })
      }
    },
    created () {
      this.userInfo = webStorage.getItem('userInfo')
      // this.getWorkOrderDetail() // todo
      this.getOrderWorkingList()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
