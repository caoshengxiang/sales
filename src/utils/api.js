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
}
