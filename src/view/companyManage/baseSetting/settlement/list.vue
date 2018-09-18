<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
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
                                     placeholder=""></el-input-number>
                  </el-form-item>
                  日系统对上月已审核未结算的回款生成结算信息；
                </td>
              </tr>
              <tr>
                <td class="td-title">
                  每月
                  <el-form-item prop="maxSeaFollowerPerMonth" style="display: inline-block">
                    <el-input-number v-model="settlementForm.dayOfTransferRebate" :min="1" :max="28"
                                     placeholder=""></el-input-number>
                  </el-form-item>
                  日系统对上月已审核未生成返佣的结算信息进行生成返佣支出信息；
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
            <h3 class="item-title">
              请设置销售佣金比例设置
              <el-select v-model="billType"
                         @change="billTypeOptionsChangeHandle"
                         placeholder="请选择" style="float: right">
                <el-option
                  v-for="item in billTypeOptions"
                  :key="item.type"
                  :label="item.value"
                  :value="item.type">
                </el-option>
              </el-select>
            </h3>
            <!--代理体系 start-->
            <table class="com-dialog-table" v-if="billType === 1">
              <tr>
                <th colspan="11" class="td-title">{{billTypeName}}</th>
              </tr>
              <tr>
                <th rowspan="2" colspan="3" class="td-title out-td" style="width: 286px;padding: 0;">
                  <div class="out">
                    <div class="t-1">合作模式</div>
                    <div class="t-line"></div>
                    <div class="t-2">产品类别</div>
                  </div>
                </th>
                <th colspan="3" class="td-title">销售佣金</th>
                <th colspan="3" class="td-title">管理贴金</th>
                <th colspan="2" class="td-title">培育佣金</th>
              </tr>
              <tr>
                <td class="td-title">需求录入</td>
                <td class="td-title">销售佣金</td>
                <td class="td-title">销售咨询</td>
                <td class="td-title">区域经理</td>
                <td class="td-title">销售总监</td>
                <td class="td-title">销售副总</td>
                <td class="td-title">直接</td>
                <td class="td-title">间接</td>
              </tr>
              <tr><!--代理商下单 start-->
                <td class="td-title" rowspan="12">年度产品(A类)</td>
                <td rowspan="6">计时-记账托管类</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[0]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第二年</td>
                <td v-for="col in cptSaleCommissionConfig[1]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第三年</td>
                <td v-for="col in cptSaleCommissionConfig[2]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第四年</td>
                <td v-for="col in cptSaleCommissionConfig[3]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第五年</td>
                <td v-for="col in cptSaleCommissionConfig[4]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第五年后</td>
                <td v-for="col in cptSaleCommissionConfig[5]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td rowspan="6">计时-非记账托管类</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[6]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第二年</td>
                <td v-for="col in cptSaleCommissionConfig[7]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第三年</td>
                <td v-for="col in cptSaleCommissionConfig[8]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第四年</td>
                <td v-for="col in cptSaleCommissionConfig[9]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第五年</td>
                <td v-for="col in cptSaleCommissionConfig[10]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>第五年后</td>
                <td v-for="col in cptSaleCommissionConfig[11]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td class="td-title" rowspan="2">单次产品(B类)</td>
                <td>B类标准化产品</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[12]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>B类标定制产品</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[13]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
            </table>
            <!--代理体系 end-->
            <!--其他 start-->
            <table class="com-dialog-table" v-if="billType !== 1">
              <tr>
                <th colspan="11" class="td-title">{{billTypeName}}</th>
              </tr>
              <tr>
                <th rowspan="2" colspan="3" class="td-title out-td" style="width: 286px;padding: 0;">
                  <div class="out">
                    <div class="t-1">合作模式</div>
                    <div class="t-line"></div>
                    <div class="t-2">产品类别</div>
                  </div>
                </th>
                <th colspan="3" class="td-title">销售佣金</th>
                <th colspan="3" class="td-title">管理贴金</th>
                <th colspan="2" class="td-title">培育佣金</th>
              </tr>
              <tr>
                <td class="td-title">需求录入</td>
                <td class="td-title">销售佣金</td>
                <td class="td-title">销售咨询</td>
                <td class="td-title">区域经理</td>
                <td class="td-title">销售总监</td>
                <td class="td-title">销售副总</td>
                <td class="td-title">直接</td>
                <td class="td-title">间接</td>
              </tr>
              <tr><!--代理商下单 start-->
                <td class="td-title" rowspan="4">年度产品(A类)</td>
                <td rowspan="2">计时-记账托管类</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[0]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>续费</td>
                <td v-for="col in cptSaleCommissionConfig[1]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td rowspan="2">计时-非记账托管类</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[2]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>续费</td>
                <td v-for="col in cptSaleCommissionConfig[3]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td class="td-title" rowspan="2">单次产品(B类)</td>
                <td>B类标准化产品</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[4]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
              <tr>
                <td>B类标定制产品</td>
                <td>新签</td>
                <td v-for="col in cptSaleCommissionConfig[5]" :key="col.id">
                  <el-input style="width: 72px" type="number" step="0.01" v-model.number="col.commissionPercent"
                            auto-complete="off"></el-input>
                  %
                </td>
              </tr>
            </table>
            <!--其他 end-->
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
        dataLoading: true,
        testNum: 0,
        tableData: [],
        settlementForm: {
          dayOfGenerateRebate: 1,
          dayOfTransferRebate: 1,
        },
        saleCommissionConfig: [],
        cptSaleCommissionConfig: [[], [], [], [], [], [], [], [], [], [], [], []], // 数据构建
        billType: 1,
        billTypeName: '代理体系',
        billTypeOptions: [
          {type: 1, value: '代理体系'},
          {type: 2, value: '商务管家自拓体系'},
          {type: 3, value: '市场中心体系'},
          {type: 4, value: '衍生业务体系'},
          {type: 5, value: '会议营销体系'},
          {type: 6, value: 'APP自然下单体系'},
        ],
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
        this.dataLoading = true
        API.common.getSaleCommissionConfig({billType: this.billType}, (res) => {
          if (res.status) {
            this.saleCommissionConfig = res.data
            if (this.saleCommissionConfig.length) {
              if (this.billType === 1) { // 代理体系
                this.cptSaleCommissionConfig = [[], [], [], [], [], [], [], [], [], [], [], [], [], []] // 初始化
                this.saleCommissionConfig.forEach(item => {
                  let y = null
                  let x = item.commissionDetail - 1
                  if (item.productType <= 2) { // 返回数据前两个有7个
                    let bc = item.billCate >= 2 ? item.billCate - 1 : item.billCate // 没有返回billCate为2
                    y = (item.productType - 1) * 6 + (bc - 1)
                  } else {
                    y = 12 + item.productType - 3
                  }
                  // console.log(y, x)
                  this.cptSaleCommissionConfig[y][x] = item
                })
              } else { // 其他
                this.cptSaleCommissionConfig = [[], [], [], [], [], []] // 初始化
                this.saleCommissionConfig.forEach(item => {
                  let y = null
                  let x = item.commissionDetail - 1
                  if (item.productType <= 2) { // 返回数据前两个有2个
                    y = (item.productType - 1) * 2 + (item.billCate - 1)
                  } else {
                    y = 4 + item.productType - 3
                  }
                  // console.log(y, x)
                  this.cptSaleCommissionConfig[y][x] = item
                })
              }
            }
          }
          this.dataLoading = false
        })
      },
      saveSaleCommissionConfig () {
        this.dataLoading = true
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
          this.dataLoading = false
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
        API.common.getSettlement((res) => {
          if (res.status) {
            this.settlementForm = res.data
          }
        })
      },
      saveSettlement () {
        let param = []
        this.cptSaleCommissionConfig.forEach(arr => {
          param = param.concat(arr)
        })
        // console.log(param)
        API.common.saveSettlement(this.settlementForm, (resData) => {
          if (resData.status) {
            this.$message({
              message: '保存成功！',
              type: 'success',
            })
            this.getSettlement()
          }
        })
      },
      billTypeOptionsChangeHandle () {
        this.getSaleCommissionConfig()
        this.billTypeOptions.forEach(item => {
          if (item.type === this.billType) {
            this.billTypeName = item.value
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
          width: 72px !important;
        }
      }
    }
  }

  .out-td {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .out {
    width: 200px;
    margin: 0 auto;
    transform: rotateZ(15deg);
    color: #bababa;
    .t-1 {
      text-align: center;
      position: relative;
      left: 30px;
      bottom: 10px;
    }
    .t-2 {
      text-align: center;
      position: relative;
      left: -30px;
      bottom: -10px;
    }
    .t-line {
      height: 1px;
      background-color: #bababa;
    }
  }
</style>
