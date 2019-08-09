// import utils from '../utils/utils'
import '../utils/axiosConfig' // axios配置文件
import { externalAPI } from './const'
import API2 from './api2'

const API1 = {
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
  activity: {
    list (params, success, error) { // 活动列表
      // console.log(params)
      $axios.post('meetingSale/searchOrQueryMeeting', params, {params: params}
        ).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 活动详细
      // console.log(params)
      $axios.get('meetingSale/detail/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    log (params, success, error) { // 活动操作记录
      // console.log(params)
      $axios.get('meetingSale/queryLog', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    chance (params, success, error) { // 活动下机会列表
      // console.log(params)
      $axios.post('meetingSale/searchOrQueryChanceOfMeeting', null,
        {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addChance (params, success, error) { // 添加机会
      // console.log(params)
      $axios.post('meetingSale/limit/addSaleChance', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addChance2 (params, success, error) { // 添加机会
      // console.log(params)
      $axios.post('meetingSale/addSaleChance', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    managerList (params, success, error) { // 活动管家
      $axios.get('meetingSale/meetingManagerRel/list/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    selectManagerList (params, success, error) { // 活动添加的管家列表
      $axios.get('meetingSale/meetingSaleOfManager/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addHousekeeper (params, success, error) { // 新增
      // console.log(params)
      $axios.post('meetingSale/batchAddManager', null, {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    deleteHousekeeper (params, success, error) {
      // console.log(params)
      $axios.delete('meetingSale/batchTManager', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) { // 新增
      // console.log(params)
      $axios.post('meetingSale/addMeeting', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) { // 编辑
      // console.log(params)
      $axios.put('meetingSale/' + params.id, params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
	cooperationChannel (params, success, error) {  //合作渠道
      $axios.get('/meetingCooperationChannel/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	customerIntentionZX (params, success, error) {  //用户意向
      $axios.get('/applyIntention/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	meetingLecturerZX (params, success, error) {  //会议讲师
      $axios.get('/meetingLecturer/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	staffZX (params, success, error) {  //会议负责人 / 会议专员
      $axios.get('/user/listOrgUser').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	applyUserZX (params, success, error) {  //报名列表
      $axios.get('/applyUser', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	applyUserSourceZX (params, success, error) {  //完善中的需求来源
      $axios.get('/applyUser/source', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	applySignInZX (params, success, error) { //报名签到
		$axios.put('/applyUser/sign', null, {params: params}).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	cooperationChannelList (params, success, error) { // 会议合作渠道列表
		// console.log(params)
		$axios.get('/meetingCooperationChannel', {params: params}).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	addCooperationChannelList (params, success, error) { // 新增会议合作渠道
		// console.log(params)
		$axios.post('/meetingCooperationChannel', params).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	editCooperationChannelList (params, success, error) { // 修改会议合作渠道
		$axios.put('/meetingCooperationChannel/' + params.id, params).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	conferenceLecturerList (params, success, error) { // 会议讲师列表
		// console.log(params)
		$axios.get('/meetingLecturer', {params: params}).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	addconferenceLecturerList (params, success, error) { // 新增会议讲师
		// console.log(params)
		$axios.post('/meetingLecturer', params).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	editconferenceLecturerList (params, success, error) { // 修改会议讲师
		$axios.put('/meetingLecturer/' + params.id, params).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	getLecturerUserInfo (params, success, error) { // 根据所选人员id获取人员具体信息
		// console.log(params)
		$axios.get('/user/' + params.id).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	applyIntentionListZX (params, success, error) { // 报名意向管理列表
		// console.log(params)
		$axios.get('/applyIntention', {params: params}).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	applyIntentionListZXs (params, success, error) { // 点击查报名意向管理列表
		// console.log(params)
		$axios.get('/applyIntention/Children', {params: params}).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	addapplyIntentionListZX (params, success, error) { // 新增报名意向
		// console.log(params)
		$axios.post('/applyIntention', params).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	editapplyIntentionListZX (params, success, error) { // 修改报名意向
		$axios.put('/applyIntention/' + params.id, params).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},
	deleteApplyIntentionListZX (params, success, error) { // 删除报名意向
		$axios.put('/applyIntention/del', null, {params: params}).then((res) => {
			success && success(res.data)
		}).catch((err) => {
			error && error(err)
		})
	},


    end  (params, success, error) { // 新增
      // console.log(params)
      $axios.post('meetingSale/meetingSaleBatchEnd', null, {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    deleteActivity (params, success, error) { // 新增
      // console.log(params)
      $axios.delete('meetingSale/meetingSaleBatchDelete', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 通用接口,管理配置
  common: {
    organizationGoodsConf (params, success, error) { // 组织商品配置下拉列表
      // console.log(params)
      $axios.get('organizationGoodsConf/list', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    region (params, success, error) { // 地区
      $axios.get('region', {
        params: {pid: params, status: 1},
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
    codeConfig (params, success, error) { // 2 - 客户级别，3 - 客户行业， 5 - 客户源
      $axios.get('codeConfig', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    listPost(params, success, error) {
      $axios.get('/post/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    industry (params, success, error) { // 2 - 客户级别，3 - 客户行业， 5 - 客户源
      $axios.get('category', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    industrys (params, success, error) {   //获取行业树
      $axios({
        method: 'get',
        url: 'category/tree',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    getSaleCommissionConfig (params, success, error) { // 查询佣金比例设置记录
      $axios.get('saleCommissionConfig', {params: params}).then((res) => {
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
    contractSubjects (params, success, error) { // 查询商品签约主体列表
      $axios.get('organizationGoodsConf/contractSubjects', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    uploadFile (params, success, error) { // 文件上传,avatar：用户头像；
      $axios.post('file/upload', params.body).then((res) => { // 之前有个type,现在全部用upload
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    serviceContentConfigDetail (params, success, error) { // 获取服务内容配置详情
      $axios.get(`serviceItemConfig/goodsId/${params.goodId}`, {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    serviceItemConfigAll (params, success, error) { // 获取所有服务事项配置
      $axios.get('serviceItemConfig/all', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addServiceItemConfig (params, success, error) { // 新增服务内容配置
      $axios.post('serviceItemConfig', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    editServiceItemConfig (params, success, error) { // 修改服务内容配置详情
      $axios.put(`serviceItemConfig/${params.id}`, params).then((res) => {
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
        // headers: {
        //   'authKey': utils.getwebStorage('userInfo').authKey,
        // },
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
    recoverPwd (params, success, error) {
      $axios.get('user/password/reset', {
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
    VisListZX (params, success, error) { // 渠道资源库列表
      $axios.get('customer/visitor/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    salerChanceListVisZX (params, success, error) { // 渠道资源库管理的需求列表
      $axios.get('salerChance/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    salerOrderListVisZX (params, success, error) { // 渠道资源库管理的销售订单列表
      $axios.get('salerOrder/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    visImport (params, success, error) {      //渠道资源库管理的批量导入
      $axios.post('customer/import', params).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    listAdmin (params, success, error) { // 客户列表,后端
      $axios.get('customer/admin', {
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
    teamAboutCustomerlist (params, success, error) { // 团队成员相关客户列表
      $axios.get('customer/list', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    customerSearch (params, success, error) { // 客户搜索
      $axios.get('customer/search', {params: params}).then((res) => {
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
    detailNoAuth (params, success, error) { // 客户详细, 无权限
      $axios.get('customer/noAuth/' + params.id).then((res) => {
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
    edit (params, success, error) {  //客户编辑
      $axios.put('customer/' + params.path, params.body).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    visEdit (params, success, error) {   //访客编辑
      $axios.put('customer/visitor/' + params.path, params.body).then(res => {
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
    checkValid (params, success, error) { // 是否可以判定客户
      $axios.get('customer/checkValid', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    chanceCheckValid (params, success, error) { // 机会列表是否可以判定客户
      // $axios.get('salerChance/checkValid', {params: params}).then((res) => {
      $axios.get('salerChance/checkValid', {params: params}).then((res) => {
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
    getAllCustomerSea (success, error) { //获取所有机会公海，没有权限
      $axios.get('chanceSea/all/defaultSea').then((res) => {
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
    editCustomer (params, success, error) { // 客户池新增客户。公海
      $axios.put('customerSea/customer/' + params.path,
        params.body).then(res => {
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
    edit (params, success, error) { // 客户池编辑
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
    crossCompanyTransfer (params, success, error) { //跨公司转移
      $axios({
        method: 'put',
        url: 'salerChance/chanceSeaId',
        params: params
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    deleteSea (params, success, error) { // 删除
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
    seaImport (params, success, error) {
      $axios.post('customerSea/import', params).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 联系人
  contacts: { // 联系人
    listNoAuth (params, success, error) { // 联系人列表,相关【无权限】
      $axios({
        method: 'get',
        url: 'customerContacter/page',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
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
    customerContacterRenewallist (params, success, error) { // 团队成员相关客户列表
      $axios.get('customerContacter/renew', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    listAdmin (params, success, error) { // 联系人列表, 后台
      $axios({
        method: 'get',
        url: '/customerContacter/admin',
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
    detailNoAuth (params, success, error) { // 联系人详细
      $axios({
        method: 'get',
        url: '/customerContacter/noAuth/' + params,
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
    listNoAuth (params, success, error) { // 销售机会列表,相关【无权限】
      $axios({
        method: 'get',
        url: 'salerChance/page',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
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
    listAdmin (params, success, error) { // 销售机会列表
      $axios({
        method: 'get',
        url: '/salerChance/admin',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    seaList  (params, success, error) { // 公海机会列表
      $axios({
        method: 'get',
        url: '/salerChance/sea/list',
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
    edit (params, success, error) { // 修改销售机会
      $axios({
        method: 'put',
        url: '/salerChance/' + params.id,
		data: params
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    // 新增访客
    addVisitor (params, success, error) {
      $axios.post('customer/visitor', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },

    demandJudgmentZX (params, success, error) { // 需求判断
      $axios({
        method: 'put',
        url: '/salerChance/intentionJudge/' + params.id,
		data: params
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    getSigningAmountZX (params, success, error) { // 获取签单金额
      $axios({
        method: 'post',
        url: '/salerChance/price',
		data: params
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    getCustomerRenewalRoel (success, error) {    //获取是否有客户续签的权限
      $axios({
        method: 'get',
        url: '/salerOrder/checkAuthority/renewal',
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
    returnSea (params, success, error) { // 咨询师主动退出
      $axios.post('salerChance/return', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    bindCustomer (params, success, error) { // 咨询师主动退出
      $axios.post('salerChance/bindCustomer', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 机会公池
  salesOpportunitiesSea: {
    list (params, success, error) { // 列表
      $axios.get('chanceSea', {
        params: {organizationId: params},
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    checkAuthority (success, error) { // 判断是否有导出权限
      $axios.get('salerChance/checkAuthority/export').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    editChance (params, success, error) { // 列表
      $axios.put('chanceSea/modifyChance/' + params.id, params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    listAboutCustomer (success, error) { // 人员相关公海列表,客户
      $axios.get('chanceSea/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    seaslist (success, error) { // 人员权限相关公海列表，客户公海
      $axios.get('chanceSea/authRel/list').then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addCustomer (params, success, error) { // 客户池新增客户。公海
      let p = Object.assign({}, params.body, params.query) // body参数需要加一个source来源属性
      $axios.post('chanceSea/addCustomer', p).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    editCustomer (params, success, error) { // 客户池新增客户。公海
      $axios.put('chanceSea/customer/' + params.path,
        params.body).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    add (params, success, error) { // add
      $axios.post('chanceSea', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    edit (params, success, error) { // 客户池编辑
      $axios.put('chanceSea/' + params.path, params.body).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    detail (params, success, error) { //
      $axios.get('chanceSea/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    allocate (params, success, error) { // 分配
      $axios.post('chanceSea/allocate', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    fish (params, success, error) { // 捞取
      $axios.post('chanceSea/fish', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    regroup (params, success, error) { // 分组
      $axios.post('chanceSea/regroup', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    deleteSea (params, success, error) { // 删除
      $axios.delete('chanceSea/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    customerDetail (params, success, error) { // 客户池获取客户详情
      $axios.get('chanceSea/customer/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    chanceDetail (params, success, error) { // 客户池获取客户详情
      $axios.get('chanceSea/chance/' + params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    contactList (params, success, error) { // 客户池获取联系人列表
      $axios.get('chanceSea/contacter', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    chanceList (params, success, error) { // 客户池获取机会列表
      $axios.get('chanceSea/salerChance', {
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
        url: 'chanceSea/addContacter',
        data: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    addChance (params, success, error) {
      $axios.post('chanceSea/addChance', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    seaImport (params, success, error) {
      $axios.post('chanceSea/import', params).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  // 销售订单
  salesOrder: {
    listNoAuth (params, success, error) { // 列表,相关【无权限】
      $axios({
        method: 'get',
        url: 'salerOrder/page',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
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
    listAdmin (params, success, error) { // 列表
      $axios({
        method: 'get',
        url: '/salerOrder/admin',
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
    batchCancelOrder (params, success, error) { // 批量删除销售订单
      $axios.post('salerOrder/batch/cancel', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
	zhuxinRefund (params, success, error) { // 退单申请
      $axios.post('/salerOrderRefund', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	zhuxinCallIng (params, success, error) { // 呼叫
      $axios({
        method: 'post',
        url: '/zcall/api/call',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
	zhuxinHangUp (params, success, error) { // 挂断
      $axios({
        method: 'post',
        url: '/zcall/api/hangup',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
    zhuxinSalesOpportunitiesCallRecordList (params, success, error) { // 获取销售机会的通话记录
      $axios({
        method: 'get',
        url: '/zcall/api/chanceList/' + params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    zhuxinCustomerCallRecordList (params, success, error) { // 获取客户的通话记录
      $axios({
        method: 'get',
        url: '/zcall/api/customerList/' + params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
	zhuxinCallAddRemark (params, success, error) { // 添加备注
      $axios({
        method: 'put',
        url: '/zcall/api/updateRemark',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
	},
  },
  // 跟单记录
  orderRecords: {
    listNoAuth (params, success, error) { // 跟单记录列表，权限得
      $axios({
        method: 'get',
        url: 'followOrderRecord/page',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
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
    // exportExcel (params, success, error) { // 跟单记录导出
    //   $axios.get('followOrderRecord/export', {
    //     params: params
    //   }).then((res) => {
    //     success && success(res.data)
    //   }).catch((err) => {
    //     error && error(err)
    //   })
    // },
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
    getUserCode (params, success, error) { // 下拉用户列表
      $axios.get('user/getRegisterQRcode', {
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
    toReturnList (params, success, error) { // 待退回销售列表
      $axios.get('user/toReturn/list', {
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
    seaChanceFollowersList (params, success, error) { // 机会池池销售跟进员列表
      // console.log(params)
      $axios.get('user/chanceSea/followers', {
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
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    userListWaters (params, success, error) { // 代理商公海用户列表
      $axios.get('/user/fosterPersonSea/list', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    setUserListWatersPer (params, success, error) { // 代理商公海分配招商经理
      $axios({
		  method: 'put',
		  url: '/foster/fosterPerson/updateManager',
		  params: params
	  }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    listOrgUser (success, error) { // 机构用户列表
      $axios.get('user/listOrgUser').then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
	// 招商经理
    userWatersZx (params, success, error) {
      $axios({
        method: 'GET',
        url: '/user/role/67',
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    userDetail (params, success, error) { // 用户信息详情
      $axios.get('user/' + params.id, {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    cacheInfo (params, success, error) { // 修改登录用户信息后获取新详情
      $axios.get('user/cacheInfo').then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
    zxIdentity (params, success, error) {
      $axios({
        method: 'get',
        url: '/codeConfig?type=' + params.type,
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
    queryList (params, success, error) { // 列表
      $axios.get('approvalProcess', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    getTaskDetail (params, success, error) { // detail
      $axios({
        method: 'get',
        url: `/approvalProcess/${params.id}`,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    auditTask (params, success, error) { // 审批
      $axios({
        method: 'post',
        url: 'approvalProcess/doApproval',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
    chanceDetail (params, success, error) { // 审批销售机会
      $axios({
        method: 'get',
        url: 'approval/salerChance',
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    customerDetail (params, success, error) { // 审批客户
      $axios.get('approval/customer', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
  },
  baseSetting: {
    getProductType (params, success, error) {
      $axios.get('goodsType', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    updateProductType (params, success, error) {
      $axios({
        method: 'put',
        url: `goodsType`,
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    getOrganizationGoodsConf (params, success, error) {
      $axios.get('organizationGoodsConf', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    getsettlement (params, success, error) { // 佣金规则列表
      $axios.get('codeConfig/settlement', {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    getCodeConfig (params, success, error) { // 用户列表
      $axios.get('codeConfig', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    getManagerList (params, success, error) { // 用户列表
      $axios.get('serviceManager/simpleList', {
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
        setTimeout((err) => {
          error && error(err)
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
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    edit (params, success, error) { // 用户列表
      $axios({
        method: 'put',
        url: `/codeConfig/${params.id}`,
        data: {codeName: params.codeName, pCode: params.pCode},
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    getSiteList (params, success, error) {
      $axios.get('codeConfig/site', {}).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
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
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
  },
  // 财务管理
  financial: {
    commissionPaymentConfirm (params, success, error) { // 确认佣金支出记录
      $axios({
        method: 'put',
        url: 'commissionPayment/confirm',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    auditPayment (params, success, error) {
      $axios({
        method: 'put',
        url: 'commissionPayment/audit',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    auditPay (params, success, error) {
      $axios({
        method: 'put',
        url: 'commissionPayment/finish',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    queryPaymentList (params, success, error) {
      $axios({
        method: 'get',
        url: 'commissionPayment',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    queryPaymentListPersonal (params, success, error) { // 前端，个人佣金记录列表
      $axios({
        method: 'get',
        url: 'commissionPayment/personal',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    paymentDetail (params, success, error) {
      $axios({
        method: 'get',
        url: 'commissionPayment/detail',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    queryList (params, success, error) {
      $axios({
        method: 'get',
        url: 'commissionClear',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    detail (params, success, error) {
      $axios({
        method: 'get',
        url: 'commissionClearDetail',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    audit (params, success, error) {
      $axios({
        method: 'put',
        url: 'commissionClear/audit',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    refundSettlements (params, success, error) { // 后台-回款结算记录列表
      $axios({
        method: 'get',
        url: 'commissionClear/refundSettlement',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
  },
  customerAreaSetting: {
    queryList (params, success, error) {    //获取地区层级
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
    regionTransfer (params, success, error) {
      $axios({
        method: 'put',
        url: 'region/transfer',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    industryTransfer (params, success, error) {
      $axios({
        method: 'put',
        url: 'category/transfer',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    industryList (params, success, error) {   //获取行业层级
      $axios({
        method: 'get',
        url: 'category',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    placeList (params, success, error) {   //获取职位层级
      $axios({
        method: 'get',
        url: 'post/list',
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
    industryAdd (params, success, error) {
      $axios({
        method: 'post',
        url: 'category/add',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    industryPlace (params, success, error) {
      $axios({
        method: 'post',
        url: 'post/add',
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
        url: 'region/' + params.id,
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    industryUpdate (params, success, error) {
      $axios({
        method: 'put',
        url: 'category/update/' + params.id,
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    placeUpdate (params, success, error) {
      $axios({
        method: 'put',
        url: 'post/update/' + params.id,
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
    industryDelete (params, success, error) {
      $axios({
        method: 'delete',
        url: '/category/deleteBatch',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
    placeDelete (params, success, error) {
      $axios({
        method: 'delete',
        url: '/post/deleteBatch',
        params: params,
      }).then((res) => {
        success && success(res.data)
      }).catch((errorData) => {
        error && error(errorData)
      })
    },
  },
  // 回款
  refundRecord: {
    list (params, success, error) { // 获取回款记录列表
      $axios.get('refundRecord', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 首页
  home: {
    saleFunnel (params, success, error) { // 销售漏斗
      $axios.get('home/saleFunnel', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    topChance (params, success, error) { // 进行中的商机top5
      $axios.get('home/topChance', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    recentChance (params, success, error) { // 最近半个月重点商机
      $axios.get('home/recentChance', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderReport (params, success, error) { // 订单报表,表
      $axios.get('home/orderReport', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    orderStat (params, success, error) { // 订单统计
      $axios.get('home/orderStat', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    chanceStat (params, success, error) { // 销售机会统计
      $axios.get('home/chanceStat', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    dashboard (params, success, error) { // 后端统计
      $axios.get('home/dashboard', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  todoItem: {
    total (params, success, error) { // 获取个人待办事项总数
      $axios.get('backlog/total', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    list (params, success, error) { // 获取个人待办事项列表
      $axios.get('backlog', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  message: {
    addMessage (params, success, error) { // 保存佣金结算规则
      $axios({
        method: 'post',
        url: 'message',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    messageList (params, success, error) {
      $axios.get('message/notice', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    personalMessage (params, success, error) { // 获取个人消息列表
      $axios.get('message/personal', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    unreadCnt (params, success, error) { // 获取个人未读消息数目
      $axios.get('message/personal/unreadCnt', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    msgDelFlag (params, success, error) { // 批量标记删除（前端删除消息用）
      $axios.put('message/delFlag', null, {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    msgRead (params, success, error) { // 批量标记已读
      $axios.put('message/read', null, {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    msgDetail (params, success, error) { // 查看消息详情
      $axios.get('message/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    msgDetails (params, success, error) { // 查看消息详情
      $axios.get('message/' + params.id, {params: {announcement: params.announcement}}).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    msgDelete (params, success, error) { // 查看消息详情
      $axios({
        method: 'delete',
        url: '/message/notice?ids=' + params.ids,
      }).then(res => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    getVersionRecordList (params, success, error) { // 获取版本消息消息列表
      $axios.get('message/version/notice', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    getVersions (success, error) { // 获取版本消息消息列表
      $axios.get('message/versions').then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  syslog: {
    logList (params, success, error) {
      $axios.get('operateLog', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  agentDev: {
    depts (params, success, error) {
      $axios.get('foster/fosterPerson/depts', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    list (params, success, error) {
      $axios.get('foster/fosterPerson', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    getcommission (params, success, error) {
      $axios.get('foster/sales/fosterPerson/getcommission', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    type (params, success, error) {
      $axios.get('foster/fosterPerson/getViews', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  },
  // 统计分析
  zhuxinStatistical: {
    //获取销售订单统计的列表数据
    Lists (params, success, error) {
        $axios({
            method: 'get',
            url: 'salerOrderStatistics',
            params: params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
    },
    //高级搜索数据
    Adsearch (params, success, error) {
        $axios({
            method: 'get',
            url: 'salerOrderStatistics',
            params: params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
    },
    getStatisticsOfServices (params, success, error) { // 服务事项统计
      $axios({
          method: 'get',
          url: 'countSystem/serviceRecord',
          params: params,
      }).then((res) => {
          success && success(res.data)
      }).catch((errorData) => {
          error && error(errorData)
      })
    },
    getStatisticsOfServicesDetail (params, success, error) { // 服务事项统计详情
      $axios({
          method: 'get',
          url: 'countSystem/serviceRecordDetail',
          params: params,
      }).then((res) => {
          success && success(res.data)
      }).catch((errorData) => {
          error && error(errorData)
      })
    },
  },
  // 商品管理
  zhuxinGoodsManage: {
     // 商品列表
     getGoodsList (params, success, error) {
        $axios({
            method: 'get',
            url: 'goodsType',
            params: params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 商品详情
     getGoodsDetail (params, success, error) {
        $axios({
            method: 'get',
            url: 'goodsType/goodsId/' + params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-产品类型
     addProductType (params, success, error) {
        $axios({
            method: 'get',
            url: 'goodsCategory/all/' + params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-产品规格类型查询
     addProductTypeSearch (success, error) {
        $axios({
            method: 'get',
            url: 'goodsSpecificationsType/all',
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-根据产品规格类型查询规格
     addProductTypeSearchSpec (params, success, error) {
        $axios({
            method: 'get',
            url: 'goodsSpecifications/specifications/' + params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-服务协议查询
     ServiceAgreementSearch (success, error) {
        $axios({
            method: 'get',
            url: 'goodsAgreement/all',
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-签约主体查询
     subjectOfContractSearch (success, error) {
        $axios({
            method: 'get',
            url: 'goodsContractSubject/all',
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-获取服务事项
     getServiceMatters (success, error) {
        $axios({
            method: 'get',
            url: 'serviceModuleItem/all',
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
     // 新增-获取所有可选择工单名称
     getWorkNames (success, error) {
        $axios({
            method: 'get',
            url: 'serviceType/all',
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
    // 保存商品
    addProduct (params, success, error) {
      $axios({
        method: 'post',
        url: 'goodsType',
        data: params,
      }).then((res) => {
        success && success(res.data)
      }).catch(() => {
        setTimeout((err) => {
          error && error(err)
        }, 1000)
      })
    },
    // 编辑商品
    editProduct (params, success, error) {
      $axios.put('goodsType/updateGoodsType', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    // 更改商品排序 id,goodsSort;;; 商品推荐
    editProductSort (params, success, error) {
      $axios.put('goodsType/updateSort', params).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    // 商品上架/下架/线上销售 type:{1: 上架，2：下架，3：线上销售, 4线下销售，5启用商品版本}， goodsId = '1,2,3'
    editProductTion (params, success, error) {
      $axios.put('goodsType/' + params.type, '', {params: params.data}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
    // 删除上传文件
    deleteFile (params, success, error) {
      $axios.delete('file/delete', {params: params}).then((res) => {
        success && success(res.data)
      }).catch((err) => {
        error && error(err)
      })
    },
     // 列表/详情-获取商品的所有版本
     getAllVersionList (params, success, error) {
        $axios({
            method: 'get',
            url: 'goodsType/allVersion/' + params,
        }).then((res) => {
            success && success(res.data)
        }).catch((errorData) => {
            error && error(errorData)
        })
     },
  }
}

export default Object.assign({}, API1, API2)
