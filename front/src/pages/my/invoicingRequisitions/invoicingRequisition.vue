<template>
	<view class="detail">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  title="发票资料"
		  color="#fff"
      backUrl="/pages/my/my"
		  :bgColor="styles.themeColor"
		></header-nav>
		<view class="detail-header" @click="toParsonalHeadUp()">
			<text class="detail-header-text-left">个人抬头</text>
			<text class="detail-header-text-right">个人
        <nut-icon type="right" size="20px" color="#888888"></nut-icon>
      </text>
		</view>
		<view class="detail-header" @click="toCompanyHeadUp()">
			<text class="detail-header-text-left">公司抬头</text>
			<text class="detail-header-text-right">15915211111_1de22
        <nut-icon type="right" size="20px" color="#888888"></nut-icon>
      </text>
		</view>
        <view class="detail-header" @click="toQualifications()">
			<text class="detail-header-text-left">增票资质（未开通）</text>
			<text class="detail-header-text-right-noApplied">申请开通
        <nut-icon type="right" size="20px" color="#888888"></nut-icon>
      </text>
		</view>
	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'

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
        phoneNumber: 'XXXXXXXXXXX',
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
    }
  },
  onLoad(option) { //option为object类型，会序列化上个页面传递的参数

  },
  methods: {
    back() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        uni.switchTab({
          url:'/'
        })
      } else {
        uni.navigateBack({
          delta: 1
        })
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
    // 进入个人抬头
    toParsonalHeadUp() {
      uni.navigateTo({
        url:`/pages/my/invoicingRequisitions/invoicingParsonalHeadUp`
      })
    },
    // 进入公司抬头
    toCompanyHeadUp() {
      uni.navigateTo({
        url:`/pages/my/invoicingRequisitions/invoicingCompanyHead`
      })
    },
    // 进入开通申请
    toQualifications(){
        uni.navigateTo({
        url:`/pages/my/invoicingRequisitions/invoicingqualifications`
      })
    }
  }
}
</script>

<style long="scss" scoped>
@import '@/assets/scss/variables.scss';
/* #ifndef APP-NVUE */
page {
  background-color: #f5f5f5;
}
/* #endif */
.detail {
	height: 100%;
    margin-top: 70px;
}
.detail-header-text-right-let {
	padding-left: 5px;
	color: rgba(222, 222, 222);
}
.detail-header {
	display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
	justify-content: space-between;
	align-items: center;
    margin-left: 5%;
    margin-right: 5%;
	width: 90%;
	height: 60px;
	border-bottom: 1px solid rgba(238, 238, 238, 0.7);
    box-shadow:1px 0px 1px #eee;
    border-radius: 15px;
    background-color: #ffffff;
 }
.detail-header-text-left {
	margin-left: 10px;
	font-size: 14px;
	color: rgb(102, 102, 102);
 }
.detail-header-text-right {
  margin-right: 10px;
  font-size: 14px;
  color: rgb(102, 102, 102);
}
.detail-header-text-right-noApplied {
  margin-right: 10px;
  font-size: 14px;
  color: #fa5157;
}
.detail-header-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid theme-color;
}
.contacts {
	text-align: center;
	width: 100%;
	margin-top: 20px;
	margin-bottom: 50rpx;
	font-size: 20px;
}
.contacts-input {
	padding-top: 30px;
}
.contacts-buttons {
	padding-top: 30px;
	display: flex;
	justify-content: center;
}
.contacts-buttona {
	width: 40%;
}
.contacts-buttonb {
	background-color: theme-color;
	width: 40%;
}
.contacts-input-set {
	width: 80%;
	padding-left: 10%;
	padding-right: 10%;
	border: none;
	border-bottom: 2rpx solid #eee;
}
.contacts-input-set-define {
	padding-top: 30px;
}
</style>
