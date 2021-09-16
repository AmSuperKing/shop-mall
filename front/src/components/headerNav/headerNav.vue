<template>
  <view
    class="header-nav"
    :style="'background-color: ' + bgColor + ';'"
  >
    <view class="back-icon-box" @click="backPrePage">
      <uni-icons type="arrowleft" :color="color" size="25" />
    </view>
    <view
      class="page-title"
      :style="'color:' + color"
    >{{title}}</view>
  </view>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    // 标题内容
    title: {
      type: String,
      default () {
        return ''
      }
    },
    // 字体颜色
    color: {
      type: String,
      default: '#000'
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#fff'
    },
    backUrl: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {}
  },
  methods: {
    backPrePage() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        if (this.backUrl !== '/') {
          this.$Router.replaceAll(this.backUrl)
        } else {
          this.$Router.replaceAll('/')
        }
      } else {
        this.$Router.back(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  position: fixed;
  top: 0;
  z-index: 2020;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 2rpx solid #eee;
  .back-icon-box {
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    .back-icon {
      width: 20px;
      height: 20px;
    }
  }
  .page-title {
    width: 100%;
    padding-right: 50px;
    font-size: 16px;
  }
}
</style>
