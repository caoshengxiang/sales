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
          <h3>{{salesOpportunitiesDetail.intentProductName}}</h3>
          <p>
            <span class="com-d-item">客户名称: <span>{{salesOpportunitiesDetail.customerName}}</span></span>
            <span class="com-d-item">预计签单金额: <span>{{salesOpportunitiesDetail.intentBillAmount}}</span></span>
            <span class="com-d-item">预计签单日期: <span>{{salesOpportunitiesDetail.billDate}}</span></span>
            <span class="com-d-item">销售机会所有人: <span></span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<el-radio-group v-model="tapOption">-->
        <!--<el-radio-button class="btn-width" label="move">转移</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="move">删除</el-radio-button>-->
        <!--</el-radio-group>-->
        <ul class="com-info-op-group">
          <li class="op-active" @click="operateOptions('move')">转移</li>
          <li @click="operateOptions('delete')">删除</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step">
          <el-steps :active="salesOpportunitiesDetail.stage - 1" align-center>
            <el-step v-for="(item, index) in salesState" :key="index"
                     :title="item.value + '(' + item.percent + ')'"></el-step>
          </el-steps>
        </div>
        <a class="lose-bill" @click="operateOptions('discard')">输单</a>
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
                <td>{{$moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}</td>
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
                <td colspan="3">{{$moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">所有人</td>
                <td>{{salesOpportunitiesDetail.creatorName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售机会修改时间</td>
                <td colspan="3">{{$moment(salesOpportunitiesDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">修改人</td>
                <td>{{salesOpportunitiesDetail.modifierName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售机会活动时间</td>
                <td colspan="3">{{$moment(salesOpportunitiesDetail.followDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="td-title">跟进人</td>
                <td>{{salesOpportunitiesDetail.salerName}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="销售机会相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="theme">联系人(2)</com-button>
              <com-button buttonType="grey">销售需求(2)</com-button>
              <com-button buttonType="grey">销售订单(2)</com-button>
            </div>

            <p class="table-title">
              联系人(2)
              <a class="more">更多》</a>
              <a class="table-add"><i class="el-icon-plus"></i>新增联系人</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>

            <p class="table-title">
              跟单记录(2)
              <a class="more">更多》</a>
              <a class="table-add"><i class="el-icon-plus"></i>新增跟单记录</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>

            <p class="table-title">
              APP订单(2)
              <a class="more">更多》</a>
              <a class="table-add"><i class="el-icon-plus"></i>新增关联订单</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
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
        <div class="team-btn-group">
          <div class="btn-item-1" @click="operateOptions('apply')">申请咨询师协同</div>
          <div class="btn-item-2" @click="operateOptions('exit')">咨询师主动退出</div>
          <div class="btn-item-3" @click="operateOptions('replace')">申请替换咨询师</div>
        </div>
      </div>
    </div>
    <!-- -->
    <!-- -->
    <!--转移弹窗-->
    <!--<move-dialog :moveDialogOpen="moveDialogOpen" @hasMoveDialogOpen="moveDialogOpen = false"></move-dialog>&lt;!&ndash; &ndash;&gt;-->
    <!-- -->
    <!--咨询师 申请替换-->
    <!--<apply-dialog :type="consultantType" :dialogOpen="applyDialogOpen" @hasDialogOpen="applyDialogOpen = false"></apply-dialog>-->
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

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        activeViewName: '',
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
      getSalesOpportunitiesDetail () {
        this.dataLoading = true
        API.salesOpportunities.detail(this.$route.query.id, (data) => {
          this.ac_salesOpportunitiesDetail(data.data)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
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
              callback (data) {
                if (data.type === 'save') {}
              },
            })
            break
          case 'apply': // 申请咨询师
            this.$vDialog.modal(applyDialog, {
              title: '申请咨询师协同',
              width: 520,
              height: 280,
              params: {
                consultantType: 'apply',
                chanceId: this.salesOpportunitiesDetail.id,
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
                consultantType: 'replace',
                chanceId: this.salesOpportunitiesDetail.id,
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
