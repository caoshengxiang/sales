/**
 * Created by allen on 17-4-14.
 */

export default {
  ac_salesOpportunitiesList ({commit}, data) {
    commit('mut_salesOpportunitiesList', data.content)
    commit('mut_salesOpportunitiesTotal', data.totalElements)
  },
  ac_salesOpportunitiesDetail ({commit}, data) {
    commit('mut_salesOpportunitiesDetail', data)
  },
}
