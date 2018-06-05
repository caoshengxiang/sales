<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
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
            <el-table
              border
              tooltip-effect="dark"
              :data="tableData">
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="siteName"
                label="站点名称"
              >
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="站点开关"
              >
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.state" :label="1">是</el-radio>
                  <el-radio v-model="scope.row.state" :label="0">否</el-radio>
                </template>
              </el-table-column>
            </el-table>
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
        API.baseSetting.getSiteList(param, (res) => {
          that.loading = false;
          if(res.status){
            that.tableData = res.data;
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
        API.baseSetting.saveSite(that.tableData,function (resData) {
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
