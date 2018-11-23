<template lang='pug'>
  div.com-container(v-loading="dataLoading" element-loading-text="数据加载中...")
    //- 头部
    div.com-head
      el-breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}") {{item.name}}
        el-breadcrumb-item(v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name" :to="{name: item.toName}") {{item.name}}
    //- 控制栏
    div.com-bar
      div.com-bar-left
      //- 前端
      div.com-bar-right(v-if="themeIndex === 0")
        //- el-select.com-el-select(v-model="salesOpportunitiesOptionsType" placeholder="请选择")
        //- el-option(v-for="item in salesOpportunitiesOptions" :key="item.type" :label="item.value" :value="item.type")
        //- com-button(buttonType="search" @click="searchHandle") 搜索
        com-button(buttonType="search" @click="advancedSearchHandle") 高级搜索
      //- 后端
      div.com-bar-right(v-if="themeIndex === 1")
        el-select.com-el-select(v-model="organizationId" @change="searchHandle" placeholder="请选择组织" style="width: 200px")
          el-option(label="全部组织的销售机会" :value="null")
          el-option(v-for="item in organizationOptions" :key="item.id" :label="item.name" :value="item.id")
        //- com-button(buttonType="search" @click="searchHandle") 搜索
        com-button(buttonType="search" @click="advancedSearchHandle") 高级搜索
    //- 详细
    div.com-box.com-box-padding.com-list-box
      el-table(ref="multipleTable" border stripe :max-height='posheight' :data="salesOpportunitiesList" tooltip-effect="dark" style="width: 100%" @sort-change="sortChangeHandle" @selection-change="handleSelectionChange")
        el-table-column(fixed align="center" sortable="" prop="appOrderId" width='180' label="订单编号" show-overflow-tooltip)
          template(slot-scope='scope')
            span {{scope.row.salerOrderId ? scope.row.salerOrderId.toString() + scope.row.appOrderId : ''}}
        el-table-column(fixed align="center" sortable="" prop="customerName" width='180' label="客户名称" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="provinceName" width='180' label="所属区域")
          template(slot-scope='scope')
            span {{scope.row.provinceName + scope.row.cityName + scope.row.areaName}}
        el-table-column(align="center" sortable="custom" prop="industry" width='120' label="所属行业" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="contacterName" width='120' label="联系人" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="contactPhone" width='180' label="联系方式" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="serviceYear" width='100' label="服务年度" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="productName" width='200' label="购买商品" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="billingType" width='100' label="商品类型" show-overflow-tooltip)
          template(slot-scope='scope')
            span {{scope.row.billingType === 'ANNUALLY' ? '计时' : '计次'}}
        el-table-column(align="center" sortable="custom" prop="orderType" width='100' label="签单类型" show-overflow-tooltip)
          template(slot-scope='scope')
            span {{scope.row.orderType === 'FIRST' ? '客户首购' : '客户复购'}}
        el-table-column(align="center" sortable="custom" prop="isRenew" width='100' label="是否续费" show-overflow-tooltip)
          template(slot-scope='scope')
            span {{~~scope.row.isRenew ? '是' : '否'}}
        el-table-column(align="center" sortable="custom" prop="renewTimes" width='100' label="续费年度" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="priceAmount" width='120' label="定价金额" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="billAmount" width='120' label="签单金额" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="receivedAmount" width='120' label="回款金额" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="noReceivedAmount" width='120' label="待回款金额" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="orderStatus" width='100' label="订单状态" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="orderSourceName" width='180' label="订单推荐来源" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="providerName" width='120' label="需求提供人" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="creatorName" width='120' label="订单创建人" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="salerName" width='100' label="销售员" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="counselorName" width='100' label="咨询师" show-overflow-tooltip)
        el-table-column(align="center" sortable="custom" prop="created" width='200' label="订单创建日期" show-overflow-tooltip)
          template(slot-scope='scope')
            span {{formD(scope.row.created)}}
        el-table-column(align="center" sortable="custom" prop="chanceSourceDate" width='200' label="需求来源日期" show-overflow-tooltip)
          template(slot-scope='scope')
            span {{formD(scope.row.chanceSourceDate)}}
    //- 底部综合信息
    //- 分页
    div.com-pages-box
      //- 总和数据
      div.tatal-data
        span 合计签单数：
          span.tatal-data-color {{footerData.all_bill_num}}
        span.tatal-data-line
        span 合计销售额：
          span.tatal-data-color {{footerData.all_sale_money ? footerData.all_sale_money.toLocaleString() : 0}}
        span.tatal-data-line
        span 合计回款额：
          span.tatal-data-color {{footerData.all_back_money ? footerData.all_back_money.toLocaleString() : 0}}
      el-pagination(background :total="salesOpportunitiesTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :layout="pagesOptions.layout" :page-sizes="pagesOptions.pageSizes" :page-size="pagesOptions.pageSize")
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  import addDialog from '../CRM/salesOpportunities/addDialog'
  import moveDialog from '../CRM/salesOpportunities/moveDialog'
  import { arrToStr, underscoreName, formatDate} from '../../../utils/utils'
  import advancedSearch from './advancedSearch'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        dataLoading: false,
        salesOpportunitiesOptionsType: null,
        multipleSelection: [],
        currentPage: 1,
        customerId: null,                         // 路由参数中得客户id
        defaultListParams: {                      // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        organizationOptions: [],                  // 组织列表
        organizationId: null,                     // 选择的组织
        sortObj: {sort: 'created,desc'},          // 排序
        advancedSearch: {},                       // 高级搜索
        footerData: {
          all_bill_num: 0,                        //合计签单数
          all_sale_money: 0,                      //合计销售额
          all_back_money: 0,                      //合计回款额
        },                                        
      }
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 260
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    created () {
      this.getSalesOpportunititeisList()
      if (this.themeIndex === 1) {      // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    mounted() {
      // 监听页面高度
      const that = this
      window.onresize = () => {
        return (() => {
          let a = document.body.clientHeight
          that.h = a
        })()
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
        'orderType',
        'productClass',
        'demandSource',
        'salesOpportunitiesOptions',
        'themeIndex',
        'topSource',
        'orderState',
        'orderStates'
      ]),
      ...mapState('salesOpportunities', [
        'salesOpportunitiesList',
        'salesOpportunitiesTotal',
      ]),
    },
    components: {
      comButton,
      addDialog,
      moveDialog,
    },
    methods: {
      ...mapActions('salesOpportunities', [
        'ac_salesOpportunitiesList',
      ]),
      formD(date) {
        return formatDate(date)
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getSalesOpportunititeisList () { // 获取列表
        this.dataLoading = true
        this.getQueryParams()
        if (this.themeIndex === 0) {
          API.statistical.Lists(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
            (data) => {
              if(data.data.content.length > 0 ) {
                data.data.content.forEach(a => {
                  let _state = ~~a.orderState;
                  // 支付状态赋值
                  switch (_state) {
                    case 1:
                      a.orderStatus = '待支付';
                      break;
                    case 2:
                      a.orderStatus = '已支付';
                      break;
                    case 3:
                      a.orderStatus = '服务中';
                      break;
                    case 4:
                      a.orderStatus = '已完成';
                      break;
                    case 5:
                      a.orderStatus = '已取消';
                      break;
                    case 6: 
                      a.orderStatus = '预下单';
                      break;
                    default:
                      break;
                  }
                })
              }
              this.ac_salesOpportunitiesList(data.data);
              if(data.other) {
                this.footerData.all_bill_num = data.other.counts;               //签单总数
                this.footerData.all_sale_money = data.other.allbillAmount;      //销售总额
                this.footerData.all_back_money = data.other.allreceivedAmount   //回款总额
              }
              setTimeout(() => {
                this.dataLoading = false;
              }, 500)
            })
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getSalesOpportunititeisList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getSalesOpportunititeisList()
      },
      handleRouter (name, id) {
        this.$router.push({
          name: 'salesOpportunitiesDetail',
          query: {view: name, id: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
      },
      handleRouter2 (name, id) {
        this.$router.push({
          name: 'customersDetail',
          query: {view: name, customerId: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
      },
      searchHandle () {
        this.getSalesOpportunititeisList()
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getSalesOpportunititeisList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.orderType,                //签单类型赋值
            productClass: this.productClass,           //商品类型赋值
            demandSource: this.demandSource,
            preAdvancedSearch: this.advancedSearch,
            orderState: this.orderStates,              //订单类型赋值
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getSalesOpportunititeisList()
            }
          },
        })
      },
      getQueryParams () {                            // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.salesOpportunitiesOptionsType,  // 前端
          organizationId: this.organizationId,       // 后端
        }
        if (this.customerId) {                       // 更多
          this.defaultListParams.customerId = this.customerId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .tatal-data {
    height: 60px;
    line-height: 70px;
    color: #606266;
    font-size: 13px;
    position: absolute;
    left: 65px;
    bottom: 0;

    .tatal-data-color {
        color: #4BCF99;
        font-weight: bold;
    }

    .tatal-data-line {
        display: inline-block;
        width: 1px;
        height: 10px;
        background: #606266;
        margin: 0 8px;
    }
  }
</style>