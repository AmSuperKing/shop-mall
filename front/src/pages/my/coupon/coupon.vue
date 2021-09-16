<template>
	<view class="wrapper">
		<!-- 顶部标题栏 -->
    <header-nav
      ref="headerNav"
      title="我的优惠券"
      backUrl="/pages/my/my"
    ></header-nav>
    <view class="top-header">
      <!-- 分类按钮组 -->
      <view class="top-types">
      	<uni-segmented-control
          :current="typeCurrent"
          :values="typeItems"
          :style-type="textType"
          :active-color="activeColor"
          @clickItem="onClickTypeItem"
        />
      </view>
    </view>
    <!-- 可使用的优惠券 -->
    <enquiry-product-list v-if="couponShowList===0" ref="enquiryProductList" class="product-list" />
    <!-- 已使用的优惠券 -->
    <coupon-used-list v-if="couponShowList===1" ref="enquiryProductList" class="product-list" />
    <!-- 已过期的优惠券 -->
    <coupon-end-list v-if="couponShowList===2" ref="enquiryProductList" class="product-list" />
    <!-- 猜你喜欢模块 -->
    <guess-like ref="guessLike"></guess-like>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import EnquiryProductList from './component/couponCanUseList'
import couponUsedList from './component/couponUsedList'
import couponEndList from './component/couponEndList'
import HeaderNav from '@/components/headerNav/headerNav'
import GuessLike from '@/components/guessLike'
import BackTop from '@/components/backTop'

export default {
  name: 'coupon',
  components: {
    HeaderNav,
    EnquiryProductList,
    couponUsedList,
    couponEndList,
    GuessLike,
    BackTop
  },
  data() {
    return {
      info: '1',
      btnItems: ['线上购买产品', '线下购买产品'],
      typeItems: ['可使用', '已使用', '已过期'],
      buttonType: 'button',
      btnCurrent: 0,
      typeCurrent: 0,
      activeColor: '#14aa79',
      textType: 'text',
      couponShowList: 0
    }
  },
  mounted(){
    this.$nextTick(()=>{
    this.typeItems[0]=this.typeItems[0]+'(0)'
    this.typeItems[1]=this.typeItems[1]+'(0)'
    this.typeItems[2]=this.typeItems[2]+'(0)'
    })
  },
  methods: {
      back() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        uni.switchTab({
          url:'/'
        })
      } else {
        uni.navigateBack({
          delta: 1
        })
      }
    },
    onClickBtnItem(e) {
    	if (this.btnCurrent !== e.currentIndex) {
    		this.btnCurrent = e.currentIndex
    	}
    },
    onClickTypeItem(e) {
      if (this.typeCurrent !== e.currentIndex) {
      	this.typeCurrent = e.currentIndex
        this.couponShowList=this.typeCurrent
        // console.log('this.typeCurrent',this.typeCurrent)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-bottom: 30rpx;
}
.top-header {
    padding-top: 50px;
    .top-btns {
      padding: 20px 30px 10px;
      background-color: #fff;
    }
    .top-types {
        padding: 10px 30px 5px;
        background-color: #fff;
    }
}

.title {
  height: 30px;
	padding: 10px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
	text-align: center;
	border-bottom: 1px solid #eee;
	background-color: #fff;
    white-space:nowrap;
    background-color: #008461;
    align-items: center;
  .title-text {
    line-height: 30px;
    font-size: 15px;
    color: #eee;
    font-weight: 600;
  }
  .product-list {
    margin-top: 0px;
  }
  .detail-back {
    position: absolute;
    left: 0px;
    padding-top: 3px;
	width: 24px;
	height: 24px;
	color: rgba(238, 238, 238);
}
}
</style>