<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
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
                  <el-form-item label="用户账号">
                    <label>{{ruleForm.account}}</label>
                  </el-form-item>
                  <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="ruleForm.idCard"></el-input>
                  </el-form-item>
                  <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="用户年龄" prop="age">
                    <el-input type="number" v-model="ruleForm.age"></el-input>
                  </el-form-item>
                  <el-form-item label="所在地区" prop="">
                    <!--<el-input v-model="ruleForm.name"></el-input>-->
                    <AreaSelect ref="areaSelect"
                                :initValue="ruleForm.provinceId"
                                :area="(ruleForm.provinceName?ruleForm.provinceName:'') + ' ' + (ruleForm.cityName?ruleForm.cityName:'')  + ' ' + (ruleForm.areaName?ruleForm.areaName:'')"
                                @change="areaSelectedOptionsHandleChange"
                                :selectLastLevelMode="true"></AreaSelect>
                  </el-form-item>
                  <el-form-item label="个性化签名" prop="">
                    <el-input v-model="ruleForm.sign"></el-input>
                  </el-form-item>
                </div>
                <p class="table-title">用户单位信息</p>
                <div class="form-box">
                  <el-form-item label="所在单位" prop="">
                    <label>{{ruleForm.organizationName}}</label>
                  </el-form-item>
                  <el-form-item label="所在部门" prop="">
                    <label>{{ruleForm.departmentName}}</label>
                  </el-form-item>
                  <el-form-item label="公司职位" prop="">
                    <label>
                      <span v-for="item in ruleForm.roles" :key="item.name">{{item.name}}、</span>
                    </label>
                  </el-form-item>
                </div>
                <p class="table-title">用户联系方式</p>
                <div class="form-box">
                  <el-form-item label="用户邮箱" prop="mail">
                    <el-input v-model="ruleForm.mail"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ" prop="qq">
                    <el-input v-model="ruleForm.qq"></el-input>
                  </el-form-item>
                  <el-form-item label="微信" prop="wx">
                    <el-input v-model="ruleForm.wx"></el-input>
                  </el-form-item>
                </div>
                <p class="table-title">银行账户信息设置</p>
                <div class="form-box">
                  <el-form-item label="开户银行" prop="bankDeposit">
                    <el-input v-model="ruleForm.bankDeposit"></el-input>
                  </el-form-item>
                  <el-form-item label="开户户名" prop="bankUsername">
                    <el-input v-model="ruleForm.bankUsername"></el-input>
                  </el-form-item>
                  <el-form-item label="开户账号" prop="bankAccount">
                    <el-input v-model="ruleForm.bankAccount"></el-input>
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
              <com-button buttonType="uploadImg" style="position: relative">
                本地图片
                <input type="file" class="upload-input" accept="image/png,image/jpeg,image/gif,image/jpg"
                       @change="uploadImg($event)">
              </com-button>
              <span class="tips">使用高质量图片，可生成高清头像</span>
              <p>仅支持JPG、静态GIF和PNG图片文件，且文件小于3M</p>
            </div>
            <div class="img-box">
              <div class="upload">
                <!--<img v-if="ruleForm.avatar" width="115px" :src="ruleForm.avatar" alt="">-->
                <!--<img v-else width="115px" src="../../../assets/icon/Upload.png" alt="">-->
                <div style="width: 400px;height: 400px;">
                  <vue-cropper
                    ref="cropper2"
                    :img="example2.img"
                    :outputSize="example2.size"
                    :outputType="example2.outputType"
                    :info="example2.info"
                    :canScale="example2.canScale"
                    :autoCrop="example2.autoCrop"
                    :autoCropWidth="example2.autoCropWidth"
                    :autoCropHeight="example2.autoCropHeight"
                    :fixed="example2.fixed"
                    :fixedNumber="example2.fixedNumber"
                    :fixedBox="example2.fixedBox"
                  ></vue-cropper>
                </div>
                <!--<p class="up-link" style="position: relative">选择你要上传的头像-->
                <!--<input type="file" class="upload-input"-->
                <!--accept="image/png,image/jpeg,image/gif,image/jpg"-->
                <!--@change="uploadImg($event)"></p>-->
                <p class="up-cut-img">
                  <span class="up-link" style="position: relative">选择你要上传的头像
                  <input type="file" class="upload-input"
                         accept="image/png,image/jpeg,image/gif,image/jpg"
                         @change="uploadImg($event)">
                  </span>
                  <el-button class="el-up-img" size="mini" type="success" :disabled="!!!example2.img"
                             @click="getCropperImg">上传图片
                  </el-button>
                </p>
                <p class="up-tips">本地照片：选择一张本地的图片编辑后上传为头像</p>
              </div>
              <div class="show">
                <p class="tips">您上传的图片将会自动生成三种尺寸头像和高清头像，<br>
                  请注意中小尺寸的头像是否清晰。</p>
                <div class="img-size-3">
                  <div class="size-1">
                    <img width="180px" v-if="ruleForm.avatar" :src="ruleForm.avatar" alt="">
                    <img width="180px" v-else src="../../../assets/icon/head_180.png" alt="">
                    <p class="description">大尺寸头像，180*180像素</p>
                  </div>
                  <div class="size-23">
                    <div class="size-2">
                      <img width="50" v-if="ruleForm.avatar" :src="ruleForm.avatar" alt="">
                      <img width="50" v-else src="../../../assets/icon/head_50.png" alt="">
                      <p class="description">中尺寸头像 <br>50*50像素</p>
                    </div>
                    <div class="size-3">
                      <img width="30" v-if="ruleForm.avatar" :src="ruleForm.avatar" alt="">
                      <img width="30" v-else src="../../../assets/icon/head_30.png" alt="">
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
                <el-form-item label="原始密码" prop="pwd">
                  <el-input v-model="ruleForm2.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新 密 码" prop="newPwd">
                  <el-input v-model="ruleForm2.newPwd" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="newPwd2">
                  <el-input v-model="ruleForm2.newPwd2" type="password" auto-complete="off"></el-input>
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
  import API from '../../../utils/api'
  import webStorage from 'webStorage'
  import sha1 from 'js-sha1'
  import VueCropper from 'vue-cropper'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'detailInfo',
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        tapOption: '',
        activeViewName: 'base',
        userDetail: {},
        currentUser: {},
        ruleForm: {
          name: '',
          sex: '',
        },
        rules: {
          name: [
            // {required: true, message: '请输入用户姓名', trigger: 'blur'},
            // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
          ],
          sex: [
            // {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入您的原始密码信息', trigger: 'blur'},
          ],
          newPwd: [
            {required: true, message: '请输入您的新密码信息', trigger: 'blur'},
          ],
          newPwd2: [
            {required: true, message: '请输入您的确认密码信息', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'},
          ],
        },
        ruleForm2: {
          account: '',
          pwd: '',
          newPwd: '',
          newPwd2: '',
        },
        ruleFormImg: {
          file: '',
        },
        example2: {
          // img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
          img: '',
          // info: true,
          // size: 1,
          // outputType: 'jpeg',
          // canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 180,
          autoCropHeight: 180,
          // 开启宽度和高度比例
          // fixed: true,
          // fixedNumber: [1, 1]
          fixedBox: true,
        },
      }
    },
    computed: {
      ...mapState([
        'user',
        'userHead',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
      VueCropper,
    },
    methods: {
      ...mapActions([
        'ac_user',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({name: 'personal', params: {end: 'FE'}, query: {view: tab.name}})
      },
      submitForm (formName) { // 基本信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let noAvatarParams = JSON.parse(JSON.stringify(this.ruleForm)) // 保存时不要传头像，后台每次保存会加一个服务器前缀
            delete noAvatarParams.avatar // 删除对象中头像字段
            API.user.userModify(noAvatarParams, (da) => {
              if (da.status) {
                this.$message.success('保存成功')
              }
            })
          } else {
            return false
          }
        })
      },
      submitForm2 (formName) { // 密码
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.login.resetPwd({
              account: this.ruleForm2.account,
              pwd: sha1(this.ruleForm2.pwd),
              newPwd: sha1(this.ruleForm2.newPwd),
              client: webStorage.getItem('client'),
            }, (da) => {
              if (da.status) {
                this.$message.success('保存成功')
              }
            })
          } else {
            return false
          }
        })
      },
      getUserDetail (id) {
        API.user.userDetail({id: id}, (da) => {
          this.ruleForm = da.data
          // this.example2.img = this.ruleForm.avatar
        })
      },
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSelect.getSelectedName(value)
        this.ruleForm.provinceId = value[0] || ''
        this.ruleForm.cityId = value[1] || ''
        this.ruleForm.areaId = value[2] || ''
        this.ruleForm.provinceName = name[0] || ''
        this.ruleForm.cityName = name[1] || ''
        this.ruleForm.areaName = name[2] || ''
      },
      fileUploadHandle (e) { // 未使用
        let files = e.target.files || e.dataTransfer.files
        let formData = new FormData()
        formData.append('filename', files[0].name)
        formData.append('file', files[0])
        API.common.uploadFile({path: 'avatar', body: formData}, upImg => {
          if (upImg.status) {
            this.ruleForm.avatar = upImg.data.url
            // this.ac_userHead(upImg.data.url)
            API.user.userModify(this.ruleForm, (da) => {
              if (da.status) {
                this.$message.success('保存成功')
                this.getUserDetail(this.currentUser.id)
                API.user.cacheInfo(da => {
                  this.ac_user(da.data)
                  webStorage.setItem('userInfo', da.data)
                })
              }
            })
          }
        })
      },
      down (type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg (e) {
        // 上传图片
        // this.option.img
        var file = e.target.files[0]
        // console.log(file)
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.example2.img = data
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      getCropperImg () {
        this.$refs.cropper2.getCropData((data) => {
          // console.log('data', data)
        })
        this.$refs.cropper2.getCropBlob((data) => {
          // console.log('blob', data)
          let formData = new FormData()
          // formData.append('filename', files[0].name)
          formData.append('file', data)
          API.common.uploadFile({path: 'avatar', body: formData}, upImg => {
            if (upImg.status) {
              this.ruleForm.avatar = upImg.data.path
              API.user.userModify(this.ruleForm, (da) => {
                if (da.status) {
                  this.$message.success('保存成功')
                  this.getUserDetail(this.currentUser.id)
                  this.getCacheInfo()
                }
              })
            }
          })
        })
      },
      getCacheInfo () {
        API.user.cacheInfo({}, da => { // 注意下，所有修改，需要改变state和storage
          this.ac_user(da.data)
          webStorage.setItem('userInfo', da.data)
        })
      }
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.currentUser = webStorage.getItem('userInfo')
      this.getUserDetail(this.currentUser.id)
      this.ruleForm2.account = this.currentUser.account
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
      height: 494px;
      border: 1px dashed $border-color;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .up-link {
        /*margin: $box-margin;*/
        color: $font-color-4;
        text-decoration: underline;
        display: inline-block;
        margin-right: 10px;
      }
      .up-cut-img {
        margin: 10px;
        display: inline-block;
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

  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: inline-block;
    opacity: 0;
  }
</style>
