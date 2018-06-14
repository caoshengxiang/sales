<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">签单客户</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <el-select @change="customerChange" :disabled="params.detailCustomersId?true:false"
                           v-model.number="addForm.customerId" placeholder="请选择客户" style="width: 100%">
                  <el-option v-for="item in customersList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <td class="td-title">签单联系人</td>
            <td class="td-text">
              <el-form-item prop="contracterId">
                <el-select style="width: 100%" v-model.number="addForm.contracterId" placeholder="请选择签单联系人">
                  <el-option v-for="item in contactList" :key="item.id" :label="item.contacterName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">关联销售机会</td>
            <td class="td-text">
              <el-form-item prop="changeId">
                <el-select  :disabled="params.detailChangeId?true:false" style="width: 100%" @change="intentProductChange" v-model.number="addForm.changeId"
                           placeholder="请选择关联销售机会">
                  <el-option v-for="item in chanceList" :key="item.id" :label="item.intentProductName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            <td class="td-title">购买商品</td>
            <td class="td-text">
              <el-form-item prop="productId">
                <el-select style="width: 100%" :disabled="true" v-model.number="addForm.productId"
                           placeholder="请选择购买商品">
                  <el-option v-for="item in chanceList" :key="item.id" :label="item.intentProductName"
                             :value="item.intentProductId"></el-option>
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
            <td class="td-title">购买数量</td>
            <td class="td-text">
              <el-form-item prop="quantity">
                <el-input-number style="width: 100%" v-model="addForm.quantity" :min="1" :max="10"
                                 label="请输入购买数量"></el-input-number>
              </el-form-item>
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
        addForm: { // 添加表单
          customerId: '',
          contracterId: '',
          changeId: '',
          productId: '',
          productName: '',
          specificationId: '',
          specificationName: '',
          quantity: '',
          remark: '',
        },
        rules: {
          customerId: [
            {required: true, message: '请选择签单客户', trigger: 'change'},
          ],
          contracterId: [
            {required: true, message: '请选择签单联系人', trigger: 'change'},
          ],
          changeId: [
            {required: true, message: '请选择关联销售机会', trigger: 'change'},
          ],
          // productId: [
          //   {required: true, message: '请选择购买商品', trigger: 'change'},
          // ],
          specificationId: [
            {required: true, message: '请选择购买规格', trigger: 'change'},
          ],
          quantity: [
            {required: true, message: '请输入购买数量', trigger: 'blur'},
          ],
          remark: [
            // {required: true, message: '请输入备注', trigger: 'blur'},
          ],
        },
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.salesOrder.add(this.addForm, (da) => {
              setTimeout(() => {
                this.dataLoading = false
                if (da.status) {
                  this.$message.success('添加成功')
                  this.$vDialog.close({type: 'save'})
                }
              }, 500)
            })
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
          if (this.params.detailChangeId) { // 销售机会详细页面，添加订单
            this.addForm.changeId = this.params.detailChangeId
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
      getProductsList (goodsId) { // 产品【规格】列表
        API.external.getProducts({goodsId: goodsId}, (data) => {
          this.productsList = data.content
        })
      },
      intentProductChange () { // 机会change
        this.chanceList.forEach(item => {
          if (item.id === this.addForm.changeId) {
            this.addForm.productId = item.intentProductId
            this.addForm.productName = item.intentProductName
            // 对应的规格列表
            this.getProductsList(item.intentProductId)
            // 清除规格
            this.addForm.specificationId = ''
            this.addForm.specificationName = ''
          }
        })
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
          contracterId: '',
          changeId: '',
          productId: '',
          productName: '',
          specificationId: '',
          specificationName: '',
          quantity: '',
          remark: '',
        }
      },
    },
    created () {
      this.getCustomersList()
      if (this.params.orderDetail) { // 编辑
        this.addForm = this.params.orderDetail
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
        this.getChanceList(this.params.detailCustomersId)
        this.getContactList(this.params.detailCustomersId)
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
