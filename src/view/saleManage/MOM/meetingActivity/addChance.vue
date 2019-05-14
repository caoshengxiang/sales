<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
			<div style='margin-left: 30px; width: calc(100% - 30px)' v-if='this.params.detail'>
				<table class='com-dialog-table'>
					<tr>
						<td class='td-title'>用户名</td>
						<td>{{detail.name}}</td>
						<td class='td-title'>联系人</td>
						<td>{{detail.contacter}}</td>
						<td class='td-title'>联系方式</td>
						<td>{{detail.contactPhone}}</td>
					</tr>
					<tr>
						<td class='td-title'>用户地区</td>
						<td>{{detail.provinceName + '-' + detail.cityName + '-' + detail.areaName}}</td>
						<td class='td-title'>用户报名来源</td>
						<td>{{detail.channelName}}</td>
						<td class='td-title'></td>
						<td></td>
					</tr>
					<tr>
						<td class='td-title'>备注信息</td>
						<td colspan="5">{{detail.remark}}</td>
					</tr>
					<tr>
						<td class='td-title'>用户意向信息</td>
						<td colspan="5">{{detail.applyIntentionName}}</td>
					</tr>
				</table>
				<p style='width: 100%;;border-top: 1px dashed #DDDDDD; line-height: 45px;color: #333E48;font-size: 14px;font-weight: bold;'>
					<img style='width: 18px;height:18px; float: left;margin-top: 14px;margin-right: 5px;' src="../../../../assets/icon/baomingedit.png" alt="">
					<span style='float:left;'>完善信息</span>
				</p>
			</div>
      <el-form class='el-form' :model="addForm" ref="addForm" label-width="100px">
				<el-row class="el-row-cla">
					<el-col :span="24">
						<el-form-item label='客户性质'>
							<el-radio v-model='addForm.customerCate' label="2">机构</el-radio>
							<el-radio v-model='addForm.customerCate' label="1">个人</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="el-row-cla">
					<el-col :span="8">
						<el-form-item label='客户名称'>
							<el-input type="text" placeholder='请填写客户名称' v-model="addForm.customerName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if='addForm.customerCate === "2"'>
						<el-form-item label='证件号码'>
							<el-input type="text" placeholder='请填写证件号码' v-model="addForm.customerBusinessLicense"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if='addForm.customerCate === "2"'>
						<el-form-item label='客户联系人'>
							<el-input type="text" v-model="addForm.contacter" placeholder='请填写客户联系人'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label='联系电话'>
							<el-input type="text" v-model="addForm.contactPhone" placeholder="请填写客户联系电话"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label='客户地区' prop="provinceId">
							<AreaSelect ref="areaSe"
													placeholder='请选择客户地区'
													:area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
													@change="areaSelectedOptionsHandleChange"
													:selectLastLevelMode="true"></AreaSelect>
						</el-form-item>
					</el-col>
					<el-col :span="8">
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
                :change-on-select="true"
                @change="industryChangeHandle"
                v-model="addForm.industryArr">
              </el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label='客户公海' prop="seaId">
							<el-select v-model.number="addForm.seaId" placeholder="请选择客户公海">
								<el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label='需求来源'>
							<el-cascader
								placeholder='请选择需求来源'
								:change-on-select="selectLastLevelMode"
								:options="chanceSourceType"
								v-model="chanceSourceArr"
								@active-item-change="chanceSourceChangeHandle"
								@change="chanceSourceChangeHandle"
								:props="props"
								:disabled="!!params.detail"
							>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label='需求提供人' prop="provider">
							<el-select v-model.number="addForm.provider" placeholder="请选择需求提供人">
								<el-option v-for="item in conferenceExecutiveList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="el-row-cla" v-if='!this.params.detail'>
					<el-col :span="24">
						<p style='width: calc(100% - 30px);border-top: 1px dashed #DDDDDD; line-height: 45px;color: #333E48;font-size: 14px;font-weight: bold;'>客户销售机会（为客户新建销售机会信息）</p>
					</el-col>
				</el-row>
				<el-row class="el-row-cla">
					<el-col :span="24">
						<el-form-item label='客户需求' prop="intentProductIds">
							<el-select v-model="addForm.intentProductIds"
							           style='width: 100%'
												 multiple
												 :multiple-limit="5"
												 placeholder="请选择意向的商品 可多选">
								<el-option v-for="item in intentProductList" :key="item.id" :label="item.goodsName"
													 :value="item.goodsId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
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
  import webStorage from 'webStorage'
  import { chartLengthRule } from '../../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
		dialogVisibles: false,
		conferenceExecutiveList: [],         //所有需求提供人
		detail: {},                          //编辑时的详情
        addForm: { // 添加表单
			customerCate: '2',               //客户性质 1个人 2企业
			customerName: '',                //客户名称
			customerBusinessLicense: '',     //证件号码
			contacter: '',                   //客户联系人
			contactPhone: '',                //联系电话
			industry: '',                    //客户行业
			intentProductIds: [],            //商品id
			intentProductNames: [],          //商品名称
			provider: '',                    // 需求提供人
			seaId: '',                       // 客户公海
			chanceSource: '',                //需求来源
			applyUserId: '',                 //报名用户id
			chanceSourceName: '',            //报名用户name
			meetingId: '',                   //会议id
			// customerId: '',
			// state: 2, // 阶段，默认
			// intentProductCate: '2', // 分类，新需求没有这个
			// intentProductCateName: '2',
			provinceId: '',
			cityId: '',
			areaId: '',
			// billDate: '',
			// intentBillAmount: '',
			// chanceRemark: '',
			pageSource: 1,                    // 公海添加机会，传2. 其他传1
			addType: 1,                       // 1主动添加 2扫活动二维码 3扫商务管家二维码
			isMeetingAdd: true,               //来源标识
          industryArr: [],
        },
        providerName: '',
        customersList: [],
        salesState: [],
        intentProductCateList: [],
        intentProductList: [],
        industryList: [],                     // 行业
        seaList: [],                          //客户公海
        staffList: [],                        // 机构用户
        chanceSourceType: [],                 // 客户来源
        chanceSourceArr: [],
        industryType: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        // selectedBindValue: [],
        selectLastLevelMode: true,
        area: ''
      }
    },
	watch: {
		'addForm.customerCate' () {
			let servicePrincipalType = this.addForm.customerCate === '1' ? 'Person' : 'Company';
			this.addForm.intentProductIds = [];
			this.getIntentProductList({goodsTypeId: null, goodsName: null, servicePrincipalType})
		}
	},
    props: ['params'],
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
		// 获取所有需求提供人
		getAllStaff () {
			API.activity.staffZX('', (data) => {
				if(data.status) {
					this.conferenceExecutiveList = data.data;
				}
			})
		},
      saveSubmitForm (formName) {
			let message = !this.addForm.customerName && '请输入客户名称' ||
						  (this.addForm.customerCate === '2' && !this.addForm.customerBusinessLicense) && '请输入客户证件号' ||
										(this.addForm.customerCate === '2' && !this.addForm.contacter) && '请输入客户联系人' ||
										!this.addForm.contactPhone && '请输入客户联系电话' ||
										(!this.addForm.provinceId || !this.addForm.cityId || !this.addForm.areaId) && '请选择客户地区' ||
										!this.addForm.industryArr && '请选择客户行业' ||
										!this.addForm.seaId && '请选择客户公海' ||
										!this.addForm.chanceSource && '请选择需求来源' ||
										!this.addForm.provider && '请选择需求提供人' ||
										this.addForm.intentProductIds.length < 1 && '请选择客户意向商品' || null;

				if(message) {
					this.$message({
						type: 'error',
						message,
						duration: 1000
					})
					return;
				}
				this.dataLoading = true
				this.addForm.meetingId = this.params.meetingId
				this.addForm.meetingSaleCreator = this.params.meetingCreatorId
        this.addForm.intentProductNames = [];
				if(this.addForm.intentProductIds.length > 0 && this.intentProductList.length > 0) {
					this.addForm.intentProductIds.forEach(a => {
						this.intentProductList.forEach(b => {
							if(a == b.goodsId) {
								this.addForm.intentProductNames.push(b.goodsName);
							}
						})
					})
				}
                this.addForm.industry = this.addForm.industryArr.join(',')
				if (this.params.detail) { // 编辑
					API.activity.addChance2(this.addForm, (data) => {
						if (data.status) {
							this.$message.success('审核成功')
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
				} else {
					this.addForm.chanceSourceName = this.traverseTree(this.addForm.chanceSource)
					// this.addForm.intentProductIds = this.addForm.intentProductIds.map(a => a).join()
					console.log(this.addForm);
					API.activity.addChance2(this.addForm, (data) => {
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
				}
      },
      selectedcustomer (value) {   //选择客户后
        let _id = value, _cate;
        this.customersList.forEach(a => {
          if(_id == a.id) {
            _cate = a.cate
          }
        })

        // if (this.params.detail) { // 编辑
        //   this.addForm = this.params.detail // 需要根据分类id获取商品列表进行展示
        //   this.area = this.addF
        //   this.getIntentProductList({goodsTypeId: this.addForm.intentProductCate, servicePrincipalType})
        // }
      },
      getCustomersList () { // 当前登陆用户所有的拥有团队成员权限的客户信息
        API.customer.teamAboutCustomerlist(null, data => {
          if (data.status) {
            this.customersList = data.data

            // 客户详情快捷添加销售机会时默认有客户调取商品
            if(this.params.detail.customerId > 0) {
              let _cate = '';
              if(this.customersList.length > 0) {
                let _list = this.customersList;
                _list.forEach(a => {
                  if(this.params.detail.customerId == a.id) {
                    _cate = a.cate;
                  }
                })
              }
              let servicePrincipalType = _cate == 1 ? 'Person' : 'Company';
              this.getIntentProductList({goodsTypeId: null, goodsName: null, servicePrincipalType})
            }
          }
        })
      },
      getIntentProductCateList () {
        API.external.goodsTypeList((data) => {
          this.intentProductCateList = data.content
        })
      },
      getIntentProductList (p) {
        API.common.organizationGoodsConf({ // 这个接口该来不调用外部接口
          goodsTypeId: p.goodsTypeId,
          goodsName: p.goodsName,
          servicePrincipalType: p.servicePrincipalType,
          organizationId: webStorage.getItem('userInfo').organizationId,
          saleable: 1,
		      status: 1,
          pullOff: false
        }, (data) => {
          this.intentProductList = data.data
        })
      },
      intentProductCateChangeHandle (id) { // 分类
        this.getIntentProductList({goodsTypeId: id}) // 分类id获取商品
        this.addForm.intentProductNames = ''
        this.addForm.intentProductIds = ''
        this.intentProductCateList.forEach(item => {
          if (item.objectId === id) {
            this.addForm.intentProductCateName = item.name
          }
        })
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, (data) => {
          if (type === 2) {
            this.levelList = data.data
          } else if (type === 3) {
            this.industryList = data.data
          } else if (type === 5) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if (this.chanceSourceType.length === 0) {
              this.chanceSourceType = arr
            } else {

            }
          }
        })
      },
      chanceSourceChangeHandle (va) {
        this.getLastItem(this.chanceSourceType, va, 'id')
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
        this.addForm.chanceSource = va.join('-')
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
      // chanceSourceChange (va) {
      //   this.addForm.chanceSource = va.join('-')
      // },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            // this.selectedBindValue.push(item[key])
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
	  // 获取完善中的客户来源
	  getApplyUserScource (data) {
		  API.activity.applyUserSourceZX(data, (data) => {
			  console.log(this.chanceSourceArr, this.chanceSourceType)
			  if(data.status) {
				  this.chanceSourceArr.push(data.data.id)
				  this.chanceSourceType.push({id: data.data.id, codeName: data.data.name})
				  this.addForm.chanceSource = JSON.stringify(data.data.id);
				  this.addForm.chanceSourceName = data.data.name;
			  }
		  })
	  },
      billDateChangeHandle (t) {
      },
      getSeaList () { // 客户公海
        API.customerSea.seaslist((data) => {
          this.seaList = data.data
        })
      },
      getStaffList () { // 用户信息
        API.user.listOrgUser((data) => {
          this.staffList = data.data
        })
      },
      treeGetName (id, node) { // 遍历树获取名称
        if (!node) {
          return ''
        }
        if (node && node.length > 0) {
          var i = 0
          for (i = 0; i < node.length; i++) {
            if (id === node[i].id) {
              this.sourceNameArr.push(node[i].codeName)
              return node[i].codeName
            } else {
              this.treeGetName(id, node[i].children)
            }
          }
        }
      },
      traverseTree (source, node) { // 遍历树
        if (!source) {
          return
        }
        let sourceArr = source.split('-')
        this.sourceNameArr = [] // 初始
        sourceArr.forEach((item, index) => {
          this.treeGetName(parseInt(item, 10), this.chanceSourceType)
        })
        return this.sourceNameArr.join('-')
      },
    },
    created () {
      // this.providerName = this.params.meetingCreatorName
      // this.addForm.provider = this.params.meetingCreatorId
      this.getCustomersList()
      // this.getIntentProductCateList() // 新需求，没有分类
      // this.getIntentProductList({goodsTypeId: null, goodsName: null})
      this.salesState = this.params.salesState

			 let servicePrincipalType = this.addForm.customerCate === '1' ? 'Person' : 'Company';
			 this.getIntentProductList({goodsTypeId: null, goodsName: null, servicePrincipalType})

      if (this.params.detail) { // 编辑
		// console.log(this.params.detail)
		this.detail = this.params.detail;
		this.addForm.applyUserId = this.detail.id;
		// console.log(this.addForm, this.params.detail)
		this.addForm.isMeetingAdd = false;
		this.getApplyUserScource({name: this.detail.channelName, source: this.detail.channelSource});
        // this.addForm = this.params.detail // 需要根据分类id获取商品列表进行展示
        // this.area = this.addF
        // this.getIntentProductList({goodsTypeId: null, goodsName: null, servicePrincipalType})
      }
      if (this.params.stateValue) { // 设置默认2，销售阶段；[公海1]
        this.addForm.state = this.params.stateValue
        this.addForm.pageSource = 2 // 公海添加机会，传2. 其他传1
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
      }
      // 来源
      this.getConfigData(5, 0)
      this.getSeaList()
	  this.getAllStaff()
      this.industryChangeHandle([])
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

	.sponsor-unit-left-selects {
		display: inline-block;
		height: 33px;
		margin-top: 14px;
		color: #2587e0;
		font-size: 14px;
		cursor: pointer;
	}
</style>
