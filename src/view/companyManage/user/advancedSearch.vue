<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="姓名：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="员工号：">
              <el-input type="text" v-model="searchForm.contacterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号：">
              <el-input type="text" v-model="searchForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="部门：">
              <el-input type="text" v-model="searchForm.specificationName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="直接上级：">
              <el-input type="text" v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门培训师：">
              <el-input type="text" v-model="searchForm.rebateSubjectName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="销售培训师：">
              <el-input type="text" v-model="searchForm.rebateRelUserName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="用户组织：">
              <el-select v-model.number="searchForm.organizationId" @change="selectedOptionsHandleChange" placeholder="请选择人员组织"
                         style="width: 140px">
                <el-option
                  v-for="item in organizationOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>

          <el-col :span="8">
          <el-form-item  label="用户性别：">
            <el-select v-model.number="searchForm.sex" placeholder="请选择员工性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item  label="用户角色：">
            <el-select v-model="searchForm.roleId"  placeholder="请选择角色职能">
              <el-option
                v-for="item in allroles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>

          </el-col>

          <el-col :span="16">
            <el-form-item label="出生日期：">
              <el-date-picker
                v-model="timeInterval"
                type="daterange"
                value-format="yyyy-MM-dd"
                @change="timeIntervalHandle"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        customerSourceType: [], // 客户来源
        customerState: [], // 客户状态
        searchForm: { // 表单
          customerName: null,
          contacterName: null,
          productName: null,
          specificationName: null,
          name: null,
          rebateSubjectName: null,
          rebateRelUserName: null,
          refundStatus: null,
          isRenew: null,
          // 回款
          startNetReceipts: null,
          endNetReceipts: null,
          startRefundDate: null, // 回款日期下限
          endRefundDate: null,
          startAuditTime: null, // 审核时间下限
          endAuditTime: null,
          organizationId: null,
          sex:'',
          roleId:null,
          startDate: null,
          endDate: null,
        },
        organizationOptions: [], // 组织列表
        timeIntervalRefundDate: '',
        timeIntervalAuditTime: '',
        allroles:[],
        timeInterval: ''
      }
    },
    props: ['params'],
    methods: {
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
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


    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
