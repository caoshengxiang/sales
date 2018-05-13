/**
 * Created by bnj_sb on 17-5-12.
 */

export default {
  ac_userList ({commit}, data) {
    commit('mut_userList', data.content)
    commit('mut_userTotal', data.totalElements)
  },
  ac_userDetail ({commit}, data) {
    commit('mut_userDetail', data)
  }
}
