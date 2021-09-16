<template>
  <view class="wrapper">
    <header-nav
      ref="headerNav"
      title="订单详情"
    ></header-nav>
    <view class="content-info">
      <!-- 通知信息栏 -->
      <view class="notice-info">
        <uni-notice-bar
          :show-icon="true"
          :scrollable="true"
          :speed="50"
          :single="true"
          text="温馨提示: 请及时关注您的订单信息并进行及时处理~"
        />
      </view>
      <!-- 用户收货信息 -->
      <view class="user-ship-info">
        <uni-row class="demo-uni-row" :width="nvueWidth">
        	<uni-col :span="4" class="flex-box">
        		<view class="loc-icon flex-box">
              <uni-icons type="location-filled" :color="styles.themeColor" size="25"/>
            </view>
        	</uni-col>
        	<uni-col :span="20">
        		<view class="info">
              <view class="user-name">张三</view>
              <view class="user-phone">13800168888</view>
              <view class="user-address">
                广东省佛山市三水区西南街道翠云路88号
              </view>
            </view>
        	</uni-col>
        </uni-row>
      </view>
      <!-- 详情信息标题部分 -->
      <uni-row class="demo-uni-row order-info-header" :width="nvueWidth">
      	<uni-col :span="12" class="order-type">
      		<view class="icon-and-text">
            <image src="../../static/myicons/goodsType.png" class="type-icon"></image>
            结算商品
          </view>
      	</uni-col>
      	<uni-col :span="12" class="service">
      		<view class="icon-and-text" @click="serviceVisible = true">
      		  <image src="../../static/icons/service_red.png" class="type-icon"></image>
      		  客服
      		</view>
      	</uni-col>
      </uni-row>
      <!-- 点击客服弹出层 -->
      <nut-popup
        class="service-popup"
        closeable
        round
        v-model="serviceVisible"
      >
        <service-popup ref="servicePopup"></service-popup>
      </nut-popup>
      <!-- 商品信息卡片 -->
      <uni-row class="goods-card" :width="nvueWidth" @click.native="toProductDetail">
      	<uni-col class="goods-img flex-box" :span="6">
          <image src="../../static/imgs/门铃.jpeg" class="img"></image>
      	</uni-col>
      	<uni-col class="info-part" :span="18">
          <view class="goods-title">
            智能拍照门铃 KV-DBC2001 WF05100万C 黑色
            智能拍照门铃 KV-DBC2001 WF05100万C 黑色
          </view>
          <view class="goods-params">商品号：1647389294827</view>
          <view class="goods-params">数量：1</view>
          <view class="goods-price">单价：¥499</view>
          <view class="price-subtotal">小计：¥499</view>
      	</uni-col>
      </uni-row>
      <!-- 订单信息详细项 -->
      <view class="order-detail">
        <view class="item">
          <text class="title">订单编号：</text>
          <text class="content">{{orderNum}}</text>
        </view>
        <view class="item">
          <text class="title">提交时间：</text>
          <text class="content">2021-08-08 16:30:18</text>
        </view>

        <view class="item small-margin">
          <text class="title">支付方式：</text>
          <text class="content">线上支付</text>
        </view>
        <view class="item">
          <text class="title">支付比例：</text>
          <text class="content">全额支付</text>
        </view>
        
        <view class="item small-margin">
          <text class="title">开票方式：</text>
          <text class="content">不开票</text>
        </view>
        
        <view class="item small-margin">
          <text class="title">配送方式：</text>
          <text class="content">快递</text>
        </view>
        
        <view class="item small-margin">
          <text class="title">备注信息：</text>
          <text class="content">无</text>
        </view>
      </view>
      <!-- 订单商品合计 -->
      <uni-row class="demo-uni-row total" :width="nvueWidth">
      	<uni-col :span="12" class="title-part">
      		<view class="title-text">
            商品合计：
          </view>
          <view class="title-text">
            配送费用：
          </view>
          <view class="title-text">
            应付总额：
          </view>
      	</uni-col>
      	<uni-col :span="12" class="content-part">
      		<view class="content-text">
      		  ¥499
      		</view>
          <view class="content-text">
            ¥0.00
          </view>
          <view class="all-total">
            ¥499
          </view>
      	</uni-col>
      </uni-row>
      
      <!-- 底部固定操作栏 -->
      <view class="bottom-menus">
        <view class="btns flex-box">
        	<view class="btn-box flex-box">
        		<button class="menu-btn flex-box" type="default" plain="true">修改订单</button>
        	</view>
        	<view class="btn-box flex-box">
        		<button class="menu-btn flex-box" type="default" plain="true">查看物流</button>
        	</view>
          <view class="btn-box flex-box">
          	<button class="menu-btn flex-box" type="warn">去支付</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import ServicePopup from '@/pages/index/component/servicePopup'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'OrderDetail',
  components: {
    HeaderNav,
    ServicePopup
  },
  data() {
    return {
      gutter: 20,
      nvueWidth: 730,
      orderNum: 'CP20210810095523011024',
      serviceVisible: false
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  methods: {
    toProductDetail() {
      uni.navigateTo({
        url: '/pages/productDetail/detail'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: #f5f5f5;
  .content-info {
    margin-top: 55px;
    padding: 0 10px 60px;
    .notice-info {
      margin: 0 auto;
    }
    .user-ship-info {
      min-height: 70px;
      margin: 0 auto;
      padding: 10px;
      border-bottom: 2px solid rgba(245, 34, 47, .8);
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 6px 8px rgba(0, 0, 0, .3);
    }
    .order-info-header {
      padding: 15px 0;
      .order-type {
        .icon-and-text {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          .type-icon {
            width: 18px;
            height: 18px;
            margin-right: 10px;
          }
        }
      }
      .service {
        text-align: right;
        font-size: 13px;
        .icon-and-text {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 14px;
          color: #f5222f;
          .type-icon {
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
        }
      }
    }
    .total {
      margin-top: 15px;
      padding: 15px;
      background-color: #fff;
      border-radius: 10px;
      .title-part {
        .title-text {
          margin: 5px 0;
          font-size: 14px;
          color: #333;
        }
      }
      .content-part {
        float: right;
        font-size: 14px;
        .content-text {
          margin: 5px 0;
          text-align: right;
          color: #333;
        }
        .all-total {
          margin: 5px 0;
          text-align: right;
          font-weight: bold;
          color: #f5222f;
        }
      }
    }
  }
}
.loc-icon {
  width: 100%;
  height: 70px;
}
.info {
  padding-left: 5px;
  font-size: 13px;
  .user-name {
    margin-bottom: 5px;
    font-size: 15px;
    color: #333;
  }
  .user-phone {
    margin: 5px 0;
    color: #999;
  }
  .user-address {
    margin-top: 5px;
    color: #666;
  }
}
.goods-card {
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
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
    .price-subtotal {
      margin-bottom: 5px;
      font-size: 13px;
      color: #f5222f;
    }
  }
}
.order-detail {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  .item {
    padding-top: 5px;
    font-size: 13px;
    .title {
      color: #999;
    }
    .content {
      color: #666;
    }
  }
}
.service-popup {
  width: 80vw;
  min-height: 50vh;
  border-radius: 10px;
}
.bottom-menus {
  height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
  .btns {
    height: 60px;
    padding: 0 10px;
    .btn-box {
      flex: 1;
      height: 60px;
      .menu-btn {
        width: 90%;
        height: 30px;
        font-size: 15px;
      }
    }
  }
}
.small-margin {
  margin-top: 10px;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
