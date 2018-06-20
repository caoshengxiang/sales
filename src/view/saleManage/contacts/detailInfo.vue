<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/placeholder.jpg" alt="">
        <div class="com-info-text">
          <h3>{{contactsDetail.contacterName}}</h3>
          <p>
            <span class="com-d-item">客户公司: <span>{{contactsDetail.customerName}}</span></span>
            <span class="com-d-item">联系电话: <span>{{contactsDetail.phone}}</span></span>
            <span class="com-d-item">创建时间: <span>{{contactsDetail.created && $moment(contactsDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<el-radio-group v-model="tapOption">-->
        <!--<el-radio-button class="btn-width" label="edit">编辑</el-radio-button>-->
        <!--</el-radio-group>-->
        <ul class="com-info-op-group">
          <li class="op-active" @click="operateOptions('edit')">编辑</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="联系人资料信息" name="detail">
            <p class="table-title">联系人基本信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">所属公司</td>
                <td>{{contactsDetail.customerName}}</td>
                <td class="td-title">所在部门</td>
                <td>{{contactsDetail.department}}</td>
                <td class="td-title">公司职务</td>
                <td>{{contactsDetail.position}}</td>
              </tr>
              <tr>
                <td class="td-title">联系电话</td>
                <td>{{contactsDetail.phone}}</td>
                <td class="td-title">备用电话</td>
                <td>{{contactsDetail.bakPhone}}</td>
                <td class="td-title">微信</td>
                <td>{{contactsDetail.wx}}</td>
              </tr>
              <tr>
                <td class="td-title">QQ</td>
                <td>{{contactsDetail.qq}}</td>
                <td class="td-title">出生日期</td>
                <td>{{contactsDetail.birthday && $moment(contactsDetail.birthday).format('YYYY-MM-DD')}}</td>
                <td class="td-title">性别</td>
                <td>{{contactsDetail.sex}}</td>
              </tr>
              <tr>
                <td class="td-title">电子邮箱</td>
                <td colspan="5">{{contactsDetail.mail}}</td>
              </tr>
              <tr>
                <td class="td-title">联系地址</td>
                <td colspan="5">{{contactsDetail.address}}</td>
              </tr>
              <tr>
                <td class="td-title">备注</td>
                <td colspan="5">{{contactsDetail.remark?contactsDetail.remark:'暂未备注信息'}}</td>
              </tr>
            </table>

            <p class="table-title">联系人其他信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">联系人创建时间</td>
                <td colspan="3">{{contactsDetail.created && $moment(contactsDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">所有人</td>
                <td>{{contactsDetail.creatorName}}</td>
              </tr>
              <tr>
                <td class="td-title">联系人修改时间</td>
                <td colspan="3">{{contactsDetail.modified && $moment(contactsDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">修改人</td>
                <td>{{contactsDetail.modifierName}}</td>
              </tr>
              <tr>
                <td class="td-title">联系人活动时间</td>
                <td colspan="3">{{contactsDetail.activeTime && $moment(contactsDetail.activeTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">跟进人</td>
                <td>{{contactsDetail.followerName}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="联系人相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="grey" @click="handleRoute('chance')">销售机会({{chanceTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('order')">销售订单({{orderTotal}})</com-button>
            </div>

            <p class="table-title">
              销售机会({{chanceTotal}})
              <a class="more" v-if="chanceTotal > 5" @click="handleRoute('chance')">更多》</a>
              <a class="table-add" @click="quickOperation('addChance')"><i class="el-icon-plus"></i>新增销售机会</a>
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
              <a class="more" v-if="orderTotal > 5" @click="handleRoute('order')">更多》</a>
              <a class="table-add" @click="quickOperation('addOrder')"><i class="el-icon-plus"></i>新增销售订单</a>
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
                          v-if="item.orderState === os.type">{{os.value}}</span>
                </td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><a class="table-op" @click="quickOperation('deleteOrder', item.id)">删除</a></td>
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
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{contactsDetail.team.creatorName}}</h4>
              <p>{{contactsDetail.team.mobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
            </div>
          </li>
          <li class="team-member-item" :key="item.salerId" v-for="item in contactsDetail.team.salerList">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
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
  import addDialog from './addDialog'
  import addChanceDialog from '../salesOpportunities/addDialog'
  import addOrderDialog from '../salesOrders/addDialog'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        tapOption: '',
        activeViewName: '',
        chanceList: [],
        chanceTotal: 0,
        orderList: [],
        orderTotal: 0,
      }
    },
    computed: {
      ...mapState('constData', [
        'salesState',
        'orderState',
        'themeIndex',
      ]),
      ...mapState('contacts', [
        'contactsDetail',
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
      ...mapActions('contacts', [
        'ac_contactsDetail',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'contactsDetail',
          params: {end: 'FE'},
          query: {view: tab.name, contactsId: this.$route.query.contactsId},
        })
      },
      operateOptions (option) {
        let that = this
        switch (option) {
          case 'edit':
            // this.addDialogOpen = true
            this.$vDialog.modal(addDialog, {
              title: '编辑联系人',
              width: 900,
              height: 460,
              params: {
                detail: this.contactsDetail,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getContactsDetail()
                }
              },
            })
            break
        }
      },
      getContactsDetail () {
        this.dataLoading = true
        API.contacts.detail(this.$route.query.contactsId, (data) => {
          setTimeout(() => {
            this.ac_contactsDetail(data.data)
            this.getChanceList(data.data.customerId)
            this.getOrderList(data.data.customerId)
            this.dataLoading = false
          }, 500)
        })
      },
      getChanceList (customerId) {
        API.salesOpportunities.list({customerId: customerId, pageSize: 5}, (da) => {
          this.chanceList = da.data.content
          this.chanceTotal = da.data.totalElements
        })
      },
      getOrderList (customerId) {
        API.salesOrder.list({customerId: customerId, pageSize: 5}, (da) => {
          this.orderList = da.data.content
          this.orderTotal = da.data.totalElements
        })
      },
      handleRoute (list) {
        switch (list) {
          // case 'contact':
          //   this.$router.push({name: 'contactsList', query: {customerId: this.contactsDetail.customerId}})
          //   break
          case 'chance':
            this.$router.push({name: 'salesOpportunitiesList', query: {customerId: this.contactsDetail.customerId}})
            break
          case 'order':
            this.$router.push({name: 'salesOrdersList', query: {customerId: this.contactsDetail.customerId}})
            break
        }
      },
      quickOperation (op, id) {
        // eslint-disable-next-line
        let that = this
        let deleteId = id || ''
        switch (op) {
          // case 'addContact':
          //   break
          case 'addChance':
            this.$vDialog.modal(addChanceDialog, {
              title: '新增销售机会',
              width: 900,
              height: 400,
              params: {
                salesState: this.salesState,
                detailCustomersId: this.contactsDetail.customerId,
              },
              callback (data) {
                if (data.type === 'save') {
                  this.getChanceList(that.contactsDetail.customerId)
                }
              },
            })
            break
          case 'addOrder':
            this.$vDialog.modal(addOrderDialog, {
              title: '添加订单',
              width: 900,
              height: 380,
              params: {
                detailCustomersId: this.contactsDetail.customerId,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getOrderList(that.contactsDetail.customerId)
                }
              },
            })
            break
          case 'deleteOrder':
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
                  this.getOrderList(this.contactsDetail.customerId)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
        }
      }
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getContactsDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
