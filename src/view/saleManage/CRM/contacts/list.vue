<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="addHandle">新增</com-button>
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
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="contactsList"
        :max-height='posheight'
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          fixed
          show-overflow-tooltip
          align="center"
          sortable="custom"
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
          sortable="custom"
          label="所属客户名称"
          prop="customerName"
          width="180">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="phone"
          label="联系电话"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="department"
          label="所在部门"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="position"
          label="公司职位"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
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
          sortable="custom"
          prop="sex"
          label="性别"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="bakPhone"
          label="备用电话"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="wx"
          label="微信"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="qq"
          label="QQ"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="mail"
          label="电子邮件"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
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
          sortable="custom"
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
          sortable="custom"
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="themeIndex === 1"
          show-overflow-tooltip
          align="center"
          sortable="custom"
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
  import comButton from '../../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../../utils/api'
  import addDialog from './addDialog'
  import advancedSearch from './advancedSearch'
  import { underscoreName } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
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
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
      }
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 260
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    mounted() {
      // 监听页面高度
      const that = this
      window.onresize = () => {
        return (() => {
          let a = document.body.clientHeight
          that.h = a
        })()
      }
    },
    created () {
      this.getContactsList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
      this.posTableHeight();            //根据屏幕高度设置table高度
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
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      addHandle () {
        this.$vDialog.modal(addDialog, {
          title: '新增联系人',
          width: 900,
          height: 460,
          params: {},
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
        let _url = this.$router.resolve({name: 'contactsDetail', query: {view: name, contactsId: id}, params: {end: this.themeIndex === 0 ? 'FE' : 'ME'}});
				window.open(_url.href, '_blank')
      },
      getContactsList () {
        this.dataLoading = true
        this.getQueryParams()
        if (this.themeIndex === 0) {
          API.contacts.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
            this.ac_contactsList(data.data)
            setTimeout(() => {
              this.dataLoading = false
            }, 500)
          }, (err) => {
            console.error(err)
          })
        } else if (this.themeIndex === 1) {
          API.contacts.listAdmin(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
            this.ac_contactsList(data.data)
            setTimeout(() => {
              this.dataLoading = false
            }, 500)
          }, (err) => {
            console.error(err)
          })
        }
      },
      searchHandle () {
        this.getContactsList()
      },
      sortChangeHandle (sortObj) {
        // console.log(sortObj)
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getContactsList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 340,
          params: {
            contactsStatus: this.contactsStatus,
            preAdvancedSearch: this.advancedSearch
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.getContactsList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
          },
        })
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.contactsTypeOption, // 前端
          organizationId: this.organizationId, // 后端
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
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
