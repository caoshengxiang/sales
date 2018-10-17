/*
* 二期接口
* */

import '../utils/axiosConfig' // axios配置文件
// import { externalAPI } from './const'

export default {
  serviceManager: { // 管家
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
  },
  customerBill: { // 票据
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
  workOrder: { // 工单
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
      $axios.get('' + params).then(res => { // todo url
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
    detail (params, success, error) { // 管家详情
      $axios.get('serviceComplaint/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  }
}
