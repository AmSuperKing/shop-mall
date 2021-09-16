<template>
  <div class="all-center">
    <span class="copy-text">
      合和集采服务平台管理后台 &copy; Copyright 广东合和建筑五金制品有限公司 Corporation 2021.
    </span>
  </div>
</template>
<script>
export default {
  name: 'VFooter',
  data() {
    return {

    }
  }
}
</script>
<style scoped>
.all-center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /*实现水平居中*/
  align-items: center; /*实现垂直居中*/
}
.copy-text {
  font-size: 14px;
  color: #ffffff;
}
.img-font {
  padding-top: 6px;
  color: rgb(23, 90, 167);
  font-size: 40px;
}
</style>
