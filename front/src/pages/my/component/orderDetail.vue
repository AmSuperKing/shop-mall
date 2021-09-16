<template>
  <view class="content-wrapper">
    <!-- 头部 -->
    <view class="header-nav">
      <view class="back-icon flex-box" @click="backPrePage">
        <uni-icons type="arrowleft" color="#333" size="25" />
      </view>
      <view class="serach">
        <view class="header-search flex-box">
          <uni-icons type="search" color="#999" size="20" />
          输入订单号/商品关键词搜索订单
        </view>
      </view>
    </view>
    <!-- 详情列表 -->
    <order-detail-list
      ref="orderDetailList"
      class="header-menu"
      :activeIndex="activeIndex"
    ></order-detail-list>
    <!-- 猜你喜欢 -->
    <guess-like ref="guessLike"></guess-like>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import OrderDetailList from './orderDetailList'
import GuessLike from '@/components/guessLike'
import BackTop from '@/components/backTop'

export default {
  name: 'OrderDeatil',
  components: {
    OrderDetailList,
    GuessLike,
    BackTop
  },
  onLoad(option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('activeMenu', (data) => {
      // console.log('orderdetail:', data.activeIndex)
      this.activeIndex = data.activeIndex
    })
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  mounted() {
    
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-nav {
  height: 55px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  background-color: #fff;
  .back-icon {
    flex: 1;
    width: 35px;
    height: 100%;
  }
  .serach {
    flex: 6;
    .header-search {
      width: 90%;
      padding: 8px 5px;
      font-size: 14px;
      color: #999;
      border-radius: 5px;
      background-color: #f5f5f5;
    }
  }
}

.header-menu {
  margin-top: 55px;
}
</style>
