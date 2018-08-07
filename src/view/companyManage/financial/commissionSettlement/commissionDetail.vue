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
        show-summary
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
        type: 1,
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
