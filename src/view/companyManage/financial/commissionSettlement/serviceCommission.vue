<template>
  <div class="com-container"
       element-loading-text="数据加载中...">
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        show-summary
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="period"
          label="返佣账期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalAmount"
          label="合计返佣"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="服务佣金类型"
        >

          <el-table-column
            align="center"
            label="外勤管理"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop="vpRebateSubjectName"
            >
            </el-table-column>


            <el-table-column
              align="center"
              label="工作人员"
              prop="vpWorkerName"
            >
            </el-table-column>


            <el-table-column
              align="center"
              label="本期应反"
              prop="vpAmount"
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="财务管理"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop="zoneDirectorRebateSubjectName"
            >
            </el-table-column>


            <el-table-column
              align="center"
              prop="zoneDirectorWorkerName"
              label="工作人员"
            >
            </el-table-column>


            <el-table-column
              align="center"
              label="本期应反"
              prop="zoneDirectorAmount"
            >
            </el-table-column>


          </el-table-column>

          <el-table-column
            align="center"
            label="税务管家"
          >


            <el-table-column
              align="center"
              label="返佣对象"
              prop="regionalManagerRebateSubjectName"
            >
              >
            </el-table-column>


            <el-table-column
              align="center"
              label="工作人员"
              prop="regionalManagerWorkerName"
            >
            </el-table-column>


            <el-table-column
              align="center"
              label="本期应反"
              prop="regionalManagerAmount"
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="内控管家"
          >


            <el-table-column
              align="center"
              label="返佣对象"
              prop="assistantRebateSubjectName"
            >
              >
            </el-table-column>


            <el-table-column
              align="center"
              label="工作人员"
              prop="assistantWorkerName"
            >
            </el-table-column>


            <el-table-column
              align="center"
              label="本期应反"
              prop="assistantAmount"
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="金融管家"
          >


            <el-table-column
              align="center"
              label="返佣对象"
              prop="trainerRebateSubjectName"
            >
              >
            </el-table-column>


            <el-table-column
              align="center"
              label="工作人员"
              prop="trainerWorkerName"
            >
            </el-table-column>


            <el-table-column
              align="center"
              label="本期应反"
              prop="trainerAmount"
            >
            </el-table-column>

          </el-table-column>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'list',
    data () {
      return {
        tableData:[]
      }
    },
    computed: {
      ...mapState('constData', [
        'userTypeOptions',
        'userourceType',
        'usertate',
        'pagesOptions',
      ]),
      ...mapState('user', [
        'userList',
        'userTotal',
      ]),
    },
    components: {
      comButton,
    },
    props: ['params'],
    created () {
      var that=this
      let param = {
        clearId: that.params.id,
        type: 3,
      }
      API.financial.detail(param, (res) => {
        that.loading = false
        if (res.status) {
          that.tableData = res.data
        } else {
          Message({
            message: res.error.message,
            type: 'error',
          })
        }
      }, (mock) => {
        that.loading = false
        Message({
          message: '系统繁忙，请稍后再试！',
          type: 'error',
        })
      })
    },
    methods: {
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
