<template>
  <view class="empty-content">
    <view class="no-content">
      <view class="no-result-img-box">
        <image src="../../../static/imgs/empty-result.png" class="no-result-img"></image>
      </view>
      <view class="no-result-txt">
        没有找到
        <text v-if="searchWord" class="search-word">
          {{'"'+ searchWord + '"'}}
        </text>
        相关的产品
      </view>
    </view>
    
    <!-- 猜你喜欢 -->
    <guess-like ref="guessLike"></guess-like>
  </view>
</template>

<script>
import GuessLike from '@/components/guessLike'
export default {
  name: 'NoReasult',
  components: {
    GuessLike
  },
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.empty-content {
  width: 100%;
  padding-bottom: 40rpx;
  background-color: #f5f5f5;
  .no-content {
    width: 100%;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
    background-color: #fff;
    .no-result-img-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .no-result-img {
        width: 400rpx;
        height: 400rpx;
      }
    }
    .no-result-txt {
      text-align: center;
      font-size: 15px;
      color: #666;
      .search-word {
        color: #f5222f;
      }
    }
  }
}
</style>
