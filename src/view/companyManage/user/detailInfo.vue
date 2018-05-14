<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>客户</el-breadcrumb-item>
        <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/placeholder.jpg" alt="">
        <div class="com-info-text">
          <h3>成都凡特塞科技有限公司</h3>
          <p>
            <span class="com-d-item">客户所有人: <span>{{customerDetail.shortName}}</span></span>
            <span class="com-d-item">所属公海: <span>{{customerDetail.seaName}}</span></span>
            <span class="com-d-item">创建时间: <span>{{customerDetail.created}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<el-radio-group v-model="tapOption">-->
        <!--<el-radio-button class="btn-width" label="edit" @click.native="operateOptions">编辑</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="back" @click.native="operateOptions">退回公海</el-radio-button>-->
        <!--<el-radio-button class="btn-width" label="move" @click.native="operateOptions">转移</el-radio-button>-->
        <!--</el-radio-group>-->
        <ul class="com-info-op-group">
          <li class="op-active" @click="operateOptions('edit')">编辑</li>
          <li @click="operateOptions('back')">退回公海</li>
          <li @click="operateOptions('move')">转移</li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="客户资料信息" name="detail">
            <p class="table-title">客户资料信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">公司名称</td>
                <td>{{customerDetail.name}}</td>
                <td class="td-title">营业执照</td>
                <td>{{customerDetail.businessLicense}}</td>
                <td class="td-title">客户级别</td>
                <td>{{customerDetail.levelName}}</td>
              </tr>
              <tr>
                <td class="td-title">客户简称</td>
                <td>{{customerDetail.shortName}}</td>
                <td class="td-title">客户行业</td>
                <td>{{customerDetail.industryName}}</td>
                <td class="td-title">客户来源</td>
                <td>
                  <span v-for="item in customerSourceType" :key="item.type"
                        v-if="item.type === customerDetail.source">{{item.value}}</span>
                </td>
              </tr>
              <tr>
                <td class="td-title">所在地区</td>
                <td>{{ customerDetail.provinceName }}
                  {{ customerDetail.cityName }}
                  {{ customerDetail.areaName }}
                </td>
                <td class="td-title">公司网站</td>
                <td>{{customerDetail.website}}</td>
                <td class="td-title">联系电话</td>
                <td>{{customerDetail.phone}}</td>
              </tr>
              <tr>
                <td class="td-title">联系地址</td>
                <td colspan="5">{{customerDetail.address}}</td>
              </tr>
              <tr>
                <td class="td-title">主营业务</td>
                <!--<td colspan="5">暂未填写主营业务{{customerDetail.business}}</td>-->
                <td colspan="5">{{customerDetail.business || '暂未填写主营业务'}}</td>
              </tr>
            </table>

            <p class="table-title">客户其他信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">所在公海</td>
                <td>{{customerDetail.seaName}}</td>
                <td class="td-title">客户来源</td>
                <td>
                  <span v-for="item in customerSourceType" :key="item.type"
                        v-if="item.type === customerDetail.source">{{item.value}}</span>
                </td>
                <td class="td-title">客户状态</td>
                <td>
                   <span v-for="item in customerState" :key="item.type"
                         v-if="item.type === customerDetail.state">{{item.value}}</span>
                </td>
              </tr>
              <tr>
                <td class="td-title">客户创建时间</td>
                <td colspan="3">{{customerDetail.created}}</td>
                <td class="td-title">创建人</td>
                <td>{{customerDetail.creatorName}}</td>
              </tr>
              <tr>
                <td class="td-title">最新修改时间</td>
                <td colspan="3">{{customerDetail.modified}}</td>
                <td class="td-title">修改人</td>
                <td>{{customerDetail.modifierName}}</td>
              </tr>
              <tr>
                <td class="td-title">最新活动时间</td>
                <td colspan="3">{{customerDetail.activeTime}}</td>
                <td class="td-title">跟进人</td>
                <td>{{customerDetail.followerName}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="客户相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="theme">联系人(2)</com-button>
              <com-button buttonType="grey">销售需求(2)</com-button>
              <com-button buttonType="grey">销售订单(2)</com-button>
            </div>

            <p class="table-title">
              联系人(2)
              <a class="more">更多》</a>
              <a class="table-add"><i class="el-icon-plus"></i>新增联系人</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>

            <p class="table-title">
              销售机会(2)
              <a class="more">更多》</a>
              <a class="table-add"><i class="el-icon-plus"></i>新增销售需求</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>

            <p class="table-title">
              销售订单(2)
              <a class="more">更多》</a>
              <a class="table-add"><i class="el-icon-plus"></i>新增销售订单</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <div class="team-title">
          <span class="title-text">团队成员</span>
        </div>
        <ul class="team-member">
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{customerDetail.team.creatorName}}</h4>
              <p>{{customerDetail.team.mobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
              <!--<span class="post-tag-2">销售员</span>-->
            </div>
          </li>
          <li class="team-member-item" :key="item.salerId" v-for="item in customerDetail.team.salerList">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{item.salerName}}</h4>
              <p>{{item.mobilePhone}}</p>
            </div>
            <div class="post">
              <!--<span class="post-tag-1">创建人</span>-->
              <span class="post-tag-2">销售员</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- -->
    <!-- -->
    <!--编辑弹窗-->
    <add-dialog type="edit" :customerDetail="customerDetail" :addDialogOpen="addDialogOpen"
                @hasAddDialogOpen="addDialogOpen = false"></add-dialog>
    <!-- -->
    <!-- -->
    <!--转移客户弹窗-->
    <move-dialog :moveDialogOpen="moveDialogOpen" @hasMoveDialogOpen="moveDialogOpen = false"></move-dialog>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from './addDialog'
  import moveDialog from './moveDialog'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        addDialogOpen: false, // 新增弹窗
        moveDialogOpen: false, // 转移弹窗
        tapOption: '',
        activeViewName: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'customerSourceType',
        'customerState',
      ]),
      ...mapState('customer', [
        'customerDetail',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
      addDialog,
      moveDialog,
    },
    methods: {
      ...mapActions('customer', [
        'ac_customerDetail',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({name: 'customersDetail', query: {view: tab.name, customerId: this.$route.query.customerId}})
      },
      getCustomerDetail () {
        this.dataLoading = true
        API.customerDetail({id: this.$route.query.customerId}, (data) => {
          this.ac_customerDetail(data.data)
          this.dataLoading = false
        }, (mock) => {
          this.ac_customerDetail(mock.data)
          this.dataLoading = false
        })
      },
      operateOptions (option) {
        switch (option) {
          case 'edit':
            this.addDialogOpen = true
            break
          case 'back':
            this.$confirm('确定退回公海池, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'move':
            this.moveDialogOpen = true
            break
        }
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getCustomerDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
