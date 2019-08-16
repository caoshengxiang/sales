<template>
    <div class="com-dialog-container" v-loading="dataLoading">
        <div class="com-dialog">
            <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
                <table class="com-dialog-table">
                    <tr>
                        <td class="td-title">客户名</td>
                        <td class="td-text">
                            <el-form-item v-if="params.type === 'confirmation'" prop="customerId">
                                <el-select
                                    :disabled="params.detailCustomersId ? true : false"
                                    filterable
                                    v-model.number="addForm.customerId"
                                    @change="selectedcustomer"
                                    placeholder="请选择或绑定客户"
                                    style="width: 100%"
                                >
                                    <el-option v-for="item in customersList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-else prop='customerId'>
                                <el-select
                                    :disabled="params.detailCustomersId ? true : false"
                                    filterable
                                    v-model.number="addForm.customerId"
                                    @change="selectedcustomer"
                                    placeholder="请选择客户"
                                    style="width: 100%"
                                >
                                    <el-option v-for="item in customersList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="td-title">需求来源</td>
                        <td class="td-text">
                            <el-cascader
                                style="width: 100%"
                                :change-on-select="selectLastLevelMode"
                                :options="chanceSourceType"
                                v-model="chanceSourceArr"
                                @active-item-change="chanceSourceChangeHandle"
                                @change="chanceSourceChangeHandle"
                                :props="props"
                                :placeholder="addForm.chanceSourceName"
                                :disabled="!!params.detail"
                            ></el-cascader>
                        </td>
                        <td class="td-title">需求提供人</td>
                        <td class="td-text">
                            <el-form-item prop="provider">
                                <el-select
                                    :disabled="(addForm.provider && params.type === 'confirmation') || params.fromChance ? true : false"
                                    v-model="addForm.provider"
                                    filterable
                                    clearable
                                    placeholder="请选择"
                                    style="width: 100%;"
                                >
                                    <el-option v-for="item in staffList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-title">需求公海</td>
                        <td class="td-text">
                            <el-form-item prop="chanceSeaId">
                                <el-select v-model.number="addForm.chanceSeaId" placeholder="请选择需求公海" style="width: 100%;">
                                    <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="td-title">客户需求</td>
                        <td class="td-text" colspan="3">
                            <el-form-item prop="intentProductIds">
                                <el-select
                                    v-model="addForm.intentProductIds"
                                    filterable
                                    multiple
                                    :multiple-limit="5"
                                    placeholder="请选择意向商品, 可多选, 数量<=5"
                                    style="width: 100%"
                                >
                                    <el-option v-for="item in intentProductList" :key="item.id" :label="item.goodsName" :value="item.goodsId"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-title">需求描述</td>
                        <td class="td-text" colspan="5">
                            <el-form-item prop="chanceRemark"><el-input type="text" v-model="addForm.chanceRemark"></el-input></el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="cancel-button" @click="$vDialog.close({ type: 'cancel' })">取 消</el-button>
                <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../../../../utils/api';
import webStorage from 'webStorage';
import { chartLengthRule } from '../../../../utils/const';

export default {
    name: 'addDialog',
    data() {
        return {
            dataLoading: false,
            addForm: {
                // 添加表单
                customerId: '',
                state: 2, // 阶段，默认
                intentProductIds: [], // 商品
                intentProductNames: [],
                chanceSeaId: '', // 需求公海
                chanceRemark: '',
                pageSource: 1, // 公海添加需求，传2. 其他传1
                chanceSource: '',
                provider: '' // 需求提供人
            },
            customersList: [],
            salesState: [],
            intentProductCateList: [],
            intentProductList: [],
            seaList: [], // 公海
            staffList: [], // 机构用户
            showList: [],
            rules: {
                customerId: [{ required: true, message: '请绑定客户', trigger: 'change' }],
                chanceSeaId: [{ required: true, message: '请选择需求公海', trigger: 'change' }],
                provider: [{ required: true, message: '请选择需求提供人', trigger: 'change' }],
                intentProductIds: [{ required: true, message: '请选择需求提供人', trigger: 'change' }]
            },
            chanceSourceType: [], // 客户来源
            chanceSourceArr: [],
            props: {
                value: 'id',
                label: 'codeName'
            },
            targetObj: null,
            selectLastLevelMode: true,
            area: ''
        };
    },
    props: ['params'],
    methods: {
        saveSubmitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.addForm.intentProductIds.length < 1) {
                        return this.$message({
                            type: 'error',
                            message: '请选择客户需求',
                            duration: 1500
                        });
                    }
                    // 根据商品id设置商品name
                    this.addForm.intentProductNames = [];
                    this.addForm.intentProductIds.forEach(ids => {
                        this.intentProductList.forEach(pro => {
                            if (ids == pro.goodsId) {
                                this.addForm.intentProductNames.push(pro.goodsName);
                            }
                        });
                    });
                    console.log(this.addForm);
                    // this.addForm.intentProductIds = JSON.stringify(this.addForm.intentProductIds);
                    // this.addForm.intentProductNames = JSON.stringify(this.addForm.intentProductNames);
                    this.dataLoading = true;
                    if (this.params.detail) {
                        // 编辑
                        API.salesOpportunities.confirm({ path: this.addForm.id, body: this.addForm }, data => {
                            if (data.status) {
                                this.$message.success('添加成功');
                                setTimeout(() => {
                                    this.dataLoading = false;
                                    this.$vDialog.close({ type: 'save' });
                                }, 500);
                            } else {
                                setTimeout(() => {
                                    this.dataLoading = false;
                                }, 500);
                            }
                        });
                    } else {
                        API.salesOpportunities.add(this.addForm, data => {
                            if (data.status) {
                                this.$message.success('添加成功');
                                setTimeout(() => {
                                    this.dataLoading = false;
                                    this.$vDialog.close({ type: 'save' });
                                }, 500);
                            } else {
                                setTimeout(() => {
                                    this.dataLoading = false;
                                }, 500);
                            }
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getCustomersList() {
            // 当前登陆用户所有的拥有团队成员权限的客户信息
            API.customer.teamAboutCustomerlist(null, data => {
                if (data.status) {
                    this.customersList = data.data;

                    // 客户详情快捷添加销售需求时默认有客户调取商品
                    // console.log(2, this.params.detailCustomersId)
                    if (this.params.detailCustomersId > 0) {
                        let _cate = '';
                        if (this.customersList.length > 0) {
                            let _list = this.customersList;
                            _list.forEach(a => {
                                if (this.params.detailCustomersId == a.id) {
                                    _cate = a.cate;
                                }
                            });
                        }
                        // console.log(1111, _cate)
                        let servicePrincipalType = _cate == 1 ? 'Person' : 'Company';
                        this.getIntentProductList({ goodsTypeId: null, goodsName: null, servicePrincipalType });
                    }
                }
            });
        },
        selectedcustomer(value) {
            //选择客户后
            let _id = value,
                _cate;
            this.customersList.forEach(a => {
                if (_id == a.id) {
                    _cate = a.cate;
                }
            });
            let servicePrincipalType = _cate == 1 ? 'Person' : 'Company';
            this.addForm.intentProductIds = [];
            // 新需求，没有分类
            this.getIntentProductList({ goodsTypeId: null, goodsName: null, servicePrincipalType });
        },
        getIntentProductCateList() {
            API.external.goodsTypeList(data => {
                this.intentProductCateList = data.content;
            });
        },
        getIntentProductList(p) {
            API.common.organizationGoodsConf(
                {
                    // 这个接口该来不调用外部接口
                    goodsTypeId: p.goodsTypeId,
                    goodsName: p.goodsName,
                    servicePrincipalType: p.servicePrincipalType,
                    organizationId: webStorage.getItem('userInfo').organizationId,
                    saleable: 1,
                    status: 1,
                    pullOff: false
                },
                data => {
                    //动态获取商品时如果是编辑会把原来选择过的一条商品信息加入，并进行去重，如果没有该商品则进行数组合并展示否则直接展示数据
                    let _new = data.data,
                        _old = this.showList,
                        isHas = 0;
                    if (_old.length > 0 && _new.length > 0) {
                        _new.forEach(a => {
                            _old.forEach(b => {
                                if (a.goodsId == b.goodsId) {
                                    isHas = 1;
                                }
                            });
                        });
                    } else {
                        isHas = 0;
                    }
                    if (isHas) {
                        this.intentProductList = _new;
                    } else {
                        this.intentProductList = [..._new, ..._old];
                    }
                }
            );
        },
        getConfigData(type, pCode) {
            API.common.codeConfig({ type: type, pCode: pCode }, data => {
                if (type === 2) {
                    this.levelList = data.data;
                } else if (type === 3) {
                } else if (type === 5) {
                    // let arr = data.data.map((item) => {
                    //   item.children = []
                    //   return item
                    // })
                    if (this.params.detail) {
                        // alert('确认需求')
                    } else {
                        if (this.chanceSourceType.length === 0) {
                            // this.chanceSourceType = arr
                            // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
                            // 其他模块中新增调取销售自建，
                            // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
                            this.chanceSourceType = [
                                {
                                    // 销售自建
                                    codeName: this.params.topSource[0].name,
                                    id: this.params.topSource[0].value,
                                    children: []
                                }
                            ];
                            // this.selectedBindValue.push(this.topSource[0].value)
                            this.chanceSourceArr.push(this.params.topSource[0].value);
                            this.chanceSourceChangeHandle([this.params.topSource[0].value]); // 默认获取第二级
                        }
                    }
                }
            });
        },
        chanceSourceChangeHandle(va) {
            this.getLastItem(this.chanceSourceType, va, 'id');
            API.common.codeConfig({ type: 5, pCode: va[va.length - 1] }, data => {
                // console.log('目标item:', this.targetObj)
                if (data.data.length) {
                    let arr = data.data.map(item => {
                        item.children = [];
                        return item;
                    });
                    this.targetObj.children = arr;
                } else {
                    this.targetObj.children = null;
                }
            });
            // console.log(va)
            this.addForm.chanceSource = va.join('-');
        },
        getLastItem(list, vals, key) {
            // 获取点击得目标对象, key 对应得 值vals 数组
            let LIST = list || [];
            // console.log(LIST, vals, key)
            for (let item of LIST) {
                if (item[key] === vals[vals.length - 1]) {
                    this.targetObj = item;
                    // this.selectedBindValue.push(item[key])
                    break;
                } else {
                    this.getLastItem(item.children, vals, key);
                }
            }
        },
        getSeaList() {
            // 需求公海
            API.salesOpportunitiesSea.listAboutCustomer(data => {
                this.seaList = data.data;
            });
        },
        getStaffList() {
            // 用户信息
            API.user.listOrgUser(data => {
                this.staffList = data.data;
            });
        }
    },
    created() {
        this.getCustomersList();
        // 新需求，没有分类
        // this.getIntentProductList({goodsTypeId: null, goodsName: null})
        this.salesState = this.params.salesState;

        if (this.params.detail) {
            // 编辑
            let servicePrincipalType = this.params.detail.customerCate == 1 ? 'Person' : 'Company';
            this.addForm = this.params.detail; // 需要根据分类id获取商品列表进行展示
            // 防止老数据可能选择的不是对应的商品而保存时获取商品id 动态添加一条商品信息
            this.showList = [{ goodsId: this.params.detail.intentProductId, goodsName: this.params.detail.intentProductName }];

            this.area = this.addF;
            // this.getIntentProductList({goodsTypeId: this.addForm.intentProductCate})
            this.getIntentProductList({ goodsTypeId: null, goodsName: null, servicePrincipalType });
        }
        if (this.params.stateValue) {
            // 设置默认2，销售阶段；[公海1]
            this.addForm.state = this.params.stateValue;
            this.addForm.pageSource = 2; // 公海添加需求，传2. 其他传1
        }
        if (this.params.detailCustomersId) {
            // 详细页面的添加, 并禁用下拉列表
            this.addForm.customerId = this.params.detailCustomersId;
        }
        // 来源
        this.getConfigData(5, 0);
        this.getSeaList();
        this.getStaffList();
    }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../../../styles/common';

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin: 0;
}
</style>
