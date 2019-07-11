<template>
  <!--
  我负责：绿色是已完成，红色待处理
相关：绿色是已完成，灰色是其他人待处理
  -->
  <div>
    <p class="table-title">我负责的服务内容</p>
    <table class="detail-table">
      <tr v-for="(item, index) in workingListMy" :key="index">
        <td style="height: 50px;" class="td-center">{{item.serviceName}}[{{item.managerName}}]</td>
        <td colspan="5">
          <div class="com-icon-text-box com-icon-text-h"
               @click="operateHandle(op, item, op.state===2, 'my')"
               v-for="op in item.orderModuleComposites" :key="op.type">
            <img :src="'/static/images/'+ (op.state===2?'green':'red') + '/icon_gongdan_' + op.type + '.png'" alt="">
            <span class="com-icon-t">{{op.title}}</span>
          </div>
        </td>
      </tr>
    </table>
    <p class="table-title">相关的服务内容</p>
    <table class="detail-table">
      <tr v-for="(item, index) in workingListAbout" :key="index">
        <td style="height: 50px;" class="td-center">{{item.serviceName}}[{{item.managerName}}]</td>
        <td colspan="5">
          <div class="com-icon-text-box com-icon-text-h"
               @click="operateHandle(op, item, true, 'about')"
               v-for="op in item.orderModuleComposites" :key="op.type">
            <!--高亮是待处理state===1  完成state===2-->
            <img :src="'/static/images/'+ (op.state===2?'green':'gray') + '/icon_gongdan_' + op.type + '.png'" alt="">
            <span class="com-icon-t">{{op.title}}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  import opItem from './opItem'
  import opItem22 from './opItem22'
  import opItem32 from './opItem32'

  export default {
    name: 'workingOp',
    data () {
      return {
        workingListMy: [], // 加工,我的
        workingListAbout: [], // 加工，相关
        workingList: [],
        userInfo: {},
      }
    },
    props: {
      orderId: { // 实际订单id
        type: [String, Number],
        require: true,
      },
      workOrderId: { // 工单主键id
        type: [String, Number],
        require: true,
      },
      customerName: {
        default () {
          return {}
        },
      },
      customerId: {
        default () {
          return ''
        },
      },
    },
    methods: {
      getOrderWorkingList () {
        API.workOrder.orderWorkingListNoAuth({orderId: this.orderId}, (da) => {
          this.workingListMy = []
          this.workingListAbout = []
          let data = da.data || []
          this.workingList = data
          data.forEach(item => {
            if (item.managerId === this.userInfo.id) {
              this.workingListMy.push(item)
            } else {
              this.workingListAbout.push(item)
            }
          })
        })
      },
      operateHandle (numItem, typeItem, isShow, from) {
        // 高亮是待处理state===1  完成state===2 type 1-21对应
        console.log('item:', numItem)
        // if (!isShow && numItem.state && numItem.state === 1) {
        let isSetInterval = false
        if (numItem.type === 4 || numItem.type === 9 || numItem.type === 10 || numItem.type === 14 || numItem.type === 15) {
          isSetInterval = true
        }
        if (numItem.type === 7) { // 7 客户票据审核
          this.$router.push({name: 'customerBill'})
        } else if (numItem.type === 8) { // 记账日常告知
          this.$vDialog.modal(opItem22, {
            title: numItem.title,
            width: 1100,
            height: 600,
            params: {
              numItem: numItem,
              typeItem: typeItem,
              customerName: this.customerName,
              customerId: this.customerId,
              orderId: this.orderId,
              workOrderId: typeItem.id,
              isShow: from === 'about', // 控制操作的显示；类似记账日常告知操作只要是我的服务，一直可操作
              isSetInterval: isSetInterval, // 周期服务，用于服务年月删选禁用
            },
            callback: (data) => {
              if (data.type === 'save') {
                this.getOrderWorkingList()
              }
            },
          })
        } else if (numItem.type === 16) { // 发送异常提醒
          this.$vDialog.modal(opItem32, {
            title: numItem.title,
            width: 1100,
            height: 600,
            params: {
              numItem: numItem,
              typeItem: typeItem,
              customerName: this.customerName,
              customerId: this.customerId,
              orderId: this.orderId,
              workOrderId: typeItem.id,
              isShow: from === 'about',
              isSetInterval: isSetInterval,
            },
            callback: (data) => {
              if (data.type === 'save') {
                this.getOrderWorkingList()
              }
            },
          })
        } else if (numItem.type === 21) {
          this.$vDialog.modal(opItem, {
            title: numItem.title,
            width: 1200,
            height: 600,
            params: {
              numItem: numItem,
              typeItem: typeItem,
              customerName: this.customerName,
              customerId: this.customerId,
              orderId: this.orderId,
              workOrderId: typeItem.id,
              isShow: false,
              isSetInterval: isSetInterval,
            },
            callback: (data) => {
              if (data.type === 'save') {
                this.getOrderWorkingList()
              }
            },
          })
        } else if (numItem.type <= 21) {
          this.$vDialog.modal(opItem, {
            title: numItem.title,
            width: 1200,
            height: 600,
            params: {
              numItem: numItem,
              typeItem: typeItem,
              customerName: this.customerName,
              customerId: this.customerId,
              orderId: this.orderId,
              workOrderId: typeItem.id,
              isShow: isShow,
              isSetInterval: isSetInterval,
            },
            callback: (data) => {
              if (data.type === 'save') {
                this.getOrderWorkingList()
              }
            },
          })
        }
        // }
      },
    },
    created () {
      this.userInfo = webStorage.getItem('userInfo')
      this.getOrderWorkingList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
