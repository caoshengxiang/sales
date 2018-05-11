<template>
  <div>
    <el-dialog :title="type==='edit'? '编辑客户':'新增客户'" :visible.sync="addDialogVisible" width="900px" :show-close="false">
      <div class="com-dialog">
        <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
          <table class="com-dialog-table">
            <tr>
              <td class="td-title">所属公司</td>
              <td class="td-text">
                <el-form-item prop="customerName">
                  <el-input type="text" v-model="addForm.customerName"></el-input>
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
                <!--<el-form-item prop="birthday">-->
                  <!--<el-input type="text" v-model="addForm.birthday"></el-input>-->
                <!--</el-form-item>-->
                <el-date-picker
                  style="width: 100%"
                  v-model="addForm.birthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
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
          <el-button class="cancel-button" @click="initData">取 消</el-button>
          <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'addDialog',
    data () {
      return {
        addDialogVisible: false, // 新增弹窗
        addForm: { // 添加表单
          customerName: '',
          contacterName: '',
          phone: '',
          department: '',
          position: '',
          qq: '',
          birthday: '2018-05-14 12:00:00',
          sex: '',
          wx: '',
          bakPhone: '',
          mail: '',
          address: '',
          remark: '',
        },
        areaOptions_testData: [
          {
            value: 1,
            label: '四川',
            children: [
              {
                value: 2,
                label: '成都',
                children: [
                  {
                    value: 3,
                    label: '高新区',
                  },
                  {
                    value: 4,
                    label: '天府新区',
                  },
                ],
              },
            ],
          },
        ],
        areaSelectedOptions: [],
        rules: {
        customerName: [
            {required: true, message: '请输入所属公司', trigger: 'blur'}, // todo 验证内容
          ],
          contacterName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ],
          // levelName: '',
          phone: [
            {required: true, message: '请选择客户等级', trigger: 'blur'},
          ],
          position: [
            {required: true, message: '请输入客户简称', trigger: 'blur'},
          ],
          qq: [
            {required: true, message: '请选择客户行业', trigger: 'blur'},
          ],
          // industryName: '',
          birthday: [
            {required: true, message: '请选择客户地区', trigger: 'blur'},
          ],
          sex: [],
          // areaName: '',
          wx: [],
          website: [
            {required: true, message: '请输入公司网站', trigger: 'blur'},
          ],
          bakPhone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          // seaName: '',
          mail: [
            {required: true, message: '请选择客户公海', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
          ],
        },
      }
    },
    props: {
      addDialogOpen: {
        default: false,
        type: Boolean,
      },
      customerDetail: {
        default () {
          return {}
        },
        type: Object,
      },
      type: {
        default: '',
        type: String,
      },
    },
    watch: {
      addDialogOpen (open) {
        if (open) {
          this.addDialogVisible = true
          this.$emit('hasAddDialogOpen')
        }
      },
      customerDetail (d) {
        this.addForm = JSON.parse(JSON.stringify(d))
      }
    },
    methods: {
      initData () {
        if (this.type === 'edit') {
          this.addForm = JSON.parse(JSON.stringify(this.customerDetail))
        } else {
          this.addForm = { // 添加客户表单
            customerName: '',
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
            business: '',
            address: '',
          }
        }
        this.addDialogVisible = false
      },
      areaSelectedOptionsHandleChange (value) {
        console.log(value)
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
            this.initData()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
