<template>
  <view class="wrapper">
    <header-nav
      ref="headerNav"
      title="爆款专区"
    ></header-nav>
    <view class="content">
      <view class="banner">
        <image src="../../static/banner.jpg" class="banner-img" mode="scaleToFill"></image>
      </view>
      <view class="list-title-box">
        <view class="list-title">爆款推荐</view>
      </view>
      <view class="hot-sale-list-box">
        <view class="hot-sale-list">
          <view class="hot-list-item"
            v-for="item of recData"
            :key="item.goodsId"
            @click="toProductDetail(item.goodsId)"
          >
            <view class="item-img-box">
              <image :src="item.coverImg" class="item-img"></image>
            </view>
            <view class="item-info">
              <view class="desc-text">
                <view class="title-text">
                  {{item.goodsName}}{{item.goodsModel}}
                  <view class="sale-num">销量：{{item.sale}}</view>
                </view>
              </view>
              <view v-if="item.price" class="price-and-buy">
                <view class="price">
                  <text class="yuan-symbol">¥</text>
                  <text class="price-num">88.48</text>
                </view>
                <view class="buy-btn">前往购买</view>
              </view>
              <view v-else class="price-and-buy">
                <view class="buy-btn">前往详情</view>
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
import { homeApi } from '@/api/homeApi'

export default {
  name: 'HotSale',
  components: {
    HeaderNav,
    BackTop
  },
  data() {
    return {
      recData: []
    }
  },
  mounted() {
    this.getRecGoods()
  },
  methods: {
    toProductDetail(id) {
      if (id) {
        this.$Router.push(`/pages/productDetail/detail?goodsId=${id}`)
      }
    },
    getRecGoods() {
      uni.showLoading({
        title: '数据加载中'
      })
      homeApi.getRecGoods().then(res => {
        if (res && res.data) {
          this.recData = res.data
        }
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        uni.hideLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .content {
    margin-top: 55px;
    background-image: linear-gradient(to bottom, #d13f2f, #fac79c);
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
        color: #bd2213;
        font-weight: bolder;
        border-radius: 40rpx;
        background-image: linear-gradient(to right, #fce0c3, #fac79c);
        box-shadow: 0 4px 6px 0 #c32c1b;
      }
    }
    .hot-sale-list-box {
      width: 100%;
      display: flex;
      justify-content: center;
      .hot-sale-list {
        width: 90%;
        min-height: 50vh;
        margin-bottom: 50rpx;
        padding-bottom: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 10rpx solid #ffbe91;
        box-shadow: 0 4px 6px 0 #c02616;
        .hot-list-item {
          width: 90%;
          height: 300rpx;
          margin: 0 auto;
          margin-top: 30rpx;
          display: flex;
          border: 6rpx solid #ffbe91;
          border-radius: 20rpx;
          background-image: linear-gradient(to right, #ed6654, #c02616);
          box-shadow: 0 4px 6px 0 #c02616 inset;
          &:nth-of-type(2n) {
            flex-direction: row-reverse;
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
                height: 84rpx;
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
.sale-num {
  margin-top: 4px;
  font-size: 13px;
}
</style>
