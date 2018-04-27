import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 登陆，重置
const signIn = resolve => require.ensure([], () => resolve(require('../view/sign/signIn')), 'sign')
const resetPassword = resolve => require.ensure([], () => resolve(require('../view/sign/resetPassword')), 'sign')

// home
const indexPage = resolve => require.ensure([], () => resolve(require('../view/index.vue')), 'index')

// 销售
const saleHome = resolve => require.ensure([], () => resolve(require('../view/saleManage/saleHome/saleHome')), 'saleHome')

// 企业管理
const manageHome = resolve => require.ensure([], () => resolve(require('../view/companyManage/manageHome/manageHome')), 'manageHome')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: signIn
    }, {
      path: '*',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    }, {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    }, {
      path: '/sales',
      name: 'indexPage',
      component: indexPage,
      children: [
        {
          path: '*',
          name: 'home',
          component: saleHome
        }, {
          path: 'saleHome',
          name: 'saleHome',
          component: saleHome
        }, {
          path: 'manageHome',
          name: 'manageHome',
          component: manageHome
        }
      ]
    },

  ]
})
