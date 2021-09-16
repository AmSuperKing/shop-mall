<template>
  <view class="type-tab-bar">
    <recommend-tab-list ref="recommendTabList" />
  </view>
</template>

<script>
import { homeApi } from '@/api/homeApi'
import recommendTabList from './recommendTabList.vue'
export default {
  components: { recommendTabList},
  name: 'RecommendTab',
  data() {
    return {
      typeList:[{
        'tabTitle': '推荐',
        'curr': true,
        'icon': ''
      }, {
        'tabTitle':'门窗',
        'curr':false,
        'icon': ''
      }, {
        'tabTitle':'精装',
        'curr':false,
        'icon': ''
      }, {
        'tabTitle':'智能',
        'curr':false,
        'icon': ''
      }, {
        'tabTitle':'化学',
        'curr':false,
        'icon': ''
      }, {
        'tabTitle':'工具',
        'curr':false,
        'icon': ''
      }],
      showList: [],
      goodsList1: [{
        imgUrl: '水龙头.jpeg',
        title: '淋浴水龙头 WSZ3924A 黄铜 镀铬 SBT'
      }, {
        imgUrl: '门铃.jpeg',
        title: '智能拍照门铃 KV-DBC2001 WF05100万C 黑色'
      }, {
        imgUrl: '挂篮.jpeg',
        title: '挂篮 WGL30010 套 304 镜光'
      }],
      goodsList2: [{
        imgUrl: '门铃.jpeg',
        title: '智能拍照门铃 KV-DBC2001 WF05100万C 黑色'
      }, {
        imgUrl: '水龙头.jpeg',
        title: '淋浴水龙头 WSZ3924A 黄铜 镀铬 SBT'
      }, {
        imgUrl: '挂篮.jpeg',
        title: '挂篮 WGL30010 套 304 镜光'
      }],
      goodsList3: [{
        imgUrl: '挂篮.jpeg',
        title: '挂篮 WGL30010 套 304 镜光'
      }, {
        imgUrl: '门铃.jpeg',
        title: '智能拍照门铃 KV-DBC2001 WF05100万C 黑色'
      }, {
        imgUrl: '水龙头.jpeg',
        title: '淋浴水龙头 WSZ3924A 黄铜 镀铬 SBT'
      }],
      showRec: true,
      showLife: false,
      showHardcover: false
    }
  },
  mounted() {
    for (let i = 0; i < this.typeList.length; i++) {
      if (i === 0) {
        this.showList.push(true)
      } else {
        this.showList.push(false)
      }
    }
  },
  methods: {
    tabSwitch(event, index) {
      // console.log(index, event)
      for (let i = 0; i < this.showList.length; i++) {
        if (i === index) {
          this.showList[i] = true
        } else {
          this.showList[i] = false
        }
      }
      if (event.tabTitle === '推荐') {
        this.showRec = true
        this.showLife = false
        this.showHardcover = false
      } else if (event.tabTitle === '门窗') {
        this.showRec = false
        this.showLife = true
        this.showHardcover = false
      } else if (event.tabTitle === '精装') {
        this.showRec = false
        this.showLife = false
        this.showHardcover = true
      }
    },
    toDetailPage(item) {
      uni.navigateTo({
        url: `/pages/productDetail/detail`,
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('product', { data: item })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.type-tab-bar {
  background-color: #fff;
  font-size: 28rpx;
}

.goods-item-list {
  width: 100%;
  background-color: #f5f5f5;
  .goods-item {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .goods-item-content {
      display: inline-block;
      width: 50%;
      padding: 10rpx 0;
      .content-box {
        width: 95%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        padding: 20rpx 0;
        border-radius: 20rpx;
        background-color: #fff;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
        .goods-item-img {
          display: inline-block;
          width: 20vh;
          height: 20vh;
        }
        .goods-enquery-icon-box {
          width: 100%;
          height: 40rpx;
          text-align: right;
          .goods-enquery-icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 20rpx;
          }
        }
        .goods-item-title {
          height: 100%;
          padding: 0 20rpx;
          margin: 20rpx 0;
          text-align: justify;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
