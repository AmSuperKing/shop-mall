<template>
  <view class="img-box">
    <image
      :src="bannerImg"
      class="banner-img"
    ></image>
  </view>
</template>

<script>
export default {
  name: 'TypePageBanner',
  props: {
    bannerImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.img-box {
  width: 100%;
  height: 600rpx;
  background-image: linear-gradient($green-alpha, $theme-color);
  .banner-img {
    width: 100%;
    height: 100%;
  }
}
</style>
