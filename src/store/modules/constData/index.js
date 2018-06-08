/**
 * Created by allen on 17-4-14.
 */

// import getters from './getters'
// import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    customerTypeOptions: [ // 客户类型选项
      {
        type: null,
        value: '全部客户',
      }, {
        type: 1,
        value: '我负责的客户',
      }, {
        type: 2,
        value: '我跟进的客户',
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
    customerAddSource: [ // 客户新增来源
      {
        type: 1,
        value: '客户管理模块',
      },
      {
        type: 2,
        value: '客户池模块'
      }
    ],
    salesOpportunitiesOptions: [
      {
        type: null,
        value: '全部销售机会'
      },
      {
        type: 1,
        value: '我创建的销售机会'
      },
      {
        type: 2,
        value: '我跟进的销售机会'
      },
      {
        type: 3,
        value: '我参与的销售机会'
      }, {
        type: 4,
        value: '我下属跟进的销售机会'
      }
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
        type: null,
        value: '全部联系人',
      }, {
        type: 1,
        value: '我负责的联系人',
      }, {
        type: 2,
        value: '我跟进的联系人',
      },
    ],
    contactsStatus: [ // 联系人状态
      {
        type: 1,
        value: '正在使用',
      },
      {
        type: -1,
        value: '已作废',
      },
    ],
    salesState: [ // 销售阶段
      {
        type: -1,
        value: '输单',
        percent: '0%',
      },
      {
        type: 1,
        value: '初步接洽',
        percent: '20%',
      }, {
        type: 2,
        value: '销售跟单',
        percent: '40%',
      }, {
        type: 3,
        value: '需求确定',
        percent: '60%',
      }, {
        type: 4,
        value: ' 预下订单',
        percent: '80%',
      }, {
        type: 5,
        value: '客户签单',
        percent: '100%',
      },
    ],
    demandSource: [
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
    orderTypeOptions: [ // 订单类型选择
      {
        type: null,
        value: '全部销售订单',
      }, {
        type: 1,
        value: '我负责的销售订单',
      }, {
        type: 2,
        value: '我跟进的销售订单',
      }, {
        type: 3,
        value: '我参与的销售订单',
      },
    ],
    orderState: [ // 订单状态
      {
        type: 1,
        value: '待支付'
      }, {
        type: 2,
        value: '已支付'
      }, {
        type: 3,
        value: '服务中'
      }, {
        type: 4,
        value: '已完成'
      }, {
        type: 5,
        value: '已取消'
      }, {
        type: 6,
        value: '预下单',
      },
    ],
    orderSource: [ // 订单来源
      {
        type: 1,
        value: '销售自建'
      }, {
        type: 2,
        value: '代理商'
      }, {
        type: 3,
        value: '公司资源'
      }
    ],
    themeIndex: 0, // 主题数组索引，默认为0销售前端
    theme: [ // 主题颜色
      {
        end: 'FE',
        headerBg: '#D7DDE4',
        headerColor: '#333E48',
        leftMenuBarBg: '#3A4651',
        leftMenuBarColor: '#9BA1A7',
        leftMenuBarActiveColor: '#39C189',
        leftMenuBarUserTextColor: '#FEFEFE',
        leftMenuBarBorderButtonColor: '#3A4651',
      }, {
        end: 'ME',
        headerBg: '#0BC3C4',
        headerColor: '#FFFFFF',
        leftMenuBarBg: '#ffffff',
        leftMenuBarColor: '#89A0AC',
        leftMenuBarActiveColor: '#0BC3C4',
        leftMenuBarUserColor: '#333E48',
        leftMenuBarBorderButtonColor: '#EBEBEB',
      },
    ],
    pagesOptions: { // 分页参数
      // layout: 'total,sizes, prev, pager, next, jumper', // 分页
      layout: 'total, prev, pager, next, jumper', // 分页
      pageSizes: [10, 20, 30, 40],
      pageSize: 20,
    },
    // 角色职能
    roleBilitys: [
      {
        value: 100,
        name: '代理商',
      },
      {
        value: 200,
        name: '咨询师',
      },
      {
        value: 300,
        name: '需求录入员',
      },
      {
        value: 400,
        name: '培训师',
      },
      {
        value: 500,
        name: '销售助理',
      },
      {
        value: 600,
        name: '销售员',
      },
      {
        value: 700,
        name: '客服',
      },
      {
        value: 800,
        name: '全职服务管家',
      },
      {
        value: 900,
        name: '普通职能',
      }
    ],
    //角色系统
    businessSystems: [
      {
        value: 100,
        name: '平台后台系统',
      },
      {
        value: 200,
        name: '销售系统',
      },
      {
        value: 300,
        name: '服务系统',
      },
      {
        value: 400,
        name: '客满系统',
      }
    ],
    // 组织类型
    organizationType: [
      {
        value: 1,
        name: '分子机构',
      },
      {
        value: 2,
        name: '部门',
      }
    ]
  },
  // getters,
  // actions,
  mutations,
}
