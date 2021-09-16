<template>
	<view class="content">
    <!-- 图片列表组 -->
		<uni-swiper-dot
      class="uni-swiper-dot-box"
      :info="imgList"
      :current="current"
      :mode="mode"
      :dots-styles="dotsStyles"
      field="content"
      @clickItem=clickItem
    >
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
		</uni-swiper-dot>

    <!-- 图片画廊 -->
    <fade-animation>
      <img-gallary
        v-show="showGallary"
        ref="imgGallary"
        :imgList="imgList"
        :swiperDotIndex="currIndex"
        @close="handleGallaryClose"
      >
      </img-gallary>
    </fade-animation>
	</view>
</template>

<script>
import FadeAnimation from '@/components/fade/fadeAnimation'
import ImgGallary from '@/components/imgGallary/imgGallary'

export default {
  name: 'ImgBanner',
  props: {
    imgList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    FadeAnimation,
    ImgGallary
  },
  data() {
    return {
      current: 0,
      mode: 'dot',
      dotsStyles: {
        backgroundColor: 'rgba(255, 235, 236, 1)',
        border: '1px rgba(243, 3, 48, .7) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(243, 3, 48, 1)',
        selectedBorder: '1px rgba(243, 3, 48, 1) solid'
      },
      swiperDotIndex: 0,
      showGallary: false,
      currIndex: 0
    }
  },
  onLoad() {},
  methods: {
    change(e) {
      // console.log('imgBanner change index', e.detail.current)
      this.current = e.detail.current
      this.currIndex = e.detail.current
    },
    clickItem(e) {
      // console.log('clickItem', e)
      this.swiperDotIndex = e
    },
    onBanner(index) {
      // console.log('imgBanner onBanner index', index)
      this.currIndex = index
      this.showGallary = true
      this.$emit('hideFloatNav')
      this.$refs.imgGallary.currIndex = index + 1
      this.$refs.imgGallary.totalNum = this.imgList.length
    },
    handleGallaryClose(val) {
      this.showGallary = false
      this.$emit('showFloatNav')
      this.current = val - 1
      this.swiperDotIndex = val - 1
    }
  }
}
</script>

<style lang="scss" scoped>
	@charset "UTF-8";

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
	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 100%;
			margin: 0 auto;
		}
		.image {
			width: 100%;
		}
	}
</style>