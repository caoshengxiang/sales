<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>销售机会</el-breadcrumb-item>
        <el-breadcrumb-item>销售机会详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/placeholder.jpg" alt="">
        <div class="com-info-text">
          <h3>{{salesOpportunitiesDetail.intentProductName || '无名'}}</h3>
          <p>
            <span class="com-d-item">客户名称: <span>{{salesOpportunitiesDetail.customerName}}</span></span>
            <span class="com-d-item">预计签单金额: <span>{{salesOpportunitiesDetail.intentBillAmount}}</span></span>
            <span class="com-d-item">预计签单日期: <span>{{salesOpportunitiesDetail.billDate && $moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}</span></span>
            <br>
            <span class="com-d-item">销售机会所有人: <span>{{salesOpportunitiesDetail.ownerName}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<el-radio-group v-model="tapOption">-->
        <!--<el-radio-button class="btn-width" label="move">转移</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="move">删除</el-radio-button>-->
        <!--</el-radio-group>-->
        <ul class="com-info-op-group">
          <!--输单后隐藏删除以外得按钮-->
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1" @click="operateOptions('move')">转移</li>
          <li @click="operateOptions('delete')">删除</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step">
          <el-steps :active="salesOpportunitiesDetail.stage" align-center>
            <el-step @click.native="stepClickHandle(item)" v-for="(item, index) in salesState" :key="index"
                     :title="item.value + '(' + item.percent + ')'" v-if="index !== 0"></el-step>
            <el-step title="输单"></el-step>
          </el-steps>
        </div>
        <!--输单后隐藏删除以外得按钮-->
        <a v-if="salesOpportunitiesDetail.stage !== -1" class="lose-bill" @click="operateOptions('discard')">输单</a>
      </div>

    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="销售机会资料信息" name="detail">
            <p class="table-title">销售机会基本信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">客户名称</td>
                <td>{{salesOpportunitiesDetail.customerName}}</td>
                <td class="td-title">需求进度</td>
                <td>
                  <span v-for="item in salesState"
                        :key="item.type"
                        v-if="item.type === salesOpportunitiesDetail.stage">{{item.value}}&nbsp;{{item.percent}}</span>
                </td>
                <td class="td-title">预计签单金额</td>
                <td>{{salesOpportunitiesDetail.intentBillAmount}}</td>
              </tr>
              <tr>
                <td class="td-title">预计签单时间</td>
                <td>{{salesOpportunitiesDetail.billDate && $moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}</td>
                <td class="td-title">意向商品</td>
                <td>{{salesOpportunitiesDetail.intentProductName}}</td>
                <td class="td-title">实际签单金额</td>
                <td>{{salesOpportunitiesDetail.billAmount}}</td>
              </tr>
              <tr>
                <td class="td-title">签单订单号</td>
                <td>{{salesOpportunitiesDetail.billOrderId}}</td>
                <td class="td-title">签单商品</td>
                <td>{{salesOpportunitiesDetail.billProductName}}</td>
                <td class="td-title"></td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">销售机会备注</td>
                <td colspan="5">{{salesOpportunitiesDetail.chanceRemark || '暂无备注信息'}}</td>
              </tr>
              <tr>
                <td class="td-title">销售合同网址</td>
                <td colspan="5">{{salesOpportunitiesDetail.contractUrl}}</td>
              </tr>
              <tr>
                <td class="td-title">机会输单备注</td>
                <td colspan="5">{{salesOpportunitiesDetail.discardRemark || '暂无备注信息'}}</td>
              </tr>
            </table>

            <p class="table-title">销售机会其他信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">销售机会创建时间</td>
                <td colspan="3">{{salesOpportunitiesDetail.created && $moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">所有人</td>
                <td>{{salesOpportunitiesDetail.creatorName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售机会修改时间</td>
                <td colspan="3">{{salesOpportunitiesDetail.modified && $moment(salesOpportunitiesDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">修改人</td>
                <td>{{salesOpportunitiesDetail.modifierName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售机会活动时间</td>
                <td colspan="3">{{ salesOpportunitiesDetail.followDate && $moment(salesOpportunitiesDetail.followDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">跟进人</td>
                <td>{{salesOpportunitiesDetail.team.salerName}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="销售机会相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="theme" @click="handleRoute('contact')">联系人({{contactTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('orderRecords')">跟单记录({{orderRecordsTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('order')">APP订单({{appOrderTotal}})</com-button>
            </div>

            <p class="table-title">
              联系人({{contactTotal}})
              <a class="more" v-if="contactTotal > 5" @click="handleRoute('contact')">更多》</a>
              <!--（-1 输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1" class="table-add" @click="quickOperation('addContact')"><i class="el-icon-plus"></i>新增联系人</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">姓名</th>
                <th class="td-title">联系电话</th>
                <th class="td-title">公司职务</th>
                <th class="td-title">微信</th>
                <th class="td-title">QQ</th>
                <th class="td-title">创建时间</th>
              </tr>
              <tr v-for="item in contactList" :key="item.id">
                <td>{{item.contacterName}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.position}}</td>
                <td>{{item.wx}}</td>
                <td>{{item.qq}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">
              跟单记录({{orderRecordsTotal}})
              <a class="more" v-if="orderRecordsTotal > 0" @click="handleRoute('orderRecords')">更多》</a>
              <!--（-1输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1" class="table-add" @click="quickOperation('addRecord')"><i class="el-icon-plus"></i>新增跟单记录</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title" colspan="4">跟单描述</th>
                <th class="td-title" colspan="2">所在公海</th>
              </tr>
              <tr>
                <td colspan="4">客户创建时间</td>
                <td colspan="2">test</td>
              </tr>
            </table>

            <p class="table-title">
              APP订单({{appOrderTotal}})
              <a class="more" v-if="appOrderTotal > 5" @click="handleRoute('order')">更多》</a>
              <!--（-1 输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1" class="table-add" @click="quickOperation('addOrder')"><i class="el-icon-plus"></i>新增关联订单</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">订单编号</th>
                <th class="td-title">是否续费</th>
                <th class="td-title">订单状态</th>
                <th class="td-title">购买商品</th>
                <th class="td-title">订单金额</th>
                <th class="td-title">回款金额</th>
                <th class="td-title">创建时间</th>
                <th class="td-title">关联状态</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <!--<team-member :detail="salesOpportunitiesDetail"></team-member>-->

        <div class="team-title">
          <span class="title-text">团队成员</span>
        </div>
        <ul class="team-member">
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorName}}</h4>
              <p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.salerName}}</h4>
              <p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.salerMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-2">销售员</span>
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorName}}</h4>
              <p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-2">咨询师</span>
            </div>
          </li>
        </ul>
        <!--输单后隐藏删除以外得按钮-->
        <div class="team-btn-group" v-if="salesOpportunitiesDetail.stage !== -1">
          <div v-if="salesOpportunitiesDetail.team && !salesOpportunitiesDetail.team.counselorId" class="btn-item-1" @click="operateOptions('apply')">申请咨询师协同</div>
          <div class="btn-item-2" @click="operateOptions('exit')">咨询师主动退出</div>
          <div class="btn-item-3" @click="operateOptions('replace')">申请替换咨询师</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  // import teamMember from '../../../components/teamMember'
  import moveDialog from './moveDialog'
  import applyDialog from './applyDialog'
  // import { arrToStr } from '../../../utils/utils'
  import discard from './discard'
  import addDialog from './addDialog'
  import webStorage from 'webStorage'
  import addContactDialog from '../contacts/addDialog'
  // import addChanceDialog from '../salesOpportunities/addDialog'
  import addOrderDialog from '../salesOrders/addDialog'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        activeViewName: '',
        contactList: [],
        contactTotal: 0,
        orderRecordsList: [],
        orderRecordsTotal: 0,
        appOrderList: [],
        appOrderTotal: 0,
      }
    },
    computed: {
      ...mapState('constData', [
        'salesState',
      ]),
      ...mapState('salesOpportunities', [
        'salesOpportunitiesDetail',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
      // teamMember,
      moveDialog,
      applyDialog,
    },
    methods: {
      ...mapActions('salesOpportunities', [
        'ac_salesOpportunitiesDetail',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push(
          {name: 'salesOpportunitiesDetail', params: {end: 'FE'}, query: {view: tab.name, id: this.$route.query.id}})
      },
      operateOptions (op) {
        switch (op) {
          case 'move': // 转移
            // this.moveDialogOpen = true
            this.$vDialog.modal(moveDialog, {
              title: '转移销售机会',
              width: 500,
              height: 240,
              params: {
                salesState: this.salesState,
                multipleSelection: [{id: this.salesOpportunitiesDetail.id}],
              },
              callback (data) {},
            })
            break
          case 'delete': // 删除
            this.$confirm('确定删除销售机会, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOpportunities.delete(this.salesOpportunitiesDetail.id, (data) => {
                if (data.status) {
                  this.$message.success('删除成功')
                  this.$router.push({name: 'salesOpportunitiesList', params: 'FE'})
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'discard': // 输单
            this.$vDialog.modal(discard, {
              title: '销售输单',
              width: 520,
              height: 340,
              params: {
                detail: this.salesOpportunitiesDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
          case 'apply': // 申请咨询师
            this.$vDialog.modal(applyDialog, {
              title: '申请咨询师协同',
              width: 520,
              height: 280,
              params: {
                type: 'apply',
                chanceId: this.salesOpportunitiesDetail.id,
                exceptUserIds: this.getTeamAndOwn()
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
          case 'exit': // 咨询师退出
            this.$confirm('确定咨询师主动退出, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOpportunities.counselorExit(this.salesOpportunitiesDetail.id, (data) => {
                if (data.status) {
                  this.$message.success('操作成功')
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
              })
            })
            break
          case 'replace': // 咨询师替换
            this.$vDialog.modal(applyDialog, {
              title: '申请替换咨询师',
              width: 520,
              height: 280,
              params: {
                type: 'replace',
                chanceId: this.salesOpportunitiesDetail.id,
                exceptUserIds: this.getTeamAndOwn()
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
        }
      },
      getTeamAndOwn () {
        let arrIds = []
        arrIds.push(webStorage.getItem('userInfo').id) // 自己
        if (this.salesOpportunitiesDetail.team) {
          if (this.salesOpportunitiesDetail.team.creator) { // 创建人
            arrIds.push(this.salesOpportunitiesDetail.team.creator)
          }
          if (this.salesOpportunitiesDetail.team.counselorId) { // 咨询师
            arrIds.push(this.salesOpportunitiesDetail.team.counselorId)
          }
          if (this.salesOpportunitiesDetail.team.salerId) { // 销售
            arrIds.push(this.salesOpportunitiesDetail.team.salerId)
          }
        }
        return [...new Set(arrIds)] // 去重
      },
      getSalesOpportunitiesDetail () {
        this.dataLoading = true
        API.salesOpportunities.detail(this.$route.query.id, (data) => {
          this.ac_salesOpportunitiesDetail(data.data)
          this.getContactList(data.data.customerId)
          this.getOrderRecordsList(data.data.id)
          this.getAppOrderList(data.data.id)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getContactList (customerId) {
        API.contacts.list({customerId: customerId, pageSize: 5}, (da) => {
          this.contactList = da.data.content
          this.contactTotal = da.data.totalElements
        })
      },
      getOrderRecordsList (id) {
        API.orderRecords.list({chanceId: id, pageSize: 5}, (da) => {
          this.orderRecordsList = da.data.content
          this.orderRecordsList = da.data.totalElements
        })
      },
      getAppOrderList (id) {
        API.salesOrder.list({chanceId: id, pageSize: 5}, (da) => {
          this.orderRecordsList = da.data.content
          this.orderRecordsList = da.data.totalElements
        })
      },
      stepClickHandle (step) {
        // alert(step.type)
        // console.log(step)
        switch (step.type) {
          case 3:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售机会已经输单，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage >= 3) {
              this.$message.warning('销售机会已确认！')
            } else {
              this.$vDialog.modal(addDialog, {
                title: '确定销售需求',
                width: 900,
                height: 400,
                params: {
                  salesState: this.salesState,
                  detail: JSON.parse(JSON.stringify(this.salesOpportunitiesDetail))
                },
                callback: (data) => {
                  if (data.type === 'save') {
                    this.getSalesOpportunitiesDetail()
                  }
                },
              })
            }
            break
          case 4:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售机会已经输单，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage !== 3) {
              this.$message.warning('需求确定阶段的订单才能预下订单！')
            } else {
              this.$vDialog.modal(addOrderDialog, {
                title: '预下订单',
                width: 900,
                height: 380,
                params: {
                  detailCustomersId: this.salesOpportunitiesDetail.customerId,
                  detailChangeId: this.salesOpportunitiesDetail.id
                },
                callback (data) {
                  if (data.type === 'save') {
                    that.getAppOrderList(that.salesOpportunitiesDetail.id)
                  }
                },
              })
            }
            break
          case 5:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售机会已经输单，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage !== 3) {
              this.$message.warning('预下订单阶段才能签单！')
            } else {
            }
            break
        }
      },
      handleRoute (list) {
        switch (list) {
          case 'contact':
            this.$router.push({name: 'contactsList', query: {customerId: this.salesOpportunitiesDetail.customerId}})
            break
          case 'orderRecords':
            this.$router.push({name: 'orderRecordsList', query: {customerId: this.salesOpportunitiesDetail.id}})
            break
          case 'order':
            this.$router.push({name: 'salesOrdersList', query: {customerId: this.salesOpportunitiesDetail.id}})
            break
        }
      },
      quickOperation (op) {
        let that = this
        switch (op) {
          case 'addContact':
            this.$vDialog.modal(addContactDialog, {
              title: '新增联系人',
              width: 900,
              height: 460,
              params: {
                detailCustomersId: this.salesOpportunitiesDetail.customerId,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getContactList(that.salesOpportunitiesDetail.customerId)
                }
              },
            })
            break
          case 'addRecord':
            // that.$router.push({name: 'salesOpportunitiesDetail', query: {view: 'detail', id: that.salesOpportunitiesDetail.id}, params: {end: 'FE'}})
            break
          case 'addOrder':
            this.$vDialog.modal(addOrderDialog, {
              title: '新增关联订单',
              width: 900,
              height: 380,
              params: {
                detailCustomersId: this.salesOpportunitiesDetail.customerId,
                detailChangeId: this.salesOpportunitiesDetail.id
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getAppOrderList(that.salesOpportunitiesDetail.id)
                }
              },
            })
            break
        }
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getSalesOpportunitiesDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .step-box {
    margin-top: 20px;
  }

  .step {
    width: 90%;
    display: inline-block;
  }

  .lose-bill {
    display: inline-block;
    padding: 4px 22px;
    background-color: #00A7FE;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }

  .team-btn-group {
    border: 1px;
    padding: 20px;
    .base {
      text-align: center;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid;
      margin-top: 20px;
      cursor: pointer;
    }
    .btn-item-1 {
      @extend .base;
      border-color: #39C189;
      color: #39C189;
    }
    .btn-item-2 {
      @extend .base;
      border-color: #00A7FE;
      color: #00A7FE;
    }
    .btn-item-3 {
      @extend .base;
      border-color: #F94849;
      color: #F94849;
    }
  }
</style>
