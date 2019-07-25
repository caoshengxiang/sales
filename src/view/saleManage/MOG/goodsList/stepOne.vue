<template>
    <div class='step-content'>
        <div class='stepOne-head'>
            <div class="fl">
                <span class='stepOne-head-title'>产品定价方式</span>
                <el-radio v-model="stepOne.pricingMethod" :label="1">标准定价</el-radio>
                <el-radio v-model="stepOne.pricingMethod" :label="2">非标准定价</el-radio>
            </div>
            <div class="fr">
                <span class='stepOne-head-title-fr'>设置购买限制:</span>
                <el-input placeholder="下限" class='w80' type="number" v-model.number="stepOne.lowerLimit"></el-input>
                <span class="stepOne-head-line">——</span>
                <el-input placeholder="上限" class='w80' type="number" v-model.number="stepOne.upperLimit"></el-input>
            </div>
        </div>
        <div class="stepOne-contents">
            <div class="divPosition">
                <p class="com-titles"><img src="../../../../assets/icon/spgl_cpgg.png" alt="" class="mr10" style="vertical-align: text-top;">产品规格 <span class='stepOne-contents-spectitle'>({{stepOne.pricingMethod === 1 ? ' 标准商品服务费 ' : ' 非标准商品基础服务费 '}})</span></p>
                <p class='ml20' v-if="stepOne.pricingMethod === 1">
                    <el-checkbox v-model="stepOne.stageCharge">支持分阶段收款</el-checkbox>
                </p>
                <p class="stepOne-selectSpec">
                    <el-select v-model="spec" multiple placeholder="选择组合条件(多选)" style="width: 100%;" filterable @change="selectSpec" @remove-tag="removeSpec">
                        <el-option v-for="(item, idx) in specAll" :value="item.id" :label="item.name" :key="idx" :disabled="item.dis"></el-option>
                    </el-select>
                </p>
                <div>
                    <el-table
                        ref="multipleTable"
                        border
                        stripe
                        :data="stepOne.goodsRegionList"
                        style="width: 100%; margin-bottom: 10px;">
                        <el-table-column align="center" :width="goodsRegionSpecificationsList.length > 0 ? '600' : ''" label="地区">
                            <template slot-scope="scope">
                                <p>
                                    <el-tag class="mr10 mb5" type="info" v-for="(item, ins) in scope.row.allArea" :key="item.name" closable @close="handleAreaClose(item, ins, scope.$index)">{{item.name}}</el-tag>
                                </p>
                                <AreaSelect :ref="'areaSe' + scope.$index"
                                    style="margin-top: 10px;"
                                    area='请选择地区'
                                    @change="areaSelectedOptionsHandleChange($event, 'areaSe' + scope.$index)"
                                    @visibleChange="hideVisibleChange($event, 'areaSe' + scope.$index, scope)"
                                    :needClick="true"
                                    :selectLastLevelMode="false"></AreaSelect>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="(item, ind) in goodsRegionSpecificationsList" align="center" width="150" :label="item.goodsSpecificationsName" :key="ind">
                            <template slot-scope="scope">
                                <span>
                                   <el-select v-model="scope.row.goodsRegionSpecificationsList[ind].specificationsId" placeholder="请选择(单选)" clearable filterable style="width: 100%;">
                                        <el-option v-for="(spe, idxs) in scope.row.goodsRegionSpecificationsList[ind].spec" :key="idxs" :value="spe.id" :label="spe.name"></el-option>
                                    </el-select>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="价格" width="120">
                            <template slot-scope="scope">
                                <el-input type="number" placeholder="请输入" v-model="scope.row.price"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" @click="copySpecLine(scope.row)">复制</el-button>
                                <el-button type="text" style="color: red;" @click="deleteSpecLine(scope)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="success" plain icon="el-icon-plus" @click="addSpecLine" size="mini">新增</el-button>
                </div>
            </div>
            <div class='step-achievements divPosition' v-if="stepOne.pricingMethod === 2">
                <p class="com-titles"><img src="../../../../assets/icon/spgl_cgfwf.png" alt="" class="mr10" style="vertical-align: text-top;">成果服务费</p>
                <p class='ml20'>
                    <el-checkbox v-model="stepOne.proportionalCharge">支持比例收费 <span class='stepOne-contents-spectitle'>( 成果费 )</span></el-checkbox>
                </p>
                <p class='ml20 mt15' v-if="stepOne.proportionalCharge">
                    <span>成果名称</span>
                    <el-input class='ml10' v-model="stepOne.achievementName" placeholder="请输入成果名称" style='width: 250px;'></el-input>
                    <span class="ml40">成果说明</span>
                    <el-input class='ml10' v-model="stepOne.achievementRemark" placeholder="请输入成果说明" style="width: calc(100% - 440px);"></el-input>
                </p>
                <p class='ml20 mt15'>
                    <el-checkbox v-model="stepOne.disposableCharge">支持包干价收费 <span class='stepOne-contents-spectitle'>( 成果费 )</span></el-checkbox>
                    <el-checkbox v-if="stepOne.disposableCharge" class="ml20" v-model="stepOne.stageCharge">支持分阶段收款</el-checkbox>
                </p>
            </div>
            <div class='step-achievements divPosition'>
                <p class="com-titles"><img src="../../../../assets/icon/spgl_qtfy.png" alt="" class="mr10" style="vertical-align: text-top;">其他费用 <span class='stepOne-contents-spectitle'>( 例如：代收代支 )</span></p>
                <el-table
                    ref="multipleTable"
                    border
                    stripe
                    :data="stepOne.goodsOtherCostList"
                    style="width: 100%; margin-bottom: 10px;">
                    <el-table-column align="center" label="费用名称">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="费用额">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.price" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="收费条件">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.conditions" placeholder="请选择" style="width: 100%;">
                                <el-option :value="1" label="一次收费,与购买数量无关"></el-option>
                                <el-option :value="2" label="多次收费,,与购买数量一致"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="费用说明" width="200px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.remark" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" style="color: red;" @click="deleteOtherCost(scope)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="success" size="mini" plain icon="el-icon-plus" @click="addOtherCost">新增</el-button>
            </div>
        </div>
        <p class='stepOne-sub' @click="goDownStep(2)">下一步</p>
    </div>
</template>

<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    import { mapState, mapMutations  } from 'vuex'

    export default {
        data () {
            return {
                reg: /^([1-9][0-9]*)$/,
                stepOne: {
                    pricingMethod: 1,                  //定价方式
                    upperLimit: '',                    //购买上限值
                    lowerLimit: 1,                     //购买下限值
                    stageCharge: 0,                    //分阶段收款 1/是 0/否
                    proportionalCharge: 0,             //是否支持比例收费 1/是 0/否
                    achievementName: '',               //成果名称
                    achievementRemark: '',             //成果说明
                    disposableCharge: 0,               //是否支持包干价收费   1/是 0/否
                    goodsRegionList: [],               //整体规格List
                    goodsOtherCostList: [],            //其他费用
                },
                goodsRegionSpecificationsList: [],     //列
                spec: [],                              //多选的规格
                specAll: [                             //全部规格
                ],
                arraySpec: [],
                allArea: [],                           //选择的所有城市
                regionList: [],
                deleteCol: false,                      //是否删除列
                deleteNum: '',                         //删除的哪一列
            }
        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        watch: {
            'stepOne.pricingMethod' (type) {                //定价方式改变时清除一些数据
                if(!webStorage.getItem('stepOne'))  {
                    // this.stepOne.stageCharge = 0;
                    if(type === 1) {
                        this.stepOne.proportionalCharge = 0;
                        this.stepOne.achievementName = '';
                        this.stepOne.achievementRemark = '';
                        this.stepOne.disposableCharge = 0;
                    }
                }
            },
        },
        created () {
            this.getProductTypeSearch()
            let detail = ~~this.$route.query.detail;
            let one = webStorage.getItem('stepOne');
            if(one) {
                this.stepOne = JSON.parse(JSON.stringify(one));
                this.goodsRegionSpecificationsList = JSON.parse(JSON.stringify(this.stepOne.goodsRegionList[0].goodsRegionSpecificationsList));
                if(this.goodsRegionSpecificationsList.length) {
                    this.goodsRegionSpecificationsList.forEach(a => {
                        if(detail) {
                          a.goodsSpecificationsName = a.specificationsTypeName ? a.specificationsTypeName : a.goodsSpecificationsName;
                          a.goodsSpecificationsId = a.specificationsTypeId ? a.specificationsTypeId : a.goodsSpecificationsId;
                          this.spec.push(a.goodsSpecificationsId)
                          return;
                        }
                        this.spec.push(a.goodsSpecificationsId)
                    })
                }
            }else {
              // 如果是编辑
              if(detail) {
                this.stepOne.pricingMethod = this.detail.pricingMethod ? this.detail.pricingMethod : 1;
                this.stepOne.upperLimit = this.detail.upperLimit;
                this.stepOne.lowerLimit = this.detail.lowerLimit ? this.detail.lowerLimit : 1;
                this.stepOne.proportionalCharge = this.detail.proportionalCharge;
                this.stepOne.achievementName = this.detail.achievementName;
                this.stepOne.achievementRemark = this.detail.achievementRemark;
                this.stepOne.disposableCharge = this.detail.disposableCharge;
                this.stepOne.stageCharge = this.detail.stageCharge;
                this.stepOne.goodsOtherCostList = this.detail.goodsOtherCostList
                // 规格组合
                if(this.detail.goodsRegionList.length) {
                  this.detail.goodsRegionList[0].goodsRegionSpecificationsList.forEach(spec => {
                    this.spec.push(spec.specificationsTypeId)
                  })
                  setTimeout(() => {
                    this.setEditSpec(this.detail);
                  }, 500)
                }
              }
            }

            setTimeout(() => {
              console.log('')
              this.spec.forEach(sp => {
                this.specAll.forEach(spa => {
                  if(sp == spa.id) {
                    this.$set(spa, 'dis', true);
                  }
                })
              })
            }, 500)
        },
        mounted () {},
        methods: {
            ...mapMutations('constData', [
                'mut_addProductStatus',
            ]),
            // 获取产品规格类型
            getProductTypeSearch () {
                API.zhuxinGoodsManage.addProductTypeSearch((data) => {
                    if(data.status) {
                        this.specAll = data.data;
                    }
                })
            },
            // 数组排序
            sortKey (array,key) {
                 return array.sort(function(a,b){
                     var x = a[key];
                     var y = b[key];
                     return ((x<y)?-1:(x>y)?1:0)
                 })
            },
            // 编辑时组合规格数据
            setEditSpec (data) {
              data = JSON.parse(JSON.stringify(data));
              if(data.goodsRegionList.length > 0) {
                if(data.goodsRegionList[0].goodsRegionSpecificationsList.length > 0) {
                  data.goodsRegionList[0].goodsRegionSpecificationsList.forEach((a, i) => {
                    API.zhuxinGoodsManage.addProductTypeSearchSpec(a.specificationsTypeId, (data) => {
                        this.arraySpec = data.data;
                        // 本地显示增加列
                        this.goodsRegionSpecificationsList.push({goodsSpecificationsName: a.specificationsTypeName, goodsSpecificationsId: a.specificationsTypeId, specificationsTypeId: a.specificationsTypeId, level: i+1, specificationsId: a.specificationsId, spec: this.arraySpec})
                        this.sortKey(this.goodsRegionSpecificationsList, 'level')
                        // 提交数据每一行都添加添加的列
                        let hasList = JSON.parse(JSON.stringify(this.stepOne.goodsRegionList));
                        if(hasList.length > 0) {
                            hasList.forEach(has => {
                                this.$set(has, 'goodsRegionSpecificationsList', JSON.parse(JSON.stringify(this.goodsRegionSpecificationsList)));
                            })
                        }
                    })
                  })
                }


                data.goodsRegionList.forEach((goods, i) => {
                  if(goods.goodsRegionSpecificationsList.length) {
                    goods.price = goods.goodsRegionSpecificationsList[goods.goodsRegionSpecificationsList.length - 1].price
                  }
                  goods.allArea = [];
                  if(this.regionList.length < 1) {
                    this.regionList.push(goods)
                    this.regionList[0].allArea = [{name: (this.regionList[0].provinceName ? this.regionList[0].provinceName : '') + (this.regionList[0].cityName ? '/' + this.regionList[0].cityName : '') + (this.regionList[0].areaName ? '/' + this.regionList[0].areaName : ''), provinceId: this.regionList[0].provinceId, provinceName: this.regionList[0].provinceName, cityId: this.regionList[0].cityId, cityName: this.regionList[0].cityName, areaId: this.regionList[0].areaId, areaName: this.regionList[0].areaName}]
                  }else {
                    let _is = 0;
                    this.regionList.forEach(reg => {
                      if(goods.groupId === reg.groupId) {
                        _is = 1
                      }
                    })
                    if(!_is) {
                      goods.allArea = [{name: (goods.provinceName ? goods.provinceName : '') + (goods.cityName ? '/' + goods.cityName : '') + (goods.areaName ? '/' + goods.areaName : ''), provinceId: goods.provinceId, provinceName: goods.provinceName, cityId: goods.cityId, cityName: goods.cityName, areaId: goods.areaId, areaName: goods.areaName}]
                      this.regionList.push(goods)
                    }else {
                      this.regionList.forEach(regs => {
                        if(regs.groupId === goods.groupId) {
                          regs.allArea.push({name: (goods.provinceName ? goods.provinceName : '') + (goods.cityName ? '/' + goods.cityName : '') + (goods.areaName ? '/' + goods.areaName : ''), provinceId: goods.provinceId, provinceName: goods.provinceName, cityId: goods.cityId, cityName: goods.cityName, areaId: goods.areaId, areaName: goods.areaName});
                        }
                      })
                    }
                  }
                })

                if(this.regionList.length) {
                  this.regionList.forEach(a => {
                    if(a.goodsRegionSpecificationsList.length) {
                      a.goodsRegionSpecificationsList.forEach(b => {
                        API.zhuxinGoodsManage.addProductTypeSearchSpec(b.specificationsTypeId, (data) => {
                          this.$set(b, 'spec', JSON.parse(JSON.stringify(data.data)))
                        })
                      })
                    }
                  })
                }
                this.stepOne.goodsRegionList = this.regionList;
              }
            },
            // 下一步
            goDownStep (step) {
                let message = (this.stepOne.lowerLimit < 1) && '购买下限需大于0的整数' ||
                              (this.stepOne.upperLimit === 0) && '购买上限需大于0的整数' ||
                              (this.stepOne.upperLimit < this.stepOne.lowerLimit && (this.stepOne.upperLimit > 0)) && '购买上限需大于或等于购买下限' || null;
                let hasArea = 0, hasSpec = 0, hasPrice = 0;
                if(this.stepOne.goodsRegionList.length) {
                    this.stepOne.goodsRegionList.forEach(a => {
                        if(!a.allArea.length) hasArea = 1;
                        if(!a.price) hasPrice = 1;
                        if(a.goodsRegionSpecificationsList.length) {
                            a.goodsRegionSpecificationsList.forEach(b => {
                                if(!b.specificationsId) {
                                    hasSpec = 1;
                                }
                            })
                        }
                    })
                }
                if(message) return this.$message.warning(message);
                if(!this.goodsRegionSpecificationsList.length && !this.stepOne.goodsRegionList.length) return this.$message.warning('请添加产品规格行列');
                if(this.goodsRegionSpecificationsList.length && !this.stepOne.goodsRegionList.length) return this.$message.warning('请添加产品规格行');
                if(!this.goodsRegionSpecificationsList.length && this.stepOne.goodsRegionList.length) return this.$message.warning('请添加产品规格列');
                if(hasArea) return this.$message.warning('请完善产品规格地区');
                if(hasSpec) return this.$message.warning('请完善产品规格');
                if(hasPrice) return this.$message.warning('请完善产品规格价格');
                if(this.stepOne.pricingMethod == 2 && this.stepOne.proportionalCharge && !this.stepOne.achievementName) return this.$message.warning('请输入成果名称');
                if(this.stepOne.pricingMethod == 2 && this.stepOne.proportionalCharge && !this.stepOne.achievementRemark) return this.$message.warning('请输入成果说明');
                let hasPriceName = 0, hasPriceMon = 0, hasPriceType = 0;
                if(this.stepOne.goodsOtherCostList.length) {
                    this.stepOne.goodsOtherCostList.forEach(price => {
                        if(!price.name) hasPriceName = 1;
                        if(!price.price) hasPriceMon = 1;
                        if(!price.conditions) hasPriceType = 1;
                    })
                }
                if(hasPriceName) return this.$message.warning('请完善其他费用名称');
                if(hasPriceMon) return this.$message.warning('请完善其他费用的费用额');
                if(hasPriceType) return this.$message.warning('请完善其他费用的收费条件');

                let detail = ~~this.$route.query.detail;
                if(detail) {
                  if (this.stepOne.goodsRegionList.length) {
                    this.stepOne.goodsRegionList.forEach(ar => {
                      delete ar.areaId;
                      delete ar.areaModelList;
                      delete ar.areaName;
                      delete ar.cityId;
                      delete ar.cityName;
                      delete ar.provinceId;
                      delete ar.provinceName;
                      delete ar.provinceName;
                    })
                  }
                }
                // 如果不支持比例收费清空成果名称和说明
                if(!this.stepOne.proportionalCharge) {
                  this.stepOne.achievementName = '';
                  this.stepOne.achievementRemark = '';
                }
                // 非标准定价如果不支持包干价收费也就不支持分阶段收款
                if(this.stepOne.pricingMethod == 2 && !this.stepOne.disposableCharge) {
                  this.stepOne.stageCharge = false;
                }
                // console.log(this.stepOne); return;
                this.mut_addProductStatus(step);                 //设置步骤
                webStorage.setItem('stepOne', this.stepOne);     //设置第一步缓存
                this.$router.push({name: 'addGoods', query: {detail: detail, step: step}})
            },
            // 删除规格类型多选时
            removeSpec (value) {
              this.deleteCol = true;
              this.deleteNum = ~~value;
            },
            // 选择组合条件增加列
            selectSpec (valueList) {
                if(valueList.length < 1) {
                  this.goodsRegionSpecificationsList = [];
                  if(this.stepOne.goodsRegionList.length > 0) {
                    this.stepOne.goodsRegionList.forEach(row => {
                      row.goodsRegionSpecificationsList = []
                    })
                  }
                  this.specAll.forEach(n => {
                    this.$set(n, 'dis', false);
                  })
                  return;
                }
                let _list = this.specAll;
                // this.goodsRegionSpecificationsList = [];
                _list.forEach(a => {
                    this.$set(a, 'dis', false);
                    valueList.forEach((b, i) => {
                        if(b === a.id) {
                            this.$set(a, 'dis', true);
                            API.zhuxinGoodsManage.addProductTypeSearchSpec(b, (data) => {
                                this.arraySpec = data.data;
                                // 本地显示增加列
                                // this.goodsRegionSpecificationsList.push({goodsSpecificationsName: a.name, goodsSpecificationsId: a.id, level: i+1, specificationsId: '', spec: this.arraySpec})
                                // this.sortKey(this.goodsRegionSpecificationsList, 'level');
                                // // 提交数据每一行都添加添加的列
                                // let hasList = this.stepOne.goodsRegionList;
                                // if(hasList.length > 0) {
                                //     hasList.forEach(has => {
                                //         this.$set(has, 'goodsRegionSpecificationsList', JSON.parse(JSON.stringify(this.goodsRegionSpecificationsList)));
                                //     })
                                // }
                                if(this.deleteCol) {
                                  let num = this.deleteNum;
                                  this.goodsRegionSpecificationsList.forEach((gos, idx) => {
                                    if(num == gos.goodsSpecificationsId) {
                                      this.goodsRegionSpecificationsList.splice(idx, 1);
                                    }
                                  })
                                  // this.goodsRegionSpecificationsList.splice(num, 1);
                                  if(this.stepOne.goodsRegionList.length > 0) {
                                    this.stepOne.goodsRegionList.forEach(row => {
                                      row.goodsRegionSpecificationsList.forEach((rows, ids) => {
                                        if(num == rows.goodsSpecificationsId || num == rows.specificationsTypeId) {
                                          row.goodsRegionSpecificationsList.splice(ids, 1)
                                        }
                                      })
                                    })
                                  }
                                }else {
                                  if(i == (valueList.length - 1)) {
                                    this.goodsRegionSpecificationsList.push({goodsSpecificationsName: a.name, goodsSpecificationsId: a.id, level: this.goodsRegionSpecificationsList.length + 1, specificationsId: '', spec: this.arraySpec})
                                    if(this.stepOne.goodsRegionList.length > 0) {
                                      this.stepOne.goodsRegionList.forEach(row => {
                                        row.goodsRegionSpecificationsList.push({goodsSpecificationsName: a.name, goodsSpecificationsId: a.id, level: row.goodsRegionSpecificationsList.length + 1, specificationsId: '', spec: this.arraySpec})
                                        this.sortKey(row.goodsRegionSpecificationsList, 'level');
                                      })
                                    }
                                    this.sortKey(this.goodsRegionSpecificationsList, 'level');
                                  }
                                }
                            })
                        }
                    })
                })
                this.deleteCol = false;
                this.deleteNum = '';
            },

            // 增加规格的行
            addSpecLine () {
                if(this.goodsRegionSpecificationsList.length > 0) {
                    this.goodsRegionSpecificationsList.forEach(a => {
                        a.specificationsId = '';
                    })
                }
                this.stepOne.goodsRegionList.push({allArea: [], price: '', groupId:'', goodsRegionSpecificationsList: JSON.parse(JSON.stringify(this.goodsRegionSpecificationsList))});
                this.setGroupId();
            },
            // 添加组id
            setGroupId () {
                if(this.stepOne.goodsRegionList.length) {
                    let item = 0;
                    for (item in this.stepOne.goodsRegionList) {
                        this.stepOne.goodsRegionList[item].groupId = ~~item + 1;
                        if(this.stepOne.goodsRegionList[item].goodsRegionSpecificationsList.length) {
                            this.stepOne.goodsRegionList[item].goodsRegionSpecificationsList.forEach(a => {
                                a.groupId = this.stepOne.goodsRegionList[item].groupId;
                            })
                        }
                    }
                }
            },
            // 删除规格的行
            deleteSpecLine (row) {
                this.stepOne.goodsRegionList.splice(row.$index, 1);
                this.setGroupId();
            },
            // 复制规格的行
            copySpecLine (row) {
                this.stepOne.goodsRegionList.push({allArea: JSON.parse(JSON.stringify(row.allArea)), price: row.price, groupId:row.groupId+1, goodsRegionSpecificationsList: JSON.parse(JSON.stringify(row.goodsRegionSpecificationsList))});
                this.setGroupId();
            },
            // 选择地区
            areaSelectedOptionsHandleChange (value, row) {},
            // 地区隐藏时
            hideVisibleChange (val, reName, row) {
                if(!val) {
                    let value = this.$refs[reName].getSelectedValue();
                    let name = this.$refs[reName].getSelectedName(value);
                    if(!value.length || !name.length) return;
                    let ids = value.join(), names = name.join('/'), message = false;
                    if(this.stepOne.goodsRegionList[row.$index].allArea.length) {
                        this.stepOne.goodsRegionList[row.$index].allArea.forEach(a => {
                            if(a.id === ids || a.name === names) {
                                message = true
                            }
                        })
                    }
                    if(message) return ;
                    let data = {
                        id: ids,
                        name: names,
                    };
                    this.stepOne.goodsRegionList[row.$index].allArea.push(data);
                }
            },
            // 删除地区
            handleAreaClose (item, i, index) {
                this.stepOne.goodsRegionList[index].allArea.splice(i, 1);
            },
            // 新增其他费用
            addOtherCost () {
                let data = {
                    name: '',              //费用名称
                    price: '',             //费用额
                    conditions: '',        //收费条件
                    remark: '',            //收费说明
                };
                this.stepOne.goodsOtherCostList.push(data);
            },
            // 删除其他费用
            deleteOtherCost (row) {
                this.stepOne.goodsOtherCostList.splice(row.$index, 1);
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../styles/commons";
    @import "../../../../styles/stepCommon";

    .fl {float: left;}
    .fr {float: right;}
  .divPosition {
      background: #fff;
      padding: 20px 15px 25px 15px;
  }
  .step-content {
      width: 100%;
      .stepOne-head {
          padding: 15px;
          width: 100%;
          overflow: hidden;
          .fr {
              margin-top: -5px;
              margin-right: 30px;
          }
          .stepOne-head-title {
              font-size: 15px;
              color: #333E48;
              font-weight: bold;
              margin-right: 50px;
          }
          .stepOne-head-title-fr {
              font-size: 13px;
              color: #333E48;
              font-weight: bold;
              margin-right: 5px;

          }
          .stepOne-head-line {
              color: #DFDFDF;
          }
          .w80 {width: 80px;}
      }
      .stepOne-contents {
          .ml20 {margin-left: 20px; color: #333E48;}
          .ml40 {margin-left: 40px; color: #333E48;}
          .ml10 {margin-left: 10px; color: #333E48;}
          .mt15 {margin-top: 15px;}
          .com-titles {
              font-size: 15px;
              font-weight: bold;
              color: #333E48;
              padding: 0 !important;
          }
          .com-titles:after {
              border: 0;
          }
          .com-titles:before {
              border: 0;
              width: 0;
              height: 0;
          }
          .stepOne-contents-spectitle {
              font-size: 13px;
              color: #999999;
              font-weight: normal;
              margin-left: 5px;
          }
          .stepOne-selectSpec {
              width: 100%;
              margin: 15px 0;
          }
          .step-achievements {
              margin-top: 9px;
          }
      }
      .stepOne-sub {
          width: 220px;
          height: 40px;
          color: #fff;
          line-height: 40px;
          text-align: center;
          margin: 50px auto;
          background: #4BCF99;
          font-size: 14px;
          border-radius: 4px;
          cursor: pointer;
      }
  }
</style>
<style scoped>
    .step-content >>> .el-tag--info {
        border: 0 !important;
    }
</style>
