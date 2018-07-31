<template>
  <div class="com-dialog-container" v-loading="dataLoading">
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
                <el-select v-model="addForm.level" @change="selectLevel" placeholder="请选择客户级别">
                  <el-option v-for="item in levelList" :key="item.codeName" :label="item.codeName"
                             :value="item.codeName"></el-option>
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
                <el-select v-model="addForm.industry" @change="selectIndustry" placeholder="请选择客户行业">
                  <el-option v-for="item in industryList" :key="item.codeName" :label="item.codeName"
                             :value="item.codeName"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户地区</td>
            <td class="td-text">
              <!--<input type="text">-->
              <el-form-item prop="provinceId">
                <!--<el-cascader
                  placeholder="请选择客户地区"
                  :options="areaOptionsData"
                  v-model="areaSelectedOptions"
                  @active-item-change="handleAreaItemChange"
                  @change="areaSelectedOptionsHandleChange"
                  :props="{
                    value: 'id',
                    label: 'name',
                  }">
                </el-cascader>-->
                <AreaSelect ref="areaSe"
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
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
              <el-form-item prop="seaId">
                <el-select v-model.number="addForm.seaId" placeholder="请选择所属公海">
                  <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">客户来源</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="customerSource">
                <el-cascader
                  style="width: 100%"
                  :change-on-select="selectLastLevelMode"
                  :options="customerSourceType"
                  v-model="customerSourceArr"
                  @active-item-change="customerSourceChangeHandle"
                  @change="customerSourceChangeHandle"
                  :props="props"
                  :placeholder="addForm.customerSourceName"
                  :value="selectedBindValue"
                >
                </el-cascader>
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
  import API from '../../../utils/api'
  import { chartLengthRule } from '../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        addDialogVisible: false, // 新增
        dataLoading: false,
        addForm: { // 添加客户表单
          name: '',
          businessLicense: '',
          level: '',
          shortName: '',
          industry: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          website: '',
          phone: '',
          seaId: '',
          address: '',
          business: '',
          customerSource: '',
        },
        areaOptionsData: [],
        // areaSelectedOptions: [],
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        rules: {
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度为 50 个字符以内', trigger: 'blur'},
          ],
          businessLicense: [
            // {required: true, message: '请输入营业执照', trigger: 'blur'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          level: [
            // {required: true, message: '请选择客户等级', trigger: 'change'},
          ],
          shortName: [
            // {required: true, message: '请输入客户简称', trigger: 'blur'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          industry: [
            {required: true, message: '请选择客户行业', trigger: 'change'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          provinceId: [
            {required: true, message: '请选择客户地区', trigger: 'change'},
          ],
          cityId: [],
          areaId: [],
          website: [
            // {required: true, message: '请输入公司网站', trigger: 'blur'},
            {max: 100, message: '长度为 100 个字符以内', trigger: 'blur'},
          ],
          phone: [
            // {required: true, message: '请输入联系电话', trigger: 'blur'},
            chartLengthRule.validatePhone,
          ],
          // seaName: '',
          seaId: [
            {required: true, message: '请选择客户公海', trigger: 'change'},
          ],
          address: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          business: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
            {max: 100, message: '长度为 100 个字符以内', trigger: 'blur'},
          ],
          // customerSource: [
          //   {required: true, message: '请选择客户来源', trigger: 'change'},
          // ],
        },
        dialogType: 'add',
        customerSourceType: [], // 客户来源
        customerSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        selectedBindValue: [],
        selectLastLevelMode: true,
      }
    },
    props: ['params'],
    methods: {
      areaSelectedOptionsHandleChange (value) {
        this.addForm.provinceId = value[0] || ''
        this.addForm.cityId = value[1] || ''
        this.addForm.areaId = value[2] || ''
      },
      selectLevel (val) {
        // this.levelList.forEach(item => {
        //   if (item.id === val) {
        //     this.addForm.levelName = item.codeName
        //   }
        // })
      },
      selectIndustry (val) {
        // this.industryList.forEach(item => {
        //   if (item.id === val) {
        //     this.addForm.industryName = item.codeName
        //   }
        // })
      },
      saveSubmitForm (formName, addContact) {
        // console.log(this.$refs.areaSe.getSelectedValue(), '区域')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            if (this.dialogType === 'add') {
              API.customer.add({
                query: {pageSource: this.params.pageSource},
                body: this.addForm,
              }, (data) => {
                if (data.status) {
                  this.$message.success('添加成功')
                  setTimeout(() => {
                    this.dataLoading = false
                    this.$vDialog.close({type: 'save'})
                    if (addContact) {
                      this.saveAndAddContact()
                    }
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            } else {
              API.customer.edit({
                path: this.addForm.id,
                body: this.addForm,
              }, (data) => {
                if (data.status) {
                  this.$message.success('编辑成功')
                  setTimeout(() => {
                    this.dataLoading = false
                    this.$vDialog.close({type: 'save'})
                    if (addContact) {
                      this.saveAndAddContact()
                    }
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
      saveAndAddContact () {
        this.$vDialog.modal(addContact, {
          title: '新增联系人',
          width: 900,
          height: 460,
          params: {
            addCustomersAndAddContact_customerName: this.addForm.name,
          },
          callback (data) {
            if (data.type === 'save') {}
          },
        })
      },
      getAreaOptionsData (id) {
        API.common.region(id, (data) => {
          this.areaOptionsData = data.data
        })
      },
      handleAreaItemChange (val) {
        console.log('val', val)
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
            if (this.customerSourceType.length === 0) {
              // this.customerSourceType = arr
              // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
              // 其他模块中新增调取销售自建，
              // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
              this.customerSourceType = [
                { // 销售自建
                  codeName: this.params.topSource[0].name,
                  id: this.params.topSource[0].value,
                  children: [],
                }]
              // this.selectedBindValue.push(this.topSource[0].value)
              if (this.params.detail) { // 编辑
                let arr = this.params.detail.customerSource.split('-')
                this.customerSourceArr = arr.map(item => {
                  return parseInt(item, 10)
                })
              } else {
                this.customerSourceArr.push(this.params.topSource[0].value)
              }
              this.customerSourceChangeHandle([this.params.topSource[0].value]) // 默认获取第二级
            }
          }
        })
      },
      customerSourceChangeHandle (va) {
        this.getLastItem(this.customerSourceType, va, 'id')
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
        if (!this.params.detail) { // 非编辑
          this.addForm.customerSource = va.join('-')
        } else { // 编辑
          this.addForm.customerSource = this.customerSourceArr.join('-')
        }
      },
      // customerSourceChange (va) {
      //   this.addForm.customerSource = va.join('-')
      // },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            this.selectedBindValue.push(item[key])
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
      getSeaList () {
        API.customerSea.listAboutCustomer((data) => {
          this.seaList = data.data
        })
      },
    },
    created () {
      this.getAreaOptionsData(null)
      this.getConfigData(2)
      this.getConfigData(3)
      this.getConfigData(5, 0)
      this.getSeaList()
      if (this.params.detail) { // 编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.detail))
        this.dialogType = 'edit'
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
