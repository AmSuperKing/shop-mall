<template>
  <view>
    <!-- 返回顶部按钮 -->
    <nut-backtop :bottom="70">
      <div class="back-page-top">
        <nut-icon type="top" color="#2e2d2d"></nut-icon>
      </div>
    </nut-backtop>
  </view>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.back-page-top {
  background-color: rgba(255, 255, 255, .7);
  color: #2e2d2d;
  display: flex;
  height: 45px;
  width: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.35);
}
</style>
