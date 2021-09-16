<template>
  <view class="content-title">
    <image src="@/static/icons/new.png" class="new-icon"></image>
    <text class="title-text">{{title}}</text>
    <image src="@/static/icons/new.png" class="new-icon"></image>
  </view>
</template>

<script>
export default {
  name: 'LineHeader',
  props: {
    title: {
      type: String,
      default: '推荐'
    }
  }
}
</script>

<style lang="scss" scoped>
.content-title {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: #fff;
  .new-icon {
    width: 60px;
    height: 60px;
  }
  .new-icon:first-child {
    transform: rotate(180deg);
  }
  .title-text {
    margin: 0 20px;
    font-weight: bold;
  }
}
</style>
