<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>客户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="addHandle">新增</com-button>
        <com-button buttonType="move" icon="el-icon-plus" @click="moveHandle">转移</com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-plus" @click="returnHighSeaHandle">退回公海池</com-button>
      </div>
      <div class="com-bar-right">
        <el-select v-model="customerType" placeholder="请选择" class="com-el-select">
          <el-option
            v-for="item in customerTypeOptions"
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
        v-loading="tableLoading"
        element-loading-text="数据加载中..."
        ref="multipleTable"
        border
        :data="customerContent"
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
          align="center"
          label="客户名称"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail')">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="营业执照"
          prop="businessLicense"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="levelName"
          label="客户级别"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="industryName"
          label="客户行业"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          label="客户地区"
          width="160">
          <template slot-scope="scope">
            {{ scope.row.provinceName }}
            {{ scope.row.cityName }}
            {{ scope.row.areaName }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="website"
          label="客户网站"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="phone"
          label="联系电话"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="seaName"
          label="所属公海"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="source"
          label="客户来源"
          width="160">
          <template slot-scope="scope">
            <span v-for="item in customerSourceType"
                  :key="item.type"
                  v-if="item.type === scope.row.source">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="creatorName"
          label="创建人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          label="销售人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="created"
          label="创建日期"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="state"
          label="状态"
          width="160">
          <template slot-scope="scope">
            <span v-for="item in customerState"
                  :key="item.type"
                  v-if="scope.row.state === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="customerTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
    <!-- -->
    <!-- -->
    <!--新增弹窗-->
    <el-dialog title="新增客户" :visible.sync="addDialogVisible" width="900px" :show-close="false">
      <div class="com-dialog">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">公司名称</td>
            <td class="td-text"><input type="text"></td>
            <td class="td-title">营业执照</td>
            <td class="td-text"><input type="text"></td>
            <td class="td-title">客户级别</td>
            <td class="td-text"><input type="text"></td>
          </tr>
          <tr>
            <td class="td-title">客户简称</td>
            <td class="td-text"><input type="text"></td>
            <td class="td-title">客户行业</td>
            <td class="td-text"><input type="text"></td>
            <td class="td-title">客户地区</td>
            <td class="td-text"><input type="text"></td>
          </tr>
          <tr>
            <td class="td-title">公司网站</td>
            <td class="td-text"><input type="text"></td>
            <td class="td-title">联系电话</td>
            <td class="td-text"><input type="text"></td>
            <td class="td-title">所属公海</td>
            <td class="td-text"><input type="text"></td>
          </tr>
          <tr>
            <td class="td-title">联系地址</td>
            <td class="td-text" colspan="5"><input type="text"></td>
          </tr>
          <tr>
            <td class="td-title">主营业务</td>
            <td class="td-text" colspan="5"><input type="text"></td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel-button" @click="addDialogVisible = false">取 消</el-button>
          <el-button class="save-button" @click="addDialogVisible = false">保存并新建联系人</el-button>
          <el-button class="save-button" @click="addDialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- -->
    <!-- -->
    <!--转移客户弹窗-->
    <el-dialog title="转移客户" :visible.sync="moveDialogVisible" width="900px" :show-close="false">
      <div class="com-dialog">
        <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="活动区域" prop="salesperson">
            <el-select v-model="moveCustomerForm.salesperson" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel-button" @click="moveDialogVisible = false">取 消</el-button>
          <el-button class="save-button" @click="moveDialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { pagesOptions } from '../../../utils/const'
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'list',
    data () {
      return {
        tableLoading: true,
        addDialogVisible: false, // 新增弹窗
        addCustomersForm: { // 新增表单
        },
        moveDialogVisible: false, // 转移弹窗
        moveCustomerForm: {
          salesperson: '',
        },
        rules: {},
        multipleSelection: [],
        customerType: 0, // 客户选项
        currentPage: 1, // 当前页
      }
    },
    computed: {
      ...mapState('constData', [
        'customerTypeOptions',
        'customerSourceType',
        'customerState',
      ]),
      ...mapState('customer', [
        'customerContent',
        'customerTotal',
      ]),
      pagesOptions () {
        return pagesOptions
      },
    },
    components: {
      comButton,
    },
    methods: {
      ...mapActions('customer', [
        'ac_customerList',
      ]),
      getCustomerList (page, pageSize, type) { // 获取列表数据
        let param = {
          page: page,
          pageSize: pageSize,
          type: type,
        }
        this.tableLoading = true
        API.customerList(param, (res) => {
          console.log(res)
        }, (mock) => {
          this.ac_customerList(mock.data)
          this.tableLoading = false
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getCustomerList(this.currentPage, this.pagesOptions.pageSize, this.customerType)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCustomerList(this.currentPage, this.pagesOptions.pageSize, this.customerType)
      },
      handleRouter (name) {
        this.$router.push({name: 'customersDetail', query: {view: name}})
      },
      addHandle () {
        this.addDialogVisible = true
      },
      moveHandle () {
        this.moveDialogVisible = true
      },
      returnHighSeaHandle () {
        this.$confirm('确定退回公海池, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      },
    },
    created () {
      this.getCustomerList(this.currentPage, this.pagesOptions.pageSize, this.customerType)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
