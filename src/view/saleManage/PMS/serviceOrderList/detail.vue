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
                <td class="td-title">服务类型</td>
                <td>
                  <span v-for="item in serviceType" :key="item.type"
                        v-if="item.type === detail.serviceItemConfigModel.serviceType">
                    {{item.value}}
                  </span>
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
                <td>{{detail.invoiceType}}</td>
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
                <td>{{customerDetail.name}}</td>
                <td>{{customerDetail.creditCode}}</td>
                <td>{{customerDetail.registeredCapital}}</td>
                <td>{{customerDetail.industry}}</td>
                <td>{{customerDetail.contactName}}[{{customerDetail.contactPhone}}]</td>
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
                <td>{{item.orderId}}</td>
                <td>
                  <span v-if="item.orderState === 1">待服务</span>
                  <span v-if="item.orderState === 2">服务中</span>
                  <span v-if="item.orderState === 3">已完成</span>
                  <span v-if="item.orderState === 4">已退单</span>
                </td>
                <td>{{item.goodsName}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>todo</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="订单加工信息" name="operate">
            <table class="detail-table">
              <tr>
                <td style="height: 50px;" class="td-center">外勤服务[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="首次电话沟通" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="首次上门沟通" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="录入客户资料" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="装订凭证" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">财务记账[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="客户资料审核" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="客户票据审核" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="记账日常告知" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="出具财务报表" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">财务申报[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="税前沟通" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="纳税申报" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="纳税异常提醒" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">财务内控[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="财务内控分析" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="财务内控构建指导" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">税收风控[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="增值税发票风险管理指导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收优惠政策辅导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收问题提醒" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收分控方案设计" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="纳税信用等级维护指导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="财税专家“一对一”咨询" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税务危机应对参与" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收策划指导" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">金融服务[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="融资需求分析" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="融资对接指导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="政府扶持资金规话" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">其他单项服务（产品名）[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="开始服务" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="完成服务" status="1"></icon-text>
                </td>
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
  import { mapState } from 'vuex'
  import orderDialog from './orderDialog'

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
      }
    },
    computed: {
      ...mapState('constData', [
        'serviceType', // 服务类型
      ])
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
          this.getCustomerAbout(this.detail.customerId, this.detail.orderId)
          this.getOrderListNoAuth(this.detail.customerId)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
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
      orderHandle () {
        this.$vDialog.modal(orderDialog, {
          title: '派单',
          width: 1100,
          height: 660,
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
