<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--<el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>客户</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>客户详情</el-breadcrumb-item>-->
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
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>{{customerDetail.name}}
            <span class="tap" style="border: 1px solid #ccc; font-size: 14px;padding: 2px 5px;position: relative;top: -3px;">
              {{customerDetail.cate === 1 ? '个人' : '机构'}}</span> </h3>
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
          <li class="op-active" @click="operateOptions('edit')">编辑</li>
          <!--<li @click="operateOptions('back')">退回公海</li>-->
          <!--<li @click="operateOptions('move')">转移</li>-->
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
                <td class="td-title">客户类型</td>
                <td>{{customerDetail.cate === 1 ? '个人' : '机构'}}</td>
                <td class="td-title">客户名称</td>
                <td>{{customerDetail.name}}</td>
                <td class="td-title">客户识别码</td>
                <td>{{customerDetail.cdKey}}</td>
              </tr>
              <tr>
                <td class="td-title">所在公海</td>
                <td>{{customerDetail.seaName}}</td>
                <td class="td-title">客户级别</td>
                <td>{{customerDetail.level}}</td>
                <td class="td-title">客户行业</td>
                <td>{{customerDetail.industry}}</td>
              </tr>
              <tr>
                <td class="td-title">所在地区</td>
                <td>{{ customerDetail.provinceName }}
                  {{ customerDetail.cityName }}
                  {{ customerDetail.areaName }}
                </td>
                <td class="td-title">公司网站</td>
                <td>{{customerDetail.website}}</td>
                <td class="td-title"></td>
                <td></td>
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
              <tr>
                <td class="td-title">客户有效性</td>
                <td colspan="5" v-if='customerDetail.customerStatus != -1'>{{customerStatus[customerDetail.customerStatus] || '待判断'}}</td>
                <td colspan="5" v-else>无效</td>
              </tr>
							<tr>
								<td class='td-title'>无效原因</td>
								<td colspan="5">{{customerDetail.invalidCauseName}}</td>
							</tr>
							<tr>
								<td class='td-title'>无效描述</td>
								<td colspan="5">{{customerDetail.invalidRemark}}</td>
							</tr>
							<tr>
								<td class='td-title'>证明文件</td>
								<td colspan="5">
									<a :href="customerDetail.invalidFileUrl" :download="customerDetail.invalidFileName" target="_blank">{{customerDetail.invalidFileName}}</a>
								</td>
							</tr>
            </table>

            <p class="table-title">客户操作记录</p>
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
              <!--{{customerDetail.created &&-->
              <!--$moment(customerDetail.created).format('YYYY-MM-DD HH:mm:ss')}}-->
              <!--</td>-->
              <!--<td class="td-title">创建人</td>-->
              <!--<td colspan="2">{{customerDetail.creatorName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
              <!--<td class="td-title">最新修改时间</td>-->
              <!--<td colspan="2">-->
              <!--{{customerDetail.modified &&-->
              <!--$moment(customerDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}-->
              <!--</td>-->
              <!--<td class="td-title">修改人</td>-->
              <!--<td colspan="2">{{customerDetail.modifierName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
              <!--<td class="td-title">最新活动时间</td>-->
              <!--<td colspan="2">-->
              <!--{{customerDetail.activeTime &&-->
              <!--$moment(customerDetail.activeTime).format('YYYY-MM-DD HH:mm:ss')}}-->
              <!--</td>-->
              <!--<td class="td-title">跟进人</td>-->
              <!--<td colspan="2">{{customerDetail.followerName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
              <!--<td colspan="5" class="td-title">客户操作记录</td>-->
              <!--<td class="td-title">操作人</td>-->
              <!--<td class="td-title">操作时间</td>-->
              <!--</tr>-->
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
              <a class="table-add" @click="quickOperation('addContact')"><i class="el-icon-plus"></i>新增联系人</a>
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
              <a class="table-add" @click="quickOperation('addChance')"><i class="el-icon-plus"></i>新增销售需求</a>
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
              <!-- <a class="table-add" @click="quickOperation('addOrder')"><i class="el-icon-plus"></i>新增销售订单</a> -->
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
                <td>
                  <a class="table-op" @click="quickOperation('deleteOrder', item.id)">删除</a>
                  <!--续费按钮出现的条件：-->
                  <!--1.订单中的商品为计时类商品；-->
                  <!--2.订单处于服务中或已完成状态。-->
                  <!--计费类型（TIMES计次，ANNUALLY包年） 包年就是计时商品-->
                  <a class="table-op"
                     v-if="(item.orderState === 3 || item.orderState === 4) && item.billingType === 'ANNUALLY'"
                     @click="quickOperation('reNew', item.id, item)">续费</a>
                </td>
              </tr>
            </table>

            <p class="table-title">通话记录</p>
            <ul class='all-callRecord'>
              <li class='noData' v-if='callList.length < 1'>暂无通话记录</li>
              <li v-for='item in callList' :key='item.id'>
                <div class='all-callRecord-time'>
                  <p class='all-callRecord-time-date'>{{item.created && $moment(item.created).format('YYYY-MM-DD')}}</p>
                  <p class='all-callRecord-time-time'>{{item.created && $moment(item.created).format('HH:mm:ss')}}</p>
                </div>
                <div class='all-callRecord-content'>
                  <p class='all-callRecord-content-info'>
                    <span class='all-callRecord-content-info-contant'>
                      <img  class='all-callRecord-content-info-contant-img' src="../../../../assets/icon/call-cancat.png" alt="">
                      <span class='all-callRecord-content-info-contant-name'>{{item.userName}}</span>
                      <img class='all-callRecord-content-info-contant-jian' src="../../../../assets/icon/call-left-j.png" alt="" v-if='item.direct == 2'>
                      <img class='all-callRecord-content-info-contant-jian' src="../../../../assets/icon/call-right-j.png" alt="" v-else>
                      <img  class='all-callRecord-content-info-contant-img' src="../../../../assets/icon/call-cancat.png" alt="" v-if='item.direct == 3'>
                      <img  class='all-callRecord-content-info-contant-img imgmt' src="../../../../assets/icon/call-cancat2.png" alt="" v-else>
                      <span class='all-callRecord-content-info-contant-name'>{{item.contacterName}}</span>
                    </span>
                    <span class='all-callRecord-content-info-time' @click='listenSoundRecord(item)' v-if='item.answered == 1'>
                      <span class='all-callRecord-content-info-time-duration'>{{getTimeDifference(item.callsec)}}</span>
                      <span class='all-callRecord-content-info-time-frame'>{{item.startTime && $moment(item.startTime).format('HH:mm:ss')}}-{{item.endTime && $moment(item.endTime).format('HH:mm:ss')}}</span>
                    </span>
                    <span class='all-callRecord-content-info-time' v-if='item.answered == 2'>未接通</span>
                    <span class='all-callRecord-content-info-time' v-if='item.answered == null'>同步中</span>
                    <span class='all-callRecord-content-info-name'>{{item.intentProductName}}</span>
                  </p>
                  <p class='all-callRecord-content-remark' v-if='item.remark'>备注 : {{item.remark}}</p>
                  <el-button type="success" plain size="mini" @click='addRemark(item)' v-else>添加备注</el-button>
                </div>
              </li>
            </ul>
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
              <img v-else src="../../../../assets/icon/headDefault.png" alt="">
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
              <img v-else src="../../../../assets/icon/headDefault.png" alt="">
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
    <!-- 录音弹框 -->
    <el-dialog
      title='录音文件'
      :visible.sync="soundRecording"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <audio style='width: 100%;' :src="soundRecordingUrl" controls="controls"></audio>
      </div>
    </el-dialog>
    <!-- 添加备注弹框 -->
    <el-dialog
      title='添加备注'
      :visible.sync="showRemarks"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <el-form label-width="80px">
          <el-form-item label='备注信息'>
            <el-input type='textarea' :rows="5" placeholder="请输入备注信息" v-model="remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRemarks = false">取 消</el-button>
        <el-button type="primary" @click="subRemarksInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addContactDialog from '../contacts/addDialog'
  import addChanceDialog from '../salesOpportunities/addDialog'
  import addOrderDialog from '../salesOrders/addDialog'
  import addRenew from '../salesOrders/addRenew'
  import addDialog from './addDialog'
  import modAddDialog from './modAddDialog'
  // import { arrToStr } from '../../../utils/utils'
  import webStorage from 'webStorage'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        showRemarks: false,     //备注弹框
        remarkRecordId: '',    //要添加备注的id
        remark: '',            //备注信息
        soundRecording: false, //录音弹框
        soundRecordingUrl: '', //音频地址
        callList: [],          //通话记录列表
        tapOption: '',
        activeViewName: '',
        isCustomerFollower: true, // 当前用户是客户的更进人
        contactList: [],
        contactTotal: 0,
        chanceList: [],
        chanceTotal: 0,
        orderList: [],
        orderTotal: 0,
				customerStatus: {
					0: '待判断',
					1: '有效',
				},
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
      // moveDialog,
    },
    methods: {
      ...mapActions('customer', [
        'ac_customerDetail',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'customersDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, customerId: this.$route.query.customerId},
        })
      },
      operateOptions (option) {
        switch (option) {
          case 'edit':
            this.$vDialog.modal(modAddDialog, {
              title: this.customerDetail.visitorType === 1 ? '编辑访客' : '编辑客户',
              width: 900,
              height: 460,
              params: {
                customerAddSource: this.customerAddSource,
                detail: this.customerDetail,
                topSource: this.topSource, // 顶级客户来源
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getCustomerDetail()
                }
              },
            })
            break
          // case 'back':
          //   this.$vDialog.modal(returnPoll, {
          //     title: '退回公海',
          //     width: 600,
          //     height: 220,
          //     params: {
          //       customerIds: [{id: this.$route.query.customerId}],
          //     },
          //     callback: (data) => {
          //       if (data.type === 'save') {
          //         this.getCustomerList(this.currentPage - 1, this.pagesOptions.pageSize, this.customerType)
          //       }
          //     },
          //   })
          //   break
          // case 'move':
          //   this.$vDialog.modal(moveDialog, {
          //     title: '转移客户',
          //     width: 600,
          //     height: 420,
          //     params: {
          //       customerIds: [{id: this.$route.query.customerId}],
          //     },
          //     callback: (data) => {
          //       if (data.type === 'save') {}
          //     },
          //   })
          //   break
        }
      },
      getCustomerDetail () {
        this.dataLoading = true
        API.customer.detail({id: this.$route.query.customerId}, (data) => {
          this.ac_customerDetail(data.data)
          // 判断当前登陆用户是否是该客户的跟进人;
          let currentUserId = webStorage.getItem('userInfo').id, _id = data.data.ownerId;
          if(currentUserId == _id) {
            this.isCustomerFollower = true;
          }else {
            this.isCustomerFollower = false;
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getContactList () { // 相关
        API.contacts.listNoAuth(
          {customerId: this.$route.query.customerId, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
            this.contactList = da.data.content
            this.contactTotal = da.data.totalElements
          })
      },
      getChanceList () { // 相关
        API.salesOpportunities.listNoAuth(
          {customerId: this.$route.query.customerId, pageSize: 1000, page: 0, sort: 'created,desc'}, (da) => {
            this.chanceList = da.data.content
            this.chanceTotal = da.data.totalElements
          })
      },
      getOrderList () { // 相关
        API.salesOrder.listNoAuth(
          {customerId: this.$route.query.customerId, pageSize: 1000, page: 0, sort: 'created,desc'}, (da) => {
            this.orderList = da.data.content
            this.orderTotal = da.data.totalElements
          })
      },
      handleRoute (list) {
        switch (list) { // 相关列表和菜单列表权限不同，不能直接跳过去
          case 'contact':
            // this.$router.push({name: 'contactsList', query: {customerId: this.$route.query.customerId}})
            break
          case 'chance':
            // this.$router.push({name: 'salesOpportunitiesList', query: {customerId: this.$route.query.customerId}})
            break
          case 'order':
            // this.$router.push({name: 'salesOrdersList', query: {customerId: this.$route.query.customerId}})
            break
        }
      },
      quickOperation (op, id, obj) {
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
                    // that.dataLoading = true
                    that.getContactList()
                    // setTimeout(() => {
                    //   that.dataLoading = false
                    // }, 500)
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
          case 'addOrder':
            if (this.currentUserIsTeamNum()) {
              this.$vDialog.modal(addOrderDialog, {
                title: '添加订单',
                width: 900,
                height: 480,
                params: {
                  detailCustomersId: this.customerDetail.id,
                  topSource: this.topSource, // 顶级客户来源
                },
                callback (data) {
                  if (data.type === 'save') {
                    that.getOrderList()
                  }
                },
              })
            } else {
              this.$message.warning('非团队成员！不能添加。')
            }
            break
          case 'reNew':
            if (this.currentUserIsTeamNum()) {
              this.$vDialog.modal(addRenew, {
                title: '续费',
                width: 900,
                height: 480,
                params: {
                  orderDetail: obj,
                  topSource: this.topSource, // 顶级客户来源
                  isRenew: true,
                },
                callback (data) {
                  if (data.type === 'save') {
                    that.getOrderList()
                  }
                },
              })
            } else {
              this.$message.warning('非团队成员！不能添加。')
            }
            break
          case 'deleteOrder':
            if (this.currentUserIsTeamNum()) {
              this.$confirm('确定删除销售订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                API.salesOrder.deleteOrder(deleteId, (da) => {
                  if (da.status) {
                    this.$message({
                      type: 'success',
                      message: '删除成功!',
                    })
                    this.getOrderList()
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除',
                })
              })
            } else {
              this.$message.warning('非团队成员！不能添加。')
            }
            break
        }
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
      // 获取通话记录
      getCallRecordList (id) {
        API.salesOrder.zhuxinCustomerCallRecordList(id, (da) => {
          if(da.status) {
            this.callList = da.data
          }
        })
      },
      // 去听录音
      listenSoundRecord (item) {
        this.soundRecordingUrl = [];
        this.soundRecordingUrl = item.record;
        this.soundRecording = true;
      },
      // 添加备注弹框
      addRemark (item) {
        if(this.isCustomerFollower) {
          this.remarkRecordId = item.id;
          this.showRemarks = true;
        }else {
          this.$message({
            type: 'error',
            message: '只有客户跟进人才能进行操作',
            duration: 1500
          })
        }
      },
      // 确定添加备注
      subRemarksInfo () {
        let _id = this.remarkRecordId, remark = this.remark;
        if(!remark) {
          return this.$message({
            type: 'error',
            message: '请输入备注信息',
            duration: 1500
          });
        };
        let _params = {
          id: _id,
          remark,
        };
        API.salesOrder.zhuxinCallAddRemark(_params, (data) => {
          if(data.status) {
            this.showRemarks = false;
            this.getCallRecordList(this.$route.query.id);
            this.$message({
              type: 'success',
              message: '备注添加成功',
              duration: 1500
            })
          }
        })
      },
      getTimeDifference (oldsecond) {
        let _totalSecond = Math.ceil(oldsecond / 1000),
            _day = Math.floor(_totalSecond / (24 * 60 * 60)),
            _hour = Math.floor((_totalSecond % (24 * 60 * 60)) / (60 * 60)),
            _minute = Math.floor(((_totalSecond % (24 * 60 * 60)) % (60 * 60)) / 60),
            _second = Math.floor(((_totalSecond % (24 * 60 * 60)) % (60 * 60)) % 60),
            _time = _hour + '时' + _minute + '分' + _second + '秒';
        return _time
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getCustomerDetail()
      this.getContactList()
      this.getChanceList()
      this.getOrderList()
      this.getCallRecordList(this.$route.query.customerId);
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  
  .all-callRecord {
    width: 100%;
    border-top: 1px solid #e4e7ed;
    .noData {
      font-size: 14px;
      text-align: center;
      color: #aaa;
      border: 0;
    }
    li {
      padding: 15px;
      border-bottom: 1px solid #e4e7ed;
      overflow: hidden;
      .all-callRecord-time {
        float: left;
        padding-right: 20px;
        p {
          line-height: 25px;
          font-size: 12px;
        }
        .all-callRecord-time-time {
          color: #aaa;
        }
      }
      .all-callRecord-content {
        width: calc(100% - 82px);
        float: left;
        .all-callRecord-content-info {
          position: relative;
          .all-callRecord-content-info-contant {
            display: inline-block;
            line-height: 25px;
            overflow: hidden;
            .all-callRecord-content-info-contant-img {
              float: left;
              width: 16px;
              height: 16px;
              margin-top: 2px;
            }
            .imgmt {
              margin-top: 4px;
            }
            .all-callRecord-content-info-contant-name {
              float: left;
              margin-left: 5px;
              font-size: 14px;
            }
            .all-callRecord-content-info-contant-jian {
              float: left;
              margin: 10px 10px 0 10px;
              width: 55px;
              height: 6px;
            }
          }
          .all-callRecord-content-info-name {
            display: inline-block;
            width: 100%;
            height: 25px;
            text-align: center;
            line-height: 25px;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 14px;
            color: #6B6B6B;
            font-weight: bold;
          }
          .all-callRecord-content-info-time {
            position: relative;
            z-index: 5;
            text-decoration: underline;
            cursor: pointer;
            float: right;
            color: #6B6B6B;
            margin-left: 7%;
            width: 225px;
            text-align: left;
            line-height: 25px;
            .all-callRecord-content-info-time-duration {
              font-weight: bold;
            }
            .all-callRecord-content-info-time-frame {
              color: #aaa;
            }
          }
        }
        .all-callRecord-content-remark {
          margin-top: -3px;
          font-size: 13px;
          color: #aaa;
          line-height: 25px;
        }
      }
    }
  }
</style>
