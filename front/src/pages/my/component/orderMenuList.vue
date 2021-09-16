<template>
  <view class="order-menu-list">
    <view class="menu-list">
      <span class="menu-list-item">
        <view class="item-box" @click="toOrderDetail(1)">
          <image class="menu--item-icon" src="@/static/myicons/pay.png"></image>
          <text class="menu--item-text">待支付</text>
        </view>
      </span>
      <span class="menu-list-item">
        <view class="item-box" @click="toOrderDetail(2)">
          <image class="menu--item-icon" src="@/static/myicons/logistics.png"></image>
          <text class="menu--item-text">待收货</text>
        </view>
      </span>
      <span class="menu-list-item">
        <view class="item-box" @click="myComment">
          <image class="menu--item-icon" src="@/static/myicons/comment.png"></image>
          <text class="menu--item-text">我的评价</text>
        </view>
      </span>
      <span class="menu-list-item">
        <view class="item-box" @click="afterSale">
          <image class="menu--item-icon" src="@/static/myicons/aftermarket.png"></image>
          <text class="menu--item-text">售后</text>
        </view>
      </span>
      <span class="menu-list-item">
        <view class="item-box left-border" @click="toOrderDetail(0)">
          <image class="menu--item-icon" src="@/static/myicons/order.png"></image>
          <text class="menu--item-text">订单</text>
        </view>
      </span>
    </view>
  </view>
</template>

<script>
export default {
  name: 'OrderMenuList',
  data() {
    return {}
  },
  methods: {
    toOrderDetail(index) {
      uni.navigateTo({
        url: `/pages/my/component/orderDetail`,
        success: (res) => {
          res.eventChannel.emit('activeMenu', { activeIndex: index })
        }
      })
    },
    myComment() {
      uni.navigateTo({
        url: '/pages/comment/my'
      })
    },
    afterSale() {
      uni.navigateTo({
        url: '/pages/afterSale/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30rpx;
  padding: 20px 0;
  width: 94%;
  margin-left: 3%;
  margin-right: 3%;
  border-radius: 20rpx;
  box-shadow: 0 4px 6px 0 #e5e5e5;
  background-color: #FFFFFF;
	.menu-list-item {
    display: inline-block;
    width: 18%;
    text-align: center;
    .item-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .menu--item-icon {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
      }
      .menu--item-text {
        margin: 0 auto;
        font-size: 14px;
        color: #8b8b8b;
      }
    }
  }
}
.left-border {
  border-left: 2rpx solid #e5e5e5;
}
</style>
