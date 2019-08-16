<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <el-select :disabled="params.detailCustomersId?true:false"
                           filterable
                           v-model.number="addForm.customerId"
                           @change="selectedcustomer"
                           placeholder="请选择客户" style="width: 100%">
                  <el-option v-for="item in customersList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <!--<td class="td-title">意向商品分类</td>-->
            <!--<td class="td-text">-->
            <!--<el-form-item prop="intentProductCate">-->
            <!--<el-select v-model.number="addForm.intentProductCate" @change="intentProductCateChangeHandle"-->
            <!--placeholder="请选择意向商品分类" style="width: 100%">-->
            <!--<el-option v-for="item in intentProductCateList" :key="item.objectId" :label="item.name"-->
            <!--:value="item.objectId"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</td>-->
            <td class="td-title">意向商品</td>
            <td class="td-text">
              <el-form-item prop="intentProductId">
                <el-select v-model.number="addForm.intentProductId"
                           filterable
                           @change="intentProductIdChangeHandle"
                           placeholder="请选择意向商品" style="width: 100%">
                  <el-option v-for="item in intentProductList" :key="item.id" :label="item.goodsName"
                             :value="item.goodsId"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <!--<td class="td-title">需求阶段</td>-->
            <!--<td class="td-text">-->
            <!--<el-form-item prop="state">-->
            <!--<el-select :disabled="true" v-model.number="addForm.state" placeholder="" style="width: 100%">-->
            <!--<el-option v-for="item in salesState" :key="item.type" :label="item.value + item.percent"-->
            <!--:value="item.type" v-if="item.type !== -1"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</td>-->
          </tr>
          <tr>
            <td class="td-title">联系人</td>
            <td class="td-text">
              <el-form-item prop="contacter">
                <el-input type="text" v-model="addForm.contacter"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系电话</td>
            <td class="td-text">
              <el-form-item prop="contactPhone">
                <el-input type="text" v-model="addForm.contactPhone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">地区</td>
            <td class="td-text">
              <el-form-item prop="provinceId">
                <AreaSelect ref="areaSe"
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
              </el-form-item>
            </td>
            <td class="td-title">行业</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.industry">-->
              <el-form-item prop="industryArr">
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
            </td>
          </tr>
          <tr>
            <td class="td-title">预计签单时间</td>
            <td class="td-text">
              <el-form-item prop="billDate">
                <el-date-picker
                  @change="billDateChangeHandle"
                  style="width: 100%"
                  v-model="addForm.billDate"
                  type="datetime"
                  placeholder="选择时间">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">预计签单金额</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.industry">-->
              <el-form-item prop="intentBillAmount">
                <!--<el-input type="number" minlength="0" v-model.number="addForm.intentBillAmount"></el-input>-->
                <el-input-number style="width: 100%" v-model="addForm.intentBillAmount" :precision="2" :step="1"
                                 :min="0"></el-input-number>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">需求公海</td>
            <td class="td-text">
              <el-form-item prop="chanceSeaId">
                <el-select v-model.number="addForm.chanceSeaId" placeholder="请选择需求公海" style="width: 100%;">
                  <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">需求提供人</td>
            <td class="td-text">
              <el-form-item prop="provider">
                <el-select :disabled="(addForm.provider && params.detail)?true:false"
                           v-model="addForm.provider" filterable clearable  placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in staffList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">需求来源</td>
            <td class="td-text" colspan="3">
              <el-cascader
                style="width: 100%"
                :change-on-select="selectLastLevelMode"
                :options="chanceSourceType"
                v-model="chanceSourceArr"
                @active-item-change="chanceSourceChangeHandle"
                @change="chanceSourceChangeHandle"
                :props="props"
                :placeholder="addForm.chanceSourceName"
                :disabled="!!params.detail"
              >
              </el-cascader>
            </td>
          </tr>
          <tr>
            <td class="td-title">需求描述</td>
            <td class="td-text" colspan="3">
              <el-form-item prop="chanceRemark">
                <el-input type="text" v-model="addForm.chanceRemark"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
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
        addForm: { // 添加表单
          customerId: '',
          state: 2, // 阶段，默认
          // intentProductCate: '', // 分类，新需求没有这个
          // intentProductCateName: '',
          intentProductId: '', // 商品
          intentProductName: '',
          contacter: '',
          contactPhone: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          industry: '', // 行业
          chanceSeaId: '', // 需求公海
          billDate: '',
          intentBillAmount: '',
          chanceRemark: '',
          pageSource: 2, // 公海添加需求，传2. 其他传1
          chanceSource: '',
          provider: '', // 需求提供人
        },
        staffList: [], // 机构用户
        customersList: [],
        salesState: [],
        intentProductCateList: [],
        intentProductList: [],
        seaList: [], // 公海
        showList: [],
        rules: {
          customerId: [
            // {required: true, message: '请输入客户名称', trigger: 'blur'},
          ],
          state: [
            // {required: true, message: '请选择需求阶段', trigger: 'change'},
          ],
          billDate: [
            {required: true, message: '请选择预计签单时间', trigger: 'change'},
            chartLengthRule.validateBeforeTime,
          ],
          intentBillAmount: [
            {required: true, message: '请输入预计签单金额', trigger: 'blur'},
          ],
          intentProductCate: [
            // {required: true, message: '请选择意向商品分类', trigger: 'change'},
          ],
          intentProductId: [
            {required: true, message: '请选择意向商品', trigger: 'change'},
          ],
          chanceRemark: [
            // {required: true, message: '请输入需求描述', trigger: 'blur'},
          ],
          contacter: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          contactPhone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            chartLengthRule.validatePhone,
          ],
          provinceId: [
            {required: true, message: '请选择地区', trigger: 'blur'},
          ],
          industryArr: [
            {required: true, message: '请选择行业', trigger: 'change'},
          ],
          chanceSeaId: [
            {required: true, message: '请选择需求公海', trigger: 'change'},
          ],
          provider: [
            {required: true, message: '请选择需求提供人', trigger: 'change'},
          ],
        },
        chanceSourceType: [], // 客户来源
        chanceSourceArr: [],
        industryType: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        // selectedBindValue: [],
        selectLastLevelMode: true,
      }
    },
    props: ['params'],
    methods: {
      areaSelectedOptionsHandleChange (value) {
        this.addForm.provinceId = value[0] || ''
        this.addForm.cityId = value[1] || ''
        this.addForm.areaId = value[2] || ''
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addForm.industry = this.addForm.industryArr.join(',')
            // 防止老数据可能选择的不是对应的商品而保存时获取商品id
            // let _cusid = this.addForm.intentProductId;
            // if(typeof(_cusid) === 'string') {
            //   if(this.showList.length > 0) {
            //     this.showList.forEach(pro => {
            //       if(_cusid === pro.goodsName) {
            //         this.addForm.intentProductId = pro.goodsId
            //       }
            //     })
            //   }
            // }

            this.dataLoading = true
            if (this.params.detail) { // 编辑
              API.salesOpportunitiesSea.editChance(this.addForm, (data) => {
                if (data.status) {
                  this.$message.success('编辑成功')
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
              API.salesOpportunitiesSea.addChance(this.addForm, (data) => {
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
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCustomersList () { // 当前登陆用户所有的拥有团队成员权限的客户信息
        API.customer.teamAboutCustomerlist(null, data => {
          if (data.status) {
            this.customersList = data.data

            if (this.params.detail) { // 编辑
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
      selectedcustomer (value) {   //选择客户后
        let _id = value, _cate;
        this.customersList.forEach(a => {
          if(_id == a.id) {
            _cate = a.cate
          }
        })
        let servicePrincipalType = _cate == 1 ? 'Person' : 'Company';
        this.addForm.intentProductId = '';
        // 新需求，没有分类
        this.getIntentProductList({goodsTypeId: null, goodsName: null, servicePrincipalType})

        // if (this.params.detail) { // 编辑
        //   this.addForm = this.params.detail // 需要根据分类id获取商品列表进行展示
        //   this.area = this.addF
        //   this.getIntentProductList({goodsTypeId: this.addForm.intentProductCate, servicePrincipalType})
        // }
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
          // this.intentProductList = data.data
					//动态获取商品时如果是编辑会把原来选择过的一条商品信息加入，并进行去重，如果没有该商品则进行数组合并展示否则直接展示数据
					let _new = data.data, _old = this.showList, isHas = 0;
					if(_old.length > 0 && _new.length > 0) {
						_new.forEach(a => {
							_old.forEach(b => {
								if(a.goodsId == b.goodsId) {
									isHas = 1;
								}
							})
						})
					}else {
						isHas = 0;
					}
					if(isHas) {
						this.intentProductList = _new;
					}else {
						this.intentProductList = [..._new, ..._old]
					}

        })
      },
      intentProductIdChangeHandle (id) { // 商品下拉改变
        this.intentProductList.forEach(item => {
          if (item.goodsId === id) {
            this.addForm.intentProductName = item.goodsName
          }
        })
      },
      intentProductCateChangeHandle (id) { // 分类
        this.getIntentProductList({goodsTypeId: id}) // 分类id获取商品
        this.addForm.intentProductName = ''
        this.addForm.intentProductId = ''
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
          } else if (type === 5) {
            // let arr = data.data.map((item) => {
            //   item.children = []
            //   return item
            // })
            if (this.params.detail) {
              // alert('确认需求')
            } else {
              if (this.chanceSourceType.length === 0) {
                // this.chanceSourceType = arr
                // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
                // 其他模块中新增调取销售自建，
                // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
                this.chanceSourceType = [
                  { // 公司资源
                    codeName: this.params.topSource[2].name,
                    id: this.params.topSource[2].value,
                    children: [],
                  }]
                // this.selectedBindValue.push(this.topSource[0].value)
                this.chanceSourceArr.push(this.params.topSource[2].value)
                this.chanceSourceChangeHandle([this.params.topSource[2].value]) // 默认获取第二级
              }
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
        console.log(va)
        this.addForm.chanceSource = va.join('-')
      },
      industryChangeHandle (va) {
        let parentId, that = this;
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
      billDateChangeHandle (t) {
      },
      getSeaList () { // 需求公海
        API.salesOpportunitiesSea.listAboutCustomer((data) => {
          this.seaList = data.data
        })
      },
      getStaffList () { // 用户信息
        API.user.listOrgUser((data) => {
          this.staffList = data.data
        })
      },
    },
    created () {
      this.getCustomersList()
      // this.getIntentProductCateList()
      // this.getIntentProductList({goodsTypeId: null, goodsName: null})
      this.salesState = this.params.salesState
      if (this.params.detail) { // 编辑
        let servicePrincipalType = this.params.detail.customerId == 1 ? 'Person' : 'Company';
        this.addForm = this.params.detail // 需要根据分类id获取商品列表进行展示
				this.$set(this.addForm, 'industryArr', []);//给默认值
        // this.addForm.intentProductId = this.params.detail.intentProductName;
				// 防止老数据可能选择的不是对应的商品而保存时获取商品id 动态添加一条商品信息
				this.showList = [{goodsId: this.params.detail.intentProductId, goodsName: this.params.detail.intentProductName}];

        // this.getIntentProductList({goodsTypeId: this.addForm.intentProductCate})
        this.getIntentProductList({goodsTypeId: null, goodsName: null, servicePrincipalType})
      }
      if (this.params.stateValue) { // 设置默认2，销售阶段；[公海1]
        this.addForm.state = this.params.stateValue
        this.addForm.pageSource = 2 // 公海添加需求，传2. 其他传1
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
      }
      // 来源
      this.getConfigData(5, 0)
      this.getSeaList()
      this.getStaffList()
      this.industryChangeHandle([])


      // 防止老数据可能选择的不是对应的商品而保存时获取商品id 调取所有商品
      // API.common.organizationGoodsConf({
      //   organizationId: webStorage.getItem('userInfo').organizationId,
      //   saleable: 1,
      // }, (data) => {
      //   this.showList = data.data;
      // })
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
