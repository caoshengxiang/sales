<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
			<table class='com-dialog-table'>
				<tr>
					<td class='td-title'>会议名称</td>
					<td>
						{{addForm.meetingName}}
					</td>
					<td class='td-title'>承办单位</td>
					<td colspan="3">
						{{addForm.organizer}}
					</td>
				</tr>
				<tr>
					<td class='td-title'>主办单位</td>
					<td colspan="5">
						<!-- {{addForm.hostUnit}} -->
						<el-tag type="success" style='margin-right: 5px;' v-for='(item, i) in host' :key='i'>{{item}}</el-tag>
					</td>
				</tr>
				<tr>
					<td class='td-title'>报名时间</td>
					<td colspan="5">{{addForm.applyTimeStart ? $moment(addForm.applyTimeStart).format('YYYY/MM/DD HH:mm') + ' - ' + $moment(addForm.applyTimeEnd).format('YYYY/MM/DD HH:mm') : ''}}</td>
				</tr>
				<tr>
					<td class='td-title'>活动时间</td>
					<td colspan="5">{{addForm.meetingTimeStart ? $moment(addForm.meetingTimeStart).format('YYYY/MM/DD HH:mm') + ' - ' + $moment(addForm.meetingTimeEnd).format('YYYY/MM/DD HH:mm') : ''}}</td>
				</tr>
				<tr>
					<td class='td-title'>报名用户意向信息</td>
					<td colspan="5">
						<span class='sponsor-unit-left-selects' @click='setMeetingIntention'>点击查看报名客户意向</span>
					</td>
				</tr>
<!-- 				<tr>
					<td class='td-title'>会议形式</td>
					<td></td>
					<td class='td-title'>报名会议主题</td>
					<td colspan="3"></td>
				</tr> -->
				<tr>
					<td class='td-title'>活动地点</td>
					<td colspan="5">{{addForm.address}}</td>
				</tr>
				<tr>
					<td class='td-title'>获客目标</td>
					<td>{{addForm.winCustomerNum}}</td>
					<td class='td-title'>费用预算</td>
					<td>{{addForm.meetingMoney}}</td>
					<td class='td-title'>申请人</td>
					<td>{{addForm.meetingProposer}}</td>
				</tr>
				<tr>
					<td class='td-title'>申请时间</td>
					<td>{{addForm.created ? $moment(addForm.created).format('YYYY/MM/DD HH:mm:ss') : ''}}</td>
					<td class='td-title'>活动备注</td>
					<td colspan="5">{{addForm.meetingDesc}}</td>
				</tr>
			</table>
			<div class='edit-dialog-div'>
				<el-form :inline='true'>
					<el-form-item label='会议讲师'>
						<el-select v-model="addForm.meetingLecturerId" clearable placeholder="请选择会议讲师">
							<el-option
								v-for="item in conferenceLecturerList"
								:key="item.id"
								:label="item.lectureName"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label='会议负责人'>
						<el-select v-model="addForm.meetingHeadId" clearable placeholder="请选择会议负责人">
							<el-option
								v-for="item in conferenceLeaderList"
								:key="item.id"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label='会议专员'>
						<el-select v-model="conferenceExecutive" multiple clearable placeholder="请选择会议专员 可多选">
							<el-option
								v-for="item in conferenceExecutiveList"
								:key="item.id"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style='width: 100%'></el-form-item>
					<el-form-item label='会务活动方案和分工'>
						<el-upload
								class="upload-demo"
								:action="uploadUrl"
								:on-remove="onRemoveHandle"
								:headers="{authKey: userInfo.authKey}"
								:on-success="onSuccessHandle"
								accept=".doc,.docx,.zip,.rar,.xlsx,.xls,.ppt,.pptx"
								:file-list="fileList"
								:limit="1">
								<el-button size="small" class='edit-upload-button'>上传</el-button>
								注：请上传压缩包或office文档
						</el-upload>
					</el-form-item>
					<el-form-item style='width: 100%'></el-form-item>
					<el-form-item label='本场会务活动课件'>
						<el-upload
								class="upload-demo"
								:action="uploadUrl"
								:on-remove="onRemoveHandles"
								:headers="{authKey: userInfo.authKey}"
								:on-success="onSuccessHandles"
								accept=".doc,.docx,.zip,.rar,.xlsx,.xls,.ppt,.pptx"
								:file-list="fileLists"
								:limit="1">
								<el-button size="small" class='edit-upload-button'>上传</el-button>
								注：请上传压缩包或office文档
						</el-upload>
					</el-form-item>
				</el-form>
			</div>

<!--       <table class="com-dialog-table">
          <tr>
            <td class="td-title">活动名称</td>
            <td colspan="5">
              <el-form-item prop="meetingName">
                <el-input type="text" v-model="addForm.meetingName"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">活动时间</td>
            <td>
              <el-form-item prop="meetingTimeStart">
                <el-date-picker
                  v-model="meetingTimeInterval"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="timeIntervalHandle"
                  :unlink-panels="true"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">活动经费</td>
            <td>
              <el-form-item prop="meetingMoney">
                <el-input type="number" v-model="addForm.meetingMoney"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">活动人数</td>
            <td>
              <el-form-item prop="personCount">
                <el-input type="number" v-model="addForm.personCount"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">主办单位</td>
            <td colspan="5">
              <el-form-item prop="hostUnit">
                <el-input type="text" v-model="addForm.hostUnit"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">承办单位</td>
            <td colspan="5">
              <el-form-item prop="organizer">
                <el-input type="text" v-model="addForm.organizer"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">协办单位</td>
            <td colspan="5">
              <el-form-item prop="coOrganizer">
                <el-input type="text" v-model="addForm.coOrganizer"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">活动地址</td>
            <td colspan="5">
              <el-form-item prop="address">
                <el-input type="text" v-model="addForm.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">活动简介</td>
            <td colspan="5">
              <el-form-item prop="meetingDesc">
                <el-input type="text" v-model="addForm.meetingDesc"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table> -->
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
		<el-dialog
		  title="报名客户意向信息"
		  :visible.sync="dialogVisible"
		  append-to-body
		  width="500px">
			<div class='over-dialog'>
				<div>
					<el-tree
					  :data="intentionInformationList"
					  node-key="id"
					  default-expand-all
					  highlight-current
					  :props="defaultProps">
					</el-tree>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</span>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  import { chartLengthRule, uploadUrl } from '../../../../utils/const'
	
  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
				dialogVisible: false,
				conferenceLecturerList: [],    //所有会议讲师       
				conferenceLeaderList: [],      //所有会议负责人
				conferenceExecutiveList: [],   //所有会议专员
				intentionInformationList: [],  //意向信息id集合
				host: [],                      //所有主办单位
				conferenceExecutive: '',       //选择的会议专员
				fileList: [],
				fileLists: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        addForm: {                     // 添加表单
					intentionInformation: '',     //意向信息
					meetingLecturerId: '',          //会议讲师
					meetingHeadId: '',            //会议负责人
					meetingCommissioner: '',      //需传会议专员
					meetingActivityPlan: '',      //活动方案和分工文件
					meetingCourseware: '',        //活动课件
        },
        targetObj: null,
        userInfo: webStorage.getItem('userInfo'),
      }
    },
		watch: {
			conferenceExecutive () {
				if(this.conferenceExecutive.length < 1) {
					this.addForm.meetingCommissioner = ''
				}
			}
		},
    props: ['params'],
		computed: {
				uploadUrl () {
						return uploadUrl
				}
		},
    methods: {
      timeIntervalHandle (value) {
        this.addForm.meetingTimeStart = value[0] || ''
        this.addForm.meetingTimeEnd = value[1] || ''
      },
			setMeetingIntention () {
				this.dialogVisible = true;
				this.intentionInformationList = this.addForm.meetingIntentions;
			},
			// 获取所有会议讲师
			getAllMeetingLecturer () {
				API.activity.meetingLecturerZX('', (data) => {
					if(data.status) {
						this.conferenceLecturerList = data.data.content;
					}
				})
			},
			// 获取所有会议负责人/会议专员
			getAllStaff () {
				API.activity.staffZX('', (data) => {
					if(data.status) {
						this.conferenceLeaderList = data.data;
						this.conferenceExecutiveList = data.data;
					}
				})
			},
      saveSubmitForm (formName) {
				if(this.conferenceExecutive.length > 0) {
					this.addForm.meetingCommissioner = this.conferenceExecutive.map(a => a).join();
				}
				let message = !this.addForm.meetingLecturerId && '请选择会议讲师' ||
				              !this.addForm.meetingHeadId && '请选择会议负责人' ||
											!this.addForm.meetingCommissioner && '请选择会议专员' ||
											!this.addForm.meetingActivityPlan && '请上传活动方案和分工文件' ||
											!this.addForm.meetingCourseware && '请上传活动课件' || null;
				if(message) {
					this.$message(message);
					return;
				}
				this.dataLoading = true
				if (this.params.detail) { // 编辑
					API.activity.edit({id: this.addForm.id, body: this.addForm}, (data) => {
						if (data.status) {
							this.$message.success('完善成功')
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
				}
      },
			// 文件成功上传
			onSuccessHandle (response, file, fileList) {
					this.addForm.meetingActivityPlan = response.data.url
					this.addForm.meetingActivityPlanName = response.data.name
			},
			// 删除已上传文件
			onRemoveHandle () {
					this.addForm.meetingActivityPlan = '';
					this.addForm.meetingActivityPlanName = '';
			},
			// 课件成功上传
			onSuccessHandles (response, file, fileList) {
					this.addForm.meetingCourseware = response.data.url
					this.addForm.meetingCoursewareName = response.data.name
			},
			// 删除课件文件
			onRemoveHandles () {
					this.addForm.meetingCourseware = '';
					this.addForm.meetingCoursewareName = '';
			},
    },
    created () {
      if (this.params.detail) { // 编辑
        this.addForm = this.params.detail
        this.meetingTimeInterval = [new Date(this.addForm.meetingTimeStart) || '', new Date(this.addForm.meetingTimeEnd) || '']
				this.conferenceExecutive = this.addForm.meetingCommissioners.map(a => a.id);
				this.addForm.meetingCommissioner = this.addForm.meetingCommissioners.map(a => a.id).join();
				this.fileList = this.addForm.meetingActivityPlan ? [{name: this.addForm.meetingActivityPlanName, url: this.addForm.meetingActivityPlan}] : [];
				this.fileLists = this.addForm.meetingCourseware ? [{name: this.addForm.meetingCoursewareName, url: this.addForm.meetingCourseware}] : [];
				console.log(this.addForm.meetingLecturerId)
				// 赋值主办单位
				if(this.addForm.hostUnitAgent.length > 0) {
					this.addForm.hostUnitAgent.forEach(a => {
						this.host.push(a.name);
					})
				}
      }
			if(this.addForm.hostUnitCooperationChannel.length > 0) {
				this.addForm.hostUnitCooperationChannel.forEach(b => {
					this.host.push(b.channelName);
				})
			};
			this.getAllMeetingLecturer();
			this.getAllStaff();
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
	
	.edit-dialog-div {
		padding: 10px 0;
		border-top: 1px dashed #DFDFDF;
	}
	.edit-upload-button {
		border-radius: 20px;
		border-color: #26C6DA;
		color: #26C6DA;
		font-size: 14px;
		margin-right: 15px;
	}
	
	.sponsor-unit-left-selects {
		display: inline-block;
		height: 33px;
		margin-top: 14px;
		color: #2587e0;
		font-size: 14px;
		cursor: pointer;
	}
	.over-dialog {
		max-height: 300px;
		overflow-y: auto;
		padding-bottom: 20px;
	}
	.over-dialog>div {
		margin-bottom: 15px;
	}
	.over-dialog>span {
		float: right;
		margin-right: 15px;
	}
</style>
