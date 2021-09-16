<template>
  <view class="wrapper">
    <!-- 自定义用法 -->
    <nut-drag direction="y" :style="{right:'0px',top:'450px'}">
      <nut-fixednav :active.sync="myActive" type="right" @selected="selected">
        <ul slot="list" class="fixed-list">
          <li @click="switchToHome">
            <view class="nav-list-item">
              <image src="../../static/icons/home.png" class="list-item-img"></image>
              <view class="list-item-text">首页</view>
            </view>
          </li>
          <li @click="switchToClassify">
            <view class="nav-list-item">
              <image src="../../static/icons/type.png" class="list-item-img"></image>
              <view class="list-item-text">分类</view>
            </view>
          </li>
          <li @click="switchToEnquiry">
            <view class="nav-list-item">
              <image src="../../static/icons/enquiry.png" class="list-item-img"></image>
              <view class="list-item-text">询价篮</view>
            </view>
          </li>
          <li @click="switchToShopcar">
            <view class="nav-list-item">
              <image src="../../static/icons/shopCar.png" class="list-item-img"></image>
              <view class="list-item-text">购物车</view>
            </view>
          </li>
          <li @click="switchToMy">
            <view class="nav-list-item">
              <image src="../../static/icons/my.png" class="list-item-img"></image>
              <view class="list-item-text">我的</view>
            </view>
          </li>
        </ul>
        <template slot="btn" @click="myActive=!myActive">
          <img
            style="width:15px;height:15px"
            src="../../static/icons/back_white.png"
          />
          <span>{{myActive?'收起导航':'快捷导航'}}</span>
        </template>
      </nut-fixednav>
    </nut-drag>
  </view>
</template>

<script>
export default {
  name: 'fluidizedNav',
  data() {
    return {
      myActive: false
    }
  },
  methods: {
    selected(e) {
      // console.log(e)
    },
    switchToHome() {
      this.$Router.replaceAll('/')
    },
    switchToClassify() {
      this.$Router.replaceAll('/pages/classify/classify')
    },
    switchToEnquiry() {
      this.$Router.replaceAll('/pages/enquiry/enquiry')
    },
    switchToShopcar() {
      this.$Router.replaceAll('/pages/shopCar/shopCar')
    },
    switchToMy() {
      this.$Router.replaceAll('/pages/my/my')
    },
  }
}
</script>

<style lang="scss" scoped>
.nav-list-item {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .list-item-img {
    width: 25px;
    height: 25px;
  }
  .list-item-text {
    font-size: 12px;
    color: #999;
  }
}
</style>
