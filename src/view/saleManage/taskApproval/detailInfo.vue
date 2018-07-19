<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <table class="detail-table">
        <tr>
          <td class="td-title">任务名称</td>
          <td>{{detailInfo.name}}</td>
          <td class="td-title">负责人员</td>
          <td>{{detailInfo.principalName}}</td>
          <td class="td-title">任务发布人员</td>
          <td>{{detailInfo.publisherName}}</td>
          <td class="td-title">任务发布时间</td>
          <td>{{detailInfo.publishTime}}</td>
        </tr>
        <tr>
          <td class="td-title">任务截止时间</td>
          <td>{{detailInfo.deadline}}</td>
          <td class="td-title">任务业务类型</td>
          <td>{{detailInfo.businessType ==1?'销售机会':'未知'}}</td>
          <td class="td-title">任务业务描述</td>
          <td colspan="3">{{detailInfo.businessDesc}}</td>
        </tr>
        <tr>
          <td class="td-title">操作</td>
          <td colspan="7">
            <com-button buttonType="backHighSeas" @click="auditTaskYes"
                        v-if="detailInfo.state === 1 && detailInfo.principalId === userInfo.id">审核通过
            </com-button>
            <com-button buttonType="grey" @click="auditTaskNo"
                        v-if="detailInfo.state === 1 && detailInfo.principalId === userInfo.id">审核拒绝
            </com-button>
          </td>
        </tr>
      </table>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
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
        </table>

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
            <td class="td-title">销售合同网址</td>
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
              <!--<p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorMobilePhone}}</p>-->
              <p>******</p>
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
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import moment from 'moment'
  import { mapState } from 'vuex'
  import webStorage from 'webStorage'

  export default {
    name: 'detailInfo',
    data () {
      return {
        detailInfo: '',
        salesOpportunitiesDetail: '',
        customerDetail: '',
        userInfo: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'customerSourceType',
        'salesState',
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
      getTaskDetail () {
        var that = this
        this.loading = true
        let param = {
          id: that.$route.query.id,
        }
        API.task.getTaskDetail(param, (res) => {
          that.loading = false
          if (res.status) {
            that.detailInfo = res.data
            that.detailInfo.publishTime = moment(that.detailInfo.publishTime).format('YYYY-MM-DD HH:mm:ss')
            that.detailInfo.deadline = moment(that.detailInfo.deadline).format('YYYY-MM-DD HH:mm:ss')
            API.task.chanceDetail({chanceId: that.detailInfo.chanceId}, (data) => {
              that.salesOpportunitiesDetail = data.data
              API.task.customerDetail({customerId: that.salesOpportunitiesDetail.customerId}, (data) => {
                that.customerDetail = data.data
                setTimeout(() => {
                  this.dataLoading = false
                }, 500)
              })
              setTimeout(() => {
                this.dataLoading = false
              }, 500)
            })
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({name: 'customersDetail', params: {end: 'FE'}, query: {view: tab.name}})
      },
      auditTaskYes () {
        this.auditTask(2)
      },
      auditTaskNo () {
        this.auditTask(3)
      },
      auditTask (state) {
        let param = {
          state: state,
          id: this.$route.query.id,
        }
        API.task.auditTask(param, (res) => {
          this.loading = false
          if (res.status) {
            this.getTaskDetail()
            this.$message.success('审核成功')
          } else {
            this.$message.success(res.error.message)
          }
        }, (mock) => {
          that.loading = false
          this.$message.success('系统繁忙')
        })
      },
    },
    created () {
      this.$options.methods.getTaskDetail.bind(this)()
      this.activeViewName = this.$route.query.view
      this.userInfo = webStorage.getItem('userInfo')
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .detail-table {
    width: 100%;
  }
</style>
