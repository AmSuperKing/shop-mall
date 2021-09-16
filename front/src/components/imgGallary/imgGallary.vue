<template>
  <view class="container" @click="closeGallary">
    <swiper
      class="swiper-box"
      @change="change"
      :current="swiperDotIndex"
    >
      <swiper-item v-for="(item, index) in imgList" :key="index">
        <view class="swiper-item">
          <image
            class="image"
            mode="aspectFill"
            :src="item.carouselImg"
            :draggable="false"
            @click="onBanner(index)"
          />
        </view>
      </swiper-item>
    </swiper>
    <view v-show="pageNumVisible" class="num-box">
      {{currIndex}}/{{totalNum}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'ImgGallary',
  props: {
    imgList: {
      type: Array,
      default () {
        return []
      }
    },
    swiperDotIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data() {
    return {
      currIndex: 0,
      totalNum: 0,
      pageNumVisible: true
    }
  },
  methods: {
    closeGallary() {
      this.$emit('close', this.currIndex)
    },
    change(e) {
      // console.log('imgGallary change', e.detail.current)
      this.currIndex = e.detail.current + 1
    },
    onBanner(index) {
      // console.log('imgGallary onBanner', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@charset "UTF-8";

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
}

/* 头条小程序组件内不能引入字体 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  font-weight: normal;
  font-style: normal;
  src: url("~@/static/uni.ttf") format("truetype");
}

/* #endif */

.swiper-box {
  height: 500rpx;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500rpx;
  color: #fff;
}

.image {
  width: 100%;
  height: 500rpx;
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

.num-box {
  padding: 10px;
  text-align: center;
  font-size: 15px;
  color: #fff;
}
</style>
