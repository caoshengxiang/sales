export default {
  customerList (params, success, error) { // 客户列表
    $axios.get('customer', {
      params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      // error && error()
      let mockdata = {
        'data': {
          'content': [
            {
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
              'organizationId': 2,
              'organizationName': '凡特赛科技',
              'salerList': [
                {
                  'salerId': 1,
                  'salerName': '测试人员',
                  'mobilePhone': '15696895689',
                },
              ],
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
  customerDetail (params, success, error) { // 客户详细
    $axios.get('customer/test_detail' + params.id, {
      // params: params,
    }).then((res) => {
      success && success(res.data)
    }).catch(() => {
      // error && error()
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
          'organizationId': 2,
          'organizationName': '凡特赛科技',
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
  contactsList (params, success, error) { // 联系人列表
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
  contactsDetail (params, success, error) { // 联系人列表
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
          'departmentName': '川东', // 部门名称
          'roles': [ // 多个角色
            {
              'id': 1,
              'name': '管理员',
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
}
