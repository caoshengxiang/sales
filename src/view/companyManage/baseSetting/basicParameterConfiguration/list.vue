<template>
  <div class="com-container" v-loading="loading">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>参数配置管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
		<!-- 分类 -->
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label='地区配置' name='region'></el-tab-pane>
			<el-tab-pane label='行业配置' name='industry'></el-tab-pane>
			<el-tab-pane label='职位配置' name='place'></el-tab-pane>
		</el-tabs>
		<div class="com-bar-left">
			<el-button type="success" plain  @click="add(null)">新增顶级</el-button>
			<el-button type="success" plain  @click='deleteInfo([], 1)'>删除</el-button>
			<el-button type="success" plain v-if='activeName === "region" || activeName === "industry"'  @click='transfer'>转移</el-button>
		</div>
    </div>
	<!-- 地区配置 -->
	<div class="com-box com-box-padding com-list-box"  v-if='activeName === "region"'>
		<table :style='list.length > 0 ? "width: 100%; min-width: 984px; border-bottom-color: #fff;" : "width: 100%; min-width: 984px; border-bottom-color: #DDDDDD;"' border="1" bordercolor="#DDDDDD">
			<tr style='height: 45px; text-align: center; border-top: 1px solid #DDDDDD; color: #606266;'>
				<td>名称</td>
				<td style='width: 83px;border-left: 1px solid #DDDDDD;'>地区代码</td>
				<td style='width: 84px;border-left: 1px solid #DDDDDD;'>排序</td>
				<td style='width: 64px;border-left: 1px solid #DDDDDD;'>状态</td>
				<td style='width: 163px;border-left: 1px solid #DDDDDD; border-right: 1px solid #DDDDDD;'>操作</td>
			</tr>
		</table>
		<el-tree
			:data="list"
			lazy
			accordion
			:props="defaultProps"
			show-checkbox
			:check-strictly="true"
			node-key="id"
			style='border-bottom: 1px solid #DDDDDD;'
			ref="areaTree"
			@node-click="handleNodeClick"
			:load="loadNode"
			:highlight-current="true"
			:expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
			  <span>{{data.name}}</span>
				<span class='right-span'>
					<span class='right-span-span w80'>{{data.code || '--'}}</span>
					<span class='right-span-span w80'>
						<el-input class='w60' v-model="data.sort" @blur="setHander(data, 1)"></el-input>
					</span>
					<span class='right-span-span w60'>
						<el-switch v-model="data.status" @change="setHander(data, 2)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					</span>
					<span class='right-span-span'>
						<el-button type="text" style='color: #1E88E5;padding-left: 5px;padding-top:2px; padding-bottom: 2px;padding-right: 10px; border-right: 1px solid #aaa;' size="mini" @click="add(node)">添加子级</el-button>
						<el-button type="text" style='color: #1E88E5;padding-top:2px; padding-bottom: 2px;padding-right: 10px; border-right: 1px solid #aaa;' size="mini" @click="update(node)">编辑</el-button>
						<el-button type="text" style='color: #FF6869;padding-top:2px; padding-bottom: 2px;' size="mini" @click="deleteInfo([data.id])">删除</el-button>
					</span>
				</span>
			</span>
		</el-tree>
	</div>
	
	<!-- 行业配置 -->
	<div class="com-box com-box-padding com-list-box"  v-if='activeName === "industry"'>
		<table :style='list.length > 0 ? "width: 100%; min-width: 984px; border-bottom-color: #fff;" : "width: 100%; min-width: 984px; border-bottom-color: #DDDDDD;"' border="1" bordercolor="#DDDDDD">
			<tr style='height: 45px; text-align: center; border-top: 1px solid #DDDDDD; color: #606266;'>
				<td>名称</td>
				<td style='width: 84px;border-left: 1px solid #DDDDDD;'>排序</td>
				<td style='width: 64px;border-left: 1px solid #DDDDDD;'>状态</td>
				<td style='width: 163px;border-left: 1px solid #DDDDDD; border-right: 1px solid #DDDDDD;'>操作</td>
			</tr>
		</table>
		<el-tree
			:data="list"
			lazy
			accordion
			:props="defaultProps"
			show-checkbox
			:check-strictly="true"
			node-key="id"
			style='border-bottom: 1px solid #DDDDDD;'
			ref="areaTree2"
			@node-click="handleNodeClick"
			:load="loadNode"
			:highlight-current="true"
			:expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
			  <span>{{data.name}}</span>
				<span class='right-span'>
					<span class='right-span-span w80'>
						<el-input class='w60' v-model="data.sort" @blur="setHander(data, 1)"></el-input>
					</span>
					<span class='right-span-span w60'>
						<el-switch v-model="data.status" @change="setHander(data, 2)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					</span>
					<span class='right-span-span'>
						<el-button type="text" style='color: #1E88E5;padding-left: 5px;padding-top:2px; padding-bottom: 2px;padding-right: 10px; border-right: 1px solid #aaa;' size="mini" @click="add(node)">添加子级</el-button>
						<el-button type="text" style='color: #1E88E5;padding-top:2px; padding-bottom: 2px;padding-right: 10px; border-right: 1px solid #aaa;' size="mini" @click="update(node)">编辑</el-button>
						<el-button type="text" style='color: #FF6869;padding-top:2px; padding-bottom: 2px;' size="mini" @click="deleteInfo([data.id])">删除</el-button>
					</span>
				</span>
			</span>
		</el-tree>
	</div>
	
	<!-- 职位配置 -->
	<div class="com-box com-box-padding com-list-box"  v-if='activeName === "place"'>
		<table :style='list.length > 0 ? "width: 100%; min-width: 984px; border-bottom-color: #fff;" : "width: 100%; min-width: 984px; border-bottom-color: #DDDDDD;"' border="1" bordercolor="#DDDDDD">
			<tr style='height: 45px; text-align: center; border-top: 1px solid #DDDDDD; color: #606266;'>
				<td>名称</td>
				<td style='width: 84px;border-left: 1px solid #DDDDDD;'>排序</td>
				<td style='width: 64px;border-left: 1px solid #DDDDDD;'>状态</td>
				<td style='width: 89px;border-left: 1px solid #DDDDDD; border-right: 1px solid #DDDDDD;'>操作</td>
			</tr>
		</table>
		<el-tree
			:data="list"
			lazy
			accordion
			:props="defaultProps"
			show-checkbox
			:check-strictly="true"
			node-key="id"
			ref="areaTree3"
			style='border-bottom: 1px solid #DDDDDD;'
			@node-click="handleNodeClick"
			:load="loadNode"
			:highlight-current="true"
			:expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
			  <span>{{data.name}}</span>
				<span class='right-span'>
					<span class='right-span-span w80'>
						<el-input class='w60' v-model="data.sort" @blur="setHander(data, 1)"></el-input>
					</span>
					<span class='right-span-span w60'>
						<el-switch v-model="data.status" @change="setHander(data, 2)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					</span>
					<span class='right-span-span'>
						<!-- <el-button type="text" icon="el-icon-plus" size="mini" @click="add(node)">添加子级</el-button> -->
						<el-button type="text" style='color: #1E88E5;padding-left: 5px;padding-top:2px; padding-bottom: 2px;padding-right: 10px; border-right: 1px solid #aaa;' size="mini" @click="update(node)">编辑</el-button>
						<el-button type="text" style='color: #FF6869;padding-top:2px; padding-bottom: 2px;' size="mini" @click="deleteInfo([data.id])">删除</el-button>
					</span>
				</span>
			</span>
		</el-tree>
	</div>
		<!-- 转移弹框 -->
		<el-dialog 
			title='转移'
			:visible.sync="dialogVisible"
			width='430px'
			:append-to-body='true'>
			<div>
				<el-form label-width="60px">
					<el-form-item label="转移至" v-if='activeName === "region"'>
						<AreaSelect ref="areaSe"
												@change="areaSelectedOptionsHandleChange"
												:selectLastLevelMode="false"
												area='请选择要转移到的位置'></AreaSelect>
						
					</el-form-item>
					<el-form-item label="转移至" v-if='activeName === "industry"'>
						<IndustrySelect ref="areaSe"
												@change="areaSelectedOptionsHandleChange"
												:selectLastLevelMode="false"
												area='请选择要转移到的位置'></IndustrySelect>
						
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="transfering">确 定</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { Message } from 'element-ui'
  import add from './add'

  export default {
    name: 'basicParameterConfiguration',
    data () {
      return {
        loading: false,
				dialogVisible: false,
				activeName: 'region',
        list: [],
				transferId: '',
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        currentTreeNode: null,
      }
    },
    components: {
			comButton,
    },
    created () {
			var that = this
			that.$options.methods.init.bind(that)()
    },
		mounted () {
			setTimeout(()=> {
				$('.el-tree-node__content').css({'borderTop': '1px solid #DDDDDD', 'borderLeft': '1px solid #DDDDDD', 'borderRight': '1px solid #DDDDDD', 'height': '45px'})
			},1000)
			$('.el-tabs__header').css({'marginBottom': 0, 'border': 0})
		},
    methods: {
			handleClick () {
				this.init();
			},
			// 获取城市配置
			getRegion () {
				let that = this;
				this.loading = true;
        API.customerAreaSetting.queryList({pid: 0}, (res) => {
          that.loading = false
          if (res.status) {
            that.list = res.data
						setTimeout(()=> {
							$('.el-tree-node__content').css({'borderTop': '1px solid #DDDDDD', 'borderLeft': '1px solid #DDDDDD', 'borderRight': '1px solid #DDDDDD', 'height': '45px'})
						}, 500)
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
			},
			// 获取行业配置
			getIndustry () {
				let that = this;
				this.loading = true;
        API.customerAreaSetting.industryList({parentId: 0}, (res) => {
          that.loading = false
          if (res.status) {
            that.list = res.data
						console.log(that.list)
						setTimeout(()=> {
							$('.el-tree-node__content').css({'borderTop': '1px solid #DDDDDD', 'borderLeft': '1px solid #DDDDDD', 'borderRight': '1px solid #DDDDDD', 'height': '45px'})
						}, 500)
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
				
			},
			// 获取职位配置
			getPlace () {
				let that = this;
				this.loading = true;
        API.customerAreaSetting.placeList({}, (res) => {
          that.loading = false
          if (res.status) {
            that.list = res.data
						console.log(that.list)
						setTimeout(()=> {
							$('.el-tree-node__content').css({'borderTop': '1px solid #DDDDDD', 'borderLeft': '1px solid #DDDDDD', 'borderRight': '1px solid #DDDDDD', 'height': '45px'})
						}, 500)
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
				
			},
      init () {
        var that = this;
				let _name = this.activeName;
				// that.list = []
				switch (_name) {
					case 'industry':
						this.getIndustry();
						break;
					case 'place':
						this.getPlace();
						break;
					default:
						this.getRegion();
						break;
				} 
      },
      add (node) {
        var that = this
        if (node) {
          node = node.data
        }
				let title = that.activeName === 'industry' && '新增行业' ||
				            that.activeName === 'place' && '新增职位' || '新增地区';
        that.$vDialog.modal(add, {
          title: title,
          width: 550,
          height: 350,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
            currentNode: node,
						className: that.activeName,
          },
          callback: function (data) {
						if(data.type === 'save') {
							that.$options.methods.init.bind(that)()
						}
          },
          // cancelCallback: function () {
          //   that.$options.methods.init.bind(that)()
          // },
        })
      },
      update (node) {
        var that = this
				let title = that.activeName === 'industry' && '修改行业' ||
				            that.activeName === 'place' && '修改职位' || '修改地区';
        that.$vDialog.modal(add, {
          title: title,
          width: 550,
          height: 350,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'update',
            currentNode: node.data,
						className: that.activeName,
          },
          callback: function (data) {
						if(data.type === 'save') {
							that.$options.methods.init.bind(that)()
						}
          },
          // cancelCallback: function () {
          //   that.$options.methods.init.bind(that)()
          // },
        })
      },
      deleteInfo (ids, type) {
        var that = this
				let _arrIdsName = that.activeName === 'industry' && 'areaTree2' ||
				                  that.activeName === 'place' && 'areaTree3' || 'areaTree',
				_arrIds = that.$refs[_arrIdsName].getCheckedKeys(),
				_name = that.activeName;
				if(type == 1 && _arrIds.length < 1) {
					that.$message({
						type: 'error',
						message: '请选择要删除的项',
						duration: 1500
					})
					return;
				}
        that.$confirm('是否确认删除当前层级及其下所有子级?', '提示', {
          type: 'warning',
        }).then(() => {
          that.loading = true
					switch (_name) {
						case 'industry':
							API.customerAreaSetting.industryDelete({ids: (_arrIds.length > 0 && type == 1) ? _arrIds.join(',') : ids.join(',')}, function (res) {
								that.loading = false
								if (res.status) {
									Message({
										message: '删除成功！',
										type: 'success',
									})
									that.$options.methods.init.bind(that)()
								} else {
									Message({
										message: res.error.message,
										type: 'error',
									})
								}
							}, function () {
								that.loading = false
								Message({
									message: '系统繁忙，请稍后再试！',
									type: 'error',
								})
							})
							break;
						case 'place':
							API.customerAreaSetting.placeDelete({ids: (_arrIds.length > 0 && type == 1) ? _arrIds.join(',') : ids.join(',')}, function (res) {
								that.loading = false
								if (res.status) {
									Message({
										message: '删除成功！',
										type: 'success',
									})
									that.$options.methods.init.bind(that)()
								} else {
									Message({
										message: res.error.message,
										type: 'error',
									})
								}
							}, function () {
								that.loading = false
								Message({
									message: '系统繁忙，请稍后再试！',
									type: 'error',
								})
							})
							break;
						default:
							API.customerAreaSetting.delete({ids: (_arrIds.length > 0 && type == 1) ? _arrIds.join(',') : ids.join(',')}, function (res) {
								that.loading = false
								if (res.status) {
									Message({
										message: '删除成功！',
										type: 'success',
									})
									that.$options.methods.init.bind(that)()
								} else {
									Message({
										message: res.error.message,
										type: 'error',
									})
								}
							}, function () {
								that.loading = false
								Message({
									message: '系统繁忙，请稍后再试！',
									type: 'error',
								})
							})
							break;
					}
        }).catch(() => {})
      },
			// 设置排序-设置状态
			setHander (item, num) {
				let _name = this.activeName, that = this;
				that.loading = true;
				switch (_name) {
					case 'industry':
						API.customerAreaSetting.industryUpdate(item, function (resData) {
							that.loading = false
							if (resData.status) {
								Message({
									message: '修改成功！',
									type: 'success',
								})
								that.init();
							}
						}, function () {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
					case 'place':
						API.customerAreaSetting.placeUpdate(item, function (resData) {
							that.loading = false
							if (resData.status) {
								Message({
									message: '修改成功！',
									type: 'success',
								})
								that.init();
							}
						}, function () {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
					default:
						API.customerAreaSetting.update(item, function (resData) {
							that.loading = false
							if (resData.status) {
								Message({
									message: '修改成功！',
									type: 'success',
								})
								that.init();
							}
						}, function () {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
				} 
			},
      handleNodeClick () {
        var that = this;
				let _name = that.activeName === 'industry' && 'areaTree2' ||
				            that.activeName === 'place' && 'areaTree3' || 'areaTree';
        that.currentTreeNode = that.$refs[_name].getCurrentNode()
      },
      loadNode (node, resolve) {
        var that = this
        if (node.data.length <= 0) {
          return
        }
        this.loading = true
				let _name = this.activeName;
				switch (_name) {
					case 'industry':
						API.customerAreaSetting.industryList({parentId: node.data.id}, (res) => {
							that.loading = false
							if (res.status) {
								resolve(res.data)
								setTimeout(()=> {
									$('.el-tree-node__content').css({'borderTop': '1px solid #DDDDDD', 'borderLeft': '1px solid #DDDDDD', 'borderRight': '1px solid #DDDDDD', 'height': '45px'})
								},500)
							} else {
								Message({
									message: res.error.message,
									type: 'error',
								})
							}
						}, (mock) => {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
					case 'place':
						this.loading = false;
						resolve([])
						break;
					default:
						API.customerAreaSetting.queryList({pid: node.data.id}, (res) => {
							that.loading = false
							if (res.status) {
								resolve(res.data)
								setTimeout(()=> {
									$('.el-tree-node__content').css({'borderTop': '1px solid #DDDDDD', 'borderLeft': '1px solid #DDDDDD', 'borderRight': '1px solid #DDDDDD', 'height': '45px'})
								},500)
							} else {
								Message({
									message: res.error.message,
									type: 'error',
								})
							}
						}, (mock) => {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
				}
      },
			transfer () {
        var that = this
				let _arrIdsName = that.activeName === 'industry' && 'areaTree2' || 'areaTree',
				_arrIds = that.$refs[_arrIdsName].getCheckedKeys();
				if(_arrIds.length < 1) {
					that.$message({
						type: 'error',
						message: '请选择转移对象',
						duration: 1500
					})
					return;
				}
				if(_arrIds.length > 1) {
					that.$message({
						type: 'error',
						message: '一次只能转移一个对象',
						duration: 1500
					})
					return;
				}
				this.transferId = '';
				this.dialogVisible = true;
			},
			// 确定转移
			transfering () {
        var that = this
				if(!this.transferId) {
					return that.$message({
						type: 'error',
						message: '请选择要转移到的位置',
						duration: 1500
					})
				}
				let _arrIdsName = that.activeName === 'industry' && 'areaTree2' || 'areaTree',
				_arrIds = that.$refs[_arrIdsName].getCheckedKeys(),
				ids = _arrIds[0];
				switch (that.activeName) {
					case 'industry':
						// console.log('行业: [要转移的id: ' + ids + '; 转移到： ' + this.transferId + ']');
						API.customerAreaSetting.industryTransfer({id: ids, parentId: this.transferId}, (res) => {
							that.loading = false
							if (res.status) {
								that.$message({
									type: 'success',
									message: '转移成功',
									duration: 1500
								})
								that.dialogVisible = false;
								that.init();
							}
						}, (mock) => {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
					default:
						// console.log('地区: [要转移的id: ' + ids + '; 转移到： ' + this.transferId + ']');
						API.customerAreaSetting.regionTransfer({id: ids, pid: this.transferId}, (res) => {
							that.loading = false
							if (res.status) {
								that.$message({
									type: 'success',
									message: '转移成功',
									duration: 1500
								})
								that.dialogVisible = false;
								that.init();
							}
						}, (mock) => {
							that.loading = false
							Message({
								message: '系统繁忙，请稍后再试！',
								type: 'error',
							})
						})
						break;
				}
			},
      areaSelectedOptionsHandleChange (value) {
				this.transferId = value[value.length - 1]
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";

  .role-head-con {
    background-color: #E9F3F5;
    padding: 0 15px;
    line-height: 42px;
    color: #426585;
    font-size: 12px;
  }

  .role-view-con {
    padding: 0 15px;
  }

  .el-menu-item {
    $select_bg: #F4F6F8;
    &:hover {
      background-color: #fbfbfb;
    }
    &:focus {
      background-color: $select_bg;
    }
    &.is-active {
      font-weight: 600;
      color: #426585;
      background-color: $select_bg;
    }
  }
	
	.right-span {
    height: 100%;
    line-height: 46px;
	}
	.right-span-span {
		display:inline-block;
    height: 100%;
    line-height: 46px;
		border-left: 1px solid #DDDDDD;
	}
	.w80 {
		width: 80px;
		text-align: center;
		font-size: 14px;
	}
	.w60 {
		width: 60px;
		text-align: center;
	}
  .custom-tree-node {
		display: inline-block;
		height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
	.com-bar {
		position: relative;
	}
	.com-bar-left {
		position: absolute;
		top: 7px;
		right: 20px;
	}
	.el-tabs__header {
		margin-bottom: 0 !important;
	}
	
	.el-tabs__item.is-active {
		color: #67c23a !important;
	}
</style>