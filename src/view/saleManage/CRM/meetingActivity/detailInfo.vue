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
        <!--<img class="com-info-img" src="../../../../assets/icon/company.png" alt="">-->
        <div class="com-info-img">
          <vue-qr
            @click.native="dialogVisible=true"
            :logoSrc="config1.logo"
            :text="config1.value"
            :size="60"
            :margin="0"
            :callback="agentRecCallback"
            qid="activity-1"></vue-qr>
        </div>
        <div class="com-info-text">
          <h3>{{detailInfo.meetingName}}
            <span
              style="position:relative;top: -5px;font-size: 12px; color: #FF7700;padding: 4px 12px;border:1px solid #FF7700;margin-left: 20px;border-radius: 20px;">
              {{detailInfo.stateName}}
            </span>
          </h3>
          <p>
            <span class="com-d-item">负责部门: <span>{{detailInfo.meetingCreatorDepartmentName}}</span></span>
            <span class="com-d-item">负责人: <span>{{detailInfo.meetingCreatorName}}</span></span>
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
                <td class="td-title">活动名称</td>
                <td colspan="5">{{detailInfo.meetingName}}</td>
              </tr>
              <tr>
                <td class="td-title">活动时间</td>
                <td>
                  {{ detailInfo.meetingTimeStart && $moment(detailInfo.meetingTimeStart).format('YYYY-MM-DD HH:mm') }}
                  -
                  {{ detailInfo.meetingTimeEnd && $moment(detailInfo.meetingTimeEnd).format('YYYY-MM-DD HH:mm') }}
                </td>
                <td class="td-title">活动经费</td>
                <td>{{detailInfo.meetingMoney}}</td>
                <td class="td-title">活动人数</td>
                <td>{{detailInfo.personCount}}</td>
              </tr>
              <tr>
                <td class="td-title">主办单位</td>
                <td colspan="5">{{detailInfo.hostUnit}}</td>
              </tr>
              <tr>
                <td class="td-title">承办单位</td>
                <td colspan="5">{{detailInfo.organizer}}</td>
              </tr>
              <tr>
                <td class="td-title">协办单位</td>
                <td colspan="5">{{detailInfo.coOrganizer}}</td>
              </tr>
              <tr>
                <td class="td-title">活动地址</td>
                <td colspan="5">{{detailInfo.address}}</td>
              </tr>
              <tr>
                <td class="td-title">活动简介</td>
                <td colspan="5">{{detailInfo.meetingDesc}}</td>
              </tr>
            </table>

            <p class="table-title">活动操作记录</p>
            <table class="detail-table">
              <tr>
                <td colspan="5" class="td-title">活动操作记录</td>
                <td class="td-title">操作人</td>
                <td class="td-title">操作时间</td>
              </tr>
              <tr v-for="(item, index) in operateLogList" :key="index">
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
              <el-col :span="8" style="text-align: center;padding: 10px 0;"
                      v-for="item in managerList" :key="item.managerId">
                <div class="head" @click="showManagerCode(item)">
                  <img style="width: 58px;height: 58px;border-radius: 100%;"
                       v-if="item.headUrl"
                       :src="item.headUrl" alt="" :onerror="defaultHeadUrl">
                  <img style="width: 58px;height: 58px;border-radius: 100%;" v-else src="../../../../assets/icon/touxiang2.png" alt="">
                </div>
                <div class="text">
                  <p>{{item.mangerName}}</p>
                </div>
              </el-col>
            </el-row>
            <el-button @click="operateOptions('addHousekeeper')"
                       style="border-color: #4BCF99;color: #4BCF99;width: 80%;margin-left: 40px;margin-top: 30px;">
              商务管家管理
            </el-button>
          </div>
        </div>
      </el-tab-pane>
      <!---->
      <el-tab-pane label="活动需求信息" name="related">
        <div class="com-box com-box-padding com-list-box">
          <el-button style="float: right;margin-bottom: 20px;" @click="addChanceHandle">添加销售需求</el-button>
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
                <a v-if="scope.row.customerId" class="col-link" @click="handleRouter2('detail', scope.row.customerId)">{{ scope.row.customerName
                  }}</a>
                <span v-else>{{scope.row.customerName}}</span>
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
                <span v-for="item in salesState" :key="item.type"
                      v-if="item.type === scope.row.stage">{{item.value}}</span>
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

    <!--二维码大图-->
    <el-dialog
      title="活动二维码"
      :visible.sync="dialogVisible"
      width="30%;"
      class="code"
    >
      <div style="text-align: center;">
        <p class="title">{{detailInfo.meetingName}}</p>
        <div
          ref="downloadCode"
          style="min-height: 200px;margin: 20px;padding: 20px;display: inline-block">
          <vue-qr
            :logoSrc="config1.logo"
            :text="config1.value"
            :size="200"
            :margin="0"
            :callback="agentRecCallback"
            qid="activity-2"></vue-qr>
        </div>
        <p class="name">活动的专属二维码录入销售需求</p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" v-if="codeImgBase64" @click="downloadCodeHandle">下载二维码</el-button>
  </span>
    </el-dialog>
    <!--二维码-管家-->
    <el-dialog
      title="活动二维码"
      :visible.sync="dialogVisible2"
      width="800px"
    >
      <div style="color: #4F5F6F;">
        <div style="display: flex;margin:20px 0;padding: 20px;border: 1px solid #ddd;">
          <div ref="downloadCodeManager"
               style="min-height: 200px;margin-right: 20px;display: inline-block;">
            <vue-qr
              :logoSrc="config.logo"
              :text="config.value"
              :size="200"
              :margin="10"
              :callback="agentRecCallback"
              qid="manager-2"></vue-qr>
          </div>
          <div>
            <div style="margin-bottom: 20px;">
              <span
                style="font-size: 18px;font-weight: bold;margin-right: 10px;">{{managerCodeDetail.mangerName}}</span>
              <span v-if="managerCodeDetail.managerId">商务管家</span>
              <span v-if="managerCodeDetail.managerId === managerCodeDetail.meetingCreatorId">、活动负责人</span>
            </div>
            <div>
              <p style="margin-bottom:10px;">使用方法</p>
              <p>
                使用方法使用方法使用方法使用方法使用方法使用方法使用方法使用方法使用方法使方法使用方法使用方法使用方法使用方法使用方法使用方法使用方法
                使用方法使用方法使用方法使用方法使用方法
                使用方法使用方法使用方法使用方法使用方法
                使用方法使用方法使用方法使用方法使用方法
              </p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button @click="deleteHousekeeperHandle">移除管家</el-button>
    <el-button type="primary" v-if="codeImgBase64" @click="downloadCodeHandle2">下载二维码</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState } from 'vuex'
  import webStorage from 'webStorage'
  import { underscoreName } from '../../../../utils/utils'
  import VueQr from 'vue-qr'
  import html2canvas from 'html2canvas'
  import addDialog from './addDialog'
  import addHousekeeper from './addHousekeeper'
  import { activityCodePre } from '../../../../utils/const'
  import Qs from 'qs'
  import addChance from './addChance'

  export default {
    name: 'detailInfo',
    data () {
      return {
        defaultHeadUrl: 'this.src="' + require('../../../../assets/icon/headDefault.png') + '"',
        dialogVisible: false,
        dialogVisible2: false,
        dataLoading: false,
        activeViewName: '',
        detailInfo: {},
        operateLogList: [],
        salesOpportunitiesList: [],
        salesOpportunitiesTotal: 0,
        currentPage: 1,
        sortObj: {sort: 'created,desc'}, // 排序
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          meetingId: null,
          meetingSaleCreator: null,
          meetingManagerId: null,
        },
        managerList: [],
        config1: {
          value: '', // 显示的值、跳转的地址(要加http)
          logo: 'static/favicon.ico', // 中间logo的地址
        },
        config: {
          value: '', // 显示的值、跳转的地址(要加http)
          logo: 'static/favicon.ico', // 中间logo的地址
        },
        codeImgBase64: '',
        managerCodeDetail: {}, // 管家详细
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
      VueQr,
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
      getDetail () {
        this.dataLoading = true
        API.activity.detail(this.$route.query.id, (data) => {
          setTimeout(() => {
            this.detailInfo = data.data
            this.dataLoading = false
            this.getSalesOpportunititeisList()
            this.getMannerList(this.detailInfo.id)
            this.getLog(this.detailInfo.id)
            this.config1.value = activityCodePre + Qs.stringify({ // 拼装活动二维码参数
              meetingId: this.detailInfo.id,
              organizationId: this.detailInfo.meetingCreatorOgrId
            })
          }, 500)
        }, (data) => {
          setTimeout(() => {
            // this.detailInfo = data.data
            // this.dataLoading = false
            // this.getSalesOpportunititeisList()
            // this.getMannerList(this.detailInfo.id)
            // this.getLog(this.detailInfo.id)
          }, 500)
        })
      },
      getLog (id) {
        API.activity.log({id: id}, (data) => {
          this.operateLogList = data.data
        }, (data) => {
          this.operateLogList = data.data
        })
      },
      getMannerList (id) {
        API.activity.managerList(id, (data) => {
          this.managerList = data.data
        })
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          meetingId: this.detailInfo.id,
          meetingSaleCreator: this.detailInfo.meetingCreatorId,
          meetingManagerId: null,
        }
      },
      getSalesOpportunititeisList () { // 获取列表
        this.dataLoading = true
        this.getQueryParams()
        API.activity.chance(Object.assign({}, this.defaultListParams, this.sortObj),
          (data) => {
            this.salesOpportunitiesList = data.data.content
            this.salesOpportunitiesTotal = data.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 500)
          })
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
      editHandle () {
        this.$vDialog.modal(addDialog, {
          title: '新增活动',
          width: 900,
          height: 500,
          params: {
            detail: JSON.parse(JSON.stringify(this.detailInfo)),
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getDetail()
            }
          },
        })
      },
      endHandle () {
        this.$confirm('确定结束会议活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.dataLoading = true
          API.activity.end({ids: this.detailInfo.id}, (data) => {
            if (data.status) {
              if (data.data.fail > 0) {
                this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
              } else {
                this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
              }
              setTimeout(() => {
                this.dataLoading = false
                this.getDetail()
              }, 500)
            } else {
              setTimeout(() => {
                this.dataLoading = false
              }, 500)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
      },
      deleteHandle () {
        this.$confirm('确定删除会议活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.dataLoading = true
          API.activity.deleteActivity({ids: this.detailInfo.id}, (data) => {
            if (data.status) {
              if (data.data.fail > 0) {
                this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
              } else {
                this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
              }
              setTimeout(() => {
                this.dataLoading = false
                this.getDetail()
                this.$router.push({name: 'meetingActivity'})
              }, 500)
            } else {
              setTimeout(() => {
                this.dataLoading = false
              }, 500)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
      },
      addHousekeeperHandle () {
        this.$vDialog.modal(addHousekeeper, {
          title: '商务管家管理',
          width: 500,
          height: 300,
          params: {
            id: this.detailInfo.id,
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getMannerList(this.detailInfo.id)
            }
          },
        })
      },
      operateOptions (type) {
        switch (type) {
          case 'edit':
            this.editHandle()
            break
          case 'end':
            this.endHandle()
            break
          case 'delete':
            this.deleteHandle()
            break
          case 'addHousekeeper':
            this.addHousekeeperHandle()
            break
        }
      },
      addChanceHandle () {
        this.$vDialog.modal(addChance, {
          title: '新增销售需求',
          width: 900,
          height: 500,
          params: {
            salesState: this.salesState,
            topSource: this.topSource, // 顶级客户来源
            meetingId: this.detailInfo.id,
            meetingCreatorId: this.detailInfo.meetingCreatorId,
            meetingCreatorName: this.detailInfo.meetingCreatorName
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getSalesOpportunititeisList()
            }
          },
        })
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
      handleRoute (list) {
        switch (list) {
          // case 'contact':
          //   this.$router.push({name: 'contactsList', query: {customerId: this.detailInfo.customerId}})
          //   break
        }
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
      agentRecCallback (codeImgBase64) {
        this.codeImgBase64 = codeImgBase64
      },
      downloadCodeHandle () {
        html2canvas(this.$refs.downloadCode).then(canvas => {
          // document.body.appendChild(canvas)
          var a = document.createElement('a')
          a.href = canvas.toDataURL('image/png') // 将画布内的信息导出为png图片数据
          a.download = this.detailInfo.meetingName + '二维码' // 设定下载名称
          a.click() // 点击触发下载
        })
      },
      downloadCodeHandle2 () {
        html2canvas(this.$refs.downloadCodeManager).then(canvas => {
          // document.body.appendChild(canvas)
          var a = document.createElement('a')
          a.href = canvas.toDataURL('image/png') // 将画布内的信息导出为png图片数据
          a.download = this.detailInfo.meetingName + ',' + this.managerCodeDetail.mangerName + '二维码' // 设定下载名称
          a.click() // 点击触发下载
        })
      },
      deleteHousekeeperHandle () {
        this.$confirm('确定移除商务管家, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          API.activity.deleteHousekeeper({
            id: this.detailInfo.id,
            ids: this.managerCodeDetail.managerId
          }, (da) => {
            if (da.status) {
              this.$message.success('移除成功!')
              this.getMannerList(this.detailInfo.id)
              this.dialogVisible2 = false
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
      },
      showManagerCode (item) {
        this.dialogVisible2 = true
        this.managerCodeDetail = item
        this.config.value = activityCodePre + Qs.stringify({ // 拼装活动管家二维码参数
          meetingId: this.detailInfo.id,
          organizationId: this.detailInfo.meetingCreatorOgrId,
          meetingManagerId: item.managerId
        })
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
<style>
</style>
