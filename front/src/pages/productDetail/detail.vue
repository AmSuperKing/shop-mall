<template>
  <view class="page-wrapper">
    <!-- 头部导航 -->
    <view class="header-nav white-bg">
      <view class="back-icon" @click="backPrePage">
        <uni-icons type="back" color="#999" size="25" />
      </view>
      <view class="title-text">
        商品详情
      </view>
    </view>
    <!-- 图片列表 -->
    <img-banner
      ref="imgBanner"
      class="img-banner"
      :imgList="imgList"
      @hideFloatNav="hideFloatNavMoment"
      @showFloatNav="handlePopupControl"
    />
    <!-- 价格、收藏、分享一栏 -->
    <view class="price-container white-bg">
      <view class="price-content">
        <!-- 价格 -->
        <view class="price-box">
          <text v-if="!goodsDetail.price" class="wait-status">待咨询</text>
          <nut-price
            v-if="goodsDetail.price"
            class="curr-price"
            :price="goodsDetail.price" 
            :decimalDigits="2" 
            :needSymbol="true" 
            :thousands="true"
          />
          <text
            v-if="goodsDetail.historyPrice"
            class="old-price"
          >¥{{goodsDetail.historyPrice}}</text>
        </view>
        <!-- 收藏按钮 -->
        <view class="collect-box">
          <view class="collect-icon">
            <uni-icons type="star" color="#f5222f" size="25" />
          </view>
        </view>
        <!-- 分享按钮 -->
        <view class="share-box">
          <view class="share-icon">
            <uni-icons type="redo" color="#f5222f" size="25" />
          </view>
        </view>
      </view>
    </view>
    <!-- 商品信息标题 -->
    <view class="product-info-title white-bg">
      <view class="info-title">
        {{goodsDetail.goodsName + goodsDetail.goodsModel}}
      </view>
    </view>
    <!-- 商品规格库存信息 -->
    <view class="product-info-about white-bg">
      <view class="product-sales">
       销量： <text class="black-text">{{goodsDetail.sale}}</text>
      </view>
      <view class="model-and-storage common-size">
        <view class="product-model">
          型号：<text class="black-text">{{goodsDetail.goodsModel}}</text>
        </view>
        <view class="product-storage">
          库存：<text class="black-text">{{goodsDetail.store}}</text>
        </view>
      </view>
      <view class="common-size">
        运费：<text class="black-text">满99包邮</text>
      </view>
      <view class="product-size common-size">
        <view class="curr-size-box">
          <view class="curr-size">
            选择：<!-- <text>325*855MM</text> -->
          </view>
          <view class="more-icon-box">
            <uni-icons
              type="more-filled"
              color="#666"
              size="22"
              @click="showSelectSize"
            />
          </view>
        </view>
        <view class="total-box">
          <view class="curr-size-img">
            <image :src="goodsDetail.coverImg" class="curr-thumbnail-img"></image>
          </view>
          <view class="total-size-num">
            共<text class="black-text">1</text>种规格可选
          </view>
        </view>
      </view>
    </view>
    <!-- 选择规格弹出层 -->
    <nut-popup
      position="bottom"
      round
      closeable
      close-icon="cross"
      close-icon-position="top-right"
      v-model="sizeOptionVisible"
      :style="{ height: '75%' }"
      @close="handlePopupControl"
      @click-overlay="handlePopupControl"
    >
      <option-info ref="optionInfo" :goodsInfo="goodsDetail"></option-info>
    </nut-popup>
    <!-- 同类商品推荐 -->
    <similar-recommend ref="similarRecommend"></similar-recommend>
    <!-- 商品参数、详情、评价 -->
    <product-params ref="productParams"></product-params>
    <!-- 底部菜单nav -->
    <bottom-nav ref="bottomNav"></bottom-nav>
    <!-- 悬浮导航 -->
    <fluidized-nav v-show="floatNavVisible"></fluidized-nav>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import ImgBanner from '@/components/imgBanner/imgBanner'
import SimilarRecommend from './components/similarRecommend'
import ProductParams from './components/productParams'
import BottomNav from './components/bottomNav'
import fluidizedNav from '@/components/fluidizedNav/fluidizedNav'
import OptionInfo from './components/optionInfo'
import BackTop from '@/components/backTop'
import { goodsApi } from '@/api/goodsApi'

export default {
  name: 'ProductDetail',
  components: {
    ImgBanner,
    SimilarRecommend,
    ProductParams,
    BottomNav,
    fluidizedNav,
    OptionInfo,
    BackTop
  },
  data() {
    return {
      imgList: [],
      goodsDetail: {},
      sizeOptionVisible: false,
      floatNavVisible: true,
      goodsId: ''
    }
  },
  onLoad() {
    this.goodsId = this.$Route.query.goodsId
    if (!this.goodsId) {
      this.$Router.replace('/')
      this.$toast.text('获取参数失败，无法正确打开页面')
    }
  },
  mounted () {
    this.getGoodsDetail()
  },
  methods: {
    getGoodsDetail() {
      if (this.goodsId) {
        uni.showLoading({
          title: '数据加载中...'
        })
        const param = {
          goodsId: this.goodsId
        }
        goodsApi.getGoodsDetail(param).then(res => {
          // console.log('getGoodsDetail', res.data)
          if (res && res.data) {
            this.goodsDetail = res.data
            this.imgList = res.data.carouselList
            this.$refs.productParams.goodsInfo =  res.data
            this.$refs.optionInfo.optionInfo = res.data
            if (res.data.conments && res.data.conments.length > 0) {
              this.$refs.productParams.haveComments = true
            } else {
              this.$refs.productParams.haveComments = false
            }
          } else {
            this.$toast.text('获取商品详情出错')
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          uni.hideLoading()
        })
      }
    },
    backPrePage() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        uni.switchTab({
          url: '/'
        })
      } else {
        uni.navigateBack({
          delta: 1
        })
      }
    },
    hideFloatNavMoment() {
      this.floatNavVisible = false
    },
    showSelectSize() {
      this.sizeOptionVisible = true
      this.$refs.optionInfo.goodsId = this.goodsId
      this.$refs.optionInfo.getGoodsDetail()
      this.floatNavVisible = false
    },
    handlePopupControl() {
      this.floatNavVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  padding-bottom: 100rpx;
  background-color: #f5f5f5;
  .header-nav {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #eee;
    .back-icon {
      height: 100%;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title-text {
      width: 100%;
      padding-right: 50px;
      text-align: center;
      font-size: 15px;
      color: #444;
    }
  }
}
.img-banner {
  margin-top: 50px;
  border-bottom: 1px solid #eee;
}
.price-container {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  .price-content {
    width: 90%;
    margin: 0 auto;
    padding: 12px 8px;
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    color: #f5222f;
    border: 1px solid #f5222f;
    background-color: #ffebec;
    .price-box {
      flex: 4;
      text-align: left;
      .wait-status {
        font-size: 18px;
      }
      .curr-price {
        font-size: 18px;
      }
      .old-price {
        margin-left: 15px;
        text-decoration: line-through;
        font-size: 12px;
      }
    }
    .collect-box {
      flex: 1;
    }
    .share-box {
      flex: 1;
    }
  }
}
.product-info-title {
  width: 100%;
  padding: 10px 0 20px;
  .info-title {
    width: 92%;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: "Times New Roman", "Microsoft Yahei", Georgia, Serif, Sans-serif, 宋体;
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
}
.common-size {
  padding: 10px 28px;
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #eee;
}
.black-text {
  color: #333;
}
.white-bg {
  background-color: #fff;
}
.product-info-about {
  .product-sales {
    padding: 0 28px 10px;
    font-size: 14px;
    color: #999;
    border-bottom: 1px solid #eee;
  }
  .model-and-storage {
    display: flex;
    .product-model {
      flex: 1;
    }
    .product-storage {
      flex: 1;
    }
  }
  .product-size {
    .curr-size-box {
      display: flex;
      flex-direction: row;
      .curr-size {
        flex: 5;
      }
      .more-icon-box {
        flex: 1;
        text-align: right;
      }
    }
    .total-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      .curr-size-img {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        .curr-thumbnail-img {
          width: 100%;
          height: 100%;
        }
      }
      .total-size-num {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 30px;
        margin-left: 20px;
        padding: 0 14px;
        background-color: #f5f5f5;
        border-radius: 5px;
      }
    }
  }
}
</style>
