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
      }, {
        type: 4,
        value: '我下属跟进的客户',
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
        value: '客户池模块',
      },
    ],
    salesOpportunitiesOptions: [
      {
        type: null,
        value: '全部销售机会',
      },
      {
        type: 1, // 注意： 首页有直接使用 1这个值
        value: '我创建的销售机会',
      },
      {
        type: 2,
        value: '我跟进的销售机会',
      },
      {
        type: 3,
        value: '我参与的销售机会',
      }, {
        type: 4,
        value: '我下属跟进的销售机会',
      },
    ],
    customerState: [ // 客户状态
      {
        type: 1,
        value: '待领取',
      }, {
        type: 2,
        value: '已领取',
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
      }, {
        type: 3,
        value: '我下属跟进的联系人',
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
    productClass: [ //商品类型
      {
        type: '计次',
        value: 'TIMES'
      }, {
        type: '计时',
        value: 'ANNUALLY'
      }
    ],
    orderType: [ //签单类型
      {
        type: '客户首购',
        value: 'FIRST'
      }, {
        type: '客户复购',
        value: 'DERIVE'
      }
    ],
    salesState: [ // 销售阶段
      {
        type: -1, // 机会详细直接使用
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
        type: 4, // 注意： 首页有直接使用这个值
        value: ' 预下订单',
        percent: '80%',
      }, {
        type: 5, // 机会详细直接使用
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
        value: '待支付',
      }, {
        type: 2,
        value: '已支付',
      }, { // 订单【续费判单】直接用了
        type: 3,
        value: '服务中',
      }, { // 订单【续费判单】直接用了
        type: 4,
        value: '已完成',
      }, {
        type: 5,
        value: '已取消',
      }, { // 因为APP订单预览有个进度条，所以6改为了0
        type: 0, // 注意：修改值得时候注意有页面直接使用了0这个值【订单详细，APP订单预览】
        value: '预下单',
      },
    ],
    orderStates: [ //销售订单统计专用订单状态
      {
        type: 1,
        value: '待支付',
      }, {
        type: 2,
        value: '已支付',
      }, {
        type: 3,
        value: '服务中',
      }, {
        type: 4,
        value: '已完成',
      }, {
        type: 5,
        value: '已取消',
      }, {
        type: 0,
        value: '预下单',
      }, {
        type: 7,
        value: '待服务',
      }, {
        type: 8,
        value: '已中止',
      },
    ],
    orderSource: [ // 订单来源
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
      },
    ],
    // 角色系统
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
      },
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
      },
    ],
    // 顶级来源
    topSource: [
      {
        name: '销售自建',
        value: 101,
      }, {
        name: '代理商',
        value: 102,
      }, {
        name: '公司资源',
        value: 103,
      }, {
        name: '会议营销',
        value: 109,
      }, {
        name: '自然客户',
        value: 110,
      },
    ],
    // menusObj: {
    //   userM: {
    //     name: '用户管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '角色管理', value: 'userManagementSub'},
    //       {name: '用户管理', value: 'userManagementSub'},
    //       {name: '代理商管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   organizationM: {
    //     name: '组织管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '组织管理', value: 'userManagementSub'},
    //       {name: '客户池管理', value: 'userManagementSub'},
    //       {name: '组织商品配置', value: 'userManagementSub'},
    //     ],
    //   },
    //   baseConfigM: {
    //     name: '配置管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '站点开关', value: 'userManagementSub'},
    //       {name: '系统参数配置', value: 'userManagementSub'},
    //       {name: '返佣配置', value: 'userManagementSub'},
    //       {name: '服务内容配置', value: 'userManagementSub'},
    //       {name: '服务商品配置', value: 'userManagementSub'},
    //     ],
    //   },
    //   financialM: {
    //     name: '财务管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '回款结算管理', value: 'userManagementSub'},
    //       {name: '佣金结算管理', value: 'userManagementSub'},
    //       {name: '服务佣金结算管理', value: ''},
    //       {name: '财务支出管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   messageM: {
    //     name: '消息通知',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '历史消息记录', value: 'userManagementSub'},
    //     ],
    //   },
    //   logM: {
    //     name: '日志管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '日志管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   // 前端
    //   messageFE: {
    //     name: '消息通知',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '历史消息记录', value: 'userManagementSub'},
    //     ],
    //   },
    //   todoItemFE: {
    //     name: ' 代办事项',
    //     value: 'userManagementSub',
    //     children: [],
    //   },
    //   personalFE: {
    //     name: '个人设置',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '个人信息管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   taskApprovalFE: {
    //     name: '业务审批',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '业务审批管理', value: 'userManagementSub'},
    //       {name: '管家入驻管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   CRM: {
    //     name: '销售管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '客户管理', value: 'userManagementSub'},
    //       {name: '客户公海管理', value: 'userManagementSub'},
    //       {name: '联系人管理', value: 'userManagementSub'},
    //       {name: '销售机会管理', value: 'userManagementSub'},
    //       {name: '机会公海管理', value: 'userManagementSub'},
    //       {name: '销售订单管理', value: 'userManagementSub'},
    //       {name: '会议活动管理', value: 'userManagementSub'},
    //       {name: '跟单记录管理', value: 'userManagementSub'},
    //       {name: '销售回款管理', value: 'userManagementSub'},
    //       {name: '代理培育管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   PMS: {
    //     name: '服务管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '服务管家管理', value: 'userManagementSub'},
    //       {name: '服务订单管理', value: 'userManagementSub'},
    //       {name: '服务工单管理', value: 'userManagementSub'},
    //       {name: '客户票据管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   CSM: {
    //     name: '客满管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '服务客户管理', value: 'userManagementSub'},
    //       {name: '服务投诉管理', value: 'userManagementSub'},
    //       {name: '服务回访管理', value: 'userManagementSub'},
    //       {name: '服务抽查管理', value: 'userManagementSub'},
    //       {name: '服务抽查管理', value: 'userManagementSub'},
    //       {name: '客户意见管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   financialFE: {
    //     name: '财务管理',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '财务佣金管理', value: 'userManagementSub'},
    //     ],
    //   },
    //   ataAnaFE: {
    //     name: '统计分析',
    //     value: 'userManagementSub',
    //     children: [
    //       {name: '服务任务统计', value: 'userManagementSub'},
    //       {name: '客服任务统计', value: 'userManagementSub'},
    //       {name: '服务客户统计', value: 'userManagementSub'},
    //       {name: '客户票据统计', value: 'userManagementSub'},
    //       {name: '退单拒单统计', value: 'userManagementSub'},
    //       {name: '客户投诉统计', value: 'userManagementSub'},
    //       {name: '客户评价统计', value: 'userManagementSub'},
    //       {name: '客户意见统计', value: 'userManagementSub'},
    //     ],
    //   }
    // },
    managerCategory: [ // 管家类别
      {
        name: '平台直属',
        value: 1,
      }, {
        name: '控股子公司',
        value: 2,
      }, {
        name: '第三方机构',
        value: 3,
      }, {
        name: '第三方个人',
        value: 4,
      },
    ],
    // 认证状态,认证状态
    auditStatus: [
      {type: 1, value: '申请认证'},
      {type: 2, value: '认证审核'},
      {type: 3, value: '管家面签'},
      {type: 4, value: '缴纳保证金'},
      {type: 5, value: '保证金审核'},
      {type: 6, value: '入驻成功'},
    ],
    serviceType: [ // 7种服务类型
      {
        type: 1,
        value: '外勤服务',
      }, {
        type: 2,
        value: '财务记账',
      }, {
        type: 3,
        value: '财务内控',
      }, {
        type: 4,
        value: '纳税申报务',
      }, {
        type: 5,
        value: '税收风控',
      }, {
        type: 6,
        value: '其他计次服务',
      }, {
        type: 7,
        value: '其他计时服务',
      },
    ],
    visitTypes: [ // 回访类型
      {type: 1, value: '客户主动退单回访'},
      {type: 2, value: '回款异常订单回访'},
      {type: 3, value: 'A类产品续费异常订单回访'},
      {type: 4, value: '非记账托管业务首次沟通回访'},
      {type: 5, value: '外勤首次上门回访'},
      {type: 6, value: '2-3星评价回访'},
      {type: 7, value: '未评价订单回访'},
    ],
  },
  // getters,
  // actions,
  mutations,
}
