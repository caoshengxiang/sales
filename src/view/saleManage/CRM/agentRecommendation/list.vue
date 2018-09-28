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
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <!--<com-button buttonType="add" icon="el-icon-plus" @click="addHandle"></com-button>-->
      </div>
      <div class="com-bar-right">
        <el-select @change="agentTypeChange" v-model="agentType" placeholder="请选择" class="com-el-select"
                   style="width: 150px">
          <el-option label="组织" :value="3" v-if="agentTypeData === 3"></el-option>
          <el-option label="部门" :value="2" v-if="agentTypeData >= 2"></el-option>
          <el-option label="个人" :value="1"></el-option>
        </el-select>
        <el-select @change="agentTypeOptionChange" v-model="agentTypeOption" placeholder="请选择" class="com-el-select"
                   style="width: 150px">
          <el-option
            v-for="item in agentTypeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
        <!--<com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <div class="agent-rec">
        <div class="code-rec">
          <div class="code-rec-1">
            <div ref="downloadCode">
              <p class="title">推荐代理商扫码加入平台</p>
              <div class="code-show">
                <vue-qr
                  :logoSrc="config.logo"
                  :text="config.value"
                  :size="200"
                  :margin="0"
                  :callback="agentRecCallback"
                  qid="agentRec"></vue-qr>
              </div>
              <p class="name">{{otherData.directName}}</p>
            </div>
            <p class="down-code">
              <!--<a v-if="codeImgBase64" :href="codeImgBase64" download="二维码">下载二维码</a>-->
              <a v-if="codeImgBase64" @click="downloadCodeHandle">下载二维码</a>
            </p>
          </div>
          <div class="code-rec-2">
            <p class="com-title">培育已累计获取佣金</p>
            <table style="width: 100%">
              <tr class="detail-table">
                <td class="td-title">直接培育人</td>
                <td style="text-align: center">￥{{otherData.directMoney || '0.00'}}</td>
              </tr>
              <tr class="detail-table">
                <td class="td-title">间接培育人</td>
                <td style="text-align: center">￥{{otherData.indirectMoney || '0.00'}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="rec-table">
          <p class="com-title">推荐人员信息（{{tableDataTotal}}）</p>
          <el-table
            ref="multipleTable"
            border
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="name"
              label="用户昵称"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="用户账号"
              prop="account"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="created"
              label="加入时间"
            >
              <template slot-scope="scope">
                {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="tableDataTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState } from 'vuex'
  import VueQr from 'vue-qr'
  import html2canvas from 'html2canvas'
  // import { underscoreName } from '../../../../utils/utils'
  import { agentRegister } from '../../../../utils/const'
  import QS from 'qs'
  import webStorage from 'webStorage'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        agentType: 3,
        agentTypeData: null, // 接口返回
        agentTypeOption: null,
        agentTypeOptions: [],
        currentPage: 1,
        tableData: [],
        tableDataTotal: 0,
        otherData: {},
        config: {
          value: '', // 显示的值、跳转的地址(要加http)
          logo: 'static/favicon.ico', // 中间logo的地址
        },
        codeImgBase64: '',
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          size: null,
          type: null,
          id: null,
        },
        userInfo: webStorage.getItem('userInfo'),
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'themeIndex',
      ]),
    },
    components: {
      comButton,
      VueQr,
    },
    methods: {
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.getList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getList()
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          size: this.pagesOptions.pageSize,
          type: this.agentType,
          id: this.agentTypeOption,
        }
      },
      getList () {
        this.dataLoading = true
        this.getQueryParams()
        API.agentDev.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          this.otherData = data.other
          this.config.value = agentRegister + QS.stringify({ // 拼装二维码参数
            type: this.agentType,
            id: this.agentTypeOption,
            name: this.otherData.directName,
            phone: '',
          })
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        }, (err) => {
          console.error(err)
        })
      },
      getDepts (type, callback) {
        API.agentDev.depts({type: type}, (da) => {
          this.agentTypeOptions = da.data
          callback && callback(da.data[0].id)
        })
      },
      getDeptsType (callback) {
        API.agentDev.type(null, (da) => {
          this.agentTypeData = da.data
          this.agentType = da.data
          callback && callback()
        })
      },
      searchHandle () {
        this.getList()
      },
      agentTypeChange (va) {
        this.getDepts(va, (id) => {
          this.agentTypeOption = id
        })
      },
      agentTypeOptionChange (va) {
        this.agentTypeOption = va
        // this.getList()
      },
      agentRecCallback (codeImgBase64) {
        this.codeImgBase64 = codeImgBase64
      },
      downloadCodeHandle () {
        html2canvas(this.$refs.downloadCode).then(canvas => {
          // document.body.appendChild(canvas)
          var a = document.createElement('a')
          a.href = canvas.toDataURL('image/png') // 将画布内的信息导出为png图片数据
          a.download = '二维码' // 设定下载名称
          a.click() // 点击触发下载
        })
      },
    },
    beforeCreate () {
    },
    created () {
      this.getDeptsType(() => {
        this.getDepts(this.agentType, (id) => {
          this.agentTypeOption = id
          this.getList()
        })
      })
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .agent-rec {
    display: flex;
    .code-rec {
      width: 400px;
      padding: 10px;
      padding-right: 20px;
      border-right: 6px solid #F0F3F6;
      .code-rec-1 {
        text-align: center;
        margin: 0 auto 50px auto;
        width: 300px;
      }
      .title {

      }
      .code-show {
        min-height: 200px;
        margin: 20px;
      }
      .name {
        font-weight: bold;
      }
      .down-code {
        margin: 30px 0;
        a {
          padding: 10px 40px;
          border-radius: 3px;
          color: #fff;
          background-color: #00a7fe;
          cursor: pointer;
          text-decoration: none;
        }
      }
    }
    .rec-table {
      flex: 1;
      padding: 0 20px;
    }
  }
</style>
