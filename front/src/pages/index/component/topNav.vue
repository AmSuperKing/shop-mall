<template>
  <view class="top-nav">
  	<view class="location-box" @click="getCurrLocation">
  	  <image src="../../../static/icons/location.png" class="loc-icon"></image>
      <view class="city-txt">{{position}}</view>
  	</view>
    <view class="search-input" @click="goToSearch">
      <image src="../../../static/icons/search.png" class="search-input-icon"></image>
      <text class="search-input-tips">请输入商品名称/型号/品牌</text>
    </view>
    <view class="service-box" @click="gotoService">
      <image src="../../../static/icons/service.png" class="service-icon"></image>
      <view class="service-txt">客服</view>
    </view>
    <view class="mess-box" @click="goToMess">
      <image src="../../../static/icons/mess.png" class="mess-icon"></image>
      <view class="mess-txt">消息</view>
    </view>
    <uni-popup ref="alertDialog" type="dialog">
    	<uni-popup-dialog
        type="warn"
        title="是否登录"
        content="暂未登录，是否登录后获取消息？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import $ from 'jquery'
import { getToken } from '@/utils/auth'

export default {
  name: 'TopNav',
  data() {
    return {
      key: 'A7ABZ-STCC3-TOP3F-YMUG3-4BB52-6TFSZ',
      position: '定位中'
    }
  },
  mounted() {
    this.getMyLocation()
  },
  methods: {
    getCurrLocation() {
      this.$toast.text('重新定位中...')
      this.getMyLocation()
    },
    getMyLocation() {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          // console.log('当前位置的经度：' + res.longitude)
          // console.log('当前位置的纬度：' + res.latitude)
          if (res.longitude && res.latitude) {
            $.ajax({
              type: "get",
              url: "https://apis.map.qq.com/ws/geocoder/v1/",
              dataType: "jsonp",
              jsonp: 'callback',
              jsonpCallback: 'showLocationInfo',
              data: {
                location: res.latitude + ',' + res.longitude,
                key: this.key,
                get_poi: 0,
                output: 'jsonp',
                callback: 'showLocationInfo'
              },
              success: (res) => {
                // console.log('getPosition info:', res.result.ad_info)
                if (res && res.result && res.result.ad_info) {
                  this.position = res.result.ad_info.city
                  this.$toast.text('获取定位成功')
                }
              }
            })
          }
          
        }
      })
    },
    showLocationInfo(result) {
      // console.log('showLocationInfo', result)
    },
    showPosition(position) {
      // console.log('位置信息', position)
      if (position.city !== null || position.city !== undefined) {
        this.position = position.city
      }
    },
    showErr() {
      this.$toast.text('获取位置出错')
      this.position = '获取失败'
    },
    goToSearch() {
      // uni.navigateTo({
      //   url: '/pages/search/search'
      // })
      this.$Router.push('/pages/search/search')
    },
    gotoService() {
      // this.$toast.text('点击客服功能键')
      this.$emit('clickService')
    },
    goToMess() {
      // uni.navigateTo({
      //   url: '/pages/messageCenter/messageCenter'
      // })
      const hasToken = getToken()
      if (!hasToken) {
        this.$refs.alertDialog.open()
      }
    },
    dialogConfirm() {
      this.$Router.push('/pages/messageCenter/messageCenter')
    },
    dialogClose() {
      // console.log('点击关闭')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.top-nav {
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $theme-color;
  .location-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 15vw;
    height: 100%;
    padding-left: 5px;
    text-align: center;
    .loc-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 auto;
    }
    .city-txt {
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 12px;
      color: #fff;
    }
  }
  .search-input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 40px;
    border: 2rpx solid #999;
    border-radius: 8rpx;
    background-color: #fff;
    .search-input-icon {
      width: 20px;
      height: 20px;
      padding: 4px;
    }
    .search-input-tips {
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 14px;
      color: #999;
    }
  }
  .service-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 12vw;
    height: 100%;
    text-align: center;
    .service-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 auto;
    }
    .service-txt {
      font-size: 13px;
      color: #fff;
    }
  }
  .mess-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    float: right;
    width: 12vw;
    height: 100%;
    padding-right: 10rpx;
    text-align: center;
    .mess-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 auto;
    }
    .mess-txt {
      font-size: 13px;
      color: #fff;
    }
  }
}
</style>
