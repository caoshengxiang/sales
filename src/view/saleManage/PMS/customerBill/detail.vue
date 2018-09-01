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
      </div>
      <div class="com-info-right">
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <table class="detail-table">
          <tr>
            <td class="td-title">业务编号</td>
            <td></td>
            <td class="td-title">上传人</td>
            <td></td>
            <td class="td-title">企业名称</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td class="td-title">账期</td>
            <td></td>
            <td class="td-title">业务类型</td>
            <td></td>
            <td class="td-title">业务金额</td>
            <td></td>
            <td class="td-title">上传时间</td>
            <td></td>
          </tr>
        </table>

        <!--图片，排序-->
        <div class="imgs-box">
            <div class="imgs-box-item" v-for="(bill, index) in bills" :key="index"
                 v-dragging="{ item: bill, list: bills, group: 'customerBill' }">
              <photo-view :photo-data="{
                text: '',
                images: [
                  {url: bill.image, previewText: bill.text},
                ]}">
                <img :src="bill.image" alt="">
              </photo-view>
              <p>{{bill.text}}</p>
            </div>
        </div>
        <!--操纵-->
        <div style="background-color: #F9FCFB; padding: 10px 30px;">
          <b>操作</b>
          <span class="op-btn">审核通过</span>
          <span class="op-btn">审核拒绝</span>
          <span class="op-tips">已拒绝审核通过：因为资料不清晰  2018.07.28  02:12</span>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>服务日志</span>
          </div>
          <div class="text item">
            2018.07.28 12:01 用户张珊（15672523334）操作录入票据单号45644564564；<br>
            2018.07.28 13:07 服务管家超期未审核票据；<br>
            2018.07.28 14:29 服务管家操作审核票据不通过，理由：票据资料显示不清晰；<br>
            2018.07.28 12:01 用户张珊（15672523334）操作录入票据单号45644564564；<br>
            2018.07.28 13:07 服务管家超期未审核票据；<br>
            2018.07.28 14:29 服务管家操作审核票据不通过，理由：票据资料显示不清晰
          </div>
        </el-card>
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
        bills: [
          {
            image: '../../../../../static/images/wave-bot-2.png',
            text: '图片描述1',
            id: 1,
          },
          {
            image: '../../../../../static/images/wave-bot.png',
            text: '图片描述2',
            id: 2,
          },
          {
            image: '../../../../../static/images/wave-mid.png',
            text: '图片描述3',
            id: 3,
          }, {
            image: '../../../../../static/images/wave-mid-2.png',
            text: '图片描述4',
            id: 4,
          },
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
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .op-btn {
    color: #4BCF99;
    border: 1px solid #4BCF99;
    padding: 3px 10px;
    cursor: pointer;
    margin-left: 20px;
    font-size: 12px;
    &:hover {
      color: #fff;
      background-color: #39c189;
    }
  }
  .op-tips {
    color: #FF7700;
    margin-left: 30px;
  }
  .imgs-box{
    padding: 0 0 40px 0;
    display: flex;
    flex-wrap: wrap;
    .imgs-box-item {
      margin-right: 50px;
      margin-top: 50px;
      img {
        width: 240px;
        height: 135px;
      }
      p {
        text-align: center;
        color: #4F5F6F;
      }
    }
  }
  .box-card {
    margin-top: 50px;
    margin-bottom: 50px;
    .text {
      color: #728395;
    }
  }
</style>
