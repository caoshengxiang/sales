<template>
  <div class="com-container"
       element-loading-text="数据加载中...">
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
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
          label="销售佣金类型"
        >

          <el-table-column
            align="center"
            label="需求录入"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop="demandRebateSubjectName"
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="工作人员"
              prop="demandWorkerName"
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="本期应反"
              prop="demandAmount"
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="销售跟进"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop="followingRebateSubjectName"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="followingWorkerName"
              label="工作人员"
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="本期应反"
              prop="followingAmount"
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="销售咨询"
          >
            <el-table-column
              align="center"
              label="返佣对象"
              prop="counselorRebateSubjectName"
            >
              >
            </el-table-column>

            <el-table-column
              align="center"
              label="工作人员"
              prop="counselorWorkerName"
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="本期应反"
              prop="counselorAmount"
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="营销副总"
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
            label="销售总监"
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
            label="销售经理"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop="regionalManagerRebateSubjectName"
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
            label="新客推荐人"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop=""
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="工作人员"
              prop=""
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="本期应反"
              prop=""
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="直接培育人"
          >
            <el-table-column
              align="center"
              label="返佣对象"
              prop=""
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="工作人员"
              prop=""
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="本期应反"
              prop=""
            >
            </el-table-column>

          </el-table-column>

          <el-table-column
            align="center"
            label="间接培育人"
          >

            <el-table-column
              align="center"
              label="返佣对象"
              prop=""
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="工作人员"
              prop=""
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="本期应反"
              prop=""
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
  import { mapState } from 'vuex'

  export default {
    name: 'list',
    data () {
      return {
        tableData: [],
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
      var that = this
      let param = {
        clearId: that.params.id,
        type: 1,
      }
      API.financial.detail(param, (res) => {
        that.loading = false
        if (res.status) {
          that.tableData = res.data
        }
      })
    },
    methods: {},
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
