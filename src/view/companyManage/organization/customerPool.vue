<template>
  <div class="com-container"
       v-loading="loading">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户池管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" @click="deletePool">刪除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="add">新增</com-button>
        <com-button buttonType="grey" icon="el-icon-edit" @click="update">修改
        </com-button>
        <!--<com-button buttonType="grey" icon="el-icon-remove-outline" @click="save">保存-->
        <!--</com-button>-->
      </div>
      <div class="com-bar-right">
        <el-select
          v-model="organizationId"
          @change="searchHandle"
          placeholder="请选择" class="com-el-select" style="width: 150px">
          <el-option
            v-for="item in organizationOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-row :gutter="2">
        <el-col :span="6">
          <el-menu
            :default-active="organizationId.toString()"
            @select="selectHandle">
            <el-menu-item
              v-for="item in pollList"
              :key="item.id"
              :index="item.id.toString()">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" v-if="pollList.length">
          <div class="role-head-con">
            描述：<span style="padding-right: 10px;">{{ruleForm.name}}</span>
          </div>
          <div class="role-view-con">
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="100px"
                     label-position="top"
                     class="demo-ruleForm">
              <el-form-item label="请设置该客户池管理员" prop="adminList">
                <el-select v-model="ruleForm.adminList" multiple placeholder="请设置该客户池管理员">
                  <el-option label="区域一" :value="1"></el-option>
                  <el-option label="区域二" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请设置该客户池需求录入员" prop="keyboarderList">
                <el-select v-model="ruleForm.keyboarderList" multiple placeholder="请设置该客户池需求录入员">
                  <el-option label="区域一" :value="1"></el-option>
                  <el-option label="区域二" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请设置该客户池销售跟进员" prop="followerList">
                <el-select v-model="ruleForm.followerList" multiple placeholder="请设置该客户池销售跟进员">
                  <el-option label="区域一" :value="1"></el-option>
                  <el-option label="区域二" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户池回收规则设置" prop="dayOfNo">
                <div class="box">
                  <div class="item">
                    获取之后
                    <el-input class="item-input" type="age" v-model.number="ruleForm.dayOfNoFollow"
                              auto-complete="off"></el-input>
                    天没有跟进客户；
                  </div>
                  <div class="item">
                    跟进之后
                    <el-input class="item-input" type="age" v-model.number="ruleForm.dayOfNoFollowAgain"
                              auto-complete="off"></el-input>
                    天没有再次跟进客户；
                  </div>
                  <div class="item">
                    获取之后
                    <el-input class="item-input" type="age" v-model.number="ruleForm.dayOfNoChance"
                              auto-complete="off"></el-input>
                    天没有添加销售机会；
                  </div>
                  <div class="item">
                    获取之后
                    <el-input class="item-input" type="age" v-model.number="ruleForm.dayOfNoFinishOrder"
                              auto-complete="off"></el-input>
                    天没有完成订单签定；
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100px;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import add from './addCustomerPool'

  export default {
    name: 'customerPool',
    data () {
      let validate = (rule, value, callback) => {
        console.log(this.ruleForm.dayOfNoChance, this.ruleForm.dayOfNoFinishOrder, this.ruleForm.dayOfNoFollow, this.ruleForm.dayOfNoFollowAgain)
        if (!Number.isInteger(this.ruleForm.dayOfNoChance) || !Number.isInteger(this.ruleForm.dayOfNoFinishOrder) ||
          !Number.isInteger(this.ruleForm.dayOfNoFollow) || !Number.isInteger(this.ruleForm.dayOfNoFollowAgain)) {
          callback(new Error('请输入数字值'))
        } else {
          if (this.ruleForm.dayOfNoChance >= 0 &&
            this.ruleForm.dayOfNoFinishOrder >= 0 &&
            this.ruleForm.dayOfNoFollow >= 0 &&
            this.ruleForm.dayOfNoFollowAgain >= 0) {
            callback()
          } else {
            return callback(new Error('请设置客户池回收规则'))
          }
        }

      }
      return {
        loading: false,
        pollList: [],
        organizationOptions: [],
        organizationId: '',
        ruleForm: {
          dayOfNoChance: '',
          dayOfNoFinishOrder: '',
          dayOfNoFollow: '',
          dayOfNoFollowAgain: '',
          name: '',
          organizationId: '',
          id: null,
          adminList: [ // 管理员id列表
          ],
          keyboarderList: [ // 需求录入人员id列表
          ],
          followerList: [ // 销售跟进人员id列表
          ]
        },
        rules: {
          dayOfNo: [
            {required: true, validator: validate, trigger: 'blur'},
          ],
          adminList: [
            {required: true, message: '请设置该客户池管理员', trigger: 'change'},
          ],
          keyboarderList: [
            {required: true, message: '请设置该客户池需求录入员', trigger: 'change'},
          ],
          followerList: [
            {required: true, message: '请设置该客户池销售跟进员', trigger: 'change'},
          ],
        }
      }
    },
    components: {
      comButton
    },
    methods: {
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.customerSea.edit(that.ruleForm, function (resData) {
              that.loading = false
              if (resData.status) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                setTimeout(() => {
                  that.$vDialog.close() // 关闭弹窗
                  that.loading = false
                }, 300)
              }
            }, function () {
              setTimeout(() => {
                that.loading = false
              }, 300)

            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      searchHandle (id) {
        this.getPollList(id)
      },
      getOrganization (pa) {
        API.organization.queryList(pa, (data) => {
          this.organizationOptions = data.data
          this.organizationId = data.data[0].id // 默认显示第一个id
          API.customerSea.list(this.organizationId, (da) => {
            this.pollList = da.data.content
            this.getPoolDetail(this.pollList[0].id)
          })
        })
      },
      getPollList (id) {
        API.customerSea.list(id, (da) => {
          this.pollList = da.data.content
        })
      },
      add () {
        var that = this
        this.$vDialog.modal(add, {
          title: '新增客户池',
          width: 420,
          height: 250,
          params: {
            organizationId: this.organizationId,
            type: 'add'
          },
          callback: function () {
            that.getPollList(that.organizationId)
          }
        })
      },
      selectHandle (id) {
        this.getPoolDetail(id)
      },
      getPoolDetail (id) {
        API.customerSea.detail(id, (resD) => {
          this.ruleForm = JSON.parse(JSON.stringify(resD.data))
        })
      },
      deletePool () {
      },
      update () {
        var that = this
        this.$vDialog.modal(add, {
          title: '编辑客户池',
          width: 420,
          height: 250,
          params: {
            organizationId: this.organizationId,
            type: 'edit',
            id: this.ruleForm.id,
            name: this.ruleForm.name
          },
          callback: function () {
            that.getPollList(this.organizationId)
          }
        })
      }
    },
    created () {
      this.getOrganization({pid: 0})
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .role-head-con {
    background-color: #E9F3F5;
    padding: 0 15px;
    line-height: 42px;
    color: #426585;
    font-size: 12px;
  }

  .role-view-con {
    padding: 0 15px;
  }

  .el-menu-item {
    $select_bg: #F4F6F8;
    &:hover {
      background-color: #fbfbfb;
    }
    &:focus {
      background-color: $select_bg;
    }
    &.is-active {
      font-weight: 600;
      color: #426585;
      background-color: $select_bg;
    }
  }

  .box {
    background: #f7f7f7;
    padding: 5px 0;
    .item {
      color: #333E48;
      margin: 5px 0;
      .item-input {
        width: 100px;
        margin: 0 5px;
      }
    }
  }
</style>
