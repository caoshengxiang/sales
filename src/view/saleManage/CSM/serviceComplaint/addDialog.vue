<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">投诉日期</td>
            <td class="td-text">
              <el-form-item prop="time">
                <el-date-picker
                  style="width: 100%"
                  v-model="addForm.time"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </td>

            <td class="td-title">投诉客户</td>
            <td class="td-text">
            </td>

            <td class="td-title">联系人</td>
            <td class="td-text">
              <el-form-item prop="contactName">
                <el-input type="text" v-model="addForm.contactName"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">商务电话</td>
            <td class="td-text">
              <el-form-item prop="contactPhone">
                <el-input type="text" v-model="addForm.contactPhone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">订单单号</td>
            <td class="td-text">
              <el-form-item prop="orderId">
                <el-input type="text" v-model="addForm.orderId">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            <td class="td-title">服务产品</td>
            <td class="td-text">
            </td>
            <td class="td-title">服务状态</td>
            <td class="td-text">
            </td>
            <td class="td-title">投诉对象</td>
            <td class="td-text">
              <el-form-item prop="managerId">
                <el-select v-model.number="addForm.managerId" placeholder="请选择管家">
                  <el-option :label="1" value="男"></el-option>
                  <el-option :label="2" value="女"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">投诉内容</td>
            <td class="td-text" colspan="7">
              <el-form-item prop="content">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 20}" v-model="addForm.content"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="cancelSubmitForm">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import { chartLengthRule } from '../../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: { // 添加表单
          time: '',
          contactName: '',
          contactPhone: '',
          orderId: '',
          managerId: '',
          content: '',
        },
        rules: {
          time: [
            {required: true, message: '请选择投诉日期', trigger: 'blur'},
          ],
          contactName: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          contactPhone: [
            // {required: true, message: '请输入联系电话', trigger: 'blur'},
            chartLengthRule.validatePhone,
          ],
          orderId: [
            {required: true, message: '请输入订单单号', trigger: 'blur'},
          ],
          managerId: [
            {required: true, message: '请选择投诉对象', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入投诉内容', trigger: 'blur'},
          ],
        },
        dialogType: 'add',
        customersList: [],
      }
    },
    props: ['params'],
    methods: {
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            if (this.dialogType === 'add') {
              API.serviceComplaint.add(this.addForm, (data) => {
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
              // API.serviceComplaint.edit({
              //   path: this.addForm.id,
              //   body: this.addForm,
              // }, (data) => {
              //   if (data.status) {
              //     this.$message.success('编辑成功')
              //     setTimeout(() => {
              //       this.dataLoading = false
              //       this.$vDialog.close({type: 'save'})
              //     }, 500)
              //   } else {
              //     setTimeout(() => {
              //       this.dataLoading = false
              //     }, 500)
              //   }
              // })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCustomersList () { // 当前登陆用户所有的拥有团队成员权限的客户信息 // todo ?
        API.customer.teamAboutCustomerlist(null, data => {
          if (data.status) {
            this.customersList = data.data
            if (this.params.addCustomersAndAddContact_customerName) { // 添加客户并添加联系人
              this.customersList.forEach(item => {
                if (item.name === this.params.addCustomersAndAddContact_customerName) {
                  this.addForm.customerId = item.id
                }
              })
            }
          }
        })
      },
    },
    created () {
      this.getCustomersList()
      if (this.params.detail) { // 联系人编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.detail))
        this.dialogType = 'edit'
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
