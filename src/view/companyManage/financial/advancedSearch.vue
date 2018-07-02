<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla"  v-if="type===0">
          <el-col :span="8" >
            <el-form-item label="订单号：">
              <el-input type="text" v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="订单客户：" >
              <el-input type="text" v-model="searchForm.jobNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售商品：" >
              <el-input type="text" v-model="searchForm.agentNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="签约主体：">
              <el-input type="text" v-model="searchForm.wx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售主体：">
              <el-input type="text" v-model="searchForm.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务主体：" >
              <el-input type="text" v-model="searchForm.departmentName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla"  v-if="type===0">
          <el-col :span="8">
            <el-form-item label="返佣主体：">
              <el-input type="text" v-model="searchForm.head"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="结算状态：">
              <el-select v-model="searchForm.clearState" placeholder="请选择结算状态">
                <el-option v-for="item in clearState"  :key="item.type" :label="item.value" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  v-if="type===0">
          <el-col :span="8" >
            <el-form-item label="回款金额：">
              <el-input type="text" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item  label="至：">
              <el-input type="text" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  v-if="type===0">
          <el-col :span="8" >
            <el-form-item label="收支合计：">
              <el-input type="text" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item  label="至：">
              <el-input type="text" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="type===1">
          <el-col :span="8" >
            <el-form-item label="返佣对象：">
              <el-input type="text" v-model="searchForm.assistant"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="佣金状态：">
              <el-input type="text" v-model="searchForm.trainer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
      <div class="com-bar-right" ><!--后端-->
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        clearState: [ // 订单状态
          {
            type: 1,
            value: '待审核'
          }, {
            type: 2,
            value: '已作废'
          }, {
            type: 3,
            value: '已审核'
          }
        ],
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        customerSourceType: [], // 客户来源
        customerState: [], // 客户状态
        searchForm: { // 表单
          mobilePhone:null,
          jobNo:null,
          name: null,
          organizationId: null,
          roleId:null,
          birthdayStart: null,
          birthdayEnd: null,
          departmentName:null,
          head:null,
          assistant:null,
          trainer:null,
          sex:null,
          agentNo:null,
          wx:null,
        },
        organizationOptions: [], // 组织列表
        timeIntervalRefundDate: '',
        timeIntervalAuditTime: '',
        allroles:[],
        birthday: '',
        type:0
      }
    },
    props: ['params'],
    methods: {
      timeIntervalHandle (value) {
        this.searchForm.birthdayStart = value[0] || ''
        this.searchForm.birthdayEnd = value[1] || ''
      },
      selectedOptionsHandleChange (value) {
        var that = this
        that.organizationId  = value
        // this.form.organizationId =value[value.length -1] // 取当前选中的组织
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalRefundDateHandle (value) {
        this.searchForm.startRefundDate = value[0] || ''
        this.searchForm.endRefundDate = value[1] || ''
      },
      timeIntervalAuditTimeHandle (value) {
        this.searchForm.startAuditTime = value[0] || ''
        this.searchForm.endAuditTime = value[1] || ''
      },
      intervalStartHandle () {
        if (this.searchForm.startNetReceipts > this.searchForm.endNetReceipts) {
          this.searchForm.endNetReceipts = null
        }
      },
      intervalEndHandle () {
        if (this.searchForm.startNetReceipts && this.searchForm.startNetReceipts > this.searchForm.endNetReceipts) {
          this.searchForm.endNetReceipts = this.searchForm.startNetReceipts
        }
      },
    },
    created () {
      var that = this
      that.getOrganization({pid: 1})
      let params = {
        page: 1,
        pageSize: 999,
      }
      API.user.roleList(params, (res) => {
        that.allroles = res.data
      }, (mock) => {
        that.allroles = mock.data
        that.dataLoading = false
      })

      this.type = this.params.type
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
