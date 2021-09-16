<template>
  <view class="menu-wrapper">
    <menu-tabbar
      class="menu-tabbar"
      :menuList="menuList"
      :currActive="activeIndex"
      @tabSwitch="tabSwitch" 
    ></menu-tabbar>
    <view v-if="emptyList" class="empty-list flex-box">
      <image src="../../../static/myicons/none_order.png" class="none-order-img"></image>
      <view class="tips">没有找到相关的内容</view>
    </view>
    <view v-if="!emptyList" class="order-list flex-box">
      <view class="list-item">
        <view class="order-info">
          <view class="info-item">
            <text class="order-info-title">订单号：</text>
            <text class="order-info-content">{{orderNum}}</text>
            <text class="copy-btn" @click="copyOrderNum(orderNum)">复制</text>
          </view>
          <uni-row :width="nvueWidth" @click.native="toOrderDetail">
            <uni-col :span="22">
              <view class="info-item">
                <text class="order-info-title">下单账号：</text>
                <text class="order-info-content">me-1e134 15089875039_1e134</text>
              </view>
              <view class="info-item">
                <text class="order-info-title">订单状态：</text>
                <text class="order-info-content">待支付</text>
              </view>
              <view class="info-item">
                <text class="order-info-title">下单时间：</text>
                <text class="order-info-content">2021-08-10 09:55:23</text>
              </view>
            </uni-col>
            <uni-col class="flex-box" :span="2">
              <uni-icons type="arrowright" color="#666" size="25" />
            </uni-col>
          </uni-row>
        </view>

        <uni-row :width="nvueWidth" @click.native="toProductDetail">
        	<uni-col class="goods-img flex-box" :span="6">
            <image src="../../../static/imgs/门铃.jpeg" class="img"></image>
        	</uni-col>
        	<uni-col class="info-part" :span="18">
            <view class="goods-title">
              智能拍照门铃 KV-DBC2001 WF05100万C 黑色
              智能拍照门铃 KV-DBC2001 WF05100万C 黑色
            </view>
            <view class="goods-params">200mm*143mm*30mm</view>
            <view class="goods-params">商品号：1647389294827</view>
            <view class="goods-params">数量：1</view>
            <view class="goods-price">单价：¥499</view>
        	</uni-col>
        </uni-row>

        <view class="total-price">
          <text>合计：</text>
          <text class="price-num">¥499</text>
        </view>
        <view class="account">
          <text>应付：</text>
          <text class="account-num">¥499</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MenuTabbar from '@/components/menuTabbar/menuTabbar'

export default {
  name: 'orderDetailList',
  components: {
    MenuTabbar
  },
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      orderNum: 'CP20210810095523011024',
      emptyList: false,
      nvueWidth: 730,
      menuList:[
        {
          'title': '全部订单',
          'icon': '../../../static/myicons/default_order.png',
          'activeIcon': '../../../static/myicons/order.png'
        },
        {
          'title': '待支付',
          'icon': '../../../static/myicons/pay.png',
          'activeIcon': '../../../static/myicons/ac_pay.png'
        },
        {
          'title':'待收货',
          'icon':'../../../static/myicons/logistics.png',
          'activeIcon':'../../../static/myicons/ac_logistics.png'
        },
        {
          'title':'已签收',
          'icon':'../../../static/myicons/sign.png',
          'activeIcon':'../../../static/myicons/ac_sign.png'
        },
        {
          'title':'已取消',
          'icon':'../../../static/myicons/order_cancel.png',
          'activeIcon':'../../../static/myicons/ac_order_cancel.png'
        }
      ]
    }
  },
  methods: {
    tabSwitch(value, index) {
      // console.log(value, index)
    },
    copyOrderNum(content) {
      // #ifdef H5
      this.$copyText(content).then(
        res => {
          this.$toast.text('复制成功')
        }
      )
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: content,
        success: () => {
          this.$toast.text('复制成功')
        }
      })
      // #endif
    },
    toOrderDetail() {
      // console.log('toOrderDetail')
      uni.navigateTo({
        url: '/pages/orderDetail/index'
      })
    },
    toProductDetail() {
      uni.navigateTo({
        url: '/pages/productDetail/detail'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.menu-wrapper {
  min-height: 50vh;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  .menu-tabbar {
    position: fixed;
    top: 55px;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .empty-list {
    margin-top: 135px;
    padding-top: 15px;
    flex-direction: column;
    .none-order-img {
      width: 400rpx;
      height: 400rpx;
    }
    .tips {
      font-size: 14px;
      color: #999;
    }
  }
  .order-list {
    min-height: 300px;
    margin-top: 135px;
    .list-item {
      width: 90%;
      margin: 5px auto;
      padding: 15px 10px;
      border-radius: 5px;
      background-color: #fff;
      .order-info {
        margin-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        .info-item {
          padding: 5px 0;
          .order-info-title {
            color: #333;
          }
          .order-info-content {
            color: #999;
          }
        }
      }
      .goods-img {
        .img {
          width: 80px;
          height: 80px;
        }
      }
      .info-part {
        .goods-title {
          margin-bottom: 5px;
          text-align: justify;
          font-size: 14px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .goods-params {
          margin-bottom: 5px;
          font-size: 12px;
          color: #999;
        }
        .goods-price {
          margin-bottom: 5px;
          font-size: 13px;
          color: #666;
        }
      }
      .total-price {
        padding-top: 10px;
        border-top: 1px solid #eee;
        text-align: right;
        font-size: 14px;
        color: #999;
        .price-num {
          color: #000;
        }
      }
      .account {
        padding-top: 5px;
        text-align: right;
        font-size: 14px;
        color: #999;
        .account-num {
          color: #f3222f;
        }
      }
    }
  }
}
.copy-btn {
  margin-left: 10px;
  padding: 2px 4px;
  font-size: 12px;
  color: $theme-color;
  border: 1px solid $theme-color;
  border-radius: 5px;
}
.nut-tabbar {
  margin-top: 0;
  min-height: 100px;
}
.tabbar-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
