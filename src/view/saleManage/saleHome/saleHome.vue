<template>
  <div class="sale-home">
    <div class="welcome">欢迎进入服务商管理系统！</div>
    <div class="latest-announcement">
      <p class="com-title">最新公告</p>
      <p class="announcement-con" v-if="announcement">{{announcement.content}}</p>
      <p style="padding-left: 10px;color: #ccc;"  v-else>暂无公告内容</p>
    </div>
    <div class="home-row">
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <funnel-chart></funnel-chart>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <bar-chart></bar-chart>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <scatter-chart></scatter-chart>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-row home-row-2">
      <el-row>
        <div class="col-box">
          <order-chart></order-chart>
        </div>
      </el-row>
    </div>
    <div class="home-row home-row-2">
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">任务审批待办列表</p>
            <ul class="list">
              <li v-for="item in TodoItemList" @click="handleTodoItemRouter(item)" :key="item.id">{{item.title}}</li>
              <li style="text-align: center;color: #333333;" v-if="!TodoItemList.length">暂无代办事项</li>
            </ul>
            <div class="link" v-if="TodoItemList.length>0">
              <router-link :to="{name: 'todoItemList'}" class="link-all">查看全部 ></router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <p class="com-title">销售机会列表</p>
            <ul class="list no-list">
              <li>全部销售机会 <span>{{chanceTotal}}</span></li>
              <li>我开发的销售机会 <span>{{chanceMy}}</span></li>
              <li>即将签单销售机会 <span>{{chanceOrder}}</span></li>
            </ul>
            <div class="link">
              <router-link :to="{name: 'salesOpportunitiesList'}" class="link-all">查看全部 ></router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">最新消息</p>
            <ul class="list">
              <li v-for="(item, index) in messageList" :key="item.id" v-if="index<3">
                <router-link :to="{name: 'messageDetail', params: {end: 'FE'}, query: {view: 'detail', id: item.id}}">{{item.title}}</router-link>
              </li>
              <li style="text-align: center;color: #333333;" v-if="!messageList.length">暂无代办事项</li>
            </ul>
            <div class="link">
              <router-link :to="{name: 'messageList'}" class="link-all">查看全部 ></router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import funnelChart from './funnelChart'
  import barChart from './barChart'
  import scatterChart from './scatterChart'
  import orderChart from './orderChart'
  import API from '../../../utils/api'
  import utils from '../../../utils/utils'

  export default {
    name: 'saleHome',
    data () {
      return {
        chanceTotal: 0,
        chanceMy: 0,
        chanceOrder: 0,
        TodoItemList: [],
        TodoItemTotal: 0,
        userInfo: {},
        messageList: [],
        announcement: null
      }
    },
    components: {
      funnelChart,
      barChart,
      scatterChart,
      orderChart,
    },
    methods: {
      getSalesOpportunititeisList () { // 获取机会
        API.salesOpportunities.list({page: 0, pageSize: 1}, (da) => {
          this.chanceTotal = da.data.totalElements
        })
        API.salesOpportunities.list({page: 0, pageSize: 1, type: 1}, (da) => {
          this.chanceMy = da.data.totalElements
        })
        API.salesOpportunities.list({page: 0, pageSize: 1, stage: 4}, (da) => {
          this.chanceOrder = da.data.totalElements
        })
      },
      getTodoItemList () { // 代办列表
        API.todoItem.list({page: 0, pageSize: 3}, (res) => {
          if (res.status) {
            this.TodoItemList = res.data.content
            this.TodoItemTotal = res.data.totalElements
          }
        })
      },
      chanceStat () { //
        API.home.chanceStat({}, da => {
          this.chanceTotal = da.data.total
          this.chanceMy = da.data.myDev
          this.chanceOrder = da.data.billing
        })
      },
      handleTodoItemRouter (row) {
        let END = this.themeIndex === 2 ? 'ME' : 'FE'
        switch (row.type) {
          case 1: // 个人资料完善，跳转到：个人资料编辑页面
            this.$router.push({name: 'personal', query: {view: 'base'}, params: {end: END}})
            break
          case 2: // 咨询师派单审批，跳转到：任务审批页面-我待办的任务审批
            this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: 'detail', id: row.targetId}})
            break
          case 3: // 咨询师更换审批，跳转到：任务审批页面-我待办的任务审批
            this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: 'detail', id: row.targetId}})
            break
          default:
        }
      },
      getMessageList () { // 获取列表数据
        API.message.personalMessage({
          page: 0,
          pageSize: 1000,
          sort: 'send_time,desc'
        }, da => {
          this.messageList = da.data.content
          // this.messageListTotal = da.data.totalElements
          for (let i = 0; i < this.messageList.length; i++) {
            if (this.messageList[i].msgType === 2) {
              this.getMesDetail(this.messageList[i].id)
              break
            }
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 300)
        }, () => {
        })
      },
      getMesDetail (id) { // 消息详细，公告
        API.message.msgDetail(id, da => {
          this.announcement = da.data
        })
      },
    },
    created () {
      this.chanceStat()
      this.userInfo = utils.loginExamine(this)
      this.getTodoItemList()
      this.getMessageList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../styles/sprites.css";

  .com-title:after {
    width: calc(100% + 16px);
  }
  .welcome {
    font-size: 22px;
    color: $color-1-active;
    margin-left: $page-base-padding;
    margin-top: $page-base-padding;
  }

  .latest-announcement {
    border-bottom: 6px solid $part-color;
    padding: $page-base-padding;
    .announcement-con {
      color: #4F5F6F;
    }
  }

  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      border-bottom: 6px solid $part-color;
      .col-box {
        height: 320px;
      }
    }
    .lr-part {
      border-left: 6px solid $part-color;
      border-right: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      height: 362px;
    }
  }

  .list {
    li {
      color: #333333;
      padding: 20px 20px 20px 10px;
      border-bottom: 1px dashed #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        float: right;
      }
      a {
        color: #333333;
      }
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .no-list {
    li{
      &:hover {
        text-decoration: none;
        cursor: default;
      }
    }
  }

  .link {
    padding: 20px;
    text-align: center;
    .link-all {
      color: $color-1-active;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
</style>
