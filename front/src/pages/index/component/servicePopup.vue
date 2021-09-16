<template>
  <view class="service-content">
    <view class="title">
      在线客服
    </view>
    <view class="contact-type">
      <view class="title-text">服务热线：</view>
      <view class="contact-num flex-box">
        <view class="num-box flex-box">
          <text class="num">0757-87310888</text>
        </view>
        <view class="operation-btn flex-box" @click="callPhone">
          <uni-icons type="phone" :color="themeColor" size="20"/>
        </view>
      </view>
    </view>
    <view class="contact-type">
      <view class="title-text">QQ客服：</view>
      <view class="contact-num flex-box">
        <view class="num-box flex-box">
          <text class="num">2509045492</text>
        </view>
        <view class="operation-btn flex-box" @click="openQQ">
          <uni-icons type="qq" :color="themeColor" size="20"/>
        </view>
      </view>
    </view>
    <view class="contact-type">
      <view class="title-text">传真：</view>
      <view class="contact-num flex-box">
        <view class="num-box flex-box">
          <text class="num" id="faxVal">0757-87318666</text>
        </view>
        <view class="operation-btn flex-box" @click="copyFax">
          <uni-icons type="paperclip" :color="themeColor" size="20"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ServicePopup',
  data() {
    return {
      themeColor: '#008461',
      qqNum: '2509045492',
      faxNum: '0757-87318666'
    }
  },
  mounted() {

  },
  methods: {
    callPhone() {
      uni.makePhoneCall({
        phoneNumber: '0757-87310888',
        success: () => {},
        fail: () => {
          this.$toast.text('拨号失败，权限被禁止或无拨号应用')
        }
      })
    },
    openQQ() {
      uni.getSystemInfo({
        success: (res) => {
          // console.log('getSystemInfo', res)
          if (res.platform === 'ios' || res.platform === 'android') {
            // console.log('isMobile')
            // #ifdef H5
            this.$copyText(this.qqNum).then(
              res => {
                this.$toast.text('复制成功<br>请下载打开qq应用添加客服')
              }
            )
            // #endif
            // #ifndef H5
            uni.setClipboardData({
              data: this.qqNum,
              success: () => {
                this.$toast.text('复制成功<br>请下载并打开qq应用添加客服')
              }
            })
            // #endif
            let a = document.createElement('a')
            a.setAttribute('href', 'mqqwpa://im/chat?chat_type=wpa&uin=2509045492&version=1&src_type=web&web_src=oicqzone.com')
            a.setAttribute('target', '_blank')
            a.setAttribute('id', 'openLink')
            // 防止反复添加
            if(document.getElementById('openLink')) {
            	document.body.removeChild(document.getElementById('openLink'))
            }
            document.body.appendChild(a)
            a.click()
          } else {
            let a = document.createElement('a')
            a.setAttribute('href', 'http://wpa.qq.com/msgrd?v=3&uin=2509045492&site=qq&menu=yes')
            a.setAttribute('target', '_blank')
            a.setAttribute('id', 'openLink')
            // 防止反复添加
            if(document.getElementById('openLink')) {
            	document.body.removeChild(document.getElementById('openLink'))
            }
            document.body.appendChild(a)
            a.click()
          }
        }
      })
    },
    copyFax() {
      // #ifdef H5
      this.$copyText(this.faxNum).then(
        res => {
          this.$toast.text('复制成功')
        }
      )
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: this.faxNum,
        success: () => {
          this.$toast.text('复制成功')
        }
      })
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.service-content {
  background-color: #fff;
  .title {
    padding: 15px 0 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: $theme-color;
    border-bottom: 1px solid $theme-color;
  }
  .contact-type {
    padding: 10px;
    .title-text {
      width: 90%;
      margin: 2px auto;
      font-size: 16px;
      color: $theme-color;
      font-weight: bold;
    }
    .contact-num {
      width: 90%;
      height: 45px;
      margin: 0 auto;
      border-radius: 10px;
      border: 1px solid #eee;
      .num-box {
        flex: 4;
        height: 45px;
        font-size: 15px;
        .num {
          display: inline-block;
        }
      }
      .operation-btn {
        flex: 1;
        width: 100%;
        height: 45px;
        border-radius: 0 10px 10px 0;
        background-color: #f5f5f5;
      }
    }
  }
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
