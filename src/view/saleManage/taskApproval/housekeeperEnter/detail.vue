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
          <h3>todo <span class="com-d-tap">平台直属/平台控股子公司</span></h3>
          <p>
            <span class="com-d-item">服务地区: <span> todo</span></span>
            <span class="com-d-item">联系电话: <span>todo</span></span>
            <span class="com-d-item">服务类目: <span>todo、todo</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="operateOptions('delete')">删除认证</li>
          <li @click="operateOptions('delete')">缴纳保证金</li>
          <li @click="operateOptions('delete')">管家面签</li>
          <li @click="operateOptions('delete')">认证审核</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step">
          <el-steps :active="1" align-center>
            <el-step @click.native="stepClickHandle(item)" v-for="(item, index) in enterState" :key="index"
                     :title="item.value" v-if="index !== 0"></el-step>
          </el-steps>
        </div>
      </div>

    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <p class="table-title">管家基本信息</p>
        <table class="detail-table">
          <tr>
            <td class="td-title">平台用户名</td>
            <td>todo</td>
            <td class="td-title">联系姓名</td>
            <td>todo</td>
            <td class="td-title">联系电话</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">民族</td>
            <td>todo</td>
            <td class="td-title">性别</td>
            <td>todo</td>
            <td class="td-title">出生日期</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">居民身份证</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">工作单位</td>
            <td>todo</td>
            <td class="td-title">工作部门</td>
            <td>todo</td>
            <td class="td-title">工作职责</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">职称</td>
            <td>todo</td>
            <td class="td-title">从年？？？？年限</td>
            <td>todo</td>
            <td class="td-title"></td>
            <td></td>
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
            <td>todo</td>
            <td class="td-title">学历证明</td>
            <td>todo</td>
            <td class="td-title">资质证明</td>
            <td>todo</td>
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
        <div class="bar-tips-box">
          <p class="review"> 资料审核不通过：因为资料不清除 2018.02.02 12:12</p>
        </div>

        <p class="table-title">管家面签信息</p>
        <table class="detail-table">
          <tr>
            <td class="td-title">面签形象照</td>
            <td colspan="5">
              <photo-view :photo-data="{
                text: '点击查看大图',
                images: [
                  {url: '../../../../../static/images/wave-bot.png', previewText: '描述文字1'},
                  {url: '../../../../../static/images/wave-bot-2.png', previewText: '描述文字2'},
                ]}"></photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">面签评价</td>
            <td colspan="5">todo</td>
          </tr>
        </table>
        <div class="bar-tips-box">
          <p class="review"> 面签通过：2018.02.02 12:12</p>
        </div>

        <p class="table-title">保证金缴纳信息</p>
        <table class="detail-table">
          <tr>
            <td class="td-title">保证金定缴额</td>
            <td>todo</td>
            <td class="td-title">纳税状态</td>
            <td>todo</td>
            <td class="td-title">审核状态</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">缴纳凭证</td>
            <td colspan="5">
              <div>
                <photo-view :photo-data="{
                text: '点击查看大图',
                images: [
                  {url: '../../../../../static/images/wave-bot.png', previewText: '描述文字1'},
                  {url: '../../../../../static/images/wave-bot-2.png', previewText: '描述文字2'},
                ]}"></photo-view>
              </div>
              <div>
                <photo-view :photo-data="{
                text: '点击查看大图',
                images: [
                  {url: '../../../../../static/images/wave-bot.png', previewText: '描述文字1'},
                  {url: '../../../../../static/images/wave-bot-2.png', previewText: '描述文字2'},
                ]}"></photo-view>
              </div>
            </td>
          </tr>
        </table>
        <div class="bar-tips-box">
          <p class="review"> 保证金缴纳审核通过：2018.02.02 12:12</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import photoView from '../../../../components/photo/photoView'
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
        ]
      }
    },
    components: {
      photoView,
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .bar-tips-box {
    margin-top: 20px;
    margin-bottom: 20px;
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
</style>
