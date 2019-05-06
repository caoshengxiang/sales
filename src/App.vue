<template>
  <div id="app" v-cloak>
    <router-view/>
<!-- 		<el-dialog
			title="风险提示"
			:visible.sync="dialogVisible"
			:append-to-body="true"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:show-close="false"
			width="650px">
			<div>有风险</div>
			<span slot="footer" class="dialog-footer">
				<span class='continueBrowsingZX' @click="dialogVisible = false">继续浏览>>></span>
			</span>
		</el-dialog> -->
		<div class='browser-model-all' v-show="dialogVisible">
			<div class='browser-model-box'>
				<p class='browser-model-text-tips top20'>为了更好的ERP使用体验</p>
				<p class='browser-model-text-tips'>请下载谷歌浏览器</p>
				<p class='browser-model-arrow'>
					<img src="./assets/icon/sjx.png" alt="">
				</p>
				<div class='browser-model-down-box' @click="goDownGoogle">
					<p class='browser-model-down-box-icon'>
						<img src="./assets/icon/google.png" alt="">
					</p>
					<p class='browser-model-down-box-btn'>立即下载</p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	
	import API from './utils/api'
	
export default {
  name: 'App',
	data () {
		return {
			dialogVisible: false,
		}
	},
	created () {
		console.log(this.getExplorer())
		let explorerName = this.getExplorer();
		if(explorerName != 'Chrome' && explorerName != 'Firefox') {
			this.dialogVisible = true;
			this.logout();
		}
	},
	methods: {
		// 判断浏览器内核
		getExplorer () {
      let explorer = window.navigator.userAgent,
         compare = function (s) { return (explorer.indexOf(s) >= 0); },
          ie11 = (function () { return ("ActiveXObject" in window) })();
      if (compare("MSIE") || ie11) { return 'ie'; }
      else if (compare("Firefox") && !ie11) { return 'Firefox'; }
      else if (compare("Chrome") && !ie11) {
          if (explorer.indexOf("Edge") > -1) {
              return 'Edge';
         } else {
             return 'Chrome';
         }
     }
     else if (compare("Opera") && !ie11) { return 'Opera'; }
     else if (compare("Safari") && !ie11) { return 'Safari'; }
		},
		// 去下载谷歌浏览器
		goDownGoogle () {
			this.dialogVisible = false;
			location.href = 'https://www.google.cn/intl/zh-CN/chrome/';
		},
		logout () {
			API.login.logout({}, (res) => {
				this.loading = false
				if (res.status) {
					sessionStorage.removeItem('HASLG')
					localStorage.setItem('getSessionStorageLogout', Date.now()) // 触发其他标签修改sessionStorage
					localStorage.removeItem('IDENTIFICATION');
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
	},
}
</script>

<style lang="scss" rel="stylesheet/scss">
#app {
}
[v-cloak] {
  display: none !important;
}
.continueBrowsingZX {
	text-decoration: underline;
	color: #1E88E5;
	font-size: 14px;
	cursor: pointer;
}

.browser-model-all {
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10000;
	.browser-model-box {
		width: 570px;
		height: 320px;
		background: #fff;
		border-radius: 6px;
		padding: 15px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -175px;
		margin-left: -300px;
		.browser-model-noDown {
			text-align: right;
			font-size: 14px;
			color: #C0C4CC;
			margin-bottom: 15px;
			text-decoration: underline;
			cursor: pointer;
		}
		.top20 {
			margin-top: 20px;
		}
		.browser-model-text-tips {
			text-align: center;
			font-size: 24px;
			color: #333E48;
			margin-bottom: 10px;
		}
		.browser-model-arrow {
			text-align: center;
			margin: 15px 0 20px 0;
			img {
				width: 12px;
				height: 16px;
			}
		}
		.browser-model-down-box {
			width: 390px;
			height: 150px;
			border: 1px solid #4BCF99;
			margin: 0 auto;
			border-radius: 4px;
			cursor: pointer;
			.browser-model-down-box-icon {
				width: 100%;
				text-align: center;
				margin: 15px 0;
				img {
					width: 252px;
					height: 62px;
				}
			}
			.browser-model-down-box-btn {
				width: 108px;
				height: 35px;
				line-height: 35px;
				border-radius: 4px;
				color: #fff;
				font-size: 16px;
				text-align: center;
				background: #4BCF99;
				margin: 0 auto;
			}
		}
	}
}
</style>
