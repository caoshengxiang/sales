<template>
	<div class="com-dialog-container">
		<div class="com-dialog">
			<el-form :model="form" ref="form" label-width="0px">
				<table class="com-dialog-table">
					<tr>
						<td class="td-title">招商经理</td>
						<td class="td-text">
							<el-form-item prop="organizationId">
								<el-select v-model.number="form.managerId" @change="selectedOptionsHandleChange" placeholder="请选择招商经理">
									<el-option
										v-for="item in allLeasingManager"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</td>
					</tr>
				</table>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancel-button" @click="initData">取 消</el-button>
				<el-button class="save-button" @click="saveSubmitForm('form')">确 定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	
	import API from '../../../utils/api'
	
	export default {
		name: 'personnelSetup',
		data () {
			return {
				form: {
					ids: '',        //选择的人员id
					managerId: '',  //选择的招商经理id
				},
				allLeasingManager: [],     //所有招商经理
			}
		},
		props: ['params'],
		created () {
			this.form.ids = this.params.id
			
			this.getWatersList();
		},
		mounted () {
		},
		methods: {
			// 获取招商经理
			getWatersList () {
				API.user.userWatersZx({}, (res) => {
					console.log(res)
					if(res.status) {
						this.allLeasingManager = res.data;
					}
				})
			},
			// 选择招商经理
			selectedOptionsHandleChange () {
				
			},
			// 取消
			initData () {
				this.$vDialog.close()
			},
			// 确定
			saveSubmitForm () {
				// user.setUserListWatersPer
				// this.form.ids = JSON.stringify(this.form.ids);
				if(!this.form.managerId) {
					this.$message('请选择招商经理')
					return;
				};
				API.user.setUserListWatersPer(this.form, (data) => {
					console.log(data)
					if(data.status) {
						this.$message({type: 'success', message: '分配成功'});
						this.$vDialog.close();
					}else {
						this.$message(data.message);
					}
				})
			},
		},
		commonents: {
			
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/common";

	.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
		margin: 0;
	}
</style>
