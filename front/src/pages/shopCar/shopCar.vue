<template>
	<view class="page-wrapper">
    <!-- 顶部标题栏 -->
    <view class="title">
      <view class="title-text">购物车</view>
    </view>
    <!-- 购物车无商品显示内容 -->
		<view v-if="!ishave" class="empty flex-box">
			<view class="empty-car">
				<image src="../../static/shopCar/shopCarEmpty2.png" class="empty-img"></image>
        <view class="empty-tips">购物车是空的，快去浏览添加商品吧</view>
        <nut-button shape="circle" class="go-browse-btn" @click="goToHome">去浏览</nut-button>
			</view>
		</view>
    <!-- 商品列表 -->
    <view v-if="ishave" class="shopCar-list">
      <!-- 购物车列表 -->
      <shop-car-list ref="shopCarlist"></shop-car-list>
    </view>
    <!-- 猜你喜欢 -->
    <guess-like ref="guessLike"></guess-like>
    <!-- 返回顶部按钮 -->
    <nut-backtop :bottom="120">
      <div class="back-page-top flex-box">
        <nut-icon type="top" color="#2e2d2d"></nut-icon>
      </div>
    </nut-backtop>
	</view>
</template>

<script>
import ShopCarList from './components/shopCarList'
import GuessLike from '@/components/guessLike'

export default {
  name: 'ShopCar',
  components: {
    ShopCarList,
    GuessLike
  },
  data() {
    return {
      ishave: false
	  }
  },
  mounted() {
    this.ishave = false
  },
  methods: {
    goToHome() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-wrapper {
  width: 100%;
  height: 100%;
	background-color: #f5f5f5;
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

.empty {
  width: 100%;
  min-height: 50vh;
  margin-top: 50px;
	background-color: #FFFFFF;
  .empty-car {
  	width: 100%;
  	height: 100%;
    text-align: center;
    background-color: #fff;
    .empty-img {
      width: 380rpx;
      height: 350rpx;
    }
    .empty-tips {
      text-align: center;
      font-size: 15px;
      color: #666;
    }
    .go-browse-btn {
      width: 130px;
      margin: 25px 0;
    }
  }
}

.shopCar-list {
  margin-top: 50px;
  background-color: #fff;
}
.back-page-top {
  background-color: rgba(255, 255, 255, .7);
  color: #2e2d2d;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.35);
}
</style>
