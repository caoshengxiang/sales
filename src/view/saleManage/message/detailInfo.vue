<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box message-detail">
      <h3 class="title">服务商管理系统2018.03.06停机维护通知</h3>
      <div class="bar"><span class="span">系统消息</span><span
        class="span">{{$moment().format('YYYY-MM-DD HH:mm:ss')}}</span> <a class="del">删除消息</a></div>
      <div class="con">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
        sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
        tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales
        pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
        fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
        accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis
        orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
        bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
        tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
        nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
        et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed
        rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
        laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
        luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailInfo',
    data () {
      return {}
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .message-detail {
    margin-top: 50px;
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
    .bar {
      margin-bottom: 10px;
      .span {
        margin-right: 20px;
      }
      .del {
        float: right;
        color: blue;
        cursor: pointer;
        text-decoration: underline;
      }
      .con {
        padding: 10px 0;
      }
    }
  }
</style>
