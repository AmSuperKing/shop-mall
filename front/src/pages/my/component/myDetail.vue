<template>
	<view class="detail">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  title="个人信息"
		  color="#fff"
      backUrl="/pages/my/my"
		  :bgColor="styles.themeColor"
		></header-nav>
		<view class="detail-header">
			<text class="detail-header-text-left">头像</text>
			<image
        class="detail-header-image"
        src="../../../static/logo_handp.png"
        mode="aspectFit"
      ></image>
		</view>
		<view class="detail-header">
			<text class="detail-header-text-left">登录名</text>
			<text class="detail-header-text-right">{{userInfo.username || '-'}}</text>
		</view>
		<view class="detail-header">
			<text class="detail-header-text-left">用户名</text>
			<text class="detail-header-text-right">{{userInfo.usernameCn || '-'}}</text>
		</view>
		<view class="detail-header" @click="switchActionSheet">
      <text class="detail-header-text-left">联系人</text>
      <view class="detail-header-text-right">
        {{ userInfo.contacts || infoMessage.contacts }}
        <uni-icons type="arrowright" color="#999" size="15" />
      </view>
		</view>
		<nut-actionsheet
      :is-visible="isVisible"
		  @close="switchActionClose"
		>
      <div slot="custom" class="custom-wrap contacts">
				<span class="">{{ inputTitle }}</span>
				<view class="contacts-input">
					<input
            class="contacts-input-set"
            type="text"
            placeholder="请输入"
            v-model="inputMessage"
          />
				</view>
				<view class="contacts-buttons">
					<button type="default" class="contacts-buttona" @click="switchActionClose">取消</button>
					<button type="primary" class="contacts-buttonb" @click="switchActionUpdate">确定</button>
				</view>
      </div>
		</nut-actionsheet>
		<view class="detail-header" @click="switchActionSheetPhoneNo">
			<text class="detail-header-text-left">手机号</text>
			<view class="detail-header-text-right">
        {{ userInfo.phone || infoMessage.phoneNumber }}
        <uni-icons type="arrowright" color="#999" size="15" />
      </view>
		</view>
		<view class="detail-header" @click="switchActionSheetEmail">
			<text class="detail-header-text-left">邮箱</text>
			<view class="detail-header-text-right">
        {{ userInfo.email || infoMessage.email }}
        <uni-icons type="arrowright" color="#999" size="15" />
      </view>
		</view>
		<view class="detail-header" @click="switchActionSheetPassword">
			<text class="detail-header-text-left">设置密码</text>
			<view class="detail-header-text-right">
        <uni-icons type="arrowright" color="#999" size="15" />
      </view>
		</view>
		
		<view class="logOut">
			<button class="logOut-text" type="primary" @click="handleLogout">退出登录</button>
		</view>
    <uni-popup ref="alertDialog" type="dialog">
    	<uni-popup-dialog
        type="error"
        title="确认退出"
        content="是否退出登录？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'MyDetail',
  components: {
    HeaderNav
  },
  data() {
    return {
      isVisible: false,
      isVisiblePhone: false,
      val: '',
      contacts: '暂未填写',
      inputContacts: '',
      infoMessage: {
        contacts: '暂未填写',
        phoneNumber: '-',
        email: '暂未填写'
      },
      inputTitle: '',
      inputMessage: '',
      delta: 1
    }
  },
  computed: {
    styles() {
      return styles
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const hasToken = getToken()
      if (hasToken) {
        try {
          // get user info
          this.$store.dispatch('self/getInfo')
        } catch (error) {
          // remove token and go to login page to re-login
          this.$store.dispatch('self/resetToken')
          this.$toast.text(error || 'Has Error')
        }
      }
    },
    //  联系人弹框打开
    switchActionSheet() {
      this.inputTitle = '联系人'
      this.inputMessage = this.infoMessage.contacts
      this.isVisible = !this.isVisible
    },
    // 弹框关闭-清除
    switchActionClose() {
      this.inputMessage = ''
      this.isVisible = !this.isVisible
      this.$forceUpdate()
    },
    //  弹框关闭-赋值
    switchActionUpdate() {
      if (this.inputTitle === '联系人') {
        this.infoMessage.contacts = this.inputMessage
      } else if (this.inputTitle === '手机号') {
        this.infoMessage.phoneNumber = this.inputMessage
      } else if (this.inputTitle === '邮箱') {
        this.infoMessage.email = this.inputMessage
      }
      // this.isVisible=false
      this.isVisible = !this.isVisible
      this.$forceUpdate()
    },
    // 手机号弹框打开
    switchActionSheetPhoneNo() {
      this.inputTitle = '手机号'
      this.inputMessage = this.infoMessage.phoneNumber
      this.isVisible = !this.isVisible
    },
    // 邮箱弹框打开
    switchActionSheetEmail() {
      this.inputTitle = '邮箱'
      this.inputMessage = this.infoMessage.email
      this.isVisible = !this.isVisible
    },
    // 设置密码弹框打开
    switchActionSheetPassword() {
      uni.navigateTo({
        url:`/pages/my/component/setPassword`
      })
    },
    handleLogout() {
      this.$refs.alertDialog.open()
    },
    dialogConfirm() {
    	// console.log('确认退出')
    	// this.redirectToPrePage()
      this.$store.dispatch('self/logout')
      uni.switchTab({
        url: '/'
      })
    },
    dialogClose() {
    	// console.log('点击取消')
    },
    redirectToPrePage() {
      uni.showLoading({
      	title: ''
      })
      setTimeout(() => {
      	uni.hideLoading()
      	this.$refs.alertDialog.close()
        uni.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.detail {
	height: 100%;
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(238, 238, 238, 0.7);
    .detail-header-text-left {
      margin-left: 10px;
      font-size: 14px;
      color: rgb(102, 102, 102);
    }
    .detail-header-image {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      border: 1px solid theme-color;
    }
    .detail-header-text-right {
        margin-right: 10px;
        font-size: 14px;
        color: rgb(102, 102, 102);
    }
 }
 .contacts {
    text-align: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 50rpx;
    font-size: 20px;
    .contacts-input {
      padding-top: 30px;
      .contacts-input-set {
        width: 80%;
        padding-left: 10%;
        padding-right: 10%;
        border: none;
        border-bottom: 2rpx solid #eee;
      }
    }
  }
  .logOut {
    text-align: center;
    width: 60%;
    padding-left: 20%;
    padding-right: 20%;
    position: absolute;
    bottom: 50px;
    .logOut-text {
     font-size: 14px;
      background-color: #009C73;
    }
  }
}
</style>
