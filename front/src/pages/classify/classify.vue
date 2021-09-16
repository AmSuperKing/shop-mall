<template>
	<view class="page-wrapper">
		<view class="header-search">
		  <view class="search-input" @click="goToSearch">
		    <image src="../../static/icons/search.png" class="search-icon"></image>
        <text class="placeholde-text">请输入商品名称、型号或品牌</text>
		  </view>
		</view>
    <goods-about
      ref="goodsAbout"
      :useInClassify="true"
    ></goods-about>
	</view>
</template>

<script>
import GoodsAbout from './component/goodsAbout'

export default {
  name: 'Classify',
  components: {
    GoodsAbout
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  activated() {
    // console.log('classify page activated')
  },
  methods: {
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
    background-color: #fff;
    .search-input {
      display: flex;
      align-items: center;
      width: 80%;
      height: 40%;
      padding: 5px 5px 5px 10px;
      border: 1px solid #eee;
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
</style>
