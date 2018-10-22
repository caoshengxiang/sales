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
        <el-dropdown @command="handleCommand" trigger="click" v-if="detail.state === 2 || detail.state === 5">
          <el-button type="primary">
            回访<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" v-if="detail.type">
            <el-dropdown-item v-for="item in visitTypes"
                              :key="item.type"
                              :command="item.type"
                              :disabled="returnVisitDisabled(item.type)">
              {{item.value}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
                <td>{{detail.retvisitContentModel.originStar}}星</td>
                <td class="td-title">回访评价</td>
                <td>{{detail.retvisitContentModel.retEvaluation}}星</td>
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
                <td class="td-title">其他意见</td>
                <td colspan="5">
                  <p>{{detail.retvisitContentModel.otherSuggestion.otherSuggestionDesc}}</p>
                </td>
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
            </table>

            <p class="table-title">服务派单 <span>（2）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">订单下单时间</td>
              </tr>
            </table>

            <p class="table-title">历史订单 <span>（2）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">服务完成时间</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="服务加工" name="operate">
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
  import assginOrder from './assginOrder'
  import returnVisit from './returnVisit'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'service',
        detail: {
          retvisitContentModel: {
            otherSuggestion: {},
            commentSuggestion: {},
          },
        },
      }
    },
    computed: {
      ...mapState('constData', [
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
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
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
    },
    created () {
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
