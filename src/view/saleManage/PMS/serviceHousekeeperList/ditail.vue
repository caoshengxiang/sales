<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>{{managerDetail.name}}
            <span class="com-d-tap-2"><span  v-for="(item, index) in managerDetail.serviceManagerTypeModels" :key="index">
                <span v-if="index > 0">/</span>{{item.managerType}}
              </span>
          </span>
          </h3>
          <p>
            <span class="com-d-item">服务地区: <span v-for="(item, index) in managerDetail.serviceManagerAreaModels" :key="index">
                <span v-if="index > 0">、</span>{{item.provinceName + item.cityName + item.areaName}}
              </span></span>
            <span class="com-d-item">联系电话: <span>{{managerDetail.mobilePhone}}</span></span>
            <span class="com-d-item">服务类目: <span v-for="(item, index) in managerDetail.serviceManagerGoodsModels" :key="index">
                <span v-if="index > 0">、</span>{{item.goodsName}}
              </span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="editHandle">编辑</li>
        </ul>
      </div>
      <div class="bar-tips-box">
        <p class="modify"> 提示：2018年07.24日进行了服务管家基本信息修改<a class="com-a-link" @click="historyHandle">点击可查看</a></p>
        <p class="review"> 提示：修改资料已被拒绝，拒绝原因为：薪资资料与资质资料不统一。</p>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <!--<p class="table-title"></p>-->
        <table class="detail-table">
          <tr>
            <td class="td-title">平台用户</td>
            <td>{{managerDetail.accountNumber}}</td>
            <td class="td-title">联系姓名</td>
            <td>{{managerDetail.name}}</td>
            <td class="td-title">联系电话</td>
            <td>{{managerDetail.mobilePhone}}</td>
          </tr>
          <tr>
            <td class="td-title">名族</td>
            <td>{{managerDetail.nation}}</td>
            <td class="td-title">性别</td>
            <td>{{managerDetail.sex}}</td>
            <td class="td-title">出生日期</td>
            <td>{{managerDetail.birthday}}</td>
          </tr>
          <tr>
            <td class="td-title">居民身份证</td>
            <td colspan="5">
              <span>{{managerDetail.idCard}}</span>
              <photo-view :photo-data="{
                text: '身份证查看大图',
                images: [
                  {url: managerDetail.identityCardPhoto, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">工作单位</td>
            <td>{{managerDetail.organizationName}}</td>
            <td class="td-title">工作部门</td>
            <td>{{managerDetail.departmentName}}</td>
            <td class="td-title">工作职责</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">职称</td>
            <td>todo</td>
            <td class="td-title">从年年限</td>
            <td>todo</td>
            <td class="td-title"></td>
            <td></td>
          </tr>
          <tr>
            <td class="td-title">名族</td>
            <td>todo</td>
            <td class="td-title">性别</td>
            <td>todo</td>
            <td class="td-title">出生日期</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">最高学历</td>
            <td>todo</td>
            <td class="td-title">毕业院校</td>
            <td>todo</td>
            <td class="td-title">专业</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">专业资质证书</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">职称证明</td>
            <td>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
            <td class="td-title">学历证明</td>
            <td>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
            <td class="td-title">资质证明</td>
            <td>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">现从事专业及研究方向</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">社会重要职务</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">个人简介</td>
            <td colspan="5">todo</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import photoView from '../../../../components/photo/photoView'
  import historyDialog from './historyDialog'
  import editDialog from './editDialog'
  import API2 from '../../../../utils/api2'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        enterState: [
          {value: '申请认证'},
          {value: '认证审核'},
          {value: '管家面签'},
          {value: '缴纳保证金'},
          {value: '保证金审核'},
          {value: '入驻成功'},
        ],
        photoData: {},
        managerDetail: {},
      }
    },
    components: {
      photoView,
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
      historyHandle () {
        this.$vDialog.modal(historyDialog, {
          title: '查看管家信息',
          width: 1100,
          height: 600,
          params: {
          },
          callback (data) {
            if (data.type === 'save') {
            }
          },
        })
      },
      editHandle () {
        this.$vDialog.modal(editDialog, {
          title: '编辑管家信息',
          width: 1100,
          height: 600,
          params: {
          },
          callback (data) {
            if (data.type === 'save') {
            }
          },
        })
      },
      getDetail () {
        this.dataLoading = true
        API2.serviceManager.detail(this.$route.query.id, (da) => {
          this.managerDetail = da.data
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      }
    },
    created () {
      this.getDetail()
      setTimeout(() => {
        this.photoData = {
          text: '身份证.jpg 查看大图',
          images: [
            {url: '../../../../../static/images/wave-bot.png', previewText: '描述文字1'},
            {url: '../../../../../static/images/wave-bot-2.png', previewText: '描述文字2'},
          ]
        }
      }, 5000)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .bar-tips-box {
    margin-top: 30px;
    .modify {
      color: #333E48;
      background-color: #FCFCFC;
      border: 1px solid #DDDDDD;
      padding: 5px;
      font-size: 12px;
    }
    .review {
      color: #FF7700;
      background-color: #FFFCF6;
      border: 1px solid #F0D3B9;
      margin-top: 10px;
      padding: 5px;
      font-size: 12px;
    }
  }
  .com-d-tap-2 {
    color: #1E88E5;
    padding: 5px 10px;
    background-color: #E5F3FE;
    border-radius: 10px;
    border: 0px;
    font-size: 12px;
    position: relative;
    top: -2px;
  }
</style>
