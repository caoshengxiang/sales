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
          <h3>回访单号{{detail.num}} <span class="com-d-tap">
             <span v-if="detail.type === 1">客户主动退单订单回访</span>
              <span v-if="detail.type === 2">回款异常订单回访</span>
              <span v-if="detail.type === 3">A类产品续费异常订单回访</span>
              <span v-if="detail.type === 4">非记账托管业务首次沟通订单回访</span>
              <span v-if="detail.type === 5">外勤首次上门回访</span>
              <span v-if="detail.type === 6">2-3星评价回访</span>
              <span v-if="detail.type === 7">未评价订单回访</span>
          </span></h3>
          <p>
            <span class="com-d-item">回访客户: <span>{{detail.customerName}}</span></span>
            <span class="com-d-item">服务商品: <span>{{detail.goodsName}}</span></span>
            <span class="com-d-item">派单时间: <span>{{detail.assignTime && $moment(detail.assignTime).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <!-- 回访状态（1待派单2待回访3已回访4拒绝回访5待再回访）-->
          <li @click="operateOptions('assginOrder')" v-if="detail.state === 1">派单</li>
        </ul>
        <!--<el-dropdown @command="handleCommand" trigger="click" v-if="detail.state === 2 || detail.state === 5">-->
          <!--<el-button type="primary">-->
            <!--回访<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--</el-button>-->
          <!--<el-dropdown-menu slot="dropdown" v-if="detail.type">-->
            <!--<el-dropdown-item v-for="item in visitTypes"-->
                              <!--:key="item.type"-->
                              <!--:command="item.type"-->
                              <!--:disabled="returnVisitDisabled(item.type)">-->
              <!--{{item.value}}-->
            <!--</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <com-button v-if="(detail.state === 2 || detail.state === 5) && detail.type" buttonType="add" @click="handleCommandAuto" style="">回访</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="服务质量信息" name="service">
            <!--<p class="table-title"></p>-->
            <table class="detail-table">
              <tr>
                <td class="td-title">回访单号</td>
                <td>{{detail.num}}</td>
                <td class="td-title">回访日期</td>
                <td>{{detail.modified && $moment(detail.modified).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">回访坐席</td>
                <td>{{detail.cusserviceName}}</td>
              </tr>
              <tr>
                <td class="td-title">客户名称</td>
                <td>{{detail.customerName}}</td>
                <td class="td-title">联系人</td>
                <td>{{detail.contactName}}</td>
                <td class="td-title">联系方式</td>
                <td>{{detail.contactPhone}}</td>
              </tr>
              <tr>
                <td class="td-title">订单编号</td>
                <td>{{detail.orderId}}</td>
                <td class="td-title">服务商品</td>
                <td>{{detail.goodsName}}</td>
                <td class="td-title">服务状态</td>
                <td>
                  <span v-if="detail.orderState === 1">待服务</span>
                  <span v-if="detail.orderState === 2">服务中</span>
                  <span v-if="detail.orderState === 3">已完成</span>
                  <span v-if="detail.orderState === 4">退单中</span>
                  <span v-if="detail.orderState === 5">已退单</span>
                </td>
              </tr>
              <tr v-if="detail.type === 6 || detail.type === 7">
                <td class="td-title">原评价星级</td>
                <td>
                  <span v-if="detail.retvisitContentModel.originStar">{{detail.retvisitContentModel.originStar}}星</span>
                  <span v-if="!detail.retvisitContentModel.originStar"></span>
                </td>
                <td class="td-title">回访评价</td>
                <td>
                  <span v-if="detail.retvisitContentModel.retEvaluation">{{detail.retvisitContentModel.retEvaluation}}星</span>
                  <span v-if="!detail.retvisitContentModel.retEvaluation"></span>
                </td>
                <td class="td-title"></td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">待再回访时间</td>
                <td>{{detail.returnVisitTime && $moment(detail.returnVisitTime).format('YYYY-MM-DD HH:mm')}}</td>
                <td class="td-title"></td>
                <td></td>
                <td class="td-title"></td>
                <td></td>
              </tr>
            </table>

            <!--<p class="table-title"></p>-->
            <table class="detail-table">
              <tr>
                <td class="td-title" v-if="detail.type < 6">回访内容</td>
                <td class="td-title" v-else>评价意见</td>
                <td colspan="5">
                  <p>{{detail.retvisitContentModel.commentSuggestion.commentSuggestionDesc}}</p>
                </td>
              </tr>
              <tr>
                <td class="td-title" rowspan="2">其他意见</td>
                <td class="td-title">意见对象</td>
                <td>
                  <p>{{detail.retvisitContentModel.otherSuggestion.otherSuggestionPName}}</p>
                </td>
                <td>
                  <p>{{detail.retvisitContentModel.otherSuggestion.otherSuggestionNameDetail}}</p>
                </td>
                <td class="td-title">意见类型</td>
                <td colspan="3">
                  <p>{{detail.retvisitContentModel.otherSuggestion.otherSuggestionName}}</p>
                </td>
              </tr>
              <tr>
                <td class="td-title" colspan="1">意见描述</td>
                <td colspan="4">
                  <p>{{detail.retvisitContentModel.otherSuggestion.otherSuggestionDesc}}</p>
                </td>
              </tr>
              <tr>
                <td class="td-title">备注信息</td>
                <td colspan="5">
                  <p>{{detail.revisitRemark}}</p>
                </td>
              </tr>
            </table>
            <p class="table-title">相关回访信息</p>
            <div style="min-height: 200px;">
              <!--          <div v-for="(item, index) in serviceLog" :key="index" class="log-item">
                          {{item.operatorName}}
                          &nbsp;&nbsp;
                          {{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}
                          &nbsp;&nbsp;
                          {{item.description}}
                          &nbsp;&nbsp;
                          {{item.remark}}
                        </div> -->
              <div>
                <el-table
                  ref="multipleTable"
                  border
                  stripe
                  :data="infoDate"
                  height="400px"
                  style="text-align: center"
                  tooltip-effect="dark">
                  <el-table-column label="回访单号" prop="num">
                    <template slot-scope="scope">
                      <router-link class="col-link" :to="{name: 'serviceReturnVisitDetail', query: {id: scope.row.id, view: 'service'}}" target="_blank">{{
                        scope.row.num }}
                      </router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="回访日期" prop="modified" width="160">
                    <template slot-scope="scope">
                      <span>{{scope.row.modified && $moment(scope.row.modified).format('YYYY-MM-DD HH:mm:ss')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户名称" prop="customerName">
                  </el-table-column>
                  <el-table-column label="订单号" prop="orderId"></el-table-column>
                  <el-table-column label="服务商品" prop="goodsName"></el-table-column>
                  <el-table-column label="回访类型" prop="type">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type === 1">客户主动退单订单回访</span>
                      <span v-if="scope.row.type === 2">回款异常订单回访</span>
                      <span v-if="scope.row.type === 3">A类产品续费异常订单回访</span>
                      <span v-if="scope.row.type === 4">非记账托管业务首次沟通订单回访</span>
                      <span v-if="scope.row.type === 5">外勤首次上门回访</span>
                      <span v-if="scope.row.type === 6">2-3星评价回访</span>
                      <span v-if="scope.row.type === 7">未评价订单回访</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="原评价星级" prop="reviewScore">
                    <template slot-scope="scope">
                      <span v-if="scope.row.reviewScore">{{scope.row.reviewScore}}星</span>
                      <span v-if="!scope.row.reviewScore"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="回复星级" prop="retEvaluation">
                    <template slot-scope="scope">
                      <span v-if="scope.row.retEvaluation">{{scope.row.retEvaluation}}星</span>
                      <span v-if="!scope.row.retEvaluation"></span></template>
                  </el-table-column>
                  <el-table-column label="回复状态" prop="state">
                    <template slot-scope="scope">
                      <span v-if="scope.row.state === 1">待派单</span>
                      <span v-if="scope.row.state === 2">待回访</span>
                      <span v-if="scope.row.state === 3">已回访</span>
                      <span v-if="scope.row.state === 4">拒绝回访</span>
                      <span v-if="scope.row.state === 5">待再回访</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注信息" prop="revisitRemark"></el-table-column>
                </el-table>
              </div>
            </div>
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
                               :to="{name: 'serviceCustomerDetail', query: {id: detail.customerId, view: 'base'}}" target="_blank">
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
              <tr>
                <td class="td-title">商务管家</td>
                <td class="td-title"></td>
                <td class="td-title"></td>
                <td class="td-title"></td>
                <td class="td-title"></td>
              </tr>
              <tr>
                <td>{{orderDetail.businessManagerName}}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <td>todo</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="服务加工" name="operate">
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
  import { mapState } from 'vuex'
  import assginOrder from './assginOrder'
  import returnVisit from './returnVisit'
  import workingOp from '../../PMS/serviceWorkOrderList/workingOp'
  import orderDetailDialog from '../../PMS/serviceOrderList/detailDialog'

  export default {
    name: 'detail',
    data () {
      return {
        infoDate: [],
        dataLoading: false,
        activeViewName: 'service',
        detail: {
          retvisitContentModel: {
            otherSuggestion: {},
            commentSuggestion: {},
          },
        },
        customerDetail: {}, // 服务客户
        orderListNoAuth: [], // 客户历史订单
        orderListNoAuthTotal: 0,
        orderDetail: {}, // 订单信息
        tableData: [],
        assignOrderList: [], // 派单列表
      }
    },
    computed: {
      ...mapState('constData', [
        'themeIndex',
        'visitTypes',
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
      operateOptions (type) {
        switch (type) {
          case 'assginOrder':
            this.$vDialog.modal(assginOrder, {
              title: '回访派单',
              width: 600,
              height: 260,
              params: {
                ids: this.detail.id
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getDetail()
                }
              },
            })
            break
          default:
        }
      },
      stepClickHandle () {},
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'serviceReturnVisitDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, id: this.$route.query.id},
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceRetVisit.detail(this.$route.query.id, (da) => {
          this.detail = da.data
          this.getInfoDate(da.data.contactPhone)
          this.getDetailByOrderId(this.detail.orderId)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getInfoDate (contactPhone) {
        API.serviceRetVisit.infoDateList({
            contactPhone: contactPhone,
            id: this.$route.query.id,
          },
          (res) => {
            this.infoDate = res.data
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
      getAssignOrderList (orderId) { // 获取管家类型名称
        API.workOrder.workOrderAsignList({orderId: orderId}, (res) => { // 6 管家类型
            if (res.status) {
              this.assignOrderList = res.data
            }
          },
        )
      },
      getDetailByOrderId (orderId) {
        API.serviceOrder.detailByOrderId(orderId, (da) => {
          this.orderDetail = da.data
          this.getOrderListNoAuth(this.orderDetail.customerId)
          this.getCustomerAbout(this.orderDetail.customerId, this.orderDetail.orderId)
          this.getAssignOrderList(this.orderDetail.orderId)
        })
      },
      handleCommand (command) {
        // this.$message('click on item ' + command)
        let type = parseInt(command, 10)
        this.$vDialog.modal(returnVisit, {
          title: this.visitTypes[type - 1].value,
          width: 950,
          height: 560,
          params: {
            ids: this.detail.id,
            type: type
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getDetail()
            }
          },
        })
      },
      returnVisitDisabled (type) {
        // console.log(type, this.detail.type)
        if (this.detail.type === type) {
          return false
        } else {
          return true
        }
      },
      handleCommandAuto () {
        this.$vDialog.modal(returnVisit, {
          title: this.visitTypes[this.detail.type - 1].value,
          width: 950,
          height: 560,
          params: {
            ids: this.detail.id,
            type: this.detail.type
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getDetail()
            }
          },
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
