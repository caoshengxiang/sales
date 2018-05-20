<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>客户公海</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="move" icon="el-icon-plus" @click="operateOptions('assign')">分配</com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-plus" @click="operateOptions('gain')">捞取</com-button>
        <com-button buttonType="theme" icon="el-icon-plus" @click="operateOptions('group')">改变分组</com-button>
      </div>
      <div class="com-bar-float-right">
        <com-button buttonType="import">导入</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
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
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail')">{{ scope.row.customerName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户来源"
          prop=""
          width="120">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="所属公海"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="客户级别"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="最新动态日期"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="最近跟进人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="创建人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState } from 'vuex'
  import addDialog from '../customers/addDialog'
  import assignDialog from './assignDialog'
  import groupDialog from './groupDialog'

  export default {
    name: 'list',
    data () {
      return {
        options: [
          {
            value: 1,
            label: '全部客户',
          }, {
            value: 2,
            label: '我负责的客户',
          }, {
            value: 3,
            label: '我跟进的客户',
          }, {
            value: 4,
            label: '我参与的客户',
          }],
        value: 3,
        tableData: [
          {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '成都凡特塞科技有限公司',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }],
        multipleSelection: [],
        currentPage: 1,
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
    methods: {
      operateOptions (op) {
        switch (op) {
          case 'add':
            // this.addDialogOpen = true
            this.$vDialog.modal(addDialog, {
              title: '新增销售机会',
              width: 900,
              height: 400,
              params: {
                salesState: this.salesState,
              },
              callback (data) {
                if (data.type === 'save') {
                  alert('弹窗关闭，添加成功刷新列表')
                }
              },
            })
            break
          case 'assign':
            // this.moveDialogOpen = true
            this.$vDialog.modal(assignDialog, {
              title: '分配客户',
              width: 500,
              height: 200,
              params: {
                // id: '123456',
              },
              callback (data) {
                if (data.type === 'save') {
                  alert('弹窗关闭，添加成功刷新列表')
                }
              },
            })
            break
          case 'gain':
            this.$confirm('确定捞取, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.$message({
                type: 'success',
                message: '捞取成功!',
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消捞取',
              })
            })
            break
          case 'group':
            // this.moveDialogOpen = true
            this.$vDialog.modal(groupDialog, {
              title: '改变分组',
              width: 500,
              height: 200,
              params: {
                // id: '123456',
              },
              callback (data) {
                if (data.type === 'save') {
                  alert('弹窗关闭，添加成功刷新列表')
                }
              },
            })
            break
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      handleRouter (name) {
        this.$router.push({name: 'customersDetail', query: {view: name}, params: {end: 'FE'}})
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
