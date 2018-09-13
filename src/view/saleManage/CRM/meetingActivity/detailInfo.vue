<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>四川省万企帮扶计划</h3>
          <p>
            <span class="com-d-item">负责部门: <span></span></span>
            <span class="com-d-item">负责人: <span>}</span></span>
            <span class="com-d-item">创建日期: <span>{{detailInfo.created && $moment(detailInfo.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li class="op-active" @click="operateOptions('edit')">编辑</li>
          <li class="op-active" @click="operateOptions('end')">结束</li>
          <li class="op-active" @click="operateOptions('delete')">删除</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick" style="padding-top: 20px;">
      <el-tab-pane label="活动基本信息" name="detail">
        <div class="com-box detail-info-box">
          <div class="detail-left com-box-padding">
            <p class="table-title">客户基本信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">活动时间</td>
                <td>{{detailInfo.customerName}}</td>
                <td class="td-title">活动经费</td>
                <td>{{detailInfo.department}}</td>
                <td class="td-title">活动人数</td>
                <td>{{detailInfo.position}}</td>
              </tr>
              <tr>
                <td class="td-title">主办单位</td>
                <td colspan="5">{{detailInfo.mail}}</td>
              </tr>
              <tr>
                <td class="td-title">承办单位</td>
                <td colspan="5">{{detailInfo.address}}</td>
              </tr>
              <tr>
                <td class="td-title">协办单位</td>
                <td colspan="5">{{detailInfo.address}}</td>
              </tr>
              <tr>
                <td class="td-title">活动地址</td>
                <td colspan="5">{{detailInfo.address}}</td>
              </tr>
              <tr>
                <td class="td-title">活动简介</td>
                <td colspan="5">{{detailInfo.remark}}</td>
              </tr>
            </table>

            <p class="table-title">活动操作记录</p>
            <table class="detail-table">
              <tr>
                <td colspan="5" class="td-title">联系人操作记录</td>
                <td class="td-title">操作人</td>
                <td class="td-title">操作时间</td>
              </tr>
              <tr v-for="(item, index) in detailInfo.operateLogList" :key="index">
                <td colspan="5">{{item.detail}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.operateTime && $moment(item.operateTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>
          </div>
          <!--团队成员-->
          <div class="detail-right com-box-padding">
            <div class="team-title">
              <span class="title-text">商务管家信息</span>
            </div>
            <el-row>
              <el-col :span="8" style="text-align: center;padding: 10px;"
                      v-for="i in 10" :key="i">
                <div class="head">
                  <img style="width: 58px;height: 58px;border-radius: 100%;" v-if="detailInfo.team"
                       :src="detailInfo.team.avatar" alt="">
                  <img v-else src="../../../../assets/icon/headDefault.png" alt="">
                </div>
                <div class="text">
                  <p>张三</p>
                </div>
              </el-col>
            </el-row>
            <el-button style="border-color: #4BCF99;color: #4BCF99;width: 80%;margin-left: 40px;margin-top: 30px;">商务管家管理</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!---->
      <el-tab-pane label="活动需求信息" name="related">
        <div class="com-box com-box-padding com-list-box">
          <el-table
            ref="multipleTable"
            border
            stripe
            :data="salesOpportunitiesList"
            tooltip-effect="dark"
            style="width: 100%"
            @sort-change="sortChangeHandle"
            >
            <el-table-column
              align="center"
              sortable="custom"
              label="客户名称"
              prop="customerName"
              show-overflow-tooltip
              width="160">
              <template slot-scope="scope">
                <a class="col-link" @click="handleRouter2('detail', scope.row.customerId)">{{ scope.row.customerName }}</a>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="intentProductName"
              label="意向商品"
              width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.intentProductName ||
                  '无名'}}</a>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="intentBillAmount"
              label="预计签单金额"
              width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="billDate"
              label="预计签单日期"
              width="160"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.billDate && $moment(scope.row.billDate).format('YYYY-MM-DD')}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="stage"
              label="销售阶段"
              width="160"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-for="item in salesState" :key="item.type" v-if="item.type === scope.row.stage">{{item.value}}</span>
                <!--<span v-if="scope.row.stage === -1">输单</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="stage"
              label="赢率"
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type"
                  v-if="item.type === scope.row.stage">{{item.percent}}</span>
                <!--<span v-if="scope.row.stage === -1">0%</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="chanceSourceName"
              label="需求来源"
              width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="creatorName"
              label="需求创建人"
              width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="salerName"
              label="需求销售员"
              width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="counselorName"
              label="需求咨询师"
              width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="created"
              label="创建日期"
              width="160"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              sortable="custom"
              prop="followDate"
              label="最近跟单记录"
              width="160"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.followDate && $moment(scope.row.followDate).format('YYYY-MM-DD HH:mm')}}
              </template>
            </el-table-column>
            <el-table-column
              v-if="themeIndex === 1"
              show-overflow-tooltip
              align="center"
              sortable="custom"
              prop="organizationName"
              label="所属组织"
              width="160">
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="com-pages-box">
            <el-pagination
              background
              :total="salesOpportunitiesTotal"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :layout="pagesOptions.layout"
              :page-sizes="pagesOptions.pageSizes"
              :page-size="pagesOptions.pageSize">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  // import API from '../../../../utils/api'
  import { mapState } from 'vuex'
  import webStorage from 'webStorage'
  import { underscoreName } from '../../../../utils/utils'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        activeViewName: '',
        salesOpportunitiesList: [],
        salesOpportunitiesTotal: 0,
        currentPage: 1,
        detailInfo: {},
        sortObj: {sort: 'created,desc'}, // 排序
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
        'demandSource',
        'salesOpportunitiesOptions',
        'themeIndex',
        'topSource',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
    },
    methods: {
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'meetingActivityDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, id: this.$route.query.id},
        })
      },
      operateOptions (option) {
        switch (option) {
          case 'edit':
            break
        }
      },
      getContactsDetail () {
        // this.dataLoading = true
        // API.contacts.detail(this.$route.query.contactsId, (data) => {
        //   setTimeout(() => {
        //     this.ac_detailInfo(data.data)
        //     this.getChanceList(data.data.customerId)
        //     this.getOrderList(data.data.customerId)
        //     this.dataLoading = false
        //   }, 500)
        // })
      },
      getChanceList (customerId) {
        // API.salesOpportunities.listNoAuth({customerId: customerId, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
        //   this.chanceList = da.data.content
        //   this.chanceTotal = da.data.totalElements
        // })
      },
      handleRoute (list) {
        switch (list) {
          // case 'contact':
          //   this.$router.push({name: 'contactsList', query: {customerId: this.detailInfo.customerId}})
          //   break
        }
      },
      quickOperation (op, id, obj) {
        // eslint-disable-next-line
        let deleteId = id || ''
        switch (op) {
          // case 'addContact':
          //   break
          case 'addChance':
            break
          case 'addOrder':
            break
          case 'reNew':
            break
        }
      },
      currentUserIsTeamNum () { // 判断当前用户是否为团对成员
        let currentUserId = webStorage.getItem('userInfo').id
        let team = this.detailInfo.team // creator 创建人id; salerList[] salerId 销售员id
        if (currentUserId === team.creator) {
          return true
        } else {
          let isSaler = team.salerList.some(item => {
            return item.salerId === currentUserId
          })
          if (isSaler) {
            return true
          } else {
            return false
          }
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
      },
      sortChangeHandle (sortObj) {
        // console.log(sortObj)
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getSalesOpportunititeisList()
      },
      getSalesOpportunititeisList () { // 获取列表
        this.dataLoading = true
        this.getQueryParams()
        API.salesOpportunities.list(Object.assign({}, this.defaultListParams, this.sortObj),
          (data) => {
            this.salesOpportunitiesList = data.data.content
            this.salesOpportunitiesTotal = data.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 500)
          })
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
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getContactsDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
