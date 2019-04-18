<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="(item, i) in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}" :class='i == 2 ? "curColor-zhu": ""'>{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
				<ul class='list-classification-ul'>
					<li v-for="item in listClassification">
						<p class='list-classification-ul-text'>{{item.name}}{{item.num}}</p>
						<p class='list-classification-ul-line' v-if='item.show'></p>
					</li>
				</ul>
      </div>
      <div class="com-bar-right">
        <com-button class='green-color' @click="operateOptions('add')">新增</com-button>
        <com-button class='green-color' @click="operateOptions('edit')"
                    :disabled="multipleSelection.length !== 1">编辑</com-button>
        <com-button class='green-color' @click="operateOptions('delete')"
                    :disabled="multipleSelection.length !== 1">删除</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
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
          prop="id"
          label="讲师id"
          width="100">
        </el-table-column>
        <el-table-column
          fixed
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="lectureName"
          label="讲师名称"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="lecturePhone"
          label="联系方式"
					width='160'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="lectureType"
          label="讲师性质"
          show-overflow-tooltip>
						<template slot-scope='scope'>
							<span>{{lectureSource[scope.row.lectureType]}}</span>
						</template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="idCard"
          label="身份证号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="title"
          label="职称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="joinMeetingTimes"
          label="参与会议次数"
          show-overflow-tooltip>
						<template slot-scope='scope'>
							<span>{{scope.row.joinMeetingTimes || 0}}</span>
						</template>
        </el-table-column>
				<el-table-column
          align="center"
          label="操作">
						<template slot-scope='scope'>
							<span class='lecturer-detail'  @click="operateOptions('detail', scope.row)">详情</span>
						</template>
				</el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="tableDataTotal"
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
  import { mapState } from 'vuex'
  import API from '../../../../utils/api'
  import { underscoreName, arrToStr } from '../../../../utils/utils'
  import addDialog from './addDialog'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
				lectureSource: {
					1: '平台兼职讲师',
					2: '专职',
					3: '外聘讲师'
				},
        dataLoading: false,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: {              // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: {sort: 'created,desc'},  // 排序
        tableData: [],
        tableDataTotal: 1,
				
		listClassification: [             //列表分类
			{
				name: '全部-',
				id: 0,
				num: 20,
				show: true,
			}
		],
      }
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 280
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
      this.getList()
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    computed: {
      ...mapState('constData', [
        'contactsTypeOptions',
        'contactsStatus',
        'pagesOptions',
        'themeIndex',
      ]),
    },
    components: {
      comButton,
      addDialog,
    },
    methods: {
		addHandle () {
			this.$vDialog.modal(addDialog, {
				title: '新增会议讲师',
				width: 510,
				height: 680,
				params: {},
				callback: (data) => {
					if (data.type === 'save') {
						this.getList()
					}
				},
			})
		},
		posTableHeight () {
			let h = document.body.clientHeight,
				new_h = h - 280;
			this.posheight = new_h;
		},
		editHandle () {
			let _list = JSON.parse(JSON.stringify(this.multipleSelection[0]));
			if(_list.status == -1) {
				this.$message({
					type: 'error',
					message: '已删除的讲师不可编辑',
				})
				return;
			}
			this.$vDialog.modal(addDialog, {
				title: '修改会议讲师',
				width: 510,
				height: 680,
				params: {
					detail: _list,
				},
				callback: (data) => {
					if (data.type === 'save') {
					  this.getList()
					}
				},
			})
		},
		detailHandle (list) {
			this.$vDialog.modal(addDialog, {
				title: '查看会议讲师',
				width: 510,
				height: 680,
				params: {
					detail: list,
					type: true,
				},
				callback: (data) => {
				},
			})
		},
		// 删除会议讲师
		deleteHandle () {
			let _list = JSON.parse(JSON.stringify(this.multipleSelection[0])), params = {id: _list.id, status: -1};
			if(_list.status == -1) {
				this.$message({
					type: 'error',
					message: '已删除的讲师不可再次删除',
				})
				return;
			}
			this.$confirm(`确定删除讲师[${_list.lectureName}]?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				API.activity.editconferenceLecturerList(params, (data) => {
					if(data.status) {
						this.$message({
							type: 'success',
							message: '删除成功',
							duration: 1000
						})
						this.getList();
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除',
				})
			})
		},
      operateOptions (type, list) {
        switch (type) {
          case 'add':
            this.addHandle()
            break
          case 'edit':
            this.editHandle()
            break
					case 'detail':
						this.detailHandle(list)
						break
					case 'delete':
						this.deleteHandle()
        }
      },
      moveHandle () {
        alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.getList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getList()
      },
      handleRouter (name, id) {
        this.$router.push({
          name: 'meetingActivityDetail',
          query: {view: name, id: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
      },
      getList () { //conferenceLecturerList
        this.dataLoading = true
        this.getQueryParams()
        API.activity.conferenceLecturerList(Object.assign({}, this.defaultListParams, this.sortObj), (data) => {
					
			this.listClassification[0].num = data.data.totalElements;    //获取全部的数量
			this.tableData = data.data.content
			this.tableDataTotal = data.data.totalElements
			setTimeout(() => {
				this.dataLoading = false
			}, 500)
        }, (err) => {
			this.tableData = err.data.content
			this.tableDataTotal = err.data.totalElements
			console.error(err)
			setTimeout(() => {
				this.dataLoading = false
			}, 500)
        })
      },
      searchHandle () {
        this.getList()
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getList()
      },
      getQueryParams () { // 请求参数
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
    },
    beforeCreate () {
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";
	.lecturer-detail {
		color: #1E88E5;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
