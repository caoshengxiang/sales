<template>
  <div class="com-container"
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
      <div class="com-bar-left">
        <com-button buttonType="add" @click="addHandle">新增</com-button>
        <com-button buttonType="add" :disabled="multipleSelection.length != 1" @click='perfectVisitor'>完善访客</com-button>
        
        <span style='margin-left: 10px;'>
            <el-select
              v-model="selectVisType"
              @change="selectVis"
              placeholder="选择客户类型" class="com-el-select" style="width: 200px">
              <el-option label="全部类型" :value="0"></el-option>
              <el-option label="访客" :value="1"></el-option>
              <el-option label="准客户" :value="2"></el-option>
              <el-option label="客户" :value="3"></el-option>
            </el-select>
        </span>
        <!--<com-button buttonType="orange" @click="moveHandle"-->
                    <!--:disabled="multipleSelection.length !== 1"><i class="el-icon-sort"-->
                                                                  <!--style="transform: rotate(90deg)"></i> 转移-->
        <!--</com-button>-->
        <!--<com-button buttonType="backHighSeas" icon="el-icon-back" @click="returnHighSeaHandle"-->
                    <!--:disabled="multipleSelection.length !== 1">退回公海池-->
        <!--</com-button>-->
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0"><!--前端-->
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导入模板下载</com-button>
        <com-button buttonType="import" style="position: relative;overflow: hidden;">
          <input id="modelValue" @change="fileUploadHandle" type="file" style="position: absolute;top: 0;left: 0; right: 0;bottom: 0;opacity: 0;">
          批量导入
        </com-button>
        
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 1"><!--后端-->
        <el-select
          v-model="organizationId"
          @change="searchHandle"
          placeholder="请选择组织" class="com-el-select" style="width: 200px">
          <el-option label="全部组织的客户" :value="null"></el-option>
          <el-option
            v-for="item in organizationOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        :max-height='posheight'
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          sortable="custom"
          label="客户名称"
          prop="name"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.name || '——' }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="资源类型"
          prop="cate"
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.visitorType === 1">访客</span>
            <span v-if="scope.row.visitorType === 2">准客户</span>
            <span v-if="scope.row.visitorType === 3">客户</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="客户销售需求"
          prop="cusomerStatus"
          width="160">
          <template slot-scope="scope">
            <span><a class="col-link" @click='lookOrder(false, scope.row.id)'>销售需求-{{scope.row.chanceCount}}</a></span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="客户销售订单"
          prop="cusomerStatus"
          width="160">
          <template slot-scope="scope">
            <span><a class="col-link" @click='lookOrder(true, scope.row.id)'>销售订单-{{scope.row.orderCount}}</a></span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="客户识别码"
          prop="cdKey"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="phone"
          label="联系电话"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="contactName"
          label="联系人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="industry"
          label="客户行业"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="provinceName"
          label="客户地区"
          width="160">
          <template slot-scope="scope">
            {{ scope.row.provinceName }}
            {{ scope.row.cityName }}
            {{ scope.row.areaName }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="客户类型"
          prop="cate"
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.cate === 1">个人</span>
            <span v-if="scope.row.cate === 2">机构</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="客户有效性"
          prop="cusomerStatus"
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.customerStatus == 0 || scope.row.customerStatus == null">待判断</span>
            <span v-if="scope.row.customerStatus == 1">有效</span>
            <span v-if="scope.row.customerStatus == -1">无效</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="seaName"
          label="所属公海"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="visitorResourceName"
          label="访客来源"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="visitorReferrerName"
          label="访客推荐人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="customerSourceName"
          label="客户来源"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="recommenderName"
          label="客户推荐人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="recommenderSourceName"
          label="客户推荐来源"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="creatorName"
          label="客户创建人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          label="客户销售人"
          width="160">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.salerList"
                  :key="item.salerId"><span v-if="index > 0">、</span>{{item.salerName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="returnTimes"
          label="客户退回次数"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="modified"
          label="最近跟进时间"
          width="160">
          <template slot-scope="scope">
            {{scope.row.modified && $moment(scope.row.modified).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="created"
          label="创建日期"
          width="160">
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
    
    <el-dialog
      :title="listText"
      :visible.sync="orderDialogVisible"
      width="70%"
      center>
      <div class='orderDialog'>
        <!-- 需求列表 -->
        <div v-show="!orderDialogType">
            <el-table
              border
              stripe
              v-loading="orderDialogShow"
              :data="orderDialogList"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="intentProductName"
                width="200"
                label="商品名称">
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="stage"
                label="销售阶段"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-for="item in salesStateNew" :key="item.type" v-if="item.type === scope.row.stage">{{item.value}}</span>
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
                prop="providerName"
                label="需求提供人"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="created"
                label="创建时间"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="provinceName"
                label="地区"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.provinceName }}
                  {{ scope.row.cityName }}
                  {{ scope.row.areaName }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="customerIntentionLevel"
                label="意向程度"
                width="160"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <a class="col-link" v-if='scope.row.customerIntentionLevel == 0' @click='setCustomerIntentionLevel(scope.row)'><span>无</span></a>
                  <a class="col-link" v-if='scope.row.customerIntentionLevel == 1' @click='setCustomerIntentionLevel(scope.row)'><span>低</span></a>
                  <a class="col-link" v-if='scope.row.customerIntentionLevel == 2' @click='setCustomerIntentionLevel(scope.row)'><span>中</span></a>
                  <a class="col-link" v-if='scope.row.customerIntentionLevel == 3' @click='setCustomerIntentionLevel(scope.row)'><span>高</span></a>
                  <a class="col-link" v-if='scope.row.customerIntentionLevel == null' @click='setCustomerIntentionLevel(scope.row)'><span>待判断</span></a>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="salerName"
                label="跟进人"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="followDate"
                label="跟进时间"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.followDate && $moment(scope.row.followDate).format('YYYY-MM-DD HH:mm')}}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="latestFollowRecord"
                label="最近跟单记录"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
        </div>
        <!-- 销售订单 -->
        <div v-show="orderDialogType">
            <el-table
              border
              stripe
              :data="orderDialogList"
              v-loading="orderDialogShow"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                align="center"
                sortable="custom"
                prop="orderId"
                label="订单编号"
                show-overflow-tooltip
                width="200">
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="productName"
                label="销售商品"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="billAmount"
                label="签单金额"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="refundAmount"
                label="回款金额"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                align="center"
                prop="orderState"
                sortable="custom"
                label="订单状态"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-for="item in orderState" :key="item.type"
                        v-if="scope.row.orderState === item.type">{{item.value}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                sortable="custom"
                prop="created"
                label="创建时间"
                width="160"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD')}}
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from './addDialog'
  import advancedSearch from './advancedSearch'
  import { serverUrl } from '../../../../utils/const'
  import perfectVisitorDialog from './perfectVisitorDialog'
  import { underscoreName } from '../../../../utils/utils'
  import QS from 'qs'
  import webStorage from 'webStorage'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        selectVisType: 0,
        listText: '需求列表',
        orderDialogShow: false,
        orderDialogVisible: false,
        orderDialogType: 0,
        orderDialogList: [],
        dataLoading: true,
        tableData: [],
        total: 0,
        multipleSelection: [],
        customerType: null, // 客户选项
        currentPage: 1, // 当前页
        customerId: null, // 路由参数中得客户id
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        organizationOptions: [], // 组织列表
        organizationId: null, // 选择的组织
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        nameArr: [],
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
    created () {
      this.getCustomerList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    computed: {
      ...mapState('constData', [
        'customerTypeOptions',
        'customerSourceType',
        'salesStateNew',
        'orderState',
        'customerState',
        'pagesOptions',
        'customerAddSource',
        'themeIndex',
        'topSource',
      ]),
    },
    components: {
      comButton,
      addDialog,
      // moveDialog,
    },
    methods: {
      // moment (Timestamps, str) {
      //   return moment(Timestamps).format(str)
      // },
      // 选择客户类型
      selectVis () {
          this.currentPage = 1
          this.getCustomerList()
      },
      // 查看客户的需求列表以及订单列表
      lookOrder (_type, id) {
        this.orderDialogList = [];
        this.orderDialogVisible = true;
        this.orderDialogShow = true;
        this.orderDialogType = _type;
        if(!_type) {
          this.listText = '需求列表';
          API.customer.salerChanceListVisZX({customerId: id}, (data) => {
              this.orderDialogShow = false;
              if(data.status) {
                  this.orderDialogList = data.data;
              }
          })
        }else {
          this.listText = '订单列表';
          API.customer.salerOrderListVisZX({customerId: id}, (data) => {
              this.orderDialogShow = false;
              if(data.status) {
                  this.orderDialogList = data.data;
              }
          })
        }
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      getCustomerList () { // 获取列表数据
        this.getQueryParams()
        this.dataLoading = true
        API.customer.VisListZX(Object.assign({pageSource: 1}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          if(data.status) {
            this.tableData = data.data.content
            this.total = data.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          }
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getCustomerList()
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
        this.getCustomerList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 560,
          nameArr: this.nameArr,
          params: {
            customerSourceType: this.customerSourceType,
            customerState: this.customerState,
            preAdvancedSearch: this.advancedSearch,
            nameArr: this.nameArr,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params.preAdvancedSearch
              if(data.params.preAdvancedSearch.visitorType) {
                this.selectVisType = data.params.preAdvancedSearch.visitorType || 0;
              }
              this.nameArr = data.params.nameArr;
							this.currentPage = 1;
              this.getCustomerList()
            }else {
                this.advancedSearch = {};
                this.nameArr = [];
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
              this.nameArr = [];
          },
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCustomerList()
      },
      handleRouter (name, id) {
        let _url = this.$router.resolve({
          name: 'customersVisDetail',
          query: {view: name, customerId: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        });
				window.open(_url.href, '_blank')
      },
      addHandle () {
        let that = this
        this.$vDialog.modal(addDialog, {
          title: '新增客户',
          width: 900,
          height: 460,
          params: {
            customerAddSource: this.customerAddSource,
            pageSource: 1, // 1:客户管理模块 2:客户公海模块
            topSource: this.topSource, // 顶级客户来源
          },
          callback (data) {
            if (data.type === 'save') {
              that.getCustomerList()
            }
          },
        })
      },
      perfectVisitor () {
        let that = this
        let _type = this.multipleSelection[0].visitorType;
        if(_type !== 1) {
          return this.$message.info('只能完善访客');
        }
        this.$vDialog.modal(perfectVisitorDialog, {
          title: '完善访客',
          width: 900,
          height: 460,
          params: {
            customerAddSource: this.customerAddSource,
            pageSource: 1, // 1:客户管理模块 2:客户公海模块
            topSource: this.topSource, // 顶级客户来源
            detail: this.multipleSelection[0],
          },
          callback (data) {
            if (data.type === 'save') {
              that.getCustomerList()
            }
          },
        })
      },
      // moveHandle () {
      //   let that = this
      //   this.$vDialog.modal(moveDialog, {
      //     title: '转移客户',
      //     width: 600,
      //     height: 420,
      //     params: {
      //       customerIds: this.multipleSelection,
      //     },
      //     callback (data) {
      //       if (data.type === 'save') {
      //         that.getCustomerList()
      //       }
      //     },
      //   })
      // },
      // returnHighSeaHandle () {
      //   let that = this
      //   this.$vDialog.modal(returnPoll, {
      //     title: '退回公海池',
      //     width: 600,
      //     height: 220,
      //     params: {
      //       customerIds: this.multipleSelection,
      //     },
      //     callback (data) {
      //       if (data.type === 'save') {
      //         that.getCustomerList()
      //       }
      //     },
      //   })
      // },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.customerType, // 前端
          organizationId: this.organizationId, // 后端
        }
        if(this.selectVisType != 0) {
            this.defaultListParams.visitorType = this.selectVisType;
            this.advancedSearch.visitorType = this.selectVisType;
        }else {
            this.advancedSearch.visitorType = '';
        }
        if (this.customerId) { // 更多
          this.defaultListParams.customerId = this.customerId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
      // 批量导入
      fileUploadHandle (e) {
        let value = $('#modelValue').val();
        if(value) {
            let files = e.target.files || e.dataTransfer.files
            let formData = new FormData()
            formData.append('filename', files[0].name)
            formData.append('file', files[0])
            API.customer.visImport(formData, up => {
              if (up.status && up.data > 0) {
                  this.$message.success('导入成功');
                  this.getCustomerList();
              }else {
                  this.$message.error('导入失败，未知错误');
              }
            })
            $('#modelValue').val('');
        }
      },
      excelExport () { // 模板下载
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        // link.setAttribute('href', serverUrl + '/template/访客导入模板.xlsx?' + query)
        link.setAttribute('href', 'http://erp.zzcfo.cn/files/templatefile/访客导入模板.xlsx?' + query)
        link.setAttribute('download', '访客导入模板')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
		// 有效性判断
		// customerIdentification (item) {
		// 	let that = this;
		// 	API.customer.checkValid({customerId: item.id}, (data) => {
		// 		if(data.status && data.data == 1) {
		// 			that.$vDialog.modal(identification, {
		// 			  title: '客户鉴定',
		// 			  width: 900,
		// 			  height: 600,
		// 			  params: {
		// 				customer: item,
		// 			  },
		// 			  callback (data) {
		// 				if (data.type === 'save') {
		// 				  that.getCustomerList()
		// 				}
		// 			  },
		// 			})
		// 		}
		// 	})
		// },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
	
	.customer-identification {
		cursor: pointer;
		color: #1E88E5;
	}
	.customer-identification:hover {
		text-decoration: underline;
	}
  .orderDialog {
    max-height: 500px;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
