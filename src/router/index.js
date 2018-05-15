import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 登陆，重置
const signIn = resolve => require.ensure([],
  () => resolve(require('../view/sign/signIn')), 'sign')
const recoverPassword = resolve => require.ensure([],
  () => resolve(require('../view/sign/recoverPassword')), 'sign')
const resetPassword = resolve => require.ensure([],
  () => resolve(require('../view/sign/resetPassword')), 'sign')

// home
const indexPage = resolve => require.ensure([],
  () => resolve(require('../view/index.vue')), 'index')

// 销售前端 start

// 首页
const saleHome = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/saleHome/saleHome')), 'saleHome')
// 客户
const customersList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/customers/list')), 'customers')
const customersDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/customers/detailInfo')), 'customers')

// 联系人
const contactsList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/contacts/list')), 'contacts')
const contactsDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/contacts/detailInfo')), 'customers')
// 销售机会
const salesOpportunitiesList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/salesOpportunities/list')),
  'salesOpportunities')
const salesOpportunitiesDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/salesOpportunities/detailInfo')),
  'salesOpportunities')
// 销售订单
const salesOrdersList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/salesOrders/list')), 'salesOrders')
const salesOrdersDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/salesOrders/detailInfo')), 'salesOrders')
// 跟单记录
const documentaryRecordsList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/documentaryRecords/list')),
  'documentaryRecords')
// 回款记录
const remittanceRecords = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/remittanceRecords/list')),
  'remittanceRecords')
// 返佣记录
const rebateRecordsList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/rebateRecords/list')),
  'rebateRecords')
// 客户公海
const customersHighSeasList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/customersHighSeas/list')),
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
  () => resolve(require('../view/saleManage/taskApproval/list')),
  'taskApproval')
const taskApprovalDetail = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/taskApproval/detailInfo')),
  'taskApproval')
// 个人信息
const personal = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/personalCenter/personal')),
  'personal')

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

//角色管理
const roleList = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/role/list')), 'role')

// 企业管理 end

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: signIn,
    }, {
      path: '*',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/signIn',
      name: 'signIn',
      component: signIn,
    }, {
      path: '/recoverPassword',
      name: 'recoverPassword',
      component: recoverPassword,
    }, {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
    }, {
      path: '/sales',
      name: 'indexPage',
      component: indexPage,
      children: [
        { // 销售前端
          path: 'saleHome',
          name: 'saleHome',
          component: saleHome,
        }, {
          path: 'customersList',
          name: 'customersList',
          component: customersList,
        }, {
          path: 'customersDetail',
          name: 'customersDetail',
          component: customersDetail,
        }, {
          path: 'contactsList',
          name: 'contactsList',
          component: contactsList,
        }, {
          path: 'contactsDetail',
          name: 'contactsDetail',
          component: contactsDetail,
        }, {
          path: 'salesOpportunitiesList',
          name: 'salesOpportunitiesList',
          component: salesOpportunitiesList,
        }, {
          path: 'salesOpportunitiesDetail',
          name: 'salesOpportunitiesDetail',
          component: salesOpportunitiesDetail,
        }, {
          path: 'salesOrdersList',
          name: 'salesOrdersList',
          component: salesOrdersList,
        }, {
          path: 'salesOrdersDetail',
          name: 'salesOrdersDetail',
          component: salesOrdersDetail,
        }, {
          path: 'documentaryRecordsList',
          name: 'documentaryRecordsList',
          component: documentaryRecordsList,
        }, {
          path: 'remittanceRecords',
          name: 'remittanceRecords',
          component: remittanceRecords,
        }, {
          path: 'rebateRecordsList',
          name: 'rebateRecordsList',
          component: rebateRecordsList,
        }, {
          path: 'customersHighSeasList',
          name: 'customersHighSeasList',
          component: customersHighSeasList,
        }, {
          path: 'messageList',
          name: 'messageList',
          component: messageList,
        }, {
          path: 'messageDetail',
          name: 'messageDetail',
          component: messageDetail,
        }, {
          path: 'taskApprovalList',
          name: 'taskApprovalList',
          component: taskApprovalList,
        }, {
          path: 'taskApprovalDetail',
          name: 'taskApprovalDetail',
          component: taskApprovalDetail,
        }, {
          path: 'personal',
          name: 'personal',
          component: personal,
        },
        // 企业管理
        {
          path: 'companyManageHome',
          name: 'companyManageHome',
          component: companyManageHome,
        },
        // 企业管理 -- 用户管理
        {
          path: 'userList',
          name: 'userList',
          component: userList,
        },
        {
          path: 'userDetail',
          name: 'userDetail',
          component: userDetail,
        },
        //企业管理 -- 角色管理
        {
          path: 'roleList',
          name: 'roleList',
          component: roleList,
        }
      ],
    },

  ],
})
