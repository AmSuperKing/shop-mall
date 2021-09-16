<template>
  <div class="full">
    <el-image
      style="width:133px;height: 32px;margin-top:10px;margin-left:38px;"
      :src="logo"
      fit="contain"
    />

  </div>
</template>
<script>
export default {
  name: 'VHeader',
  data() {
    return { logo: require('@/assets/logo_handp.png') }
  }
}
</script>
<style scoped>
.full {
  width: 100%;
  height: 100%;
  /* text-align: center; */
}

.copy-text {
  font-family: PingFangTC-Regular;

  font-size: 14px;
  color: #ffffff;
}
</style>
