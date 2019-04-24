<!--服务任务-->
<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <span>统计时间: </span>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="timeIntervalHandle"
          :unlink-panels="true"
          :default-value="lastMonthDate()"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
				<span class='ml10'>统计商品: </span>
				<el-select placeholder="请选择商品分类" v-model='goodsTypeId' @change="selectGoodsType">
					<el-option v-for='item in goodsTypeList' :key='item.objectId' :label="item.name" :value="item.objectId">{{item.name}}</el-option>
				</el-select>
				<el-select clearable placeholder="请选择商品" v-model='goodsId'>
					<el-option v-for='item in goodsList' :key='item.objectId' :label="item.name" :value="item.objectId">{{item.name}}</el-option>
				</el-select>
        <!--<el-button @click="searchHandle">查询</el-button>-->
        <com-button buttonType="search" @click="searchHandle">查询</com-button>
      </div>
      <div class="com-bar-right">
        <!--<el-button>打印</el-button>-->
        <com-button buttonType="export" icon="el-icon-download" @click="excelExports">导出派单明细</com-button>
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出统计数据</com-button>
      </div>
      <div>
        <el-table
          ref="multipleTable2"
          border
          :data="serviceTaskNum"
          tooltip-effect="dark"
        >
          <el-table-column
            align="center"
            prop="name"
            label="名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="total"
            label="全部任务数量"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.total == 0'>{{scope.row.total}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 1)'>{{scope.row.total}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="serviceCount"
            label="进行中得任务数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.serviceCount == 0'>{{scope.row.serviceCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 2)'>{{scope.row.serviceCount}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="normalFinishCount"
            label="正常完成工作数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.normalFinishCount == 0'>{{scope.row.normalFinishCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 3)'>{{scope.row.normalFinishCount}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="oODFinishCount"
            label="超期完成得任务数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.oODFinishCount == 0'>{{scope.row.oODFinishCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 4)'>{{scope.row.oODFinishCount}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="oODServiceCount"
            label="超期未完成得任务数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.oODServiceCount == 0'>{{scope.row.oODServiceCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 5)'>{{scope.row.oODServiceCount}}</span>
						</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <div>
        <el-table
          ref="multipleTable"
          border
          stripe
          :data="tableData"
          :max-height='posheight'
          tooltip-effect="dark"
          @sort-change="sortChangeHandle"
        >
          <el-table-column
            align="center"
            sortable="custom"
            prop="managerName"
            label="服务管家"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="total"
            label="全部任务数量"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.total == 0'>{{scope.row.total}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 1)'>{{scope.row.total}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceCount"
            label="进行中的任务数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.serviceCount == 0'>{{scope.row.serviceCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 2)'>{{scope.row.serviceCount}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="normalFinishCount"
            label="正常完成工作数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.normalFinishCount == 0'>{{scope.row.normalFinishCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 3)'>{{scope.row.normalFinishCount}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="oODFinishCount"
            label="超期完成的任务数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.oODFinishCount == 0'>{{scope.row.oODFinishCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 4)'>{{scope.row.oODFinishCount}}</span>
						</template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="oODServiceCount"
            label="超期未完成的任务数"
            show-overflow-tooltip
          >
						<template slot-scope='scope'>
							<span v-if='scope.row.oODServiceCount == 0'>{{scope.row.oODServiceCount}}</span>
							<span class='blue-span' v-else @click='goDetail(scope.row, 5)'>{{scope.row.oODServiceCount}}</span>
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
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName, lastMonthDate } from '../../../../utils/utils'
  import API from '../../../../utils/api'
  import comButton from '../../../../components/button/comButton'
  import { serverUrl } from '../../../../utils/const'
  import webStorage from 'webStorage'
  import QS from 'qs'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          dateStart: null,
          dateEnd: null,
        },
        sortObj: {}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDataTotal: 0,
        serviceTaskNum: [],
				goodsTypeList: [],    //所有分类
				goodsList: [],        //所有商品
				
        time: '',
				goodsId: '',          //选中的商品id
				goodsTypeId: '',      //选中的商品分类id
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
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
			// 获取商品分类
			getGoodsTypeList () {
				API.external.goodsTypeList((data) => {
					if(data.status == 200) {
						if(data.content == null) data.content = [];
						data.content.unshift({name: '全部分类', objectId: 0});
						this.goodsTypeList = data.content;
					}
				})
			},
			// 选择商品分类
			selectGoodsType (item) {
				this.goodsList = [];
				this.goodsId = '';
				let params = {
					goodsType: this.goodsTypeId,
				};
				if(this.goodsTypeId == 0) delete params.goodsType;
				API.external.findGoods(params, (data) => {
					if(data.status == 200) {
						if(data.content == null) data.content = [];
						data.content.unshift({name: '全部商品', objectId: 0, deleted: false, pullOff: false});
						data.content.forEach(a => {
							if(a.deleted && a.pullOff) {
								a.name = a.name + ' [删除]'
							}
							if(a.deleted && !a.pullOff) {
								a.name = a.name + ' [删除]'
							}
							if(!a.deleted && a.pullOff) {
								a.name = a.name + ' [下架]'
							}
							
						})
						this.goodsList = data.content;
					}
				})
			},
			// 进入详情页
			goDetail (item, type) {
				let _data = {
					dateStart: this.defaultListParams.dateStart,
					dateEnd: this.defaultListParams.dateEnd,
					goodsId: this.goodsId.toString(),
					goodsTypeId: this.goodsTypeId.toString(),
					managerId: item.managerId.toString(),
					type: type.toString(),
				};
				this.$router.push({
					path: 'serviceTaskStaDetail',
					query: _data,
				})
			},
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 341;
        this.posheight = new_h;
      },
      lastMonthDate () {
        return lastMonthDate()
      },
      timeIntervalHandle (value) {
        this.defaultListParams.dateStart = value[0] || ''
        this.defaultListParams.dateEnd = value[1] || ''
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getServiceWorkManager()
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getServiceWorkManager()
      },
      getServiceTaskCount () {
				this.getQueryParams();
        API.statistical.serviceWork(this.defaultListParams, (da) => {
          this.serviceTaskNum = [
            {
				managerId: '',
                name: '合计数量',
                total: da.data.total,
                normalFinishCount: da.data.normalFinishCount,
                oODFinishCount: da.data.oODFinishCount,
                oODServiceCount: da.data.oODServiceCount,
                serviceCount: da.data.serviceCount,
            },
          ]
        })
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          dateStart: this.defaultListParams.dateStart,
          dateEnd: this.defaultListParams.dateEnd,
			goodsId: this.goodsId,
			goodsTypeId: this.goodsTypeId,
        }
		if(this.defaultListParams.goodsId == 0) delete this.defaultListParams.goodsId;
		if(this.defaultListParams.goodsTypeId == 0) delete this.defaultListParams.goodsTypeId;
      },
      getServiceWorkManager () {
        this.getQueryParams()
        API.statistical.serviceWorkManager(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (da) => {
            this.tableData = da.data.content
            this.tableDataTotal = da.data.totalElements
          })
      },
      searchHandle () {
        this.getServiceTaskCount()
        this.getServiceWorkManager()
      },
      excelExport () { // 导出
        this.getQueryParams()
        let as = {}
        for (let key in this.advancedSearch) { // 去除null
          if (this.advancedSearch[key]) {
            as[key] = this.advancedSearch[key]
          }
        }
        let dlp = {}
        for (let key in this.defaultListParams) { // 去除分页
          if (key !== 'page' && key !== 'pageSize') {
            dlp[key] = this.defaultListParams[key]
          }
        }
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, dlp, this.sortObj, as,
          {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        link.setAttribute('href', serverUrl + '/countSystem/serviceWork/export?' + query)
        link.setAttribute('download', '服务任务统计')
        link.setAttribute('target', '_blank')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
      excelExports () { // 导出派单明细
        this.getQueryParams()
        let as = {}
        for (let key in this.advancedSearch) { // 去除null
          if (this.advancedSearch[key]) {
            as[key] = this.advancedSearch[key]
          }
        }
        let dlp = {}
        for (let key in this.defaultListParams) { // 去除分页
          if (key !== 'page' && key !== 'pageSize') {
            dlp[key] = this.defaultListParams[key]
          }
        }
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, dlp, this.sortObj,
          {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        link.setAttribute('href', serverUrl + '/countSystem/serviceWorkDetail/export?' + query)
        link.setAttribute('download', '服务任务统计-派单明细')
        link.setAttribute('target', '_blank')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
    },
    created () {
      this.searchHandle()
      this.posTableHeight();            //根据屏幕高度设置table高度
			this.getGoodsTypeList();
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
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
	.ml10 {
		margin-left: 10px;
	}
	.blue-span {
		color: #1E88E5;
		cursor: pointer;
	}
	.blue-span:hover {
		text-decoration: underline;
	}
</style>
