/**
 * Created by allen on 17-4-14.
 */

export default {
  ac_user ({commit}, data) {
    commit('mut_user', data)
  },
  ac_userHead ({commit}, data) {
    commit('mut_userHead', data)
  }
}
