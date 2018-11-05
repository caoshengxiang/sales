<template>
  <div class="com-dialog" style="padding: 20px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-width="160px"
             label-position="left"
             class="demo-ruleForm">
      <el-form-item label="服务商品名称">
        <label>{{params.goodsName}}</label>
      </el-form-item>
      <el-form-item label="服务管家服务顺序" prop="serviceType">
        <el-radio-group v-model="serviceContentConfigDetail.serviceType">
          <el-radio :label="1">串行服务</el-radio>
          <el-radio :label="2">并行服务</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务事项配置">
        <label class="com-a-link" @click="showServiceItem">查看服务事项配置</label>
      </el-form-item>
      <el-form-item label="商品服务类型">
        <div v-for="(con, index) in serviceContent" :key="index" style="margin-bottom: 10px;">
          <span v-for="item in params.serviceType"
                style="display: inline-block;width: 100px;"
                :key="item.type"
                v-if="item.type === con.serviceType">{{item.value}}</span>
          <el-select v-model="con.managerType" placeholder="请选择" style="width: 160px;">
            <el-option
              v-for="item in managerTypeList"
              :key="item.id"
              :label="item.codeName"
              :value="item.id">
            </el-option>
          </el-select>
          <span>
            <el-input style="width: 80px;" type="age" v-model.number="con.percentage" autocomplete="off"></el-input>%
          </span>
        </div>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
      <el-button class="save-button" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import servieceItem from './serviceItem'

  export default {
    name: 'configDialog',
    data () {
      return {
        ruleForm: {
          serviceType: 1, // 服务顺序类型 1-串行 2-并行
        },
        rules: {},
        serviceContentConfigDetail: {
          serviceType: 1, // 服务顺序类型 1-串行 2-并行
          goodsId: '',
          serviceContent: [],
        },
        serviceContent: [],
        managerTypeList: [],
        configType: 'add'
      }
    },
    props: ['params'],
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let percentNum = 0
            this.serviceContent.forEach((item) => {
              percentNum += item.percentage
            })
            if (percentNum !== 100) {
              this.$message.warning('金额的百分数相加的和必须为1')
              return
            }
            if (this.configType === 'edit') {
              let param = {
                goodsId: this.serviceContentConfigDetail.goodsId,
                serviceType: this.serviceContentConfigDetail.serviceType,
                id: this.serviceContentConfigDetail.id,
                serviceContent: this.serviceContent
              }
              API.common.editServiceItemConfig(param, (da) => {
                if (da.status) {
                  this.$message.success('配置成功')
                  this.$vDialog.close({type: 'save'})
                }
              })
            } else {
              let param = {
                goodsId: this.params.goodsId,
                serviceType: this.serviceContentConfigDetail.serviceType, // 服务顺序类型 1-串行 2-并行
                serviceContent: this.serviceContent
              }
              API.common.addServiceItemConfig(param, (da) => {
                if (da.status) {
                  this.$message.success('配置成功')
                  this.$vDialog.close({type: 'save'})
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getServiceContentConfigDetail (goodsId) {
        API.common.serviceContentConfigDetail({goodId: goodsId}, (da) => {
          if (!da.data) {
            this.configType = 'add'
          } else {
            this.configType = 'edit'
            this.serviceContentConfigDetail = da.data
            this.serviceContent = JSON.parse(this.serviceContentConfigDetail.serviceContent)
          }
        })
      },
      showServiceItem () {
        this.$vDialog.modal(servieceItem, {
          title: '服务事项配置',
          width: 700,
          height: 860,
          params: {
            goodsId: this.params.goodsId,
            goodsName: this.params.goodsName,
            serviceType: this.params.serviceType, // 七种服务类型
            serviceContent: this.serviceContent
          },
          callback: (data) => {
            if (data.type === 'configItem') {
              console.log(data.serviceContent)
              this.serviceContent = data.serviceContent
            }
          },
        })
      },
      getCodeConfig () {
        API.baseSetting.getCodeConfig({type: 6}, (res) => {
          if (res.status) {
            this.managerTypeList = res.data
          }
        })
      },
    },
    created () {
      this.getServiceContentConfigDetail(this.params.goodsId)
      this.getCodeConfig()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
