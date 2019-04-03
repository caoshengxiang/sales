<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form ref="addForm" label-width="10%">
			<el-form-item label='会议名称'>
				<el-input type="text" v-model="addForm.meetingName" placeholder="请输入会议名称"></el-input>
			</el-form-item>
			<el-form-item label='主办单位' style='margin-top: 10px;'>
				<div class='sponsor-unit'>
					<div>
						<p class='sponsor-unit-left'>
							<span class='sponsor-unit-left-one'>
								<el-checkbox v-model="cooperationChannel">合作渠道</el-checkbox>
							</span>
							<el-select class='sponsor-unit-left-select' v-model="selectCooperationChannel" multiple placeholder="选择合作渠道，可多选，立项成功，生成报名二维码">
								<el-option
									v-for="item in cooperationChannelList"
									:key="item.id"
									:label="item.channelName"
									:value="item.id">
								</el-option>
							</el-select>
						</p>
					</div>
					<div>
						<p class='sponsor-unit-left line-none'>
							<span class='sponsor-unit-left-one'>
								<el-checkbox v-model="agent">代理商</el-checkbox>
							</span>
							<el-select class='sponsor-unit-left-select' v-model="selectAgent" clearable multiple filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading" placeholder="输入手机号，选择代理商，可多选，立项成功，生成报名二维码">
								<el-option
									v-for="item in agentList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</p>
					</div>
				</div>
			</el-form-item>
      </el-form>
			<el-form :inline="true" style="margin: 0 0 10px 16px;">
				<el-form-item label='活动时间' style='margin-right: 10px; margin-top: 10px;'>
					<el-date-picker
						v-model="meetingTimeInterval"
						type="datetimerange"
						format="yyyy-MM-dd HH:mm"
						@change="timeIntervalHandle"
						:unlink-panels="true"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label='承办单位' style='margin-right: 10px; margin-top: 10px;'>
					<el-input type="text"  v-model="addForm.organizer" placeholder='请输入承办单位'></el-input>
				</el-form-item>
				<el-form-item label='报名时间' style='margin-right: 10px; margin-top: 10px;'>
					<el-date-picker
						v-model="meetingTimeIntervals"
						type="datetimerange"
						format="yyyy-MM-dd HH:mm"
						@change="timeIntervalHandles"
						:unlink-panels="true"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				</el-form-item>
			</el-form>
			<el-form label-width="9%" style='margin-left: 1%;'>
				<el-form-item label='报名客户意向信息'>
					<span class='sponsor-unit-left-selects' @click='setMeetingIntention'>点击配置报名客户意向</span>
				</el-form-item>
				<el-form-item label='活动地点'>
					<el-input type="text" v-model="addForm.address" placeholder='请输入活动地点'></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" style="margin: 0 0 10px 16px;">
				<el-form-item label='获客目标' style='margin-right: 10px; margin-top: 10px;'>
					<el-input type="number" placeholder='请输入获客目标' v-model='addForm.winCustomerNum'></el-input>
				</el-form-item>
				<el-form-item label='费用预算' style='margin-right: 10px; margin-top: 10px;'>
					<el-input type="number" placeholder='请输入费用预算' v-model='addForm.meetingMoney'></el-input>
				</el-form-item>
				<el-form-item label='申请人' style='margin-right: 10px; margin-top: 10px;'>
					<el-input type="text" placeholder='请输入申请人' v-model='addForm.meetingProposer'></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="9%" style='margin-left: 1%;'>
				<el-form-item label='活动备注'>
					<el-input type="text" v-model="addForm.meetingDesc" placeholder='请输入活动备注'></el-input>
				</el-form-item>
			</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
			<el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
		</div>
		<el-dialog
		  title="配置报名客户意向信息"
		  :visible.sync="dialogVisible"
		  append-to-body
		  width="500px">
			<div>
				<el-tree
				  :data="intentionInformationList"
				  show-checkbox
				  node-key="id"
				  default-expand-all
				  highlight-current
				  :default-checked-keys="defaultCheckedKeys"
				  @check-change="handleCheckChange"
				  :props="defaultProps">
				</el-tree>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="subdialogVisible">确 定</el-button>
			</span>
		</el-dialog>
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
		loading: false,
		dialogVisible: false,              //客户意向弹框
		cooperationChannel: false,         //合作渠道是否选择
		cooperationChannelList: [],        //所有合作渠道
		selectCooperationChannel: '',      //选择的合作渠道
		agent: false,                      //代理商是否选择
		agentList: [],                     //所有代理商
		selectAgent: '',                   //选择的代理商
		intentionInformationList: [],      //所有客户意向信息
        defaultCheckedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
		addForm: {                         // 添加表单
            meetingName: '',               //活动名称
            meetingTimeStart: '',          //会议开始时间
            meetingTimeEnd: '',            //会议结束时间
			applyTimeStart: '',            //报名开始时间
			applyTimeEnd: '',              //报名结束时间
		    meetingIntention: [],          //报名意向信息
			winCustomerNum: '',            //获客目标
            meetingMoney: '',              //费用预算
            // personCount: '',            //活动人数
            hostUnit: '',                  //主办单位
            organizer: '',                 //承办单位
            // coOrganizer: '',            //协办单位
            address: '',                   //活动地点
			meetingProposer: '',           //申请人
            meetingDesc: '',               //活动备注
        },
        targetObj: null,
        meetingTimeInterval: '',   //活动时间
        meetingTimeIntervals: '',   //报名时间
      }
    },
    props: ['params'],
    methods: {
		// 动态获取代理商
		remoteMethod (query) {
			if(query.length == 11) {
				// let reg = /^[1-9]\d*$/;
				this.loading = true;
				API.user.userSearch({type: 2, mobilePhone: query}, (data) => {
					this.loading = false;
					if(data.status) {
						this.agentList = data.data;
					}
				})
			}
		},
		// 获取所有合作渠道 cooperationChannel
		getAllCooperationChannnel () {
			API.activity.cooperationChannel('', (data) => {
				if(data.status) {
					this.cooperationChannelList = data.data.content;
				}
			})
		},
		// 获取所有客户意向
		getAllCustomerIntentionZX () {
			API.activity.customerIntentionZX('', (data) => {
				if(data.status) {
					this.intentionInformationList = data.data.content;
				}
			})
		},
		// 显示配置客户意向弹框
		setMeetingIntention () {
			this.getAllCustomerIntentionZX();
			this.dialogVisible = true;
		},
		handleCheckChange (data, checked, indeterminate) {
			if(checked && data.children.length < 1) {
				this.addForm.meetingIntention.push(data.id);
				this.defaultCheckedKeys.push(data.id);
			}
			if(!checked && data.children.length < 1) {
				this.addForm.meetingIntention.forEach((a, i) => {
					if(a === data.id) {
						this.addForm.meetingIntention.splice(i, 1);
						this.defaultCheckedKeys.splice(i, 1);
					}
				})
			}
		},
		// 活动时间
		timeIntervalHandle (value) {
			this.addForm.meetingTimeStart = value[0] || ''
			this.addForm.meetingTimeEnd = value[1] || ''
		},
		// 报名时间
		timeIntervalHandles (value) {
			this.addForm.applyTimeStart = value[0] || ''
			this.addForm.applyTimeEnd = value[1] || ''
		},
		// 确定报名意向
		subdialogVisible (){
			console.log(this.addForm.meetingIntention)
			this.dialogVisible = false;
		},
		// 确定
		saveSubmitForm () {
			// 设置hostUnit
			let _line = '-', _cooperation = '', _agent = '';
			if(this.cooperationChannel && this.selectCooperationChannel.length > 0) {   //合作渠道
				_cooperation = this.selectCooperationChannel.map(a => a).join();
			}else {
				_cooperation = '';
			}
			if(this.agent && this.selectAgent.length > 0) {                              //代理商
				_agent = this.selectAgent.map(a => a).join();
			}else {
				_agent = '';
			}
			// 设置主办单位字段
			if(!_cooperation && !_agent) {
				this.addForm.hostUnit = '';
			}else {
				this.addForm.hostUnit = _cooperation + _line + _agent;
			}
			
			// 设置报名意向信息
			if(this.defaultCheckedKeys.length > 0) {
				this.addForm.meetingIntention = this.defaultCheckedKeys.map(a => a).join();
			}else {
				this.addForm.meetingIntention = '';
			}
			
			let message = !this.addForm.meetingName && '请输入活动名称' ||
						  !this.addForm.hostUnit && '请选择主办单位' ||
						  (!this.addForm.meetingTimeStart || !this.addForm.meetingTimeEnd) && '请选择活动时间' ||
						  !this.addForm.organizer && '请输入承办单位' ||
						  (!this.addForm.applyTimeStart || !this.addForm.applyTimeEnd) && '请选择报名时间' ||
						  !this.addForm.meetingIntention && '请配置报名意向信息' ||
						  !this.addForm.address && '请输入活动地点' ||
						  !this.addForm.winCustomerNum && '请输入获客目标' ||
						  !this.addForm.meetingMoney && '请输入预算费用' ||
						  !this.addForm.meetingProposer && '请输入申请人' || null;
			if(message) {
				this.$message({
					type: 'error',
					message,
				})
				return;
			}
			console.log(this.addForm);
			this.dataLoading = true
			API.activity.add(this.addForm, (data) => {
				if (data.status) {
					this.$message.success('添加成功')
					setTimeout(() => {
						this.dataLoading = false
						this.$vDialog.close({type: 'save'})
					}, 500)
				} else {
					setTimeout(() => {
						this.dataLoading = false
					}, 500)
				}
			})
		},
    },
    created () {
		this.getAllCooperationChannnel();
    },
	mounted () {
		$('.sponsor-unit-left-select input')[0].style.borderColor = '#fff'
		$('.sponsor-unit-left-select input')[2].style.borderColor = '#fff'
	},
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
	
	.sponsor-unit {
		width: 100%;
		border: 1px solid #DDDDDD;
		border-radius: 4px;
	}
	.sponsor-unit>div {
		height: 40px;
		width: 100%;
		line-height: 40px;
		overflow: hidden;
	}
	.sponsor-unit>div p {
		width: 100%;
		padding: 0 15px;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}
	.sponsor-unit-left {
		color: #333E48;
		border-bottom: 1px solid #DDDDDD;
	}
	.line-none {
		border: 0 !important;
	}
	.sponsor-unit-left-one {
		display: inline-block;
		float: left;
		width: 80px;
		height: 40px;
		padding-right: 15px;
		border-right: 1px solid #DDDDDD;
	}
	.sponsor-unit-left-select {
		float: left;
		width: calc(100% - 96px);
		border: none !important;
	}
	.sponsor-unit-left-selects {
		display: inline-block;
		height: 33px;
		margin-top: 14px;
		color: #2587e0;
		font-size: 14px;
		cursor: pointer;
	}
</style>
