<template>
  <view class="bottom-nav">
  	<view class="options-box">
  	  <view class="options" @click="toService">
        <view class="img-box">
          <image
            src="../../../static/icons/service_red.png"
            class="icon-img"
          ></image>
          <view class="title">
            客服
          </view>
        </view>
  	  </view>
      
      <view class="options" @click="toEnquiry">
        <view class="img-box">
          <image
            src="../../../static/icons/enquiry_black.png"
            class="icon-img"
          ></image>
          <view class="title">
            询价篮
          </view>
          <sup v-if="enquiryNum <= 99" class="sup-text">{{enquiryNum}}</sup>
          <sup v-if="enquiryNum > 99" class="sup-text">99+</sup>
        </view>
      </view>
      
      <view class="options" @click="toShopcar">
        <view class="img-box">
          <image
            src="../../../static/icons/shopCar_black.png"
            class="icon-img"
          ></image>
          <view class="title">
            购物车
          </view>
          <sup v-if="shopCarNum <= 99" class="sup-text">{{shopCarNum}}</sup>
          <sup v-if="shopCarNum > 99" class="sup-text">99+</sup>
        </view>
      </view>
  	</view>
    <view class="btns-box">
      <view class="btns">
        <nut-buttongroup shape="circle">
          <nut-button type="light" class="yellow-btn">加购物车</nut-button>
          <nut-button type="light" class="red-btn">立即购买</nut-button>
        </nut-buttongroup>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'BottomNav',
  data() {
    return {
      enquiryNum: 11,
      shopCarNum: 34
    }
  },
  methods: {
    toService() {
      this.$toast.text('点击客服')
    },
    toEnquiry() {
      uni.switchTab({
        url: '/pages/enquiry/enquiry'
      })
    },
    toShopcar() {
      uni.switchTab({
        url: '/pages/shopCar/shopCar'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
  .options-box {
    height: 100%;
    flex: 4;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .options {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .img-box {
        height: 100%;
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
        .icon-img {
          width: 30px;
          height: 30px;
        }
        .title {
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .sup-text {
          position: absolute;
          top: 2px;
          right: 0px;
          min-width: 12px;
          height: 12px;
          padding: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 10px;
          color: #fff;
          border: 1px solid #f5222f;
          border-radius: 20px;
          background-color: #f5222f;
        }
      }
    }
  }
  .btns-box {
    flex: 6;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .btns {
      width: 90%;
      box-sizing: border-box;
      white-space: nowrap;
    }
  }
}
.yellow-btn {
  padding: 0 20px;
  background-color: #ffa200;
  color: #fff;
}
.red-btn {
  padding: 0 20px;
  background-color: #ff0000;
  color: #fff;
}
</style>
