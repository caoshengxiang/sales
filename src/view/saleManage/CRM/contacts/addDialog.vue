<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <el-select
                  :disabled="(params.detailCustomersId || params.addCustomersAndAddContact_customerName || dialogType === 'edit')?true:false"
                  v-model.number="addForm.customerId" placeholder="请选择客户">
                  <el-option v-for="item in customersList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <td class="td-title">联系人姓名</td>
            <td class="td-text">
              <el-form-item prop="contacterName">
                <el-input type="text" v-model="addForm.contacterName"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系人电话</td>
            <td class="td-text">
              <el-form-item prop="phone">
                <el-input type="text" v-model="addForm.phone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">任职部门</td>
            <td class="td-text">
              <el-form-item prop="department">
                <el-input type="text" v-model="addForm.department"></el-input>
              </el-form-item>
            <td class="td-title">公司职务</td>
            <td class="td-text">
              <el-form-item prop="position">
                <el-input type="text" v-model="addForm.position"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系QQ</td>
            <td class="td-text">
              <el-form-item prop="qq">
                <el-input type="text" v-model="addForm.qq"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">出生日期</td>
            <td class="td-text">
              <el-form-item prop="birthday">
                <el-date-picker
                  style="width: 100%"
                  v-model="addForm.birthday"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">性别</td>
            <td class="td-text">
              <el-form-item prop="sex">
                <el-select v-model.number="addForm.sex" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">联系微信</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.shortName">-->
              <el-form-item prop="wx">
                <el-input type="text" v-model="addForm.wx"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">备用电话</td>
            <td class="td-text">
              <el-form-item prop="bakPhone">
                <el-input type="text" v-model="addForm.bakPhone"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">电子邮件</td>
            <td class="td-text">
              <el-form-item prop="mail">
                <el-input type="text" v-model="addForm.mail"></el-input>
              </el-form-item>
            </td>
            <td class="td-title"></td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm">-->
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
            <td class="td-title">备注</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="remark">
                <el-input type="text" v-model="addForm.remark"></el-input>
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
          customerId: '',
          contacterName: '',
          phone: '',
          department: '',
          position: '',
          qq: '',
          birthday: '',
          sex: '',
          wx: '',
          bakPhone: '',
          mail: '',
          address: '',
          remark: '',
        },
        rules: {
          customerId: [
            {required: true, message: '请选择客户', trigger: 'blur'},
          ],
          contacterName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ],
          phone: [
            // {required: true, message: '请输入联系电话', trigger: 'blur'},
            chartLengthRule.validatePhone,
          ],
          department: [
            // {required: true, message: '请输入任职部门', trigger: 'blur'},
          ],
          position: [
            // {required: true, message: '请输入公司职务', trigger: 'blur'},
          ],
          qq: [
            // {required: true, message: '请输入联系QQ', trigger: 'blur'},
          ],
          birthday: [
            // {required: true, message: '请选择出生日期', trigger: 'blur'},
          ],
          sex: [
            // {required: true, message: '请选择性别', trigger: 'change'},
          ],
          wx: [
            // {required: true, message: '请输入联系微信', trigger: 'blur'},
          ],
          bakPhone: [
            // {required: true, message: '请输入备用电话', trigger: 'blur'},
          ],
          mail: [
            // {required: true, message: '请请输入电子邮箱', trigger: 'blur'},
          ],
          address: [
            // {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          remark: [
            // {required: true, message: '请输入备注', trigger: 'blur'},
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
              API.contacts.add(this.addForm, (data) => {
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
              API.contacts.edit({
                path: this.addForm.id,
                body: this.addForm,
              }, (data) => {
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
