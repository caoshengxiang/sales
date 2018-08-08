<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="操作者：">
              <el-input type="text" v-model="searchForm.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织名称：">
              <el-input type="text" v-model="searchForm.organizationName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="操作人组织：">
              <el-select v-model.number="searchForm.organizationId" @change="selectedOptionsHandleChange"
                         placeholder="请选择操作人组织"
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
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="对象主体：">
              <el-input type="text" v-model="searchForm.subjectName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对象类型：">
              <el-input type="text" v-model="searchForm.objectType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行为：">
              <el-input type="text" v-model="searchForm.action"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="对象系统：">
              <el-input type="text" v-model="searchForm.businessSystemName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="操作时间：">
              <el-date-picker
                v-model="birthday"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeIntervalHandle"
                :unlink-panels="true"
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
      <div class="com-bar-right"><!--后端-->
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
          organizationId: null,
          userName: null,
          organizationName: null,
          subjectName: null,
          objectType: null,
          action: null,
          businessSystemName: null,
          operateTimeStart: null,
          operateTimeEnd: null,
        },
        organizationOptions: [], // 组织列表
        timeIntervalRefundDate: '',
        timeIntervalAuditTime: '',
        birthday: '',
        type: 0,
      }
    },
    props: ['params'],
    methods: {
      timeIntervalHandle (value) {
        this.searchForm.operateTimeStart = Number(new Date(value[0])) || ''
        this.searchForm.operateTimeEnd = Number(new Date(value[1])) || ''
      },
      selectedOptionsHandleChange (value) {
        var that = this
        that.organizationId = value
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
