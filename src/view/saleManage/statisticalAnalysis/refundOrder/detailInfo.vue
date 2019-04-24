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
				<el-option v-for='(item, index) in goodsTypeList' :key='index' :label="item.name" :value="item.objectId">{{item.name}}</el-option>
			</el-select>
			<el-select placeholder="请选择商品" v-model='goodsId'>
				<el-option v-for='(item, index) in goodsList' :key='index' :label="item.name" :value="item.objectId">{{item.name}}</el-option>
			</el-select>
			<span class='ml10'>服务管家: </span>
			<el-select placeholder="请选择服务管家" v-model='managerId'>
				<el-option v-for='(item, index) in serviceManagerList' :key='index' :label="item.name" :value="item.userId">{{item.name}}</el-option>
			</el-select>
			<span class='ml10'>工单状态: </span>
			<el-select placeholder="请选择工单状态" v-model='type'>
				<el-option v-for='(item, index) in statusList' :key='index' :label="item.name" :value="item.id">{{item.name}}</el-option>
			</el-select>
			<!--<el-button @click="searchHandle">查询</el-button>-->
			<com-button buttonType="search" @click="searchHandle">查询</com-button>
		</div>
		<!--详细-->
		<div class="com-box com-box-padding com-list-box">
			<div v-loading='loading'>
				<el-table
					ref="multipleTable"
					border
					stripe
					:data="tableData"
					:max-height='posheight'
					tooltip-effect="dark"
					@sort-change="sortChangeHandle">
					<el-table-column
						align="center"
						sortable="custom"
						prop="orderNum"
						label="派单工单单号"
						show-overflow-tooltip
						width='200px'
						fixed>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="type"
						label="派单工单状态"
						width='120px'
						show-overflow-tooltip>
						<template slot-scope='scope'>
							{{finishStatus[scope.row.type] || '进行中'}}
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="serviceTypeName"
						label="服务类型"
						width='150px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="orderId"
						label="订单单号"
						width='200px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="serviceCustomerName"
						label="客户名称"
						width='200px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="productTypeName"
						label="服务商品类别"
						width='200px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="goodsName"
						label="服务商品"
						width='200px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="provinceName"
						label="服务所在地"
						width='200px'
						show-overflow-tooltip>
						<template slot-scope='scope'>
							<span>{{(scope.row.provinceName || '') + ' ' + (scope.row.cityName || '') + ' ' + (scope.row.areaName || '')}}</span>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="contractSubject"
						label="服务主体单位"
						width='200px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="managerName"
						label="服务管家"
						width='120px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="managerTypeName"
						label="管家类型"
						width='120px'
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="assignDate"
						label="工单派单时间"
						width='180px'
						show-overflow-tooltip>
						<template slot-scope='scope'>
							<span>{{scope.row.assignDate && $moment(scope.row.assignDate).format('YYYY.MM.DD HH:mm:ss') || '--'}}</span>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						sortable="custom"
						prop="orderStateName"
						label="服务工单状态"
						width='120px'
						show-overflow-tooltip>
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
		name: 'detail',
		data () {
			return {
				loading: false,
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
				sortObj: {},          // 排序
				tableData: [],
				tableDataTotal: 0,
				goodsTypeList: [],    //所有分类
				goodsList: [],        //所有商品
				serviceManagerList: [], //所有服务管家
				finishStatus: {         //完成状态
					2: '已拒单',
					3: '已退单',
					4: '服务开始前退单',
					5: '服务中退单',
				},
				statusList: [
					{
						id: 1,
						name: '全部状态'
					},{
						id: 2,
						name: '已拒单'
					},{
						id: 3,
						name: '已退单'
					},{
						id: 4,
						name: '服务开始前退单'
					},{
						id: 5,
						name: '服务中退单'
					},
				],                    //所有状态
					
				time: '',
				goodsId: '',          //选中的商品id
				goodsTypeId: '',      //选中的商品分类id
				managerId: '',        //服务管家id
				type: '',             //任务状态
			  
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
		created () {
			
			let _data = this.$route.query;
			this.time = _data.dateStart && [new Date(_data.dateStart), new Date(_data.dateEnd)] || [];
			this.defaultListParams.dateStart = _data.dateStart || '';
			this.defaultListParams.dateEnd = _data.dateEnd || '';
			this.goodsId = _data.goodsId == '' ? '' : ~~_data.goodsId;
			this.goodsTypeId = _data.goodsTypeId == '' ? "" : ~~_data.goodsTypeId;
			this.managerId = _data.managerId == '' ? "" : ~~_data.managerId;
			this.type = _data.type == '' ? "" : ~~_data.type;
			if(this.goodsTypeId == 0 && this.goodsTypeId != "") {
				this.selectGoodsType();
			}
			
			this.searchHandle()
			this.posTableHeight();            //根据屏幕高度设置table高度
			this.getGoodsTypeList();
			this.getServiceManagerList();
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
						
				// 进入页面后如果有默认分类则读取该分类下的所有商品
				if(this.$route.query.goodsTypeId >= 0 && this.$route.query.goodsTypeId != '' && this.$route.query.goodsTypeId != null) {
					let params = {
						goodsType: this.$route.query.goodsTypeId,
					};
					if(this.goodsTypeId === '0' || this.goodsTypeId == '' || this.goodsTypeId == 0) delete params.goodsType;
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
					
				}
			},
			// 选择商品分类
			selectGoodsType (item) {
				this.this.goodsList = [];
				let params = {
					goodsType: this.goodsTypeId,
				};
				if(this.goodsTypeId === '0' || this.goodsTypeId == '' || this.goodsTypeId == 0) delete params.goodsType;
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
			// 获取所有服务管家
			getServiceManagerList () {
				API.serviceManager.assginOrderManagerList({pageSize: 10000}, (data) => {
					console.log('service: ',data)
					if(data.status) {
						if(data.data.content == null) data.data.content = [];
						data.data.content.unshift({id: 0, name: '全部服务管家'});
						this.serviceManagerList = data.data.content;
					}
				})
			},
			posTableHeight () {
				let h = document.body.clientHeight,
					new_h = h - 260;
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
			getQueryParams () { // 请求参数配置
				this.defaultListParams = {
					page: this.currentPage - 1,
					pageSize: this.pagesOptions.pageSize,
					dateStart: this.defaultListParams.dateStart,
					dateEnd: this.defaultListParams.dateEnd,
					goodsId: this.goodsId,
					goodsTypeId: this.goodsTypeId,
					managerId: this.managerId,
					type: this.type,
				}
				if(this.defaultListParams.goodsId == 0) delete this.defaultListParams.goodsId;
				if(this.defaultListParams.goodsTypeId == 0) delete this.defaultListParams.goodsTypeId;
				if(this.defaultListParams.managerId == 0) delete this.defaultListParams.managerId;
				if(this.defaultListParams.type == 0) delete this.defaultListParams.type;
			},
			searchHandle () {
				this.getList()
			},
			getList () {
				this.loading = true;
				this.getQueryParams()
				API.statistical.serviceWorkStateDetail(Object.assign({}, this.defaultListParams, this.sortObj),
				  (da) => {
					  this.loading = false;
					this.tableData = da.data.content
					this.tableDataTotal = da.data.totalElements
				})
				
			},
			
		},
		components: {
			comButton,
		},
	  
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
	.ml10 {
		margin-left: 10px;
	}
</style>
