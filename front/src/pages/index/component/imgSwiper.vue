<template>
	<view class="content">
		<uni-swiper-dot
      class="uni-swiper-dot-box"
      @clickItem="clickItem"
      :info="info"
      :current="current"
      :mode="mode"
      :dots-styles="dotsStyles"
      field="content"
    >
			<swiper
        class="swiper-box"
        :autoplay="true"
        :current="swiperDotIndex"
        :interval="3000"
        :circular="true"
        @change="change"
      >
				<swiper-item v-for="(item, index) of info" :key="index">
					<view :class="item.colorClass" class="swiper-item">
						<image
              class="image"
              :src="item.subMainTypeImg"
              mode="aspectFill"
              :draggable="false"
              @click="onBanner(index)"
            />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
import { homeApi } from '@/api/homeApi'

export default {
  data() {
    return {
      info: [],
      modeIndex: -1,
      styleIndex: -1,
      current: 0,
      mode: 'dot',
      dotsStyles: {
        backgroundColor: 'rgba(255, 255, 255, .6)',
        border: '1px rgba(31, 147, 116, .7) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(31, 147, 116, 1)',
        selectedBorder: '1px rgba(31, 147, 116, 1) solid'
      },
      swiperDotIndex: 0
    }
  },
  mounted() {
    this.getSwiperList()
  },
  methods: {
    getSwiperList() {
      homeApi
        .getSubTypes().then(res => {
          if (res && res.data) {
            this.info = res.data
          }
        }).catch(e => {
          console.log(e)
        })
    },
    change(e) {
      this.current = e.detail.current
    },
    clickItem(e) {
      this.swiperDotIndex = e
    },
    onBanner(index) {
      this.$Router.push('/pages/search/result')
    }
  }
}
</script>

<style lang="scss" scoped>
@charset "UTF-8";

@import '@/assets/scss/variables.scss';

/* 头条小程序组件内不能引入字体 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  font-weight: normal;
  font-style: normal;
  src: url("~@/static/uni.ttf") format("truetype");
}

/* #endif */
/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

view {
  font-size: 14px;
  line-height: inherit;
}

.example {
  padding: 0 15px 15px;
}

.example-info {
  padding: 15px;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  font-size: 14px;
  background-color: #ffffff;
}

/* #endif */
.example {
  padding: 0 15px;
}

.example-info {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 15px;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 20px;
}

.example-info-text {
  font-size: 14px;
  line-height: 20px;
  color: #3b4144;
}

.example-body {
  flex-direction: column;
  padding: 15px;
  background-color: #ffffff;
}

.word-btn-white {
  font-size: 18px;
  color: #FFFFFF;
}

.word-btn {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 48px;
  margin: 15px;
  background-color: #007AFF;
}

.word-btn--hover {
  background-color: #4ca2ff;
}

.swiper-box {
  height: 30vh;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #999;
  color: #fff;
}

.image {
  width: 100%;
  height: 30vh;
}

/* #ifndef APP-NVUE */
::v-deep .image img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

/* #endif */
@media screen and (min-width: 500px) {
  .uni-swiper-dot-box {
    width: 100vw;
    margin: 0 auto;
    margin-top: 8px;
  }

  .image {
    width: 100%;
  }
}

.uni-bg-green {
  background-color: $alpha-green;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: 20rpx;
}

.example-body-item {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15rpx;
  padding: 15rpx;
  height: 60rpx;
  /* #ifndef APP-NVUE */
  display: flex;
  padding: 0 15rpx;
  /* #endif */
  flex: 1;
  border-color: #e5e5e5;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}

.example-body-item-text {
  font-size: 28rpx;
  color: #333;
}

.example-body-dots {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50px;
  background-color: #333333;
  margin-left: 10rpx;
}

.active {
  border-style: solid;
  border-color: #007aff;
  border-width: 1px;
}
</style>