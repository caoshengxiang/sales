<template>
    <div class='com-dialog'>
        <div class="retreatALL">
            <table class="com-dialog-table">
                <tr class="com-dialog-table">
                    <td class="td-title">订单号</td>
                    <td class="td-text">{{orderDetail.id + '-' + orderDetail.orderId}}</td>
                    <td class="td-title">订单状态</td>
                    <td class="td-text">{{orderStatus[orderDetail.orderState]}}</td>
                    <td class="td-title">订单来源</td>
                    <td class="td-text">{{orderDetail.orderSourceName}}</td>
                </tr>
                <tr class="com-dialog-table">
                    <td class="td-title">商品名称</td>
                    <td class="td-text">{{orderDetail.productName}}</td>
                    <td class="td-title">客户名称</td>
                    <td class="td-text">{{orderDetail.customerName}}</td>
                    <td class="td-title">客户签单人</td>
                    <td class="td-text">{{orderDetail.contacterName}}</td>
                </tr>
                <tr class="com-dialog-table">
                    <td class="td-title">签单联系电话</td>
                    <td class="td-text">{{orderDetail.contacterPhone}}</td>
                    <td class="td-title">签单时间</td>
                    <td class="td-text">{{orderDetail.createDate && $moment(orderDetail.createDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                    <td class="td-title">签单金额</td>
                    <td class="td-text">{{orderDetail.billAmount}}</td>
                </tr>
                <tr class="com-dialog-table">
                    <td class="td-title">回款金额</td>
                    <td class="td-text">{{orderDetail.refundAmount}}</td>
                    <td class="td-title">待回款金额</td>
                    <td class="td-text">{{orderDetail.notRefundAmount}}</td>
                    <td class="td-title"></td>
                    <td class="td-text"></td>
                </tr>
            </table>
            <el-form :model="addForm" ref="addForm" label-width="0px">
                <table class="com-dialog-table">
                    <tr class="com-dialog-table">
                        <td class="td-title">退款账号</td>
                        <td class="td-text">
                            <el-input v-model='addForm.refundAccount' placeholder='请输入退款账号' clearable></el-input>
                        </td>
                        <td class="td-title">户名</td>
                        <td class="td-text">
                            <el-input v-model='addForm.accountName' placeholder='请输入户名' clearable></el-input>
                        </td>
                        <td class="td-title">开户行</td>
                        <td class="td-text">
                            <el-input v-model='addForm.bankName' placeholder='请输入开户行' clearable></el-input>
                        </td>
                    </tr>
                    <tr class="com-dialog-table">
                        <td class="td-title">退款金额</td>
                        <td class="td-text">
                            <el-input v-model='addForm.refundAmount' placeholder='请输入退款金额' clearable></el-input>
                        </td>
                        <td class="td-title">退单申请人</td>
                        <td class="td-text">
                            <el-input v-model='addForm.applicantId' placeholder='请输入退单申请人' disabled></el-input>
                        </td>
                        <td class="td-title">退单附件</td>
                        <td class="td-text">
                            <el-upload
                                class="upload-demo"
                                :action="uploadUrl"
                                :on-remove="onRemoveHandle"
                                :headers="{authKey: userInfo.authKey}"
                                :on-success="onSuccessHandle"
                                multiple
                                :limit="1">
                                <el-button size="small" type="primary">上传附件</el-button>
                            </el-upload>
                        </td>
                    </tr>
                    <tr class="com-dialog-table">
                        <td class="td-title">退单原因</td>
                        <td class="td-text" colspan="5">
                            <el-input type="textarea" v-model='addForm.refundReason' placeholder='请输入退单原因' clearable resize="none"></el-input>
                        </td>
                    </tr>
                    <tr class="com-dialog-table">
                        <td class="td-title">退单备注</td>
                        <td class="td-text" colspan="5">
                            <el-input type="textarea" v-model='addForm.refundRemark' placeholder='请输入退单备注' clearable resize="none"></el-input>
                        </td>
                    </tr>
                </table>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
            <el-button class="save-button" @click="saveSubmitForm()">提 交</el-button>
        </div>
    </div>
</template>
<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    import { uploadUrl } from '../../../../utils/const'

    const orderStatus  = {
        1: '待支付',
        2: '已支付',
        3: '服务中',
        4: '已完成',
        5: '已取消',
        0: '预下单',
        7: '待服务',
        8: '已中止',
        9: '退单中',
    };

    export default {
        name: 'retreatModel',
        data() {
            return {
                addForm: {
                    refundAccount: '',           //退款账号
                    accountName: '',             //户名
                    bankName: '',                //开户行
                    refundAmount: '',            //退款金额
                    applicantId: '',             //退单申请人
                    attachment: '',              //退单附件
                    refundReason: '',            //退单原因
                    refundRemark: '',            //退单备注
                },
                orderStatus,                     //订单状态
                orderDetail: {},                 //只读订单信息
                userInfo: webStorage.getItem('userInfo'),
            }
        },
        props: ['params'],
        computed: {
            uploadUrl () {
                return uploadUrl
            }
        },
        created() {
            this.orderDetail = this.params.orderDetail;
            this.addForm.applicantId = this.userInfo.name;
            console.log(this.orderDetail)
        },
        methods: {
            // 保存
            saveSubmitForm () {
                let message = !this.addForm.refundAccount && '请输入退款账号' ||
                              !this.addForm.accountName && '请输入户名' ||
                              !this.addForm.bankName && '请输入开户行' ||
                              !this.addForm.refundAmount && '请输入退款金额' ||
                              !this.addForm.applicantId && '请输入退单申请人' ||
                              !this.addForm.attachment && '请上传退单附件' ||
                              !this.addForm.refundReason && '请输入退单原因' || null;
                if(message) {
                    this.$message.warning(message);
                    return;
                }
                this.addForm.applicantId = this.userInfo.id;          //退单申请人改传id
				this.addForm.salerOrderId = this.orderDetail.id;      //ERP ID
				this.addForm.appOrderId = this.orderDetail.orderId;   //app ID

				API.salesOrder.zhuxinRefund (this.addForm, (res) => {
					console.log(res);
					if(res.status || res.status == 200) {
						this.$message.success('订单退单已进入流程');
					}
				})
                this.$vDialog.close({type: 'save'})
            },
            // 文件成功上传
            onSuccessHandle (response, file, fileList) {
                this.addForm.attachment = response.data.url
            },
            // 删除已上传文件
            onRemoveHandle () {
                this.addForm.attachment = '';
            }
        }
    }
</script>
<style scoped lang="scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }

  .retreatALL {
      padding: 30px 20px 0 20px;
      font-size: 14px;
  }

  .td-text {
      color: #aaa;
      text-align: center;
  }

</style>


