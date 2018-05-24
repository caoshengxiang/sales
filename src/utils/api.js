export default {
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
    detail (params, success, error) { // 客户详细
      $axios.get('customer/' + params.id).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) {
      let p = Object.assign({}, params.body, params.query)
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
  // 客户公海
  customerSea: {
    list (params, success, error) { //
      $axios.get('customerSea', {
        params: params,
      }).then((res) => {
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
        // params: params,
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
    confirm (params, success, error) {
      $axios.put('salerChance/confirm/' + params.path,
        params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    discard (params, success, error) {
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
  },
  // 销售订单
  salesOrder: {
    list (params, success, error) { // 列表
      $axios({
        method: 'get',
        url: '/salerChance/',
        // params: params,
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
        url: '/customerContacter/' + params.id,
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
        // params: params,
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
    userList (params, success, error) { // 用户列表
      $axios.get('user', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        // error && error()
        let mockdata = {
          'data': {
            'content': [
              {
                'birthday': 1525622400000, // 生日
                'id': 1, // 用户ID
                'mobilePhone': '13281232100', // 手机号
                'name': '测试', // 姓名
                'sex': '男', // 性别
                'wx': '278067641', // 微信号
                'agentNo': 'xxx123', // 代理商号
                'assistantId': 1, // 部门销售助理用户ID
                'assistantName': '赵二', // 部门销售助理用户姓名
                'created': 1525681401000, // 创建or注册时间
                'jobNo': 'xxx123', // 工号
                'modified': 1525681406000, // 更新时间
                'organizationId': 1, // 组织机构ID
                'organizationName': '成都凡特赛科技有限公司', // 组织名称
                'departmentId': 2, // 部门ID
                'departmentName': '川东', // 部门名称
                'roles': [
                  { // 角色
                    'id': 1,
                    'name': '管理员',
                  }],
                'superiorId': 1, // 直接上级用户ID
                'superiorName': '李四', // 直接上级用户姓名
                'trainerId': 1, // 部门培训师用户ID
                'trainerName': '王五', // 部门培训师用户姓名
                'type': 1, // 代理商和员工: 1.员工  2.代理
              },
            ],
            'first': true,
            'last': true,
            'number': 0,
            'numberOfElements': 1,
            'size': 20,
            'totalElements': 1,
            'totalPages': 1,
          },
          'status': true,
        }
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
    userDetail (params, success, error) { // 用户列表
      $axios.get('user/'+params.id, {
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        // error && error()
        let mockdata = {
          'data': {
            'address': '高新区菁蓉国际广场', // 详细地址
            'age': 29, // 年龄
            'areaId': 510101, // 区ID
            'areaName': '市辖区', // 区名
            'avatar': '/1/1/1.jpg', // 头像URL
            'bankAccount': '1', // 开户账号
            'bankDeposit': '1', // 开户银行
            'bankUsername': '1', // 开户户名
            'birthday': 1525622400000, // 生日
            'cityId': 510100, // 城市ID
            'cityName': '成都市', // 城市名称
            'created': 1525681332000, // 创建or注册时间
            'id': 1, // 用户ID
            'idCard': '510511198905110034', // 身份证号码
            'mail': '278067641@qq.com', // 邮箱
            'mobilePhone': '13281232100', // 手机号
            'modified': 1525681334000, // 更新时间
            'name': '测试', // 姓名
            'provinceId': 510000, // 省ID
            'provinceName': '四川省', // 省份名称
            'qq': '278067641', // qq号
            'sex': '男', // 性别
            'wx': '278067641', // 微信号
            'agentNo': '1', // 代理商号
            'assistantId': 1, // 销售助理ID
            'assistantName': '赵二', // 销售助理姓名
            'availableCash': 100.1, // 可提现金额
            'frozenCash': 1.1, // 冻结金额
            'jobNo': '1', // 工号
            'organizationId': 1, // 组织ID
            'organizationName': '成都凡特赛科技有限公司', // 组织名称
            'departmentId': 2, // 部门ID
            'departmentName': '开发部', // 部门名称
            'roles': [ // 多个角色
              {
                'id': 1, // 角色ID
                'name': '管理员', // 角色名称
              },
              {
                'id': 2, // 角色ID
                'name': '推销员', // 角色名称
              },
            ],
            'superiorId': 1, // 直接上级ID
            'superiorName': '李四', // 直接上级姓名
            'trainerId': 1, // 培训师ID
            'trainerName': '王五', // 培训师姓名
            'type': 1, // 代理商和员工: 1.员工  2.代理
          },
          'status': true,
        }
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
    userDelete (params, success, error) { // 批量删除用户
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
    userDisable (params, success, error) { // 批量禁用用户
      $axios({
        method: 'post',
        url: '/user/disable',
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    userResetPassword (params, success, error) { // 批量禁用用户
      $axios({
        method: 'post',
        url: '/user/resetPwd',
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    roleList (params, success, error) { // 角色列表
      $axios.get('role', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        // error && error()
        let mockdata = {
          'data': [
            {
              'id': 1, // 角色ID
              'name': '管理员', // 角色名称
            },
            {
              'id': 2, // 角色ID
              'name': '推销员', // 角色名称
            },
          ],
          'status': true,
        }
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
      })
    },
  },
  //角色管理
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
        url: '/bility',
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
  }
  },
  //组织管理
  organization:{
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
    }
  },
  //公共接口
  common:{
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
    }
  }
}
