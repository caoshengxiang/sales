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
    detail (params, success, error) { // 管家详情
      $axios.get('serviceManager/' + params).then(res => {
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
    detail (params, success, error) { // 管家详情
      $axios.get('serviceOrder/' + params).then(res => {
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
        params: params
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    workOrderAsignList  (params, success, error) { // 订单下得派单列表
      $axios.get('serviceWorkOrder/assignList', {
        params: params
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
      $axios.post('serviceComplaint/' + params.id + '/inquire', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    handle (params, success, error) { // 投诉处理
      $axios.post('serviceComplaint/' + params.id + '/handle', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    visit (params, success, error) { // 投诉回访
      $axios.post('serviceComplaint/' + params.id + '/visit', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    upInquire (params, success, error) { // 升级调查
      $axios.post('serviceComplaint/' + params.id + '/upInquire', params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    upHandle (params, success, error) { // 升级处理
      $axios.post('serviceComplaint/' + params.id + '/upHandle', params).then(res => {
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
      $axios.post('revisit/serviceRetVisit/assginBatch', null, {params: params}).then(res => {
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
  }
}
