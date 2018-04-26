<!--申请审核流程组件
2018.4.20 姚政伟 构建
-->
<template>
  <el-steps align-center>
    <el-step v-for="(item,index) in auditProcess" :key="index" :title="item.auditPersonDept"
             :description="auditShowContent(item)" :status="auditStatus(item)"></el-step>
  </el-steps>
</template>

<script>
  import utils from '@/common/utils'

  export default {
    name: 'auditProcess',
    props: {
      auditProcess: {
        type: Array,
        required: true,
        default: function () {
          return []
        },
      },
    },
    methods: {
      auditStatus (auditprocess) {
        var status = 'wait'
        if (auditprocess.auditStamp) {
          if (auditprocess.pass === 1) {
            status = 'finish'
          } else {
            status = 'error'
          }
        } else {
          status = 'process'
        }

        return status
      },
      auditShowContent (auditprocess) {
        var content = '待审核'
        if (auditprocess.auditStamp) {
          if (auditprocess.pass === 1) {
            content = utils.formatDate(auditprocess.auditStamp)
          } else {
            content = auditprocess.refuseReason
          }
        } else {
          content = '待审核'
        }

        return content
      },
    },
  }
</script>
