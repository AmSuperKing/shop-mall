<template>
  <view class="header-wrapper">
    <view class="back-icon flex-box"  @click="backPrePage">
      <uni-icons type="arrowleft" color="#000" size="25" />
    </view>
    <view class="header-title flex-box">
      {{title}}
    </view>
    <view class="header-search">
      <view class="search-box" @click="toSearchPage">
        <uni-icons
          class="search-icon"
          type="search"
          color="#999"
          size="20"
        />
        搜索...
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TypeHeader',
  props: {
    title: {
      type: String,
      default: '详情'
    }
  },
  data() {
    return {}
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
    toSearchPage() {
      this.$Router.push('/pages/search/search')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  height: 55px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2021;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background-color: #fff;
  .back-icon {
    flex: 1;
    width: 55px;
    height: 55px;
  }
  .header-title {
    flex: 4;
    height: 55px;
    padding-bottom: 4px;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  .header-search {
    flex: 5;
    height: 35px;
    line-height: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 10px;
    font-size: 14px;
    color: #999;
    border-radius: 8px;
    background-color: #f5f5f5;
    .search-icon {
      margin: 0 10px;
    }
  }
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
