<template>
	<view class="wrapper">
		<!-- 顶部标题栏 -->
		<view class="title">
			<view class="title-text">个人中心</view>
		</view>
    <!-- 用户信息卡片 -->
    <user-info-card ref="userInfoCard"></user-info-card>
		<!-- 商品订单信息菜单 -->
		<order-menu-list ref="orderMenuList"></order-menu-list>
		<!-- 我的工具 -->
		<tools-list
      ref="toolsList"
      @showService="showService"
    ></tools-list>
    <!-- 点击客服弹出层 -->
    <nut-popup
      class="service-popup"
      closeable
      round
      v-model="serviceVisible"
    >
      <service-popup ref="servicePopup"></service-popup>
    </nut-popup>
    <!-- 猜你喜欢模块 -->
    <guess-like ref="guessLike"></guess-like>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import UserInfoCard from './component/userInfoCard'
import OrderMenuList from './component/orderMenuList'
import ToolsList from './component/toolsList'
import ServicePopup from '@/pages/index/component/servicePopup'
import GuessLike from '@/components/guessLike'
import BackTop from '@/components/backTop'

export default {
  name: 'My',
  components: {
    UserInfoCard,
    OrderMenuList,
    ToolsList,
    ServicePopup,
    GuessLike,
    BackTop
  },
  data() {
    return {
      serviceVisible: false
    }
  },
  activated() {
    this.getUserInfo()
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    showService() {
      this.serviceVisible = true
    },
    getUserInfo() {
      this.$refs.userInfoCard.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
	background-color: #f5f5f5;
  padding-bottom: 30rpx;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col-flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  .title-text {
    line-height: 30px;
    font-size: 15px;
    color: #666;
    font-weight: 600;
  }
}
.service-popup {
  width: 80vw;
  min-height: 50vh;
  border-radius: 10px;
}
</style>