<template>
    <div class='step-content'>
        <div class="divPosition">
            <p class="com-titles"><img src="../../../../assets/icon/spgl_fwxx.png" alt="" class="mr10" style="vertical-align: top;">服务信息 <span class='stepOne-contents-spectitle'>( 非标准商品基础服务费 )</span></p>
            <div class="step-three-formtitle ml10">
                <div class="com-dialog">
                    <el-form :model="stepThree" ref="addForm" :inline="true" label-position="left" label-width="100px">
                        <el-form-item label="服务对象">
                            <template slot-scope="scope">
                                <el-select v-model="stepThree.servicePrincipalType" style="width: 250px;" clearable placeholder="请选择服务信息">
                                    <el-option value='Company' label='企业'></el-option>
                                    <el-option value='Person' label='个人'></el-option>
                                    <el-option value='Both' label='企业/个人'></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="服务方式">
                            <template slot-scope="scope">
                                <el-select v-model="stepThree.billingType" style="width: 250px;" clearable placeholder="请选择服务方式">
                                    <el-option value='ANNUALLY' label='计时服务'></el-option>
                                    <el-option value='TIMES' label='计次服务'></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="附加智能服务">
                            <template slot-scope="scope">
                                <el-select v-model="intelligentService" style="width: 250px;" clearable placeholder="请选择附加智能服务" @change="selectIntelligentService">
                                    <el-option :value='1' label='老板报表'></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-form>
                    <div class="fwb">
                        <p class="fwb-title fl">服务资料</p>
                        <div class="fwb-con fl">
                            <div id="serviceContent" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divPosition mt10">
            <p class="com-titles"><span><img src="../../../../assets/icon/spgl_gdsz.png" alt="" class="mr10" style="vertical-align: top;">工单设置</span> <el-button class="fr" type="success" plain icon="el-icon-plus" size="mini" @click="addWorkOrder('', '')">添加工单</el-button></p>
            <div class="step-three-service-table">
                <div class="three-service-table-title">
                    <ul>
                        <li>工单名称</li>
                        <li><span class='table-title-title'>工单管家类型</span></li>
                        <li><span class='table-title-title'>佣金设置</span></li>
                        <li><span class='table-title-title'>工单服务时限</span></li>
                        <li><span class='table-title-title'>工单流程类型</span></li>
                        <li><span class='table-title-title'>操作</span></li>
                    </ul>
                </div>
                <div class='three-service-table-box'>
                    <ul>
                        <li v-if='goodsWorkList.length < 1' class="service-table-noData">暂无数据</li>
                        <li v-if="goodsWorkList.length > 0" v-for="(item, idx) in goodsWorkList" :style="'height: ' + item.liHeight" :key="idx">
                            <div class="service-table-item-top" :style="'background: ' + (!item.selected ? 'none;' : '#F5FDFE;')">
                                <div class="service-table-item">{{getName(item.serviceTypeId)}}</div>
                                <div class="service-table-item"><span class="table-title-title"></span>{{searchManager(item.serviceManagerType)}}</div>
                                <div class="service-table-item"><span class="table-title-title">{{commissionType[item.commissionType]}} — {{item.commissionProportion}}</span></div>
                                <div class="service-table-item"><span class="table-title-title">{{item.timeLimit}}</span></div>
                                <div class="service-table-item"><span class="table-title-title">{{processType[item.process]}}</span></div>
                                <div class="service-table-item">
                                    <div class="table-title-title">
                                        <el-button type="text" style="color: #1E88E5;" @click="addWorkOrder(item, idx)">编辑</el-button>
                                        <el-button type="text" style="color: #FF6869;" @click="deleteWorkOrder(item, idx)">删除</el-button>
                                        <!-- <el-button type="text" @click="lookProcess" style="color: #1E88E5;">查看流程<img class="lookImg fr" :src="liHeight === '45px' ? '../../../../assets/icon/service-right-j.png' : '../../../../assets/icon/service-left-j.png'" alt=""></el-button> -->
                                        <el-button type="text" @click="lookProcess(item)" style="color: #1E88E5;">查看流程 <i :class="!item.selected ? 'el-icon-caret-right' : 'el-icon-caret-bottom'"></i></el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="service-table-item-bottom">
                                <p class='stepOne-head'>
                                    <span class='stepOne-head-title'>工单环节</span>
                                </p>
                                <div class="prosses-info">
                                    <div class="prosses-info-left">
                                        <ul>
                                            <li v-for="(items, ins) in item.serviceModuleModelList" :key="ins" :class="items.selected ? 'info-left-cur' : ''" @click="selectProssesInfo(item.serviceModuleModelList, items)">{{items.name}}</li>
                                        </ul>
                                    </div>
                                    <div class="prosses-info-right">
                                        <p class="prosses-info-right-head">
                                            <span>延期时限: {{selectPoressDetal.timeLimit}}天</span>
                                            <span class="ml20">延期审批角色: {{approvalRole[selectPoressDetal.approvalRole]}}</span>
                                        </p>
                                        <div class="prosses-info-right-table">
                                            <div class="prosses-info-right-table-head">
                                                <span class='table-head-title'>事项名</span>
                                                <span class='table-head-title'>事项操作</span>
                                                <span class='table-head-titles'>事项说明</span>
                                            </div>
                                            <div class="prosses-info-right-table-content" v-for="(inPro, index) in selectPoressDetal.serviceModuleItemModelList" :key="index">
                                                <div class='table-head-title noLeftB'>{{inPro.name}}</div>
                                                <div class='table-head-title'>
                                                  <p v-for="(mat, i) in inPro.serviceModuleItemOperationList" :key="i">{{mat.name}}</p>
                                                </div>
                                                <div class='table-head-titles'>{{inPro.remark}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p class="all-btn">
            <span>
                <span class="step-last-button" @click="goBack(2)">上一步</span>
                <span class="step-next-button ml20" @click="goDownStep(4)">下一步</span>
            </span>
        </p>
    </div>
</template>

<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    import Editor from 'wangeditor';
    // import 'wangeditor/release/wangEditor.min.css';
    import workOrder from './addWorkOrder'
    import { uploadUrl } from '../../../../utils/const'
    import { mapState, mapMutations  } from 'vuex'

    export default {
        data () {
            return {
                userInfo: webStorage.getItem('userInfo'),
                imgUrl: '',
                liHeight: '45px',
                prossesInfo: 1,
                stepThree: {
                    servicePrincipalType: '',                              //服务对象
                    billingType: '',                                       //服务方式
                    hasBossReport: 0,                                      //是否包含老板报表 0 不包含  1 包含
                    information: '',                                       //服务资料
                },
                intelligentService: '',                                    //选择的智能服务
                goodsWorkList: [],                                         //工单列表
                managerAll: [],                                            //所有管家类型
                commissionType: {
                    1: '按比例返佣',
                    2: '固定返佣',
                },
                processType: {
                    1: '专用流程(记账、全托管)',
                    2: '代办业务流程',
                    3: '计时服务流程',
                    4: '计次服务流程',
                },
                approvalRole: {
                    1: '客户',
                    2: '部门主管',
                    3: '自动',
                },
                selectPoressDetal: {},                                     //选择要展示的流程详情
                nameAll: [],                                               //所有工单名称
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        computed: {
          ...mapState('constData', [
            'addProductStatus',
          ]),
        },
        watch: {},
        created () {
            this.getAllWorkNames();
            this.getManagerType();

            let detail = ~~this.$route.query.detail;
            let three = webStorage.getItem('stepThree');
            if(three) {
                this.stepThree = three;
                this.goodsWorkList = three.goodsWorkList
                if(three.hasBossReport == 1) this.intelligentService = 1;
            }else {
                if(detail) {
                    let data = this.detail;
                    this.stepThree.servicePrincipalType = data.servicePrincipalType;
                    this.stepThree.billingType = data.billingType;
                    this.intelligentService = data.hasBossReport == 1 && 1 || null;
                    this.stepThree.hasBossReport = data.hasBossReport;
                    this.stepThree.information = data.information;
                    this.goodsWorkList = data.goodsWorkList;
                }
            }

            if(this.goodsWorkList.length > 0) {
              this.goodsWorkList.forEach(work => {
                  work.liHeight = '45px';
                  work.selected = false;
              })
            }

        },
        mounted () {
            this.createdEditor();
        },
        computed: {
            uploadUrl() {
                return uploadUrl;
            }
        },
        methods: {
            ...mapMutations('constData', [
                'mut_addProductStatus',
            ]),
            // 获取所有工单名称
            getAllWorkNames () {
              API.zhuxinGoodsManage.getWorkNames((data) => {
                if(data.status) {
                  this.nameAll = data.data;
                }
              })
            },
            getName (id) {
              let type = '';
              this.nameAll.forEach(name => {
                if(id == name.id) {
                  type = name.name;
                }
              })
              return type
            },
            // 获取管家类型
            getManagerType () {
                API.organization.zxIdentity({type: 6}, (data) => {
                    if(data.status) {
                        this.managerAll = data.data;
                    }
                })
            },
            searchManager (id) {
                let _name = '';
                if(this.managerAll.length) {
                    this.managerAll.forEach(man => {
                        if(id == man.id) {
                            _name = man.codeName;
                        }
                    })
                }
                return _name;
            },
            // 上一步
            goBack(step) {
                this.mut_addProductStatus(step)
                let detail = this.$route.query.detail;
                this.$router.push({name: 'addGoods', query: {detail: detail, step: step}})
            },
            // 下一步
            goDownStep (step) {
                let message = !this.stepThree.servicePrincipalType && '请选择服务对象' ||
                              !this.stepThree.billingType && '请选择服务方式' ||
                              !this.stepThree.information && '请填写服务资料' ||
                              !this.goodsWorkList.length && '请添加工单' || null;
                if(message) return this.$message.warning(message);
                // 所有工单如果是按比例返佣---返佣值相加是否等于100
                let num = 0, guo = 0;
                this.goodsWorkList.forEach(work => {
                    if(work.commissionType == 1) {
                        guo = 1;
                        num += work.commissionProportion
                    }
                })
                if(num != 100 && guo) return this.$message.warning('所有工单按比例返佣值之和必须为100%');
                this.stepThree.goodsWorkList = this.goodsWorkList;
                this.mut_addProductStatus(step);                     //设置步骤
                webStorage.setItem('stepThree', this.stepThree);     //设置第三步缓存
                let detail = this.$route.query.detail;
                this.$router.push({name: 'addGoods', query: {detail: detail, step: step}})
            },
            // 选择智能服务
            selectIntelligentService () {
                let id = this.intelligentService;
                switch (id) {
                    case 1:
                        this.stepThree.hasBossReport = 1;
                        break;
                    default:
                        break;
                }
            },
            // 点击内部流程
            selectProssesInfo (perItem, item) {
                perItem.forEach(per => {
                    per.selected = false;
                })
                item.selected = true;
                this.selectPoressDetal = item;   //内部流程详情赋值
            },
            // 查看流程
            lookProcess (item) {
                if(item.liHeight === '45px') {
                    this.goodsWorkList.forEach(work => {
                        work.liHeight = '45px';
                        work.selected = false;
                    })
                    item.liHeight = 'auto';
                    item.selected = true;

                    // 默认选中第一个开始服务
                    item.serviceModuleModelList.forEach(ser => {
                        ser.selected = false;
                    })
                    if(item.serviceModuleModelList[0]) {
                        item.serviceModuleModelList[0].selected = true;
                        this.selectPoressDetal = item.serviceModuleModelList[0];
                    }else {
                        this.selectPoressDetal = {}
                    }
                }else {
                    this.goodsWorkList.forEach(work => {
                        work.liHeight = '45px';
                        work.selected = false;
                    })
                    item.liHeight = '45px';
                    item.selected = false;
                }

            },
            // 添加工单
            addWorkOrder (item, idx) {
                this.$vDialog.modal(workOrder, {
                  title: item ? '修改工单' : '新增工单',
                  width: 900,
                  height: 800,
                  params: {
                      detail: item,
                      step: this.addProductStatus,
                      managerAll: this.managerAll,
                      nameAll: this.nameAll,
                      index: idx,
                  },
                  callback: (data) => {
                    if (data.type === 'save') {
                        this.$set(data.params, 'selected', false);
                        this.$set(data.params, 'liHeight', '45px');
                        this.goodsWorkList.push(data.params);
                    }else {
                        this.goodsWorkList[data.idx] = data.params;
                    }
                  },
                })
            },
            // 删除工单
            deleteWorkOrder (item, idx) {
                this.goodsWorkList.splice(idx, 1);
            },
            createdEditor() {
                var zxEditor = new Editor('#serviceContent');
                zxEditor.customConfig.zIndex = 100;
                //把这个html通过catchData的方法传入父组件
                zxEditor.customConfig.onchange = html => {
                    this.stepThree.information = html;
                };
                zxEditor.customConfig.uploadImgShowBase64 = true
                zxEditor.customConfig.uploadImgServer = uploadUrl;
                zxEditor.customConfig.uploadFileName = 'file'
                zxEditor.customConfig.uploadImgHeaders = {
                    authKey: this.userInfo.authKey //头部token
                };
                //下面是最重要的的方法
                zxEditor.customConfig.uploadImgHooks = {
                    before: function(xhr, editor, files) {
                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                    },
                    success: function(xhr, editor, result) {
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                        this.imgUrl = Object.values(result.data).toString();
                    },
                    fail: function(xhr, editor, result) {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function(xhr, editor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },
                    timeout: function(xhr, editor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function(insertImg, result, editor) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        let url = Object.values(result); //result.data就是服务器返回的图片名字和链接
                        JSON.stringify(url); //在这里转成JSON格式
                        insertImg(result.data.url);
                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }
                };
                // 自定义颜色
                zxEditor.customConfig.colors = [
                    '#000000',
                    '#eeece0',
                    '#1c487f',
                    '#4d80bf',
                    '#c24f4a',
                    '#8baa4a',
                    '#7b5ba1',
                    '#46acc8',
                    '#f9963b',
                    '#ffffff',
                    '#483B3B',
                    '#FF0000',
                    '#FF5400',
                    '#FFB700',
                    '#FFF800',
                    '#ADFF00',
                    '#00FF14',
                    '#00F8FF',
                    '#0090FF',
                    '#0005FF',
                    '#6800FF',
                    '#FF00F3',
                    '#FF009E',
                    '#FF0059',
                    '#aaaaaa',
                    '#E1E1E1'
                ]
                zxEditor.create();
                // 如果编辑情况下填充已经填写的内容
                if(webStorage.getItem('stepThree')) {
                    zxEditor.txt.html(this.stepThree.information)
                }else {
                  if(~~this.$route.query.detail) {
                    zxEditor.txt.html(this.detail.information)
                  }
                }
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../styles/commons";
    @import "../../../../styles/stepCommon";

    .divPosition {
        background: #fff;
        padding: 20px 30px 25px 30px;
    }
    .fwb {
        width: 100%;
        overflow: hidden;
        .fwb-title {
            width: 100px;
            text-align: left;
            color: #606266;
        }
        .fwb-con {
            width: calc(100% - 100px);
        }
    }

    .step-content {
        width: 100%;
        box-sizing: border-box;
        .com-titles {
            width: 100%;
            font-size: 15px;
            font-weight: bold;
            color: #333E48;
            padding-left: 0 !important;
            padding-right: 0 !important;
            .stepOne-contents-spectitle {
                color: #999999;
                font-size: 13px;
                font-weight: normal;
                margin-left: 5px;
            }
        }
        .com-titles:after {
            border: 0;
        }
        .com-titles:before {
            border: 0;
            width: 0;
            height: 0;
        }
        .step-three-service-table {
            margin: 10px 0 20px 0;
            .three-service-table-title {
                width: 100%;
                height: 45px;
                background: #FAFAFA;
                ul {
                    li {
                        float: left;
                        width: calc(100% / 6);
                        text-indent: 15px;
                        color: #333E48;
                        font-size: 13px;
                        line-height: 45px;
                        .table-title-title {
                            border-left: 1px solid #DFDFDF;
                            padding-left: 10px;
                        }
                    }
                }
            }
            .three-service-table-box {
                margin: 10px 0;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid rgba(225, 225, 225, 1);
                border-bottom: 0;
                ul {
                    li {
                        width: 100%;
                        border-bottom: 1px solid rgba(225, 225, 225, 1);
                        overflow: hidden;
                        .service-table-item-top {
                            overflow: hidden;
                            height: 45px;
                            .service-table-item {
                                display: inline-block;
                                float: left;
                                width: calc(100% / 6);
                                text-indent: 15px;
                                color: #333E48;
                                font-size: 13px;
                                line-height: 45px;
                                .table-title-title {
                                    padding-left: 10px;
                                    .lookImg {
                                        width: 20px;
                                        height: 20px;
                                    }
                                }
                            }
                        }
                        .service-table-item-bottom {
                            padding: 15px;
                            .stepOne-head {
                                width: 100%;
                                .stepOne-head-title {
                                    font-size: 13px;
                                    color: #333E48;
                                    font-weight: bold;
                                    margin-right: 50px;
                                }
                            }
                            .prosses-info {
                                width: 100%;
                                overflow: hidden;
                                margin-top: 15px;
                                .prosses-info-left {
                                    float: left;
                                    width: 240px;
                                    ul {
                                        li {
                                            width: 100%;
                                            height: 40px;
                                            line-height: 40px;
                                            text-align: center;
                                            color: #8D8D8D;
                                            font-size: 13px;
                                            font-weight: Regular;
                                            border-bottom: 0;
                                            cursor: pointer;
                                        }
                                        .info-left-cur {
                                            color: #4BCF99;
                                            font-weight: bold;
                                            background: #FAFAFA;
                                            border-left: 2px solid #4BCF99;
                                            box-sizing: border-box;
                                        }
                                    }
                                }
                                .prosses-info-right {
                                    float: left;
                                    margin-left: 10px;
                                    width: calc(100% - 250px);
                                    padding: 15px;
                                    box-sizing: border-box;
                                    background: #FAFAFA;
                                    .prosses-info-right-head {
                                        font-size: 12px;
                                        color: #4F5F6F;
                                        font-weight: bold;
                                    }
                                    .prosses-info-right-table {
                                        margin-top: 15px;
                                        width: 100%;
                                        border: 1px solid #E1E1E1;
                                        .prosses-info-right-table-head {
                                            width: 100%;
                                            height: 40px;
                                            border-bottom: 1px solid #E1E1E1;
                                            .table-head-title {
                                                display: inline-block;
                                                float: left;
                                                width: 140px;
                                                height: 40px;
                                                line-height: 40px;
                                                border-right: 1px solid #E1E1E1;
                                                font-size: 12px;
                                                color: #333E48;
                                                font-weight: bold;
                                                text-align: center;
                                            }
                                            .table-head-titles {
                                                display: inline-block;
                                                float: left;
                                                width: calc(100% - 282px);
                                                height: 40px;
                                                line-height: 40px;
                                                font-size: 12px;
                                                color: #333E48;
                                                text-align: center;
                                                font-weight: bold;
                                            }
                                        }
                                        .noData {
                                            height: 40px;
                                            line-height: 40px;
                                            text-align: center;
                                            font-size: 13px;
                                        }
                                        .prosses-info-right-table-content {
                                            width: 100%;
                                            min-height: 40px;
                                            border-top: 1px solid #E1E1E1;
                                            overflow: hidden;
                                            .noLeftB {
                                              border-right: 0 !important;
                                              box-sizing: border-box;
                                            }
                                            .table-head-title {
                                                display: inline-block;
                                                float: left;
                                                width: 140px;
                                                min-height: 40px;
                                                line-height: 40px;
                                                border-right: 1px solid #E1E1E1;
                                                border-left: 1px solid #E1E1E1;
                                                font-size: 12px;
                                                color: #333E48;
                                                text-align: center;
                                                overflow: hidden;
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                            }
                                            .table-head-titles {
                                                display: inline-block;
                                                float: left;
                                                width: calc(100% - 282px);
                                                height: 40px;
                                                line-height: 40px;
                                                font-size: 12px;
                                                color: #333E48;
                                                text-align: center;
                                                overflow: hidden;
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .service-table-noData {
                        text-align: center;
                        font-size: 14px;
                        color: #4F5F6F;
                        padding: 15px 0;
                    }
                }
            }
        }
        .all-btn {
            text-align: center;
            margin-bottom: 30px;
            .step-last-button {
                display: inline-block;
                width: 179px;
                height: 39px;
                border: 1px solid #4BCF99;
                color: #4BCF99;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
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
<style scoped>
   .step-content >>> .w-e-text-container {
        height: 160px !important;
    }
   .step-content >>> .w-e-droplist {
      height: 161px;
      overflow: scroll;
    }
</style>
