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
		<div class="com-box com-box-padding com-list-box"><el-collapse accordion>
		  <el-collapse-item v-for="(item, i) in list" :key='i' style='position: relative;'>
			<template slot="title">
				<p>{{item.title}} <span style='color: #aaa; margin-left: 10px;'>{{'(' + (item.created && $moment(item.created).format('YYYY-MM-DD HH:mm')) + ')'}}</span></p>
				<div style='position: absolute;right: 25px; top: 0;'>
					<el-button style='background: #4bcf99; color: #fff;' v-if='item.readStatus == 0' @click='readFinsh(item)'>标记已读</el-button>
					<el-button style='background: #4bcf99; color: #fff;'>查看</el-button>
				</div>
			</template>
			<div class='grad-bg'>
				<p v-html="item.messageList"></p>
				<!-- {{item.content}} -->
			</div>
		  </el-collapse-item>
		</el-collapse>
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
</template>

<script>
	import { mapState } from 'vuex'
	import API from '../../../utils/api'
	
	export default {
		data () {
			return {
				dataLoading: false,
				currentPage: 1,
				tableDataTotal: 1,
				defaultListParams: {              // 默认顾客列表请求参数
				  page: null,
				  pageSize: null,
				},
				sortObj: {sort: 'created,desc'},  // 排序
				list: [],
			}
		},
		computed: {
		  ...mapState('constData', [
			'contactsTypeOptions',
			'contactsStatus',
			'pagesOptions',
			'themeIndex',
		  ]),
		},
		watch: {
			
		},
		created () {
			this.getList();
		},
		mounted () {
			
		},
		methods: {
			getList () {
				this.dataLoading = true;
				this.getQueryParams();
				API.message.personalMessage(Object.assign({type: 2}, this.defaultListParams, this.sortObj), (data) => {
					if(data.status) {
						this.dataLoading = false;
						if(data.data.content != null) {
							this.tableDataTotal = data.data.totalElements
							if(data.data.content.length > 0) {
								let _list = data.data.content;
								console.log(_list)
								if(_list.length > 0) {
									_list.forEach(a => {
										if(a.content) {
											a.messageList = a.content.replace(/\[&&]/g, '<br/>');
										}
										console.log(a)
									})
								};
								this.list = _list;
							}
						}
					}else {
						this.$message(data.error)
					}
				})
			},
			getQueryParams () { // 请求参数
				this.defaultListParams = {
					page: this.currentPage - 1,
					pageSize: this.pagesOptions.pageSize,
				}
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
			// 标记已读
			readFinsh (item) {
				let _id = item.id;
				API.message.msgRead({ids: _id}, (data) => {
					if(data.status && data.data == 1) {
						this.dialogVisible = false;
						this.$message({
							type: 'success',
							message: '标记已读成功',
							duration: 1500
						});
						this.getList();
					}else {
						this.dialogVisible = false;
					}
				})
			},
			
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/commons";
  .grad-bg {
	  background: #F0F3F6;
	  padding: 15px 10px;
	  font-size: 13px;
  }
</style>
