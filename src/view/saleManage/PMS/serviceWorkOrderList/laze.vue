<template>
    <div class="com-dialog-container">
        <div class="com-dialog">
            <p class='laze-title'>请选择需要打烊的商品:</p>
            <div>
                <el-checkbox style='margin-bottom: 10px;margin-left: 25px;' v-model="all" v-if='list.length > 0' @change="checkedAll">全选</el-checkbox>
                <el-tree
                   ref='tree'
                  :data="list"
                  show-checkbox
                  :highlight-current="true"
                  :default-expand-all="true"
                  node-key="goodsId"
                  :default-checked-keys="defaultCheckedKeys"
                  :props="defaultProps">
                </el-tree>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
                <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    
    export default {
        data () {
            return {
                all: false,
                defaultProps: {
                    children: 'children',
                    label: 'goodsName',
                },
                list: [                     //数据
                ],                   
                defaultCheckedKeys: [],     //默认选中的
            }
        },
        watch: {
            
        },
        created () {
            this.getList();
        },
        mounted () {
            
        },
        props: ['params'],
        methods: {
            getList () {
                this.defaultCheckedKeys = [];
                API.workOrder.serverGoods({}, (res) => {
                    if(res.status) {
                        let data = res.data;
                        if(data != null) {
                            if(data.length > 0) {
                                this.list = data;
                                data.forEach(a => {
                                    if(a.state == 2) a.disabled = true;
                                    if(a.state == 2 || a.state == 3) {
                                        this.defaultCheckedKeys.push(a.goodsId);
                                    }
                                })
                            }
                        }
                    }
                })
            },
            // 全选
            checkedAll (type) {
                console.log(type)
                if(type) {
                    let _list = this.list;
                    this.defaultCheckedKeys = [];
                    if(_list.length > 0) {
                        _list.forEach(a => {
                            this.defaultCheckedKeys.push(a.goodsId)
                        })
                    }
                }else {
                    let _list = this.list, ids = [];
                    if(_list.length > 0) {
                        _list.forEach(a => {
                            if(a.state == 2) {
                                ids.push(a.goodsId)
                            }
                        })
                    };
                    this.$refs.tree.setCheckedKeys(ids);
                }
            },
            // 保存
            saveSubmitForm () {
                let check = this.$refs.tree.getCheckedNodes(), _list = [], need = 0;
                if(check.length > 0) {
                    check.forEach(a => {
                        if(a.state == null || a.state == 1 || a.state == 3) {
                            _list.push(a.goodsId)
                            if(a.needAudit) {
                                need = 1;
                            }
                        }
                    })
                };
                let params = {
                    ids: _list.join()
                };
                API.workOrder.closeDaYang(params, (data) => {
                    console.log(data)
                    if(data.status) {
                        let text = need ? '已提交审核' : '设置成功';
                        this.$message.success(text);
                        this.$vDialog.close({type: 'save'})
                    }
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../../styles/common";
    
    .laze-title {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 15px;
    }
</style>
