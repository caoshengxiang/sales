<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
			<!-- 客户创建信息 -->
			<table class="com-dialog-table">
				<tr>
					<td class='td-title'>客户名称</td>
					<td>{{detail.name}}</td>
					<td class='td-title'>客户联系人</td>
					<td>{{detail.contactName}}</td>
					<td class='td-title'>联系电话</td>
					<td>{{detail.phone}}</td>
				</tr>
				<tr>
					<td class='td-title'>客户行业</td>
					<td>{{detail.industry}}</td>
					<td class='td-title'>客户地区</td>
					<td>
            {{ detail.provinceName }}-{{ detail.cityName }}-{{ detail.areaName }}</td>
					<td class='td-title'>客户来源</td>
					<td>{{detail.customerSourceName}}</td>
				</tr>
			</table>
			<p class='line'></p>
			<p class='identification-ing'>
				<span class='identification-ing-img'>
					<img src="../../../../assets/icon/chengjiao.png" alt="">
				</span>
				<span class='identification-ing-title'>客户判定</span>
				<span :class='addForm.customerStatus == 1 ? "identification-ing-yes cur" : "identification-ing-yes"' @click='setIdentification(0)'>有效
					<img src="../../../../assets/icon/sjx_gou.png" v-if='addForm.customerStatus == 1'>
				</span>
				<span :class='addForm.customerStatus == -1 ? "identification-ing-no cur" : "identification-ing-no"' @click='setIdentification(1)'>无效
					<img src="../../../../assets/icon/sjx_gou.png" v-if='addForm.customerStatus == -1'>
				</span>
			</p>
			
			<el-form :model="addForm" ref="addForm" label-width="100px">
				<!-- 无效 -->
				<div v-if='addForm.customerStatus == -1'>
					<el-row class='md10'>
						<el-col :span='8'>
							<el-form-item label='无效原因'>
								<el-select v-model='addForm.invalidCause' placeholder="请选择无效原因">
									<el-option v-for="(item, i) in invalidCauseList" :key='i' :label='item.codeName' :value='item.id'>{{item.codeName}}</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='16'>
							<el-form-item label='无效证据'>
								<el-upload
										class="upload-demo"
										:action="uploadUrl"
										:on-remove="onRemoveHandle"
										:headers="{authKey: userInfo.authKey}"
										:on-success="onSuccessHandle"
										accept=".zip,.rar,.jpg,.jpeg,.png"
										:before-upload="deforeUploads"
										multiple
										:limit="1">
										<el-button size="small" type="primary">上传证据</el-button>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class='md10'>
						<el-col :span='24'>
							<el-form-item label='无效描述'>
								<el-input type='textarea' :rows='4' placeholder="请输入无效描述" resize="none" v-model='addForm.invalidRemark'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<!-- 有效 -->
				<div v-else>
					<p class="com-titles">基本信息</p>
					<el-row>
						<el-col class='md10' :span='24'>
							<el-form-item label='客户性质'>
								<el-radio v-model='addForm.cate' :label="2">机构</el-radio>
								<el-radio v-model='addForm.cate' :label="1">个人</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col class='md10' :span='8'>
							<el-form-item label='客户名称'>
                <el-input type="text" placeholder="请输入客户名称" v-model="addForm.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8' v-if='addForm.cate == 2'>
							<el-form-item label='证件号码'>
                <el-input type="text" placeholder="请输入证件号码" v-model="addForm.cdKey"></el-input>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8' v-if='addForm.cate == 2'>
							<el-form-item label='客户联系人'>
                <el-input type="text" placeholder="请输入客户联系人" v-model="addForm.contactName"></el-input>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8'>
							<el-form-item label='联系电话'>
                <el-input type="text" placeholder="请输入联系电话" v-model="addForm.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8'>
							<el-form-item label='客户地区'>
                <AreaSelect ref="areaSe"
														v-model='selectedOptions'
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8'>
              <el-form-item label='客户行业' prop="industryArr">
                <el-cascader
                  style="width: 100%"
                  :options="industryType"
                  class="selectIndustryModule"
                  :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }"
                  placeholder="addForm.industry"
                  :change-on-select="true"
                  @change="industryChangeHandle"
                  v-model="addForm.industryArr">
                </el-cascader>
              </el-form-item>
						</el-col>
						<el-col class='md10' :span='8'>
							<el-form-item label='客户公海'>
                <el-select v-model.number="addForm.seaId" placeholder="请选择所属公海">
                  <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8'>
							<el-form-item label='客户来源'>
								<el-input disabled v-model='detail.customerSourceName'></el-input>
							</el-form-item>
						</el-col>
						<el-col class='md10' :span='8'>
							<el-form-item label='客户创建人'>
								<el-input disabled v-model='detail.creatorName'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<p class="com-titles">客户需求</p>
					<table class="com-dialog-table" style='text-align: center;'>
						<tr>
							<td class='td-title'>需求来源</td>
							<td class='td-title'>需求提供人</td>
							<td class='td-title'>商品名称</td>
							<td class='td-title'>客户意向程度</td>
						</tr>
						<tr v-if='opportunitiesList.length < 1'>
							<td colspan="4">{{tdText}}</td>
						</tr>
						<tr v-else v-for="item in opportunitiesList" :key='item.id'>
							<td>{{item.chanceSourceName}}</td>
							<td>{{item.providerName}}</td>
							<td>{{item.intentProductName}}</td>
							<td>
								<el-select v-model='item.customerIntentionLevel' @change="selectIntentionLevel(item)" placeholder="请选择客户意向程度">
									<el-option label='高' :value='3'>高</el-option>
									<el-option label='中' :value='2'>中</el-option>
									<el-option label='低' :value='1'>低</el-option>
									<el-option label='无' :value='0'>无</el-option>
								</el-select>
							</td>
						</tr>
					</table>
				</div>
			</el-form>
			
<!--      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table"> -->
<!--          <tr>
            <td class="td-title">客户类型</td>
            <td class="td-text">
              <el-form-item prop="cate">
                <el-select v-model="addForm.cate" placeholder="请选择客户类型">
                  <el-option label="个人" :value="1"></el-option>
                  <el-option label="机构" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="addForm.name"></el-input>
              </el-form-item>
            </td>

            <td class="td-title">证件号码</td>
            <td class="td-text">
              <el-form-item prop="cdKey">
                <el-input type="text" v-model="addForm.cdKey"></el-input>
              </el-form-item>
            </td>
          </tr> -->
<!--         <tr>
            <td class="td-title">所属公海</td>
            <td class="td-text">
              <el-form-item prop="seaId">
                <el-select v-model.number="addForm.seaId" placeholder="请选择所属公海">
                  <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户级别</td>
            <td class="td-text">
              <el-form-item prop="level">
                <el-select v-model="addForm.level" @change="selectLevel" placeholder="请选择客户级别">
                  <el-option v-for="item in levelList" :key="item.codeName" :label="item.codeName"
                             :value="item.codeName"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户行业</td>
            <td class="td-text">
              <el-form-item prop="industry">
                <el-select v-model="addForm.industry" @change="selectIndustry" placeholder="请选择客户行业">
                  <el-option v-for="item in industryList" :key="item.id" :label="item.codeName"
                             :value="item.codeName"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr> -->
<!--          <tr>
            <td class="td-title">客户地区</td>
            <td class="td-text">
              <el-form-item prop="provinceId">
                <AreaSelect ref="areaSe"
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
              </el-form-item>
            </td>
            <td class="td-title">公司网站</td>
            <td class="td-text">
              <el-form-item prop="website">
                <el-input type="text" v-model="addForm.website"></el-input>
              </el-form-item>
            </td>
          </tr> -->
          <!--<tr>-->
            <!--<td class="td-title">客户联系人</td>-->
            <!--<td class="td-text">-->
              <!--<el-form-item prop="contactName">-->
                <!--<el-input type="text" v-model="addForm.contactName"></el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
            <!--<td class="td-title">客户电话</td>-->
            <!--<td class="td-text">-->
              <!--<el-form-item prop="phone">-->
                <!--<el-input type="text" v-model="addForm.phone"></el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
          <!--</tr>-->
<!--          <tr>
            <td class="td-title">客户来源</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="customerSource">
                <el-cascader
                  style="width: 100%"
                  :disabled="!!params.detail"
                  :change-on-select="selectLastLevelMode"
                  :options="customerSourceType"
                  v-model="customerSourceArr"
                  @active-item-change="customerSourceChangeHandle"
                  @change="customerSourceChangeHandle"
                  :props="props"
                  :placeholder="addForm.customerSourceName"
                  :value="selectedBindValue"
                >
                </el-cascader>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">联系地址</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="address">
                <el-input type="text" v-model="addForm.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">主营业务</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="business">
                <el-input type="text" v-model="addForm.business"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <!-- <el-button class="save-button" @click="saveSubmitForm('addForm', true)">保存并新建联系人</el-button> -->
        <el-button class="save-button" @click="saveSubmitForm('addForm', false)">确 定</el-button>
      </div>
    </div>
		<el-dialog
			title="客户意向程度"
			:visible.sync="dialogVisible"
			width="40%"
			append-to-body
			:before-close="handleClose"
			:close-on-click-modal='false'
			:close-on-press-escape='false'>
			<div>
				<el-form :model='demand' label-width='80px'>
					<el-form-item label='证据文件' style='margin-bottom: 15px;'>
						<el-upload
								class="upload-demo"
								:action="uploadUrl"
								:on-remove="onRemoveHandles"
								:headers="{authKey: userInfo.authKey}"
								:on-success="onSuccessHandles"
								:before-upload="deforeUpload"
								accept=".zip,.rar"
								:file-list='fileList'
								multiple
								:limit="1">
								<el-button size="small" type="primary">上传证据文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label='描述信息'>
						<el-input type='textarea' :rows='6' v-model='demand.chatRecord' resize="none"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click='subIdentification'>确 定</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
  import addContactDialog from '../contacts/addDialog'
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  import { uploadUrl } from '../../../../utils/const'
  import { chartLengthRule } from '../../../../utils/const'

  export default {
    name: 'identification',
    data () {
      return {
        addDialogVisible: false, // 新增
        dataLoading: false,
				dialogVisible: false,
				selectedOptions: [],
        addForm: { // 添加客户表单
          name: '',                    //客户名称
          contactName: '',             //客户联系人
          industry: '',                //客户行业
          provinceId: '',              //省id
          cityId: '',                  //市id
          areaId: '',                  //区id
					provinceName: '',            //省名称
					cityName: '',                //市名称
					areaName: '',                //区名称
          phone: '',                   //联系电话
          seaId: '',                   //客户公海
					customerStatus: 1,           //客户有效性
					invalidCause: '',            //无效原因
					invalidFileName: '',         //无效证据名称
					invalidFileUrl: '',          //无效证据链接
					invalidRemark: '',           //无效描述
					cate: 2,                     //客户性质
					cdKey: '',                   //证件号码
          industryArr: [],
        },
        areaOptionsData: [],
        // areaSelectedOptions: [],
        levelList: [], // 级别
        seaList: [], // 公海
        dialogType: 'add',
        industryList: [], // 行业
        customerSourceType: [], // 客户来源
				invalidCauseList: [],               //无效原因
        customerSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        selectedBindValue: [],
        userInfo: webStorage.getItem('userInfo'),
		fileList: [],
        selectLastLevelMode: true,
				detail: {},
        industryType: [],
				opportunitiesList: [],              //客户需求列表
				tdText: '暂无需求数据',              //客户需求list文字
				chanceId: '',
				demand: {
					chatRecord: '',                   //描述信息
					recorderFileName: '',             //证据文件名称
					recorderFileUrl: '',              //证据文件路径
				},
      }
    },
    props: ['params'],
		computed: {
				uploadUrl () {
						return uploadUrl
				}
		},
    methods: {
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.addForm.provinceId = value[0] || ''
        this.addForm.cityId = value[1] || ''
        this.addForm.areaId = value[2] || ''
        this.addForm.provinceName = name[0] || ''
        this.addForm.cityName = name[1] || ''
        this.addForm.areaName = name[2] || ''
      },
      selectLevel (val) {
        // this.levelList.forEach(item => {
        //   if (item.id === val) {
        //     this.addForm.levelName = item.codeName
        //   }
        // })
      },
      selectIndustry (val) {
        // this.industryList.forEach(item => {
        //   if (item.id === val) {
        //     this.addForm.industryName = item.codeName
        //   }
        // })
      },
      saveSubmitForm (formName, addContact) {
        this.addForm.industry = this.addForm.industryArr.join(',')
				let _data = this.addForm;
				let message = (_data.customerStatus == -1 && !_data.invalidCause) && '请选择无效原因' ||
				              (_data.customerStatus == -1 && !_data.invalidFileUrl && !this.detail.callIds) && '请上传无效证据' ||
											(_data.customerStatus == -1 && !_data.invalidRemark) && '请输入无效描述' ||
											(_data.customerStatus == 1 && _data.cate == 2 && !_data.name) && '请输入客户名称' ||
											(_data.customerStatus == 1 && _data.cate == 2 && !_data.cdKey) && '请输入证件号码' ||
											(_data.customerStatus == 1 && _data.cate == 2 && !_data.contactName) && '请输入客户联系人' ||
											(_data.customerStatus == 1 && !_data.phone) && '请输入联系电话' ||
											(_data.customerStatus == 1 && (!_data.provinceId || !_data.cityId || !_data.areaId)) && '请选择客户地区' ||
											(_data.customerStatus == 1 && !_data.industryArr) && '请选择客户行业' ||
											(_data.customerStatus == 1 && !_data.seaId) && '请选择客户公海' || null;
				if(message) {
					return this.$message({
						type: 'error',
						message,
						duration: 1500
					});
				};
				if(_data.customerStatus == -1) {
					if(this.invalidCauseList.length > 0) {
						this.invalidCauseList.forEach(a => {
							if(_data.invalidCause == a.id) {
								_data.invalidCauseName = a.codeName;
							}
						})
					}
				}
				this.dataLoading = true
					API.customer.edit({
						path: _data.id,
						body: _data,
					}, (data) => {
						if (data.status) {
							this.$message.success('客户鉴定成功')
							setTimeout(() => {
								this.dataLoading = false
								this.$vDialog.close({type: 'save'})
// 								if (addContact) {
// 									this.saveAndAddContact()
// 								}
							}, 500)
						} else {
							setTimeout(() => {
								this.dataLoading = false
							}, 500)
						}
					})
      },
      saveAndAddContact () {
        this.$vDialog.modal(addContactDialog, {
          title: '新增联系人',
          width: 900,
          height: 460,
          params: {
            addCustomersAndAddContact_customerName: this.addForm.name,
          },
          callback (data) {
            if (data.type === 'save') {}
          },
        })
      },
      getAreaOptionsData (id) {
        API.common.region(id, (data) => {
          this.areaOptionsData = data.data
        })
      },
      handleAreaItemChange (val) {
        console.log('val', val)
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, (data) => {
          if (type === 2) {
            this.levelList = data.data
          } else if (type === 3) {
            this.industryList = data.data
          } else if (type === 5) {
            // let arr = data.data.map((item) => {
            //   item.children = []
            //   return item
            // })
            if (this.customerSourceType.length === 0) {
              // this.customerSourceType = arr
              // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
              // 其他模块中新增调取销售自建，
              // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
              this.customerSourceType = [
//                 { // 销售自建
//                   codeName: this.params.topSource[0].name,
//                   id: this.params.topSource[0].value,
//                   children: [],
//                 },
								{
                  codeName: this.params.topSource[3].name,
                  id: this.params.topSource[3].value,
                }]
              // this.selectedBindValue.push(this.topSource[0].value)
              if (this.params.detail) { // 编辑
                let arr = this.params.detail.customerSource.split('-')
                this.customerSourceArr = arr.map(item => {
                  return parseInt(item, 10)
                })
              } else {
                this.customerSourceArr.push(this.params.topSource[0].value)
              }
              this.customerSourceChangeHandle([this.params.topSource[0].value]) // 默认获取第二级
            }
          }
        })
      },
			// 获取无效原因
			getCodeConfig () {
				API.common.codeConfig({type: 17}, (data) => {
					if(data.status) {
						this.invalidCauseList = data.data;
					}
				})
			},
      customerSourceChangeHandle (va) {
        this.getLastItem(this.customerSourceType, va, 'id')
        API.common.codeConfig({type: 5, pCode: va[va.length - 1]}, (data) => {
          // console.log('目标item:', this.targetObj)
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            this.targetObj.children = arr
          } else {
            this.targetObj.children = null
          }
        })
        if (!this.params.detail) { // 非编辑
          this.addForm.customerSource = va.join('-')
        } else { // 编辑
          this.addForm.customerSource = this.customerSourceArr.join('-')
        }
      },
      industryChangeHandle (va) {
        let parentId
        let that = this
        if (va.length) {
          parentId = va[va.length - 1]
        } else {
          parentId = 0
        }
        API.common.industry({parentId: parentId, status: true}, (data) => {
          // console.log('目标item:', this.targetObj)
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if (va.length){
              that.getLastItem(that.industryType, va, 'id')
              that.targetObj.children = arr
            } else {
              that.industryType = arr
              if (that.addForm.industry) {
                that.addForm.industryArr = []
                that.initIndustry(that.addForm.industryArr, that.industryType, that.addForm.industry.split(','), 0)
              }
            }
          } else {
            that.getLastItem(that.industryType, va, 'id')
            that.targetObj.children = null
            setTimeout(function () {
              if ($('.selectIndustryModule').hasClass('is-opened')) {
                $('.selectIndustryModule').trigger('click')
              }
            }, 100)
          }
        })
      },
      initIndustry (industryArr, list, vals, index) {
        let that = this
        if (index < vals.length) {
          for (let item of list) {
            if (item['name'] === vals[index]) {
              industryArr.push(item['id'])
              API.common.industry({parentId: item['id'],status: true}, (data) => {
                // console.log('目标item:', this.targetObj)
                if (data.data.length) {
                  let arr = data.data.map((item) => {
                    item.children = []
                    return item
                  })
                  item.children = arr
                  that.initIndustry(industryArr, item.children, vals, index + 1)
                }
              })
            }
          }
        }
      },
      // customerSourceChange (va) {
      //   this.addForm.customerSource = va.join('-')
      // },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            this.selectedBindValue.push(item[key])
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
			// 文件成功上传
			onSuccessHandle (response, file, fileList) {
					this.addForm.invalidFileUrl = response.data.url
					this.addForm.invalidFileName = response.data.name
			},
			// 删除已上传文件
			onRemoveHandle () {
					this.addForm.invalidFileName = '';
					this.addForm.invalidFileUrl = '';
			},
			// 文件成功上传
			onSuccessHandles (response, file, fileList) {
					this.demand.recorderFileUrl = response.data.url
					this.demand.recorderFileName = response.data.name
			},
			// 删除已上传文件
			onRemoveHandles () {
					this.demand.recorderFileName = '';
					this.demand.recorderFileUrl = '';
			},
			// 上传之前的钩子
			deforeUploads (file) {
				let _file = file.name.split('.'),
				    _format = _file[_file.length - 1],
						_status = true;
				if(_format === 'rar' || _format === 'zip' || _format === 'jpg' || _format === 'jpeg' || _format === 'png') {
					_status =  true
				}else {
					this.$message({
						type: 'error',
						message: '请上传压缩文件或者图片',
						duration: 1500
					})
					_status = false;
				}
				return _status;
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
      getSeaList () {
        API.customerSea.listAboutCustomer((data) => {
          this.seaList = data.data
        })
      },
			// 设置有效性
			setIdentification (num) {
				if(num == 0) {
					this.addForm.customerStatus = 1;
				}else {
					this.addForm.customerStatus = -1;
				}
			},
			getopportunitiesList () {
				this.tdText = '数据加载中...'
				API.salesOpportunities.list({page: 0, pageSize: 10000, customerId: this.detail.id}, (data) => {
					if(data.status) {
						if(data.data.content.length > 0) {
							this.opportunitiesList = data.data.content
							this.tdText = '';
						}else {
							this.tdText = '暂无需求数据'
						}
					}else {
						this.tdText = '暂无需求数据'
					}
				})
			},
			// 选择意向程度
			selectIntentionLevel (item) {
				if(item.customerIntentionLevel == 0) {
					this.dialogVisible = true;
					this.chanceId = item.id;
				}else {
					item.recorderFileUrl = '';
					item.recorderFileName = '';
					item.chatRecord = '';
					this.demand.recorderFileUrl = '';
					this.demand.recorderFileName = '';
					this.demand.chatRecord = '';
					this.fileList = [];
					this.apiIntentionLeverl(item);
				}
			},
			apiIntentionLeverl (item) {
				API.salesOpportunities.edit(item, (data) => {
					if(data.status) {
						this.$message({
							type: 'success',
							message: '设置意向程度成功',
							duration: 1000
						})
						if(this.dialogVisible) this.dialogVisible = false;
						this.getopportunitiesList();
					}
				})
			},
			// 关闭意向程度弹框
			handleClose (done) {
				this.chanceId = '';
				this.getopportunitiesList();
				done();
			},
			// 确定意向程度
			subIdentification () {
				let message = !this.demand.recorderFileUrl && '请上传证据文件' ||
				              !this.demand.chatRecord && '请输入描述信息' || null;
				if(message) {
					return this.$message({
						type: 'error',
						message,
						duration: 1500
					})
				};
				let _id = this.chanceId,
				    _list = this.opportunitiesList,
						_data = {};
				_list.forEach(a => {
					if(_id == a.id) {
						_data = a;
					}
				});
				this.apiIntentionLeverl(Object.assign({}, _data, this.demand));
			},
    },
    created () {
			this.getCodeConfig();
      this.getAreaOptionsData(null)
      this.getConfigData(2)
      this.getConfigData(5, 0)
      this.getSeaList()
      this.detail = JSON.parse(JSON.stringify(this.params.customer))
			this.getopportunitiesList();
			// console.log('detail', this.detail)
			if(this.detail) {
				let obj = this.detail;
				this.addForm.id = obj.id;
				this.addForm.name = obj.name;
				this.addForm.cate = obj.cate;
				this.addForm.cdKey = obj.cdKey;
				this.addForm.contactName = obj.contactName;
				this.addForm.phone = obj.phone;
				this.addForm.provinceId = obj.provinceId;
				this.addForm.cityId = obj.cityId;
				this.addForm.areaId = obj.areaId;
				this.addForm.provinceName = obj.provinceName;
				this.addForm.cityName = obj.cityName;
				this.addForm.areaName = obj.areaName;
				this.addForm.industry = obj.industry;
				this.addForm.seaId = obj.seaId;
				// console.log('addForm', this.addForm)
			}
      this.industryChangeHandle([])
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
	.line {
		width: 100%;
		height: 1px;
		margin: 15px 0;
		border-bottom: 1px dashed #e6e6e6;
	}
	.identification-ing {
		overflow: hidden;
		.identification-ing-img {
			float: left;
			width: 20px;
			height: 20px;
			margin-right: 10px;
			margin-bottom: 15px;
			margin-top: 5px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.identification-ing-title {
			float: left;
			font-size: 14px;
			color: #666666;
			line-height: 30px;
			font-weight: bold;
			margin-right: 30px;
		}
		.identification-ing-yes, .identification-ing-no {
			display: inline-block;
			width: 100px;
			height: 30px;
			line-height: 30px;
			font-size: 13px;
			color: #b9b9b9;
			text-align: center;
			border: 1px solid #dcdfe6;
			margin: 0 30px 0 0;
			cursor: pointer;
			border-radius: 5px;
			position: relative;
			img {
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
		.cur {
			border-color: #4BCF99;
			color: #4BCF99;
		}
	}
	.md10 {
		margin-bottom: 10px;
	}
	.com-titles {
		color: $font-color-1;
		font-size: 14px;
		font-weight: bold;
		position: relative;
		padding: 10px;
		display: inline-block;
		width: 100%;
		&:before {
			content: '';
			display: inline-block;
			width: 4px;
			height: 20px;
			background: $color-1;
			position: relative;
			top: 5px;
			left: 0px;
			margin-right: 10px;
		}
	}
</style>
