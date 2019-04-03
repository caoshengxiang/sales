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
          prop="channelName"
          label="渠道名称"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="cooperationSource"
          label="合作方来源"
          show-overflow-tooltip>
		  <template slot-scope='scope'>
			  <span>{{cooperationSource[scope.row.cooperationSource]}}</span>
		  </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="organizationNature"
          label="机构性质"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="contacter"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="contactPhone"
          label="联系方式"
		  width='160'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="created"
          label="创建时间"
		  width='160'
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="cooperationTimes"
          label="合作次数"
          show-overflow-tooltip>
		  <template slot-scope='scope'>
			  <span>{{scope.row.cooperationTimes || 0}}</span>
		  </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="applyTimes"
          label="报名人数"
          show-overflow-tooltip>
		  <template slot-scope='scope'>
			  <span>{{scope.row.applyTimes || 0}}</span>
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
		cooperationSource: {
			1: '外部',
			2: '内部'
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
				title: '新增会议合作渠道',
				width: 500,
				height: 420,
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
			let cooperationSource = this.multipleSelection[0].cooperationSource;
			if(cooperationSource == 2) {
				this.$message({
					type: 'error',
					message: '只能对外部的合作渠道进行编辑'
				});
				return;
			}
			this.$vDialog.modal(addDialog, {
				title: '修改会议合作渠道',
				width: 500,
				height: 420,
				params: {
					detail: JSON.parse(JSON.stringify(this.multipleSelection[0])),
				},
				callback: (data) => {
					if (data.type === 'save') {
					  this.getList()
					}
				},
			})
		},
      operateOptions (type) {
        switch (type) {
          case 'add':
            this.addHandle()
            break
          case 'edit':
            this.editHandle()
            break
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
      getList () { //cooperationChannelList
        this.dataLoading = true
        this.getQueryParams()
        API.activity.cooperationChannelList(Object.assign({}, this.defaultListParams, this.sortObj), (data) => {
					
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
</style>
