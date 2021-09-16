<template>
  <view class="content-wrapper">
    <!-- 标题栏 -->
    <view class="guess-title">
      <text class="dot-txt">·</text>
      <text class="title-txt">你可能会感兴趣</text>
      <image src="../static/icons/smile.png" class="smile-icon"></image>
      <text class="dot-txt">·</text>
    </view>
    <!-- 内容 -->
    <view class="recommend-list">
      <view
        class="list-item-box"
        v-for="item of recData"
        :key="item.goodsId"
        @click="toProductDetail(item)"
      >
        <view class="list-item">
          <image :src="item.coverImg" class="list-item-img"></image>
          <view class="list-item-title">
            {{item.goodsName + item.goodsModel}}
          </view>
          <view class="list-item-price">
            <nut-price v-if="item.price" :price="item.price" :thousands="true"/>
            <uni-tag
              v-else
              type="success"
              size="small"
              :mark="true"
              text="待咨询"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-tip">
      以上就是全部了~
    </view>
  </view>
</template>

<script>
import { homeApi } from '@/api/homeApi'

export default {
  name: 'GuessLike',
  data() {
    return {
      recData: []
    }
  },
  mounted() {
    this.getRecList()
  },
  methods: {
    getRecList() {
      homeApi.getRecGoods().then(res => {
        this.recData = res.data
      }).catch(e => {
        console.log(e)
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
.content-wrapper {
  width: 100%;
  background-color: #f5f5f5;
  .guess-title {
    width: 100%;
    height: 80rpx;
    padding-top: 30rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #666;
    .dot-txt {
      display: inline-block;
      padding: 20rpx;
      font-size: 40rpx;
      font-weight: bold;
    }
    .smile-icon {
      width: 25px;
      height: 25px;
    }
    .title-txt {
      font-size: 15px;
    }
  }
  .recommend-list {
    width: 100%;
    .list-item-box {
      width: 50%;
      display: inline-block;
      text-align: center;
      .list-item {
        display: inline-block;
        width: 90%;
        margin: 10rpx;
        padding-top: 10rpx;
        border-radius: 20rpx;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
        background-color: #fff;
        .list-item-img {
          display: inline-block;
          width: 20vh;
          height: 20vh;
        }
        .list-item-title {
          width: 90%;
          height: 100%;
          padding: 0 16rpx;
          text-align: justify;
          font-size: 14px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .list-item-price {
          width: 90%;
          padding: 10rpx 16rpx;
          text-align: left;
          font-size: 24rpx;
          color: red;
        }
      }
    }
  }
  .bottom-tip {
    padding: 20px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
