<template>
  <!--<div class="com-dialog-container">-->
  <div>
    <div class="com-dialog com-container">
      <div style="margin-bottom: 20px;">
        <span>服务年度</span>
        <el-date-picker
          style="width: 160px;"
          v-model="form.year"
          type="year"
          value-format="yyyy"
          @change="yearChangeHandle"
          placeholder="请选择年">
        </el-date-picker>
        &nbsp;&nbsp;
        <span>服务月度</span>
        <el-select v-model="form.month" placeholder="请选择月" style="width: 100px;">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;
        <el-button type="primary" @click="getServiceItem">搜索</el-button>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <span>服务客户: {{params.customerName}}</span>
        &nbsp;&nbsp;
        <span>服务管家: {{params.typeItem.managerName}}</span>
      </div>

      <div>
        <table class="detail-table" style="text-align: center">
          <tr>
            <td class="td-title" style="width: 30px;">序号</td>
            <td class="td-title" style="width: 100px;">事项名称</td>
            <td class="td-title" style="width: 100px;">计划完成时限</td>
            <td class="td-title" style="width: 100px;">完成日期</td>
            <td class="td-title" style="width: 50px;">完成状态</td>
            <td class="td-title">操作</td>
          </tr>
          <tr v-for="(item, index) in serviceItem" :key="index">
            <td style="width: 30px;">{{index+1}}</td>
            <td style="width: 100px;">{{item.title}}</td>
            <td style="width: 100px;">{{item.scheduleTime && $moment(item.scheduleTime).format('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td style="width: 100px;">{{item.finishTime && $moment(item.finishTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td style="width: 50px;">
              <span v-if="item.state === 1">待</span>
              <span v-if="item.state === 2">待确认</span>
              <span v-if="item.state === 3">待审核</span>
              <span v-if="item.state === 4">已拒绝</span>
              <span v-if="item.state === 5">重新发起审核）</span>
              <span v-if="item.state === 9">已完成</span>
            </td>
            <td>
              <el-button type="text"
                         @click="operationListHandle(item, oplIndex + 1)"
                         v-for="(opl, oplIndex) in operationList[item.num - 1]"
                         :key="oplIndex">{{opl}}
              </el-button>
            </td>
          </tr>
        </table>
        <div style="margin-top: 20px;">
          <ul>
            <li v-for="(item, index) in serviceItem"
                :key="index"
                v-if="item.itemRecord">工作成果：todo 不同情况处理
            </li>
          </ul>
        </div>
      </div>

      <div style="margin-top: 30px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>服务日志</span>
          </div>
          <div style="min-height: 200px;">
            <div v-for="(item, index) in serviceLog" :key="index" class="text item">
              {{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}
              &nbsp;&nbsp;
              {{item.description}}
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import operationCode11 from './items/operationCode1_1'
  import operationCode21 from './items/operationCode2_1'
  import operationCode41 from './items/operationCode4_1'
  import operationCode51 from './items/operationCode5_1'
  import operationCode61 from './items/operationCode6_1'

  export default {
    name: 'opItem',
    data () {
      return {
        serviceLog: [],
        serviceItem: [],
        operationList: [ // 根据num值确定按钮
          ['设置上门日期'], // num 1
          ['推送客户告知书', '提醒用户查看'], // num 2
          ['推送首次交接清单', '提醒用户查看'], // num 3
          ['设置服务周期'], // num 4
          ['设置年报时间'], // num 5
          ['上传客户确认函'], // num 6
          ['录入客户信息表', '修改客户信息'], // num 7
          ['上传客户财务资料', '修改客户财务资料'], // num 8
          ['完成装订凭证', '客户确认装订凭证'], // num 9
          ['用户请求生成', '事项任务审核', '完成服务'], // num 10
          ['用户请求生成', '事项任务审核', '完成服务'], // num 11
          ['用户请求生成', '事项任务审核', '完成服务'], // num 12
          ['用户请求生成', '事项任务审核', '完成服务'], // num 13
          ['用户请求生成', '事项任务审核', '完成服务'], // num 14
          ['用户请求生成', '事项任务审核', '完成服务'], // num 15
          ['用户请求生成', '事项任务审核', '完成服务'], // num 16
          ['审核客户信息表'], // num 17
          ['审核客户财务资料'], // num 18
          ['完成资料存档'], // num 19
          ['完成开设套账'], // num 20
          ['客户票据审核'], // num 21
          ['记账日常告知'], // num 22
          ['发送抄报提醒'], // num 23
          ['发送清卡提醒'], // num 24
          ['发送财务确认函', '提醒客户确认财务函', '客户确认'], // num 25
          ['完成工商年报', '客户确认'], // num 26
          ['用户请求生成', '事项任务审核', '完成服务'], // num 27
          ['上传财务制度'], // num 28
          ['发送纳税确认函', '提醒客户确认', '客户确认'], // num 29
          ['上报纳税申请表'], // num 30
          ['完成纳税申报'], // num 31
          ['纳税异常提醒'], // num 32
          ['上传税收风险提示书'], // num 33
          ['完善联系人信息'], // num 34
          ['确认开始服务时间'], // num 35
          ['上传服务成果'], // num 36
          ['添加服务阶段款项', '完成阶段款项添加'], // num 37
          ['确认完成', '提醒用户确认', '用户确认'], // num 38
          ['完善联系人信息'], // num 39
          ['设置服务周期'], // num 40
          ['上传服务成果'], // num 41
        ],
        form: {
          year: null,
          month: null,
          orderId: this.params.orderId,
          type: this.params.numItem.type,
        },
      }
    },
    props: ['params'],
    methods: {
      getServiceLog () {
        API.workOrder.serviceLog({orderId: this.params.orderId}, (da) => {
          this.serviceLog = da.data
        })
      },
      getServiceItem () {
        API.workOrder.serviceItem(this.form, (da) => {
          this.serviceItem = da.data.content
        })
      },
      yearChangeHandle () {
        this.form.month = null
      },
      operationListHandle (item, operationCode) {
        let baseParam = {
          orderId: this.params.orderId,
          workOrderId: this.params.workOrderId,
          id: item.id,
          type: item.type,
          num: item.num,
          operationCode: operationCode,
        }
        console.log(item, operationCode)
        if (item.num === 1 && operationCode === 1) {
          this.$vDialog.modal(operationCode11, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 400,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
              }
            },
          })
        } else if ((item.num === 2 && operationCode === 1) || (item.num === 3 && operationCode === 1)) {
          this.$vDialog.modal(operationCode21, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 220,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
              }
            },
          })
        } else if ((item.num === 2 && operationCode === 2) || (item.num === 3 && operationCode === 2)) {
          console.log(baseParam)
          API.workOrder.serviceItemOperate(Object.assign({}, baseParam, {
            // remark: this.ruleForm.remark,
            // result: JSON.stringify({})
          }), (res) => {
            if (res.status) {
              this.$message.success('操作成功')
            }
          })
        } else if ((item.num === 4 && operationCode === 1)) {
          this.$vDialog.modal(operationCode41, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 320,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
              }
            },
          })
        } else if ((item.num === 5 && operationCode === 1)) {
          this.$vDialog.modal(operationCode51, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 300,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
              }
            },
          })
        } else if ((item.num === 6 && operationCode === 1)) {
          this.$vDialog.modal(operationCode61, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 300,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
              }
            },
          })
        }
      },
    },
    created () {
      this.getServiceLog()
      this.getServiceItem()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
