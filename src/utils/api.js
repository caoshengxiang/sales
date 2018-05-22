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
      $axios.get('customer/test_detail' + params.id, {
        // params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        // error && error(err)
        let mockdata = {
          'data': {
            'address': '四川省成都市高新区太平洋保险金融大厦A座10F',
            'areaId': null,
            'areaName': '高新区',
            'business': '',
            'businessLicense': '456987456987456',
            'cityId': 510100,
            'cityName': '成都市',
            'created': '2018-05-07 19:51:51',
            'creator': 1,
            'creatorName': '测试人员',
            'id': 1,
            'industry': 1,
            'industryName': '互联网',
            'level': 1,
            'levelName': '重要客户',
            'modified': '2018-05-07 19:52:00',
            'modifier': 1,
            'modifierName': '测试人员',
            'name': '成都凡特赛科技有限公司',
            'phone': '15696895689',
            'provinceId': 510000,
            'provinceName': '四川省',
            'seaId': 1,
            'seaName': '默认公海',
            'shortName': '凡特赛科技',
            'source': 1,
            'state': 1,
            'status': 1,
            'website': 'www.zzcfo.cn',
            'ownerId': 2,
            'ownerName': '凡特赛科技',
            'activeTime': '2018-05-07 19:52:00',
            'followerId': 1,
            'followerName': '测试人员',
            'team': {
              'creator': 1,
              'creatorName': '测试人员',
              'mobilePhone': '15696895689',
              'salerList': [
                {
                  'salerId': 1,
                  'salerName': '测试人员',
                  'mobilePhone': '15696895689',
                },
              ],
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
    add (params, success, error) {
      $axios.post('customer', params.body, {
        params: params.query,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) {
      $axios.put('customer' + params.path, params.body).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    transfer (params, success, error) {
      $axios.post('customer/transfer', params).then((res) => {
        success && success(res.data)
      }).catch(() => {
        error && error()
      })
    },
    return (params, success, error) {
      $axios.post('customer/return', params).then((res) => {
        success && success(res.data)
      }).catch(() => {
        error && error()
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
      }).catch(() => {
// error && error()
        let mockdata = {
          'data': {
            'content': [
              {
                'bakPhone': '15690050900',
                'birthday': '2018-05-08 00:00:00',
                'contacterName': '张三',
                'created': '2018-05-08 21:18:40',
                'creator': 1,
                'creatorName': '测试人员',
                'customerId': 1,
                'customerName': '凡特赛科技',
                'department': '技术部',
                'id': 1,
                'mail': '15690050900@qq.com',
                'modified': '2018-05-08 21:20:58',
                'modifier': 1,
                'modifierName': '测试人员',
                'phone': '15690050900',
                'position': '技术总监',
                'qq': '23569897896',
                'remark': '',
                'sex': '男',
                'status': 1,
                'wx': '23569897896',
              },
            ],
            'first': true,
            'last': true,
            'number': 0,
            'numberOfElements': 1,
            'size': 20,
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
    detail (params, success, error) { // 联系人详细
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
            'bakPhone': '15690050900',
            'birthday': '2018-05-08 00:00:00',
            'contacterName': '张三',
            'created': '2018-05-08 21:18:40',
            'creator': 1,
            'creatorName': '测试人员',
            'customerId': 1,
            'customerName': '凡特赛科技',
            'department': '技术部',
            'id': 1,
            'mail': '15690050900@qq.com',
            'modified': '2018-05-08 21:20:58',
            'modifier': 1,
            'modifierName': '测试人员',
            'phone': '15690050900',
            'position': '技术总监',
            'qq': '23569897896',
            'remark': '',
            'sex': '男',
            'status': 1,
            'wx': '23569897896',
            'activeTime': '2018-05-08 21:20:58',
            'followerId': 1,
            'followerName': '测试人员',
            'team': {
              'creator': 1,
              'creatorName': '测试人员',
              'mobilePhone': '15696895689',
              'salerList': [
                {
                  'salerId': 1,
                  'salerName': '测试人员',
                  'mobilePhone': '15696895689',
                },
              ],
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
    add (params, success, error) {
      $axios({
        method: 'post',
        url: '/customerContacter/',
        // params: params,
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch(() => {
        error && error()
      })
    },
    delete (params, success, error) {
      $axios({
        method: 'post',
        url: '/customerContacter/',
        // params: params,
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch(() => {
        error && error()
      })
    },
  },
  // 销售机会
  salesOpportunities: {
    list (params, success, error) { // 销售机会列表
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
                'billDate': '2018-05-09 00:00:00',
                'billProductId': '1',
                'billProductName': '财税金融托管',
                'chanceRemark': '',
                'contacterId': '1',
                'contacterName': '测试人员',
                'contractId': 1,
                'contractUrl': 'http://www.zzcfo.cn/124214124124.html',
                'counselorId': 1,
                'counselorName': '测试人员',
                'created': '2018-05-09 14:29:37',
                'creator': 1,
                'creatorName': '测试人员',
                'customerId': 1,
                'customerName': '凡特赛科技',
                'discardRemark': '',
                'followDate': '2018-05-09 11:45:50',
                'id': 1,
                'intentBillAmount': 3000,
                'intentProductCate': 1,
                'intentProductCateName': '会计记账',
                'intentProductId': '1',
                'intentProductName': '财税金融全托管',
                'modified': '2018-05-09 14:29:50',
                'salerId': 1,
                'salerName': '测试人员',
                'source': 1,
                'stage': 1,
                'status': 1,
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
    detail (params, success, error) { // 销售机会详细
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
            'billDate': '2018-05-09 00:00:00',
            'billProductId': '1',
            'billProductName': '财税金融托管',
            'billOrderId': 'CRM232345',
            'billAmount': 3000,
            'chanceRemark': '',
            'contacterId': '1',
            'contracterName': '张三',
            'contractId': 1,
            'contractUrl': 'http://www.zzcfo.cn/124214124124.html',
            'created': '2018-05-09 14:29:37',
            'creator': 1,
            'creatorName': '测试人员',
            'modifier': 1,
            'modifierName': '测试人员',
            'customerId': 1,
            'customerName': '凡特赛科技',
            'discardRemark': '',
            'followDate': '2018-05-09 11:45:50',
            'id': 1,
            'intentBillAmount': 3000,
            'intentProductCate': 1,
            'intentProductCateName': '会计记账',
            'intentProductId': '1',
            'intentProductName': '财税金融全托管',
            'modified': '2018-05-09 14:29:50',
            'salerId': 1,
            'salerName': '测试人员',
            'source': 1,
            'stage': 1,
            'status': 1,
            'team':
              {
                'creator':
                  1,
                'creatorName':
                  '测试人员',
                'creatorMobilePhone':
                  '15696895689',
                'salerId':
                  1,
                'salerName':
                  '测试人员',
                'salerMobilePhone':
                  '15696895689',
                'counselorId':
                  1,
                'counselorName':
                  '测试人员',
                'counselorMobilePhone':
                  '15696895689',
              },
          },
          'error':
            null,
          'status':
            true,
        }
        setTimeout(() => {
          error && error(mockdata)
        }, 1000)
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
    $axios.post('user', {
      params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      let mockdata = {
        'status': true,
      }
      setTimeout(() => {
        error && error(mockdata)
      }, 1000)
    })
  },
  userDetail (params, success, error) { // 用户列表
    $axios.get('user', {
      params: params,
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
    $axios.get('user', {
      params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      let mockdata = {
        'status': true,
      }
      setTimeout(() => {
        error && error(mockdata)
      }, 1000)
    })
  },
  userDisable (params, success, error) { // 批量禁用用户
    $axios.get('user/disable', {
      params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      let mockdata = {
        'status': true,
      }
      setTimeout(() => {
        error && error(mockdata)
      }, 1000)
    })
  },
  userResetPassword (params, success, error) { // 批量禁用用户
    $axios.get('user/resetPwd', {
      params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      let mockdata = {
        'status': true,
      }
      setTimeout(() => {
        error && error(mockdata)
      }, 1000)
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
        url: '/businessSystem'
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    getBilityList (params,success, error) {
      $axios({
        method: 'get',
        url: '/bility',
        params:params
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    }
  },
  organizationList (params, success, error) { // 组织或部门列表
    $axios.get('organization', {
      params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      // error && error()
      let mockdata = {
        'data': [
          {
            'id': 1,    //ID
            'level': 1,    //级别
            'name': '开发部', //组织名称
            'admins': [
              {    //管理员
                'id': 1,    //管理员用户ID
                'name': '张三',    //管理员姓名
              }],
            'pid': 0,    //上级组织ID
          },
          {
            'id': 2,    //ID
            'level': 2,    //级别
            'name': '测试部', //组织名称
            'admins': [
              {    //管理员
                'id': 2,    //管理员用户ID
                'name': '李四',    //管理员姓名
              }],
            'pid': 2,    //上级组织ID
          },
        ],
        'status': true,
      }
      setTimeout(() => {
        error && error(mockdata)
      }, 1000)
    })
  },
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
    }
  }
}
