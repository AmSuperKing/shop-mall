<template>
  <view class="all-wrapper">
    <!-- 热销banner -->
    <view class="sale-wrapper flex-box">
      <view class="hot-sale" @click="toHotSale">
        <image :src="hotSaleImg" class="hot-image"></image>
      </view>
    </view>
    
    <!-- 四个图片type -->
    <view class="type-sale">
      <view
        class="type-item"
        v-for="(item, index) of infoData" :key="item.id">
        <view
          class="item-box"
          :style="'background-image: linear-gradient('+colors[index].start+','+colors[index].end+');'"
          @click="handleTypeClick(item, index)"
        >
          <view class="left-part">
            <view class="title">{{item.title}}</view>
            <view class="desc">{{item.desc}}</view>
            <view class="go-btn" :style="'color:'+colors[index].end">GO</view>
          </view>
          <view class="right-part flex-box">
            <image :src="item.coverUrl" class="type-img"></image>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 分类榜单 -->
    <view class="list-wrapper">
      <view class="sale-list-box">
        <!-- 热销排行 -->
        <view class="sale-list-item" @click="toTopSelling">
          <view class="list-item-title">
            <span class="main-title">
              <span class="golden-bright">热销</span><span>排行</span>
            </span>
            <span class="sub-title">有口皆碑</span>
          </view>
          <view class="describe-text">
            大家都在买
          </view>
          <view class="top-list-imgs">
            <view class="list-item-imgs">
              <image :src="saleTypeData.hotSale[0].coverImg" class="item-img"></image>
              <view class="img-text-box">
                <view class="img-text list-top-bright">销量top1</view>
              </view>
            </view>
            <view class="list-item-imgs">
              <image :src="saleTypeData.hotSale[1].coverImg" class="item-img"></image>
              <view class="img-text-box">
                <view class="img-text list-top-bright">销量top2</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 新品首发 -->
        <view class="sale-list-item" @click="toNewProduct">
          <view class="list-item-title">
            <span class="main-title">
              <span class="green-bright">新品</span><span>首发</span>
            </span>
            <span class="sub-title">NEW</span>
          </view>
          <view class="describe-text">
            新品抢先看
          </view>
          <view class="top-list-imgs">
            <view
              class="list-item-imgs"
              v-for="item of saleTypeData.newProduct"
              :key="item.goodsId"
            >
              <image :src="item.coverImg" class="item-img"></image>
              <view class="img-text-box">
                <view class="img-text">{{item.goodsName}}</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 精品速购 -->
        <view class="sale-list-item" @click="toHighQuality">
          <view class="list-item-title">
            <span class="main-title">
              <span class="purple-bright">精品</span><span>速购</span>
            </span>
            <span class="sub-title">速时</span>
          </view>
          <view class="describe-text">
            好物一键购买
          </view>
          <view class="top-list-imgs">
            <view
              class="list-item-imgs"
              v-for="item of saleTypeData.highQuality"
              :key="item.goodsId"
            >
              <image :src="item.coverImg" class="item-img"></image>
              <view class="img-text-box">
                <view class="img-text">{{item.goodsName}}</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 超值好物 -->
        <view class="sale-list-item" @click="toSuperGood">
          <view class="list-item-title">
            <span class="main-title">
              <span class="indigo-bright">超值</span><span>好物</span>
            </span>
            <span class="sub-title">畅销</span>
          </view>
          <view class="describe-text">
            低价享不停
          </view>
          <view class="top-list-imgs">
            <view
              class="list-item-imgs"
              v-for="item of saleTypeData.bargain"
              :key="item.goodsId"
            >
              <image :src="item.coverImg" class="item-img"></image>
              <view class="img-text-box">
                <view class="img-text">{{item.goodsName}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { homeApi } from '@/api/homeApi'

export default {
  name: 'SaleType',
  data() {
    return {
      hotSaleImg: '',
      colors: [{
        start: '#95e6ea',
        end: '#00ccfe'
      }, {
        start: '#56df90',
        end: '#008461'
      }, {
        start: '#face7c',
        end: '#fb897a'
      }, {
        start: '#fa817d',
        end: '#8e73f9'
      }],
      infoData: [{
        coverUrl: ''
      }],
      saleTypeData:{
        bargain:[
          {
            coverImg:''
          },
          {
            coverImg:''
          }
        ],
        highQuality:[
          {
            coverImg:''
          },
          {
            coverImg:''
          }
        ],
        hotSale:[
          {
            coverImg:''
          },
          {
            coverImg:''
          }
        ],
        newProduct:[
          {
            coverImg:''
          },
          {
            coverImg:''
          }
        ]
      }
    }
  },
  created() {
    this.getSaleTypeInfo()
    this.$nextTick(()=>{
      this.getBriefInfo()
    })
  },
  methods: {
    toHotSale() {
      uni.navigateTo({
        url: '/pages/hotSale/hotSale'
      })
    },
    getSaleTypeInfo() {
      homeApi.getSaleTypeInfo().then(res => {
        if (res && res.data) {
          let [...tempArr] = res.data
          tempArr.shift()
          this.infoData = tempArr
          this.hotSaleImg = res.data[0].coverUrl
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    getBriefInfo(){
      homeApi.getBriefInfo().then(res => {
        if (res && res.data) {
          // console.log('getBriefInfo res',res.data)
            this.saleTypeData=res.data
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    toTopSelling() {
      uni.navigateTo({
        url: '/pages/topSelling/topSelling'
      })
    },
    toNewProduct() {
      uni.navigateTo({
        url: '/pages/newProduct/index'
      })
    },
    toHighQuality() {
      let params = {
        showTips: true,
        typeTitle: '精品速购'
      }
      this.toSearchPage(params)
    },
    toSuperGood() {
      let params = {
        showTips: true,
        typeTitle: '超值好物'
      }
      this.toSearchPage(params)
    },
    toSearchPage(params) {
      uni.$emit('tipsControll', { data: params })
      uni.navigateTo({
        url: '/pages/search/result'
      })
    },
    handleTypeClick(item, index) {
      let pageParams = {
        item: item,
        color: this.colors[index]
      }
      uni.$emit('pageParams', { params: pageParams })
      this.$Router.push({ path: '/pages/productType/index', query: { typeId: item.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.all-wrapper {
  background-color: #f5f5f5;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sale-wrapper {
  width: 100%;
  .hot-sale {
    width: 100%;
    padding: 20rpx 20rpx 10rpx;
    .hot-image {
      width: 100%;
      height: 50vw;
    }
  }
}
  
.type-sale {
  .type-item {
    width: 50%;
    display: inline-block;
    .item-box {
      width: 88%;
      min-height: 190rpx;
      display: flex;
      margin: 20rpx auto;
      padding: 10rpx;
      border-radius: 20rpx;
      box-shadow: 0 6px 8px rgba(0, 0, 0, .3);
      .left-part {
        flex: 2;
        padding-left: 10rpx;
        color: #fff;
        .title {
          margin: 5px 0;
          font-size: 32rpx;
          font-weight: bold;
        }
        .desc {
          margin-bottom: 5px;
          font-size: 26rpx;
        }
        .go-btn {
          display: inline-block;
          padding: 10rpx;
          margin-bottom: 10rpx;
          border-radius: 50%;
          background-color: #fff;
          font-size: 24rpx;
          font-weight: bold;
        }
      }
      .right-part {
        flex: 1;
        .type-img {
          width: 120rpx;
          height: 120rpx;
        }
      }
    }
  }
}
  
.list-wrapper {
  width: 100%;
  height: 100%;
  // display: flex;
  .sale-list-box {
    width: 95%;
    margin: 20rpx auto;
    border-radius: 15rpx;
    background-color: #fff;
    .sale-list-item {
      display: inline-block;
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      padding-bottom: 20rpx;
      border-left: 2rpx solid #e5e5e5;
      border-bottom: 2rpx solid #e5e5e5;
      .list-item-title {
        font-size: 32rpx;
        .main-title {
          display: inline-block;
          width: 50%;
          margin: 20rpx 0 0 10rpx;
          padding: 8rpx;
          font-size: 16px;
        }
        .sub-title {
          display: inline-block;
          margin: 20rpx 10rpx 10rpx 0;
          padding: 4rpx 16rpx;
          border-top-left-radius: 30rpx;
          border-bottom-right-radius: 30rpx;
          font-size: 13px;
          color: #fff;
          background-color: #f5222f;
        }
      }
      .describe-text {
        padding: 10rpx 0 10rpx 20rpx;
        font-size: 14px;
        color: #8d8d8d;
      }
      .top-list-imgs {
        width: 100%;
        .list-item-imgs {
          display: inline-block;
          width: 50%;
          text-align: center;
          .item-img {
            width: 10vh;
            height: 10vh;
          }
          .img-text-box {
            display: flex;
            justify-content: center;
            align-items: center;
            .img-text {
              width: 70%;
              padding: 6rpx 12rpx;
              font-size: 14px;
              color: #333;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;  
            }
          }
        }
      }
    }
    .sale-list-item:nth-child(1), .sale-list-item:nth-child(3) {
      border-left: none;
    }
    .sale-list-item:nth-child(3), .sale-list-item:nth-child(4) {
      border-bottom: none;
    }
  }
}
  
.list-top-bright {
  border-radius: 20rpx;
  color: #fff !important;
  background-color: #fa8328;
}
  
.golden-bright {
  color: #fa8328;
}
.green-bright {
  color: #56df90;
}
.purple-bright {
  color: #9198e5;
}
.indigo-bright {
  color: #00ffff;
}
</style>
