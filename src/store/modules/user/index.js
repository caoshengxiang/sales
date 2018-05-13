/**
 * Created by bnj_sb on 17-5-12.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    userList: [],
    userTotal: 0,
    userDetail: {
      team: {}
    }
  },
  getters,
  actions,
  mutations
}
