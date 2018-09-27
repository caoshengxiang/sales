<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="180px" :rules="rules">
        <div style="margin-bottom: 20px;">绑定客户方式一：</div>
        <div style="margin-bottom: 20px;">
          <el-form-item label="绑定创建或跟进中的客户" prop="customerId">
            <el-select filterable
                       @change="customerId_1_change"
                       v-model.number="customerId_1"
                       placeholder="请选择客户" style="width: 100%">
              <el-option v-for="item in customersList" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="margin-bottom: 20px;">绑定客户方式二：</div>
        <div style="margin-bottom: 20px;">
          <el-form-item label="搜索绑定客户库中的客户">
            <el-select v-model.number="searchForm.cate"
                       placeholder="请选择客户类型" style="width: 150px">
              <el-option label="个人" :value="1"></el-option>
              <el-option label="机构" :value="2"></el-option>
            </el-select>
            <el-input type="text" v-model="searchForm.customerName" placeholder="请输入客户名称" style="width: 150px"></el-input>
            <el-input type="text" v-model="searchForm.cdKey" placeholder="请输入客户识别码" style="width: 150px"></el-input>
            <el-button type="primary" icon="el-icon-search" style="width: 80px;" @click="searchHandle">搜索</el-button>
          </el-form-item>
          <div>
            <el-radio-group v-model="customerId_2" @change="customerId_2_change">
              <el-radio v-for="item in customersList2" :key="item.id" :label="item.id">
                {{item.name}}[{{item.cdKey}}][{{item.cate===1?'个人':'机构'}}]
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  // import webStorage from 'webStorage'
  // import { chartLengthRule } from '../../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        chanceDetail: '',
        customerId_1: '', // 方式一
        customerId_2: '', // 方式二
        addForm: { // 添加表单
          customerId: '',
          chanceId: '',
        },
        searchForm: {
          cate: 2,
          cdKey: null,
          customerName: null,
        },
        customersList: [],
        customersList2: [],
        rules: {
          customerId: [
            {required: true, message: '请选择客户', trigger: 'blur'},
          ],
        },
        targetObj: null,
      }
    },
    props: ['params'],
    methods: {
      customerId_1_change () {
        this.customerId_2 = null
      },
      customerId_2_change () {
        this.customerId_1 = null
      },
      saveSubmitForm (formName) {
        if (!this.customerId_1 && !this.customerId_2) {
          this.$message.warning('请选择客户')
          return
        }
        this.addForm.customerId = this.customerId_1 || this.customerId_2
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.salesOpportunities.bindCustomer(this.addForm, (data) => {
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
      getCustomersList () { // 当前登陆用户所有的拥有团队成员权限的客户信息
        API.customer.teamAboutCustomerlist({}, data => {
          if (data.status) {
            this.customersList = data.data
          }
        })
      },
      searchHandle () {
        if (!this.searchForm.cdKey && !this.searchForm.customerName) {
          this.$message.warning('请输入客户名称和客户识别码至少一个！')
          return
        }
        API.customer.customerSearch({
          cate: this.searchForm.cate,
          cdKey: this.searchForm.cdKey || null,
          customerName: this.searchForm.customerName || null,
        }, data => {
          if (data.status) {
            this.customersList2 = data.data
            if (!data.data.length) {
              this.$message.warning('无客户数据！')
            }
          }
        })
      },
    },
    created () {
      if (this.params.chanceDetail) {
        this.chanceDetail = this.params.chanceDetail
        this.addForm.chanceId = this.chanceDetail.id
        this.getCustomersList()
      }
    },
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .el-radio + .el-radio, .el-radio {
    margin-left: 10px;
    margin-top: 10px;
    width: 45%;
  }
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
