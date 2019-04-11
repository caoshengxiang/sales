<template>
	<div class="com-dialog-container" v-loading="dataLoading">
		<div class="com-dialog">
			<el-form class='el-form' :model="addForm" ref="addForm" label-width="110px">
				<el-form-item label='讲师性质'>
					<el-radio v-model="lectureType" label="1" :disabled='this.params.type'>平台兼职讲师</el-radio>
					<el-radio v-model="lectureType" label="2" :disabled='this.params.type'>专职</el-radio>
					<el-radio v-model="lectureType" label="3" :disabled='this.params.type'>外聘讲师</el-radio>
				</el-form-item>
				<el-form-item label='姓名'>
					<el-select v-model="lectureName" :disabled='this.params.type' clearable :placeholder="this.params.type ? '' : '请选择人员'" v-if='lectureType === "1"' @change='selectLecture'>
						<el-option
							v-for="item in conferenceLeaderList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
					<el-input :placeholder='this.params.type ? "" : "请输入讲师姓名"' :disabled='this.params.type' v-model='addForm.lectureName' v-else></el-input>
				</el-form-item>
				<el-form-item label='性别'>
					<el-radio v-model="sex" label="1" :disabled='this.params.type'>男</el-radio>
					<el-radio v-model="sex" label="2" :disabled='this.params.type'>女</el-radio>
				</el-form-item>
				<el-form-item label='身份证号'>
					<el-input :placeholder='this.params.type ? "" : "请输入身份证号"' :disabled='this.params.type' v-model='addForm.idCard'></el-input>
				</el-form-item>
				<el-form-item label='开户银行'>
					<el-input :placeholder='this.params.type ? "" : "请输入开户银行"' :disabled='this.params.type' v-model='addForm.bankDeposit'></el-input>
				</el-form-item>
				<el-form-item label='银行账号'>
					<el-input type='number' :placeholder='this.params.type ? "" : "请输入银行账号"' :disabled='this.params.type' v-model.number='addForm.bankAccount'></el-input>
				</el-form-item>
				<el-form-item label='联系方式'>
					<el-input type='number' :placeholder='this.params.type ? "" : "请输入联系方式"' :disabled='this.params.type' v-model.number='addForm.lecturePhone'></el-input>
				</el-form-item>
				<el-form-item label='联系地址'>
					<el-input :placeholder='this.params.type ? "" : "请输入联系地址"' :disabled='this.params.type' v-model='addForm.address'></el-input>
				</el-form-item>
				<el-form-item label='职称'>
					<el-input :placeholder='this.params.type ? "" : "请输入职称"' :disabled='this.params.type' v-model='addForm.title'></el-input>
				</el-form-item>
				<el-form-item label='单位(企业)名称'>
					<el-input :placeholder='this.params.type ? "" : "请输入单位名称"' :disabled='this.params.type' v-model='addForm.deptName'></el-input>
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
				conferenceLeaderList: [],       //所有平台员工
				lectureType: '1',
				lectureName: '',
				sex: '1',
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
					lectureType: '',            //讲师性质
					lectureName: '',            //讲师名称
					sex: '',                    //性别
					idCard: '',                 //身份证号
					bankDeposit: '',            //开户银行
					bankAccount: '',            //银行账号
					lecturePhone: '',           //联系方式
					address: '',                //联系地址
					title: '',                  //职称
					deptName: '',               //单位名称
				},
			}
		},
		watch: {
			lectureType () {
				if(!this.params.detail) {
					this.addForm = {};
				}else {
				}
			}
		},
		props: ['params'],
		mounted () {
			
		},
		created () {
			if(this.params.detail) {
				this.lectureType = this.params.detail.lectureType.toString();
				this.sex = this.params.detail.sex.toString();
				this.addForm = this.params.detail;
			}
			this.getAllStaff();
		},
		methods: {
			saveSubmitForm () {
				if(this.params.type) {
					this.$vDialog.close({type: 'save'})
					return;
				}
				if(this.lectureName) {
					if(this.conferenceLeaderList.length > 0) {
						this.conferenceLeaderList.forEach(a => {
							if(this.lectureName == a.id) {
								this.addForm.lectureName = a.name;
							}
						})
					};
				}
				this.addForm.sex = ~~this.sex;
				this.addForm.lectureType = ~~this.lectureType;
				let message = !this.addForm.lectureType && '请选择讲师性质' ||
							  (!this.addForm.lectureName && this.addForm.lectureType == 1) && '请选择人员' ||
							  (!this.lectureName && this.addForm.lectureType == 1) && '请选择人员' ||
							  (!this.addForm.lectureName && this.addForm.lectureType != 1) && '请输入人员姓名' ||
							  !this.addForm.sex && '请选择性别' ||
							  !this.addForm.idCard && '请输入身份证号' ||
							  !this.addForm.bankDeposit && '请输入开户银行' ||
							  !this.addForm.bankAccount && '请输入银行账号' ||
							  !this.addForm.lecturePhone && '请输入联系方式' ||
							  !this.addForm.address && '请输入联系地址' ||
							  !this.addForm.title && '请输入职称' ||
							  !this.addForm.deptName && '请输入单位名称' || null;
				if(message) {
					this.$message({
						type: 'error',
						message,
						duration: 1000
					})
					return;
				}
				this.dataLoading = true
				if(!this.params.detail) {
					API.activity.addconferenceLecturerList(this.addForm, (data) => {
						if(data.status) {
							this.$message({
								type: 'success',
								message: '新增会议讲师成功',
								duration: 1000
							});
							setTimeout(() => {
								this.dataLoading = false
								this.$vDialog.close({type: 'save'})
							}, 500)
						}
					})
				}else { //editCooperationChannelList
					API.activity.editconferenceLecturerList(this.addForm, (data) => {
						if(data.status) {
							this.$message({
								type: 'success',
								message: '修改讲师成功',
								duration: 1000
							});
							setTimeout(() => {
								this.dataLoading = false
								this.$vDialog.close({type: 'save'})
							}, 500)
						}
					})
				}
			},
			// 获取所有平台员工
			getAllStaff () {
				API.activity.staffZX('', (data) => {
					if(data.status) {
						this.conferenceLeaderList = data.data;
						if(this.params.detail && this.lectureType === '1') {
							this.conferenceLeaderList.forEach(a => {
								if(a.name === this.params.detail.lectureName) {
									this.lectureName = a.id;
								}
							})
						}
					}
				})
			},
			// 选择员工为讲师
			selectLecture () {
				let _id = this.lectureName;
				if(!_id) {
					this.addForm = {};
				}else {
					API.activity.getLecturerUserInfo({id: _id}, (data) => {
						if(data.status) {
							let _list = data.data;
							this.lectureName = _list.id;
							this.addForm.lectureName = _list.name;
							this.addForm.idCard = _list.idCard;
							this.addForm.bankDeposit = _list.bankDeposit;
							this.addForm.bankAccount = _list.bankAccount.trim();
							this.addForm.lecturePhone = _list.mobilePhone.trim();
							this.addForm.address = _list.address;
							this.sex = _list.sex === '男' && '1' || _list.sex === '女' && '2' || '';
							this.addForm.deptName = _list.organizationName;
						}
					})
				}
			},
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../../styles/common";
</style>
