import utils from '../utils/utils'
import '../utils/axiosConfig' // axios配置文件
import { externalAPI } from './const'

export default {
  // app外部依赖接口,【注意：基本地址改变】
  external: {
    goodsTypeList (success) { // 商品分类
      $.getJSON(externalAPI + '/rest/service/product/goodsType/list',
        (data) => {
          success && success(data)
        })
    },
    getGoods (params, success) { // 获取单个商品
      $.getJSON(externalAPI + '/rest/service/product/getGoods/' +
        params, (data) => {
        success && success(data)
      })
    },
    findGoods (params, success, error) { // 获取商品列表
      $.getJSON(externalAPI + '/rest/service/product/findGoods',
        params,
        (data) => {
          success && success(data)
        })
    },
    getProducts (params, success, error) { // 获取产品列表【规格】
      $.getJSON(externalAPI + '/rest/service/product/getProducts', params,
        (data) => {
          success && success(data)
        })
    },
    getBySn (params, success, error) { // 订单详细
      $.getJSON(externalAPI + '/rest/order/getBySn', params, (data) => {
        success && success(data)
      })
    },
  },
  // 通用接口,管理配置
  common: {
    region (params, success, error) { // 地区
      $axios.get('region', {
        params: {pid: params},
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    queryAreaList (params, success, error) {
      $axios({
        method: 'get',
        url: 'region',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    codeConfig (params, success, error) { // 2 - 客户级别，3 - 客户行业
      $axios.get('codeConfig', {
        params: {type: params},
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    getSaleCommissionConfig (success, error) { // 查询佣金比例设置记录
      $axios.get('saleCommissionConfig').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    saveSaleCommissionConfig (params, success, error) { // 保存佣金比例设置记录（批量）
      $axios.put('saleCommissionConfig', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    getSettlement (success, error) { // 查询佣金结算规则
      $axios.get('codeConfig/settlement').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    saveSettlement (params, success, error) { // 保存佣金结算规则
      $axios.post('codeConfig/settlement', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  login: {

    login (params, success, error) { // 客户列表
      $axios.get('user/login', {
        params: params,
      }).then((res) => {
        success && success(res.data)
        $axios.defaults.headers.common['authKey'] = res.data.data.authKey // 登录成功后，设置默认请求头
      }).catch((err) => {
        error && error(err)
      })
    },
    logout (params, success, error) {
      $axios.get('user/logout', {
        params: params,
        headers: {
          'authKey': utils.getwebStorage('userInfo').authKey,
        },
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    resetPwd (params, success, error) {
      $axios({
        method: 'post',
        url: 'user/password/edit',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 客户
  customer: {
    list (params, success, error) { // 客户列表
      $axios.get('customer', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    seaList (params, success, error) { // 客户公海列表
      $axios.get('customer/sea/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    teamAboutCustomerlist (success, error) { // 团队成员相关客户列表
      $axios.get('customer/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 客户详细
      $axios.get('customer/' + params.id).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) {
      let p = Object.assign({}, params.body, params.query) // body参数需要加一个source来源属性
      $axios.post('customer', p).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) {
      $axios.put('customer/' + params.path, params.body).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    transfer (params, success, error) {
      $axios.post('customer/transfer', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    return (params, success, error) {
      $axios.post('customer/return', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 客户公海,客户池
  customerSea: {
    list (params, success, error) { // 列表
      $axios.get('customerSea', {
        params: {organizationId: params},
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    listAboutCustomer (success, error) { // 人员相关公海列表,客户
      $axios.get('customerSea/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    seaslist (success, error) { // 人员权限相关公海列表，客户公海
      $axios.get('customerSea/authRel/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addCustomer (params, success, error) { // 客户池新增客户。公海
      let p = Object.assign({}, params.body, params.query) // body参数需要加一个source来源属性
      $axios.post('customerSea/addCustomer', p).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) { // add
      $axios.post('customerSea', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) { //
      $axios.put('customerSea/' + params.path, params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { //
      $axios.get('customerSea/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    allocate (params, success, error) { // 分配
      $axios.post('customerSea/allocate', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    fish (params, success, error) { // 捞取
      $axios.post('customerSea/fish', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    regroup (params, success, error) { // 分组
      $axios.post('customerSea/regroup', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    deleteSea (params, success, error) { // 分组
      $axios.delete('customerSea/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    customerDetail (params, success, error) { // 客户池获取客户详情
      $axios.get('customerSea/customer/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    contactList (params, success, error) { // 客户池获取联系人列表
      $axios.get('customerSea/contacter', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    chanceList (params, success, error) { // 客户池获取机会列表
      $axios.get('customerSea/salerChance', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    orderList (params, success, error) { // 列表
      // $axios({ // todo 需要修改
      //   method: 'get',
      //   url: '/salerOrder',
      //   params: params,
      // }).then(res => {
      //   success && success(res.data)
      // }).catch((err) => {
      //   error && error(err)
      // })
    },
    addContacter (params, success, error) { // 客户池新增联系人
      $axios({
        method: 'post',
        url: 'customerSea/addContacter',
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addChance (params, success, error) {
      $axios.post('customerSea/addChance', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 联系人
  contacts: { // 联系人
    list (params, success, error) { // 联系人列表
      $axios({
        method: 'get',
        url: '/customerContacter',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 联系人详细
      $axios({
        method: 'get',
        url: '/customerContacter/' + params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) {
      $axios({
        method: 'post',
        url: '/customerContacter',
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) {
      $axios({
        method: 'put',
        url: '/customerContacter/' + params.path,
        data: params.body,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 销售机会
  salesOpportunities: {
    list (params, success, error) { // 销售机会列表
      $axios({
        method: 'get',
        url: '/salerChance',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 销售机会详细
      $axios({
        method: 'get',
        url: '/salerChance/' + params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) {
      $axios.post('salerChance', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    confirm (params, success, error) { // 需求确认
      $axios.post('salerChance/confirm/' + params.path,
        params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    discard (params, success, error) { // 输单
      $axios.post('salerChance/discard/' + params.path,
        params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    delete (params, success, error) {
      $axios.delete('salerChance/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    batchDelete (params, success, error) {
      $axios.post('salerChance/batch/delete', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    transfer (params, success, error) { // 转移 newSalerId: '',chanceIds: ''
      $axios.post('salerChance/transfer',
        params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    counselorExit (params, success, error) { // 咨询师主动退出
      $axios.post('salerChance/counselorExit/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 销售订单
  salesOrder: {
    list (params, success, error) { // 列表
      $axios({
        method: 'get',
        url: '/salerOrder',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 详细
      $axios({
        method: 'get',
        url: '/salerOrder/' + params,
        // params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) { // 新增销售订单（预下单）
      $axios.post('salerOrder', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) { // 新增销售订单（预下单）
      $axios.put('salerOrder/' + params.path, params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    appOrder (params, success, error) { // app下单
      $axios.post('salerOrder/doOrder', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    editOrder (params, success, error) { // 修改销售订单
      $axios.put('salerOrder/' + params.path, params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    deleteOrder (params, success, error) { // 删除销售订单
      $axios.delete('salerOrder/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    batchDeleteOrder (params, success, error) { // 批量删除销售订单
      $axios.post('salerOrder/batch/delete', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 跟单记录
  orderRecords: {
    list (params, success, error) { // 跟单记录列表
      $axios({
        method: 'get',
        url: '/followOrderRecord',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) { // 新增跟单记录
      $axios.post('followOrderRecord', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  user: {
    userAuthcode (params, success, error) { // 下拉用户列表
      $axios.get('user/authcode', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    userSearch (params, success, error) { // 下拉用户列表
      $axios.get('user/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    toTransferUserList (params, success, error) { // 待转移销售列表
      $axios.get('user/toTransfer/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    userSubordinates (params, success, error) { // 查询登录用户下属用户列表
      $axios.get('user/subordinates', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    seaFollowersList (params, success, error) { // 客户池销售跟进员列表
      // console.log(params)
      $axios.get('user/sea/followers', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    userList (params, success, error) { // 用户列表
      $axios.get('user', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    userAdd (params, success, error) {
      $axios({
        method: 'post',
        url: '/user',
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    userModify (params, success, error) {
      $axios({
        method: 'put',
        url: `/user/${params.id}`,
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    userDetail (params, success, error) { // 用户列表
      $axios.get('user/' + params.id, {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    userDelete (params, success, error) { // 批量删除用户
      $axios({
        method: 'delete',
        url: '/user?ids=' + params.ids,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    userDisable (params, success, error) { // 批量禁用用户
      $axios({
        method: 'post',
        url: '/user/disable?ids=' + params.ids,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    userResetPassword (params, success, error) { // 批量禁用用户
      $axios({
        method: 'post',
        url: '/user/resetPwd?ids=' + params.ids,
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    roleList (params, success, error) { // 角色列表
      $axios.get('role/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        setTimeout(() => {
          error && error(err)
        }, 1000)
      })
    },
  },
  // 角色管理
  role: {
    queryList (params, success, error) {
      $axios({
        method: 'get',
        url: 'role',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    add (params, success, error) {
      $axios({
        method: 'post',
        url: 'role',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    update (params, success, error) {
      $axios({
        method: 'put',
        url: `/role/${params.id}`,
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    delete (params, success, error) {
      $axios({
        method: 'delete',
        url: `/role/${params.id}`,
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    getDetail (params, success, error) {
      $axios({
        method: 'get',
        url: `/role/${params.id}`,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    getBusinessSystemList (success, error) {
      $axios({
        method: 'get',
        url: '/businessSystem',
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    getBilityList (params, success, error) {
      $axios({
        method: 'get',
        url: '/bility',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
  },
  // 组织管理
  organization: {
    queryList (params, success, error) {
      $axios({
        method: 'get',
        url: 'organization/tree',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    add (params, success, error) {
      $axios({
        method: 'post',
        url: 'organization',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    update (params, success, error) {
      $axios({
        method: 'put',
        url: 'organization',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    delete (params, success, error) {
      $axios({
        method: 'delete',
        url: '/organization/',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    queryAllList (params, success, error) {
      $axios({
        method: 'get',
        url: 'organization',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    queryUserList (params, success, error) {
      $axios({
        method: 'get',
        url: 'organization/userInfo',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    queryUserForList (params, success, error) {
      $axios({
        method: 'get',
        url: 'organization/user',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    setAdmin (params, success, error) {
      $axios({
        method: 'put',
        url: '/organization/admin',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    setHead (params, success, error) {
      $axios({
        method: 'put',
        url: '/organization/head',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    setTrainer (params, success, error) {
      $axios({
        method: 'put',
        url: '/organization/trainer',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    setAssistant (params, success, error) {
      $axios({
        method: 'put',
        url: '/organization/assistant',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
  },

  // 任务审批管理
  task: {
    queryList (params, success, error) { // 用户列表
      $axios.get('approval', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    getTaskDetail (params, success, error) { // 用户列表
      $axios({
        method: 'get',
        url: `/approval/${params.id}`,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    auditTask (params, success, error) { // 用户列表
      $axios({
        method: 'put',
        url: `/approval/${params.id}`,
        params: {state: params.state},
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    approvalCounselor (params, success, error) { // 申请咨询师协同（替换）
      $axios({
        method: 'post',
        url: 'approval/counselor',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  baseSetting: {
    getOrganizationGoodsConf (params, success, error) {
      $axios.get('organizationGoodsConf', {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    saveOrganizationGoodsConf (params, success, error) { // 用户列表
      $axios({
        method: 'put',
        url: `organizationGoodsConf`,
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    getsettlement (params, success, error) { // 佣金规则列表
      $axios.get('codeConfig/settlement', {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    savesettlement (params, success, error) { // 佣金规则列表
      $axios({
        method: 'post',
        url: 'codeConfig/settlement',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    getCodeConfig (params, success, error) { // 用户列表
      $axios.get('codeConfig', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    delete (params, success, error) { // 用户列表
      $axios({
        method: 'delete',
        url: 'codeConfig',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    add (params, success, error) { // 用户列表
      $axios({
        method: 'post',
        url: 'codeConfig',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    edit (params, success, error) { // 用户列表
      $axios({
        method: 'put',
        url: `/codeConfig/${params.id}`,
        data: {codeName: params.codeName},
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    getSiteList (params, success, error) {
      $axios.get('codeConfig/site', {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    saveSite (params, success, error) {
      $axios({
        method: 'post',
        url: 'codeConfig/site',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
  },
  customerAreaSetting: {
    queryList (params, success, error) {
      $axios({
        method: 'get',
        url: 'region',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    add (params, success, error) {
      $axios({
        method: 'post',
        url: 'region',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    update (params, success, error) {
      $axios({
        method: 'put',
        url: 'region',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    delete (params, success, error) {
      $axios({
        method: 'delete',
        url: '/region',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
  },
}
