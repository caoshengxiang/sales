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
      <div class="com-bar-right">
        <el-select v-model="contactsTypeOption" placeholder="请选择" class="com-el-select" style="width: 150px">
          <el-option
            v-for="item in contactsTypeOptions"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
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
          label="所属公司名称"
          prop="customerName"
          width="120">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="phone"
          label="联系电话"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="department"
          label="所在部门"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="position"
          label="公司职位"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="birthday"
          label="出生日期"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="bakPhone"
          label="备用电话"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="wx"
          label="微信"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="qq"
          label="QQ"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="mail"
          label="电子邮件"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
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
          prop="creatorName"
          label="创建人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="销售员"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span>{{}}</span>--><!--todo 缺销售人员-->
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
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
        contactsTypeOption: 0,
        multipleSelection: [],
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('constData', [
        'contactsTypeOptions',
        'contactsStatus',
        'pagesOptions'
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
        // this.addDialogOpen = true
        this.$vDialog.modal(addDialog, {
          title: '新增联系人',
          width: 900,
          height: 400,
          params: {
            // id: '123456',
          },
          callback (data) {
            if (data.type === 'save') {
              alert('弹窗关闭，添加成功刷新列表')
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
        this.getContactsList(this.currentPage, this.pagesOptions.pageSize, this.contactsTypeOption)
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getContactsList(this.currentPage, this.pagesOptions.pageSize, this.contactsTypeOption)
      },
      handleRouter (name, id) {
        this.$router.push({name: 'contactsDetail', query: {view: name, contactsId: id}, params: {end: 'FE'}})
      },
      getContactsList (page, pageSize, type) {
        this.dataLoading = true
        API.contactsList({
          page: page,
          pageSize: pageSize,
          type: type,
        }, (data) => {
          this.ac_contactsList(data.data)
          this.dataLoading = false
        }, (data) => {
          this.ac_contactsList(data.data)
          this.dataLoading = false
        })
      },
      searchHandle () {
        this.getContactsList(this.currentPage, this.pagesOptions.pageSize, this.contactsTypeOption)
      }
    },
    created () {
      this.getContactsList(this.currentPage, this.pagesOptions.pageSize, this.contactsTypeOption)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
