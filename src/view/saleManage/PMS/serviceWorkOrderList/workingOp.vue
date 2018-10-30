<template>
  <div>
    <p class="table-title">我负责的服务内容</p>
    <table class="detail-table">
      <tr v-for="(item, index) in workingListMy" :key="index">
        <td style="height: 50px;" class="td-center">{{item.serviceName}}[{{item.managerName}}]</td>
        <td colspan="5">
          <div class="com-icon-text-box com-icon-text-h"
               @click="operateHandle(op, item)"
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
               @click="operateHandle(op, item)"
               v-for="op in item.orderModuleComposites" :key="op.type">
            <!--高亮是待处理state===2  完成state===1-->
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
      orderId: {
        type: String,
        require: true,
      },
      detail: {
        default () {
          return {}
        }
      }
    },
    methods: {
      getOrderWorkingList () {
        API.workOrder.orderWorkingList({orderId: this.orderId}, (da) => {
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
      operateHandle (numItem, typeItem) {
        // 高亮是待处理state===1  完成state===2 type 1-21对应
        console.log('item:', numItem)
        if (numItem.state && numItem.state === 1) {
          if (numItem.type === 1) {
            this.$vDialog.modal(opItem, {
              title: numItem.title,
              width: 1100,
              height: 600,
              params: {
                numItem: numItem,
                typeItem: typeItem,
                workDetail: this.detail,
                orderId: this.orderId,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getOrderWorkingList()
                }
              },
            })
          }
        }
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
