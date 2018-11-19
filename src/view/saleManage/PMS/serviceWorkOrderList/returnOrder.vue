<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog com-container">
      <el-form :model="addForm" ref="addForm" label-width="0px">
        <table class="detail-table">
          <tr>
            <td class="td-title">派工单号</td>
            <td>{{workOrderDetail.orderNum}}</td>
            <td class="td-title">派单时间</td>
            <td>{{workOrderDetail.assignDate && $moment(workOrderDetail.assignDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="td-title">商务管家</td>
            <td>{{orderDetail.businessManagerName}}</td>
            <td class="td-title">商务电话</td>
            <td>{{orderDetail.businessManagerName}}</td>
          </tr>
          <tr>
            <td class="td-title">订单单号</td>
            <td>{{workOrderDetail.orderId}}</td>
            <td class="td-title">客户名称</td>
            <td>{{workOrderDetail.customerName}}</td>
            <td class="td-title"></td>
            <td></td>
            <td class="td-title">服务地</td>
            <td>{{orderDetail.provinceName}}{{orderDetail.cityName}}{{orderDetail.areaName}}</td>
          </tr>
          <tr>
            <td class="td-title">产品类别</td>
            <td>todo</td>
            <td class="td-title">产品名称</td>
            <td>{{orderDetail.goodsName}}</td>
            <td class="td-title">联系人</td>
            <td>{{orderDetail.contactName}}</td>
            <td class="td-title">联系电话</td>
            <td>{{orderDetail.contactPhone}}</td>
          </tr>
          <tr>
            <td class="td-title">签约金额</td>
            <td>{{orderDetail.contractAccount}}</td>
            <td class="td-title">签约时间</td>
            <td>{{orderDetail.contractTime && $moment(orderDetail.contractTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="td-title">签约性质</td>
            <td>{{orderDetail.contractProperty === 1 ? '新签订单' : '续费订单'}}</td>
            <td class="td-title">签约主体</td>
            <td>{{orderDetail.contractObject}}</td>
          </tr>
          <tr>
            <td class="td-title">服务管家</td>
            <td>{{workOrderDetail.managerName}}</td>
            <td class="td-title">管家号</td>
            <td>{{workOrderDetail.managerNo}}</td>
            <td class="td-title">管家类型</td>
            <td>{{workOrderDetail.managerType}}</td>
            <td class="td-title">服务主体</td>
            <td>todo</td>
          </tr>
          <!--<tr>-->
            <!--<td class="td-title">退单号</td>-->
            <!--<td></td>-->
            <!--<td class="td-title">申请日期</td>-->
            <!--<td></td>-->
            <!--<td class="td-title">退单申请人</td>-->
            <!--<td></td>-->
            <!--<td class="td-title">联系电话</td>-->
            <!--<td></td>-->
          <!--</tr>-->
          <tr>
            <td class="td-title">退单原因</td>
            <td colspan="7">
              <el-form-item label="" prop="backReason">
                <el-input type="textarea" v-model="addForm.backReason" :rows="6"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  export default {
    name: 'returnOrder',
    data () {
      return {
        dataLoading: false,
        addForm: {
          backReason: '',
          id: '',
        },
        workOrderDetail: {},
        orderDetail: {},
      }
    },
    props: ['params'],
    methods: {
      getOrderDetail (orderId) {
        API.serviceOrder.detailByOrderId(orderId, (da) => {
          this.orderDetail = da.data
        })
      },
      saveSubmitForm () {
        API.workOrder.returnOrder(this.addForm, (res) => {
          if (res.status) {
            this.$message.success('退单成功')
            this.$vDialog.close({type: 'save'})
          }
        })
      }
    },
    created () {
      this.workOrderDetail = this.params.workOrder
      this.addForm.id = this.workOrderDetail.id
      this.getOrderDetail(this.workOrderDetail.orderId)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
