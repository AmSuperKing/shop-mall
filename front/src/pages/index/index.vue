<template>
	<view class="content-wrapper">
    <view class="bg-color-liner">
      <!-- 顶部logo -->
      <!-- <view class="brand-wrapper">
        <image src="../../static/logo_handp.png" class="brand-logo"></image>
      </view> -->
      <!-- 搜索以及图标一行 -->
      <top-nav ref="topNav" class="top-nav" @clickService="showService"></top-nav>
      <!-- 点击客服弹出层 -->
      <nut-popup
        class="service-popup"
        closeable
        round
        v-model="serviceVisible"
      >
        <service-popup ref="servicePopup"></service-popup>
      </nut-popup>
      <!-- 图片轮播swiper -->
      <img-swiper ref="imgSwiper" class="img-swiper"></img-swiper>
      <!-- 菜单功能键列表swiper -->
      <!-- <menu-swiper ref="menuSwiper"></menu-swiper> -->
      <menu-gallary ref="menuGallary"></menu-gallary>
    </view>

    <!-- 资讯栏 -->
    <view class="info-wrapper">
      <view class="info-title-box">
        <view class="info-title-text">
          <text class="hehe">合和</text>
          <text>资讯</text>
        </view>
      </view>
      <view class="info-bar">
        <nut-noticebar
          left-icon="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
        >
          <uni-link
            href="https://www.ss-hehe.com/article/detail/post-147.html"
            text="匠心匠品，至诚至精 | 合和国家认可CNAS实验室"
            showUnderLine="false"
            color="#d37d42"
          ></uni-link>
        </nut-noticebar>
      </view>
    </view>

    <!-- 各个分类榜单 -->
    <sale-type ref="saleType"></sale-type>
    <!-- 推荐Tab部分 -->
    <recommend-tab ref="recommendTab"></recommend-tab>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
	</view>
</template>

<script>
import TopNav from './component/topNav'
import ServicePopup from './component/servicePopup'
import ImgSwiper from './component/imgSwiper'
import MenuSwiper from './component/menuSwiper'
import menuGallary from './component/menuGallary'
import SaleType from './component/saleType'
import RecommendTab from './component/recommendTab'
import BackTop from '@/components/backTop'

export default {
	name: 'Index',
  components: {
    TopNav,
    ServicePopup,
    ImgSwiper,
    MenuSwiper,
    menuGallary,
    SaleType,
    RecommendTab,
    BackTop
  },
	data() {
		return {
      serviceVisible: false
		}
	},
	mounted() {

	},
  activated() {
    // console.log('index page activated')
  },
  deactivated() {
    // console.log('index page deactivated')
  },
	methods: {
    showService() {
      this.serviceVisible = true
    }
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.content-wrapper {
  padding-bottom: 120rpx;
  background-color: #f5f5f5;
}
  
.bg-color-liner {
  background-image: linear-gradient($theme-color, #fff);
}
  
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.service-popup {
  width: 80vw;
  min-height: 50vh;
  border-radius: 10px;
}
  
.img-swiper {
  margin-top: 60px;
}

.brand-wrapper {
  height: 140rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .brand-logo {
    height: 80rpx;
    width: 350rpx;      
  }
}
  
.info-wrapper {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20rpx 0;
  background-color: #fff;
  .info-title-box {
    display: inline-block;
    width: 20%;
    height: 100%;
    font-size: 18px;
    .info-title-text {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: STXingkai, "Microsoft YaHei", 微软雅黑;
      font-weight: bold;
      .hehe {
        color: $theme-color;
      }
    }
  }
  .info-bar {
    display: inline-block;
    width: 75%;
    margin-right: 10rpx;
  }
}
  
.nut-noticebar {
  height: 50px;
  font-size: 15px;
}
</style>
