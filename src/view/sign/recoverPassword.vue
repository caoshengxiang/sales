<template>
  <div class="sign-in">
    <div class="sign-box">
      <div class="logo-box">
        <!--<img src="../../assets/icon/logo.png" alt="">-->
        <span>找回密码</span>
      </div>
      <div class="sign-form-box">
        <el-form label-width="0px" :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item label="" prop="phone">
            <el-input class="phone" v-model.number="formData.phone" placeholder="请输入你的手机号"></el-input>
            <span class="code" v-if="time === 0" @click="getCode">获取验证码</span>
            <span class="code time" v-else>重新发送({{time}})</span>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="formData.password" type="password" auto-complete="off" placeholder="请输入新的密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password2">
            <el-input v-model="formData.password2" type="password" auto-complete="off" placeholder="请再次输入新的密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="verificationCode">
            <el-input v-model="formData.verificationCode" placeholder="请输入短信验证码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="el-submit" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>

          <el-form-item label="" prop="type">
            <div class="has-account">
              <span>已有账号&nbsp;&nbsp;</span>
              <a class="forget" @click="signIn">立即登陆</a>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <p>众智联邦销售管理平台 2017-2017 @凡特赛科技</p>
    </div>
  </div>
</template>

<script>
  import { chartLengthRule } from '../../utils/const'

  export default {
    name: 'recoverPassword',
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        time: 0,
        timer: '',
        formData: {
          phone: '',
          password: '',
          password2: '',
          verificationCode: '',
        },
        isRemember: false,
        rules: {
          phone: [
            // {required: true, message: '请输入手机号', trigger: 'blur'},
           chartLengthRule.validatePhone,
          ],
          password: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
          password2: [
            // {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
          verificationCode: [
            {required: true, message: '请输入短信验证码', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
            {
              min: 6, max: 6, message: '长度为 6 个字符', trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.signIn()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      signIn () {
        this.$router.push({name: 'signIn'})
      },
      getCode () {
        this.time = 60
        this.timer = setInterval(() => {
          this.time--
          if (this.time <= 0) {
            clearInterval(this.timer)
            this.time = 0
          }
        }, 1000)
      }
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

  .sign-box {
    width: 440px;
    margin: 100px auto;
    .logo-box {
      text-align: center;
      span {
        font-size: 34px;
        margin-left: 20px;
      }
    }
    .sign-form-box {
      margin: 80px auto 0 auto;
      width: 340px;
      .phone {
        position: relative;
      }
      .code {
        color: #1E88E5;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 0px;
        font-size: 12px;
        &.time {
          cursor: auto;
        }
      }
      .has-account {
        text-align: center;
      }
      .forget {
        color: #1E88E5;
        cursor: pointer;
      }
      .el-submit {
        width: 50%;
        margin-left: 90px;
        background-color: #FFA94B;
        color: #fff;
        &:active {
          color: #FFF;
          border: 1px solid #FFA94B;
          outline: 0;
        }
      }
    }
  }

  .footer {
    height: 200px;
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

</style>
