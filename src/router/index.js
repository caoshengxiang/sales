import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 登陆，重置
const signIn = resolve => require.ensure([],
  () => resolve(require('../view/sign/signIn')), 'sign')
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
// 销售机会
const salesOpportunitiesList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/salesOpportunities/list')),
  'salesOpportunities')
// 销售订单
const salesOrdersList = resolve => require.ensure([],
  () => resolve(require('../view/saleManage/salesOrders/list')), 'salesOrders')
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

// 销售前端 end

// 企业管理 start

const companyManageHome = resolve => require.ensure([],
  () => resolve(require('../view/companyManage/manageHome/companyManageHome')),
  'manageHome')

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
          path: 'salesOpportunitiesList',
          name: 'salesOpportunitiesList',
          component: salesOpportunitiesList,
        }, {
          path: 'salesOrdersList',
          name: 'salesOrdersList',
          component: salesOrdersList,
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
        },
        // 企业管理
        {
          path: 'companyManageHome',
          name: 'companyManageHome',
          component: companyManageHome,
        },
      ],
    },

  ],
})
