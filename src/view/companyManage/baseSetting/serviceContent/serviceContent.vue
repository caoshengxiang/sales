<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>服务内容配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="grey" icon="el-icon-remove-outline" @click="configHandle">配置</com-button>
      </div>
      <div class="com-bar-right">
        <el-input style="width: 160px;" type="text" placeholder="请输入商品名称" v-model="searchGoodsName"></el-input>
        <com-button buttonType="search" @click="getOrganizationList">搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-row :gutter="2">
        <el-col :span="6">
          <div class="role-head-con">商品名称</div>
          <el-menu
            :default-active="roleDefaultIndex"
            @select="selectGood">
            <el-menu-item
              v-for="item in produceList"
              :key="item.goodsId"
              :index="item.goodsId.toString()">
              <span slot="title">{{item.goodsName}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <div class="role-head-con">
            描述：<span style="padding-right: 10px;">{{desGoodName}}</span>
          </div>
          <div style="margin: 14px 5px;">
            <a class="com-a-link" @click="showServiceItem">查看商品服务事项</a>
          </div>
          <div class="role-view-con">
            <el-table
              ref="multipleTable"
              border
              :data="serviceItemConfigList"
              tooltip-effect="dark"
              style="width: 100%"
             >
              <el-table-column
                fixed
                type="selection"
                align="center"
                reserve-selection=""
                width="40">
              </el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                label="服务内容"
                prop="serviceType"
              >
                <template slot-scope="scope">
                  <span v-for="item in serviceType"
                        :key="item.type"
                        v-if="item.type === scope.row.serviceType">
                    {{item.value}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                label="管家类型"
                prop="managerTypeName"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!--分页-->
      <div class="com-pages-box">
        <el-pagination
          background
          :total="produceListTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :layout="pagesOptions.layout"
          :page-sizes="pagesOptions.pageSizes"
          :page-size="pagesOptions.pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  // import { Message } from 'element-ui'
  import { mapState } from 'vuex'
  import configDialog from './configDialog'
  import serviceItemShow from './serviceItemShow'

  export default {
    name: 'serviceContent',
    data () {
      return {
        dataLoading: false,
        currentPage: 1, // 当前页
        roleDefaultIndex: '', // 选择的商品id
        desGoodName: '', // 选择的商品名称
        produceList: [], // 服务商品
        produceListTotal: 0,
        serviceItemConfigList: [],
        serviceContent: [],
        searchGoodsName: null, // 搜索
      }
    },
    computed: {
      ...mapState('constData', [
        'userTypeOptions',
        'pagesOptions',
        'serviceType',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
      getOrganizationList () { // 商品列表
        var that = this
        let params = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          goodsName: this.searchGoodsName,
        }
        this.dataLoading = true
        API.baseSetting.getProductType(params, (res) => {
          that.produceList = res.data.content
          that.produceListTotal = res.data.totalElements
          // alert(typeof that.produceList[0].goodsId.toString())
          this.serviceItemConfigList = [] // 清除表格数据
          this.serviceContent = []
          if (that.produceList[0]) {
            this.selectGood(that.produceList[0].goodsId) // 初始第一个商品
          }
          this.dataLoading = false
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getOrganizationList()
      },
      selectGood (index) {
        this.desGoodName = this.produceList.find((n) => n.goodsId === parseInt(index)).goodsName
        this.roleDefaultIndex = index.toString()
        this.getCodeConfig(index)
      },
      getCodeConfig (id) {
        API.common.serviceContentConfigDetail({goodId: id}, (da) => {
          if (da.data) {
            this.serviceItemConfigList = da.data.serviceContentModelModels
            this.serviceContent = JSON.parse(da.data.serviceContent)
          } else {
            this.serviceItemConfigList = []
            this.serviceContent = []
          }
        }, () => {
          // this.serviceItemConfigList = []
        })
      },
      configHandle () {
        this.$vDialog.modal(configDialog, {
          title: '服务内容配置',
          width: 700,
          height: 660,
          params: {
            goodsId: this.roleDefaultIndex,
            goodsName: this.desGoodName,
            serviceType: this.serviceType,
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.selectGood(this.roleDefaultIndex) // 重获详细
            }
          },
        })
      },
      showServiceItem () {
        this.$vDialog.modal(serviceItemShow, {
          title: '商品服务事项浏览',
          width: 700,
          height: 860,
          params: {
            goodsId: this.roleDefaultIndex,
            goodsName: this.desGoodName,
            serviceType: this.serviceType, // 七种服务类型
            serviceContent: this.serviceContent
          },
          callback: (data) => {
            if (data.type === 'configItem') {
              // console.log(data.serviceContent)
              // this.serviceContent = data.serviceContent
            }
          },
        })
      },
    },
    created () {
      this.getOrganizationList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .role-head-con {
    background-color: #E9F3F5;
    padding: 0 15px;
    line-height: 42px;
    color: #426585;
    font-size: 12px;
  }

  .role-view-con {
    padding: 0 15px;
  }

  .el-menu-item {
    $select_bg: #F4F6F8;
    &:hover {
      background-color: #fbfbfb;
    }
    &:focus {
      background-color: $select_bg;
    }
    &.is-active {
      font-weight: 600;
      color: #426585;
      background-color: $select_bg;
    }
  }
</style>
