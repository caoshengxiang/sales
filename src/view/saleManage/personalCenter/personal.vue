<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="基本信息管理" name="base">
            <div class="base-form">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <p class="table-title">基本信息修改</p>
                <div class="form-box">
                  <el-form-item label="用户账号" prop="name">
                    <label>12312131313132</label>
                  </el-form-item>
                  <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="用户年龄" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="所在地图" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="个性化签名" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </div>
                <p class="table-title">用户单位信息</p>
                <div class="form-box">
                  <el-form-item label="所在单位" prop="">
                    <label>成都*********</label>
                  </el-form-item>
                  <el-form-item label="用户姓名" prop="">
                    <label>12312131313132</label>
                  </el-form-item>
                  <el-form-item label="公司职位" prop="">
                    <label>12312131313132</label>
                  </el-form-item>
                </div>
                <p class="table-title">用户联系方式</p>
                <div class="form-box">
                  <el-form-item label="用户邮箱" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ/微信" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </div>
                <p class="table-title">银行账户信息设置</p>
                <div class="form-box">
                  <el-form-item label="开户银行" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="开户户名" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="开户账号" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </div>
                <el-form-item>
                  <el-button type="primary" style="width: 100px;background-color: #4BCF99"
                             @click="submitForm('ruleForm')">保存
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="用户头像修改" name="head">
            <div class="head-text-box">
              <com-button buttonType="uploadImg">本地图片</com-button>
              <span class="tips">使用高质量图片，可生成高清头像</span>
              <p>仅支持JPG、静态GIF和PNG图片文件，且文件小于3M</p>
            </div>
            <div class="img-box">
              <div class="upload">
                <img width="115px" src="../../../assets/icon/placeholder.jpg" alt="">
                <p class="up-link">选择你要上传的头像</p>
                <p class="up-tips">本地照片：选择一张本地的图片编辑后上传为头像</p>
              </div>
              <div class="show">
                <p class="tips">您上传的图片将会自动生成三种尺寸头像和高清头像，<br>
                  请注意中小尺寸的头像是否清晰。</p>
                <div class="img-size-3">
                  <div class="size-1">
                    <img width="180px" src="../../../assets/icon/placeholder.jpg" alt="">
                    <p class="description">大尺寸头像，180*180像素</p>
                  </div>
                  <div class="size-23">
                    <div class="size-2">
                      <img width="50" src="../../../assets/icon/placeholder.jpg" alt="">
                      <p class="description">中尺寸头像 <br>50*50像素</p>
                    </div>
                    <div class="size-3">
                      <img width="30" src="../../../assets/icon/placeholder.jpg" alt="">
                      <p class="description">大尺寸头像 <br>30*30像素</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="用户密码修改" name="pass">
            <div class="base-form">
              <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                <el-form-item label="原始密码" prop="oldPass">
                  <el-input v-model="ruleForm2.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新 密 码" prop="newPass">
                  <el-input v-model="ruleForm2.newPass" type="password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="newPass2">
                  <el-input v-model="ruleForm2.newPass2" type="password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item>
                  <!--todo 按钮修改状态-->
                  <el-button type="primary" style="width: 100px;background-color: #4BCF99"
                             @click="submitForm2('ruleForm2')">保存
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'detailInfo',
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        tapOption: '',
        activeViewName: 'base',
        ruleForm: {
          name: '',
          sex: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          oldPass: [
            {required: true, message: '请输入您的原始密码信息', trigger: 'blur'},
          ],
          newPass: [
            {required: true, message: '请输入您的新密码信息', trigger: 'blur'},
          ],
          newPass2: [
            {required: true, message: '请输入您的确认密码信息', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'},
          ],
        },
        ruleForm2: {
          oldPass: '',
          newPass: '',
          newPass2: '',
        },
      }
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
    },
    methods: {
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({name: 'personal', query: {view: tab.name}})
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitForm2 (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  $box-margin: 26px;
  .com-box-padding {
    width: 100%;
    padding-top: 16px;
  }

  .base-form {
    width: 380px;
  }

  .form-box {
    margin-top: 5px;
    margin-left: 20px;
  }

  .head-text-box {
    .tips {
      margin-left: 10px;
      color: $font-color-5;
      font-size: 12px;
    }
    p {
      color: $font-color-2;
      margin: $box-margin 0;
    }
  }
  .img-box {
    display: flex;
    .upload {
      width: 445px;
      height: 394px;
      border: 1px dashed $border-color;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .up-link {
        margin: $box-margin;
        color: $font-color-4;
        text-decoration: underline;
      }
      .up-tips {
        font-size: 12px;
        color: #BDBDBD;
      }
    }
    .show {
      margin-left: $box-margin;
      padding-left: $box-margin;
      border-left: 1px solid $border-color;
    }
    .tips {
      color: $font-color-2;
    }
    .img-size-3 {
      display: flex;
      margin-top: $box-margin;
      .description {
        font-size: 12px;
        color: $font-color-2;
        text-align: center;
      }
      .size-23 {
        margin-left: $box-margin;
        text-align: center;
      }
      .size-2 {
        text-align: center;
      }
      .size-3 {
        text-align: center;
        margin-top: $box-margin + 4px;
      }
    }
  }
</style>
