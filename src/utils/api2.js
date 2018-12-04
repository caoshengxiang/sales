/*
* 二期接口
* */

import '../utils/axiosConfig' // axios配置文件
// import { externalAPI } from './const'

export default {
  // 管家
  serviceManager: {
    list (params, success, error) { // 列表
      $axios.get('serviceManager', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    assginOrderManagerList (params, success, error) { // 获取派发订单选择管家列表
      $axios.get('serviceManager/work/page', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 管家详情
      $axios.get('serviceManager/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detailByUserId (params, success, error) { // 管家详情,by userid
      $axios.get(`serviceManager/userId/${params}`).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    updateDetail (params, success, error) { // 修改历史详细
      $axios.get('serviceManager/' + params + '/updateData').then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    edit (params, success, error) { // 修改历史详细
      $axios.put('serviceManager/' + params.id, params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    deleteBatch (params, success, error) { // 删除认证（批量）
      $axios.post('serviceManager/batch', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    dataCheck (params, success, error) { // 认证
      $axios.post('serviceManager/' + params.id + '/dataCheck',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    signAudit (params, success, error) { // 面签审核
      $axios.post('serviceManager/' + params.id + '/signAudit',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    bailAudit (params, success, error) { //
      $axios.post('serviceManager/' + params.id + '/bailAudit',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    changeWorkState (params, success, error) { // 更改管家服务状态
      $axios.post('serviceManager/changeWorkState', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 票据
  customerBill: {
    list (params, success, error) {
      $axios.get('serviceCustomerBill', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    audit (params, success, error) {
      $axios.put('serviceCustomerBill/audit/' + params.id, params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) {
      $axios.get('serviceCustomerBill/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    edit (params, success, error) {
      $axios.put('serviceCustomerBill/' + params.id, params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 服务订单
  serviceOrder: {
    list (params, success, error) { // 列表
      $axios.get('serviceOrder', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    listNoAuth (params, success, error) { // 获取服务订单列表（noAuth）
      $axios.get('serviceOrder/page', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 详情
      $axios.get('serviceOrder/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detailByOrderId (params, success, error) { // 获取服务订单详情（orderId）
      $axios.get('serviceOrder/byOrder/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detailAudit (params, success, error) { // 获取服务订单详情（服务工单主键-审批时查询）
      $axios.get(`serviceOrder/byWorkOrderId/${params}`).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    shedule (params, success, error) { // 获取服务订单计划完成时间
      $axios.post('serviceOrder/shedule', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 工单
  workOrder: {
    list (params, success, error) { // 列表
      $axios.get('serviceWorkOrder', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 详情
      $axios.get('serviceWorkOrder/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderWorkingList (params, success, error) { // 工单加工
      $axios.get('serviceWorkOrder/byOrder/' + params.orderId, {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    workOrderAsignList (params, success, error) { // 订单下得派单列表
      $axios.get('serviceWorkOrder/assignList', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    workOrderAsignListById (params, success, error) { // 查询订单已指派工单列表（审批中订单详情下方服务派单列表 ）
      $axios.get('serviceWorkOrder/assignList/byId', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    addWorkOrder (params, success, error) { // 新增服务工单
      $axios.post('serviceWorkOrder', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderAssignManagerList (params, success, error) { // 查询订单管家派单情况列表（派单页面下方管家列表）
      $axios.get('serviceWorkOrder/orderAssign', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    returnOrder (params, success, error) { // 退单
      $axios.post(`serviceWorkOrder/back/${params.id}`, params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    moveOrder (params, success, error) { // 新增服务工单
      $axios.post(`serviceWorkOrder/change/${params.id}`, params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceLog (params, success, error) { // 获取工单服务日志列表
      $axios.get('serviceLog/list', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceItemOperate (params, success, error) { // 操作服务事项
      console.log(params, 1111)
      $axios.post('serviceItem/operate', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceItem (params, success, error) { // 获取工单服务日志列表
      $axios.get('serviceItem', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 服务客户
  serviceCustomer: {
    list (params, success, error) { // 列表
      $axios.get('customer/servicecustomer/list', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 管家详情
      $axios.get('customer/servicecustomer/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detailAbout (params, success, error) { // 详情页获取服务客户部分信息（订单相关）
      $axios.get('customer/sampleServiceCustomerOfDetail',
        {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 服务投诉
  serviceComplaint: {
    list (params, success, error) { // 列表
      $axios.get('serviceComplaint', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 详情
      $axios.get('serviceComplaint/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    assignOrder (params, success, error) { // 服务投诉派单
      $axios.post('serviceComplaint/batch/assign', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    add (params, success, error) { // 新增服务投诉
      $axios.post('serviceComplaint', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    inquire (params, success, error) { // 投诉调查
      $axios.post('serviceComplaint/' + params.id + '/inquire',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    handle (params, success, error) { // 投诉处理
      $axios.post('serviceComplaint/' + params.id + '/handle',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    visit (params, success, error) { // 投诉回访
      $axios.post('serviceComplaint/' + params.id + '/visit',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    upInquire (params, success, error) { // 升级调查
      $axios.post('serviceComplaint/' + params.id + '/upInquire',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    upHandle (params, success, error) { // 升级处理
      $axios.post('serviceComplaint/' + params.id + '/upHandle',
        params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 服务回访
  serviceRetVisit: {
    list (params, success, error) { // 列表
      $axios.get('revisit/serviceRetVisit/list', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 详情
      $axios.get('revisit/serviceRetVisit/detail/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    customerServicesList (params, success, error) { // 获取回访派单内的坐席客服列表
      $axios.get('revisit/serviceRetVisit/customerServices').then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    assginBatch (params, success, error) { // 回访派单
      $axios.post('revisit/serviceRetVisit/assginBatch', null,
        {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    revisit (params, success, error) { // 回访
      $axios.post('revisit/serviceRetVisit/revisit', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 客户意见
  customerComments: {
    list (params, success, error) { // 列表
      $axios.get('suggestion/sales/serviceSuggestion', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 服务抽查
  serviceSpotCheck: {
    list (params, success, error) { // 列表
      $axios.get('check/serviceSpotCheck', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 详情
      $axios.get('check/serviceSpotCheck/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    assignBatch (params, success, error) { // 派单
      $axios.post('check/assignBatch', null, {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    check (params, success, error) { // 抽查
      $axios.post('check/spot', null, {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    csInOrder (params, success, error) { // 客满相关（订单相关信息）
      $axios.get('revisit/csInOrder', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  statistical: {
    serviceWork (params, success, error) { // 服务任务统计(总)
      $axios.get('countSystem/serviceWork', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceWorkManager (params, success, error) { // 服务任务统计（管家 分页）
      $axios.get('countSystem/serviceWorkManager', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceTask (params, success, error) { // 客服任务统计
      $axios.get('countSystem/serviceTask', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceCustomer (params, success, error) { // 服务客户统计
      $axios.get('countSystem/serviceCustomer', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    customerBill (params, success, error) { // 客户票据统计
      $axios.get('countSystem/customerBill', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceWorkState (params, success, error) { // 拒单退单统计(总)
      $axios.get('countSystem/serviceWorkState', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceWorkStateManager (params, success, error) { // 拒单退单统计(管家 分页)
      $axios.get('countSystem/serviceWorkStateManager', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    serviceCompliaint (params, success, error) { // 客户投诉统计
      $axios.get('countSystem/serviceCompliaint', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    suggestion (params, success, error) { // 客户意见统计
      $axios.get('countSystem/suggestion', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderReview (params, success, error) { // 订单评价满意度统计
      $axios.get('countSystem/orderReview', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderManagerReview (params, success, error) { // 服务期管家获得评价明细
      $axios.get('countSystem/orderManagerReview', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderReviewTrend (params, success, error) { // 客户评价订单数趋势统计
      $axios.get('countSystem/orderReviewTrend', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderReviewYOY (params, success, error) { // 服务期管家获得评价明细
      $axios.get('countSystem/orderReviewYOY', {params: params}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  }
}
