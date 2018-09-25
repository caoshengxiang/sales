<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">活动名称</td>
            <td colspan="5">
              <el-form-item prop="meetingName">
                <el-input type="text" v-model="addForm.meetingName"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">活动时间</td>
            <td>
              <el-form-item prop="meetingTimeStart">
                <el-date-picker
                  v-model="meetingTimeInterval"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="timeIntervalHandle"
                  :unlink-panels="true"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">活动经费</td>
            <td>
              <el-form-item prop="meetingMoney">
                <el-input type="number" v-model="addForm.meetingMoney"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">活动人数</td>
            <td>
              <el-form-item prop="personCount">
                <el-input type="number" v-model="addForm.personCount"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">主办单位</td>
            <td colspan="5">
              <el-form-item prop="hostUnit">
                <el-input type="text" v-model="addForm.hostUnit"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">承办单位</td>
            <td colspan="5">
              <el-form-item prop="organizer">
                <el-input type="text" v-model="addForm.organizer"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">协办单位</td>
            <td colspan="5">
              <el-form-item prop="coOrganizer">
                <el-input type="text" v-model="addForm.coOrganizer"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">活动地址</td>
            <td colspan="5">
              <el-form-item prop="address">
                <el-input type="text" v-model="addForm.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">活动简介</td>
            <td colspan="5">
              <el-form-item prop="meetingDesc">
                <el-input type="text" v-model="addForm.meetingDesc"></el-input>
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
  import API from '../../../../utils/api'
  import { chartLengthRule } from '../../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: { // 添加表单
          meetingName: '',
          meetingTimeStart: '',
          meetingTimeEnd: '',
          meetingMoney: '',
          personCount: '',
          hostUnit: '',
          organizer: '',
          coOrganizer: '',
          address: '',
          meetingDesc: '',
        },
        rules: {
          meetingName: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          meetingTimeStart: [
            {required: true, message: '请输入活动时间', trigger: 'change'},
            chartLengthRule.validateBeforeTime,
          ],
          meetingMoney: [
            {required: true, message: '请输入活动经费', trigger: 'blur'},
          ],
          personCount: [
            {required: true, message: '请输入活动人数', trigger: 'change'},
          ],
          hostUnit: [
            {required: true, message: '请输入主办单位', trigger: 'change'},
          ],
          organizer: [
            {required: true, message: '请输入承办单位', trigger: 'blur'},
          ],
          coOrganizer: [
            {required: true, message: '请输入协办单位', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入会议地址', trigger: 'blur'},
          ],
          meetingDesc: [
            {required: true, message: '请输入活动介绍', trigger: 'blur'},
          ],
        },
        targetObj: null,
        meetingTimeInterval: ''
      }
    },
    props: ['params'],
    methods: {
      timeIntervalHandle (value) {
        this.addForm.meetingTimeStart = value[0] || ''
        this.addForm.meetingTimeEnd = value[1] || ''
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            if (this.params.detail) { // 编辑
              API.activity.edit({id: this.addForm.id, body: this.addForm}, (data) => {
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
              API.activity.add(this.addForm, (data) => {
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
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
    created () {
      if (this.params.detail) { // 编辑
        this.addForm = this.params.detail
        this.meetingTimeInterval = [new Date(this.addForm.meetingTimeStart) || '', new Date(this.addForm.meetingTimeEnd) || '']
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
