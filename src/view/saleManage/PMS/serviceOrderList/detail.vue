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
          <h3>订单号{{detail.orderId}} <span class="com-d-tap">
            <span v-if="detail.assignState === 1">待派单</span>
            <span v-if="detail.assignState === 2">待部分派单</span>
            <span v-if="detail.assignState === 3">已派单</span>
            <span v-if="detail.assignState === 4">已接单</span>
          </span></h3>
          <p>
            <span class="com-d-item">客户名称: <span> {{detail.serviceCustomerName}}</span></span>
            <span class="com-d-item">服务商品: <span>{{detail.goodsName}}</span></span>
            <span class="com-d-item">生成服务时间: <span>{{detail.created && $moment(detail.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="orderHandle">派单</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="服务订单信息" name="order">
            <p class="table-title">服务订单信息</p>
            <table class="detail-table">
              <tr>
                <td rowspan="4" class="td-center">订单基本信息</td>
              </tr>
              <tr>
                <td class="td-title">订单号</td>
                <td>{{detail.orderId}}</td>
                <td class="td-title">订单状态</td>
                <td>
                  <span v-if="detail.orderState === 1">待服务</span>
                  <span v-if="detail.orderState === 2">服务中</span>
                  <span v-if="detail.orderState === 3">已完成</span>
                  <span v-if="detail.orderState === 4">已退单</span>
                </td>
                <td class="td-title">服务地区</td>
                <td>
                  <!--<span v-if="detail.serviceItemConfigModel">-->
                  <!--<span v-for="item in serviceType" :key="item.type"-->
                  <!--v-if="item.type === detail.serviceItemConfigModel.serviceType">-->
                  <!--{{item.value}}-->
                  <!--</span>-->
                  <!--</span>-->
                  {{ detail.provinceName }}
                  {{ detail.cityName }}
                  {{ detail.areaName }}
                </td>
              </tr>
              <tr>
                <td class="td-title">下单时间</td>
                <td>{{detail.orderTime && $moment(detail.orderTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">服务客户</td>
                <td>{{detail.serviceCustomerName}}</td>
                <td class="td-title">联系人</td>
                <td>{{detail.contactName}}[{{detail.contactPhone}}]</td>
              </tr>
              <tr>
                <td class="td-title">购买商品</td>
                <td>{{detail.goodsName}}</td>
                <td class="td-title">商品规格</td>
                <td>{{detail.specificationName}}</td>
                <td class="td-title">购买数量</td>
                <td>{{detail.goodsNum}}</td>
              </tr>
              <tr>
                <td rowspan="5" class="td-center">订单发票信息</td>
              </tr>
              <tr>
                <td class="td-title">订单金额</td>
                <td>{{detail.orderAmount}}</td>
                <td class="td-title">订单优惠</td>
                <td>{{detail.orderReduction}}</td>
                <td class="td-title">订单实付</td>
                <td>{{detail.orderPayment}}</td>
              </tr>
              <tr>
                <td class="td-title">发票类型</td>
                <td>
                  <span v-if="detail.invoiceType == 'ALIPAY'">支付宝</span>
                  <span v-if="detail.invoiceType == 'WECHAT'">微信</span>
                  <span v-if="detail.invoiceType == 'LINE_DOWN'">线下支付</span>
                  <span v-if="detail.invoiceType == 'ONEPAY'">一网通</span>
                  <span v-if="detail.invoiceType == 'UNIONPAY'">银联</span>
                  <span v-if="detail.invoiceType == 'COMMON'">普通发票</span>
                  <span v-if="detail.invoiceType == 'VALUE_ADD_TAX'">专用发票</span>
                </td>
                <td class="td-title">开票单位</td>
                <td>{{detail.invoiceUnit}}</td>
                <td class="td-title">纳税识别号</td>
                <td>{{detail.taxIdentificationNum}}</td>
              </tr>
              <tr>
                <td class="td-title">开户行信息</td>
                <td>{{detail.bankAddress}}</td>
                <td class="td-title">银行账号</td>
                <td>{{detail.bankAccount}}</td>
                <td class="td-title"></td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">发票邮寄地址</td>
                <td colspan="5">{{detail.invoiceMailAddress}}</td>
              </tr>
              <tr>
                <td class="td-center" rowspan="3">订单其他信息</td>
              </tr>
              <tr>
                <td class="td-title">预约服务时间</td>
                <td colspan="5">
                  {{detail.reservationTime && $moment(detail.reservationTime).format('YYYY-MM-DD HH:mm:ss')}}
                </td>
              </tr>
              <tr>
                <td class="td-title">订单备注</td>
                <td colspan="5">{{detail.remark}}</td>
              </tr>
            </table>

            <p class="table-title">服务派单</p>
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
                  <!--&lt;!&ndash;回访&ndash;&gt;-->
                  <!--<router-link class="col-link"-->
                               <!--v-if="item.type === 2"-->
                               <!--:to="{name: 'serviceReturnVisitDetail', query: {id: item.id, view: 'service'}}">-->
                    <!--{{item.num}}-->
                  <!--</router-link>-->
                  <!--&lt;!&ndash;抽查&ndash;&gt;-->
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
                <td>
                  <router-link class="col-link"
                               :to="{name: 'serviceOrderDetail', query: {id: item.id, view: 'order'}}">
                    {{item.orderId}}
                  </router-link>
                </td>
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
          <el-tab-pane label="订单加工信息" name="operate">
            <working-op v-if="detail.orderId"
                        :order-id="detail.orderId"
                        :customerName="detail.serviceCustomerName"
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
  import { mapState } from 'vuex'
  import orderDialog from './orderDialog'
  import workingOp from '../serviceWorkOrderList/workingOp'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'order', // related, operate
        detail: {
          serviceItemConfigModel: {},
        },
        assignOrderList: [], // 派单列表
        customerDetail: {}, // 服务客户
        orderListNoAuth: [], // 客户历史订单
        orderListNoAuthTotal: 0,
        csInOrderList: [], // 客满
      }
    },
    computed: {
      ...mapState('constData', [
        'themeIndex',
        'serviceType', // 服务类型
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
      '$route.query.id' (to, from) {
        this.$router.go(0)
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
          name: 'serviceOrderDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, id: this.$route.query.id},
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceOrder.detail(this.$route.query.id, (da) => {
          this.detail = da.data
          this.getAssignOrderList(this.detail.orderId)
          this.getCsInOrderList(this.detail.orderId)
          if (this.detail.customerId) {
            this.getCustomerAbout(this.detail.customerId, this.detail.orderId)
            this.getOrderListNoAuth(this.detail.customerId)
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getAssignOrderList (orderId) { // 订单下得派单列表
        API.workOrder.workOrderAsignList({orderId: orderId}, (res) => {
            if (res.status) {
              this.assignOrderList = res.data
            }
          },
        )
      },
      getCustomerAbout (customerId, orderId) {
        API.serviceCustomer.detailAbout({customerId: customerId, orderId: orderId}, (da) => {
          this.customerDetail = da.data
        })
      },
      getOrderListNoAuth (customerId) {
        API.serviceOrder.listNoAuth({
          customerId: customerId,
          orderState: 3,
        }, (da) => {
          this.orderListNoAuth = da.data.content
          this.orderListNoAuthTotal = da.data.totalElements
        })
      },
      getCsInOrderList (orderId) { // 客满相关
        API.serviceSpotCheck.csInOrder({orderId: orderId}, (da) => {
          this.csInOrderList = da.data
        })
      },
      orderHandle () {
        this.$vDialog.modal(orderDialog, {
          title: '派单',
          width: 1100,
          height: 660,
          params: {
            ids: this.detail.id,
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
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
