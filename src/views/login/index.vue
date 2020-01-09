<template>
  <div class="login-container">
    <div class="login-form-container">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
        class="card-box login-form">
        <div class="login-form-left">
          <div class="login-form-title">
            <svg-icon class="search-icon" icon-class="logo"></svg-icon>
            <div>
              <h3 class="title">数据平台</h3>
              <h3 class="sub-title">Data Platform</h3>
            </div>
          </div>
         
        </div>
        <div class="login-form-right">
          <svg-icon class="login-pic" icon-class="login-pic"></svg-icon>
          <el-form-item prop="email">
            <div class="form-item">
              <span class="svg-container svg-container_login">  
                <svg-icon icon-class="user" />
              </span>
              <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="email" />
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="form-item">
              <span class="svg-container">
                <svg-icon icon-class="password"></svg-icon>
              </span>
              <el-input name="password" :type="pwdType" @keyup.enter.native="passwordLogin" v-model="loginForm.password" autoComplete="on"
                placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
            </div>
          </el-form-item>
          <div class="form-item-button">
            <el-button type="primary" style="width:33%;" :loading="loading" @click.native.prevent="passwordLogin">
              {{ loading ? '正在登录...' : '登录' }}
            </el-button>
          </div>
          <div class="form-item-button">
            <a href="https://passport.uniqueway.com/password/reset">找回密码?</a>
          </div>
        </div>
       
      </el-form>
    </div>
    
    
  </div>
  
</template>

<script>

export default {
  name: 'login',
  metaInfo: {
    title: '登录'
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ required: true, type: 'email', trigger: 'blur', message: '请输入正确的邮箱' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  created() {
    if (this.$route.query.jwt_token) {
      this.$store.dispatch('AuthLogin', { token: this.$route.query.jwt_token }).then(() => {
        this.$router.push({ path: '/' })
      })
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    passwordLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('PasswordLogin', { loginInfo: this.loginForm }).then(() => {
            this.$router.push({ path: '/' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // handleLogin() {
    //   const url = encodeURIComponent(window.location.href)
    //   window.location.href = `https://cure.uniqueway.com/auth/jwt?return_to=${url}`
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#f5f4ef;
  $dark_gray:#889aa4;
  $light_gray:#c0c4cc;
  $primary_color: #30bfbf;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    display:flex;
    border-left: 90px solid #30bfbf;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }

    .el-input {
      display: inline-block;
      height: 50px;
      width: 85%;
    }

      .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
      }

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
          font-size: 20px;
        }
      }

      .title {
        width: 102px;
        object-fit: contain;
        font-family: PingFang-SC;
        font-size: 22px;
        font-weight: 500;
        letter-spacing: 1.29px;
        color: #ffffff;
        margin-left: 5px;
      }
      .sub-title {
        font-family: PingFang-SC;
        font-size: 18px;
        color: #ffffff;
        margin-left: 5px;
      }
      .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 800px;
        height: 580px;
        box-shadow: 0 22px 45px 0 rgba(91, 91, 91, 0.24);
        background-color: #ffffff;
        margin: 120px auto;
        overflow: hidden;
        border-radius: 6px;
        display: flex;

        .login-form-left {
          display:flex;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 580px;
          background-image: linear-gradient(to bottom, #4fd6d6, #30bfbf);
        }
        .login-form-title {
          display:flex;
          align-items: center;
          justify-content: center;
        }
        .search-icon {
          width: 40px;
          height: 40px;
        }
        .login-form-right {
          width: 500px;
          text-align: center;
          padding: 35px 35px 15px 35px;
        }
        .login-pic {
          width: 230px;
          height: 150px;
          margin-top: 30px;
          margin-bottom: 80px;
        }
      }
      
      .form-item-button {
        text-align: center;
        a {
          display: block;
          color: #c0c4cc;
          font-size: 13px;
          margin-top: 10px;
        }
      }
      .form-item {
        text-align: left;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: #f4f4f4;
        border-radius: 5px;
        color: #c0c4cc;
      }

      .el-button+.el-button {
        margin-left: 17px;
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select:none;
      }

      .thirdparty-button{
        position: absolute;
        right: 35px;
        bottom: 28px;
      }
  }
</style>
