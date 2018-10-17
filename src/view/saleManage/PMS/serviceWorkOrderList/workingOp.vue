<template>
    <div>
      <p class="table-title">我负责的服务内容</p>
      <table class="detail-table">
        <!--<tr v-for="(item, index) in workingListMy" :key="index">--><!--todo 改成这个-->
        <tr v-for="(item, index) in workingListAbout" :key="index">
          <td style="height: 50px;" class="td-center">{{item.serviceName}}[{{item.managerName}}]</td>
          <td colspan="5">
            <div class="com-icon-text-box com-icon-text-h"
                 @click="operateHandle(op.type)"
                 v-for="op in item.orderModuleComposites" :key="op.type">
              <img :src="'/static/images/'+ (op.stage===1?'green':'red') + '/' + getIconName(op.type) + '.png'" alt="">
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
                 @click="operateHandle(op.type)"
                 v-for="op in item.orderModuleComposites" :key="op.type">
              <!--高亮是待处理stage===2  完成stage===1-->
              <img :src="'/static/images/'+ (op.stage===1?'green':'gray') + '/' + getIconName(op.type) + '.png'" alt="">
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
  export default {
    name: 'workingOp',
    data () {
      return {
        workingListMy: [], // 加工,我的
        workingListAbout: [], // 加工，相关
        userInfo: {},
      }
    },
    methods: {
      getOrderWorkingList () {
        API.workOrder.orderWorkingList({orderId: this.$route.query.orderId}, (da) => {
          this.workingListMy = []
          this.workingListAbout = []
          let data = da.data || []
          data.forEach(item => {
            if (item.managerId === this.userInfo.id) {
              this.workingListMy.push(item)
            } else {
              this.workingListAbout.push(item)
            }
          })
        })
      },
      operateHandle (type) {
        alert(type)
      },
      getIconName (type) {
        let names = [
          /* 外勤服务 */
          'icon_call', // 首次电话沟通
          'icon_shangmen', // 首次上门沟通
          'icon_luru', // 录入客户资料
          'icon_zhuangding', // 装订凭证
          '', // 外勤非常规服务
          /* 财务记账 */
          'icon_cons', // 客户资料审核
          'icon_kehupiaoju', // 客户票据审核
          'icon_jizhanggaozhi', // 记账日常告知
          '', // 抄报清卡提醒
          '', // 出具财务报表
          '', // 工商年报
          '', // 记账非常规服务
          /* 财务内控 */
          'icon_caiwuneikongzhidao', // 财务内控构建指导
          /* 纳税申报 */
          'icon_shuiqiangoutong', // 纳税税前沟通
          'icon_nashuishenbao', // 纳税申报
          'icon_nashuiyichang', // 纳税异常提醒
          /* 税收风控 */
          '', // 税收风险提示
          /* 其他计次服务 */
          'icon_start', // 计次开始服务
          'icon_cons', // 计次完成服务
          /* 其他计时服务 */
          'icon_start', // 计时开始服务
          'icon_cons', // 计时完成五福
        ]
        return names[type - 1]
      },
    },
    created () {
      this.userInfo = webStorage.getItem('userInfo')
      this.getOrderWorkingList()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
