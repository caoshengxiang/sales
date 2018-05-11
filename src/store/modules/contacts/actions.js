/**
 * Created by allen on 17-4-14.
 */

export default {
  ac_contactsList ({commit}, data) {
    commit('mut_contactsList', data.content)
    commit('mut_contactsTotal', data.totalElements)
  },
  ac_contactsDetail ({commit}, data) {
    commit('mut_contactsDetail', data)
  }
}
