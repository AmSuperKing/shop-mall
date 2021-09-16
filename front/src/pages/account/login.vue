<template>
	<view class="login-page">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  title="登录"
		  color="#fff"
		  :bgColor="styles.themeColor"
		></header-nav>
    <view class="content-box">
      <view class="avatar flex-box">
        <image
          src="../../static/logo_handp.png"
          mode="aspectFit"
          class="avatar-logo"
        ></image>
      </view>

      <view class="login-form">
        <view class="item">
          <uni-easyinput
            prefixIcon="contact"
            v-model="loginForm.account"
            placeholder="账号/手机号"
            :clearable="false"
          ></uni-easyinput>
        </view>
        <view v-if="!loginByPhone" class="item">
          <uni-easyinput
            prefixIcon="locked"
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            :clearable="false"
          ></uni-easyinput>
        </view>
        
        <view v-if="loginByPhone" class="item">
          <uni-row class="flex-box">
            <uni-col :span="16">
              <uni-easyinput
                v-model="loginForm.verifyCode"
                placeholder="请输入验证码"
                maxlength="6"
                :clearable="false"
              ></uni-easyinput>
            </uni-col>
            <uni-col class="get-code-btn" :span="8">
              <text
                v-if="endCountdown"
                class="get-code-text"
                @click="getVerifyCode"
              >获取验证码</text>
              <text v-if="!endCountdown" class="count-down-text">{{time}}s</text>
            </uni-col>
          </uni-row>
        </view>

        <uni-row class="tips-row">
          <uni-col class="agreement" :span="12" @click.native="seeAgreement">使用协议</uni-col>
          <uni-col class="service" :span="12" @click.native="showService">客服</uni-col>
        </uni-row>

        <view class="login-btn item">
          <nut-button block shape="circle" @click="handleLogin">登录</nut-button>
        </view>

        <uni-row class="item help-text">
          <uni-col v-if="!loginByPhone" :span="10" @click.native="resetPassword">忘记密码</uni-col>
          <uni-col class="flex-box" :span="14" @click.native="register">
            没有账号？立即注册
            <uni-icons type="arrowright" :color="styles.themeColor" size="16" />
          </uni-col>
        </uni-row>

        <view class="other">—&nbsp; 其他方式登录 &nbsp;—</view>
        <view class="other-way">
          <image
            v-if="!loginByPhone"
            src="../../static/icons/phone.png"
            class="phone-icon"
            @click="toggleLoginWay"
          ></image>
          <view v-if="!loginByPhone">手机号登录</view>
          <image
            v-if="loginByPhone"
            src="../../static/accountIcon/account.png"
            class="phone-icon"
            @click="toggleLoginWay"
          ></image>
          <view v-if="loginByPhone">账号登录</view>
        </view>
      </view>
      <nut-popup
        class="service-popup"
        closeable
        round
        v-model="serviceVisible"
      >
        <service-popup ref="servicePopup"></service-popup>
      </nut-popup>
    </view>
	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import ServicePopup from '@/pages/index/component/servicePopup'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'Login',
  components: {
    HeaderNav,
    ServicePopup
  },
  data() {
    return {
      redirect: '',
      loginForm: {
        account: 'admin',
        password: '123456',
        verifyCode: ''
      },
      serviceVisible: false,
      loginByPhone: false,
      endCountdown: true,
      time: 30,
      timeInterval: null
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  onLoad(option) {
    this.redirect = this.$Route.query.redirect
  },
  mounted() {
    this.getTag()
  },
  methods: {
    getTag() {
      try {
        let tagVal = uni.getStorageSync('tag')
        if (tagVal) {
          let tagArr = tagVal.split("")
          if (tagArr.length === 22) {
            let curr = parseInt(tagArr[20] + '' + tagArr[21])
            this.time = curr
            this.endCountdown = false
            this.getVerifyCode()
          } else if (tagArr.length === 21) {
            let curr = parseInt(tagArr[19] + '' + tagArr[20])
            this.time = curr
            this.endCountdown = false
            this.getVerifyCode()
          }
        }
      } catch (e) {
        // console.log(e)
      }
    },
    getVerifyCode() {
      this.endCountdown = false
      this.startInterval()
      if(this.timeInterval !== null) {//判断计时器是否为空
        if (this.time === 0) {
          clearInterval(this.timeInterval)
          this.timeInterval = null
          try {
            uni.removeStorageSync('tag')
            this.time = 30
            this.endCountdown = true
          } catch (e) {
            // error
            // console.log(e)
          }
        }
      }
    },
    startInterval() {
      this.timeInterval = setInterval(() => {
        if (this.time > 0) {
          this.time -= 1
          let tag = 'timetag'
          let strChar = ''
          let charCode = ''
          for (let i = 0; i < tag.length; i++) {
            let strChar = tag.charAt(i)
            charCode += strChar.charCodeAt()
          }
          charCode += this.time
          try {
            uni.setStorageSync('tag', charCode)
          } catch (e) {
            // error
            // console.log(e)
          }
        }
        if (this.time === 0) {
          clearInterval(this.timeInterval)
          this.timeInterval = null
          try {
            uni.removeStorageSync('tag')
            this.time = 30
            this.endCountdown = true
          } catch (e) {
            // error
            // console.log(e)
          }
        }
      }, 1000)
    },
    seeAgreement() {
      this.$Router.push('/pages/account/agreement')
    },
    showService() {
      this.serviceVisible = true
    },
    toggleLoginWay() {
      this.loginForm.account = ''
      this.loginForm.password = ''
      this.loginByPhone = !this.loginByPhone
    },
    handleLogin() {
      if (this.loginForm.account.length === '' ||
      this.loginForm.account.length === null ||
      this.loginForm.account.length === undefined ||
      this.loginForm.account.length < 2) {
        this.$toast.text('请输入正确的账号')
        return
      }
      if (this.loginForm.password.length === '' ||
      this.loginForm.password.length === null ||
      this.loginForm.password.length == undefined) {
        if (!this.loginByPhone) {
          this.$toast.text('请填写登录密码')
          return
        }
      }
      if (this.loginForm.password.length < 6 && !this.loginByPhone) {
        this.$toast.text('登录密码不能少于6位数')
        return
      }
      if (this.loginForm.verifyCode || this.loginByPhone) {
        if (this.loginForm.verifyCode.length === 0 ||
        this.loginForm.verifyCode === '') {
          this.$toast.text('请输入正确的验证码')
        }
      }
      if (this.loginForm.account && this.loginForm.password) {
        // console.log('登录，loginForm', this.loginForm)
        const paramObj = {
          username: this.loginForm.account,
          password: this.loginForm.password
        }
        uni.showLoading({
        	title: ''
        })
        this.$store
          .dispatch('self/login', paramObj)
          .then(() => {
            this.$toast.success('登录成功')
            this.$Router.replaceAll(this.redirect || '/')
          })
          .catch((e) => {
            this.$toast.fail(e || '登录失败')
          })
          .finally(() => {
            uni.hideLoading()
          })
      }
    },
    resetPassword() {
      this.$Router.push({ path: '/pages/account/resetPassword'})
    },
    register() {
      this.$Router.push('/pages/account/register')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.login-page {
  overflow: hidden;
}

.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-box {
  margin-top: 55px;
  .avatar {
    height: 100px;
    .avatar-logo {
      width: 70px;
      height: 70px;
      border: 1px solid $theme-color;
      border-radius: 50%;
      box-shadow: 0 3px 6px $alpha-green;
    }
  }
  .login-form {
    width: 300px;
    margin: 0 auto;
    .item {
      padding: 5px 10px;
    }
    .item:first-child {
      margin-bottom: 15px;
    }
    .tips-row {
      padding: 5px 10px;
      font-size: 13px;
      color: #999;
      .agreement {
        text-decoration: underline;
      }
      .service {
        text-align: right;
        color: $theme-color;
      }
    }
    .login-btn {
      margin-top: 15px;
    }
    .help-text {
      margin-top: 15px;
      font-size: 14px;
      color: $theme-color;
    }
    .other {
      margin-top: 50px;
      padding: 0 10px;
      text-align: center;
      font-size: 13px;
      color: #999;
    }
    .other-way {
      margin-top: 18px;
      text-align: center;
      font-size: 13px;
      color: #999;
      .phone-icon {
        width: 48px;
        height: 48px;
      }
    }
  }
}
.service-popup {
  width: 80vw;
  min-height: 50vh;
  border-radius: 10px;
}
.get-code-btn {
  font-size: 14px;
  text-align: center;
  .get-code-text {
    color: #007aff;
  }
  .count-down-text {
    color: #999;
  }
}
</style>
