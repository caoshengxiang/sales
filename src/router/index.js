import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 登录，重置
const signIn = resolve => require.ensure([],
  () => resolve(require('../view/sign/signIn')), 'sign')
const recoverPassword = resolve => require.ensure([],
  () => resolve(require('../view/sign/recoverPassword')), 'sign')
const resetPassword = resolve => require.ensure([],
  () => resolve(require('../view/sign/resetPassword')), 'sign')
const versionRecord = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/message/versionRecord')), 'versionRecord')

// 合同
const onetimeContract = resolve => require.ensure([],
  () => resolve(require('../view/contract/onetimeContract')), 'contract')
const multipleContracts = resolve => require.ensure([],
  () => resolve(require('../view/contract/multipleContracts')), 'contract')

// home
const indexPage = resolve => require.ensure([],
  () => resolve(require('../view/index.vue')), 'index')

// 销售前端 start

// 首页
const saleHome = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/saleHome/saleHome')), 'saleHome')
// 客户
const customersList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/customers/list')), 'customers')
const customersDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/customers/detailInfo')),
  'customers')
const customersVisDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/channelRepository/detailInfo')),
  'customers')

// 联系人
const contactsList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/contacts/list')), 'contacts')
const contactsDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/contacts/detailInfo')), 'customers')
// 销售机会
const salesOpportunitiesList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/salesOpportunities/list')),
  'salesOpportunities')
const salesOpportunitiesDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/salesOpportunities/detailInfo')),
  'salesOpportunities')
// 渠道资源库管理
const salesChannelRepositoryList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/channelRepository/list')),
  'salesOpportunities')
// 销售机会
const salesOpportunitiesListSeas = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/salesOpportunitiesSeas/list')),
  'salesOpportunities')
const salesOpportunitiesDetailSeas = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/salesOpportunitiesSeas/detailInfo')),
  'salesOpportunities')
// 销售订单
const salesOrdersList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/salesOrders/list')), 'salesOrders')
const salesOrdersDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/salesOrders/detailInfo')),
  'salesOrders')
// 跟单记录
const orderRecordsList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/followOrderRecords/list')),
  'orderRecordsList')
// 回款记录
const returnRecordList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/returnRecord/returnRecordList')),
  'returnRecordList')
// 返佣记录
const rebateRecordsList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/financial/rebate/spendingList')),
  'rebateRecords')
// 客户公海
const customersHighSeasList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/customersHighSeas/list')),
  'customersHighSeas')
// 客户公海详情
const customersHighSeasDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/customersHighSeas/detailInfo')),
  'customersHighSeas')
// 代理推荐
const agentRecommendation = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CRM/agentRecommendation/list')),
  'agentRecommendation')
// 活动会议
// const meetingActivity = resolve => require.ensure([],
//   () => resolve(require('../view/saleManage/CRM/meetingActivity/list')),
//   'meetingActivity')
// // 活动会议详细
// const meetingActivityDetail = resolve => require.ensure([],
//   () => resolve(require('../view/saleManage/CRM/meetingActivity/detailInfo')),
//   'meetingActivity')

// 消息
const messageList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/message/list')),
  'message')
const messageDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/message/detailInfo')),
  'message')
const messageDetailS = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/message/detailInfo')),
  'message')
// 任务
const taskApprovalList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/taskApproval/approval/list')),
  'taskApproval')
const taskApprovalDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/taskApproval/approval/detailInfo')),
  'taskApproval')

// 订单分析，销售订单统计
const salesOrdersStatic = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/statisticalAnalysis/salesOrderStatistics')),
  'statisticalAnalysis')
const housekeeperEnterList = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/taskApproval/housekeeperEnter/list')),
  'housekeeperEnter')
const housekeeperEnterDetail = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/taskApproval/housekeeperEnter/detail')),
  'housekeeperEnter')
  
// --------------会议管理----------------
// 活动会议
const meetingActivity = resolve => require.ensure([],
	() => resolve(require('../view/saleManage/MOM/meetingActivity/list')),
	'meetingActivity')
// 活动会议详细
const meetingActivityDetail = resolve => require.ensure([],
	() => resolve(require('../view/saleManage/MOM/meetingActivity/detailInfo')),
	'meetingActivity')
// 会议合作渠道管理
const meetingCooperationChannel = resolve => require.ensure([],
	() => resolve(require('../view/saleManage/MOM/meetingCooperationChannel/list')),
	'meetingCooperationChannel')
// 活动讲师管理
const meetingConferenceLecturer = resolve => require.ensure([],
	() => resolve(require('../view/saleManage/MOM/meetingConferenceLecturer/list')),
	'meetingConferenceLecturer')
// 活动报名意向管理
const meetingApplicationIntention = resolve => require.ensure([],
	() => resolve(require('../view/saleManage/MOM/meetingApplicationIntention/list')),
	'meetingApplicationIntention')


// 个人信息
const personal = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/personalCenter/personal')),
  'personal')
// 代办事项列表
const todoItemList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/todoItem/list')),
  'todoItemList')
// PMS 服务管家管理
const serviceHousekeeperList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/serviceHousekeeperList/list')),
  'serviceHousekeeperList')
const serviceHousekeeperDetail = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/PMS/serviceHousekeeperList/ditail')),
  'serviceHousekeeperList')

// PMS 服务订单管理
const serviceOrderList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/serviceOrderList/list')),
  'serviceOrderList')
const serviceOrderDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/serviceOrderList/detail')),
  'serviceOrderList')
// PMS 服务票据管理
const customerBill = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/customerBill/list')),
  'customerBill')
const customerBillDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/customerBill/detail')),
  'customerBill')

// PMS 服务工单管理
const serviceWorkOrderList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/serviceWorkOrderList/list')),
  'serviceWorkOrderList')
const serviceWorkOrderDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/PMS/serviceWorkOrderList/detail')),
  'serviceWorkOrderList')

// CMS 服务客户管理
const serviceCustomer = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceCustomer/list')),
  'serviceCustomer')
const serviceCustomerDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceCustomer/detail')),
  'serviceCustomer')
// CSM 服务投诉管理
const serviceComplaint = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceComplaint/list')),
  'serviceComplaint')
const serviceComplaintDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceComplaint/detail')),
  'serviceComplaint')
// CSM 服务回访管理
const serviceReturnVisit = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceReturnVisit/list')),
  'serviceReturnVisit')
const serviceReturnVisitDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceReturnVisit/detail')),
  'serviceReturnVisit')
// CSM 服务抽查管理
const serviceSpotCheck = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceSpotCheck/list')),
  'serviceSpotCheck')
const serviceSpotCheckDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/serviceSpotCheck/detail')),
  'serviceSpotCheck')
// CSM 服务意见管理
const customerComments = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/CSM/customerComments/list')),
  'customerComments')
// 统计
// 统计
// 客户任务统计
const serviceTaskSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/serviceTask/list')),
  'serviceTaskSta')
// 客户任务统计详情
const serviceTaskStaDetail = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/serviceTask/detailInfo')),
  'serviceTaskStaDetail')
// 客服任务统计
const customerServiceTaskSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/customerServiceTask/list')),
  'customerServiceTaskSta')
// 服务客户统计
const serviceCustomerSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/serviceCustomer/list')),
  'serviceCustomerSta')
// 服务票据统计
const serviceBillSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/customerBill/list')),
  'serviceBillSta')
// 拒单退单统计
const refundOrderSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/refundOrder/list')),
  'refundOrderSta')
// 拒单退单统计详情
const refundOrderStaDetail = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/refundOrder/detailInfo')),
  'refundOrderStaDetail')
// 客户投诉统计
const customerComplaintSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/customerComplaint/list')),
  'customerComplaintSta')
// 客户评价统计
const customerCommentsSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/customerComments/list')),
  'customerCommentsSta')
// 客户意见统计
const customerOpinionSta = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/statisticalAnalysis/customerOpinion/list')),
  'customerOpinionSta')
  
// 商品管理
// 商品列表
const listOfGoods = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/MOG/goodsList/list')),
  'listOfGoods')
// 商品详情
const listOfGoodsDetail = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/MOG/goodsList/detailInfo')),
  'listOfGoodsDetail')
// 新增商品
const addGoods = resolve => require.ensure([],
  () => resolve(
    require('../view/saleManage/MOG/goodsList/add')),
  'addGoods')

// 销售前端 end
// 销售前端 end
// 销售前端 end
// 销售前端 end
// 销售前端 end
// 销售前端 end

// 企业管理 start

const companyManageHome = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/manageHome/companyManageHome')),
  'manageHome')

// 用户管理
const userList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/user/list')), 'user')
const userDetail = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/detailInfo')), 'user')

// 代理商管理
const agentList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/agent/agentList')), 'user')
// 代理商管理
const agentWaters = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/agent/agentWaters')), 'user')

// 角色管理
const roleList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/role/list')), 'role')

// 财务管理
const settlementList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/financial/commissionSettlement/settlementList')),
  'financial')
// 财务管理 回款结算
const returnSettlementList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/financial/returnSettlement/list')),
  'financial')
// 财务管理
const spendingList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/financial/commissionExpense/spendingList')),
  'financial')

// 组织管理
const organizationList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/organization/organization/list')),
  'organization')
// 客户池管理
const customerPool = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/organization/customerPool/customerPool')),
  'organization')
// 机会池管理
const chancePool = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/organization/chancePool/chancePool')),
  'organization')

const baseSettingList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/baseSetting/paramsConfig/list')),
  'baseSetting')

// 客户地区管理
const customerAreaSetting = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/baseSetting/customerAareaSetting/index')),
  'customerAreaSetting')

// 客户源管理
const customerSource = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/baseSetting/customerSourceSetting/index')),
  'customerSource')

// 站点开关设置
const siteList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/baseSetting/site/list')),
  'siteList')
// 基础参数设置
const basicParameterConfiguration = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/baseSetting/basicParameterConfiguration/list')),
  'basicParameterConfiguration')

// 商品管理
const organizationProductSetting = resolve => require.ensure([],
  () => resolve(
    require('../view/companyManage/organization/organizationProductSetting/list')),
  'organizationProductSetting')

// 商品类型设置
const productType = resolve => require.ensure([],
  () => resolve(
    require('../view/companyManage/baseSetting/serviceProductConfig/productType')),
  'productType')
// 服务内容配置
const serviceContent = resolve => require.ensure([],
  () => resolve(
    require('../view/companyManage/baseSetting/serviceContent/serviceContent')),
  'serviceContent')

// 消息通知管理(ME)
const meMessageList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/message/list')), 'meMessage')

// 日志管理(ME)
const loglist = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/log/list')), 'loglist')

// 返佣规则设置
const settlementRulesList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/baseSetting/settlement/list')),
  'settlementRulesList')

// 企业管理 end

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: signIn,
      meta: {
        title: '登录',
        pos: [{name: '登录'}],
      },
    }, {
      path: '*',
      name: 'signIn2',
      // component: HelloWorld,
      redirect: '/FE/signIn',
      meta: {
        title: '404',
        pos: [{name: '404'}],
      },
    }, {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/FE/signIn',
      name: 'signIn',
      component: signIn,
      meta: {
        title: '登录',
        pos: [{name: '登录'}],
      },
    }, {
      path: '/FE/recoverPassword',
      name: 'recoverPassword',
      component: recoverPassword,
      meta: {
        title: '找回密码',
      },
    }, {
      path: '/FE/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
      meta: {
        title: '重置密码',
      },
    },
    { // 合同
      path: '/onetimeContract',
      name: 'onetimeContract',
      component: onetimeContract,
      meta: {
        title: '商城合同-一次性付费',
      },
    }, {
      path: '/multipleContracts',
      name: 'multipleContracts',
      component: multipleContracts,
      meta: {
        title: '商城合同-分次付费',
      },
    },
    {
      path: '/sales/:end',
      name: 'indexPage',
      component: indexPage,
      children: [
        { // 销售前端
          path: 'saleHome',
          name: 'saleHome',
          component: saleHome,
          meta: {
            title: '首页',
            pos: [{name: '销售管理系统'}],
          },
        }, {
          path: 'customersList',
          name: 'customersList',
          component: customersList,
          meta: {
            title: '客户',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '客户'}],
            pos2: [{name: '管理系统', toName: 'companyManageHome'}, {name: '客户'}],
          },
        }, {
          path: 'customersDetail',
          name: 'customersDetail',
          component: customersDetail,
          meta: {
            title: '客户详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客户', toName: 'customersList'},
              {name: '客户详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '客户', toName: 'customersList'},
              {name: '客户详情'}],
          },
        },  {
          path: 'customersVisDetail',
          name: 'customersVisDetail',
          component: customersVisDetail,
          meta: {
            title: '客户详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '渠道资源库管理', toName: 'salesChannelRepositoryList'},
              {name: '客户详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '渠道资源库管理', toName: 'salesChannelRepositoryList'},
              {name: '客户详情'}],
          },
        }, {
          path: 'contactsList',
          name: 'contactsList',
          component: contactsList,
          meta: {
            title: '联系人',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '联系人'}],
            pos2: [{name: '管理系统', toName: 'companyManageHome'}, {name: '联系人'}],
          },
        }, {
          path: 'contactsDetail',
          name: 'contactsDetail',
          component: contactsDetail,
          meta: {
            title: '联系人详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '联系人', toName: 'contactsList'},
              {name: '联系人详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '联系人', toName: 'contactsList'},
              {name: '联系人详情'}],
          },
        }, {
          path: 'salesOpportunitiesList',
          name: 'salesOpportunitiesList',
          component: salesOpportunitiesList,
          meta: {
            title: '销售机会',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '销售机会'}],
            pos2: [{name: '管理系统', toName: 'companyManageHome'}, {name: '销售机会'}],
          },
        },  {
          path: 'salesChannelRepositoryList',
          name: 'salesChannelRepositoryList',
          component: salesChannelRepositoryList,
          meta: {
            title: '渠道资源库',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '渠道资源库管理'}],
            pos2: [{name: '管理系统', toName: 'salesChannelRepositoryList'}, {name: '渠道资源库管理'}],
          },
        }, {
          path: 'salesOpportunitiesDetail',
          name: 'salesOpportunitiesDetail',
          component: salesOpportunitiesDetail,
          meta: {
            title: '销售机会详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '销售机会', toName: 'salesOpportunitiesList'},
              {name: '销售机会详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '销售机会', toName: 'salesOpportunitiesList'},
              {name: '销售机会详情'}],
          },
        }, {
          path: 'salesOpportunitiesListSeas',
          name: 'salesOpportunitiesListSeas',
          component: salesOpportunitiesListSeas,
          meta: {
            title: '销售机会公海',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '销售机会公海'}],
            pos2: [{name: '管理系统', toName: 'companyManageHome'}, {name: '销售机会公海'}],
          },
        }, {
          path: 'salesOpportunitiesDetailSeas',
          name: 'salesOpportunitiesDetailSeas',
          component: salesOpportunitiesDetailSeas,
          meta: {
            title: '销售机会详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '销售机会公海', toName: 'salesOpportunitiesListSeas'},
              {name: '销售机会详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '销售机会公海', toName: 'salesOpportunitiesListSeas'},
              {name: '销售机会详情'}],
          },
        }, {
          path: 'salesOrdersList',
          name: 'salesOrdersList',
          component: salesOrdersList,
          meta: {
            title: '销售订单',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '销售订单'}],
            pos2: [{name: '管理系统', toName: 'companyManageHome'}, {name: '销售订单'}],
          },
        }, {
          path: 'salesOrdersDetail',
          name: 'salesOrdersDetail',
          component: salesOrdersDetail,
          meta: {
            title: '销售订单详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '销售订单', toName: 'salesOrdersList'},
              {name: '销售订单详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '销售订单', toName: 'salesOrdersList'},
              {name: '销售订单详情'}],
          },
        }, {
          path: 'orderRecordsList',
          name: 'orderRecordsList',
          component: orderRecordsList,
          meta: {
            title: '跟单记录',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '跟单记录'}],
          },
        }, {
          path: 'returnRecordList',
          name: 'returnRecordList',
          component: returnRecordList, // remittanceRecords 之前命名
          meta: {
            title: '回款记录',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '回款记录'}],
          },
        }, {
          path: 'versionRecord',
          name: 'versionRecord',
          component: versionRecord, // remittanceRecords 之前命名
          meta: {
            title: '版本记录',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '版本记录'}],
          },
        }, {
          path: 'rebateRecordsList',
          name: 'rebateRecordsList',
          component: rebateRecordsList,
          meta: {
            title: '返佣记录',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '返佣记录'}],
          },
        }, {
          path: 'customersHighSeasList',
          name: 'customersHighSeasList',
          component: customersHighSeasList,
          meta: {
            title: '客户公海',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '客户公海'}],
            pos2: [{name: '管理系统', toName: 'companyManageHome'}, {name: '客户公海'}],
          },
        }, {
          path: 'customersHighSeasDetail',
          name: 'customersHighSeasDetail',
          component: customersHighSeasDetail,
          meta: {
            title: '客户公海详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客户公海', toName: 'customersHighSeasList'},
              {name: '客户公海详情'}],
            pos2: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '客户公海', toName: 'customersHighSeasList'},
              {name: '客户公海详情'}],
          },
        }, {
          path: 'agentRecommendation',
          name: 'agentRecommendation',
          component: agentRecommendation,
          meta: {
            title: '代理推荐管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '销售管理'},
              {name: '代理推荐管理'}],
          },
        }, {
          path: 'meetingActivity',
          name: 'meetingActivity',
          component: meetingActivity,
          meta: {
            title: '会议活动管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '会议活动管理'}],
          },
        }, {
          path: 'meetingActivityDetail',
          name: 'meetingActivityDetail',
          component: meetingActivityDetail,
          meta: {
            title: '会议活动详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '会议活动管理', toName: 'meetingActivity'},
              {name: '会议活动详情'}],
          },
        }, {
					path: 'meetingCooperationChannel',
					name: 'meetingCooperationChannel',
					component: meetingCooperationChannel,
          meta: {
            title: '会议合作渠道管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '会议合作渠道管理'}],
          },
				}, {
					path: 'meetingConferenceLecturer',
					name: 'meetingConferenceLecturer',
					component: meetingConferenceLecturer,
          meta: {
            title: '会议讲师管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '会议讲师管理'}],
          },
				},  {
					path: 'meetingApplicationIntention',
					name: 'meetingApplicationIntention',
					component: meetingApplicationIntention,
          meta: {
            title: '报名意向管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '报名意向管理'}],
          },
				}, {
          path: 'messageList',
          name: 'messageList',
          component: messageList,
          meta: {
            title: '消息通知',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '消息通知'}],
          },
        }, {
          path: 'messageDetail',
          name: 'messageDetail',
          component: messageDetail,
          meta: {
            title: '消息详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '消息通知', toName: 'messageList'},
              {name: '消息详情'}],
          },
        }, {
          path: 'messageDetailS',
          name: 'messageDetailS',
          component: messageDetailS,
          meta: {
            title: '消息详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '消息通知', toName: 'meMessageList'},
              {name: '消息详情'}],
          },
        },  {
          path: 'taskApprovalList',
          name: 'taskApprovalList',
          component: taskApprovalList,
          meta: {
            title: '任务审批',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '任务审批'}],
          },
        }, {
          path: 'salesOrdersStatic',
          name: 'salesOrdersStatic',
          component: salesOrdersStatic,
          meta: {
            title: '销售订单统计',
            pos: [{name: 'ERP管理系统', toName: 'saleHome'}, {name: '系统分析'}, {name: '销售订单统计'}],
          },
        }, {
          path: 'todoItemList',
          name: 'todoItemList',
          component: todoItemList,
          meta: {
            title: '代办事项',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '代办事项'}],
          },
        }, {
          path: 'serviceHousekeeperList',
          name: 'serviceHousekeeperList',
          component: serviceHousekeeperList,
          meta: {
            title: '服务管家管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务管家管理'}],
          },
        }, {
          path: 'serviceHousekeeperDetail',
          name: 'serviceHousekeeperDetail',
          component: serviceHousekeeperDetail,
          meta: {
            title: '服务管家管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务管家管理'}],
          },
        }, {
          path: 'serviceOrderList',
          name: 'serviceOrderList',
          component: serviceOrderList,
          meta: {
            title: '服务订单管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务订单管理'}],
          },
        }, {
          path: 'serviceOrderDetail',
          name: 'serviceOrderDetail',
          component: serviceOrderDetail,
          meta: {
            title: '服务订单管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务订单管理'}],
          },
        }, {
          path: 'serviceWorkOrderList',
          name: 'serviceWorkOrderList',
          component: serviceWorkOrderList,
          meta: {
            title: '服务工单管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务工单管理'}],
          },
        }, {
          path: 'serviceWorkOrderDetail',
          name: 'serviceWorkOrderDetail',
          component: serviceWorkOrderDetail,
          meta: {
            title: '服务工单管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务工单管理'}],
          },
        }, {
          path: 'listOfGoods',
          name: 'listOfGoods',
          component: listOfGoods,
          meta: {
            title: '商品列表管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '商品管理'},
              {name: '商品列表'}],
          },
        }, {
          path: 'listOfGoodsDetail',
          name: 'listOfGoodsDetail',
          component: listOfGoodsDetail,
          meta: {
            title: '商品列表管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '商品管理'},
              {name: '商品列表', toName: 'listOfGoods'},
              {name: '商品详情'}],
          },
        }, {
          path: 'addGoods',
          name: 'addGoods',
          component: addGoods,
          meta: {
            title: '新增',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '商品管理'},
              {name: '商品列表', toName: 'listOfGoods'},
              {name: '新增'}],
          },
        }, {
          path: 'customerBill',
          name: 'customerBill',
          component: customerBill,
          meta: {
            title: '客户票据管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '客户票据管理'}],
          },
        }, {
          path: 'customerBillDetail',
          name: 'customerBillDetail',
          component: customerBillDetail,
          meta: {
            title: '客户票据管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '客户票据管理'}],
          },
        }, {
          path: 'serviceCustomer',
          name: 'serviceCustomer',
          component: serviceCustomer,
          meta: {
            title: '服务客户管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务客户管理'}],
          },
        }, {
          path: 'serviceCustomerDetail',
          name: 'serviceCustomerDetail',
          component: serviceCustomerDetail,
          meta: {
            title: '服务客户管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务管理'},
              {name: '服务客户管理'}],
          },
        }, {
          path: 'serviceComplaint',
          name: 'serviceComplaint',
          component: serviceComplaint,
          meta: {
            title: '服务投诉管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '服务投诉管理'}],
          },
        }, {
          path: 'serviceComplaintDetail',
          name: 'serviceComplaintDetail',
          component: serviceComplaintDetail,
          meta: {
            title: '服务投诉管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '服务投诉管理'}],
          },
        }, {
          path: 'serviceReturnVisit',
          name: 'serviceReturnVisit',
          component: serviceReturnVisit,
          meta: {
            title: '服务回访管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '服务回访管理'}],
          },
        }, {
          path: 'serviceReturnVisitDetail',
          name: 'serviceReturnVisitDetail',
          component: serviceReturnVisitDetail,
          meta: {
            title: '服务回访管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '服务回访管理'}],
          },
        }, {
          path: 'serviceSpotCheck',
          name: 'serviceSpotCheck',
          component: serviceSpotCheck,
          meta: {
            title: '服务抽查管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '服务抽查管理'}],
          },
        }, {
          path: 'serviceSpotCheckDetail',
          name: 'serviceSpotCheckDetail',
          component: serviceSpotCheckDetail,
          meta: {
            title: '服务抽查管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '服务抽查管理'}],
          },
        }, {
          path: 'customerComments',
          name: 'customerComments',
          component: customerComments,
          meta: {
            title: '客户意见管理',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '客满管理'},
              {name: '客户意见管理'}],
          },
        }, {
          path: 'taskApprovalDetail',
          name: 'taskApprovalDetail',
          component: taskApprovalDetail,
          meta: {
            title: '任务详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '工作任务', toName: 'taskApprovalList'},
              {name: '任务详情'}],
          },
        }, {
          path: 'housekeeperEnterList',
          name: 'housekeeperEnterList',
          component: housekeeperEnterList,
          meta: {
            title: '管家入驻',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '业务审批'},
              {name: '管家入驻管理'}],
          },
        }, {
          path: 'housekeeperEnterDetail',
          name: 'housekeeperEnterDetail',
          component: housekeeperEnterDetail,
          meta: {
            title: '管家入驻',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '业务审批'},
              {name: '管家入驻详情'}],
          },
        }, {
          path: 'personal',
          name: 'personal',
          component: personal,
          meta: {
            title: '个人信息',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '个人信息'}],
          },
        }, {
          path: 'serviceTaskSta',
          name: 'serviceTaskSta',
          component: serviceTaskSta,
          meta: {
            title: '服务任务统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '服务任务统计'}],
          },
        }, {
          path: 'serviceTaskStaDetail',
          name: 'serviceTaskStaDetail',
          component: serviceTaskStaDetail,
          meta: {
            title: '服务任务统计详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '服务任务统计', toName: 'serviceTaskSta'},
              {name: '服务任务统计详情'}],
          },
        }, {
          path: 'customerServiceTaskSta',
          name: 'customerServiceTaskSta',
          component: customerServiceTaskSta,
          meta: {
            title: '客服任务统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '客服任务统计'}],
          },
        }, {
          path: 'serviceCustomerSta',
          name: 'serviceCustomerSta',
          component: serviceCustomerSta,
          meta: {
            title: '服务客户统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '服务客户统计'}],
          },
        }, {
          path: 'serviceBillSta',
          name: 'serviceBillSta',
          component: serviceBillSta,
          meta: {
            title: '服务票据统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '服务票据统计'}],
          },
        }, {
          path: 'refundOrderSta',
          name: 'refundOrderSta',
          component: refundOrderSta,
          meta: {
            title: '退单拒单统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '退单拒单统计'}],
          },
        }, {
          path: 'refundOrderStaDetail',
          name: 'refundOrderStaDetail',
          component: refundOrderStaDetail,
          meta: {
            title: '退单拒单统计详情',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '退单拒单统计', toName: 'refundOrderSta'},
              {name: '退单拒单统计详情'}],
          },
        }, {
          path: 'customerComplaintSta',
          name: 'customerComplaintSta',
          component: customerComplaintSta,
          meta: {
            title: '客户投诉统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '客户投诉统计'}],
          },
        }, {
          path: 'customerCommentsSta',
          name: 'customerCommentsSta',
          component: customerCommentsSta,
          meta: {
            title: '客户评价统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '客户评价统计'}],
          },
        }, {
          path: 'customerOpinionSta',
          name: 'customerOpinionSta',
          component: customerOpinionSta,
          meta: {
            title: '客户意见统计',
            pos: [
              {name: '销售管理系统', toName: 'saleHome'},
              {name: '统计分析'},
              {name: '客户意见统计'}],
          },
        },
        // 企业管理
        {
          path: 'companyManageHome',
          name: 'companyManageHome',
          component: companyManageHome,
          meta: {
            title: '首页',
            pos: [{name: '管理系统'}],
          },
        },
        // 企业管理 -- 用户管理
        {
          path: 'userList',
          name: 'userList',
          component: userList,
          meta: {
            title: '用户管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '用户管理'},
              {name: '用户管理'}],
          },
        },
        {
          path: 'userDetail',
          name: 'userDetail',
          component: userDetail,
          meta: {
            title: '用户管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '用户管理'},
              {name: '用户详细'}],
          },
        },
        // 企业管理 -- 代理商管理
        {
          path: 'agentList',
          name: 'agentList',
          component: agentList,
          meta: {
            title: '代理商管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '用户管理'},
              {name: '代理商管理'}],
          },
        },
        // 企业管理 -- 代理商公海
        {
          path: 'agentWaters',
          name: 'agentWaters',
          component: agentWaters,
          meta: {
            title: '代理商公海',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '用户管理'},
              {name: '代理商公海'}],
          },
        },
        // 企业管理 -- 角色管理
        {
          path: 'roleList',
          name: 'roleList',
          component: roleList,
          meta: {
            title: '角色管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '用户管理'},
              {name: '角色管理'}],
          },
        },
        // 企业管理 -- 财务管理 -- 佣金结算
        {
          path: 'settlementList',
          name: 'settlementList',
          component: settlementList,
          meta: {
            title: '佣金结算管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '财务管理'},
              {name: '佣金结算管理'}],
          },
        },
        // 企业管理 -- 财务管理 -- 回款结算
        {
          path: 'returnSettlementList',
          name: 'returnSettlementList',
          component: returnSettlementList,
          meta: {
            title: '回款结算管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '财务管理'},
              {name: '回款结算管理'}],
          },
        },
        {
          path: 'spendingList',
          name: 'spendingList',
          component: spendingList,
          meta: {
            title: '财务支出管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '财务管理'},
              {name: '财务支出管理'}],
          },
        },
        // 企业管理 -- 组织管理
        {
          path: 'organizationList',
          name: 'organizationList',
          component: organizationList,
          meta: {
            title: '组织管理',
            pos: [{name: '管理系统', toName: 'companyManageHome'}, {name: '组织管理'}],
          },
        },
        // 企业管理 -- 客户池管理
        {
          path: 'customerPool',
          name: 'customerPool',
          component: customerPool,
          meta: {
            title: '客户池管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '组织管理'},
              {name: '客户池管理'}],
          },
        },
        // 企业管理 -- 机会池管理
        {
          path: 'chancePool',
          name: 'chancePool',
          component: chancePool,
          meta: {
            title: '机会池管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '组织管理'},
              {name: '机会池管理'}],
          },
        },
        // 企业管理 -- 组织商品配置管理
        {
          path: 'organizationProductSetting',
          name: 'organizationProductSetting',
          component: organizationProductSetting,
          meta: {
            title: '组织商品配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '组织商品配置'}],
          },
        },
        // 企业管理 -- 服务商品配置
        {
          path: 'productType',
          name: 'productType',
          component: productType,
          meta: {
            title: '服务商品配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '服务商品配置'}],
          },
        },
        // 企业管理 -- 服务商品配置
        {
          path: 'serviceContent',
          name: 'serviceContent',
          component: serviceContent,
          meta: {
            title: '服务内容配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '服务商品配置'}],
          },
        },
        // 配置管理 -- 参数设置
        {
          path: 'baseSettingList',
          name: 'baseSettingList',
          component: baseSettingList,
          meta: {
            title: '参数配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '参数配置'}],
          },
        },
        // 配置管理 -- 客户地区管理
        {
          path: 'customerAreaSetting',
          name: 'customerAreaSetting',
          component: customerAreaSetting,
          meta: {
            title: '客户地区管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '客户地区管理'}],
          },
        },
        // 配置管理 -- 客户地区管理
        {
          path: 'customerSource',
          name: 'customerSource',
          component: customerSource,
          meta: {
            title: '客户源管理',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '客户源管理'}],
          },
        },

        // 配置管理 -- 站点开关设置
        {
          path: 'siteList',
          name: 'siteList',
          component: siteList,
          meta: {
            title: '站点开关设置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '站点开关设置'}],
          },
        },
        // 配置管理 -- 基础参数配置
        {
          path: 'basicParameterConfiguration',
          name: 'basicParameterConfiguration',
          component: basicParameterConfiguration,
          meta: {
            title: '站点开关设置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '基础参数配置'}],
          },
        },
        // 配置管理 -- 返佣规则设置
        {
          path: 'settlementRulesList',
          name: 'settlementRulesList',
          component: settlementRulesList,
          meta: {
            title: '返佣配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '配置管理'},
              {name: '返佣配置'}],
          },
        },
        // 消息通知管理
        {
          path: 'meMessageList',
          name: 'meMessageList',
          component: meMessageList,
          meta: {
            title: '消息通知',
            pos: [{name: '管理系统', toName: 'companyManageHome'}, {name: '消息通知'}],
          },
        },
        // 日志管理通知管理
        {
          path: 'loglist',
          name: 'loglist',
          component: loglist,
          meta: {
            title: '日志管理',
            pos: [{name: '管理系统', toName: 'companyManageHome'}, {name: '日志管理'}],
          },
        },
      ],
    },

  ],
})
// 路由钩子
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-众智联邦平台资源管理系统ERP'
  } else {
    document.title = 'sales'
  }

  // if (!sessionStorage.length) {
  //   // 这个调用能触发目标事件，从而达到共享数据的目的
  //   localStorage.setItem('getSessionStorage', Date.now())
  // }
  // // 该事件是核心
  // window.addEventListener('storage', function (event) {
  //   if (event.key === 'getSessionStorage') {
  //     // 已存在的标签页会收到这个事件
  //     localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
  //     localStorage.removeItem('sessionStorage')
  //   } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
  //     // 新开启的标签页会收到这个事件
  //     let data = JSON.parse(event.newValue)
  //     for (let key in data) {
  //       sessionStorage.setItem(key, data[key])
  //     }
  //   }
  // })
  next()
})

export default router
