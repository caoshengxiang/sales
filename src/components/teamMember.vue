<!-- 团队成员的通用页面 -->
<template>
    <div>
      <div class="team-title">
        <span class="title-text">团队成员</span>
      </div>
      <ul class="team-member">
        <li class="team-member-item">
          <div class="head">
            <img src="../assets/icon/headDefault.png" alt="">
          </div>
          <div class="text">
            <h4>{{detail.team.creatorName}}</h4>
            <p>{{detail.team.mobilePhone}}</p>
          </div>
          <div class="post">
            <span class="post-tag-1">创建人</span>
          </div>
        </li>
        <li class="team-member-item" :key="item.salerId" v-for="item in detail.team.salerList">
          <div class="head">
            <img src="../assets/icon/headDefault.png" alt="">
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
</template>

<script>
  export default {
    name: 'teamMember',
    props: {
      detail: {
        default () {
          return {}
        },
        type: Object,
      }
    },
    data () {
      return {}
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../styles/common";
</style>
