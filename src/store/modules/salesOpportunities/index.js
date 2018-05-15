/**
 * Created by allen on 17-4-14.
 */

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    salesOpportunitiesList: [],
    salesOpportunitiesTotal: 0,
    salesOpportunitiesDetail: {
      team: {}
    }
  },
  getters,
  actions,
  mutations
}
