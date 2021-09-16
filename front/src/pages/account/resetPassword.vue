<template>
	<view class="reset-page">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  :title="title"
		  color="#fff"
		  :bgColor="styles.themeColor"
		></header-nav>
    <view class="reset-form">
      <uni-forms
        :rules="rules"
        :modelValue="formData"
        label-width="0"
        ref="form"
        validate-trigger="bind"
        err-show-type="undertext"
      >
        <uni-forms-item name="phone">
          <uni-row class="flex-box">
            <uni-col class="icon-box" :span="3">
              <image src="../../static/accountIcon/phone.png" class="icon-img"></image>
            </uni-col>
            <uni-col class="bottom-line" :span="21">
              <uni-easyinput
                v-model="formData.phone"
                placeholder="请输入手机号"
                maxlength="11"
                :clearable="false"
                :inputBorder="false"
              ></uni-easyinput>
            </uni-col>
          </uni-row>
        </uni-forms-item>

        <uni-forms-item name="verifyCode">
          <uni-row class="flex-box">
            <uni-col class="icon-box" :span="3">
              <image src="../../static/accountIcon/message.png" class="icon-img"></image>
            </uni-col>
            <uni-col class="bottom-line" :span="15">
              <uni-easyinput
                v-model="formData.verifyCode"
                placeholder="请输入验证码"
                maxlength="6"
                :clearable="false"
                :inputBorder="false"
              ></uni-easyinput>
            </uni-col>
            <uni-col class="icon-box" :span="6">
              <text
                v-if="endCountdown"
                class="get-code-text"
                @click="getVerifyCode"
              >获取验证码</text>
              <text v-if="!endCountdown" class="count-down-text">{{time}}s</text>
            </uni-col>
          </uni-row>
        </uni-forms-item>
        
        <uni-forms-item name="newPwd">
          <uni-row class="flex-box">
            <uni-col class="icon-box" :span="3">
              <image src="../../static/accountIcon/lock.png" class="icon-img"></image>
            </uni-col>
            <uni-col class="bottom-line" :span="21">
              <uni-easyinput
                v-model="formData.newPwd"
                placeholder="输入新密码"
                maxlength="16"
                type="password"
                :clearable="false"
                :inputBorder="false"
              ></uni-easyinput>
            </uni-col>
          </uni-row>
        </uni-forms-item>
        
        <uni-forms-item name="comfirmNewPwd">
          <uni-row class="flex-box">
            <uni-col class="icon-box" :span="3">
              <image src="../../static/accountIcon/lock.png" class="icon-img"></image>
            </uni-col>
            <uni-col class="bottom-line" :span="21">
              <uni-easyinput
                v-model="formData.confirmNewPwd"
                placeholder="确认新密码"
                maxlength="16"
                type="password"
                :clearable="false"
                :inputBorder="false"
              ></uni-easyinput>
            </uni-col>
          </uni-row>
        </uni-forms-item>
      </uni-forms>

      <view class="confirm-btn">
        <nut-button block shape="circle" @click="comfirmReset">确定</nut-button>
      </view>
    </view>
	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'ResetPassword',
  components: {
    HeaderNav
  },
  data() {
    return {
      title: '修改密码',
      formData: {
        phone: '',
        verifyCode: '',
        newPwd: '',
        comfirmNewPwd: ''
      },
      endCountdown: true,
      time: 30,
      timeInterval: null,
      rules: {
      	phone: {
      		rules: [{
      				required: true,
      				errorMessage: '请填写手机号'
      			},
      			{
      				format: 'number',
      				errorMessage: '手机号必须是数字'
      			}
      		]
      	},
        verifyCode: {
          rules: [{
          		required: true,
          		errorMessage: '请输入验证码'
          	},
            {
            	format: 'number',
            	errorMessage: '请输入正确的验证码'
            },
          	{
          		minLength: 4,
          		maxLength: 6,
          		errorMessage: '验证码长度在 {minLength} 到 {maxLength} 个字符'
          	}
          ]
        },
        newPwd: {
          rules: [{
          		required: true,
          		errorMessage: '请填写新密码'
          	},
          	{
          		minLength: 6,
          		maxLength: 16,
          		errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
          	}
          ]
        },
        comfirmNewPwd: {
          rules: [{
          		required: true,
          		errorMessage: '请确认新密码'
          	},
          	{
          		minLength: 6,
          		maxLength: 16,
          		errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
          	}
          ]
        }
      }
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  onLoad() {

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
    comfirmReset() {
      this.$refs.form.validate().then(res => {
        // console.log('comfirmReset', res)
        const regStr = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (!regStr.test(res.phone)) {
          this.$toast.text('请输入正确的手机号')
          return
        }
        if (res.newPwd !== res.comfirmNewPwd) {
          this.$toast.text('两次密码不一致')
        }
      }).catch(err => {
        // console.log('表单错误信息：', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-form {
  margin-top: 55px;
  padding: 20px;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-box {
  text-align: center;
  .icon-img {
    width: 18px;
    height: 18px;
  }
}
.bottom-line {
  border-bottom: 1px solid #eee;
}
.get-code-text {
  color: #007aff;
}
.count-down-text {
  color: #999;
}
.confirm-btn {
  margin-top: 15px;
}
</style>
