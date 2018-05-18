<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">签单客户</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <el-select style="width: 100%" v-model.number="addForm.customerId" placeholder="请选择签单客户">
                  <el-option label="客户1" :value="1"></el-option>
                  <el-option label="客户2" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <td class="td-title">签单联系人</td>
            <td class="td-text">
              <el-form-item prop="contracterId">
                <el-select style="width: 100%" v-model.number="addForm.contracterId" placeholder="请选择签单联系人">
                  <el-option label="签单联系人1" :value="1"></el-option>
                  <el-option label="签单联系人2" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">关联销售机会</td>
            <td class="td-text">
              <el-form-item prop="changeId">
                <el-select style="width: 100%" v-model.number="addForm.changeId" placeholder="请选择关联销售机会">
                  <el-option label="关联销售机会1" :value="1"></el-option>
                  <el-option label="关联销售机会2" :value="2"></el-option>
                </el-select>
              </el-form-item>
            <td class="td-title">购买商品</td>
            <td class="td-text">
              <el-form-item prop="productId">
                <el-select style="width: 100%" v-model.number="addForm.productId" placeholder="请选择购买商品">
                  <el-option label="购买商品1" :value="1"></el-option>
                  <el-option label="购买商品2" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">购买规格</td>
            <td class="td-text">
              <el-form-item prop="specification">
                <el-select style="width: 100%" v-model.number="addForm.specification" placeholder="请选择购买规格">
                  <el-option label="购买规格" :value="1"></el-option>
                  <el-option label="购买规格" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">购买数量</td>
            <td class="td-text">
              <el-form-item prop="quantity">
                <el-input-number style="width: 100%" v-model="addForm.quantity"  :min="1" :max="10" label="请输入购买数量"></el-input-number>
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

  export default {
    name: 'addDialog',
    data () {
      return {
        addDialogVisible: false, // 新增弹窗
        addForm: { // 添加表单
          customerId: '',
          contracterId: '',
          changeId: '',
          productId: '',
          specification: '',
          quantity: '',
          remark: '',
        },
        rules: {
          customerId: [
            {required: true, message: '请选择签单客户', trigger: 'blur'},
          ],
          contracterId: [
            {required: true, message: '请选择签单联系人', trigger: 'blur'},
          ],
          changeId: [
            {required: true, message: '请选择关联销售机会', trigger: 'blur'},
          ],
          productId: [
            {required: true, message: '请选择购买商品', trigger: 'blur'},
          ],
          specification: [
            {required: true, message: '请选择购买规格', trigger: 'blur'},
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
            this.$vDialog.close({type: 'save'})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
    created () {
      if (this.params.orderDetail) {
        this.addForm = this.params.orderDetail
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
