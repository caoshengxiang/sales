<template>
  <!--<div class="com-dialog-container">-->
  <div>
    <div class="com-dialog com-container">
      <div>
        <span>服务客户: {{params.workDetail.customerName}}</span>
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
            <td style="width: 100px;">{{item.scheduleTime && $moment(item.scheduleTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td style="width: 100px;">{{item.finishTime && $moment(item.finishTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td  style="width: 50px;">
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
                         :key="oplIndex">{{opl}}</el-button>
            </td>
          </tr>
        </table>
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

  export default {
    name: 'opItem',
    data () {
      return {
        serviceLog: [],
        serviceItem: [],
        operationList: [
          ['设置上门日期'],
          ['推送客户告知书', '提醒用户查看', '客户确认'],
          ['推送首次交接清单', '提醒用户查看', '客户确认']
        ],
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
        API.workOrder.serviceItem({
          orderId: this.params.orderId,
          type: this.params.numItem.type,
        }, (da) => {
          this.serviceItem = da.data.content
        })
      },
      operationListHandle (item, operationCode) {
        console.log(item.num, operationCode)
      }
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
