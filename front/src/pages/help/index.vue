<template>
  <view class="help-wrapper">
    <!-- 头部导航 -->
    <header-nav
      ref="headerNav"
      title="帮助中心"
      color="#fff"
      backUrl="/pages/my/my"
      :bgColor="styles.themeColor"
    />
    <view class="content">
      <!-- 关于我们 -->
      <about-us ref="aboutUs" class="about-us" />
      <!-- 客服联系 -->
      <contact-card ref="contactCard" />
      <!-- 公众号二维码 -->
      <view class="wechat-code">
        <image src="../../static/imgs/wechat.jpg" class="code-img"></image>
        <text>长按识别或保存二维码，关注官方公众号</text>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import AboutUs from './components/aboutUs'
import ContactCard from './components/contactCard'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'Help',
  components: {
    HeaderNav,
    AboutUs,
    ContactCard
  },
  data() {
    return {
      
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.help-wrapper {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.content {
  margin-top: 55px;
  padding-top: 15px;
  background-color: #f5f5f5;
  .about-us {}
}
.wechat-code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
  color: #999;
  .code-img {
    width: 180px;
    height: 180px;
  }
}
</style>
