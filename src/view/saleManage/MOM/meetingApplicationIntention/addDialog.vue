<template>
	<div class="com-dialog-container" v-loading="dataLoading">
		<div class="com-dialog">
			<el-form class='el-form' :model="addForm" ref="addForm" label-width="100px">
				<el-form-item label='合作方名称'>
					<el-input placeholder='请输入合作方名称' v-model='addForm.channelName'></el-input>
				</el-form-item>
				<el-form-item label='合作方性质'>
					<el-input placeholder='请输入合作方性质' v-model='addForm.organizationNature'></el-input>
				</el-form-item>
				<el-form-item label='联系人'>
					<el-input placeholder='请输入联系人' v-model='addForm.contacter'></el-input>
				</el-form-item>
				<el-form-item label='联系方式'>
					<el-input type='number' placeholder='联系方式' v-model.number='addForm.contactPhone'></el-input>
				</el-form-item>
				<el-form-item label='合作方来源'>
					<el-select v-model="addForm.cooperationSource" clearable placeholder="请选择合作方来源">
						<el-option
							v-for="item in sourceList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
				<el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import API from '../../../../utils/api'
	
	
	export default {
		name: 'addDialog',
		data () {
			return {
				dataLoading: false,
				sourceList: [
					{
						id: 1,
						name: '外部合作方',
					}, {
						id: 2,
						name: '内部合作方'
					}
				],
				addForm: {
					channelName: '',            //合作方名称
					organizationNature: '',     //机构性质
					contacter: '',              //联系人
					contactPhone: '',           //联系方式
					cooperationSource: '',      //合作方来源
				},
			}
		},
		props: ['params'],
		mounted () {
			
		},
		created () {
			if(this.params.detail) {
				this.addForm = this.params.detail;
			}
		},
		methods: {
			saveSubmitForm () {
				let message = !this.addForm.channelName && '请输入合作方名称' ||
				              !this.addForm.organizationNature && '请输入合作方性质' ||
							  !this.addForm.contacter && '请输入联系人' ||
							  !this.addForm.contactPhone && '请输入联系方式' ||
							  !this.addForm.cooperationSource && '请选择合作方来源' || null;
				if(message) {
					this.$message({
						type: 'error',
						message,
						duration: 1000
					})
					return;
				}
				this.dataLoading = true
				if(!this.addForm.detail) {
					API.activity.addCooperationChannelList(this.addForm, (data) => {
						if(data.status) {
							this.$message({
								type: 'success',
								message: '新增渠道成功',
								duration: 1000
							});
							setTimeout(() => {
								this.dataLoading = false
								this.$vDialog.close({type: 'save'})
							}, 500)
						}
					})
				}else { //editCooperationChannelList
					API.activity.editCooperationChannelList(this.addForm, (data) => {
						if(data.status) {
							this.$message({
								type: 'success',
								message: '修改渠道成功',
								duration: 1000
							});
							setTimeout(() => {
								this.dataLoading = false
								this.$vDialog.close({type: 'save'})
							}, 500)
						}
					})
				}
			}
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../../styles/common";
</style>
