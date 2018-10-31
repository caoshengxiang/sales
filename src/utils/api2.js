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
      if (params.type > 4) { // todo
        let mock = {
          data: {content: []},
        }
        if (params.type === 5) {
          mock.data.content = [
            {num: 10, title: '会计账簿托管'},
            {num: 11, title: '协助税务报道'},
            {num: 12, title: '协助办理“税企银”三方代扣税款协议服务'},
            {num: 13, title: '协助购买税控装置服务'},
            {num: 14, title: '提供首次领票批准资格服务'},
            {num: 15, title: '提供开具国地税完税证明服务'},
            {num: 16, title: '办理新增税种事宜'},
          ]
        } else if (params.type === 6) {
          mock.data.content = [
            {num: 17, title: '审核客户资料'},
            {num: 18, title: '用户财务资料审核'},
            {num: 19, title: '资料存档'},
            {num: 20, title: '开设套账'}
            ]
        } else if (params.type === 7) {
          mock.data.content = [
            {num: 21, title: '客户票据审核'},
            ]
        } else if (params.type === 8) {
          mock.data.content = [
            {num: 22, title: '记账日常告知通知'},
            ]
        } else if (params.type === 9) {
          mock.data.content = [
            {num: 23, title: '提醒客户抄报'},
            {num: 24, title: '提醒客户清'},
            ]
        } else if (params.type === 10) {
          mock.data.content = [
            {num: 25, title: '发送财报确认函'},
            ]
        } else if (params.type === 11) {
          mock.data.content = [
            {num: 26, title: '工商年报'},
            ]
        } else if (params.type === 12) {
          mock.data.content = [
            {num: 27, title: '提供企业与银行对账服务'},
            ]
        } else if (params.type === 13) {
          mock.data.content = [
            {num: 28, title: '提交财务制度'},
            ]
        } else if (params.type === 14) {
          mock.data.content = [
            {num: 29, title: '发送纳税确认函'},
            ]
        } else if (params.type === 15) {
          mock.data.content = [
            {num: 30, title: '上传纳税申报表'},
            {num: 31, title: '完成纳税申报'},
          ]
        } else if (params.type === 16) {
          mock.data.content = [
            {num: 32, title: '发送异常提醒'},
          ]
        } else if (params.type === 17) {
          mock.data.content = [
            {num: 33, title: '税收风险提示'},
          ]
        } else if (params.type === 18) {
          mock.data.content = [
            {num: 34, title: '完成联系人信息'},
            {num: 35, title: '设置开始时间'},
          ]
        } else if (params.type === 19) {
          mock.data.content = [
            {num: 36, title: '上传服务成果'},
            {num: 37, title: '添加服务阶段款项'},
            {num: 38, title: '确认完成服务'},
          ]
        } else if (params.type === 20) {
          mock.data.content = [
            {num: 39, title: '完成联系人信息'},
            {num: 40, title: '设置服务周期'},
          ]
        } else if (params.type === 21) {
          mock.data.content = [
            {num: 41, title: '上传服务成果'},
          ]
        }
        success && success(mock)
        return
      }
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
  },
}
