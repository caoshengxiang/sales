<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>联系人</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="addHandle">新增</com-button>
        <!--<com-button buttonType="orange" icon="el-icon-plus" @click="moveHandle">转移</com-button>-->
        <!--<com-button buttonType="backHighSeas" icon="el-icon-plus">退回公海池</com-button>-->
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0">
        <el-select v-model="contactsTypeOption" placeholder="请选择" class="com-el-select" style="width: 150px">
          <el-option
            v-for="item in contactsTypeOptions"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 1"><!--后端-->
        <el-select
          v-model="organizationId"
          @change="searchHandle"
          placeholder="请选择组织" class="com-el-select" style="width: 200px">
          <el-option label="全部组织的联系人" :value="null"></el-option>
          <el-option
            v-for="item in organizationOptions"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="contactsList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable
          prop="contacterName"
          label="客户联系人"
          width="200"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.contacterName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable
          label="所属公司名称"
          prop="customerName"
          width="180">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable
          prop="phone"
          label="联系电话"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="department"
          label="所在部门"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="position"
          label="公司职位"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="birthday"
          label="出生日期"
          width="140"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.birthday && $moment(scope.row.birthday).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="sex"
          label="性别"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="bakPhone"
          label="备用电话"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="wx"
          label="微信"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="qq"
          label="QQ"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="mail"
          label="电子邮件"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="status"
          label="联系人状态"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in contactsStatus" :key="item.type"
                  v-if="item.type === scope.row.status">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="creatorName"
          label="创建人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column
          align="center"
          label="销售员"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            &lt;!&ndash;<span>{{}}</span>&ndash;&gt;&lt;!&ndash; &ndash;&gt;
          </template>
        </el-table-column>-->
        <el-table-column
          align="center"
          sortable
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.birthday && $moment(scope.row.birthday).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="themeIndex === 1"
          show-overflow-tooltip
          align="center"
          sortable
          prop="organizationName"
          label="所属组织"
          width="160">
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="contactsTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
    <!---->
    <!---->
    <!--新增弹窗-->
    <!--<add-dialog :addDialogOpen="addDialogOpen" @hasAddDialogOpen="addDialogOpen = false"></add-dialog>-->
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  import addDialog from './addDialog'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        // addDialogOpen: false,
        contactsTypeOption: null,
        multipleSelection: [],
        currentPage: 1,
        customerId: null, // 路由参数中得客户id
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        organizationOptions: [], // 组织列表
        organizationId: null, // 选择的组织
      }
    },
    computed: {
      ...mapState('constData', [
        'contactsTypeOptions',
        'contactsStatus',
        'pagesOptions',
        'themeIndex',
      ]),
      ...mapState('contacts', [
        'contactsList',
        'contactsTotal',
      ]),
    },
    components: {
      comButton,
      addDialog,
    },
    methods: {
      ...mapActions('contacts', [
        'ac_contactsList',
      ]),
      addHandle () {
        this.$vDialog.modal(addDialog, {
          title: '新增联系人',
          width: 900,
          height: 460,
          params: {
            // id: '123456',
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getContactsList()
            }
          },
        })
      },
      moveHandle () {
        alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.getContactsList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getContactsList()
      },
      handleRouter (name, id) {
        this.$router.push({name: 'contactsDetail', query: {view: name, contactsId: id}, params: {end: 'FE'}})
      },
      getContactsList () {
        this.dataLoading = true
        this.getQueryParams()
        API.contacts.list(this.defaultListParams, (data) => {
          this.ac_contactsList(data.data)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        }, (err) => {
          console.error(err)
        })
      },
      searchHandle () {
        this.getContactsList()
      },
      advancedSearchHandle () {
        alert('advancedSearchHandle')
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.contactsTypeOption, // 前端
          organizationId: this.organizationId // 后端
        }
        if (this.customerId) { // 更多
          this.defaultListParams.customerId = this.customerId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
    },
    beforeCreate () {
    },
    created () {
      this.getContactsList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
