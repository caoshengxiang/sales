<template>
  <div class="com-container" v-loading="dataLoading" element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, i) in pos" :key="i" :to="{name: item.toName, query: item.query ? item.query: ''}">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <span class='com-bar-left-title'>产品类型</span>
        <!--        <el-select placeholder="请选择产品类型" v-model="basicForm.goodsTypeId" clearable filterable>
          <el-option v-for="(item, i) in productType" :label="item.name" :value="item.id" :key="i"></el-option>
        </el-select> -->
        <el-cascader :change-on-select="true" class="ml10" :options="chanceSourceType" v-model="chanceSourceArr"
          @active-item-change="chanceSourceChangeHandle" @change="chanceSourceChangeHandle" :props="props" :disabled="~~$route.query.detail ? true : false"
          :placeholder="defaultPlaceholder">
        </el-cascader>
        <span class='ml100 com-bar-left-title'>产品名称</span>
        <el-input v-model="basicForm.goodsName" placeholder="请输入产品名称" :disabled="~~$route.query.detail ? true : false"
          class='ml10' style='width: 250px;'></el-input>
        <span class='ml100 com-bar-left-title'>产品返佣类别</span>
        <el-select v-model="basicForm.productType" placeholder="设置产品返佣类别" class="ml10" clearable>
          <el-option :value="1" label="A类产品（记账/托管）"></el-option>
          <el-option :value="2" label="A类产品（税务顾问/财税金融咨询）"></el-option>
          <el-option :value="3" label="B类标准化产品"></el-option>
          <el-option :value="4" label="B类定制化产品"></el-option>
        </el-select>
      </div>
      <div class="com-bar-right">
      </div>
    </div>
    <!-- content -->
    <div class='goods-content'>
      <div class='goods-content-left'>
        <ul>
          <li :class='(addProductStatus > 1 || addProductStatus === 1) ? "step-goodsAdd-cur" : "step-goodsAdd"' @click="jumpStep(1)">
            <span>
              <span class='step-goodsAdd-num'>1</span>
            </span>
            <span class='step-goodsAdd-name'>产品定价与收费方式</span>
            <span :class='addProductStatus === 1 ? "step-goodsAdd-img-cur" : "step-goodsAdd-img"'>
              <img src="../../../../assets/icon/white-sanjiao.png" alt="">
            </span>
          </li>
          <li :class='(addProductStatus > 2 || addProductStatus === 2) ? "step-goodsAdd-cur" : "step-goodsAdd"' @click="jumpStep(2)">
            <span>
              <span class='step-goodsAdd-num'>2</span>
            </span>
            <span class='step-goodsAdd-name'>协议管理</span>
            <span :class='addProductStatus === 2 ? "step-goodsAdd-img-cur" : "step-goodsAdd-img"'>
              <img src="../../../../assets/icon/white-sanjiao.png" alt="">
            </span>
          </li>
          <li :class='(addProductStatus > 3 || addProductStatus === 3) ? "step-goodsAdd-cur" : "step-goodsAdd"' @click="jumpStep(3)">
            <span>
              <span class='step-goodsAdd-num'>3</span>
            </span>
            <span class='step-goodsAdd-name'>服务管理</span>
            <span :class='addProductStatus === 3 ? "step-goodsAdd-img-cur" : "step-goodsAdd-img"'>
              <img src="../../../../assets/icon/white-sanjiao.png" alt="">
            </span>
          </li>
          <li :class='addProductStatus === 4 ? "step-goodsAdd-cur" : "step-goodsAdd"' @click="jumpStep(4)">
            <span>
              <span class='step-goodsAdd-num'>4</span>
            </span>
            <span class='step-goodsAdd-name'>商品详情页管理</span>
            <span :class='addProductStatus === 4 ? "step-goodsAdd-img-cur" : "step-goodsAdd-img"'>
              <img src="../../../../assets/icon/white-sanjiao.png" alt="">
            </span>
          </li>
        </ul>
      </div>
      <div class='goods-content-right'>
        <el-scrollbar style="height: 100%; width: 100%;">
          <div v-if="addProductStatus === 1" style="width: 100%;">
            <StepOne :detail="detail"></StepOne>
          </div>
          <div v-if="addProductStatus === 2" style="width: 100%;">
            <StepTwo :detail="detail"></StepTwo>
          </div>
          <div v-if="addProductStatus === 3" style="width: 100%;">
            <StepThree :detail="detail"></StepThree>
          </div>
          <div v-if="addProductStatus === 4" style="width: 100%;">
            <StepFour :detail="detail" @save="goodsSave"></StepFour>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <el-dialog title="保存提醒" center :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="saveRemindersModel"
      width="500px">
      <div class="saveRemindersModel">
        <p class="saveRemindersModel-title">您已完成商品信息编辑，请您选择更新信息保存方式</p>
        <div class="mt15">
          <el-radio v-model="currentVersion" :label="1">更新商品当前版本信息</el-radio>
        </div>
        <div class="mt15">
          <el-radio v-model="currentVersion" :label="2">新增商品版本，保存为新的版本（当前版本号：{{detail.versionNum}}）</el-radio>
        </div>
        <div class="mt15">
          <el-input v-model="versionNum" placeholder="输入产品版本号"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveRemindersModel = false">取 消</el-button>
        <el-button @click="subSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  import StepOne from './stepOne'
  import StepTwo from './stepTwo'
  import StepThree from './stepThree'
  import StepFour from './stepFour'
  export default {
    data() {
      return {
        pos: this.$route.meta.pos,
        dataLoading: false,
        saveRemindersModel: false,           //保存提醒弹框
        verReg: /^[0-9a-zA-Z,\.-]+$/,        //匹配只能输入数字英文.-
        saveData: {},                        //要编辑保存的data
        productType: [],                     //所有产品类型
        currentVersion: "",                  //是否新版本提交
        versionNum: '',                      //提交的新版本号
        basicForm: {
          goodsName: '',                     //产品名称
          goodsTypeId: '',                   //产品类型
          productType: '',
        },

        chanceSourceType: [],
        chanceSourceArr: [],
        props: {
          value: 'id',
          label: 'name',
        },
        targetObj: null,
        sourceNameArr: [],
        defaultPlaceholder: '请选择产品类型',
        detail: {},
      }
    },
    computed: {
      ...mapState('constData', [
        'addProductStatus',
      ]),
    },
    watch: {
      currentVersion(value) {
        if (value == 1) this.versionNum = '';
      }
    },
    created() {
      // 防止刷新回到第一步
      this.setStepBack()
      this.getProductType()
      this.getConfigData(0)

      let _detail = ~~this.$route.query.detail,
        that = this;
      // 如果是编辑获取详情
      if (_detail) {


        let oldDetail = webStorage.getItem('GOODSDETAIL');
        that.detail = JSON.parse(oldDetail);
        that.basicForm.goodsName = that.detail.goodsName;
        that.defaultPlaceholder = that.detail.goodsTypeName ? that.detail.goodsTypeName : '请选择产品类型';
        that.basicForm.goodsTypeId = that.detail.goodsTypeId;
        that.basicForm.productType = that.detail.productType;
        this.pos = [
            {name: '销售管理系统', toName: 'saleHome'},
            {name: '商品列表', toName: 'listOfGoods'},
            {name: '商品详情', toName: 'listOfGoodsDetail', query: {view: 'detail', goodsId: that.detail.goodsId}},
            {name: '编辑'}
        ]
      }
    },
    mounted() {},
    methods: {
      ...mapMutations('constData', [
        'mut_addProductStatus',
      ]),
      // 获取产品类型
      getProductType() {
        API.zhuxinGoodsManage.addProductType(0, (data) => {
          if (data.status) {
            this.productType = data.data;
          }
        })
      },
      jumpStep(step) { //手动切换步骤
        this.mut_addProductStatus(step) //设置步骤值
        let detail = this.$route.query.detail;
        this.$router.push({
          name: 'addGoods',
          query: {
            detail: detail,
            step: step
          }
        })
        switch (step) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          default:
            break;
        }
      },
      setStepBack() {
        let step = ~~this.$route.query.step;
        if (step) {
          this.mut_addProductStatus(step) //设置步骤值
        } else {
          this.mut_addProductStatus(1) //设置步骤值
        }
      },
      // 保存
      goodsSave() {
        let one = webStorage.getItem('stepOne'),
          two = webStorage.getItem('stepTwo'),
          three = webStorage.getItem('stepThree'),
          four = webStorage.getItem('stepFour');
        if (this.chanceSourceArr.length) this.basicForm.goodsTypeId = this.chanceSourceArr[this.chanceSourceArr.length - 1]
        let isDetail = ~~this.$route.query.detail;
        let message = !this.basicForm.goodsTypeId && '请选择产品类型' ||
                      !this.basicForm.goodsName && '请输入产品名称' ||
                      !this.basicForm.productType && '请选择产品返佣类别' ||
                      !one && '请完善第一步 "产品定价与收费方式"' ||
                      !two && '请完善第二步 "协议管理"' ||
                      !three && '请完善第三步 "服务管理"' ||
                      !four && '请完善第四步 "商品详情也管理"' || null;
        if (message) return this.$message.warning(message);
        // 处理第一步数据true为1 false为0
        let _item = 0;
        for (_item in one) { //处理数据为 true=1 false=0
          if (one[_item] === true) one[_item] = 1
          if (one[_item] === false) one[_item] = 0
        }

        // 处理第四步数据true为1 false为0
        let _items = 0;
        for (_items in four) { //处理数据为 true=1 false=0
          if (four[_items] === true) four[_items] = 1
          if (four[_items] === false) four[_items] = 0
        }
        // 处理第三步的工单信息
        three.goodsWorkList.forEach(work => {
          work.serviceModuleModelList.forEach(workin => {
            workin.serviceModuleItemModelList.forEach(end => {
              delete end.name;
              delete end.operation;
              delete end.operationName;
              delete end.serviceModuleItemOperationList;
            })
          })
        })
        // 组合数据
        if (one.goodsRegionList.length) {
          //选择的规格最后一个增加price
          one.goodsRegionList.forEach(a => {
            if (a.goodsRegionSpecificationsList.length) {
              a.goodsRegionSpecificationsList[a.goodsRegionSpecificationsList.length - 1].price = a.price
              a.goodsRegionSpecificationsList.forEach(b => {
                delete b.goodsSpecificationsName;
                delete b.spec;
              })
            }
            delete a.price
          })
          // 组合城市数据
          let _de = ~~this.$route.query.detail;
          if (_de) {
            for (let cit in one.goodsRegionList) {
              if (one.goodsRegionList[~~cit].allArea.length) {
                one.goodsRegionList[~~cit].areaModelList = [];
                let oo = 0;
                one.goodsRegionList[~~cit].allArea.forEach((cityOb, ix) => {
                  if (cityOb.id) {
                    oo = 1;
                  } else {
                    oo = 0
                  }
                  if (oo) {
                    one.goodsRegionList[~~cit].areaModelList.push({
                      provinceId: cityOb.id.split(',')[0],
                      cityId: cityOb.id.split(',')[1] ? cityOb.id.split(',')[1] : '',
                      areaId: cityOb.id.split(',')[2] ? cityOb.id.split(',')[2] : ''
                    })
                  } else {
                    one.goodsRegionList[~~cit].areaModelList.push(cityOb)
                  }
                })
                // one.goodsRegionList[~~cit].areaModelList = one.goodsRegionList[~~cit].allArea;
              }
              delete one.goodsRegionList[cit].allArea
            }

          } else {
            for (let cit in one.goodsRegionList) {
              if (one.goodsRegionList[~~cit].allArea.length) {
                one.goodsRegionList[~~cit].areaModelList = [];
                one.goodsRegionList[~~cit].allArea.forEach((cityOb, ix) => {
                  one.goodsRegionList[~~cit].areaModelList.push({
                    provinceId: cityOb.id.split(',')[0],
                    cityId: cityOb.id.split(',')[1] ? cityOb.id.split(',')[1] : '',
                    areaId: cityOb.id.split(',')[2] ? cityOb.id.split(',')[2] : ''
                  })
                })
              }
              delete one.goodsRegionList[cit].allArea
            }
          }
        }
        let _data = Object.assign({}, this.basicForm, one, two, three, four);

        console.log('data::: ', _data);
        // *********************

        if (!isDetail) { //新增
          this.dataLoading = true;
          _data.defaultVersion = 1;
          API.zhuxinGoodsManage.addProduct(_data, (data) => {
            this.dataLoading = false;
            if (data.status && data.data == 1) {
              this.$message.success('添加商品成功');
              this.mut_addProductStatus(1)
              let detail = this.$route.query.detail;
              this.clearCache();
              webStorage.removeItem('GOODSDETAIL');
              this.$router.push({
                name: 'listOfGoods'
              })
              this.deleteImg();
            }
          })
        } else { //编辑
          this.saveData = _data;
          this.saveRemindersModel = true;
          this.currentVersion = '';
          this.versionNum = '';
        }
      },
      // 确定最终编辑保存
      subSave() {
        if (!this.currentVersion) return this.$message.warning('请选择保存方式');
        if (this.currentVersion == 2 && !this.versionNum) return this.$message.warning('请输入产品版本号');
        if (this.currentVersion == 2 && !this.verReg.test(this.versionNum)) return this.$message.warning('产品版本号只能填写英文和数字以及标点符号.-');
        let data = this.saveData,
          goodsId = this.detail.goodsId;
        if (this.currentVersion == 2) { //选择新增版本
          this.saveRemindersModel = false;
          this.dataLoading = true;
          data.versionNum = this.versionNum;
          data.defaultVersion = 0;
          data.goodsFlag = this.detail.goodsFlag;
          API.zhuxinGoodsManage.addProduct(data, (data) => {
            this.dataLoading = false;
            if (data.status && data.data == 1) {
              this.$message.success('添加商品成功');
              this.mut_addProductStatus(1)
              let detail = this.$route.query.detail;
              this.clearCache();
              webStorage.removeItem('GOODSDETAIL');
              this.$router.push({
                name: 'listOfGoods'
              })
              this.deleteImg();
            }
          })

        } else { //选择更新版本
          let params = Object.assign({}, data, this.detail, data);
          params.goodsRegionList = data.goodsRegionList;
          params.goodsOtherCostList = data.goodsOtherCostList;
          params.goodsWorkList = data.goodsWorkList;
          this.saveRemindersModel = false;
          this.dataLoading = true;
          API.zhuxinGoodsManage.editProduct(params, (data) => {
            if (data.status) {
              this.$message.success('修改成功');
              this.$router.push({
                name: 'listOfGoods'
              })
              this.deleteImg()
            }
          })
        }
      },
      // 删除OOS上的图片
      deleteImg () {
        let _name = webStorage.getItem('DELETEIMG');
        if(_name) {
          API.zhuxinGoodsManage.deleteFile({fileName: _name}, (data) => {})
        }
      },
      // 清除保存的步骤数据
      clearCache() {
        webStorage.removeItem('stepOne');
        webStorage.removeItem('stepTwo');
        webStorage.removeItem('stepThree');
        webStorage.removeItem('stepFour');
      },
      getConfigData(pid) {
        API.zhuxinGoodsManage.addProductType(pid, (data) => {
          let arr = data.data.map((item) => {
            item.children = []
            return item
          })
          if (this.chanceSourceType.length === 0) {
            this.chanceSourceType = arr
          }
        })
      },
      // chanceSourceChange (va) {
      //   this.searchForm.chanceSource = va.join('-')
      // },
      chanceSourceChangeHandle(va) {
        this.getLastItem(this.chanceSourceType, va, 'id')
        API.zhuxinGoodsManage.addProductType(va[va.length - 1], (data) => {
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            this.targetObj.children = arr
          } else {
            this.targetObj.children = null
          }
        })
      },
      getLastItem(list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
    },
    components: {
      StepOne,
      StepTwo,
      StepThree,
      StepFour,
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";
  @import "../../../../styles/stepCommon";

  .com-bar {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
    border-bottom: 8px solid #F0F3F6 !important;

    .com-bar-left-title {
      font-size: 13px;
      color: #333E48;
    }
  }

  .ml10 {
    margin-left: 10px;
  }

  .ml100 {
    margin-left: 100px;
  }

  .goods-content {
    height: calc(100vh - 185px);
    border-bottom: 8px solid #F0F3F6;

    div {
      float: left;
    }

    .goods-content-left {
      width: 250px;
      height: 100%;
      border-right: 8px solid #F0F3F6;
      padding: 15px;
      box-sizing: border-box;

      ul {
        li {
          width: 100%;
          padding: 20px 0;
          position: relative;
          cursor: pointer;

          .step-goodsAdd-num {
            float: left;
            display: inline-block;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 19px;
            margin-top: 3px;
          }

          .step-goodsAdd-name {
            font-size: 16px;
            margin-left: 10px;
          }

          .step-goodsAdd-img {
            display: none;
            position: absolute;
            right: -38px;
            top: 15px;
          }
        }

        .step-goodsAdd {
          .step-goodsAdd-num {
            background: #cccccc;
          }

          .step-goodsAdd-name {
            color: #8D8D8D;
          }
        }

        .step-goodsAdd-cur {
          .step-goodsAdd-num {
            background: #4BCF99;
          }

          .step-goodsAdd-name {
            color: #4BCF99;
          }

          .step-goodsAdd-img-cur {
            display: block;
            position: absolute;
            right: 5px;
            top: 24px;
          }
        }
      }
    }

    .goods-content-right {
      width: calc(100% - 250px);
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      background: #F0F3F6;
    }
  }

  .saveRemindersModel {
    .saveRemindersModel-title {
      font-size: 13px;
      line-height: 15px;
      color: #8D8D8D;
    }
  }
</style>
<style scoped>
  .goods-content-right>>>.el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .goods-content-right>>>.is-horizontal {
    display: none !important;
  }
</style>
