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
          <h3>{{detail.num}} <span class="com-d-tap">
            <span v-if="detail.state === 1">待派单</span>
              <span v-if="detail.state === 2">待抽查</span>
              <span v-if="detail.state === 3">已抽查 </span>
          </span></h3>
          <p>
            <span class="com-d-item">服务客户: <span> {{detail.customerName}}</span></span>
            <span class="com-d-item">服务商品: <span>{{detail.goodsName}}</span></span>
            <span class="com-d-item">派单时间: <span>{{detail.assignTime && $moment(detail.assignTime).format('YYYY-MM-DD HH:mm:mm')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="operateOptions('check')" v-if="detail.state === 2">抽查</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="服务订单信息" name="order">
            <!--<p class="table-title"></p>-->
            <table class="detail-table">
              <tr>
                <td class="td-title">抽查单号</td>
                <td>{{detail.num}}</td>
                <td class="td-title">抽查日期</td>
                <td>{{detail.modified && $moment(detail.modified).format('YYYY-MM-DD HH:mm:mm')}}</td>
                <td class="td-title">抽查人员</td>
                <td>{{detail.cusServiceName}}</td>
              </tr>
              <tr>
                <td class="td-title">抽查结果</td>
                <td colspan="5">{{detail.assignResult}}</td>
              </tr>
              <tr>
                <td class="td-title">抽查处罚</td>
                <td colspan="5">{{detail.assignPunlish}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="订单相关信息" name="related">
            <p class="table-title">服务客户</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">服务客户名称</td>
                <td class="td-title">统一信用码</td>
                <td class="td-title">注册资本金</td>
                <td class="td-title">所属行业</td>
                <td class="td-title">企业联系人及电话</td>
              </tr>
              <tr>
                <td>
                  <router-link class="col-link"
                               :to="{name: 'serviceCustomerDetail', query: {id: detail.customerId, view: 'base'}}">
                    {{customerDetail.name}}
                  </router-link>
                </td>
                <td>{{customerDetail.creditCode}}</td>
                <td>{{customerDetail.registeredCapital}}</td>
                <td>{{customerDetail.industry}}</td>
                <td>{{customerDetail.contactName}}[{{customerDetail.contactPhone}}]</td>
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
              <tr>
                <td>
                  <a class="col-link" @click="showOrderDetail(orderDetail.orderId)">{{orderDetail.orderId}}</a>
                </td>
                <td>
                  <span v-if="orderDetail.orderState === 1">待服务</span>
                  <span v-if="orderDetail.orderState === 2">服务中</span>
                  <span v-if="orderDetail.orderState === 3">已完成</span>
                  <span v-if="orderDetail.orderState === 4">已退单</span>
                </td>
                <td>{{orderDetail.goodsName}}</td>
                <td>{{orderDetail.created && $moment(orderDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{orderDetail.orderTime && $moment(orderDetail.orderTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">服务派单 <span>（{{assignOrderList.length}}）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">管家类型</td>
                <td class="td-title">服务管家</td>
                <td class="td-title">服务主体</td>
                <td class="td-title">派单单号</td>
                <td class="td-title">派单时间</td>
              </tr>
              <tr v-for="(item, index) in assignOrderList" :key="index">
                <td class="td-center">{{item.managerTypeName}}</td>
                <td class="td-center">{{item.managerName}}</td>
                <td class="td-center">{{item.serviceName}}</td>
                <td class="td-center">{{item.orderNum}}</td>
                <td class="td-center">{{item.assignDate && $moment(item.assignDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">历史订单 <span>（{{orderListNoAuthTotal}}）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">服务完成时间</td>
              </tr>
              <tr v-for="(item, index) in orderListNoAuth" :key="index">
                <td><a class="col-link" @click="showOrderDetail(item.orderId)">{{item.orderId}}</a></td>
                <td>
                  <span v-if="item.orderState === 1">待服务</span>
                  <span v-if="item.orderState === 2">服务中</span>
                  <span v-if="item.orderState === 3">已完成</span>
                  <span v-if="item.orderState === 4">已退单</span>
                </td>
                <td>{{item.goodsName}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{item.finishTime && $moment(item.finishTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="订单加工信息" name="operate">
            <working-op v-if="detail.orderId"
                        :order-id="detail.orderId"
                        :customerName="detail.customerName"
                        :customerId="detail.customerId"></working-op>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import iconText from '../../../../components/iconText/iconText'
  import API from '../../../../utils/api'
  import checkHandle from './checkHandle'
  import { mapState } from 'vuex'
  import workingOp from '../../PMS/serviceWorkOrderList/workingOp'
  import orderDetailDialog from '../../PMS/serviceOrderList/detailDialog'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'order',
        detail: {},
        customerDetail: {}, // 服务客户
        orderDetail: {}, // 订单信息
        assignOrderList: [], // 派单列表
        orderListNoAuth: [], // 客户历史订单
        orderListNoAuthTotal: 0,
      }
    },
    components: {
      iconText,
      workingOp,
    },
    computed: {
      ...mapState('constData', [
        'themeIndex',
      ])
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    methods: {
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'serviceSpotCheckDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, id: this.$route.query.id},
        })
      },
      operateOptions () {
        this.$vDialog.modal(checkHandle, {
          title: '抽查',
          width: 800,
          height: 460,
          params: {
            ids: this.detail.id
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceSpotCheck.detail(this.$route.query.id, (da) => {
          this.detail = da.data
          this.getCustomerAbout(this.detail.customerId, this.detail.orderId)
          this.getDetailByOrderId(this.detail.orderId)
          this.getAssignOrderList(this.detail.orderId)
          this.getOrderListNoAuth(this.detail.customerId)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getCustomerAbout (customerId, orderId) {
        API.serviceCustomer.detailAbout({customerId: customerId, orderId: orderId}, (da) => {
          this.customerDetail = da.data
        })
      },
      getDetailByOrderId (orderId) {
        API.serviceOrder.detailByOrderId(orderId, (da) => {
          this.orderDetail = da.data
        })
      },
      getAssignOrderList (orderId) { // 获取管家类型名称
        API.workOrder.workOrderAsignList({orderId: orderId}, (res) => { // 6 管家类型
            if (res.status) {
              this.assignOrderList = res.data
            }
          },
        )
      },
      getOrderListNoAuth (customerId) {
        API.serviceOrder.listNoAuth({customerId: customerId}, (da) => {
          this.orderListNoAuth = da.data.content
          this.orderListNoAuthTotal = da.data.totalElements
        })
      },
      showOrderDetail (orderId) {
        this.$vDialog.modal(orderDetailDialog, {
          title: '订单信息',
          width: 1100,
          height: 400,
          params: {
            orderId: orderId,
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getWorkOrderDetail()
            }
          },
        })
      }
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
