<template>
	<view class="wrapper">
		<!-- 顶部标题栏 -->
    <header-nav
      ref="headerNav"
      title="我的收藏"
      backUrl="/pages/my/my"
    ></header-nav>
    <!-- 按钮、分类组切换对应内容 -->
    <enquiry-product-list ref="enquiryProductList" class="product-list" />
    <!-- 猜你喜欢模块 -->
    <guess-like ref="guessLike"></guess-like>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import EnquiryProductList from './component/myCollectionList'
import HeaderNav from '@/components/headerNav/headerNav'
import GuessLike from '@/components/guessLike'
import BackTop from '@/components/backTop'

export default {
  name: 'myCollection',
  components: {
    HeaderNav,
    EnquiryProductList,
    GuessLike,
    BackTop
  },
  data() {
    return {
      info: '1',
    }
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.wrapper {
  padding-bottom: 30rpx;
}
.title {
  height: 30px;
	padding: 10px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
	text-align: center;
	border-bottom: 1px solid #eee;
	background-color: #fff;
    white-space:nowrap;
    background-color: $theme-color;
    align-items: center;
  .title-text {
    line-height: 30px;
    font-size: 15px;
    color: #eee;
    font-weight: 600;
  }
  .product-list {
    margin-top: 60px;
  }
  .detail-back {
    position: absolute;
    left: 0px;
    padding-top: 3px;
    width: 24px;
    height: 24px;
    color: rgba(238, 238, 238);
  }
}
</style>