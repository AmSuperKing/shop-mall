<template>
  <view class="contact-card">
    <view class="title">在线客服</view>
    <uni-row>
      <uni-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <view class="contact-num">服务热线：0757-87310888</view>
      </uni-col>
      <uni-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <view class="contact-num">QQ客服：2509045492</view>
      </uni-col>
      <uni-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <view class="contact-num">传真：0757-87318666</view>
      </uni-col>
    </uni-row>
    <view class="contact-btn" @click="showService">联系客服</view>
    <!-- 点击客服弹出层 -->
    <nut-popup
      class="service-popup"
      closeable
      round
      v-model="serviceVisible"
    >
      <service-popup ref="servicePopup"></service-popup>
    </nut-popup>
  </view>
</template>

<script>
import ServicePopup from '@/pages/index/component/servicePopup'

export default {
  name: 'ContactCard',
  components: {
    ServicePopup
  },
  data() {
    return {
      serviceVisible: false
    }
  },
  methods: {
    showService() {
      this.serviceVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.contact-card {
  width: 90%;
  margin: 15px auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 3px 4px rgba(0, 0, 0, .3);
  .title {
    margin-bottom: 10px;
    font-size: 16px;
    color: $theme-color;
  }
  .contact-num {
    padding: 5px 15px;
    font-size: 14px;
    color: #999;
  }
  .contact-btn {
    display: inline-block;
    padding: 2px 15px;
    font-size: 14px;
    color: $theme-color;
    border: 1px solid $theme-color;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 3px 4px rgba(0, 0, 0, .3);
  }
}
.service-popup {
  width: 80vw;
  min-height: 50vh;
  border-radius: 10px;
}
</style>
