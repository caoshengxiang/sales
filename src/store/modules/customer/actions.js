/**
 * Created by allen on 17-4-14.
 */

export default {
  ac_customerList ({commit}, data) {
    commit('mut_customerContent', data.content)
    commit('mut_customerTotal', data.totalElements)
  },
  ac_customerDetail ({commit}, data) {
    commit('mut_customerDetail', data)
  }
}
