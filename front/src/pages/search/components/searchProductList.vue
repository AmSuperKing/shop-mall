<template>
  <view class="list-content">
    <!-- 宫格布局显示 -->
    <view v-show="showGrid" class="grid-show">
      <view
        class="item-box"
        v-for="item of searchData"
        :key="item.goodsId"
      >
        <view class="item" @click="toDetail(item)">
          <view class="item-img-box">
            <image :src="item.coverImg" class="item-img"></image>
          </view>
          <view class="item-info">
            {{item.goodsName + item.goodsModel}}
          </view>
          <view class="item-price-state">
            <view class="wait-enquiry">
              <uni-tag
                v-if="!item.price"
                type="success"
                size="small"
                :mark="true"
                :inverted="true"
                text="待询价"
              />
            </view>
            <view v-if="item.price" class="have-price">
              <text class="price-now">¥{{item.price}}</text>
              <text v-if="item.historyPrice" class="price-old">¥{{item.historyPrice}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 列表显示 -->
    <view v-show="!showGrid" class="list-show">
      <view
        class="list-item"
        v-for="item in 11"
        :key="item"
        @click="toDetail"
      >
        <view class="list-item-img-box">
          <image :src="recLikeList[0].imageUrl" class="list-item-img"></image>
        </view>
        <view class="list-item-info-box">
          <view class="list-item-title">
            {{recLikeList[0].name}}
          </view>
          <view class="list-item-price">
            <view class="list-item-tag">
              <uni-tag
                type="success"
                size="small"
                :mark="true"
                :inverted="true"
                :text="recLikeList[0].state"
              />
            </view>
            <view class="have-price">
              <text class="price-now">¥1148.62</text>
              <text class="price-old">¥998.68</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="bottom-txt">
      以上就是全部啦~
    </view>
  </view>
</template>

<script>
export default {
  name: 'searchProductList',
  data() {
    return {
      showGrid: true,
      recLikeList: [{
        name: '家具门窗五金防盗门智能锁JZMS02家具门窗五金防盗门智能锁JZMS02家具门窗五金防盗门智能锁JZMS02',
        imageUrl: 'https://img-8memttkzse2ptmwsin60wg.jumitop.cn/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202102/20210201234618326156.jpg',
        state: '询价',
        price: 8848.68
      }],
      searchData: []
    }
  },
  methods: {
    toDetail() {
      uni.navigateTo({
        url: ('/pages/productDetail/detail')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-content {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  .grid-show {
    width: 100%;
    padding-top: 30rpx;
    background-color: #f5f5f5;
    .item-box {
      width: 50%;
      margin-bottom: 26rpx;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 90%;
        min-height: 238px;
        border-radius: 20rpx;
        background-color: #fff;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.25);
        .item-img-box {
          width: 100%;
          padding-top: 10px;
          text-align: center;
          .item-img {
            width: 20vh;
            height: 20vh;
            margin: 10rpx auto;
          }
        }
        .item-info {
          margin: 10rpx auto;
          padding: 0 20rpx;
          font-size: 15px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .item-price-state {
          margin: 15rpx auto;
          padding: 0 20rpx;
          font-size: 13px;
        }
      }
    }
  }
  .list-show {
    width: 100%;
    .list-item {
      display: flex;
      flex-direction: row;
      padding: 30rpx 0;
      background-color: #fff;
      border-bottom: 2rpx solid #eee;
      .list-item-img-box {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .list-item-img {
          width: 200rpx;
          height: 200rpx;
        }
      }
      .list-item-info-box {
        flex: 2;
        .list-item-title {
          width: 90%;
          margin-bottom: 30rpx;
          font-size: 15px;
          color: #555;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .list-item-price {
          font-size: 15px;
          .list-query-state {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 130rpx;
            height: 18px;
            text-align: center;
            font-size: 13px;
            color: #f5222f;
            border: 2rpx solid #f5222f;
            border-radius: 10rpx;
            background: #fff;
          }
          .price-num {
            color: #f5222f;
          }
        }
      }
    }
  }
  .bottom-txt {
    margin-top: 15px;
    padding: 10rpx;
    text-align: center;
    font-size: 14px;
    color: #999;
    // background-color: #fff;
  }
}
.have-price {
  margin: 20rpx auto;
  .price-now {
    margin-right: 20rpx;
    font-size: 14px;
    color: #f5222f;
  }
  .price-old {
    text-decoration: line-through;
    font-size: 12px;
    color: #999;
  }
}
.uni-tag-text {
  font-size: 12px;
}
</style>
