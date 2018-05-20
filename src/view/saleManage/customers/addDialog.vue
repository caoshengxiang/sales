<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">公司名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="addForm.name"></el-input>
              </el-form-item>
            </td>

            <td class="td-title">营业执照</td>
            <td class="td-text">
              <el-form-item prop="businessLicense">
                <el-input type="text" v-model="addForm.businessLicense"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">客户级别</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.levelName">-->
              <el-form-item prop="level">
                <el-select v-model.number="addForm.level" placeholder="请选择客户级别">
                  <el-option label="客户级别1" :value="1"></el-option>
                  <el-option label="客户级别2" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">客户简称</td>
            <td class="td-text">
              <el-form-item prop="shortName">
                <el-input type="text" v-model="addForm.shortName"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">客户行业</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.industry">-->
              <el-form-item prop="industry">
                <el-select v-model.number="addForm.industry" placeholder="请选择客户行业">
                  <el-option label="客户行业1" :value="1"></el-option>
                  <el-option label="客户行业2" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户地区</td>
            <td class="td-text">
              <!--<input type="text">-->
              <el-form-item prop="areaSelectedOptions">
                <el-cascader
                  placeholder="请选择客户地区"
                  :options="areaOptions_testData"
                  v-model="areaSelectedOptions"
                  @change="areaSelectedOptionsHandleChange">
                </el-cascader>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">公司网站</td>
            <td class="td-text">
              <el-form-item prop="website">
                <el-input type="text" v-model="addForm.website"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系电话</td>
            <td class="td-text">
              <el-form-item prop="phone">
                <el-input type="text" v-model="addForm.phone"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">所属公海</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.shortName">-->
              <el-form-item prop="seaId">
                <el-select v-model.number="addForm.seaId" placeholder="请选择所属公海">
                  <el-option label="所属公海1" :value="1"></el-option>
                  <el-option label="所属公海2" :value="2"></el-option>
                </el-select>
              </el-form-item>
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
            <td class="td-title">主营业务</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="business">
                <el-input type="text" v-model="addForm.business"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm', true)">保存并新建联系人</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm', false)">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import addContact from '../contacts/addDialog'

  export default {
    name: 'addDialog',
    data () {
      return {
        addDialogVisible: false, // 新增弹窗
        addForm: { // 添加客户表单
          name: '',
          businessLicense: '',
          // levelName: '',
          level: '',
          shortName: '',
          industry: '',
          // industryName: '',
          provinceId: '',
          // provinceName: '',
          // cityName: '',
          cityId: '',
          // areaName: '',
          areaId: '',
          website: '',
          phone: '',
          // seaName: '',
          seaId: '',
          address: '',
          business: '',
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
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
          ],
          businessLicense: [
            {required: true, message: '请输入营业执照', trigger: 'blur'},
          ],
          // levelName: '',
          level: [
            {required: true, message: '请选择客户等级', trigger: 'change'},
          ],
          shortName: [
            {required: true, message: '请输入客户简称', trigger: 'blur'},
          ],
          industry: [
            {required: true, message: '请选择客户行业', trigger: 'change'},
          ],
          // industryName: '',
          provinceId: [
            {required: true, message: '请选择客户地区', trigger: 'change'},
          ],
          // provinceName: '',
          // cityName: '',
          cityId: [],
          // areaName: '',
          areaId: [],
          website: [
            {required: true, message: '请输入公司网站', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          // seaName: '',
          seaId: [
            {required: true, message: '请选择客户公海', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          business: [
            // {required: true, message: '请输入主营业务', trigger: 'blur'},
          ],
        },
      }
    },
    props: ['params'],
    methods: {
      areaSelectedOptionsHandleChange (value) {
        console.log(value)
      },
      saveSubmitForm (formName, addContact) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$vDialog.close({type: 'save'})
            if (addContact) {
              this.saveAndAddContact()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      saveAndAddContact () {
        this.$vDialog.modal(addContact, {
          title: '新增联系人',
          width: 900,
          height: 400,
          params: {
            // id: '123456',
          },
          callback (data) {
            if (data.type === 'save') {
              alert('弹窗关闭，添加成功刷新列表')
            }
          },
        })
      }
    },
    created () {
      if (this.params.detail) {
        this.addForm = this.params.detail
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
