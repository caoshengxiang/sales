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

// 消息
const messageList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/message/list')),
  'message')
const messageDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/message/detailInfo')),
  'message')
// 任务
const taskApprovalList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/taskApproval/approval/list')),
  'taskApproval')
const taskApprovalDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/taskApproval/approval/detailInfo')),
  'taskApproval')
// 个人信息
const personal = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/personalCenter/personal')),
  'personal')
// 代办事项列表
const todoItemList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/todoItem/list')),
  'todoItemList')

// 销售前端 end

// 企业管理 start

const companyManageHome = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/manageHome/companyManageHome')),
  'manageHome')

// 用户管理
const userList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/list')), 'user')
const userDetail = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/detailInfo')), 'user')

// 代理商管理
const agentList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/user/agentList')), 'user')

// 角色管理
const roleList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/role/list')), 'role')

// 财务管理
const settlementList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/financial/commissionSettlement/settlementList')),
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

// 商品管理
const organizationProductSetting = resolve => require.ensure([],
  () => resolve(
    require('../view/companyManage/organization/organizationProductSetting/list')),
  'organizationProductSetting')

// 商品类型设置
const productType = resolve => require.ensure([],
  () => resolve(
    require('../view/companyManage/organization/organizationProductSetting/productType')),
  'productType')

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
      name: 'HelloWorld',
      // component: HelloWorld,
      redirect: '/FE/signIn',
      meta: {
        title: '404',
        pos: [{name: '404'}],
      },
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
          path: 'taskApprovalList',
          name: 'taskApprovalList',
          component: taskApprovalList,
          meta: {
            title: '任务审批',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '任务审批'}],
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
          path: 'personal',
          name: 'personal',
          component: personal,
          meta: {
            title: '个人信息',
            pos: [{name: '销售管理系统', toName: 'saleHome'}, {name: '个人信息'}],
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
        // 企业管理 -- 财务管理
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
        // 企业管理 -- 组织商品配置管理
        {
          path: 'organizationProductSetting',
          name: 'organizationProductSetting',
          component: organizationProductSetting,
          meta: {
            title: '组织商品配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '组织管理'},
              {name: '组织商品配置'}],
          },
        },
        // 企业管理 -- 商品类型设置
        {
          path: 'productType',
          name: 'productType',
          component: productType,
          meta: {
            title: '组织商品配置',
            pos: [
              {name: '管理系统', toName: 'companyManageHome'},
              {name: '组织管理'},
              {name: '组织商品配置'}],
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
    document.title = to.meta.title
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
