<template>
  <view class="about-card">
    <!-- 关于我们 -->
    <uni-row class="card-row flex-box" :width="nvueWidth">
    	<uni-row class="icon-part flex-box" :width="nvueWidth">
    		<image src="../../../static/logo_handp.png" class="icon" mode="aspectFit"></image>
    	</uni-row>
    	<uni-row class="title-part">
        <uni-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <view class="title bottom-line">
            <uni-link
              href="https://www.ss-hehe.com/about"
              text="公司简介"
              :color="styles.themeColor"
              showUnderLine="false"
            ></uni-link>
          </view>
        </uni-col>
        
        <uni-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <view class="title bottom-line">
            <uni-link
              href="https://www.ss-hehe.com"
              text="公司官网"
              :color="styles.themeColor"
              showUnderLine="false"
            ></uni-link>
          </view>
        </uni-col>
    		
        <uni-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <view class="title  bottom-line" @click="toSeeContact">联系方式</view>
        </uni-col>
    	</uni-row>
    </uni-row>
  </view>
</template>

<script>
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'AboutUs',
  data() {
    return {
      nvueWidth: 730
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  methods: {
    toSeeContact() {
      this.$Router.push('/pages/help/contact')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.about-card {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 3px 4px rgba(0, 0, 0, .3);
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-line {
  border-bottom: 1px solid #eee;
}
.card-row {
  flex-direction: column;
}
.icon-part {
  flex-direction: column;
  font-size: 14px;
  color: #666;
  .icon {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
    border-radius: 50%;
    border: 1px solid $theme-color;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
  }
}
.title-part {
  width: 100%;
  font-size: 15px;
  color: $theme-color;
  .title {
    margin: 0 auto;
    padding: 12px;
    text-align: center;
  }
}
</style>
