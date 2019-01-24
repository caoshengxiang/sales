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
            <td>{{billDetail.bizNum}}</td>
            <td class="td-title">上传人</td>
            <td>{{billDetail.uploadUserName}} {{billDetail.uploadUserPhone}}</td>
            <td class="td-title">企业名称</td>
            <td colspan="3">{{billDetail.customerName}}</td>
          </tr>
          <tr>
            <td class="td-title">账期</td>
            <td>{{billDetail.accountPeriodYear}}年{{billDetail.accountPeriodMonth}}月</td>
            <td class="td-title">业务类型</td>
            <td>
              <span v-if="billDetail.bizType === 1">收入</span>
              <span v-if="billDetail.bizType === 2">支出</span>
              <span v-if="billDetail.bizType === 3">其他</span>
            </td>
            <td class="td-title">业务金额</td>
            <td>{{billDetail.bizAmount}}</td>
            <td class="td-title">上传时间</td>
            <td>{{$moment(billDetail.uploadTime).format('YYYY-MM-DD HH:mm')}}</td>
          </tr>
        </table>

        <!--图片，排序-->
        <div class="imgs-box" ref="viewerBillShow" id="viewerBillS">
          <div class="imgs-box-item" v-for="(bill, index) in bills" :key="index"
               v-dragging="{ item: bill, list: bills, group: 'customerBill' }">
            <!--<photo-view :photo-data="{-->
            <!--text: '',-->
            <!--images: [-->
            <!--{url: bill.image, previewText: bill.text},-->
            <!--]}">-->
            <!--<img :src="bill.image" alt="">-->
            <!--</photo-view>-->
            <div>
              <img :src="bill.image" alt="">
              <p>{{bill.text}}</p>
            </div>
          </div>
        </div>

        <!--操纵-->
        <div style="background-color: #F9FCFB; padding: 10px 30px;">
          <b>操作</b>
          <span v-if="billDetail.auditState === 1" class="op-btn" @click="operateOptions('pass')">审核通过</span>
          <span v-if="billDetail.auditState === 1" class="op-btn" @click="operateOptions('refuse')">审核拒绝</span>
          <span class="op-tips">
            <span v-if="billDetail.auditState === 1">待审核</span>
            <span v-if="billDetail.auditState === 2">审核已拒绝</span>
            <span v-if="billDetail.auditState === 3">审核已通过</span>
            ：{{billDetail.auditRemark}}  {{billDetail.auditTime && $moment(billDetail.auditTime).format('YYYY-MM-DD HH:mm')}}</span>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>服务日志</span>
          </div>
          <div class="text item">
            <p v-for="(item, index) in billDetail.operateLogList" :key="index">
              {{item.operateTime && $moment(item.operateTime).format('YYYY.MM.DD HH:mm')}}&nbsp;
              {{item.userName}}
              {{item.detail}}
            </p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import photoView from '../../../../components/photo/photoView'
  import API2 from '../../../../utils/api2'
  import { arrToStr } from '../../../../utils/utils'
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        bills: [],
        billDetail: {},
        viewerDom: '',
      }
    },
    components: {
      photoView,
    },
    methods: {
      getDetail () {
        this.dataLoading = true
        console.log(1)
        API2.customerBill.detail(this.$route.query.id, (da) => {
          console.log(2)
          this.billDetail = da.data
          if (da.data.attachment) {
            let images = da.data.attachment.split(',')
            this.bills = images.map((item, index) => {
              return {
                image: item,
                text: '',
                id: index,
              }
            })
            this.$nextTick(() => {
              this.viewerDom && this.viewerDom.destroy()
              this.viewerDom = new Viewer(this.$refs.viewerBillShow)
            })
          }
          console.log(3)
          setTimeout(() => {
            this.dataLoading = false
            console.log(65)
          }, 500)
        })
      },
      operateOptions (type) {
        switch (type) {
          case 'pass':
            this.$confirm('确定通过审核, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API2.customerBill.audit({
                id: this.billDetail.id,
                auditState: 3,
              }, (data) => {
                if (data.status) {
                  this.$message.success(`操作成功`)
                  setTimeout(() => {
                    this.dataLoading = false
                    this.getDetail()
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'refuse':
            // this.$confirm('确定审核拒绝, 是否继续?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning',
            // }).then(() => {
            //   this.dataLoading = true
            //   API2.customerBill.audit({
            //     id: this.billDetail.id,
            //     auditState: 2,
            //   }, (data) => {
            //     if (data.status) {
            //       this.$message.success(`操作成功`)
            //       setTimeout(() => {
            //         this.dataLoading = false
            //         this.getDetail()
            //       }, 500)
            //     } else {
            //       setTimeout(() => {
            //         this.dataLoading = false
            //       }, 500)
            //     }
            //   })
            // }).catch(() => {
            //   this.$message({
            //     type: 'info',
            //     message: '已取消删除',
            //   })
            // })

            this.$prompt('请输入审核意见', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({value}) => {
              this.dataLoading = true
              API2.customerBill.audit({
                id: this.billDetail.id,
                auditRemark: value,
                auditState: 2,
              }, (data) => {
                if (data.status) {
                  this.$message.success(`操作成功`)
                  setTimeout(() => {
                    this.dataLoading = false
                    this.getDetail()
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入',
              })
            })
            break
          default:
        }
      },
    },
    mounted () {
      this.getDetail()

      this.$dragging.$on('dragged', ({value}) => {
        console.log(value.item)
        console.log(value.list)
        console.log(value.group)
        this.billDetail.attachment = arrToStr(value.list, 'image')
        API2.customerBill.edit(this.billDetail, da => {
          console.log(da)
        })
      })
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

  .imgs-box {
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
