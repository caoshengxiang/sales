<template>
  <!--<div class="com-dialog-container">-->
  <div class="com-dialog com-container">
    <div>
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

      <div class="operation-code-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
          <el-form-item label="" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入纳税异常提醒"
              :rows="3"
              v-model="ruleForm.message">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button class="save-button" @click="saveSubmitForm('ruleForm')">发布纳税异常提醒</el-button>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 10px;">发布记录</div>
      <table class="detail-table" style="text-align: center">
        <tr>
          <td class="td-title" style="width: 30px;">序号</td>
          <td class="td-title" style="width: 100px;">事项名称</td>
          <td class="td-title" style="width: 100px;">内容</td>
          <td class="td-title" style="width: 100px;">建立时间</td>
          <td class="td-title" style="width: 100px;">发布人</td>
        </tr>
        <tr v-for="(item, index) in serviceItem" :key="index">
          <td style="width: 30px;">{{index+1}}</td>
          <td style="width: 100px;">{{item.title}}</td>
          <td style="width: 100px;">{{item.result}}</td>
          <td style="width: 100px;">{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}
          </td>
          <td style="width: 100px;">{{item.operator}}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 30px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>服务日志</span>
        </div>
        <div style="min-height: 200px;">
          <div v-for="(item, index) in serviceLog" :key="index" class="log-item">
            {{item.operatorName}}
            &nbsp;&nbsp;
            {{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}
            &nbsp;&nbsp;
            {{item.description}}
            &nbsp;&nbsp;
            {{item.remark}}
          </div>
        </div>
      </el-card>
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
        form: {
          year: null,
          month: null,
          orderId: this.params.orderId,
          type: this.params.numItem.type,
        },
        ruleForm: {
          message: '', // 存result
        },
        rules: {
          message: [
            {required: true, message: '请输入纳税异常提醒', trigger: 'blur'},
          ],
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
      saveSubmitForm (item) {
        let baseParam = {
          orderId: this.params.orderId,
          workOrderId: this.params.workOrderId,
          // id: item.id,
          type: 16,
          num: 32,
          operationCode: 1,
        }
        // console.log(item, operationCode)
        console.log(baseParam)
        API.workOrder.serviceItemOperate(Object.assign({}, baseParam, {
          result: this.ruleForm.message,
        }), (res) => {
          if (res.status) {
            this.$message.success('操作成功')
            this.getServiceLog()
            this.getServiceItem()
          }
        })
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

  .log-item {
    margin-bottom: 6px;
  }
</style>
