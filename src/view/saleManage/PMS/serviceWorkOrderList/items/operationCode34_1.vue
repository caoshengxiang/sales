<!--
  num-operationCode
-->
<template>
  <div class="com-dialog op-code">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <!--<el-select-->
                  <!--v-model.number="addForm.customerName" placeholder="请选择客户">-->
                  <!--<el-option v-for="item in customersList" :key="item.id" :label="item.name"-->
                             <!--:value="item.id"></el-option>-->
                <!--</el-select>-->
                <!--<el-input type="text" v-model="addForm.customerName"></el-input>-->
                {{addForm.customerName}}
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80">
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
            v-model="ruleForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button class="save-button" @click="saveSubmitForm('ruleForm')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import API from '../../../../../utils/api'

  export default {
    name: 'operationCode1_1',
    data () {
      return {
        customersList: [],
        addForm: {},
        ruleForm: {
          remark: '',
        },
        rules: {
        },
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.workOrder.serviceItemOperate(Object.assign({}, this.params.baseParam, {
              remark: this.ruleForm.remark,
              result: JSON.stringify(Object.assign({}, {customerDetail: this.addForm}))
            }), (res) => {
              if (res.status) {
                this.$message.success('操作成功')
                this.$vDialog.close({type: 'itemSave'})
              }
            })
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
          }
        })
      },
    },
    created () {
      this.addForm.customerName = this.params.customerName
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../../styles/common";

  .operation-code-box {
    padding: 10px;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .op-code {
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
