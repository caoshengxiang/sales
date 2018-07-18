<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>返佣配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <!--<div class="com-bar">-->
    <!--<div class="com-bar-left">-->
    <!--<com-button buttonType="grey" icon="el-icon-remove-outline" @click="save">保存-->
    <!--</com-button>-->
    <!--</div>-->
    <!--<div class="com-bar-right">-->
    <!--&lt;!&ndash;<com-button buttonType="search">搜索</com-button>&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">

      <div class="config-view-con">
        <el-form :model="settlementForm" ref="settlementForm">
          <div>
            <h3 class="item-title">佣金结算规则设置</h3>
            <table class="com-dialog-table">
              <tr>
                <td class="td-title">
                  每月
                  <el-form-item prop="maxSeaFollower" style="display: inline-block">
                    <el-input-number v-model="settlementForm.dayOfGenerateRebate" :min="1" :max="28"
                                     placeholder="每月系统对已审核未结算的销售及服务佣金进行结算生成返佣记录日"></el-input-number>
                  </el-form-item>
                  日系统对已审核未结算的销售及服务佣金进行结算生成返佣记录；
                </td>
              </tr>
              <tr>
                <td class="td-title">
                  每月
                  <el-form-item prop="maxSeaFollowerPerMonth" style="display: inline-block">
                    <el-input-number v-model="settlementForm.dayOfTransferRebate" :min="1" :max="28"
                                     placeholder="每月系统对用户已确认的返佣记录自动批量转款日"></el-input-number>
                  </el-form-item>
                  日系统对用户已确认的返佣记录进行自动批量转款；
                </td>
                <td class="td-text">
                </td>
              </tr>
            </table>
            <div class="btn-group">
              <el-button @click="saveSettlement" type="primary" style="width: 100px">保存</el-button>
            </div>
          </div>
          <!---->
          <div class="com-dialog">
            <h3 class="item-title">请设置销售佣金比例设置</h3>
            <table class="com-dialog-table">
              <tr>
                <td rowspan="2" class="td-title" style="width: 100px;">签单方式</td>
                <td rowspan="2" class="td-title" style="width: 300px;">签单产品</td>
                <td rowspan="2" class="td-title">签单类型</td>
                <td colspan="3" class="td-title">销售佣金</td>
                <td colspan="5" class="td-title">管理佣金</td>
              </tr>
              <tr>
                <td class="td-title">需求录入</td>
                <td class="td-title">销售跟进</td>
                <td class="td-title">咨询师</td>
                <td class="td-title">培训师</td>
                <td class="td-title">销售助理</td>
                <td class="td-title">营销副总</td>
                <td class="td-title">大区总监</td>
                <td class="td-title">区域经理</td>
              </tr>
              <tr><!--代理商下单 start-->
                <td class="td-title" rowspan="6">代理商下单</td>
                <td rowspan="2">A类产品 <br>（记账或托管）</td>
                <td>新签</td>
                <!--<td><el-input style="width: 102px" type="number" v-model.number="getSaleCommissionConfig[0][0].commissionPercent" auto-complete="off"></el-input></td>-->
                <!--<td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>-->
                <!--<td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>-->
                <!--<td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>-->
                <!--<td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>-->
                <!--<td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>-->
                <!--<td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>-->
                <td v-for="col in cptSaleCommissionConfig[0]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td>续签</td>
                <td v-for="col in cptSaleCommissionConfig[1]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td rowspan="2">A类产品<br>（税务顾问/财税金融咨询）</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[2]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td>续签</td>
                <td v-for="col in cptSaleCommissionConfig[3]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td rowspan="2">B类产品</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[4]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td>续签</td>
                <td v-for="col in cptSaleCommissionConfig[5]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr><!--代理商下单 end-->
              <tr><!--非代理商下单 start-->
                <td class="td-title" rowspan="6">非代理商下单</td>
                <td rowspan="2">A类产品<br>（记账或托管）</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[6]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td>续签</td>
                <td v-for="col in cptSaleCommissionConfig[7]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td rowspan="2">A类产品<br>（税务顾问/财税金融咨询）</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[8]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td>续签</td>
                <td v-for="col in cptSaleCommissionConfig[9]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td rowspan="2">B类产品</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[10]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td>续签</td>
                <td v-for="col in cptSaleCommissionConfig[11]" :key="col.id">
                  <el-input style="width: 102px" type="number" v-model.number="col.commissionPercent" auto-complete="off"></el-input>
                </td>
              </tr><!--非代理商下单 end-->
            </table>
            <div class="btn-group">
              <el-button @click="saveSaleCommissionConfig" type="primary" style="width: 100px">保存</el-button>
            </div>
          </div>
          <!---->
          <div class="com-dialog">
            <h3 class="item-title">请设置服务佣金比例设置</h3>
            <table class="com-dialog-table">
              <tr>
                <td rowspan="2" class="td-title">签单产品</td>
                <td rowspan="2" class="td-title">服务佣金</td>
                <td colspan="3" class="td-title">服务奖励</td>
                <td rowspan="2" class="td-title">服务补贴</td>
              </tr>
              <tr>
                <td class="td-title">5星</td>
                <td class="td-title">4星</td>
                <td class="td-title">1-3星</td>
              </tr>
              <tr>
                <td>税务服务类</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>投融资服务类</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>人才培训类</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <div class="btn-group">
              <el-button type="primary" style="width: 100px">保存</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import API from '../../../../utils/api'
  // import utils from '../../../../utils/utils'
  import comButton from '../../../../components/button/comButton'
  // import moment from 'moment'

  export default {
    name: 'list',
    data () {
      return {
        testNum: 0,
        tableData: [],
        settlementForm: {
          dayOfGenerateRebate: 1,
          dayOfTransferRebate: 1,
        },
        saleCommissionConfig: [],
        cptSaleCommissionConfig: [[], [], [], [], [], [], [], [], [], [], [], []], // 数据构建
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
      getSaleCommissionConfig () {
        this.loading = true
        API.common.getSaleCommissionConfig((res) => {
          this.loading = false
          if (res.status) {
            this.saleCommissionConfig = res.data
            if (this.saleCommissionConfig.length) {
              this.cptSaleCommissionConfig = [[], [], [], [], [], [], [], [], [], [], [], []] // 初始化
              this.saleCommissionConfig.forEach(item => {
                if (item.billType === 1) {
                  if (item.productType === 1) {
                    if (item.billCate === 1) { // 0
                      this.cptSaleCommissionConfig[0].push(item)
                    }
                    if (item.billCate === 2) { // 1
                      this.cptSaleCommissionConfig[1].push(item)
                    }
                  }
                  if (item.productType === 2) {
                    if (item.billCate === 1) { // 2
                      this.cptSaleCommissionConfig[2].push(item)
                    }
                    if (item.billCate === 2) { // 3
                      this.cptSaleCommissionConfig[3].push(item)
                    }
                  }
                  if (item.productType === 3) {
                    if (item.billCate === 1) { // 4
                      this.cptSaleCommissionConfig[4].push(item)
                    }
                    if (item.billCate === 2) { // 5
                      this.cptSaleCommissionConfig[5].push(item)
                    }
                  }
                }
                if (item.billType === 2) {
                  if (item.productType === 1) {
                    if (item.billCate === 1) { // 6
                      this.cptSaleCommissionConfig[6].push(item)
                    }
                    if (item.billCate === 2) { // 7
                      this.cptSaleCommissionConfig[7].push(item)
                    }
                  }
                  if (item.productType === 2) {
                    if (item.billCate === 1) { // 8
                      this.cptSaleCommissionConfig[8].push(item)
                    }
                    if (item.billCate === 2) { // 9
                      this.cptSaleCommissionConfig[9].push(item)
                    }
                  }
                  if (item.productType === 3) {
                    if (item.billCate === 1) { // 10
                      this.cptSaleCommissionConfig[10].push(item)
                    }
                    if (item.billCate === 2) { // 11
                      this.cptSaleCommissionConfig[11].push(item)
                    }
                  }
                }
              })
            }
          }
        })
      },
      saveSaleCommissionConfig () {
        this.loading = true
        let param = []
        this.cptSaleCommissionConfig.forEach(arr => {
          param = param.concat(arr)
        })
        param.forEach(item => { // 防止输入空
          if (!item.commissionPercent) {
            item.commissionPercent = 0
          }
        })
        API.common.saveSaleCommissionConfig({commissionConfigs: param}, (resData) => {
          this.loading = false
          if (resData.status) {
            this.$message({
              message: '保存成功！',
              type: 'success',
            })
            this.getSaleCommissionConfig()
          }
        })
      },
      getSettlement () { // 天数
        this.loading = true
        API.common.getSettlement((res) => {
          this.loading = false
          if (res.status) {
            this.settlementForm = res.data
          }
        })
      },
      saveSettlement () {
        this.loading = true
        let param = []
        this.cptSaleCommissionConfig.forEach(arr => {
          param = param.concat(arr)
        })
        // console.log(param)
        API.common.saveSettlement(this.settlementForm, (resData) => {
          this.loading = false
          if (resData.status) {
            this.$message({
              message: '保存成功！',
              type: 'success',
            })
            this.getSettlement()
          }
        })
      },
    },
    created () {
      this.getSaleCommissionConfig()
      this.getSettlement()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .config-view-con {
    .item-title {
      color: #426585;
      padding: 20px 0;
    }
    .com-dialog {
      table {
        text-align: center;
        color: #333E48;
        min-width: 1100px;
        overflow: scroll;
        .td-title {
          color: #426585;
        }
        .el-input--mini {
          width: 102px !important;
        }
      }
    }
  }
</style>
