<template>
  <div class="page-header" v-bind:class="{'font-end-bg': themeIndex === 0, 'manage-bg': themeIndex === 1}">
    <div class="left">众智联邦平台资源管理系统（<span @click='goVersionRecordPage' class='version-record'>{{version || 'ERP'}}</span>）</div>
    <div class="right">
      <ul>
        <li class="item cursor" @click="logout">
          <i class="iconfont icon-zhuxiao"></i>
          <a>注销</a>
        </li>
        <li class="item cursor" @click="messageHandle" v-if="themeIndex === 0">
          <el-badge :is-dot="messageTotal > 0" class="badge">
            <i class="iconfont icon-iconfontunie62c"></i>
          </el-badge>
          消息通知<span v-if="messageTotal > 0">({{messageTotal}})</span>
        </li>
        <!--<li class="item cursor" @click="todoItemList" v-if="themeIndex === 0 && listPermissions(menus, 'approval')">-->
        <li class="item cursor" @click="todoItemList" v-if="themeIndex === 0">
          <el-badge :is-dot="todoItemTotal > 0" class="badge">
            <i class="iconfont icon-tixing"></i>
          </el-badge>
          待办事项<span v-if="todoItemTotal > 0">({{todoItemTotal}})</span>
        </li>
        <li class="item item-hello">您好，{{userInfo.name}}!</li>
      </ul>
    </div>
		
		<el-dialog
		:title="message.type == 1 ? '消息提醒': '版本更新'"
		:visible.sync="dialogVisible"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		width="40%">
			<div>
				<p class='message-title'>
					<span class='message-title-name'>{{message.title}}</span>
					<span class='message-title-time'>({{message.created && $moment(message.created).format('YYYY-MM-DD HH:mm')}})</span>
				</p>
				<p class='message-content'>{{message.content}}</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click='readFinsh(message)'>阅读完成</el-button>
			</span>
		</el-dialog>
	
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import utils from '../utils/utils'
  import API from '../utils/api'
  // import webStorage from 'webStorage'

  export default {
    name: 'pageHeader',
    data () {
      return {
        userInfo: '',
        menus: '',
				dialogVisible: false,
				version: 'ERP',     //版本名称
				message: {},        //消息
      }
    },
    computed: {
      ...mapState('constData', [
        'theme',
        'themeIndex',
      ]),
      ...mapState('todoItem', [
        'todoItemTotal',
      ]),
      ...mapState('message', [
        'messageTotal',
      ]),
    },
    methods: {
      ...mapActions('todoItem', [
        'ac_todoItemTotal',
      ]),
      ...mapActions('message', [
        'ac_messageTotal',
      ]),
      logout () {
        API.login.logout({}, (res) => {
          this.loading = false
          if (res.status) {
            sessionStorage.removeItem('HASLG')
            localStorage.setItem('getSessionStorageLogout', Date.now()) // 触发其他标签修改sessionStorage
            this.$router.push({'path': '/'})
          }
        }, (mock) => {
          this.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      messageHandle () {
        this.$router.push({name: 'messageList', params: {end: this.themeIndex === 0 ? 'FE' : 'ME'}})
      },
      todoItemList () {
        this.$router.push({name: 'todoItemList', params: {end: this.themeIndex === 0 ? 'FE' : 'ME'}})
      },
      listPermissions (m, id) { // menus权限判断，return true和false
        let mus = m || []
        return mus.some(item => {
          return item.id === id || this.listPermissions(item.children, id)
        })
      },
      getTodoItemTotal () { // 代办事项
        API.todoItem.total({}, da => {
          if (da.status) {
            sessionStorage.setItem('HASLG', 'T') // 防止直接复制地址，跳过登录页面得判断
            this.ac_todoItemTotal(da.data)
          }
        })
      },
      getMessageTotal () { // 消息
        API.message.unreadCnt({}, da => {
          if (da.status) {
            this.ac_messageTotal(da.data)
          }
        })
      },
      shareSessionStorage () { // 多标签共享sessionStorage, 刷新
        if (!sessionStorage.length) {
          // 这个调用能触发目标事件，从而达到共享数据的目的
          localStorage.setItem('getSessionStorage', Date.now())
        }
        // 该事件是核心
        window.addEventListener('storage', function (event) {
          if (event.key === 'getSessionStorage') {
            // 已存在的标签页会收到这个事件
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
            localStorage.removeItem('sessionStorage')
          } else if (event.key === 'sessionStorage') {
            // 新开启的标签页会收到这个事件
            if (!sessionStorage.length) {
              let data = JSON.parse(event.newValue)
              for (let key in data) {
                sessionStorage.setItem(key, data[key])
              }
            }
          } else if (event.key === 'getSessionStorageLogout') { // 旧标签页，退出登录旧标签页修改为未登录状态
            sessionStorage.removeItem('HASLG')
          }
        })
      },
			// 获取版本消息
			getVersionRecord () {
				let _params = {
					mandatory: 1,        //是否强制阅读
					readStatus: 0,       //是否阅读
					pageSize: 1000,      //条数
				};
				API.message.personalMessage(_params, (data) => {
					if(data.status) {
						this.version = data.other;
						if(data.data.content != null) {
							if(data.data.content.length > 0) {
								let _list = data.data.content;
								this.message = _list[0];
								this.dialogVisible = true;
							}else {
								this.dialogVisible = false;
							}
						}else {
							this.dialogVisible = false;
						}
					}
				})
			},
			// 阅读完成
			readFinsh (item) {
				let _id = item.id;
				API.message.msgRead({ids: _id}, (data) => {
					console.log(data)
					if(data.status && data.data == 1) {
						this.dialogVisible = false;
						this.getVersionRecord();
					}else {
						this.dialogVisible = false;
					}
				})
			},
			// 进入版本记录页面
			goVersionRecordPage () {
				this.$router.push('versionRecord')
			},
    },
    created () {
      this.shareSessionStorage()
      this.userInfo = utils.loginExamine(this)
      this.menus = this.userInfo.menus
      this.getTodoItemTotal()
      this.getMessageTotal();
			this.getVersionRecord();
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../static/iconFont/iconfont.css";
  @import "../styles/var";
	
	.version-record {
		cursor: pointer;
	}
	.message-title {
		line-height: 30px;
		.message-title-name {
			font-size: 15px;
			color: #000;
			margin-right: 5px;
		}
		.message-title-time {
			font-size: 13px;
			color: #aaa;
		}
	}
	.message-content {
		font-size: 13px;
		color: #aaa;
		line-height: 25px;
		text-indent: 25px;
	}
  .page-header {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.font-end-bg {
      background-color: #4bcf99;
      .left {
        color: #e4e7ed;
      }
      .right {
        color: #e4e7ed;
      }
    }
    &.manage-bg {
      background-color: #0BC3C4;
      color: #fff;
    }
    .left {
      font-size: 18px;
      margin-left: 20px;
      font-weight: 600;
    }
    .right {
      margin-right: 20px;
      .item {
        float: right;
        margin: 0 0 0 20px;
        .badge {
          margin-right: 2px;
        }
        &.item-hello {
          margin-right: 30px;
        }
        &.cursor {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
