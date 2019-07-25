<template>
    <div class="workOrder">
        <el-scrollbar style="height: 100%;">
            <p class="com-titles">工单设置</p>
            <div class='option'>
                <el-form class='el-form' :model="addForm" ref="addForm" label-width="120px">
                    <el-row class="el-row-cla">
                        <el-col :span="12">
                            <el-form-item label='工单名称'>
                                <el-select v-model="addForm.serviceTypeId" filterable placeholder="请选择工单名称">
                                  <el-option v-for="(item, idx) in params.nameAll" :key="idx" :value="item.id" :label="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='工单管家类型'>
                                <el-select v-model="addForm.serviceManagerType" placeholder="请选择" filterable style="width: 100%;">
                                    <el-option v-for="(item, i) in params.managerAll" :value="item.id" :label="item.codeName" :key="i"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="el-row-cla">
                        <el-col :span="12">
                            <el-form-item label='佣金比例'>
                                <el-select v-model="addForm.commissionType" placeholder="请选择">
                                    <el-option :value="1" label="按比例返佣"></el-option>
                                    <el-option :value="2" label="固定返佣"></el-option>
                                </el-select>
                                <el-input type="number" v-model.number="addForm.commissionProportion" placeholder="请输入" style="width: 90px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='工单服务时限(天)'>
                                <el-input type="number" v-model.number="addForm.timeLimit" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <p class="com-titles">工单流程</p>
            <div class="prosses">
                <el-form class='el-form' :model="addForm" ref="addForm" label-width="130px">
                    <el-form-item label='工单服务环节类型'>
                        <el-select v-model="addForm.process" placeholder="请选择" style="width: 100%;" @change="selectProessType">
<!--                            <el-option :value="1" label="专用流程(记账、全托管)"></el-option>
                            <el-option :value="2" label="代办业务流程"></el-option> -->
                            <el-option :value="3" label="计时服务"></el-option>
                            <el-option :value="4" label="计次服务"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="service-info">
                <ul>
<!--                    <li>
                        <span class="fixed-title"><img src="../../../../assets/icon/sevice-wujiaoxing.png" alt=""> 开始服务</span>
                    </li> -->
                    <!-- 固定开始服务 -->
                    <li class="service-info-content">
                        <div class="service-info-content-top">
                            <span class="fl">
                                <img src="../../../../assets/icon/sevice-wujiaoxing.png" alt="">
                                <span>流程名称</span>
                                <el-input v-model="startService.name" placeholder="请输入流程名称" style="width: 200px;" class="ml10" disabled></el-input>
                            </span>
                            <span class="fr">
                                <span>延期角色</span>
                                <el-select v-model="startService.approvalRole" placeholder="设置延期角色" style="width: 150px;">
                                    <el-option v-for="(items, idx) in approvalRoleAll" :value="items.id" :label="items.name" :key="idx"></el-option>
                                </el-select>
                            </span>
                            <span class="fr mr10">
                                <span>延期时限(天)</span>
                                <el-input type="number" v-model.number="startService.timeLimit" placeholder="设置天数" style="width: 120px;"></el-input>
                            </span>
                        </div>
                        <div class="service-info-content-bottom">
                            <p class="content-top">
                                <span class="fl">服务事项</span>
                                <el-button class="fr" type="text" icon="el-icon-plus" @click="addInList('start', 'none')">新增</el-button>
                            </p>
                            <div class="content-bottom">
                                <el-table
                                    :data="startService.serviceModuleItemModelList"
                                    border
                                    style="width: 100%; text-align: center;">
                                    <el-table-column label='事项名'>
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.name" placeholder="事项名" disabled></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='事项操作'>
                                        <template slot-scope="scope">
                                            <p v-for="(ma, i) in scope.row.serviceModuleItemOperationList">{{ma.name}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='事项说明'>
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.remark" placeholder="事项说明"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='操作' width="60" style="text-align: center;">
                                        <template slot-scope="scope">
                                            <el-button type="text" style="color: #FF6869;" @click="deleteInList('start', '', scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </li>

                    <!-- 添加的流程 -->
                    <li class="service-info-content" v-for="(item, i) in serviceModuleModelList" :key="i" v-if="params.detail ? (item.name !== '开始服务' && item.name !== '服务周期' && item.name !== '结束服务') : true">
                        <div class="service-info-content-top">
                            <div class="fl" style="width: 100%; height: 25px;padding-right: 20px;">
                                <!-- <el-button class="fr" style="color: #FF6869;" type="text" icon="el-icon-delete" @click="deleteOutList(i)">删除流程</el-button> -->
                                <img class="service-info-content-top-delete" src="../../../../assets/icon/delete.png" alt="" @click="deleteOutList(i)">
                            </div>
                            <span class="fl">
                                <img src="../../../../assets/icon/sevice-wujiaoxing.png" alt="">
                                <span>流程名称</span>
                                <el-input v-model="item.name" placeholder="请输入流程名称" style="width: 200px;" class="ml10"></el-input>
                            </span>
                            <span class="fr">
                                <span>延期角色</span>
                                <el-select v-model="item.approvalRole" placeholder="设置延期角色" style="width: 150px;">
                                    <el-option v-for="(items, idx) in approvalRoleAll" :value="items.id" :label="items.name" :key="idx"></el-option>
                                </el-select>
                            </span>
                            <span class="fr mr10">
                                <span>延期时限(天)</span>
                                <el-input type="number" v-model.number="item.timeLimit" placeholder="设置天数" style="width: 120px;"></el-input>
                            </span>
                        </div>
                        <div class="service-info-content-bottom">
                            <p class="content-top">
                                <span class="fl">服务事项</span>
                                <el-button class="fr" type="text" icon="el-icon-plus" @click="addInList('center', i)">新增</el-button>
                            </p>
                            <div class="content-bottom">
                                <el-table
                                    :data="item.serviceModuleItemModelList"
                                    border
                                    style="width: 100%; text-align: center;">
                                    <el-table-column label='事项名'>
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.name" placeholder="事项名" disabled></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='事项操作'>
                                        <template slot-scope="scope">
                                          <p v-for="(ma, i) in scope.row.serviceModuleItemOperationList">{{ma.name}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='事项说明'>
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.remark" placeholder="事项说明"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='操作' width="60" style="text-align: center;">
                                        <template slot-scope="scope">
                                            <el-button type="text" style="color: #FF6869;" @click="deleteInList('center', i, scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span><el-button type="success" plain icon="el-icon-plus" style="width: 550px;" @click="addOutList">添加流程</el-button></span>
                    </li>
<!--                    <li>
                        <span class="fixed-title"><img src="../../../../assets/icon/sevice-wujiaoxing.png" alt=""> 结束服务</span>
                    </li> -->

                    <!-- 固定结束服务 -->
                    <li class="service-info-content">
                        <div class="service-info-content-top">
                            <span class="fl">
                                <img src="../../../../assets/icon/sevice-wujiaoxing.png" alt="">
                                <span>流程名称</span>
                                <el-input v-model="endService.name" placeholder="请输入流程名称" style="width: 200px;" class="ml10" disabled></el-input>
                            </span>
                            <span class="fr">
                                <span>延期角色</span>
                                <el-select v-model="endService.approvalRole" placeholder="设置延期角色" style="width: 150px;">
                                    <el-option v-for="(items, idx) in approvalRoleAll" :value="items.id" :label="items.name" :key="idx"></el-option>
                                </el-select>
                            </span>
                            <span class="fr mr10">
                                <span>延期时限(天)</span>
                                <el-input type="number" v-model.number="endService.timeLimit" placeholder="设置天数" style="width: 120px;"></el-input>
                            </span>
                        </div>
                        <div class="service-info-content-bottom">
                            <p class="content-top">
                                <span class="fl">服务事项</span>
                                <el-button class="fr" type="text" icon="el-icon-plus" @click="addInList('end', 'none')">新增</el-button>
                            </p>
                            <div class="content-bottom">
                                <el-table
                                    :data="endService.serviceModuleItemModelList"
                                    border
                                    style="width: 100%; text-align: center;">
                                    <el-table-column label='事项名'>
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.name" placeholder="事项名" disabled></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='事项操作'>
                                        <template slot-scope="scope">
                                            <p v-for="(ma, i) in scope.row.serviceModuleItemOperationList">{{ma.name}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='事项说明'>
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.remark" placeholder="事项说明"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='操作' width="60" style="text-align: center;">
                                        <template slot-scope="scope">
                                            <el-button type="text" style="color: #FF6869;" @click="deleteInList('end', '', scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="process-btn" @click="onSubmit">保存</p>
        </el-scrollbar>

        <!-- 新增事项弹框 -->
        <el-dialog
            title="新增事项"
            :append-to-body="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="addMatterdialog"
            width="800px"
            center>
            <div style="min-height: 100px; max-height: 500px; overflow-y: scroll;">
                <el-checkbox-group v-model="selectedMatter" size="mini">
                    <el-checkbox v-for="(item, i) in matterAll" :key="i" :label="item.name" border class="mb10"></el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMatterdialog = false">取 消</el-button>
                <el-button type="primary" @click="subAddMatterList">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    import workOrder from './addWorkOrder'
    import { mapState, mapMutations  } from 'vuex'

    export default {
        data () {
            return {
                isAdd: true,                       //新增还是编辑
                addMatterdialog: false,            //是否显示新增事项弹框
                inListType: '',
                inListIndex: '',
                matterAll: [],                     //所有事项
                selectedMatter: [],                //已选择的事项
                startService: {                    //固定开始服务
                    name: '开始服务',                    //流程名称
                    approvalRole: '',                   //延期角色
                    timeLimit: '',                      //延期时限
                    serviceModuleItemModelList: [],     //开始服务的服务事项
                    selected: true,
                },
                endService: {                      //固定结束服务
                    name: '结束服务',                    //流程名称
                    approvalRole: '',                   //延期角色
                    timeLimit: '',                      //延期时限
                    serviceModuleItemModelList: [],     //结束服务的服务事项
                    selected: false,
                },
                addForm: {
                    serviceTypeId: '',             //名称
                    serviceManagerType: '',        //管家类型
                    commissionType: '',            //佣金比例类型
                    commissionProportion: '',      //佣金返多少
                    timeLimit: '',                 //工单服务时限
                    process: '',                   //工单流程类型
                },
                serviceModuleModelList: [],        //流程list
                managerAll: [],                    //所有管家
                approvalRoleAll: [                 //所有角色
                    {
                        id: 1,
                        name: '客户'
                    }, {
                        id: 2,
                        name: '部门主管'
                    }, {
                        id: 3,
                        name: '自动'
                    }
                ],
                operationAll: [
                    {
                        id: 1,
                        name: '上传成果'
                    }
                ]
            }
        },
        created () {
            this.getServiceMtters();
            if(this.params.detail) { //编辑
                this.isAdd = false;
                this.addForm = this.params.detail;
                this.serviceModuleModelList = this.params.detail.serviceModuleModelList;
                let _hasHead = 0, _hasFouter = 0;
                this.serviceModuleModelList.forEach(mo => {
                    if(mo.name === '开始服务' || mo.name === '服务周期') {
                        this.startService = mo;
                    }else if (mo.name === '结束服务') {
                        this.endService = mo;
                    }
                })
                // if(_hasHead) this.serviceModuleModelList.splice(0, 1);
                // if(_hasFouter) this.serviceModuleModelList.splice(this.serviceModuleModelList.length - 1, 1);
            }
        },
        props: ['params'],
        mounted () {},
        methods: {
            // 选择工单流程类型时
            selectProessType () {
              let type = this.addForm.process;
              if(type == 3) {
                this.startService.name = '服务周期'
              }else {
                this.startService.name = '开始服务'
              }
            },
            // 添加流程
            addOutList () {
                this.serviceModuleModelList.push({name: '', timeLimit: '', approvalRole: '', serviceModuleItemModelList: [], selected: false})
                console.log(this.serviceModuleModelList)
            },
            // 添加流程内的服务事项
            addInList (type, num) {
                this.selectedMatter = [];
                this.inListType = type;
                this.inListIndex = num;
                this.addMatterdialog = true;
                // this.serviceModuleModelList[num].serviceModuleItemModelList.push({name: '', remark: '', operation: '', operationName: ''})
            },
            getServiceMtters () {
              API.zhuxinGoodsManage.getServiceMatters((data) => {
                if(data.status) {
                  this.matterAll = data.data;
                }
              })
            },
            // 确认添加事项
            subAddMatterList () {
                // console.log(this.selectedMatter); return;
                if(!this.selectedMatter.length) return this.$message.warning('请选择要添加的事项');
                let _list = this.matterAll;
                let _type = this.inListType, _index = this.inListIndex;
                switch (_type) {
                    case 'center':
                        this.selectedMatter.forEach(select => {
                          this.matterAll.forEach(matter => {
                            if(select === matter.name) {
                              this.serviceModuleModelList[_index].serviceModuleItemModelList.push({name: matter.name, id: matter.id, remark: '', serviceModuleItemOperationList: matter.serviceModuleItemOperationList})
                            }
                          })
                        })
                        this.addMatterdialog = false;
                        break;
                    case 'start':
                        this.selectedMatter.forEach(select => {
                          this.matterAll.forEach(matter => {
                            if(select === matter.name) {
                              this.startService.serviceModuleItemModelList.push({name: matter.name, id: matter.id, remark: '', serviceModuleItemOperationList: matter.serviceModuleItemOperationList})
                            }
                          })
                        })
                        this.addMatterdialog = false;
                        break;
                    case 'end':
                        this.selectedMatter.forEach(select => {
                          this.matterAll.forEach(matter => {
                            if(select === matter.name) {
                              this.endService.serviceModuleItemModelList.push({name: matter.name, id: matter.id, remark: '', serviceModuleItemOperationList: matter.serviceModuleItemOperationList})
                            }
                          })
                        })
                        this.addMatterdialog = false;
                        break;
                    default:
                        break;
                }
            },
            // 删除流程
            deleteOutList (num) {
                this.serviceModuleModelList.splice(num, 1);
            },
            // 删除服务事项
            deleteInList (type, num, nums) {
                switch (type) {
                    case 'center':
                        this.serviceModuleModelList[num].serviceModuleItemModelList.splice(nums, 1);
                        break;
                    case 'start':
                        this.startService.serviceModuleItemModelList.splice(nums, 1)
                        break;
                    case 'end':
                        this.endService.serviceModuleItemModelList.splice(nums, 1)
                        break;
                    default:
                        break;
                }
            },
            // 选择事项操作
            selectOperation (row, ref) {
                let _name = this.$refs[ref][0].cachedOptions[0].label;
                row.operationName = _name;
            },
            // 保存
            onSubmit () {
                // 工单设置必填
                let message = !this.addForm.serviceTypeId && '请选择工单名称' ||
                              !this.addForm.serviceManagerType && '请选择工单管家类型' ||
                              !this.addForm.commissionType && '请选择佣金比例类型' ||
                              !this.addForm.commissionProportion && '请输入佣金比例' ||
                              !this.addForm.timeLimit && '请输入工单服务时限' ||
                              !this.addForm.process && '请选择工单服务环节类型' || null;
                if(message) return this.$message.warning(message);

                // 开始服务流程必填
                if(!this.startService.timeLimit) return this.$message.warning('请输入开始服务的延期时限');
                if(!this.startService.approvalRole) return this.$message.warning('请选择开始服务的延期角色');
                if(this.startService.serviceModuleItemModelList.length < 1) return this.$message.warning('请添加开始服务的服务事项');

                // 中间流程必填
                let _outName = 0, _times = 0, _role = 0, _inName = 0, _inOpation = 0, _hasInProsess = 0;
                if(this.serviceModuleModelList.length) {
                    this.serviceModuleModelList.forEach(out => {
                        if(!out.name) return _outName = 1;
                        if(!out.timeLimit) return _times = 1;
                        if(!out.approvalRole) return _role = 1;
                        if(out.serviceModuleItemModelList.length) {
                            out.serviceModuleItemModelList.forEach(isin => {
                                if(!isin.name) return _inName = 1;
                                if(!isin.serviceModuleItemOperationList) return _inOpation = 1;
                            })
                        }else {
                            return _hasInProsess = 1
                        }
                    })

                }
                let messages = _outName && '请完善流程名称' ||
                               _times && '请完善延期时限' ||
                               _role && '请完善延期角色' ||
                               _hasInProsess && '请完善流程服务事项' || null;
                if(messages) return this.$message.warning(messages);

                // 结束服务流程必填
                if(!this.endService.timeLimit) return this.$message.warning('请输入结束服务的延期时限');
                if(!this.endService.approvalRole) return this.$message.warning('请选择结束服务的延期角色');
                if(this.endService.serviceModuleItemModelList.length < 1) return this.$message.warning('请添加结束服务的服务事项');

                if(this.params.detail) {
                  // 去除首尾
                  this.serviceModuleModelList.splice(0, 1);
                  this.serviceModuleModelList.splice(this.serviceModuleModelList.length - 1, 1);
                }
                // 设置固定流程开始服务和结束服务
                this.serviceModuleModelList.unshift(this.startService)
                this.serviceModuleModelList.push(this.endService)

                this.addForm.serviceModuleModelList = this.serviceModuleModelList;
                // console.log(this.addForm); return;
                this.$vDialog.close({type: this.isAdd ? 'save' : 'edit', params: this.addForm, idx: this.params.index})
            },
        }
    }
</script>

<style scoped>
   .workOrder >>> .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .workOrder >>> .el-table {
        background-color: none !important;
    }
    .workOrder >>> .el-table th {
        background-color: none !important;
        text-align: center !important;
    }
    .workOrder >>> .el-table tr {
        background-color: none !important;
        text-align: center !important;
    }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../styles/commons";
    @import "../../../../styles/stepCommon";
    .workOrder {
        width: 100%;
        height: 100%;
        padding: 15px;
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
                font-weight: normal;
                margin-left: 5px;
            }
        }
        .com-titles:after {
            border: 0;
        }
        .service-info {
            margin: 20px 0;
            ul {
                li {
                    text-align: center;
                    margin-bottom: 30px;
                    .fixed-title {
                        font-size: 14px;
                        color: #333E48;
                        font-weight: bold;
                        margin-left: 5px;
                        img {
                            vertical-align: text-top;
                        }
                    }
                }
                .service-info-content {
                    width: 100%;
                    padding: 15px 0;
                    background: #FAFAFA;
                    position: relative;
                    .service-info-content-top {
                        padding: 0 15px 10px 15px;
                        // height: 50px;
                        line-height: 50px;
                        color: #333E48;
                        font-size: 14px;
                        border-bottom: 1px dashed #E1E1E1;
                        overflow: hidden;
                        img {
                            vertical-align: text-top;
                        }
                        .service-info-content-top-delete {
                            position: absolute;
                            top: 0;
                            right: 0;
                            cursor: pointer;
                        }
                    }
                    .service-info-content-bottom {
                        padding: 0 15px;
                        .content-top {
                            overflow: hidden;
                            padding: 10px 0;
                            color: #333E48;
                            font-size: 14px;
                        }
                        .content-bottom {

                        }
                    }
                }
            }
        }
        .process-btn {
            width: 220px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            background: #4BCF99;
            font-size: 14px;
            margin: 20px auto;
            cursor: pointer;
            border-radius: 4px;
        }
    }
</style>
