<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box message-detail">
      <h3 class="title">{{msgDetail.title}}</h3>
      <div class="bar">
        <span class="span">{{msgDetail.msgType === 1 ? '系统消息' : '平台通知'}}</span>
        <span class="span">{{$moment(msgDetail.sendTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <a class="del" @click="delMessage"><i class="iconfont icon-shanchu"></i></a></div>
      <div class="con">
        {{msgDetail.content}}
      </div>
      <div class="download">
        <h3>附件下载</h3>
<!--        <a :title="item.name" v-for="item in msgDetail.attachments" :key="item.name" :href="item.path" :download="item.name">
          <img style="width: 82px; height: 90px;" :src="item.url" alt="">
          <p>{{item.name}}</p>
        </a> -->
				<span class='fujian' v-for="item in msgDetail.attachments" :key="item.name" @click='downloadCodeHandle(item.path, item.name)'>
          <img style="width: 82px; height: 90px;" :src="item.path" alt="">
          <p>{{item.name}}</p>
				</span>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../utils/api'

  export default {
    name: 'detailInfo',
    data () {
      return {
        msgDetail: {},
      }
    },
    methods: {
      delMessage () {
        this.$confirm('确定删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          API.message.msgDelFlag({ids: this.$route.query.id}, (da) => {
            if (da.data > 0) {
              this.$message.success('删除成功')
              this.$router.push({name: 'messageList', params: {end: 'FE'}})
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      },
      getMesDetail () {
        API.message.msgDetail(this.$route.query.id, da => {
          this.msgDetail = da.data
        })
      },
			downloadCodeHandle (url, name) {
				$('body').append('<a href="" id="download_goto" target="_blank"></a>');
				var $download = $('#download_goto');
				$download.attr('href', 'https://tibosscms.dgg.net/api/cms/file/download.do?fileName=' + encodeURI(encodeURI(name)) + '&fileUrl=' + url);
				$download.attr('download', encodeURI(encodeURI(name)));
				$download.get(0).click();
				$download.remove();


// 					html2canvas(this.$refs.downloadCode).then(canvas => {
// 						// document.body.appendChild(canvas)
// 						var a = document.createElement('a');
// 						a.href = canvas.toDataURL('image/png'); // 将画布内的信息导出为png图片数据
// 						a.download = name; // 设定下载名称
// 						a.click(); // 点击触发下载
// 					});
			},
    },
    created () {
      this.getMesDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../../static/iconFont/iconfont.css";

  .message-detail {
    margin-top: 50px;
    padding: 100px;
    .title {
      text-align: center;
      margin-bottom: 20px;
      color: #333E48;
    }
    .bar {
      padding-bottom: 10px;
      border-bottom: 1px solid #DDDDDD;
      margin-bottom: 10px;
      .span {
        margin-right: 20px;
        color: #728395;
      }
      .del {
        float: right;
        color: #728395;
        /*font-weight: bold;*/
        cursor: pointer;
        /*text-decoration: underline;*/
      }
      .con {
        padding: 10px 0;
        color: #4F5F6F;
      }
    }
    .download {
      margin-top: 200px;
      h3 {
        margin-bottom: 20px;
      }
      a {
        float: left;
        margin-right: 20px;
      }
      p {
        width: 200px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
	.fujian {
		cursor: pointer;
		color: #1E88E5;
	}
	.fujian p:hover {
		text-decoration: underline;
	}
</style>
