/**
 * Created by allen on 17-4-14.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import constData from './modules/constData'
import customer from './modules/customer'
import contacts from './modules/contacts'
import user from './modules/user'
import salesOpportunities from './modules/salesOpportunities'
import todoItem from './modules/todoItem'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  state: {
    user: '', // 用户信息
  },
  getters,
  actions,
  mutations,
  modules: {
    constData,
    customer,
    contacts,
    salesOpportunities,
    user,
    todoItem,
  }
})
