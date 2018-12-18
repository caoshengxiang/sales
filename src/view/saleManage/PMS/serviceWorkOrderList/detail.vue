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
          <h3>工单派单号 <span>{{detail.orderNum}}</span></h3>
          <p>
            <span class="com-d-item">服务客户: <span>{{detail.customerName}}</span></span>
            <span class="com-d-item">服务商品: <span>{{detail.goodsName}}</span></span>
            <span class="com-d-item">派单时间: <span>{{detail.assignDate && $moment(detail.assignDate).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <!--<li @click="orderHandle('move')">转移</li>-->
          <!--<li @click="orderHandle('back')">退单</li>-->
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="服务派单加工" name="operate">
            <working-op :order-id="$route.query.orderId"
                        :customerName="detail.customerName"
                        :customerId="orderDetail.customerId"></working-op><!--注意数据太乱，客户，订单工单-->
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
              <tr>
                <td>
                  <router-link class="col-link"
                               :to="{name: 'serviceCustomerDetail', query: {id: orderDetail.customerId, view: 'base'}}">
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
                <td><a class="col-link" @click="showOrderDetail(orderDetail.orderId)">{{orderDetail.orderId}}</a></td>
                <td>
                  <span v-if="orderDetail.orderState === 1">待服务</span>
                  <span v-if="orderDetail.orderState === 2">服务中</span>
                  <span v-if="orderDetail.orderState === 3">已完成</span>
                  <span v-if="orderDetail.orderState === 4">已退单</span>
                </td>
                <td>{{orderDetail.goodsName}}</td>
                <td>{{orderDetail.assignDate && $moment(orderDetail.assignDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{orderDetail.createdDate && $moment(orderDetail.createdDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">客满相关 <span>（{{csInOrderList.length}}）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">单号</td>
                <td class="td-title">客满项目名称</td>
                <td class="td-title">状态</td>
                <td class="td-title">客服人员</td>
                <td class="td-title">生成时间</td>
              </tr>
              <tr v-for="(item, index) in csInOrderList" :key="index">
                <td>
                  <!--bug 1582 提交修改 不跳转-->
                  {{item.num}}
                  <!--投诉-->
                  <!--<router-link class="col-link"-->
                               <!--v-if="item.type === 3"-->
                               <!--:to="{name: 'serviceComplaintDetail', query: {id: item.id}}">-->
                    <!--{{item.num}}-->
                  <!--</router-link>-->
                  <!--回访-->
                  <!--<router-link class="col-link"-->
                               <!--v-if="item.type === 2"-->
                               <!--:to="{name: 'serviceReturnVisitDetail', query: {id: item.id, view: 'service'}}">-->
                    <!--{{item.num}}-->
                  <!--</router-link>-->
                  <!--抽查-->
                  <!--<router-link class="col-link"-->
                               <!--v-if="item.type === 1"-->
                               <!--:to="{name: 'serviceSpotCheckDetail', query: {id: item.id, view: 'order'}}">-->
                    <!--{{item.num}}-->
                  <!--</router-link>-->
                </td>
                <td>{{item.subjectName}}</td>
                <td>{{item.stateName}}</td>
                <td>{{item.name}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">客户历史订单 <span>（{{orderListNoAuthTotal}}）</span></p>
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
                <td>{{item.periodEnd && $moment(item.periodEnd).format('YYYY-MM-DD HH:mm:ss')}}</td>
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
  import workingOp from './workingOp'
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  import { mapState } from 'vuex'
  import returnOrder from './returnOrder'
  import selectManager from './selectManager'
  import orderDetailDialog from '../serviceOrderList/detailDialog'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'operate', // operate，related
        detail: {}, // 详情
        userInfo: {},
        customerDetail: {}, // 服务客户
        orderListNoAuth: [], // 客户历史订单
        orderListNoAuthTotal: 0,
        orderDetail: {}, // 订单信息
        csInOrderList: [], // 客满
      }
    },
    computed: {
      ...mapState('constData', [
        'themeIndex',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      iconText,
      workingOp,
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
          query: {view: tab.name, id: this.$route.query.id, orderId: this.$route.query.orderId},
        })
      },
      getWorkOrderDetail () {
        this.dataLoading = true
        API.workOrder.detail(this.$route.query.id, (da) => {
          this.detail = da.data
          this.getDetailByOrderId(this.detail.orderId)
          this.getCsInOrderList(this.detail.orderId)
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
      getOrderListNoAuth (customerId) {
        API.serviceOrder.listNoAuth({customerId: customerId}, (da) => {
          this.orderListNoAuth = da.data.content
          this.orderListNoAuthTotal = da.data.totalElements
        })
      },
      getCsInOrderList (orderId) {
        API.serviceSpotCheck.csInOrder({orderId: orderId}, (da) => {
          this.csInOrderList = da.data
        })
      },
      getDetailByOrderId (orderId) {
        API.serviceOrder.detailByOrderId(orderId, (da) => {
          this.orderDetail = da.data
          if (this.orderDetail.customerId) { // 没有客户id,就不查，免得接口报错
            this.getOrderListNoAuth(this.orderDetail.customerId)
            this.getCustomerAbout(this.orderDetail.customerId, this.orderDetail.orderId)
          }
        })
      },
      orderHandle (type) {
        switch (type) {
          case 'back':
            this.$vDialog.modal(returnOrder, {
              title: '申请退单',
              width: 1100,
              height: 660,
              params: {
                workOrder: this.orderDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getWorkOrderDetail()
                }
              },
            })
            break
          case 'move':
            this.$vDialog.modal(selectManager, {
              title: '转移工单',
              width: 500,
              height: 200,
              params: {
                workOrder: this.orderDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getWorkOrderDetail()
                }
              },
            })
            break
          // case 'laze':
          //   API.workOrder.list({workState: this.managerDetail.workState === 1 ? 2 : 1}, (res) => {
          //     if (res.status) {
          //       this.$message.success('操作成功')
          //       this.getManagerDetail(this.userInfo.id)
          //     }
          //   })
          //   break
          default:
        }
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
      this.userInfo = webStorage.getItem('userInfo')
      this.getWorkOrderDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
