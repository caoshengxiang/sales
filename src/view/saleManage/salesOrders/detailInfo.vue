<!--只有订单的跟进人有删除权限（APP下单、修改这两个操作也一样，只有跟进人才有权限）-->
<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.toName"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.toName"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <div>
            <h3 style="display: inline-block">{{orderDetail.customerName}}</h3>
            <a class="order-info" @click="operateOptions('orderInfo')">APP订单信息浏览</a>
          </div>
          <p>
            <span class="com-d-item">订单编号: <span>{{orderDetail.id}}<span v-if="orderDetail.orderId">-{{orderDetail.orderId}}</span></span></span>
            <span class="com-d-item">客户所有人: <span>{{orderDetail.customerOwnerName}}</span></span>
            <span class="com-d-item">订单状态:<span v-for="item in orderState" :key="item.type"
                                                v-if="orderDetail.orderState === item.type">{{item.value}}</span></span>
            <span class="com-d-item">订单所有人: <span>{{orderDetail.ownerName}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<el-radio-group v-model="tapOption">-->
        <!--<el-radio-button class="btn-width" label="move">APP下单</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="move">修改</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="move">删除</el-radio-button>-->
        <!--</el-radio-group>-->
        <ul class="btn-group">
          <!--订单为预下单 - 显示APP下单-->
          <li class="btn-order" v-if="orderDetail.orderState === 0 && isFollower" @click="operateOptions('appOrder')">
            APP下单
          </li>
          <li class="btn-edit" v-if="isFollower" @click="operateOptions('edit')">修改</li>
          <li class="btn-delete" v-if="isFollower" @click="operateOptions('delete')">删除</li>
          <!--续费按钮出现的条件：-->
          <!--1.订单中的商品为计时类商品；-->
          <!--2.订单处于服务中或已完成状态。-->
          <!--计费类型（TIMES计次，ANNUALLY包年） 包年就是计时商品-->
          <li class="btn-order" v-if="isFollower && (orderDetail.orderState === 3 ||orderDetail.orderState === 4) && orderDetail.billingType === 'ANNUALLY'"
              @click="operateOptions('reNew')">续费</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="销售订单资料信息" name="detail">
            <p class="table-title">销售订单基本信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单机会</td>
                <td>{{orderDetail.chanceName}}</td>
                <td class="td-title">客户名称</td>
                <td>{{orderDetail.customerName}}</td>
                <td class="td-title">客户联系人</td>
                <td>{{orderDetail.contacterName}}[{{orderDetail.contacterPhone}}]</td>
              </tr>
              <tr>
                <td class="td-title">是否续费</td>
                <td>{{orderDetail.isRenew?'续费订单':'新签订单'}}</td>
                <td class="td-title">购买商品</td>
                <td colspan="3">{{orderDetail.productName}}</td>
              </tr>
              <tr>
                <td class="td-title">购买规格</td>
                <td>{{orderDetail.specificationName}}</td>
                <td class="td-title">购买数量</td>
                <td>x{{orderDetail.quantity}}</td>
                <td class="td-title">订单状态</td>
                <td><span v-for="item in orderState" :key="item.type"
                          v-if="orderDetail.orderState === item.type">{{item.value}}</span></td>
              </tr>
              <tr>
                <td class="td-title">签单金额</td>
                <td>{{orderDetail.billAmount}}</td>
                <td class="td-title">回款金额</td>
                <td>{{orderDetail.refund_amount}}</td>
                <td class="td-title">待回款金额</td>
                <td>{{orderDetail.not_refund_amount}}</td>
              </tr>
              <tr>
                <td class="td-title">订单来源</td>
                <td colspan="5">{{orderDetail.orderSourceName}}</td>
              </tr>
              <tr>
                <td class="td-title">订单备注</td>
                <td colspan="5">{{orderDetail.remark}}</td>
              </tr>
            </table>

            <p class="table-title">销售订单其他信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">销售订单创建时间</td>
                <td colspan="5">{{orderDetail.created && $moment(orderDetail.created).format('YYYY-MM-DD HH:mm:ss')}}
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="销售订单回款信息" name="related">

            <!--<div class="related-btn-group">-->
            <!--<com-button buttonType="theme">联系人(2)</com-button>-->
            <!--<com-button buttonType="grey">销售需求(2)</com-button>-->
            <!--<com-button buttonType="grey">销售订单(2)</com-button>-->
            <!--</div>-->

            <p class="table-title">
              <!-- todo -->
              回款应收合计 6000.00 / 未收款合计 3000.00  todo
              <!--<a class="more">更多》</a>-->
              <!--<a class="table-add"><i class="el-icon-plus"></i></a>-->
            </p>
            <table class="detail-table related-table">
              <tr>
                <!--todo 7 个 th-->
                <th class="td-title">款项名称</th>
                <th class="td-title">计划回款金额</th>
                <th class="td-title">是否回款</th>
                <th class="td-title">回款金额</th>
                <th class="td-title">回款时间</th>
                <th class="td-title">审核状态</th>
                <th class="td-title">审核时间</th>
              </tr>
              <tr v-for="item in refundRecordList" :key="item.id">
                <td>{{item.name}}</td>
                <td>{{item.receivable}}</td>
                <td></td>
                <td>{{item.netReceipts}}</td>
                <td>{{item.refundDate && $moment(item.refundDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{item.refundStatus}}</td>
                <td>{{item.auditTime && $moment(item.auditTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">
              回款关联人信息
              <!--<a class="more">更多》</a>-->
              <!--<a class="table-add"><i class="el-icon-plus"></i>新增跟单记录</a>-->
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">销售机会开发人</th>
                <th class="td-title">销售机会跟单人</th>
                <th class="td-title">销售机会咨询师</th>
              </tr>
              <tr>
                <td>{{orderDetail.team.creatorName && orderDetail.team.creatorName + '[' +
                  orderDetail.team.creatorMobilePhone + ']'}}
                </td>
                <td>{{orderDetail.team.salerName && orderDetail.team.salerName + '[' + orderDetail.team.salerMobilePhone
                  + ']'}}
                </td>
                <td>{{orderDetail.team.counselorName && orderDetail.team.counselorName + '[' +
                  orderDetail.team.salerMobilePhone + ']'}}
                </td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <div class="team-title">
          <span class="title-text">团队成员</span>
        </div>
        <ul class="team-member">
          <li class="team-member-item">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;" v-if="orderDetail.team.creatorAvatar"
                   :src="orderDetail.team.creatorAvatar" alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{orderDetail.team.creatorName}}</h4>
              <p>{{orderDetail.team.creatorMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-1">负责人</span>
              <!--<span class="post-tag-2">销售员</span>-->
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;" v-if="orderDetail.team.salerAvatar"
                   :src="orderDetail.team.salerAvatar" alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{orderDetail.team.salerName}}</h4>
              <p>{{orderDetail.team.salerMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-2">跟单人</span>
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;" v-if="orderDetail.team.counselorAvatar"
                   :src="orderDetail.team.counselorAvatar" alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{orderDetail.team.counselorName}}</h4>
              <p>{{orderDetail.team.counselorMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-2">咨询师</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import addDialog from './addDialog'
  import addRenew from './addRenew'
  import order from './order'
  import orderInfo from './orderInfo'
  import API from '../../../utils/api'
  import { mapState } from 'vuex'
  import webStorage from 'webStorage'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        tapOption: '',
        activeViewName: '',
        orderDetail: {
          team: {},
        },
        refundRecordList: [],
        isFollower: true, // 跟单人
        userInfo: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'orderTypeOptions',
        'orderState',
        'orderSource',
        'themeIndex',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
    },
    methods: {
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push(
          {name: 'salesOrdersDetail', params: {end: 'FE'}, query: {view: tab.name, id: this.$route.query.id}})
      },
      operateOptions (op) {
        switch (op) {
          case 'edit':
            this.$vDialog.modal(addDialog, {
              title: '修改订单',
              width: 900,
              height: 380,
              params: {
                orderDetail: this.orderDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOrderDetail()
                }
              },
            })
            break
          case 'delete':
            this.$confirm('确定删除销售订单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOrder.deleteOrder(this.orderDetail.id, (da) => {
                if (da.status) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                  })
                  this.$router.go(-1)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'orderInfo':
            this.$vDialog.modal(orderInfo, {
              title: 'APP订单信息浏览',
              width: 900,
              height: 740,
              params: {
                orderDetail: this.orderDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  // alert('弹窗关闭，添加成功刷新列表')
                }
              },
            })
            break
          case 'appOrder':
            this.$vDialog.modal(order, {
              title: 'APP下单',
              width: 604,
              height: 300,
              params: {
                orderDetail: this.orderDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOrderDetail()
                }
              },
            })
            break
          case 'reNew':
            this.$vDialog.modal(addRenew, {
              title: '续费',
              width: 900,
              height: 480,
              params: {
                orderDetail: this.orderDetail,
                topSource: this.topSource, // 顶级客户来源
                isRenew: true,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOrderList()
                }
              },
            })
            break
        }
      },
      getSalesOrderDetail () {
        this.dataLoading = true
        API.salesOrder.detail(this.$route.query.id, (data) => {
          setTimeout(() => {
            this.dataLoading = false
            if (data.status) {
              this.orderDetail = data.data
              if (data.data.orderId) { // 生成了订单才有
                this.getRefundRecord(data.data.orderId)
              }
              if (this.userInfo.id !== this.orderDetail.team.salerId) { // 判断更进人
                this.isFollower = false
              }
            }
          }, 500)
        }, (data) => {
          this.orderDetail = data.data
          this.dataLoading = false
        })
      },
      getRefundRecord (orderId) { // todo 权限
        API.refundRecord.list({orderId: orderId, pageSize: 1000, page: 0, sort: 'created,desc'}, da => {
          this.refundRecordList = da.data.content
        })
      },
    },
    created () {
      this.userInfo = webStorage.getItem('userInfo')
      this.activeViewName = this.$route.query.view
      this.getSalesOrderDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../styles/sprites.css";

  .btn-base {
    width: 80px;
    text-align: center;
    padding: 5px 0;
    border: 1px solid;
    border-radius: 1px;
    display: inline-block;
    cursor: pointer;
  }

  .btn-order {
    @extend .btn-base;
    color: #39C189;
    border-color: #39C189;
  }

  .btn-edit {
    @extend .btn-base;
    color: #FFA94B;
    border-color: #FFA94B;
  }

  .btn-delete {
    @extend .btn-base;
    color: #FE5455;
    border-color: #FE5455;
  }

  .order-info {
    background-color: #4BCF99;
    border-radius: 12px;
    color: #fff;
    width: 120px;
    text-align: center;
    padding: 5px 0;
    font-size: 12px;
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
