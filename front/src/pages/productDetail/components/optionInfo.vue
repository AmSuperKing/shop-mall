<template>
  <view class="content">
    <!-- 头部信息 -->
    <view class="header-info">
      <view class="img-box">
        <image
          :src="optionInfo.coverImg"
          mode="scaleToFill"
          class="product-img"
          @click="viewInGallary"
        ></image>
      </view>
      <view class="info-box">
        <view class="product-title">
          {{optionInfo.goodsName + optionInfo.goodsModel}}
        </view>
        <view class="size-and-num">
          型号：{{optionInfo.goodsModel}}
        </view>
        <view class="size-and-num">
          商品类别：{{optionInfo.blongType}}
        </view>
        <view class="product-price">
          <nut-price
            v-if="optionInfo.price"
            :price="optionInfo.price" 
            :decimalDigits="2" 
            :needSymbol="true" 
            :thousands="true"
          />
          <text v-if="!optionInfo.price">待咨询</text>
        </view>
      </view>
    </view>
    <!-- 数量、库存一栏 -->
    <view class="store-num">
      <view class="store-status">
        <view class="title-text">
          <text class="hight-size">数量</text>
          <text>(最低批量1)</text>
        </view>
        <view class="title-text">
          库存：有货
        </view>
      </view>
      <view class="num-box">
        <view class="num-step-input">
          <step-input-box
            :min="1"
            :max="100000"
            v-model="buyNum"
          />
        </view>
      </view>
    </view>
    <!-- 规格选择 -->
    <view class="size-list">
      <view class="list-title-text">
        规格
      </view>
      <view class="list-option-item">
        <view
          class="option-item"
          v-for="(item, index) of sizeList"
          :key="index"
          :class="selectedIndex==index?'red-style':'gray-style'"
          @click="selectedCurrSize(item, index)"
        >
          {{item}}
        </view>
      </view>
    </view>
    <!-- 底部按钮组 -->
    <view class="bottom-btns">
      <view class="btns">
        <nut-buttongroup shape="circle">
          <nut-button type="light" class="yellow-btn">加购物车</nut-button>
          <nut-button type="light" class="red-btn">立即购买</nut-button>
        </nut-buttongroup>
      </view>
    </view>
    <!-- 图片画廊 -->
    <fade-animation>
      <img-gallary
        v-show="showGallary"
        ref="imgGallary"
        :imgList="imgList"
        @close="handleGallaryClose"
      >
      </img-gallary>
    </fade-animation>
  </view>
</template>

<script>
import StepInputBox from '@/components/stepInputBox/stepInputBox'
import FadeAnimation from '@/components/fade/fadeAnimation'
import ImgGallary from '@/components/imgGallary/imgGallary'
import { goodsApi } from '@/api/goodsApi'

export default {
  name: 'OptionInfo',
  components: {
    StepInputBox,
    FadeAnimation,
    ImgGallary
  },
  data() {
    return {
      goodsId: '',
      optionInfo: {},
      buyNum: 1,
      sizeList: [],
      selectedIndex: 0,
      showGallary: false,
      imgList: []
      
    }
  },
  onLoad() {
  },
  mounted() {

  },
  methods: {
    getGoodsDetail() {
      if (this.goodsId) {
        uni.showLoading({
          title: '数据加载中...'
        })
        const param = {
          goodsId: this.goodsId
        }
        goodsApi.getGoodsDetail(param).then(res => {
          // console.log('getGoodsDetail', res.data)
          if (res && res.data) {
            this.optionInfo = res.data
            let tempObj = {
              carouselImg: res.data.coverImg
            }
            this.imgList = []
            this.imgList.push(tempObj)
            this.sizeList = [res.data.goodsModel]
            this.$forceUpdate()
          } else {
            this.$toast.text('获取商品信息出错')
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          uni.hideLoading()
        })
      }
    },
    selectedCurrSize(item, index) {
      // console.log(item, index)
      this.selectedIndex = index
    },
    viewInGallary() {
      this.showGallary = true
      this.$refs.imgGallary.pageNumVisible = false
    },
    handleGallaryClose() {
      this.showGallary = false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  .header-info {
    width: 90%;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .img-box {
      flex: 1;
      text-align: center;
      .product-img {
        width: 120px;
        height: 120px;
      }
    }
    .info-box {
      flex: 2;
      .product-title {
        margin-bottom: 12px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: justify;
        font-family: "Times New Roman", "Microsoft Yahei", Georgia, Serif, Sans-serif, 宋体;
        font-weight: 500;
        font-size: 16px;
        color: #333;
      }
      .size-and-num {
        font-size: 13px;
        color: #888;
      }
      .product-price {
        margin-top: 10px;
        font-size: 16px;
        color: #f30330;
      }
    }
  }
  .store-num {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: 15px;
    border-top: 1px solid #eee;
    .store-status {
      flex: 1;
      padding-left: 20px;
      .title-text {
        margin-bottom: 5px;
        font-size: 13px;
        color: #888;
        .hight-size {
          margin-right: 5px;
          font-size: 16px;
          color: #333;
        }
      }
      .hight-size {
        font-size: 13px;
        color: #888;
      }
    }
    .num-box {
      flex: 1;
      text-align: center;
    }
  }
  .size-list {
    width: 100%;
    .list-title-text {
      width: 100%;
      margin-top: 10px;
      padding-left: 20px;
      font-size: 16px;
      color: #333;
    }
    .list-option-item {
      padding: 10px 20px;
      .option-item {
        height: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        margin: 5px;
        font-size: 14px;
        border-radius: 8px;
      }
    }
  }
  .bottom-btns {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btns {
      width: 90%;
      .yellow-btn {
        padding: 0 20px;
        background-color: #ffa200;
        color: #fff;
      }
      .red-btn {
        padding: 0 20px;
        background-color: #ff0000;
        color: #fff;
      }
    }
  }
}
.gray-style {
  color: #999;
  border: 1px solid #eee;
  background-color: #fff;
}
.red-style {
  color: #f30330;
  border: 1px solid #f30330;
  background-color: #ffebec;
}
</style>
