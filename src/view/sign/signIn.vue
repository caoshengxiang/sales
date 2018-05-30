<template>
  <div class="sign-in">
    <div v-if="client === 1" class="client-1">
      <div class="sign-box">
        <div class="logo-box">
          <img src="../../assets/icon/logo.png" alt="">
          <span>众智联邦销售管理系统</span>
        </div>
        <div class="sign-form-box">
          <el-form label-width="0px" :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item label="" prop="username">
              <el-input v-model="formData.username" placeholder="请输入您的登录账号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input @keydown.native="keydown" type="password" v-model="formData.password"
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
        </div>
        <div class="change-client"><a @click="client = 2;clientPathParam = 'ME'">众智联邦销企业资源管理系统</a></div>
      </div>
      <div class="footer">
        <p>众智联邦销售管理平台 2017-2017 @凡特赛科技</p>
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
          <el-form label-width="50px" class="el-form-w" :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model="formData.username" placeholder="请输入您的登录账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input @keydown.native="keydown" type="password" v-model="formData.password"
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
          <div>
          </div>
        </div>
        <div class="change-client"><a @click="client = 1;clientPathParam = 'FE'">众智联邦销售管理系统</a></div>
      </div>
      <div class="footer">
        <p>众智联邦销售管理平台 2017-2017 @凡特赛科技</p>
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
            {required: true, message: '请输入你的登录账号', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
          password: [
            {required: true, message: '请输入你的登录密码', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
        },
      }
    },
    components: {
      feElement,
      meElement,
    },
    mounted () {
      this.getCookie()
    },
    methods: {
      //设置cookie
      setCookie (c_name, c_pwd, c_isRemember, exdays) {
        var exdate = new Date() //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
        //字符串拼接cookie
        window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'checked' + '=' + c_isRemember + ';path=/;expires=' + exdate.toGMTString()
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ') //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=') //再次切割
            //判断查找相对应的值
            if (arr2[0] === 'userName') {
              this.formData.username = arr2[1] //保存到保存数据的地方
            } else if (arr2[0] === 'userPwd') {
              this.formData.password = arr2[1]
            } else if (arr2[0] === 'checked') {
              this.isRemember = arr2[1]
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie('', '', -1) //修改2值都为空，天数为负1天就好了
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
                this.$router.push({name: 'saleHome', params: {end: this.clientPathParam}})
              } else {
                if (res.error.statusCode === '10011') {
                  this.$router.push({name: 'resetPassword', params: {end: this.clientPathParam}})
                }
              }
            }, (mock) => {
              this.loading = false
              Message({
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
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .sign-in {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .client-1 {
    .sign-box {
      width: 440px;
      margin: 100px auto;
      .logo-box {
        text-align: center;
        display: flex;
        align-items: center;
        img {
          width: 48px;
        }
        span {
          font-size: 34px;
          margin-left: 20px;
        }
      }
      .sign-form-box {
        margin: 80px auto 0 auto;
        width: 340px;
        .forget {
          float: right;
          margin-top: -38px;
          cursor: pointer;
        }
        .el-submit {
          width: 50%;
          margin-left: 90px;
          background-color: #4BCF99;
          color: #fff;
          &:active {
            color: #FFF;
            border: 1px solid #39C189;
            outline: 0;
          }
        }
      }
    }

    .footer {
      height: 20%;
      background-color: #D7DDE4;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      p {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #333E48;
      }
    }
  }

  .client-2 {
    .sign-box {
      width: 640px;
      margin: 100px auto;
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
        margin: 80px auto 0 auto;
        width: 100%;
        padding: 50px;
        box-shadow: 0px 5px 5px #999999;
        border-top: 6px solid #0BC3C4;
        .el-form-w {
          width: 340px;
          margin: 0 auto;
        }
        .forget {
          float: right;
          margin-top: -38px;
          cursor: pointer;
        }
        .el-submit {
          width: 100%;
          background-color: #0BC3C4;
          color: #fff;
          &:active {
            color: #FFF;
            border: 1px solid #39C189;
            outline: 0;
          }
        }
      }
    }
    .footer {
      height: 20%;
      background-color: #D7DDE4;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      p {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #333E48;
      }
    }
  }
  .change-client {
    position: absolute;
    right: 100px;
    bottom: 21%;
    text-align: right;
    a{
      color: blue;
      cursor: pointer;
    }
  }
</style>
