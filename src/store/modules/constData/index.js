/**
 * Created by allen on 17-4-14.
 */

// import getters from './getters'
// import actions from './actions'
// import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    customerTypeOptions: [ // 客户类型选项
      {
        type: 0,
        value: '全部客户',
      }, {
        type: 1,
        value: '我负责的客户',
      }, {
        type: 2,
        value: '我更进的客户',
      }, {
        type: 3,
        value: '我参与的客户',
      }],
    customerSourceType: [ // 客户来源
      {
        type: 1,
        value: '销售自建',
      }, {
        type: 2,
        value: '代理商',
      }, {
        type: 3,
        value: '公司资源',
      },
    ],
    customerState: [ // 状态
      {
        type: 1,
        value: '自建',
      }, {
        type: 2,
        value: '已领取',
      }, {
        type: 3,
        value: '已分配',
      },
    ],
    contactsTypeOptions: [ // 联系人类型选择
      {
        type: 0,
        value: '全部联系人',
      }, {
        type: 1,
        value: '我负责的联系人',
      }, {
        type: 2,
        value: '我更进的联系人',
      }
    ],
    contactsStatus: [ // 联系人状态
      {
        type: 1,
        value: '正在使用'
      },
      {
        type: -1,
        value: '已作废'
      }
    ]
  },
  // getters,
  // actions,
  // mutations
}
