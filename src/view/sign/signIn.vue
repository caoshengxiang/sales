<template>
  <div class="sign-in">
    <div v-if="client === 1" class="client-1">
      <div class="sign-box">
        <div class="logo-box">
          <img src="../../assets/icon/logo.png" alt="">
          <span>众智联邦企业资源管理系统-ERP</span>
        </div>
        <div class="sign-form-box">
          <el-form label-width="60px" class="el-form-w" :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model="formData.username" placeholder="请输入您的登录账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input style="border: 0" @keydown.native="keydown" type="password" v-model="formData.password"
                        placeholder="请输入你的登录密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="type">
              <el-checkbox-group v-model="isRemember">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
              </el-checkbox-group>
              <a class="forget" @click="recoverPassword">忘记密码</a>
            </el-form-item>
            <el-form-item>
              <el-button class="el-submit" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="change-client"><a @click="client = 2;clientPathParam = 'ME'">切换登录系统</a></div>
        </div>
      </div>
      <div class="footer">
        <p>众智联邦企业资源管理系统 2017-2017 @凡特赛科技</p>
      </div>
      <div class="waveWrapper waveAnimation">
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" style="background-image: url('../../../static/images/wave-top.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" style="background-image: url('../../../static/images/wave-mid.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" style="background-image: url('../../../static/images/wave-bot.png')"></div>
        </div>
      </div>
      <fe-element></fe-element>
    </div>
    <div v-if="client === 2" class="client-2">
      <div class="sign-box">
        <div class="logo-box">
          <img src="../../assets/icon/logo.png" alt="">
          <span>众智联邦销企业资源管理系统</span>
        </div>
        <div class="sign-form-box">
          <el-form label-width="60px" class="el-form-w" :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model="formData.username" placeholder="请输入您的登录账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input @keydown.native="keydown" type="password" v-model="formData.password"
                        placeholder="请输入您的登录密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="type">
              <el-checkbox-group v-model="isRemember">
                <el-checkbox class="remember-col" label="记住密码" name="type"></el-checkbox>
              </el-checkbox-group>
              <a class="forget" @click="recoverPassword">忘记密码</a>
            </el-form-item>
            <el-form-item>
              <el-button class="el-submit" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="change-client"><a @click="client = 1;clientPathParam = 'FE'">切换登录系统</a></div>
        </div>
      </div>
      <div class="footer">
        <p>众智联邦企业资源管理系统 2017-2017 @凡特赛科技</p>
      </div>
      <div class="waveWrapper waveAnimation">
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" style="background-image: url('../../../static/images/wave-top-2.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" style="background-image: url('../../../static/images/wave-mid-2.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" style="background-image: url('../../../static/images/wave-bot-2.png')"></div>
        </div>
      </div>
      <me-element></me-element>
    </div>
  </div>
</template>

<script>
  import { chartLengthRule } from '../../utils/const'
  import feElement from '../../components/feElement'
  import meElement from '../../components/meElement'
  import API from '../../utils/api'
  import sha1 from 'js-sha1'
  import webStorage from 'webStorage'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'signIn',
    data () {
      return {
        client: 1,
        clientPathParam: 'FE',
        formData: {
          username: '',
          password: '',
        },
        isRemember: false,
        rules: {
          username: [
            {required: true, message: '请输入您的登录账号', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
          password: [
            {required: true, message: '请输入您的登录密码', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
        },
      }
    },
    computed: {
      ...mapState([
        'user',
      ]),
    },
    watch: {
      client (d) {
        webStorage.setItem('client', d)
      },
    },
    components: {
      feElement,
      meElement,
    },
    methods: {
      ...mapActions([
        'ac_user',
      ]),
      // 设置cookie
      /* eslint-disable */
      setCookie (c_name, c_pwd, c_isRemember, exdays) {
        var exdate = new Date() // 获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
        // 字符串拼接cookie
        window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'checked' + '=' + c_isRemember + ';path=/;expires=' + exdate.toGMTString()
      },
      /* eslint-enable */
      // 读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=') // 再次切割
            // 判断查找相对应的值
            if (arr2[0] === 'userName') {
              this.formData.username = arr2[1] // 保存到保存数据的地方
            } else if (arr2[0] === 'userPwd') {
              this.formData.password = arr2[1]
            } else if (arr2[0] === 'checked') {
              // eslint-disable-next-line
              this.isRemember = arr2[1] === 'true' ? true : false
            }
          }
        }
      },
      // 清除cookie
      clearCookie: function () {
        this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isRemember) {
              this.setCookie(this.formData.username, this.formData.password, this.isRemember, 7)
            } else {
              this.clearCookie()
            }

            var pwd = sha1(this.formData.password)
            API.login.login({account: this.formData.username, pwd: pwd, client: this.client}, (res) => {
              this.loading = false
              if (res.status) {
                webStorage.setItem('userInfo', res.data)
                this.ac_user(res.data)
                if (this.client === 1) {
                  this.$router.push({name: 'saleHome', params: {end: this.clientPathParam}})
                } else {
                  this.$router.push({name: 'companyManageHome', params: {end: this.clientPathParam}})
                }
              } else {
                if (res.error.statusCode === '10011') {
                  this.$router.push({name: 'resetPassword', params: {end: this.clientPathParam}})
                }
              }
            }, (mock) => {
              this.loading = false
              this.$message({
                message: '系统繁忙，请稍后再试！',
                type: 'error',
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      keydown (e) {
        if (e.keyCode === 13) {
          this.submitForm('ruleForm')
        }
      },
      recoverPassword () {
        this.$router.push({name: 'recoverPassword', params: {end: this.clientPathParam}})
      },
      getClient () {
        if (webStorage.getItem('client')) {
          this.client = webStorage.getItem('client')
          if (this.client > 2) { // 这里主要是登录了微信client===3 后pc不能显示登陆页面
            this.client = 1
          }
          this.clientPathParam = this.client === 1 ? 'FE' : 'ME'
        } else {
          webStorage.setItem('client', this.client)
        }
      },
    },
    created () {
      // this.getClient() //  【ERP的域名进入后固定让页面每次默认显示ERP的前端登陆页面，如需登陆后台需点击切换。】
    },
    mounted () {
      this.getCookie()
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  input:-webkit-autofill {
    background-color: #FFF;
    background-image: none;
    color: #000;
  }

  .sign-in {
    height: 100%;
    min-height: 800px;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .remember-col {
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #4F5F6F;
      font-size: 12px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #4F5F6F;
      border-color: #4F5F6F;
      /*width: 12px;*/
      /*height: 12px;*/
      transform: scale(0.85);
    }
    .el-checkbox__input + .el-checkbox__label {
      color: #4F5F6F;
      font-size: 12px;
    }
    .el-checkbox__input .el-checkbox__inner {
      border-color: #4F5F6F;
      /*width: 12px;*/
      /*height: 12px;*/
      transform: scale(0.85);
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #4F5F6F;
    }
  }

  .el-form-w {
    .el-input__inner {
      border: 0;
      border-bottom: 1px solid #EAEAEA;
      border-radius: 0;
    }
  }

  .client-1 {
    width: 100%;
    height: 100%;
    /*background-color: #FBFFFF;*/
    .el-form-item__label {
      color: #728395;
      font-size: 14px;
    }
    .el-checkbox__label {
      color: #728395;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #728395;
      font-size: 12px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #4BCF99;
      border-color: #4BCF99;
      /*width: 12px;*/
      /*height: 12px;*/
      transform: scale(0.85);
    }
    .el-checkbox__input + .el-checkbox__label {
      color: #728395;
      font-size: 12px;
    }
    .el-checkbox__input .el-checkbox__inner {
      /*width: 12px;*/
      /*height: 12px;*/
      transform: scale(0.85);
    }
    .sign-box {
      width: 640px;
      margin: 0px auto;
      padding-top: 100px;
      .logo-box {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 48px;
        }
        span {
          font-size: 34px;
          margin-left: 20px;
        }
      }
      .sign-form-box {
        margin: 66px auto 0 auto;
        width: 100%;
        padding: 50px 0 34px 0px;
        box-shadow: 0px 3px 5px #d3f2f2;
        border-top: 6px solid #4BCF99;
        background-color: #fff;
        .forget {
          float: right;
          margin-top: -38px;
          cursor: pointer;
          color: #4BCF99;
          font-size: 12px;
        }
        .el-form-w {
          width: 340px;
          margin: 0 auto;
        }
        .el-submit {
          width: 100%;
          /*margin-left: 90px;*/
          background-color: #4BCF99;
          color: #fff;
          height: 40px;
          font-size: 14px;
          border-radius: 4px;
          &:active {
            color: #FFF;
            border: 1px solid #4BCF99;
            outline: 0;
          }
        }
      }
    }

    .footer {
      height: 89px;
      /*background-color: #D7DDE4;*/
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      p {
        position: absolute;
        top: -40px;
        width: 100%;
        text-align: center;
        padding-left: 30px;
        font-size: 12px;
        color: #728395;
        box-sizing: border-box;
      }
    }
  }

  .client-2 {
    width: 100%;
    height: 100%;
    /*background-color: #F0F3F6;*/
    .el-form-item__label {
      color: #4F5F6F;
      font-size: 14px;
    }
    .sign-box {
      width: 640px;
      margin: 0px auto;
      padding-top: 100px;
      .logo-box {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 48px;
        }
        span {
          font-size: 34px;
          margin-left: 20px;
        }
      }
      .sign-form-box {
        margin: 66px auto 0 auto;
        width: 100%;
        padding: 50px 0 34px 0px;
        box-shadow: 0px 3px 5px #d1d6dc;
        border-top: 6px solid #4F5F6F;
        background-color: #fff;
        .el-form-w {
          width: 340px;
          margin: 0 auto;
        }
        .forget {
          float: right;
          margin-top: -38px;
          cursor: pointer;
          color: #4F5F6F;
          font-size: 12px;
        }
        .el-submit {
          width: 100%;
          background-color: #4F5F6F;
          color: #fff;
          height: 40px;
          font-size: 14px;
          border-radius: 4px;
          &:active {
            color: #FFF;
            border: 1px solid #4F5F6F;
            outline: 0;
          }
        }
      }
    }
    .footer {
      height: 89px;
      /*background-color: #D7DDE4;*/
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      p {
        position: absolute;
        top: -40px;
        width: 100%;
        padding-left: 30px;
        text-align: center;
        font-size: 12px;
        color: #728395;
        box-sizing: border-box;
      }
    }
  }

  .change-client {
    /*position: absolute;*/
    /*right: 100px;*/
    /*bottom: 11%;*/
    text-align: center;
    margin-top: 12px;
    padding-left: 60px;
    font-size: 12px;
    a {
      color: #728395;
      cursor: pointer;
    }
  }

  @keyframes move_wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1)
    }
  }

  .waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: -10;
  }

  .waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    background-image: linear-gradient(to top, #f0f3f6 20%, #f0f3f6 80%);
  }

  .client-1 {
    .waveWrapperInner {
      background-image: linear-gradient(to top, #fbffff 20%, #fbffff 80%);
    }
  }

  .bgTop {
    z-index: 15;
    opacity: 0.5;
  }

  .bgMiddle {
    z-index: 10;
    opacity: 0.75;
  }

  .bgBottom {
    z-index: 5;
  }

  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }

  .waveTop {
    background-size: 50% 100px;
  }

  .waveAnimation .waveTop {
    animation: move-wave 3s;
    -webkit-animation: move-wave 3s;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .waveMiddle {
    background-size: 50% 120px;
  }

  .waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
  }

  .waveBottom {
    background-size: 50% 100px;
  }

  .waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
  }

</style>
