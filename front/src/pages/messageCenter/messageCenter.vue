<template>
  <view class="wrapper">
    <!-- 顶部导航 -->
    <header-nav
      ref="headerNav"
      title="消息中心"
      color="#fff"
      :bgColor="styles.themeColor"
    ></header-nav>
    <!-- 消息列表 -->
    <message-list ref="messageList" class="message-list"></message-list>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import MessageList from './messageList'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'MessageCenter',
  components: {
    HeaderNav,
    MessageList
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
.wrapper {
  width: 100%;
  background-color: #f5f5f5;    
  .message-list {
    margin-top: 50px;
  }
}
</style>
