<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">
          {{index == ($route.meta.pos.length - 1) ? (queryParams.overState == 2 || queryParams.overState == 3) && '超时明细表' || queryParams.overState == 1 && '准时明细表' || item.name : item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <span>统计时间: </span>
        <el-date-picker
          v-model="queryParams.dateQuery"
          type="month"
          value-format="yyyy-MM"
          :unlink-panels="true"
          placeholder="请选择月份">
        </el-date-picker>
        <com-button buttonType="search" @click="searchHandle">查询</com-button>
      </div>
      <div class="com-bar-right">
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出统计数据</com-button>
      </div>
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
            prop="finishTime"
            label="派单日期"
            width='180px'
            show-overflow-tooltip>
            <template slot-scope='scope'>
              <span>{{scope.row.assignDate && $moment(scope.row.assignDate).format('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
					<el-table-column
						align="center"
						prop="orderNum"
						label="工单号"
						show-overflow-tooltip
						width='200px'>
					</el-table-column>
          <el-table-column
            align="center"
            label="服务客户"
            width='180px'
            prop="customerName"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="产品类别"
            prop="goodsTypeName"
            width='180px'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="产品名称"
            prop="goodsName"
            width='180px'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="管家类型"
            prop="codeName"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="管家姓名"
            width='180px'
            prop="serverManagerName"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="服务流程环节"
            prop="typeName"
            width='180px'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if="queryParams.overState == 2 || queryParams.overState == 3"
            align="center"
            label="超时的服务流程"
            show-overflow-tooltip
            prop="typeName"
            width="120">
          </el-table-column>
          <el-table-column
            v-if="queryParams.overState == 2 || queryParams.overState == 3"
            align="center"
            label="超时的事项"
            show-overflow-tooltip
            prop="numName"
            width="120">
          </el-table-column>
          <el-table-column
            v-if="queryParams.overState == 2 || queryParams.overState == 3"
            align="center"
            label="超时类型"
            show-overflow-tooltip
            prop="overName"
            width="120">
          </el-table-column>
				</el-table>
			</div>
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
				},
        queryParams: {
          dateQuery: '',
          codeId: '',
          type: '',
          cityId: '',
          overState: '',
        },
				sortObj: {},          // 排序
				tableData: [],
				tableDataTotal: 0,
				goodsTypeList: [],    //所有分类
				goodsList: [],        //所有商品
				serviceManagerList: [], //所有服务管家
				finishStatus: {         //完成状态
					2: '进行中',
					3: '正常完成',
					4: '超期完成',
					5: '超期未完成',
					6: '超时未接单',
				},
				statusList: [
					{
						id: 1,
						name: '全部状态'
					},{
						id: 2,
						name: '进行中'
					},{
						id: 3,
						name: '正常完成'
					},{
						id: 4,
						name: '超期完成'
					},{
						id: 5,
						name: '超期未完成'
					},{
						id: 6,
						name: '超时未接单'
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
      this.queryParams = {
        dateQuery: _data.dateQuery,
        cityId: ~~_data.cityId,
        codeId: ~~_data.codeId,
        overState: ~~_data.overState,
        type: ~~_data.type,
        goodsId: ~~_data.goodsId,
      };
			console.log(this.queryParams)
			this.posTableHeight();            //根据屏幕高度设置table高度
      this.getList();
			// this.getGoodsTypeList();
			// this.getServiceManagerList();
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
			posTableHeight () {
				let h = document.body.clientHeight,
					new_h = h - 260;
				this.posheight = new_h;
			},
			lastMonthDate () {
				return lastMonthDate()
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
      excelExport () { // 导出
        // this.getQueryParams()
        let as = {}
        for (let key in this.advancedSearch) { // 去除null
          if (this.advancedSearch[key]) {
            as[key] = this.advancedSearch[key]
          }
        }
        let dlp = {}
        for (let key in this.queryParams) { // 去除分页
          if (key !== 'page' && key !== 'pageSize') {
            dlp[key] = this.queryParams[key]
          }
        }
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, dlp, this.sortObj, as, this.queryParams,
          {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        let test = '服务事项统计';
        link.setAttribute('href', serverUrl + '/countSystem/serviceRecordDetailExport?' + query)
        link.setAttribute('download', test)
        link.setAttribute('target', '_blank')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
			getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
			},
			searchHandle () {
				this.getList()
			},
			getList () {
				this.loading = true;
				this.getQueryParams()
				API.zhuxinStatistical.getStatisticsOfServicesDetail(Object.assign({}, this.queryParams, this.defaultListParams, this.sortObj),
				  (da) => {
					  this.loading = false;
            this.tableData = da.data.content;
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
  @import "../../../../styles/commons";
	.ml10 {
		margin-left: 10px;
	}
  .com-bar {
    overflow: hidden;
    padding: 10px 0;
  }
  .com-container .com-bar .com-bar-right {
    margin-top: 0;
  }
</style>
<style scoped>
  .com-bar >>> .el-table {
    margin-top: 20px;
  }
</style>
