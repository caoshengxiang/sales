<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules" :disabled="orderState>0?true:false">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">签单客户</td>
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

            <td class="td-title">签单联系人</td>
            <td class="td-text">
              <el-form-item prop="contacterId">
                <el-select style="width: 100%" v-model.number="addForm.contacterId" placeholder="请选择签单联系人">
                  <el-option v-for="item in contactList" :key="item.id" :label="item.contacterName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">关联销售机会</td>
            <td class="td-text">
              <el-form-item prop="chanceId">
                <el-select :disabled="(orderState===0||params.detailChanceId)?true:false" style="width: 100%"
                           @change="intentProductChange" v-model.number="addForm.chanceId"
                           placeholder="请选择关联销售机会">
                  <el-option v-for="item in chanceList" :key="item.id" :label="item.intentProductName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            <td class="td-title">购买商品</td>
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
          </tr>
          <tr>
            <td class="td-title">购买规格</td>
            <td class="td-text">
              <el-form-item prop="specificationId">
                <el-select style="width: 100%" @change="specificationChange" v-model.number="addForm.specificationId"
                           placeholder="请选择购买规格">
                  <el-option v-for="item in productsList" :key="item.objectId" :label="item.name"
                             :value="item.objectId"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">签约主体</td>
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
            <td class="td-title">购买数量</td>
            <td class="td-text">
              <el-form-item prop="quantity">
                <el-input-number style="width: 100%" v-model="addForm.quantity" :min="1" :max="10"
                                 label="请输入购买数量"></el-input-number>
              </el-form-item>
            </td>
            <td class="td-title"></td>
            <td class="td-text">
            </td>
          </tr>
          <tr>
            <td class="td-title">订单来源</td>
            <td class="td-text" colspan="3">
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
          </tr>
          <tr>
            <td class="td-title">订单备注</td>
            <td class="td-text" colspan="3">
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
  import API from '../../../utils/api'
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
        allGoodsList: [],
        addForm: { // 添加表单
          customerId: '',
          contacterId: '',
          chanceId: '',
          productId: '',
          productName: '',
          specificationId: '',
          specificationName: '',
          contractSubjectId: '',
          quantity: '',
          remark: '',
          orderSource: '',
          // orderSourceName: '',
          isRenew: false
        },
        orderState: null,
        rules: {
          customerId: [
            {required: true, message: '请选择签单客户', trigger: 'change'},
          ],
          contacterId: [
            {required: true, message: '请选择签单联系人', trigger: 'change'},
          ],
          // chanceId: [
          //   {required: true, message: '请选择关联销售机会', trigger: 'change'},
          // ],
          // productId: [
          //   {required: true, message: '请选择购买商品', trigger: 'change'},
          // ],
          specificationId: [
            {required: true, message: '请选择购买规格', trigger: 'change'},
          ],
          contractSubjectId: [
            {required: true, message: '请选择签约主体', trigger: 'change'},
          ],
          quantity: [
            {required: true, message: '请输入购买数量', trigger: 'blur'},
          ],
          remark: [
            // {required: true, message: '请输入备注', trigger: 'blur'},
          ],
        },
        orderSourceType: [], // 客户来源
        orderSourceArr: [],
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
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            if (this.params.orderDetail) { // 编辑
              API.salesOrder.edit({path: this.addForm.id, body: this.addForm}, (da) => {
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
        API.customer.teamAboutCustomerlist(data => {
          if (data.status) {
            this.customersList = data.data
          }
        })
      },
      getChanceList (customerId) { // 签单客户对应的机会中【需过滤：操作人为销售机会的销售跟进人[更进人就是销售人]的销售机会列表】
        API.salesOpportunities.list({customerId: customerId, pageSize: 10000}, (da) => {
          this.chanceList = da.data.content
          let userId = webStorage.getItem('userInfo').id
          this.chanceList = this.chanceList.filter(item => {
            return item.salerId === userId
          })
          if (this.params.detailChanceId) { // 销售机会详细页面，添加订单
            this.addForm.chanceId = this.params.detailChanceId
            this.intentProductChange() // 对应购买商品
          }
        })
      },
      getContactList (customerId) {
        API.contacts.list({customerId: customerId, pageSize: 10000}, (da) => {
          this.contactList = da.data.content
          // this.contactTotal = da.data.totalElements
        })
      },
      getAllGoodsList () { // 获取所有分类商品
        API.common.organizationGoodsConf({ // 这个接口该来不调用外部接口
          goodsTypeId: null,
          organizationId: webStorage.getItem('userInfo').organizationId,
          saleable: 1,
        }, (da) => {
          this.allGoodsList = da.data
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
            this.addForm.productId = item.intentProductId
            this.addForm.productName = item.intentProductName
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
            // console.log(item.chanceSource)
            this.orderSourceArr = item.chanceSource.split('-') // 获取机会对应来源
            this.addForm.orderSource = item.chanceSource
            this.addForm.orderSourceName = item.chanceSourceName || '' // 获取机会对应来源
          }
        })
      },
      goodSelectChange (id) { // 直接选择商品获取名称
        this.allGoodsList.forEach(item => {
          if (item.objectId === id) {
            this.addForm.productName = item.name
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
      customerChange () { // 客户对应的机会和联系人
        this.getChanceList(this.addForm.customerId)
        this.getContactList(this.addForm.customerId)

        // 清除其他联动数据
        this.addForm = { // 添加表单
          customerId: this.addForm.customerId,
          contacterId: '',
          chanceId: '',
          productId: '',
          productName: '',
          specificationId: '',
          specificationName: '',
          contractSubjectId: '',
          quantity: '',
          remark: '',
          orderSource: this.orderSourceArr.join('-'),
          isRenew: !!this.params.isRenew,
        }
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
    },
    created () {
      this.getCustomersList()
      this.getAllGoodsList()
      if (this.params.orderDetail) { // 编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.orderDetail))
        this.getChanceList(this.params.orderDetail.customerId)
        this.getProductsList(this.params.orderDetail.productId)
        this.getContractSubjects(this.params.orderDetail.productId) // 签约主体
        this.getContactList(this.params.orderDetail.customerId)
        this.orderState = this.params.orderDetail.orderState // 订单状态 【销售订单-修改，预下订单后，客户、机会、商品信息不可更改，客户签单后，所有信息都不可修改】
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
        this.getChanceList(this.params.detailCustomersId)
        this.getContactList(this.params.detailCustomersId)
      }

      // 来源
      this.getConfigData(5, 0)

      // 续费订单
      this.addForm.isRenew = !!this.params.isRenew
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
