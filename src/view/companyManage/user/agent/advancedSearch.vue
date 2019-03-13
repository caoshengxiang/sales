<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="姓名：">
              <el-input type="text" v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理商号：">
              <el-input type="text" v-model="searchForm.agentNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信号：">
              <el-input type="text" v-model="searchForm.wx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号：">
              <el-input type="text" v-model="searchForm.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
          <!--</el-row>-->
          <!--<el-row class="el-row-cla">-->
          <el-col :span="8">
            <el-form-item label="直接上级：">
              <el-input type="text" v-model="searchForm.head"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="直接培育人：">
              <el-input type="text" v-model="searchForm.directName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份类型：">
              <el-select v-model="identityType" @change="selectedIdentityChange"
                         placeholder="请选择身份类型"
                         style="width: 140px">
                <el-option
                  v-for="item in identityList"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.codeName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="注册日期：">
              <el-date-picker
                v-model="created"
                value-format="timestamp"
                type="daterange"
                @change="createdTimeIntervalHandle"
                :unlink-panels="true"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">

          <el-col :span="8">
            <el-form-item label="用户组织：">
              <el-select v-model.number="searchForm.organizationId" @change="selectedOptionsHandleChange"
                         placeholder="请选择人员组织"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="cancel-button" @click="clearForm">清 除</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
      <div class="com-bar-right"><!--后端-->
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        customerSourceType: [], // 客户来源
        customerState: [], // 客户状态
				identityType: '',
        searchForm: { // 表单
          mobilePhone: null,
          name: null,
          organizationId: null,
          head: null,
          agentNo: null,
          wx: null,
					directName: null,           //直接培育人
					createdStart: null,         //注册开始时间
					createdEnd: null,           //注册结束时间
					identityType: null,         //选择的身份类型
        },
        organizationOptions: [], // 组织列表
				identityList: [],        //所有身份类型
        timeIntervalRefundDate: '',
        timeIntervalAuditTime: '',
				created: '',
        type: 0,
      }
    },
    props: ['params'],
		// zxIdentity
    methods: {
			getIdentity () {
				API.organization.zxIdentity({type: 15}, (res) => {
					if(res.status) {
						this.identityList = res.data;
					}
				})
			},
			selectedIdentityChange () {
				this.identityList.forEach(a => {
					if(a.codeName === this.identityType) {
						this.searchForm.identityType = a.code;
					}
				})
			},
			createdTimeIntervalHandle (value) {
				// 86399000  23:59:59的毫秒数
				this.searchForm.createdStart = value[0] || ''
				this.searchForm.createdEnd = (value[1] + 86399000) || ''
			},
      selectedOptionsHandleChange (value) {
        var that = this
        that.organizationId = value
        // this.form.organizationId =value[value.length -1] // 取当前选中的组织
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
      clearForm () {
				this.searchForm.createdStart = '';
				this.searchForm.createdEnd = '';
				this.identityType = '';
				this.searchForm.identityType = '';
        this.searchForm = {}
				this.created = []
      },
      saveSubmitForm () {
				if(this.searchForm.created) {
					this.searchForm.created = +this.searchForm.created;
				}
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
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.createdStart) { // 日期
        this.created = [this.searchForm.createdStart, this.searchForm.createdEnd]
      }
      this.type = this.params.type
			
			this.getIdentity();
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
