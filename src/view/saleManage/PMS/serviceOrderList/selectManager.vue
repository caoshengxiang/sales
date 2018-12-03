<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="managerList"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column width="100" property="name" label="管家姓名"></el-table-column>
        <el-table-column width="100" property="name" label="参与销售"></el-table-column>
        <el-table-column property="provinceId" label="可服务地">
          <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.serviceManagerAreaModels" :key="index">
                <span v-if="index < 2">
                <span v-if="index > 0">、</span>{{item.provinceName + item.cityName + item.areaName}}
                  </span>
              </span>
            <span v-if="scope.row.serviceManagerAreaModels && scope.row.serviceManagerAreaModels.length > 2">......</span>
          </template>
        </el-table-column>
        <el-table-column property="serviceName" label="平台分子机构" width="160"></el-table-column>
        <el-table-column property="evaluationAverageScore" label="服务星级" width="80"></el-table-column>
        <el-table-column property="accountNumber" label="个人/机构" width="100">
          <template slot-scope="scope">
              <span v-for="item in managerCategory" :key="item.value" v-if="item.value === scope.row.category">
                {{item.name}}
              </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="save-button" @click="saveSubmitForm" :disabled="multipleSelection.length != 1">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  export default {
    name: 'selectManager',
    data () {
      return {
        multipleSelection: [],
        managerList: [],
        managerCategory: [ // 管家类别
          {
            name: '平台直属',
            value: 1,
          }, {
            name: '控股子公司',
            value: 2,
          }, {
            name: '第三方机构',
            value: 3,
          }, {
            name: '第三方个人',
            value: 4,
          },
        ],
      }
    },
    props: ['params'],
    methods: {
      getManagerList () {
        API.serviceManager.assginOrderManagerList({
          managerType: this.params.managerType,
          excludeId: this.params.excludeId,
          orderId: this.params.serviceOrderDetail.orderId,
          goodsId: this.params.serviceOrderDetail.goodsId,
          provinceId: this.params.serviceOrderDetail.provinceId,
          cityId: this.params.serviceOrderDetail.cityId,
          areaId: this.params.serviceOrderDetail.areaId,
          workState: 1,
        }, (res) => {
          this.managerList = res.data.content
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      saveSubmitForm () {
        if (this.params.quickList) {
          API.workOrder.addWorkOrder([{
            orderId: this.params.orderId,
            managerId: this.multipleSelection[0].userId,
            serviceType: this.params.serviceType,
            managerType: this.params.managerType
          }], (res) => {
            if (res.status) {
              this.$message.success('派单成功')
              this.$vDialog.close({type: 'quickSelectManager', manager: this.multipleSelection[0]})
            }
          })
        } else {
          this.$vDialog.close({type: 'selectManager', manager: this.multipleSelection[0]})
        }
      }
    },
    created () {
      this.getManagerList()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
