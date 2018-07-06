/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    messageTotal: 0
  },
  getters,
  actions,
  mutations
}
