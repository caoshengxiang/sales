<template>
	<div class="com-dialog-container" v-loading="dataLoading">
		<div class="com-dialog">
			<el-form :model='addForm' label-width='100px'>
				<el-form-item label='客户意向商品'>{{params.intentionLeve.intentProductName}}</el-form-item>
				<el-form-item label='客户意向程度'>
					<el-select v-model='addForm.customerIntentionLevel' @change="selectCustomerIntentionLevel" placeholder="请选择客户意向程度">
						<el-option label='高' :value='3'>高</el-option>
						<el-option label='中' :value='2'>中</el-option>
						<el-option label='低' :value='1'>低</el-option>
						<el-option label='无' :value='0'>无</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='证据文件' style='margin-bottom: 15px;' v-if='addForm.customerIntentionLevel == 0'>
					<el-upload
						class="upload-demo"
						:action="uploadUrl"
						:on-remove="onRemoveHandle"
						:headers="{authKey: userInfo.authKey}"
						:on-success="onSuccessHandle"
						:before-upload="deforeUpload"
						:file-list='fileList'
						accept=".zip,.rar"
						multiple
						:limit="1">
						<el-button size="small" type="primary">上传证据文件</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label='描述信息' v-if='addForm.customerIntentionLevel == 0'>
					<el-input type='textarea' :rows='6' v-model='addForm.chatRecord' resize="none"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
				<el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
	import API from '../../../../utils/api'
	import webStorage from 'webStorage'
	import { uploadUrl } from '../../../../utils/const'
	
	export default {
		name: 'intentionLevelDialog',
		data () {
			return {
				dataLoading: false,
				userInfo: webStorage.getItem('userInfo'),     //用户信息
				fileList: [],                                 //文件上传列表
				addForm: {
					customerIntentionLevel: '',               //意向程度
					chatRecord: '',                           //描述信息
					recorderFileName: '',                     //证据文件名称
					recorderFileUrl: '',                      //证据文件路径
				},
			}
		},
		props: ['params'],
		computed: {
			uploadUrl () {
				return uploadUrl
			}
		},
		created () {
			let _detail = this.params.intentionLeve;
			this.addForm.customerIntentionLevel = _detail.customerIntentionLevel;
			if(_detail.customerIntentionLevel == 0) {
				this.addForm.chatRecord = _detail.chatRecord;
				if(_detail.recorderFileUrl && _detail.recorderFileName) {
					this.addForm.recorderFileUrl = _detail.recorderFileUrl;
					this.addForm.recorderFileName = _detail.recorderFileName;
					this.fileList = [{name: _detail.recorderFileName, url: _detail.recorderFileUrl}];
				}
			}
		},
		methods: {
			// 确定
			saveSubmitForm () {
				let message = (!this.addForm.customerIntentionLevel && this.addForm.customerIntentionLevel != 0) && '请选择客户意向程度' ||
				              (this.addForm.customerIntentionLevel == 0 && !this.addForm.recorderFileUrl && !this.addForm.chatRecord) && '请上传证据文件或者输入描述信息' || null;
				if(message) {
					return this.$message({
						type: 'error',
						message,
						duration: 1500
					})
				};
				// return;
				this.addForm.id = this.params.intentionLeve.id;
				API.salesOpportunities.edit(this.addForm, (data) => {
					if(data.status) {
						this.$message({
							type: 'success',
							message: '设置意向程度成功',
							duration: 1000
						})
						this.$vDialog.close({type: 'save'})
					}
				})
			},
			// 选择意向
			selectCustomerIntentionLevel () {
				if(this.customerIntentionLevel != 0) {
					this.addForm.chatRecord = '';
					this.addForm.recorderFileName = '';
					this.addForm.recorderFileUrl = '';
					this.fileList = [];
				}
			},
			// 文件成功上传
			onSuccessHandle (response, file, fileList) {
				this.addForm.recorderFileUrl = response.data.url
				this.addForm.recorderFileName = response.data.name
			},
			// 删除已上传文件
			onRemoveHandle () {
				this.addForm.recorderFileName = '';
				this.addForm.recorderFileUrl = '';
			},
			// 上传之前的钩子
			deforeUpload (file) {
				let _file = file.name.split('.'),
				    _format = _file[_file.length - 1],
						_status = true;
				if(_format === 'rar' || _format === 'zip') {
					_status =  true
				}else {
					this.$message({
						type: 'error',
						message: '请上传.rar或者.zip的压缩文件',
						duration: 1500
					})
					_status = false;
				}
				return _status;
			},
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../../styles/common";
</style>
