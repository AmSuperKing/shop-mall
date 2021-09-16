<template>
	<view class="page-wrapper">
		<view class="header-search">
      <view class="back-icon-box" @click="backPrePage">
        <image src="../../static/icons/back.png" class="back-icon"></image>
      </view>
		  <view class="search-input-box">
		    <view class="search-input" @click="goToSearch">
		      <image src="../../static/icons/search.png" class="search-icon"></image>
		      <text class="placeholde-text">请输入商品名称、型号或品牌</text>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    backPrePage() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        this.$Router.replaceAll('/')
      } else {
        this.$Router.back(1)
      }
    },
    goToSearch() {
      this.$Router.push('/pages/search/search')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  .header-search {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2rpx solid #eee;
    background-color: #fff;
    .back-icon-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .back-icon {
        width: 20px;
        height: 20px;
      }
    }
    .search-input-box {
      flex: 6;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      .search-input {
        display: flex;
        align-items: center;
        width: 80%;
        height: 40%;
        padding: 5px 5px 5px 5px;
        border: 2rpx solid #eee;
        border-radius: 10px;
        background-color: #f5f5f5;
        .search-icon {
          width: 20px;
          height: 20px;
        }
        .placeholde-text {
          padding-left: 20rpx;
          font-size: 15px;
          color: #939393;
        }
      }
    }
  }
}
</style>
