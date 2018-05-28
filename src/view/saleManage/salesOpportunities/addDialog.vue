<template>
  <div class="com-dialog-container" v-loading="dataLoading">
      <div class="com-dialog">
        <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
          <table class="com-dialog-table">
            <tr>
              <td class="td-title">客户名称</td>
              <td class="td-text">
                <el-form-item prop="customerId">
                  <el-select v-model.number="addForm.customerId" placeholder="请选择客户" style="width: 100%">
                    <el-option v-for="item in customersList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>

              <td class="td-title">需求阶段</td>
              <td class="td-text">
                <el-form-item prop="state">
                  <el-select v-model.number="addForm.state" placeholder="请选择需求阶段" style="width: 100%">
                    <el-option v-for="item in salesState" :key="item.type" :label="item.value + item.percent" :value="item.type"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">预计签单时间</td>
              <td class="td-text">
                <el-form-item prop="billDate">
                  <el-date-picker
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
                  <el-input type="number" v-model.number="addForm.intentBillAmount"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">意向商品分类</td>
              <td class="td-text">
                <el-form-item prop="intentProductCate">
                  <el-select v-model.number="addForm.intentProductCate" @change="intentProductCateChangeHandle" placeholder="请选择意向商品分类" style="width: 100%">
                    <el-option v-for="item in intentProductCateList" :key="item.objectId" :label="item.name" :value="item.objectId"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="td-title">意向商品</td>
              <td class="td-text">
                <el-form-item prop="intentProductId">
                  <el-select v-model.number="addForm.intentProductId" @change="intentProductIdChangeHandle" placeholder="请选择意向商品" style="width: 100%">
                    <el-option v-for="item in intentProductList" :key="item.objectId" :label="item.name" :value="item.objectId"></el-option>
                  </el-select>
                </el-form-item>
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
  import API from '../../../utils/api'
  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: { // 添加表单
          customerId: '',
          state: '',
          billDate: '',
          intentBillAmount: '',
          intentProductCate: '',
          intentProductCateName: '',
          intentProductId: '',
          intentProductName: '',
          chanceRemark: '',
        },
        customersList: [],
        salesState: [],
        intentProductCateList: [],
        intentProductList: [],
        rules: {
          customerId: [
            {required: true, message: '请输入所属公司', trigger: 'blur'},
          ],
          state: [
            {required: true, message: '请选择需求阶段', trigger: 'change'},
          ],
          billDate: [
            {required: true, message: '请选择预计签单时间', trigger: 'change'},
          ],
          intentBillAmount: [
            {required: true, message: '请输入预计签单金额', trigger: 'blur'},
          ],
          intentProductCate: [
            {required: true, message: '请选择意向商品分类', trigger: 'change'},
          ],
          intentProductId: [
            {required: true, message: '请选择意向商品', trigger: 'change'},
          ],
          chanceRemark: [
            {required: true, message: '请输入需求描述', trigger: 'blur'},
          ],
        },
      }
    },
    props: ['params'],
    methods: {
      areaSelectedOptionsHandleChange (value) {
        console.log(value)
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.salesOpportunities.add(this.addForm, (data) => {
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
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCustomersList () { // “跟进”的所有客户
        API.customer.list({page: 0, pageSize: -1, type: 2}, data => {
          if (data.status) {
            this.customersList = data.data.content
          }
        })
      },
      getIntentProductCateList () {
        API.external.goodsTypeList((data) => {
          this.intentProductCateList = data.content
        })
      },
      getIntentProductList () {
        API.external.findGoods((data) => {
          this.intentProductList = data.content
        })
      },
      intentProductIdChangeHandle (id) {
        this.intentProductList.forEach(item => {
          if (item.objectId === id) {
            this.addForm.intentProductName = item.name
          }
        })
      },
      intentProductCateChangeHandle (id) {
        this.intentProductCateList.forEach(item => {
          if (item.objectId === id) {
            this.addForm.intentProductCateName = item.name
          }
        })
      }
    },
    created () {
      this.getCustomersList()
      this.getIntentProductCateList()
      this.getIntentProductList()
      this.salesState = this.params.salesState
      if (this.params.detail) {
        this.addForm = this.params.detail
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
