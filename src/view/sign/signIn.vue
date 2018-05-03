<template>
  <div>
    <div class="sign-box">
      <el-form label-width="0px" :model="formData" :rules="rules" ref="ruleForm">
        <el-form-item label="">
          <div class="logo-box">
            <img src="../../assets/icon/logo.png" alt="">
          </div>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="formData.username" placeholder="请输入你的登陆账号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="formData.password" placeholder="请输入你的登陆密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="isRemember">
            <el-checkbox label="记住密码" name="type"></el-checkbox>
          </el-checkbox-group>
          <a href="" class="forget">忘记密码</a>
        </el-form-item>
        <el-form-item>
          <el-button class="el-submit" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { chartLengthRule } from '../../utils/const'

  export default {
    name: 'signIn',
    data () {
      return {
        formData: {
          username: '',
          password: '',
        },
        isRemember: false,
        rules: {
          username: [
            {required: true, message: '请输入你的登陆账号', trigger: 'blur'},
            chartLengthRule.defaultRule,
          ],
          password: [
            {required: true, message: '请输入你的登陆密码', trigger: 'blur'},
            chartLengthRule.defaultRule,
          ],
        },
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({name: 'saleHome'})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .sign-box {
    width: 400px;
    margin: 200px auto;
    .logo-box {
      text-align: center;
      img {
        width: 100px;
      }
    }
    .forget {
      float: right;
      margin-top: -46px;
    }
    .el-submit {
      width: 100%;
    }
  }

</style>
