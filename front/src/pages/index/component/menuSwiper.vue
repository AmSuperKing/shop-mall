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
        :autoplay="false"
        :current="swiperDotIndex"
        :circular="false"
        @change="change"
      >
				<!-- 滚动滑块菜单第一页 -->
        <swiper-item class="flex-container">
          <view class="menu-list">
            <span
              class="menu-list-item"
              v-for="(item, index) of menuList1"
							:key="index"
              @click="toTypePage(item)"
            >
              <view class="item-box">
                <image :src="require('../../../static/icons/' + item.icon)" class="menu-item-icon"></image>
                <text class="menu--item-text">{{item.name}}</text>
              </view>
            </span>
          </view>
        </swiper-item>
        <!-- 滚动滑块菜单第二页 -->
        <swiper-item class="flex-container">
          <view class="menu-list">
            <span
              class="menu-list-item"
              v-for="(item, index) of menuList2"
							:key="index"
              @click="toTypePage(item)"
            >
              <view class="item-box">
                <image :src="require('../../../static/icons/' + item.icon)" class="menu-item-icon"></image>
                <text class="menu--item-text">{{item.name}}</text>
              </view>
            </span>
          </view>
        </swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
import store from '@/store'
import { homeApi } from '@/api/homeApi'

export default {
	name: 'MenuSwiper',
	data() {
		return {
			info: [{
				colorClass: 'uni-bg-white',
				content: '内容加载中'
			}, {
				colorClass: 'uni-bg-white',
				content: '内容加载中'
			}],
			menuList1: [{
				icon: 'door.png',
				name: '门窗配件'
			}, {
				icon: 'fastening.png',
				name: '紧固件'
			}, {
				icon: 'hardcover.png',
				name: '精装五金'
			}, {
				icon: 'tool.png',
				name: '工程五金'
			}, {
				icon: 'hotel.png',
				name: '酒店产品'
			}, {
				icon: 'bath.png',
				name: '厨房卫浴'
			}, {
				icon: 'paint.png',
				name: '油漆涂料'
			}, {
				icon: 'community.png',
				name: '智慧社区'
			}, {
				icon: 'chemical.png',
				name: '化学建材'
			}, {
				icon: 'lock.png',
				name: '智能家居'
			}],
			menuList2: [{
				icon: 'decoration.png',
				name: '装饰材料'
			}, {
				icon: 'light.png',
				name: '灯具照明'
			}, {
				icon: 'electrician.png',
				name: '电工电料'
			}, {
				icon: 'led.png',
				name: 'LED'
			}, {
				icon: 'toolbox.png',
				name: '工具仪器'
			}, {
				icon: 'drill.png',
				name: '机电设备'
			}, {
				icon: 'cycle.png',
				name: '环卫设备'
			}, {
				icon: 'protect.png',
				name: '防护产品'
			}, {
				icon: 'homelife.png',
				name: '家具日用'
			}, {
				icon: 'rules.png',
				name: '文具办公'
			}],
			modeIndex: -1,
			styleIndex: -1,
			current: 0,
			mode: 'default',
			dotsStyles: {
				backgroundColor: 'rgba(31, 147, 116, .5)',
				border: '1px rgba(31, 147, 116, .7) solid',
				color: '#fff',
				selectedBackgroundColor: 'rgba(31, 147, 116, 1)',
				selectedBorder: '1px rgba(31, 147, 116, 1) solid'
			},
			swiperDotIndex: 0
		}
	},
	mounted() {
    // this.getMainTypes()
  },
	methods: {
    getMainTypes() {
      homeApi.getMainTypes().then(res => {
        // console.log('getMainTypes', res)
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
			// console.log('click', index)
		},
		toTypePage(item) {
			this.$Router.push({ path: '/pages/goodsType/goodsType', query: { menuItem: item.name }})
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
		height: 330rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		color: #fff;
	}

	.image {
		width: 100%;
    height: 25vh;
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
		background-color: #fff;
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
  
  .uni-bg-white {
  	background-color: #fff !important;
  }
  
  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .menu-list {
    width: 100%;
    .menu-list-item {
      display: inline-block;
      width: 20%;
      padding: 10px 0;
      text-align: center;
      .item-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .menu-item-icon {
          display: block;
          width: 80rpx;
          height: 80rpx;
          margin: 0 auto;
        }
        .menu--item-text {
          margin: 0 auto;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
</style>