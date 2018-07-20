<!-- 客户回复的：
按钮设置逻辑，跟进人可以操作销售机会所有按钮，创建人员，只能操作“添加联系人”，
公海池的销售机会详情页面，非团队成员无权限查看，所以，不存在，没有跟进这个销售机会的去操作这个销售机会，
也就不用控制那些按钮的显示了
-->
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
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower"
              @click="operateOptions('move')">转移
          </li>
          <li v-if="isChangeFollower" @click="operateOptions('delete')">删除</li>
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
        <!--输单后隐藏删除以外得按钮， 调整为更近人操作-->
        <a v-if="salesOpportunitiesDetail.stage !== -1 && isChanceCreater" class="lose-bill"
           @click="operateOptions('discard')">输单</a>
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
                <td>{{salesOpportunitiesDetail.billDate &&
                  $moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}
                </td>
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
                <td class="td-title">需求来源</td>
                <td colspan="5">{{salesOpportunitiesDetail.chanceSourceName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售合同网址</td>
                <!--<td colspan="5">{{salesOpportunitiesDetail.contractUrl}}</td>-->
                <td colspan="5">
                  <router-link v-if="salesOpportunitiesDetail.oncePay === true"
                               :to="{name: 'onetimeContract', query: {name: salesOpportunitiesDetail.intentProductName}}"
                               target="_blank">查看一次合同
                  </router-link>
                  <router-link v-if="salesOpportunitiesDetail.oncePay === false"
                               :to="{name: 'multipleContracts', query: {name: salesOpportunitiesDetail.intentProductName}}"
                               target="_blank">查看分次合同
                  </router-link>
                </td>
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
                <td colspan="3">{{salesOpportunitiesDetail.created &&
                  $moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td class="td-title">所有人</td>
                <td>{{salesOpportunitiesDetail.creatorName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售机会修改时间</td>
                <td colspan="3">{{salesOpportunitiesDetail.modified &&
                  $moment(salesOpportunitiesDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td class="td-title">修改人</td>
                <td>{{salesOpportunitiesDetail.modifierName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售机会活动时间</td>
                <td colspan="3">{{ salesOpportunitiesDetail.followDate &&
                  $moment(salesOpportunitiesDetail.followDate).format('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td class="td-title">跟进人</td>
                <td>{{salesOpportunitiesDetail.team.salerName}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="销售机会相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="theme" @click="handleRoute('contact')">联系人({{contactTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('orderRecords')">跟单记录({{orderRecordsTotal}})
              </com-button>
              <com-button buttonType="grey" @click="handleRoute('order')">APP订单({{orderTotal}})</com-button>
            </div>

            <p class="table-title">
              联系人({{contactTotal}})
              <!--<a class="more" v-if="contactTotal > 5" @click="handleRoute('contact')">更多》</a>-->
              <!--（-1 输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1 && (isChangeFollower || isChanceCreater)" class="table-add"
                 @click="quickOperation('addContact')"><i class="el-icon-plus"></i>新增联系人</a>
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
              <!--<a class="more" v-if="orderRecordsTotal > 5" @click="handleRoute('orderRecords')">更多》</a>-->
              <!--（-1输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower" class="table-add"
                 @click="quickOperation('addRecord')"><i class="el-icon-plus"></i>新增跟单记录</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title" colspan="4">跟单描述</th>
                <th class="td-title" colspan="1">跟进人</th>
                <th class="td-title" colspan="1">跟进时间</th>
              </tr>
              <tr v-for="item in orderRecordsList" :key="item.id">
                <td colspan="4" style="text-align: left;padding-left: 5px;padding-right: 5px;">{{item.followDesc}}</td>
                <td colspan="1">{{item.creatorName}}</td>
                <td colspan="1">{{$moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">
              销售订单({{orderTotal}})
              <!--<a class="more" v-if="orderTotal > 5" @click="handleRoute('order')">更多》</a>-->
              <!--（-1 输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower" class="table-add"
                 @click="quickOperation('addOrder')"><i class="el-icon-plus"></i>新增关联订单</a>
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
                <th class="td-title">操作</th>
              </tr>
              <tr>
              <tr v-for="item in orderList" :key="item.id">
                <td>{{item.id}}<span v-if="item.orderId">{{'-' + item.orderId}}</span></td>
                <td>{{item.isRenew?'续费订单':'新签订单'}}</td>
                <td><span v-for="os in orderState" :key="os.type"
                          v-if="item.orderState === os.type">{{os.value}}</span>
                </td>
                <td>{{item.productName}}</td>
                <td>{{item.billAmount}}</td>
                <td>{{item.refund_amount}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>
                  <span v-if="item.relState ===1">关联中</span>
                  <span v-if="item.relState ===2">已完成</span>
                  <span v-if="item.relState ===3">已作废</span>
                </td>
                <td>
                  <!--续费按钮出现的条件：-->
                  <!--1.订单中的商品为计时类商品；-->
                  <!--2.订单处于服务中或已完成状态。-->
                  <!--计费类型（TIMES计次，ANNUALLY包年） 包年就是计时商品-->
                  <a v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower && (item.orderState === 3 || item.orderState === 4) && item.billingType === 'ANNUALLY'" class="table-op" @click="quickOperation('reNew', item.id, item)">续费</a>
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
              <img style="width: 58px;height: 58px;border-radius: 100%;"
                   v-if="salesOpportunitiesDetail.team.creatorAvatar" :src="salesOpportunitiesDetail.team.creatorAvatar"
                   alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
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
              <img style="width: 58px;height: 58px;border-radius: 100%;"
                   v-if="salesOpportunitiesDetail.team.salerAvatar" :src="salesOpportunitiesDetail.team.salerAvatar"
                   alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
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
              <img style="width: 58px;height: 58px;border-radius: 100%;"
                   v-if="salesOpportunitiesDetail.team.counselorAvatar"
                   :src="salesOpportunitiesDetail.team.counselorAvatar" alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
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
          <div v-if="salesOpportunitiesDetail.team && !salesOpportunitiesDetail.team.counselorId && isChangeFollower"
               class="btn-item-1" @click="operateOptions('apply')">申请咨询师协同
          </div>
          <div v-if="salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorId && isChangeFollower" class="btn-item-2" @click="operateOptions('exit')">咨询师主动退出</div>
          <div v-if="salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorId && isChangeFollower" class="btn-item-3" @click="operateOptions('replace')">申请替换咨询师</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  import moveDialog from './moveDialog'
  import applyDialog from './applyDialog'
  // import { arrToStr } from '../../../utils/utils'
  import discard from './discard'
  import addDialog from './addDialog'
  import webStorage from 'webStorage'
  import addContactDialog from '../contacts/addDialog'
  // import addChanceDialog from '../salesOpportunities/addDialog'
  import addOrderDialog from '../salesOrders/addDialog'
  import addRenew from '../salesOrders/addRenew'
  import addOrderRecord from '../orderRecords/addDialog'
  import order from './order'

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
        orderList: [],
        orderTotal: 0,
        userInfo: '',
        isChangeFollower: true, // 当前用户是机会的更进人
        isChanceCreater: true, // 当前用户是机会的创建人
      }
    },
    computed: {
      ...mapState('constData', [
        'salesState',
        'orderState',
        'themeIndex',
        'topSource',
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
                exceptUserIds: this.getTeamAndOwn(),
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
                exceptUserIds: this.getTeamAndOwn(),
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
          if (this.userInfo.id !== this.salesOpportunitiesDetail.team.salerId) { // 判断机会的更进人
            this.isChangeFollower = false
          }
          if (this.userInfo.id !== this.salesOpportunitiesDetail.team.creator) { // 判断机会的创建人
            this.isChanceCreater = false
          }
        })
      },
      getContactList (customerId) {
        API.contacts.listNoAuth({customerId: customerId, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
          this.contactList = da.data.content
          this.contactTotal = da.data.totalElements
        })
      },
      getOrderRecordsList (id) {
        API.orderRecords.listNoAuth({chanceId: id, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
          this.orderRecordsList = da.data.content
          this.orderRecordsTotal = da.data.totalElements
        })
      },
      getAppOrderList (id) {
        API.salesOrder.listNoAuth({chanceId: id, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
          this.orderList = da.data.content
          this.orderTotal = da.data.totalElements
        })
      },
      stepClickHandle (step) {
        // alert(step.type)
        // console.log(step)
        switch (step.type) {
          case 3:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售机会已经输单，不能操作！')
            } else if (!this.isChangeFollower) {
              this.$message.warning('不是销售跟进人员，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage >= 3) {
              this.$message.warning('销售机会已确认！')
            } else {
              this.$vDialog.modal(addDialog, {
                title: '确定销售需求',
                width: 900,
                height: 400,
                params: {
                  salesState: this.salesState,
                  detail: JSON.parse(JSON.stringify(this.salesOpportunitiesDetail)),
                  topSource: this.topSource, // 顶级客户来源
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
            } else if (!this.isChangeFollower) {
              this.$message.warning('不是销售跟进人员，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage !== 3) {
              this.$message.warning('需求确定阶段的订单才能预下订单！')
            } else {
              this.$vDialog.modal(addOrderDialog, {
                title: '预下订单',
                width: 900,
                height: 480,
                params: {
                  detailCustomersId: this.salesOpportunitiesDetail.customerId,
                  detailChanceId: this.salesOpportunitiesDetail.id,
                  fromChance: true,
                },
                callback: (data) => {
                  if (data.type === 'save') {
                    this.getSalesOpportunitiesDetail()
                  }
                },
              })
            }
            break
          case 5:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售机会已经输单，不能操作！')
            } else if (!this.isChangeFollower) {
              this.$message.warning('不是销售跟进人员，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage !== 4) {
              this.$message.warning('预下订单阶段才能签单！')
            } else {
              this.$vDialog.modal(order, {
                title: '客户签单',
                width: 964,
                height: 500,
                params: {
                  salesOpportunitiesDetail: this.salesOpportunitiesDetail,
                  orderState: this.orderState,
                },
                callback: (data) => {
                  if (data.type === 'save') {
                    this.getSalesOpportunitiesDetail()
                  }
                },
              })
            }
            break
        }
      },
      handleRoute (list) {
        switch (list) {
          case 'contact':
            // this.$router.push({name: 'contactsList', query: {customerId: this.salesOpportunitiesDetail.customerId}})
            break
          case 'orderRecords': // 机会
            // this.$router.push({name: 'orderRecordsList', query: {chanceId: this.salesOpportunitiesDetail.id}})
            break
          case 'order':
            // this.$router.push({name: 'salesOrdersList', query: {chanceId: this.salesOpportunitiesDetail.id}})
            break
        }
      },
      quickOperation (op, id, obj) {
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
            this.$vDialog.modal(addOrderRecord, {
              title: '新建跟单记录',
              width: 700,
              height: 320,
              params: {
                detailCustomersId: this.salesOpportunitiesDetail.customerId,
                detailChanceId: this.salesOpportunitiesDetail.id,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getOrderRecordsList(that.salesOpportunitiesDetail.id)
                }
              },
            })
            break
          case 'addOrder':
            this.$vDialog.modal(addOrderDialog, {
              title: '新增关联订单',
              width: 900,
              height: 480,
              params: {
                detailCustomersId: this.salesOpportunitiesDetail.customerId,
                detailChanceId: this.salesOpportunitiesDetail.id,
                fromChance: true,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
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
                orderDetail: obj,
                topSource: this.topSource, // 顶级客户来源
                isRenew: true
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunitiesDetail()
                }
              },
            })
            break
        }
      },
      routeToContract () {
        this.$router.push({name: 'onetimeContract', query: {name: '商品名称'}})
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getSalesOpportunitiesDetail()
      this.userInfo = webStorage.getItem('userInfo')
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
