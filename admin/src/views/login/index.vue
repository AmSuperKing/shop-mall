<template>
  <el-container>
    <el-main class="main">
      <div class="bg">
        <div class="form-wrapper all-center">
          <div class="login-form">
            <div class="title">
              <span class="title-text">合和集采服务平台管理后台</span>
            </div>

            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRule"
              label-width="60px"
              label-position="left"
            >

              <el-form-item
                label="账号"
                prop="username"
                label-position="right"
              >
                <el-input
                  ref="uname"
                  v-model.trim="loginForm.username"
                  tabindex="1"
                  size="small"
                  placeholder="请输入用户账号"
                  maxlength="20"
                  auto-complete="off"
                  class="form-input"
                  :clearable="true"
                  @input="checkInputType"
                />
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
                label-position="right"
              >

                <el-input
                  v-model.trim="loginForm.password"
                  tabindex="2"
                  class="form-input"
                  size="small"
                  placeholder="请输入正确密码"
                  maxlength="20"
                  auto-complete="off"
                  show-password
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>

              <p class="forget">
                <span @click="notifyUser">忘记密码</span>
              </p>
              <el-form-item
                style="margin-top:30px"
                label=""
              >
                <el-button
                  :loading="loading"
                  class="login-button"
                  @click.native.prevent="handleLogin"
                >登 录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer class="footer">
      <v-footer />
    </el-footer>
  </el-container>
</template>

<script>
import VFooter from './vfooter.vue'

export default {
  name: 'Login',
  components: {
    VFooter
  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        client_secret: 'secret',
        client_id: 'hehe',
        grant_type: 'password'
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      input: { prevTime: null, currTime: null },
      loginRule: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('this.loginForm', this.loginForm)
          this.loading = true
          this.$store
            .dispatch('self/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch((e) => {
              this.loginForm.username = ''
              this.loginForm.password = ''
              this.$message.error(e || '登录失败')
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    checkInputType() {
      this.input.currTime = new Date().getTime()
      if (this.input.prevTime) {
        if (this.input.currTime - this.input.prevTime < 50) {
          this.isScanner = true
        } else {
          this.isScanner = false
        }
      }
      this.input.prevTime = this.input.currTime
    },
    notifyUser() {
      this.$alert(
        '本系统不提供自助修改密码功能，如忘记密码请于管理员联系',
        '提示',
        {
          confirmButtonText: '确定'
        }
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  height: 52px !important;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 0 10px #c3c3c3;
  padding: 0px;
}
.main {
  padding: 0px;
  text-align: center;
  position: relative;
  height: calc(100vh - 52px);
}
.footer {
  background: #009c73;
  height: 52px !important;
  width: 100%;
  padding: 0px;
  position: fixed;
  bottom: 0;
}
.form-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .3);
}
.all-center {
  display: flex;
  justify-content: center; /*实现水平居中*/
  align-items: center; /*实现垂直居中*/
}
.bg {
  height: 100%;
  width: 100%;
  padding: 0px;
  background: url('../../assets/login_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: left;
}
.grid-content {
  min-height: 36px;
  background-color: inherit;
}
.title {
  margin: 20px 0 50px;
  text-align: center;
}
.title-text {
  font-family: PingFangTC-Semibold;
  font-size: 28px;
  color: #009c73;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: bold;
}
.login-form {
  width: 420px;
  height: 390px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .4);
}
.forget {
  text-align: right;
  span {
    cursor: pointer;
  }
  font-family: PingFangTC-Regular;
  font-size: 12px;
  color: #009c73;
  letter-spacing: 0;
  line-height: 16px;
}
.login-button {
  height: 52px;
  width: 80%;
  border: 1px solid #009c73;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-image: linear-gradient(to right, #009c73, #09c594);
  box-shadow: 0 6px 8px rgba(0, 0, 0, .4);
  &:hover {
    border: 1px solid #49cc90;
    color: #fff;
    background-image: linear-gradient(to right, #49cc90, #49cc90);
  }
}
</style>
