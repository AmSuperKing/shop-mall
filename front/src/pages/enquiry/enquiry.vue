<template>
	<view class="page-wrapper">
    <view class="top-header">
      <!-- 顶部标题栏 -->
      <!-- <view class="title">
      	<view class="title-text">询价篮</view>
      </view> -->
      <!-- 顶部按钮组 -->
      <view class="top-btns">
      	<uni-segmented-control
          :current="btnCurrent"
          :values="btnItems"
          :style-type="buttonType"
          :active-color="styles.subThemeColor"
          @clickItem="onClickBtnItem"
        />
      </view>
      <!-- 分类按钮组 -->
      <view class="top-types">
      	<uni-segmented-control
          :current="typeCurrent"
          :values="typeItems"
          :style-type="textType"
          :active-color="styles.subThemeColor"
          @clickItem="onClickTypeItem"
        />
      </view>
    </view>
    <!-- 按钮、分类组切换对应内容 -->
    <enquiry-product-list ref="enquiryProductList" class="product-list" />
    <!-- 猜你喜欢 -->
    <guess-like ref="guessLike"></guess-like>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
	</view>
</template>

<script>
import EnquiryProductList from './component/enquiryProductList'
import GuessLike from '@/components/guessLike'
import BackTop from '@/components/backTop'
import styles from '@/assets/scss/variables.scss'

export default {
	name: 'Enquiry',
  components: {
    EnquiryProductList,
    GuessLike,
    BackTop
  },
	data() {
		return {
      btnItems: ['线上购买产品', '线下购买产品'],
      typeItems: ['待询价', '询价中', '已询价'],
      btnCurrent: 0,
      typeCurrent: 0,
      // activeColor: '#14aa79',
      buttonType: 'button',
      textType: 'text'
		}
	},
  computed: {
    styles() {
      return styles
    }
  },
	onLoad() {

	},
	mounted() {
		
	},
  activated() {
    // console.log('enquiry page activated')
  },
	methods: {
    onClickBtnItem(e) {
    	if (this.btnCurrent !== e.currentIndex) {
    		this.btnCurrent = e.currentIndex
    	}
    },
    onClickTypeItem(e) {
      if (this.typeCurrent !== e.currentIndex) {
      	this.typeCurrent = e.currentIndex
      }
    },
    change(e) {
      this.current = e.detail.current
    }
	}
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #f5f5f5;
  padding-bottom: 50rpx;
  .top-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    .title {
      height: 60rpx;
      padding: 20rpx;
      text-align: center;
      background-color: #FFFFFF;
      .title-text {
        line-height: 60rpx;
        font-size: 30rpx;
        color: #666;
        font-weight: 600;
      }
    }
    .top-btns {
      padding: 20px 30px 10px;
      background-color: #fff;
    }
    .top-types {
      padding: 10px 30px 5px;
      background-color: #fff;
    }
  }
  .product-list {
    margin-top: 120px;
  }
}
</style>
