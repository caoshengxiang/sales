<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog com-container">
      <el-form :model="addForm" ref="addForm" label-width="0px">
        <table class="detail-table">
          <tr>
            <td class="td-title">派单时间</td>
            <td></td>
            <td class="td-title">商务管家</td>
            <td>{{detail.businessManagerName}}</td>
            <td class="td-title">商务电话</td>
            <td>{{detail.businessManagerName}}</td>
            <td class="td-title"></td>
            <td></td>
          </tr>
          <tr>
            <td class="td-title">订单单号</td>
            <td>{{detail.orderId}}</td>
            <td class="td-title">客户名称</td>
            <td>{{detail.serviceCustomerName}}</td>
            <td class="td-title">服务地</td>
            <td>
              {{ detail.provinceName }}
              {{ detail.cityName }}
              {{ detail.areaName }}
            </td>
            <td class="td-title"></td>
            <td></td>
          </tr>
          <tr>
            <td class="td-title">产品类别</td>
            <td>
              <span v-if="detail.productType === 1">A类产品（记账/托管）</span>
              <span v-if="detail.productType === 2">A类产品（财务顾问/财税金融咨询）</span>
              <span v-if="detail.productType === 3">B类定制化产品</span>
              <span v-if="detail.productType === 4">B类标准化产品</span>
            </td>
            <td class="td-title">产品名称</td>
            <td>{{detail.goodsName}}</td>
            <td class="td-title">联系人</td>
            <td>{{detail.contactName}}</td>
            <td class="td-title">联系电话</td>
            <td>{{detail.contactPhone}}</td>
          </tr>
          <tr>
            <td class="td-title">签约金额</td>
            <td>{{detail.contractAccount}}</td>
            <td class="td-title">签约时间</td>
            <td>{{detail.contractTime && $moment(detail.contractTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="td-title">签约性质</td>
            <td>{{detail.contractProperty===1?'新签':'续费'}}</td>
            <td class="td-title">签约主体</td>
            <td>{{detail.contractObject}}</td>
          </tr>
        </table>

        <table class="detail-table" style="text-align: center">
          <tr>
            <td class="td-title">管家类型</td>
            <td class="td-title">请选择管家</td>
            <td class="td-title">服务主体单位</td>
          </tr>
          <tr v-for="(item, index) in workOrderManagers" :key="index">
            <td>{{item.managerTypeName}}</td>
            <td>
              <!--null-未指派、1-待接收、2-已拒绝、3-进行中、4-已完成、5-退单中、6-已退单-->
              <span v-if="!item.workOrderState && !item.managerName">
                <a class="com-a-link" @click="selectManagerHandle(item, index)">请选择</a>
              </span>
              <span v-if="!item.workOrderState && item.managerName">
                <span style="margin-left: 10px">{{item.managerName}}</span>
                <a class="com-a-link" @click="selectManagerHandle(item, index)">重选</a>
              </span>
              <span v-else-if="item.workOrderState == 2">
                <a class="com-a-link" @click="selectManagerHandle(item, index)">{{item.managerName}}</a>
                <label>已拒单</label>
              </span>
              <span v-else-if="item.workOrderState == 6">
                <a @click="selectManagerHandle(item, index)">{{item.managerName}}</a>
                <label>已退单</label>
              </span>
              <a v-else>{{ item.managerName }}</a>
            </td>
            <td></td>
          </tr>
        </table>
      </el-form>
      <div class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>

    <!--<el-dialog title="选择管家" :visible.sync="dialogTableVisible" style="z-index: 100001">-->
      <!--<el-table-->
        <!--ref="multipleTable"-->
        <!--border-->
        <!--stripe-->
        <!--:data="managerList"-->
        <!--tooltip-effect="dark"-->
        <!--@selection-change="handleSelectionChange"-->
      <!--&gt;-->
        <!--<el-table-column-->
          <!--fixed-->
          <!--type="selection"-->
          <!--align="center"-->
          <!--width="40">-->
        <!--</el-table-column>-->
        <!--<el-table-column property="date" label="日期" width="150"></el-table-column>-->
        <!--<el-table-column property="name" label="姓名" width="200"></el-table-column>-->
        <!--<el-table-column property="address" label="地址"></el-table-column>-->
      <!--</el-table>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import selectManager from './selectManager'

  export default {
    name: 'addDialog',
    data () {
      return {
        dialogTableVisible: false,
        multipleSelection: [],
        dataLoading: false,
        addForm: {},
        detail: {},
        // managerList: [],
        workOrderManagers: [],
        workOrderManagersOld: [], // 修改前的数据，用于对比修改
      }
    },
    props: ['params'],
    methods: {
      getDetail () {
        this.dataLoading = true
        API.serviceOrder.detail(this.params.ids, (da) => {
          this.detail = da.data
          this.getOrderAssignManagerList(this.detail.orderId)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
      getOrderAssignManagerList (orderId) {
        // console.log(orderId)
        API.workOrder.orderAssignManagerList({
          orderId: orderId,
        }, (res) => {
            this.workOrderManagers = res.data
            this.workOrderManagersOld = JSON.parse(JSON.stringify(res.data))
          })
      },
      selectManagerHandle (item, index) {
        // this.dialogTableVisible = true
        // this.getManagerList(managerType)
        // console.log(this.workOrderManagersOld, index)
        this.$vDialog.modal(selectManager, {
          title: '选择管家',
          width: 800,
          height: 400,
          params: {
            managerType: item.managerType,
            serviceOrderDetail: this.detail,
            excludeId: this.workOrderManagersOld[index].managerId || null, // 排除原来得管家id
            quickList: false, // true 快捷派单
          },
          callback: (data) => {
            if (data.type === 'selectManager') {
              console.log(data)
              item.managerName = data.manager.name
              item.managerId = data.manager.userId
              // console.log(item)
              // this.getDetail()
            }
          },
        })
      },
      saveSubmitForm () {
        let paramsArr = []
        this.dataLoading = true
        this.workOrderManagers.forEach((item, index) => {
          // （null-未指派、1-待接收、2-已拒绝、3-进行中、4-已完成、5-退单中、6-已退单）
          if (item.managerId && (!item.workOrderState || item.workOrderState === 2 || item.workOrderState === 6)) { // 待派单，已拒绝
            if (!item.workOrderState) {
              paramsArr.push({
                orderId: this.detail.orderId,
                managerId: item.managerId,
                serviceType: item.serviceType,
                managerType: item.managerType
              })
            } else {
              if (item.managerId !== this.workOrderManagersOld[index].managerId) { // 修改了管家，重派单,需要工单id,(id即为工单id)
                paramsArr.push({
                  id: item.id,
                  orderId: this.detail.orderId,
                  managerId: item.managerId,
                  serviceType: item.serviceType,
                  managerType: item.managerType
                })
              }
            }
          }
        })
        if (!paramsArr.length) {
          this.$message.warning('未选择派单管家')
          return
        }
        API.workOrder.addWorkOrder(paramsArr, (res) => {
          this.dataLoading = false
          if (res.status) {
            this.$message.success('派单成功')
            this.$vDialog.close({type: 'save'})
          }
        })
      }
    },
    created () {
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }

  .com-dialog.com-container {
    padding: 0;
  }
</style>
