<template>
    <div class='step-content'>
        <div class="divPosition">
            <div class='stepOne-head'>
                <span class='stepOne-head-title'><img src="../../../../assets/icon/spgl_xysz.png" alt="" class="mr10" style="vertical-align: text-top;">协议设置</span>
            </div>
            <div class="com-dialog">
                <el-form :model="stepTwo" ref="addForm" label-position="left" label-width="120px">
                    <el-form-item label="服务协议">
                        <template slot-scope="scope">
                            <el-select v-model="stepTwo.goodsAgreementId" style="width: 400px;" clearable filterable placeholder="请选择协议" @change="selectAgreement">
                                <el-option v-for="(item, i) in serviceAgreement" :key="i" :value='item.id' :label='item.name'></el-option>
                            </el-select>
                            <el-button class="ml10" type="primary" v-if='agreementUrl' style="background: #409eff; border-color: #409eff;"><a style="color: #fff; text-decoration: none;" :href="agreementUrl" target="_blank">预览</a></el-button>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否服务商收费">
                        <template slot-scope="scope">
                            <el-radio v-model="stepTwo.serviceProviderFees" :label="1">是</el-radio>
                            <el-radio v-model="stepTwo.serviceProviderFees" :label="0" class="ml20">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="签约主体">
                        <template slot-scope="scope">
                            <el-select v-model="defaultContract" multiple clearable filterable placeholder="请选择(多选)" style="width: 400px;">
                                <el-option v-for="(item, i) in subjectOfContract" :key="i" :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <p class="all-btn">
            <span>
                <span class="step-last-button" @click="goBack(1)">上一步</span>
                <span class="step-next-button ml20" @click="goDownStep(3)">下一步</span>
            </span>
        </p>
    </div>
</template>

<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    import { mapState, mapMutations  } from 'vuex'

    export default {
        data () {
            return {
                stepTwo: {
                    goodsAgreementId: '',                       //服务协议
                    serviceProviderFees: null,                  //是否允许服务商收费
                    defaultContractIds: '',                     //签约主体
                },
                serviceAgreement: [],                           //服务协议
                agreementUrl: '',                               //服务协议地址
                subjectOfContract: [],                          //签约主体
                defaultContract: [],                            //选择的签约主体
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        watch: {},
        created () {
            this.getSubject();
            this.getServiceAgreement();


            let detail = ~~this.$route.query.detail;
            let two = webStorage.getItem('stepTwo');
            if(two) {
                this.stepTwo = two;
                // 设置签约主体回显
                let conAll = this.stepTwo.defaultContractIds.split(',');
                conAll.forEach(con => {
                    this.defaultContract.push(~~con);
                })
                // 设置服务协议预览回显
                setTimeout(()=> {
                    if(this.serviceAgreement.length) {
                      this.serviceAgreement.forEach(ser => {
                        if(this.stepTwo.goodsAgreementId == ser.id) {
                          if(ser.goodsAgreementTemplateModel.attachmentUrl) {
                              this.agreementUrl = ser.goodsAgreementTemplateModel.attachmentUrl;
                          }
                        }
                      })
                    }
                }, 500)
            }else {
                if(detail) {
                    let data = this.detail;
                    this.stepTwo.serviceProviderFees = data.serviceProviderFees ? 1 : 0;
                    this.stepTwo.defaultContractIds = data.defaultContractIds;
                    let cons = data.defaultContractIds ? data.defaultContractIds.split(',') : [];
                    if(cons.length > 0) {
                      cons.forEach(con => {
                        this.defaultContract.push(~~con)
                      })
                    }
                    if(data.goodsAgreementModel) {
                      this.stepTwo.goodsAgreementId = data.goodsAgreementModel.id
                      if(data.goodsAgreementModel.goodsAgreementTemplateModel) {
                        this.agreementUrl = data.goodsAgreementModel.goodsAgreementTemplateModel.attachmentUrl
                      }
                    }
                }
            }
        },
        mounted () {},
        methods: {
            ...mapMutations('constData', [
                'mut_addProductStatus',
            ]),
            // 获取服务协议
            getServiceAgreement () {
                API.zhuxinGoodsManage.ServiceAgreementSearch((data) => {
                    if(data.status) {
                        this.serviceAgreement = data.data;
                    }
                })
            },
            // 选择服务协议时
            selectAgreement () {
                let serviceId = this.stepTwo.goodsAgreementId;
                this.serviceAgreement.forEach(item => {
                    if(serviceId == item.id) {
                        if(item.goodsAgreementTemplateModel.attachmentUrl) {
                            this.agreementUrl = item.goodsAgreementTemplateModel.attachmentUrl;
                        }else {
                            this.agreementUrl = '';
                        }
                    }
                })
            },
            // 获取签约主体
            getSubject () {
                API.zhuxinGoodsManage.subjectOfContractSearch((data) => {
                    if(data.status) {
                        this.subjectOfContract = data.data;
                    }
                })
            },
            // 上一步
            goBack(step) {
                this.mut_addProductStatus(step)
                let detail = this.$route.query.detail;
                this.$router.push({name: 'addGoods', query: {detail: detail, step: step}})
            },
            // 下一步
            goDownStep (step) {
                this.stepTwo.defaultContractIds = this.defaultContract.join();
                let message = !this.stepTwo.goodsAgreementId && '请选择服务协议' ||
                              (this.stepTwo.serviceProviderFees === null) && '请选择是否服务商收费' ||
                              !this.defaultContract.length && '请选择签约主体' || null;
                if(message) return this.$message.warning(message);
                this.stepTwo.defaultContractIds = this.defaultContract.join();

                // console.log(this.stepTwo); return;
                this.mut_addProductStatus(step);                 //设置步骤
                webStorage.setItem('stepTwo', this.stepTwo);     //设置第二步缓存
                let detail = this.$route.query.detail;
                this.$router.push({name: 'addGoods', query: {detail: detail, step: step}})
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../styles/commons";
    @import "../../../../styles/stepCommon";

    .divPosition {
        background: #fff;
        padding: 20px 15px 25px 15px;
    }

    .step-content {
        width: 100%;
        .stepOne-head {
            padding: 15px 15px;
            width: calc(100% - 30px);
            .stepOne-head-title {
                font-size: 15px;
                color: #333E48;
                font-weight: bold;
                margin-right: 50px;
            }
        }
        .com-dialog {
            padding-left: 15px;

            .step-last-button {
                display: inline-block;
                width: 180px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #E0E3E7;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 50px;
                border-radius: 4px;
            }
            .step-next-button {
                display: inline-block;
                width: 180px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #4BCF99;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 50px;
                border-radius: 4px;
            }
        }
        .all-btn {
            text-align: center;
            margin-bottom: 30px;
            .step-last-button {
                display: inline-block;
                width: 180px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #E0E3E7;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 50px;
                border-radius: 4px;
            }
            .step-next-button {
                display: inline-block;
                width: 180px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #4BCF99;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 50px;
                border-radius: 4px;
            }
        }
    }
</style>
