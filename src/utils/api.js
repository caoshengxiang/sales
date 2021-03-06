import utils from '../utils/utils'
import '../utils/axiosConfig' // axios配置文件
// const externalAPI = 'http://47.96.26.250:84'
const externalAPI = 'http://app.zzcfo.cn'

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
    getProducts (success, error) { // 获取产品列表
      $.getJSON(externalAPI + '/rest/service/product/getProducts',
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
    listAboutCustomer (success, error) { // 人员相关公海列表
      $axios.get('customerSea/list').then((res) => {
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
      }).catch(() => {
// error && error()
        let mockdata = {
          'data': {
            'content': [
              {
                'billOrderId': 'CRM232345',
                'billAmount': 3000,
                'refund_amount': 3000,
                'not_refund_amount': 0,
                'changeId': 1,
                'changeName': '财税金融托管',
                'contractId': 1,
                'contractUrl': 'http://www.zzcfo.cn/124214124124.html',
                'customerId': 1,
                'customerName': '凡特赛科技',
                'contracterId': 1,
                'contracterName': '张三',
                'created': '2018-05-09 19:34:22',
                'id': 1,
                'isRenew': false,
                'modified': '2018-05-09 19:34:43',
                'orderId': 1,
                'productId': '1',
                'productName': '财税金融托管',
                'quantity': 2,
                'remark': '',
                'specification': '成长版',
                'orderState': 1,
                'source': 1,
                'creator': 1,
                'creatorName': '测试人员',
                'salerId': 1,
                'salerName': '测试人员',
                'counselorId': 1,
                'counselorName': '测试人员',
                'status': 1,
                'relState': 1,
              },
            ],
            'first': true,
            'last': true,
            'number': 0,
            'numberOfElements': 1,
            'size': 5,
            'sort': null,
            'totalElements': 1,
            'totalPages': 1,
          },
          'error': null,
          'status': true,
        }
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    detail (params, success, error) { // 详细
      $axios({
        method: 'get',
        url: '/salerOrder/' + params.id,
        // params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(() => {
// error && error()
        let mockdata = {
          'data': {
            'billAmount': 3000,
            'refund_amount': 3000,
            'not_refund_amount': 0,
            'changeId': 1,
            'changeName': '财税金融托管',
            'contractId': 1,
            'contractUrl': 'http://www.zzcfo.cn/124214124124.html',
            'customerId': 1,
            'customerName': '凡特赛科技',
            'contracterId': 1,
            'contracterName': '张三',
            'created': '2018-05-09 19:34:22',
            'id': 1,
            'isRenew': false,
            'modified': '2018-05-09 19:34:43',
            'orderId': 1,
            'productId': '1',
            'productName': '财税金融托管',
            'quantity': 2,
            'remark': '',
            'specification': '成长版',
            'orderState': 1,
            'source': 1,
            'status': 1,
            'team': {
              'creator': 1,
              'creatorName': '测试人员',
              'creatorMobilePhone': '15696895689',
              'salerId': 1,
              'salerName': '测试人员',
              'salerMobilePhone': '15696895689',
              'counselorId': 1,
              'counselorName': '测试人员',
              'counselorMobilePhone': '15696895689',
            },
          },
          'error': null,
          'status': true,
        }
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
  },
  // 跟单记录
  orderRecords: {
    list (params, success, error) { // 跟单记录列表
      $axios({
        method: 'get',
        url: '/followOrderRecord/',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(() => {
// error && error()
        let mockdata = {
          'data': {
            'content': [
              {
                'chanceId': 1,
                'chanceName': '财税金融托管',
                'customerId': 1,
                'customerName': '成都凡特赛科技有限公司',
                'created': '2018-05-10 14:42:57',
                'creator': 1,
                'creatorName': '测试人员',
                'stage': 1,
                'followDesc': '跟进；没有电话号码，已加微信跟进',
                'id': 1,
                'modified': '2018-05-10 14:43:01',
                'status': 1,
              }, {
                'chanceId': 1,
                'chanceName': '财税金融托管',
                'customerId': 1,
                'customerName': '成都凡特赛科技有限公司',
                'created': '2018-05-10 14:42:57',
                'creator': 1,
                'creatorName': '测试人员',
                'stage': 1,
                'followDesc': '跟进；没有电话号码，已加微信跟进',
                'id': 2,
                'modified': '2018-05-10 14:43:01',
                'status': 1,
              }, {
                'chanceId': 1,
                'chanceName': '财税金融托管',
                'customerId': 1,
                'customerName': '成都凡特赛科技有限公司',
                'created': '2018-05-10 14:42:57',
                'creator': 1,
                'creatorName': '测试人员',
                'stage': 1,
                'followDesc': '跟进；没有电话号码，已加微信跟进',
                'id': 3,
                'modified': '2018-05-10 14:43:01',
                'status': 1,
              },
            ],
            'first': true,
            'last': true,
            'number': 0,
            'numberOfElements': 1,
            'size': 20,
            'sort': null,
            'totalElements': 3,
            'totalPages': 1,
          },
          'error': null,
          'status': true,
        }
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
  },
  user: {
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
      console.log(params)
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
  //组织管理
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

  //任务审批管理
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
    getsettlement(params, success, error){ // 佣金规则列表
      $axios.get('codeConfig/settlement', {
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    savesettlement(params, success, error){ // 佣金规则列表
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
    getSiteList(params, success, error) {
      $axios.get('codeConfig/site', {
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    saveSite(params, success, error) {
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
    }
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
