<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>站点开关设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="grey" icon="el-icon-remove-outline" @click="save">保存
        </com-button>
      </div>
      <div class="com-bar-right">
        <!--<com-button buttonType="search">搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">

      <div class="role-view-con">
        <el-form :model="form" ref="form" :rules="rules" :disabled ="isFormDisabled">
          <table class="com-dialog-table">
            <tr>
              <td class="td-title">每月系统对已审核未结算的销售及服务佣金进行结算生成返佣记录日</td>
              <td class="td-text">
                <el-form-item prop="maxSeaFollower">
                  <el-input-number v-model="form.dayOfGenerateRebate" :min="1" :max="28" placeholder="每月系统对已审核未结算的销售及服务佣金进行结算生成返佣记录日"></el-input-number>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">每月系统对用户已确认的返佣记录自动批量转款日</td>
              <td class="td-text">
                <el-form-item prop="maxSeaFollowerPerMonth">
                  <el-input-number v-model="form.dayOfTransferRebate"  :min="1" :max="28" placeholder="每月系统对用户已确认的返佣记录自动批量转款日"></el-input-number>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import API from '../../../../utils/api'
  import utils from '../../../../utils/utils'
  import comButton from '../../../../components/button/comButton'
  import moment from 'moment'

  export default {
    name: 'list',
    data () {
      return {
        tableData: [],
        form: {
          dayOfGenerateRebate:1,
          dayOfTransferRebate:1

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
      var that = this;
      that.$options.methods.getSiteList.bind(that)();
    },
    methods: {
      getSiteList () {
        var that = this;
        this.loading = true
        let param = {}
        API.baseSetting.getsettlement(param, (res) => {
          that.loading = false;
          if(res.status){
            that.form = res.data;
          }else{
            that.$message({
              message: res.error.message,
              type: 'error'
            });
          }

        }, (mock) => {
          that.loading = false;
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error'
          });
        })
      },
      save() {
        var that = this;
        that.loading = true;
        API.baseSetting.savesettlement(that.form,function (resData) {
          that.loading = false;
          if(resData.status){
            that.$message({
              message: '保存成功！',
              type: 'success'
            });
            that.$options.methods.getSiteList.bind(that)();
          }
        },function () {
          that.loading = false;
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error'
          });
        })
      }

    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .link {
    color: #00A7FE;
    text-decoration: underline;
    cursor: pointer;
  }
  .button {
    padding: 5px 10px;
    color: #fff;
    border-radius: 3px;
    background-color: #4BCF99;
    cursor: pointer;
  }
</style>
