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
        <el-form :model="form" ref="form">
          <div>
            <h3 class="item-title">佣金结算规则设置</h3>
            <table class="com-dialog-table">
              <tr>
                <td class="td-title">
                  每月
                  <el-form-item prop="maxSeaFollower" style="display: inline-block">
                    <el-input-number v-model="form.dayOfGenerateRebate" :min="1" :max="28"
                                     placeholder="每月系统对已审核未结算的销售及服务佣金进行结算生成返佣记录日"></el-input-number>
                  </el-form-item>
                  日系统对已审核未结算的销售及服务佣金进行结算生成返佣记录；
                </td>
              </tr>
              <tr>
                <td class="td-title">
                  每月
                  <el-form-item prop="maxSeaFollowerPerMonth" style="display: inline-block">
                    <el-input-number v-model="form.dayOfTransferRebate" :min="1" :max="28"
                                     placeholder="每月系统对用户已确认的返佣记录自动批量转款日"></el-input-number>
                  </el-form-item>
                  日系统对用户已确认的返佣记录进行自动批量转款；
                </td>
                <td class="td-text">
                </td>
              </tr>
            </table>
          </div>
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
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
                <td><el-input-number style="width: 102px" size="mini" v-model="form.num9" :precision="2" :step="0.1" :max="100"></el-input-number></td>
              </tr>
              <tr>
                <td>续签</td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
                <td><el-input style="width: 102px" type="number" v-model.number="form.num9" auto-complete="off"></el-input></td>
              </tr>
              <tr>
                <td rowspan="2">A类产品<br>（税务顾问/财税金融咨询）</td>
                <td>新签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>续签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td rowspan="2">B类产品</td>
                <td>新签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>续签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr><!--代理商下单 end-->
              <tr><!--非代理商下单 start-->
                <td class="td-title" rowspan="6">非代理商下单</td>
                <td rowspan="2">A类产品<br>（记账或托管）</td>
                <td>新签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>续签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td rowspan="2">A类产品<br>（税务顾问/财税金融咨询）</td>
                <td>新签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>续签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td rowspan="2">B类产品</td>
                <td>新签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>续签</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr><!--非代理商下单 end-->
            </table>
          </div>
          <div class="com-dialog">
            <h3 class="item-title">佣金结算规则设置</h3>
            <table class="com-dialog-table">
              <tr>
                <td rowspan="2" class="td-title">签单产品</td>
                <td rowspan="2" class="td-title" >服务佣金</td>
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
              </tr><tr>
                <td>投融资服务类</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr><tr>
                <td>人才培训类</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>

          <div>
            <el-button type="primary" style="width: 100px">确定</el-button>
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
        tableData: [],
        form: {
          dayOfGenerateRebate: 1,
          dayOfTransferRebate: 1,
          num9: 0
        },
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
    created () {
      var that = this
      that.$options.methods.getSiteList.bind(that)()
    },
    methods: {
      getSiteList () {
        var that = this
        this.loading = true
        let param = {}
        API.baseSetting.getsettlement(param, (res) => {
          that.loading = false
          if (res.status) {
            that.form = res.data
          } else {
            that.$message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      save () {
        var that = this
        that.loading = true
        API.baseSetting.savesettlement(that.form, function (resData) {
          that.loading = false
          if (resData.status) {
            that.$message({
              message: '保存成功！',
              type: 'success',
            })
            that.$options.methods.getSiteList.bind(that)()
          }
        }, function () {
          that.loading = false
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },

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
