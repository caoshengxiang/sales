<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报名来源：">
              <el-input type="text" v-model="searchForm.channelName"></el-input>
            </el-form-item>
					</el-col>
          <el-col :span="8">
            <el-form-item label="联系人：">
              <el-input type="text" v-model="searchForm.contacter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
				<el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="联系方式：">
              <el-input type="number" v-model.number="searchForm.contactPhone"></el-input>
            </el-form-item>
          </el-col>
<!-- 					<el-col :span="8">
						<el-form-item label='客户地区'>
							<AreaSelect ref="areaSe"
													:area="(searchForm.provinceName?searchForm.provinceName:'') + ' ' + (searchForm.cityName?searchForm.cityName:'')  + ' ' + (searchForm.areaName?searchForm.areaName:'')"
													@change="areaSelectedOptionsHandleChange"
													:selectLastLevelMode="true"></AreaSelect>
						</el-form-item>
					</el-col> -->
          <el-col :span="8">
            <el-form-item label="报名意向：">
							<el-select v-model="applyIntention" placeholder="" @change='selectApplyIntention'>
								<el-option v-for="item in intentionInformationList" :key="item.id" :label="item.name"
													 :value="item.id"></el-option>
							</el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否到场：">
							<el-select v-model="searchForm.sign" placeholder="">
								<el-option v-for="item in signList" :key="item.id" :label="item.name"
													 :value="item.id"></el-option>
							</el-select>
            </el-form-item>
          </el-col>
				</el-row>
<!--        <el-row class="el-row-cla">
          <el-col :span="16">
            <el-form-item label="活动时间：">
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
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="cancel-button" @click="clearForm">清 除</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        contactsStatus: [],                             // 联系人状态
				signList: [
					{
						id: 1,
						name: '是'
					}, {
						id: 0,
						name: '否'
					}
				],
				applyIntention: '',
				intentionInformationList: [],                   //所有客户意向信息
        searchForm: { // 表单
          name: '',                                     //客户名称
					channelName: '',                              //报名来源
					contactPhone: '',                             //联系方式
          contacter: '',                                //联系人
// 					provinceId: '',                               //省份id
// 					cityId: '',                                   //市id
// 					areaId: '',                                   //区id
// 					provinceName: '',                             //省名称
// 					cityName: '',                                 //市名称
// 					areaName: '',                                 //区名称
					sign: '',                                     //是否签到
					applyIntention: '',                           //报名用户意向
//           meetingTimeStart2: '', // 活动开始时间
//           meetingTimeEnd2: '',
        },
        meetingTimeInterval: [],
      }
    },
    props: ['params'],
    methods: {
      clearForm () {
        this.searchForm = {}
				this.applyIntention = ''
        this.meetingTimeInterval = []
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
//       timeIntervalHandle (value) {
//         this.searchForm.meetingTimeStart2 = value[0] || ''
//         this.searchForm.meetingTimeEnd2 = value[1] || ''
//       },
      numberIntervalHandle (type, start, end) {
        if (type === 0) {
          if (this.searchForm[start] > this.searchForm[end]) {
            this.searchForm[end] = null
          }
        } else {
          if (this.searchForm[start] && this.searchForm[start] >
            this.searchForm[end]) {
            this.searchForm[end] = this.searchForm[start]
          }
        }
      },
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.searchForm.provinceId = value[0] || ''
        this.searchForm.cityId = value[1] || ''
        this.searchForm.areaId = value[2] || ''
        this.searchForm.provinceName = name[0] || ''
        this.searchForm.cityName = name[1] || ''
        this.searchForm.areaName = name[2] || ''
      },
			// 获取所有客户意向
			getAllCustomerIntentionZX () {
				API.activity.customerIntentionZX('', (data) => {
					if(data.status) {
						let _list = data.data.content, newList = [];
						_list.forEach(a => {
// 							if(a.children.length > 0) {
// 								a.children.forEach(b => {
// 									newList.push(b)
// 								})
// 							}
								if(a.name) {
									newList.push(a)
								}
						})
						this.intentionInformationList = newList;
						console.log(this.intentionInformationList)
					}
				})
			},
			// 选择报名意向
			selectApplyIntention () {
				console.log(this.applyIntention)
				let _list = this.intentionInformationList;
				_list.forEach(a => {
					if(this.applyIntention == a.id) {
						// this.searchForm.applyIntention = a.pid + '-' + a.id;
						this.searchForm.applyIntention = a.id;
					}
				})
			},
    },
    created () {
      this.searchForm = this.params.preAdvancedSearch
			if(this.searchForm.applyIntention) {
				this.applyIntention = this.params.preAdvancedSearch.applyIntention
			}
			console.log(this.applyIntention)
			this.getAllCustomerIntentionZX();
//       if (this.searchForm.meetingTimeStart2) { // 日期
//         this.meetingTimeInterval = [this.searchForm.meetingTimeStart2, this.searchForm.meetingTimeEnd2]
//       }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
