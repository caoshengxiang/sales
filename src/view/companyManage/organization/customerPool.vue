<template>
  <div class="com-container"
       v-loading="loading">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
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
            :default-active="activeIndex.toString()"
            @select="selectHandle">
            <el-menu-item
              v-for="(item, index) in pollList"
              :key="index"
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
                  <el-option v-for="item in adminList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请设置该客户池需求录入员" prop="keyboarderList">
                <el-select v-model="ruleForm.keyboarderList" multiple placeholder="请设置该客户池需求录入员">
                  <el-option v-for="item in keyboarderList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请设置该客户池销售跟进员" prop="followerList">
                <el-select v-model="ruleForm.followerList" multiple placeholder="请设置该客户池销售跟进员">
                  <el-option v-for="item in followerList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
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
        console.log(this.ruleForm.dayOfNoChance, this.ruleForm.dayOfNoFinishOrder, this.ruleForm.dayOfNoFollow,
          this.ruleForm.dayOfNoFollowAgain)
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
          ],
        },
        ruleFormEdit: {}, // 保存后台返回的原始数据
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
        },
        activeIndex: '',
        adminList: [],
        followerList: [],
        keyboarderList: [],
      }
    },
    components: {
      comButton,
    },
    methods: {
      handleResData (copy) {
        // 构建前端需要得数据
        this.ruleForm.adminList = []
        this.ruleForm.followerList = []
        this.ruleForm.keyboarderList = []
        copy.adminList.forEach(ad => {
          this.ruleForm.adminList.push(ad.salerId)
        })
        copy.followerList.forEach(ad => {
          this.ruleForm.followerList.push(ad.salerId)
        })
        copy.keyboarderList.forEach(ad => {
          this.ruleForm.keyboarderList.push(ad.salerId)
        })
      },
      handleReqData () {
        // 构建后端接口数据
        let adminListId = JSON.parse(JSON.stringify(this.ruleForm)).adminList
        let followerListId = JSON.parse(JSON.stringify(this.ruleForm)).followerList
        let keyboarderListId = JSON.parse(JSON.stringify(this.ruleForm)).keyboarderList
        this.ruleForm.adminList = []
        this.ruleForm.followerList = []
        this.ruleForm.keyboarderList = []
        adminListId.forEach(id => {
          this.adminList.forEach(item => {
            if (item.id === id) {
              this.ruleForm.adminList.push({
                salerId: id,
                salerName: item.name,
              })
            }
          })
        })
        followerListId.forEach(id => {
          this.followerList.forEach(item => {
            if (item.id === id) {
              this.ruleForm.followerList.push({
                salerId: id,
                salerName: item.name,
              })
            }
          })
        })
        keyboarderListId.forEach(id => {
          this.keyboarderList.forEach(item => {
            if (item.id === id) {
              this.ruleForm.keyboarderList.push({
                salerId: id,
                salerName: item.name,
              })
            }
          })
        })
        // 构建后端接口数据 end
      },
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$nextTick(() => {
              this.handleReqData()
              API.customerSea.edit({body: that.ruleForm, path: that.ruleForm.id}, function (resData) {
                that.getPoolDetail(that.activeIndex)
                if (resData.status) {
                  that.$message({
                    message: '保存成功！',
                    type: 'success',
                  })
                  setTimeout(() => {
                    that.loading = false
                  }, 1000)
                } else {
                  setTimeout(() => {
                    that.loading = false
                  }, 1000)
                }
              }, function () {
                setTimeout(() => {
                  that.loading = false
                }, 1000)
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      searchHandle (id) { // 组织下拉
        this.getPollList(id)
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
          this.organizationId = data.data[0].id // 默认显示第一个id
          // API.customerSea.list(this.organizationId, (da) => {
          //   this.pollList = da.data.content
          //   this.getPoolDetail(this.pollList[0].id)
          // })
          // this.getAdminList(data.data[0].id)
          // this.getFollowerList(data.data[0].id)
          // this.getKeyboarderList(data.data[0].id)
          this.getPollList(data.data[0].id)
        })
      },
      getPollList (id) {
        API.customerSea.list(id, (da) => {
          this.pollList = da.data.content
          this.getPoolDetail(this.pollList[0].id)
        })
        this.getAdminList(id)
        this.getFollowerList(id)
        this.getKeyboarderList(id)
      },
      add () {
        var that = this
        this.$vDialog.modal(add, {
          title: '新增客户池',
          width: 420,
          height: 250,
          params: {
            organizationId: this.organizationId,
            type: 'add',
          },
          callback: function () {
            that.getPollList(that.organizationId)
          },
        })
      },
      selectHandle (id) {
        this.getPoolDetail(id)
      },
      getPoolDetail (id) {
        this.activeIndex = id.toString()
        API.customerSea.detail(id, (resD) => {
          this.ruleForm = JSON.parse(JSON.stringify(resD.data))
          this.ruleFormEdit = JSON.parse(JSON.stringify(resD.data))

          this.handleResData(JSON.parse(JSON.stringify(resD.data)))
        })
      },
      deletePool () {
        this.$confirm('确定删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          API.customerSea.deleteSea(this.activeIndex, (da) => {
            if (da.status) {
              this.$message.success('操作成功')
              API.customerSea.list(this.organizationId, (da) => {
                this.pollList = da.data.content
                this.getPoolDetail(this.pollList[0].id)
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      },
      update () {
        this.$vDialog.modal(add, {
          title: '编辑客户池',
          width: 420,
          height: 250,
          params: {
            organizationId: this.organizationId,
            type: 'edit',
            id: this.ruleForm.id,
            name: this.ruleForm.name,
            ruleForm: this.ruleFormEdit, // 使用后端原始数据
          },
          callback: () => {
            this.getPollList(this.organizationId)
            API.customerSea.list(this.organizationId, (da) => {
              this.pollList = da.data.content
              this.getPoolDetail(this.activeIndex)
            })
          },
        })
      },
      getAdminList (organizationId) { // 客户池管理员
        API.user.userSearch({bilityIds: 5, organizationId: organizationId}, (data) => {
          this.adminList = data.data
        })
      },
      getFollowerList (organizationId) { // 销售跟进员
        API.user.userSearch({bilityIds: 2, organizationId: organizationId}, (data) => {
          this.followerList = data.data
        })
      },
      getKeyboarderList (organizationId) { // 需求录入员
        API.user.userSearch({bilityIds: 1, organizationId: organizationId}, (data) => {
          this.keyboarderList = data.data
        })
      },
    },
    created () {
      this.getOrganization({pid: 1})
    },
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
