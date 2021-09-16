<template>
  <view class="wrapper">
    <header-nav
      ref="headerNav"
      title="热销排行"
    ></header-nav>
    <view class="content">
      <view class="banner">
        <image src="../../static/topSelling/topSelling.png" class="banner-img" mode="scaleToFill"></image>
      </view>
      <view class="list-title-box">
        <view class="list-title">热销排行</view>
      </view>
      <view class="top-selling-list-box">
        <view class="top-selling-list">
          <view
            class="top-selling-item"
            v-for="(item, index) of topSellData"
            :key="index"
            @click="toProductDetail(item)"
          >
            <view class="top-rank">
              <view class="rank-box">
                <image src="../../static/topSelling/topTag.png" class="top-bg-img"></image>
                <view class="top-rank-num">{{index + 1}}</view>
              </view>
            </view>
            <view class="item-img-box">
              <image :src="item.coverImg" class="item-img"></image>
            </view>
            <view class="item-info">
              <view class="desc-text">
                <view class="title-text">
                  {{item.goodsName + item.goodsModel}}
                </view>
              </view>
              <view class="price-and-buy">
                <view v-if="item.price" class="price">
                  <text class="yuan-symbol">¥</text>
                  <text class="price-num">{{item.price}}</text>
                </view>
                <view v-else>
                  <uni-tag
                    type="success"
                    size="small"
                    :mark="true"
                    text="待咨询"
                  />
                </view>
                <view class="buy-btn">前往购买</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import BackTop from '@/components/backTop'
import { goodsApi } from '@/api/goodsApi'

export default {
  name: 'HotSale',
  components: {
    HeaderNav,
    BackTop
  },
  data() {
    return {
      topSellData: []
    }
  },
  mounted() {
    this.getTopSellData()
  },
  methods: {
    getTopSellData() {
      uni.showLoading({
        title: '数据记载中...'
      })
      goodsApi.getTopSell().then(res => {
        if (res && res.data) {
          // console.log('getTopSellData', res.data)
          this.topSellData = res.data
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        uni.hideLoading()
      })
    },
    toProductDetail(item) {
      if (item.goodsId) {
        this.$Router.push(`/pages/productDetail/detail?goodsId=${item.goodsId}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .content {
    margin-top: 55px;
    background-image: linear-gradient(to bottom left, #f5f5f5, #f87159, #d13f2f);
    .banner {
      width: 100%;
      height: 30vh;
      .banner-img {
        width: 100%;
        height: 100%;
      }
    }
    .list-title-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .list-title {
        width: 200rpx;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30rpx 0;
        text-align: center;
        font-size: 32rpx;
        color: #fff56f;
        font-weight: bolder;
        border-radius: 40rpx;
        background-image: linear-gradient(to right, #e8383a, #f87159);
        box-shadow: 0 4px 6px 0 #c32c1b;
      }
    }
    .top-selling-list-box {
      width: 100%;
      display: flex;
      justify-content: center;
      .top-selling-list {
        width: 90%;
        min-height: 50vh;
        margin-bottom: 50rpx;
        padding-bottom: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 10rpx solid #f87159;
        box-shadow: 0 4px 6px 0 #c02616;
        .top-selling-item {
          width: 90%;
          height: 300rpx;
          margin: 0 auto;
          margin-top: 30rpx;
          display: flex;
          position: relative;
          border: 6rpx solid #f87159;
          border-radius: 20rpx;
          background-image: linear-gradient(to right, #f87159, #c02616);
          box-shadow: 0 4px 6px 0 #c02616 inset;
          .top-rank {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            .rank-box {
              position: relative;
              width: 100%;
              height: 100%;
              .top-bg-img {
                position: absolute;
                top: 0;
                left: 1px;
                right: 0;
                width: 100%;
                height: 100%;
                margin: 0 auto;
              }
              .top-rank-num {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 5;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
              }
            }
          }
          .item-img-box {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 6rpx;
            .item-img {
              width: 180rpx;
              height: 180rpx;
            }
          }
          .item-info {
            flex: 2;
            padding: 20rpx;
            .desc-text {
              .title-text {
                margin: 20rpx 0 30rpx;
                font-size: 30rpx;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
            .price-and-buy {
              height: 90rpx;
              margin-top: 20px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              color: #fff56f;
              .price {
                .yuan-symbol {
                  font-size: 26rpx;
                }
                .price-num {
                  font-size: 32rpx;
                }
              }
              .buy-btn {
                width: 150rpx;
                height: 40rpx;
                padding: 6rpx;
                float: right;
                text-align: center;
                font-size: 30rpx;
                color: #c02616;
                font-weight: bold;
                border-radius: 8rpx;
                background-color: #fff56f;
              }
            }
          }
        }
      }
    }
  }
}
</style>
