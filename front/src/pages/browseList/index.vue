<template>
  <view class="wrapper">
    <!-- 顶部导航 -->
    <header-nav
      ref="headerNav"
      title="我的足迹"
      color="#fff"
      :bgColor="styles.themeColor"
    ></header-nav>
    <!-- 消息列表 -->
    <browse-list  ref="browseList" class="browse-list"></browse-list>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import BrowseList from './browseList'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'BrowseIndex',
  components: {
    HeaderNav,
    BrowseList
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
  .browse-list {
    margin-top: 50px;
  }
}
</style>
