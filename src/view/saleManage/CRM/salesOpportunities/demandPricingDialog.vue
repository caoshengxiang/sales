<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules" :disabled="orderState>0?true:false">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">签约客户</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <el-select @change="customerChange"
                           :disabled="(orderState === 0 || params.detailCustomersId)?true:false"
                           v-model.number="addForm.customerId" placeholder="请选择客户" style="width: 100%">
                  <el-option v-for="item in customersList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <td class="td-title">客户签单联系人</td>
            <td class="td-text">
              <el-form-item prop="contacterId">
                <el-select style="width: 100%" v-model.number="addForm.contacterId" placeholder="请选择签单联系人">
                  <el-option v-for="item in contactList" :key="item.id" :label="item.contacterName"
                             :value="item.id"></el-option>
                </el-select>
                <!--<el-input type="text" :disabled="true" :placeholder="'['+addForm.contacter+']'+addForm.contactPhone"></el-input>-->
              </el-form-item>
            </td>
            <td class="td-title">平台签约主体</td>
            <td class="td-text">
              <el-form-item prop="contractSubjectId">
                <el-select style="width: 100%" v-model.number="addForm.contractSubjectId"
                           placeholder="请选择签约主体">
                  <el-option v-for="item in contractSubjects" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">客户地区</td>
            <td class="td-text">
              <el-form-item prop="areaId">
                <!-- <span v-if="(orderState===0 || addForm.chanceId || params.fromChance)">{{(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')}}</span> -->
                <AreaSelect ref="areaSe"
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
              </el-form-item>
            </td>
            <td class="td-title">意向商品</td>
            <td class="td-text">
              <el-form-item prop="productId">
                <el-select style="width: 100%"
                           :disabled="(orderState===0 || addForm.chanceId || params.fromChance)?true:false"
                           v-model.number="addForm.productId"
                           @change="goodSelectChange"
                           placeholder="请选择购买商品">
                  <el-option v-for="item in allGoodsList" :key="item.goodsId" :label="item.goodsName"
                             :value="item.goodsId"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">商品规格</td>
            <td class="td-text">
              <el-form-item prop="specificationId">
                <el-select style="width: 100%" @change="specificationChange" v-model.number="addForm.specificationId"
                           placeholder="请选择购买规格">
                  <el-option v-for="item in productsList" :key="item.objectId" :label="item.name"
                             :value="item.objectId"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">商品数量</td>
            <td class="td-text">
              <el-form-item prop="quantity">
                <el-input-number style="width: 100%" v-model="addForm.quantity" :min="1" :max="100"
                                 label="请输入购买数量"></el-input-number>
              </el-form-item>
            </td>
            <td class="td-title">签单金额</td>
            <td class="td-text" colspan="3">
              <el-form-item prop="billAmount">
                <el-input disabled style="width: 100%" placeholder="签单金额" v-model='addForm.billAmount'></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">需求来源</td>
            <td class="td-text">
              <el-cascader
                :disabled="(addForm.chanceId || params.fromChance)?true:false"
                style="width: 100%"
                :change-on-select="selectLastLevelMode"
                :options="orderSourceType"
                v-model="orderSourceArr"
                @active-item-change="orderSourceChangeHandle"
                @change="orderSourceChangeHandle"
                :props="props"
                :placeholder="addForm.orderSourceName"
              >
              </el-cascader>
            </td>
            <td class="td-title">需求提供人</td>
            <td class="td-text">
              <el-form-item prop="provider">
                <el-select style="width: 100%" filterable clearable
                           :disabled="(orderState===0 || addForm.chanceId || params.fromChance)?true:false"
                           v-model.number="addForm.provider"
                           placeholder="请选择需求提供人">
                  <el-option v-for="item in allProviderList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">需求跟进人</td>
            <td class="td-text">
              <span>{{addForm.salerName}}</span>
            </td>
          </tr>
          <tr>
          </tr>
          <tr>
            <td class="td-title">订单备注</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="remark">
                <el-input type="text" v-model="addForm.remark"></el-input>
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
  // import { mapState } from 'vuex'
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false, // loading
        customersList: [], // 客户列表
        chanceList: [], // 客户对应的机会列表
        contactList: [], // 客户对应的联系人列表
        productsList: [], // 产品【规格】列表
        contractSubjects: [], // 签约主体
        allProviderList: [], // 需求提供人列表
        allGoodsList: [],
        productIds: '',
        addForm: { // 添加表单
          customerId: '',
          contacterId: '',
          chanceId: '',
          productId: '',
          productName: '',
          billAmount: '',
          provider: '',
          providerName: '',
          specificationId: '',
          specificationName: '',
          contractSubjectId: '',
          salerId: '',
          salerName: '',
          quantity: '',
          remark: '',
          orderSource: '',
          isRenew: null,
          provinceId: '',
          provinceName: '',
          cityId: '',
          areaId: '',
          cityName: '',
          areaName: '',
        },
        orderState: null,
        rules: {
          customerId: [
            {required: true, message: '请选择签约客户', trigger: 'change'},
          ],
          contacterId: [
            {required: true, message: '请选择客户签单联系人', trigger: 'change'},
          ],
          areaId: [
            {required: true, message: '请选择三级地区', trigger: 'change'},
          ],
          specificationId: [
            {required: true, message: '请选择商品规格', trigger: 'change'},
          ],
          contractSubjectId: [
            {required: true, message: '请选择平台签约主体', trigger: 'change'},
          ],
          quantity: [
            {required: true, message: '请输入商品数量', trigger: 'blur'},
          ],
          billAmount: [
            {required: true, message: '请输入签单金额', trigger: 'blur'},
          ],
          provider: [
            {required: true, message: '请选择需求提供人', trigger: 'change'},
          ],
        },
        orderSourceType: [], // 客户来源
        orderSourceArr: [],
        billMount: 0,
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        // selectedBindValue: [],
        selectLastLevelMode: true,
      }
    },
    computed: {
      listenChange () {
        const {areaId, specificationId} = this.addForm;
        const {productIds} = this;
        return {areaId, productIds, specificationId}
      }
    },
    watch: {
      listenChange (val) {
        if(val.areaId && val.productIds && val.specificationId) {
          this.getBillPrice(val);
        }
      },
      'addForm.quantity' (val) {
        console.log(val)
        if(val > 0) {
          this.addForm.billAmount = val * this.billMount;
        }
      }
    },
    props: ['params'],
    methods: {
      // 获取签单金额
      getBillPrice (item) {
        console.log(1)
        let that = this;
        let params = {
          areaId: item.areaId,
          IntentProductId: item.productIds,
          specificationId: item.specificationId,
        };
        API.salesOpportunities.getSigningAmountZX(params, (data) => {
          console.log(data)
          if(data.status) {
            that.billMount = data.data;
            that.addForm.billAmount = that.addForm.quantity * data.data;
          }
        })
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addForm.productId = this.productIds;
            this.dataLoading = true
            if (this.params.orderDetail) { // 编辑
              API.salesOrder.edit({path: this.addForm.id, body: this.addForm}, (da) => {
                if(!da.status) {
                  this.addForm.productId = this.addForm.productName;
                }
                setTimeout(() => {
                  this.dataLoading = false
                  if (da.status) {
                    this.$message.success('添加成功')
                    this.$vDialog.close({type: 'save'})
                  }
                }, 500)
              })
            } else {
              API.salesOrder.add(this.addForm, (da) => {
                if(!da.status) {
                  this.addForm.productId = this.addForm.productName;
                }
                setTimeout(() => {
                  this.dataLoading = false
                  if (da.status) {
                    this.$message.success('添加成功')
                    this.$vDialog.close({type: 'save'})
                  }
                }, 500)
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

            // 客户详情快捷添加销售机会时默认有客户调取商品
            if(this.params.detailCustomersId > 0) {
              let _cate = '';
              if(this.customersList.length > 0) {
                let _list = this.customersList;
                _list.forEach(a => {
                  if(this.params.detailCustomersId == a.id) {
                    _cate = a.cate;
                  }
                })
              }
              let servicePrincipalType = _cate == 1 ? 'Person' : 'Company';
              this.getAllGoodsList({goodsTypeId: null, servicePrincipalType})
            }
          }
        })
      },
      getChanceList (customerId) { // 签单客户对应的机会中【需过滤：操作人为销售机会的销售跟进人[更进人就是销售人]的销售机会列表】
        API.salesOpportunities.list({customerId: customerId, pageSize: 10000, stage: -2}, (da) => {
          this.chanceList = da.data.content
          let userId = webStorage.getItem('userInfo').id
          this.chanceList = this.chanceList.filter(item => {
            return item.salerId === userId
          })
          if (this.params.detailChanceId) { // 销售机会详细页面，添加订单
            this.addForm.chanceId = this.params.detailChanceId
            this.intentProductChange() // 对应购买商品
          }

          // this.chanceList.forEach(item => {
          //   console.log(13, item)
          //   this.productIds = item.intentProductId
          //   this.addForm.productId = item.intentProductName
          // })
        })
      },
      getContactList (customerId) {
        API.contacts.list({customerId: customerId, pageSize: 10000}, (da) => {
          this.contactList = da.data.content
          // this.contactTotal = da.data.totalElements
        })
      },
      getAllGoodsList (p) { // 获取所有分类商品
        API.common.organizationGoodsConf({ // 这个接口改来不调用外部接口
          goodsTypeId: null,
          servicePrincipalType: p.servicePrincipalType,
          organizationId: webStorage.getItem('userInfo').organizationId,
          saleable: 1,
					status: 1,
          pullOff: false
        }, (da) => {
          this.allGoodsList = da.data
        })
      },
      getAllProviderList () { // 获取所有需求提供人
        API.user.listOrgUser((data) => {
          this.allProviderList = data.data
        })
      },
      getProductsList (goodsId) { // 产品【规格】列表
        API.external.getProducts({goodsId: goodsId}, (data) => {
          this.productsList = data.content
        })
        // 清除规格
        // this.addForm.specificationId = ''
        // this.addForm.specificationName = ''
      },
      getContractSubjects (id) {
        API.common.contractSubjects({goodsId: id}, da => {
          this.contractSubjects = da.data
        })
        // 清除签约主体
        // this.addForm.contractSubjectId = ''
      },
      intentProductChange () { // 机会change
        this.chanceList.forEach(item => {
          if (item.id === this.addForm.chanceId) {
            this.productIds = item.intentProductId
            this.addForm.productId = item.intentProductName
            this.addForm.productName = item.intentProductName

            this.addForm.provinceId = item.provinceId
            this.addForm.cityId = item.cityId
            this.addForm.areaId = item.areaId
            this.addForm.provinceName = item.provinceName
            this.addForm.cityName = item.cityName
            this.addForm.areaName = item.areaName
            this.addForm.billAmount = item.billAmount

            this.addForm.contacter = item.contacter
            this.addForm.contactPhone = item.contactPhone
            this.addForm.provider = item.provider
            // 清除规格
            this.addForm.specificationId = ''
            this.addForm.specificationName = ''
            // 清除签约主体
            this.addForm.contractSubjectId = ''
            // 对应的规格列表
            this.getProductsList(item.intentProductId)
            // 对应的签约主体
            this.getContractSubjects(item.intentProductId)
            // 重置来源
            this.orderSourceArr = item.chanceSource.split('-') // 获取机会对应来源
            this.addForm.orderSource = item.chanceSource
            this.addForm.orderSourceName = item.chanceSourceName || '' // 获取机会对应来源
          }
        })
      },
      goodSelectChange (id) { // 直接选择商品获取名称
        this.allGoodsList.forEach(item => {
          if (item.goodsId === id) {
            this.addForm.productName = item.goodsName
            this.productIds = item.goodsId;
          }
        })
        // 清除规格
        this.addForm.specificationId = ''
        this.addForm.specificationName = ''
        // 清除签约主体
        this.addForm.contractSubjectId = ''

        // 对应的规格列表
        this.getProductsList(id)
        // 对应的签约主体
        this.getContractSubjects(id)
      },
      specificationChange () { // 规格change
        this.productsList.forEach(item => {
          if (item.objectId === this.addForm.specificationId) {
            this.addForm.specificationName = item.name
          }
        })
      },
      customerChange (value) { // 客户对应的机会和联系人
        this.getChanceList(this.addForm.customerId)
        this.getContactList(this.addForm.customerId)

        let _id = value, _cate;
        this.customersList.forEach(a => {
          if(_id == a.id) {
            _cate = a.cate
          }
        })
        let servicePrincipalType = _cate == 1 ? 'Person' : 'Company';
        this.addForm.intentProductId = '';
        // 新需求，没有分类
        this.getAllGoodsList({goodsTypeId: null, servicePrincipalType})

        // 清除其他联动数据
        this.productIds = '';
        this.addForm = { // 添加表单
          customerId: this.addForm.customerId,
          contacterId: '',
          chanceId: '',
          productId: '',
          provider: '',
          productName: '',
          billAmount: '',
          specificationId: '',
          specificationName: '',
          contractSubjectId: '',
          quantity: '',
          remark: '',
          orderSource: this.orderSourceArr.join('-'),
          // isRenew: this.params.orderDetail || false,
          isRenew: null,
          provinceId: this.addForm.provinceId,
          cityId: this.addForm.cityId,
          areaId: this.addForm.areaId,
          provinceName: this.addForm.provinceName,
          cityName: this.addForm.cityName,
          areaName: this.addForm.areaName,
        }
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
            if (this.orderSourceType.length === 0) {
              // this.orderSourceType = arr
              // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
              // 其他模块中新增调取销售自建，
              // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
              this.orderSourceType = [
                { // 销售自建
                  codeName: this.params.topSource[0].name,
                  id: this.params.topSource[0].value,
                  children: [],
                }]
              // this.selectedBindValue.push(this.topSource[0].value)
              this.orderSourceArr.push(this.params.topSource[0].value)
              this.orderSourceChangeHandle([this.params.topSource[0].value]) // 默认获取第二级
            }
          }
        })
      },
      orderSourceChangeHandle (va) {
        this.getLastItem(this.orderSourceType, va, 'id')
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
        this.addForm.orderSource = va.join('-')
      },
      // orderSourceChange (va) {
      //   this.addForm.orderSource = va.join('-')
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
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.addForm.provinceId = value[0] || ''
        this.addForm.cityId = value[1] || ''
        this.addForm.areaId = value[2] || ''
        this.addForm.provinceName = name[0] || ''
        this.addForm.cityName = name[1] || ''
        this.addForm.areaName = name[2] || ''
      },
    },
    created () {
      this.getCustomersList()
      // this.getAllGoodsList()
      this.getAllProviderList()
      if (this.params.orderDetail) { // 编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.orderDetail))
        this.getChanceList(this.params.orderDetail.customerId)
        this.getProductsList(this.params.orderDetail.productId)
        this.getContractSubjects(this.params.orderDetail.productId) // 签约主体
        this.getContactList(this.params.orderDetail.customerId)
        this.orderState = this.params.orderDetail.orderState // 订单状态 【销售订单-修改，预下订单后，客户、机会、商品信息不可更改，客户签单后，所有信息都不可修改】
        this.addForm.productId = this.params.orderDetail.productName;
        this.productIds = this.params.orderDetail.productId;
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
        this.getChanceList(this.params.detailCustomersId)
        this.getContactList(this.params.detailCustomersId)
      }
      if(this.params.team) {
        this.addForm.salerName = this.params.team.salerName;
        this.addForm.salerId = this.params.team.salerId;
      }

      // 来源
      this.getConfigData(5, 0)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
