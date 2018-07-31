<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>{{customerDetail.name}}</h3>
          <p>
            <span class="com-d-item">客户所有人: <span>{{customerDetail.ownerName}}</span></span>
            <span class="com-d-item">所属公海: <span>{{customerDetail.seaName}}</span></span>
            <span class="com-d-item">创建时间: <span>{{customerDetail.created && $moment(customerDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<el-radio-group v-model="tapOption">-->
        <!--<el-radio-button class="btn-width" label="edit" @click.native="operateOptions">编辑</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="back" @click.native="operateOptions">退回公海</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="move" @click.native="operateOptions">转移</el-radio-button>-->
        <!--</el-radio-group>-->
        <ul class="com-info-op-group">
          <li class="op-active" @click="operateOptions('assign')">分配</li>
          <li @click="operateOptions('gain')">捞取</li>
          <li @click="operateOptions('group')">改变分组</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="客户资料信息" name="detail">
            <p class="table-title">客户资料信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">公司名称</td>
                <td>{{customerDetail.name}}</td>
                <td class="td-title">营业执照</td>
                <td>{{customerDetail.businessLicense}}</td>
                <td class="td-title">客户级别</td>
                <td>{{customerDetail.level}}</td>
              </tr>
              <tr>
                <td class="td-title">客户简称</td>
                <td>{{customerDetail.shortName}}</td>
                <td class="td-title">客户行业</td>
                <td>{{customerDetail.industry}}</td>
                <td class="td-title">联系电话</td>
                <td>{{customerDetail.phone}}</td>
              </tr>
              <tr>
                <td class="td-title">所在地区</td>
                <td>{{ customerDetail.provinceName }}
                  {{ customerDetail.cityName }}
                  {{ customerDetail.areaName }}
                </td>
                <td class="td-title">公司网站</td>
                <td>{{customerDetail.website}}</td>
                <td class="td-title">最近跟进人</td>
                <td>{{customerDetail.latestFollowerName}}</td>
              </tr>
              <tr>
                <td class="td-title">最近跟进时间</td>
                <td>{{customerDetail.latestReturnTime &&
                  $moment(customerDetail.latestReturnTime).format('YYYY-MM-DD')}}
                </td>
                <td class="td-title">最近跟进记录</td>
                <td>{{customerDetail.latestFollowRecord}}</td>
                <td class="td-title"></td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">客户退回次数</td>
                <td>{{customerDetail.returnTimes}}</td>
                <td class="td-title">销售机会（商品）</td>
                <td colspan="3">
                  <span v-for="item in customerDetail.chanceList" :key="item.productId">{{item.productName}}、</span>
                </td>
              </tr>
              <tr>
                <td class="td-title">客户来源</td>
                <td colspan="5">{{customerDetail.customerSourceName}}</td>
              </tr>
              <tr>
                <td class="td-title">联系地址</td>
                <td colspan="5">{{customerDetail.address}}</td>
              </tr>
              <tr>
                <td class="td-title">主营业务</td>
                <!--<td colspan="5">暂未填写主营业务{{customerDetail.business}}</td>-->
                <td colspan="5">{{customerDetail.business || '暂未填写主营业务'}}</td>
              </tr>
            </table>

            <p class="table-title">客户其他信息</p>
            <table class="detail-table">
              <!--<tr>-->
                <!--<td class="td-title">所在公海</td>-->
                <!--<td colspan="2">{{customerDetail.seaName}}</td>-->
                <!--<td class="td-title">客户状态</td>-->
                <!--<td colspan="2">-->
                   <!--<span v-for="item in customerState" :key="item.type"-->
                         <!--v-if="item.type === customerDetail.state">{{item.value}}</span>-->
                <!--</td>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td class="td-title">客户创建时间</td>-->
                <!--<td colspan="2">-->
                  <!--{{customerDetail.created && $moment(customerDetail.created).format('YYYY-MM-DD HH:mm:ss')}}-->
                <!--</td>-->
                <!--<td class="td-title">创建人</td>-->
                <!--<td colspan="2">{{customerDetail.creatorName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td class="td-title">最新修改时间</td>-->
                <!--<td colspan="2">-->
                  <!--{{customerDetail.modified && $moment(customerDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}-->
                <!--</td>-->
                <!--<td class="td-title">修改人</td>-->
                <!--<td colspan="2">{{customerDetail.modifierName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td class="td-title">最新活动时间</td>-->
                <!--<td colspan="2">-->
                  <!--{{customerDetail.activeTime && $moment(customerDetail.activeTime).format('YYYY-MM-DD HH:mm:ss')}}-->
                <!--</td>-->
                <!--<td class="td-title">跟进人</td>-->
                <!--<td colspan="2">{{customerDetail.followerName}}</td>-->
              <!--</tr>-->
              <tr>
                <td colspan="5" class="td-title">联系人操作记录</td>
                <td class="td-title">操作人</td>
                <td class="td-title">操作时间</td>
              </tr>
              <tr v-for="(item, index) in customerDetail.operateLogList" :key="index">
                <td colspan="5">{{item.detail}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.operateTime && $moment(item.operateTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="客户相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="theme" @click="handleRoute('contact')">联系人({{contactTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('chance')">销售机会({{chanceTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('order')">销售订单({{orderTotal}})</com-button>
            </div>

            <p class="table-title">
              联系人({{contactTotal}})
              <!--<a class="more" v-if="contactTotal > 5" @click="handleRoute('contact')">更多》</a>-->
              <a class="table-add" @click="quickOperation('addContact')" v-if="isFollower || isCreater"><i class="el-icon-plus"></i>新增联系人</a>
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
              销售机会({{chanceTotal}})
              <!--<a class="more" v-if="chanceTotal > 5" @click="handleRoute('chance')">更多》</a>-->
              <a class="table-add" @click="quickOperation('addChance')" v-if="isFollower || isCreater"><i class="el-icon-plus"></i>新增销售需求</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">需求商品</th>
                <th class="td-title">需求阶段</th>
                <th class="td-title">预计签单金额</th>
                <th class="td-title">预计签单时间</th>
                <th class="td-title">销售人</th>
                <th class="td-title">销售机会创建时间</th>
              </tr>
              <tr v-for="item in chanceList" :key="item.id">
                <td>{{item.intentProductName}}</td>
                <td>
                  <span v-for="st in salesState" :key="st.type"
                        v-if="st.type === item.stage">{{st.value}}&nbsp;&nbsp;{{st.percent}}</span>
                </td>
                <td>{{item.intentBillAmount}}</td>
                <td>{{item.billDate && $moment(item.billDate).format('YYYY-MM-DD')}}</td>
                <td>{{item.salerName}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">
              销售订单({{orderTotal}})
              <!--<a class="more" v-if="orderTotal > 5" @click="handleRoute('order')">更多》</a>-->
              <!--<a class="table-add" @click="quickOperation('addOrder')"><i class="el-icon-plus"></i>新增销售订单</a>-->
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">订单编号</th>
                <th class="td-title">销售商品</th>
                <th class="td-title">签单金额</th>
                <th class="td-title">回款金额</th>
                <th class="td-title">订单状态</th>
                <th class="td-title">创建时间</th>
                <th class="td-title">快捷操作</th>
              </tr>
              <tr v-for="item in orderList" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.productName}}</td>
                <td>{{item.billAmount}}</td>
                <td>{{item.refund_amount}}</td>
                <td><span v-for="os in orderState" :key="os.type"
                          v-if="item.orderState === os.type">{{os.value}}</span></td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><a class="table-op" @click="quickOperation('deleteOrder', item.id)">删除</a></td>
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
              <img style="width: 58px;height: 58px;border-radius: 100%;" v-if="customerDetail.team.avatar"
                   :src="customerDetail.team.avatar" alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{customerDetail.team.creatorName}}</h4>
              <p>{{customerDetail.team.mobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
            </div>
          </li>
          <li class="team-member-item" :key="item.salerId" v-for="item in customerDetail.team.salerList">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;" v-if="item.avatar" :src="item.avatar" alt="">
              <img v-else src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{item.salerName}}</h4>
              <p>{{item.mobilePhone}}</p>
            </div>
            <div class="post">
              <!--<span class="post-tag-1">创建人</span>-->
              <span class="post-tag-2">销售员</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addContactDialog from './addContactDialog'
  import addChanceDialog from './addChanceDialog'
  // import addOrderDialog from '../salesOrders/addDialog'
  import assignDialog from './assignDialog'
  import groupDialog from './groupDialog'
  // import { arrToStr } from '../../../utils/utils'
  import webStorage from 'webStorage'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        tapOption: '',
        activeViewName: '',
        contactList: [],
        contactTotal: 0,
        chanceList: [],
        chanceTotal: 0,
        orderList: [],
        orderTotal: 0,
        isFollower: true, // 当前用户是机会的更进人
        isCreater: true, // 当前用户是机会的创建人
        userInfo: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'customerSourceType',
        'customerState',
        'customerAddSource',
        'salesState',
        'orderState',
        'themeIndex',
        'topSource',
      ]),
      ...mapState('customer', [
        'customerDetail',
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
      ...mapActions('customer', [
        'ac_customerDetail',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'customersHighSeasDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, customerId: this.$route.query.customerId},
        })
      },
      operateOptions (op) {
        let that = this
        switch (op) {
          case 'assign':
            this.$vDialog.modal(assignDialog, {
              title: '分配客户',
              width: 500,
              height: 230,
              params: {
                customerIds: this.$route.query.customerId.toString(),
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getCustomerDetail()
                }
              },
            })
            break
          case 'gain':
            this.$confirm('确定捞取, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API.customerSea.fish({customerIds: this.$route.query.customerId.toString()}, (data) => {
                if (data.status) {
                  if (data.data.fail > 0) {
                    this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                  }
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消捞取',
              })
            })
            break
          case 'group':
            this.$vDialog.modal(groupDialog, {
              title: '改变分组',
              width: 500,
              height: 240,
              params: {
                customerIds: this.$route.query.customerId.toString(),
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getCustomerDetail()
                }
              },
            })
            break
        }
      },
      getCustomerDetail () {
        this.dataLoading = true
        API.customerSea.customerDetail(this.$route.query.customerId, (data) => {
          this.ac_customerDetail(data.data)
          if (this.userInfo.id !== data.data.team.salerId) { // 判断更进人
            this.isFollower = false
          }
          if (this.userInfo.id !== data.data.team.creator) { // 判断创建人
            this.isCreater = false
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getContactList () {
        API.contacts.listNoAuth({customerId: this.$route.query.customerId, pageSize: 1000, page: 0, sort: 'created,desc'}, (da) => {
          this.contactList = da.data.content
          this.contactTotal = da.data.totalElements
        })
      },
      getChanceList () {
        API.salesOpportunities.listNoAuth({customerId: this.$route.query.customerId, pageSize: 1000, page: 0, sort: 'created,desc'}, (da) => {
          this.chanceList = da.data.content
          this.chanceTotal = da.data.totalElements
        })
      },
      getOrderList () {
        API.salesOrder.listNoAuth({customerId: this.$route.query.customerId, pageSize: 1000, page: 0, sort: 'created,desc'}, (da) => {
          this.orderList = da.data.content
          this.orderTotal = da.data.totalElements
        })
      },
      handleRoute (list) {
        // switch (list) {
        //   case 'contact':
        //     this.$router.push({name: 'contactsList', query: {customerId: this.$route.query.customerId}})
        //     break
        //   case 'chance':
        //     this.$router.push({name: 'salesOpportunitiesList', query: {customerId: this.$route.query.customerId}})
        //     break
        //   case 'order':
        //     this.$router.push({name: 'salesOrdersList', query: {customerId: this.$route.query.customerId}})
        //     break
        // }
      },
      currentUserIsTeamNum () { // 判断当前用户是否为团对成员
        let currentUserId = webStorage.getItem('userInfo').id
        let team = this.customerDetail.team // creator 创建人id; salerList[] salerId 销售员id
        if (currentUserId === team.creator) {
          return true
        } else {
          let isSaler = team.salerList.some(item => {
            return item.salerId === currentUserId
          })
          if (isSaler) {
            return true
          } else {
            return false
          }
        }
      },
      quickOperation (op, id) {
        // eslint-disable-next-line
        let that = this
        let deleteId = id || ''
        switch (op) {
          case 'addContact':
            if (this.currentUserIsTeamNum()) {
              this.$vDialog.modal(addContactDialog, {
                title: '新增联系人',
                width: 900,
                height: 460,
                params: {
                  detailCustomersId: this.customerDetail.id,
                },
                callback (data) {
                  if (data.type === 'save') {
                    that.getContactList()
                  }
                },
              })
            } else {
              this.$message.warning('非团队成员！不能添加。')
            }
            break
          case 'addChance':
            if (this.currentUserIsTeamNum()) {
              this.$vDialog.modal(addChanceDialog, {
                title: '新增销售机会',
                width: 900,
                height: 400,
                params: {
                  salesState: this.salesState,
                  stateValue: 1, // 设置默认，销售阶段
                  detailCustomersId: this.customerDetail.id,
                  topSource: this.topSource, // 顶级客户来源
                },
                callback (data) {
                  if (data.type === 'save') {
                    that.getChanceList()
                  }
                },
              })
            } else {
              this.$message.warning('非团队成员！不能添加。')
            }
            break
          // case 'addOrder':
          //   this.$vDialog.modal(addOrderDialog, {
          //     title: '添加订单',
          //     width: 900,
          //     height: 340,
          //     params: {
          //       // id: '123456',
          //     },
          //     callback (data) {
          //       if (data.type === 'save') {
          //         that.getOrderList()
          //       }
          //     },
          //   })
          //   break
          case 'deleteOrder':
            // alert(deleteId)
            break
        }
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.userInfo = webStorage.getItem('userInfo')
      this.getCustomerDetail()
      this.getContactList()
      this.getChanceList()
      this.getOrderList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
