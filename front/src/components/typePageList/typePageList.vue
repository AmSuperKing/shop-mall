<template>
  <view class="list-wrapper">
    <view
      class="list-item"
      v-for="(item, index) of recommmend"
      :key="index"
      @click="toDetail(item)"
    >
      <view class="img-part">
        <view class="img-box">
          <!-- <image src="../../static/imgs/挂篮.jpeg" class="item-img"></image> -->
          <image :src="item.coverImg" class="item-img"></image>
        </view>
      </view>
      <view class="info-part"></view>
      <view class="part-box">
        <view class="info-title">
          {{ item.goodsName + item.goodsModel }}
        </view>
        <view v-if="item.price" class="price">
          <nut-price  
            :price="item.price" 
            :decimalDigits="2" 
            :needSymbol="true" 
            :thousands="true"
          />
        </view>
        <view v-else class="price">
          <div>
            <span class="noprice">待咨询</span>
          </div>
        </view>
        <view class="buy-btn-box">
          <view class="buy-btn flex-box">
            <view v-if="item.price" class="btn-text">
              立即购买
            </view>
            <view v-else class="btn-text">
              了解详情
            </view>
            <view class="btn-icon flex-box">
              <uni-icons type="arrowright" color="#000" size="15" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { classifyApi } from '@/api/classifyApi'
export default {
  name: 'TypePageList',
  data() {
    return {
      recommmend:[]
    }
  },
  mounted(){
    this.getRecommend()
  },
  methods: {
    toDetail(item) {
      this.$Router.push(`/pages/productDetail/detail?goodsId=${item.goodsId}`)
    },
    getRecommend() {
      classifyApi.getRecommend().then(res => {
        if(res) {
          this.recommmend=res.data
          this.recommmend[0].sale=0
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  .list-item {
    position: relative;
    width: 50%;
    display: inline-block;
    min-height: 300px;
    margin-top: 20px;
    padding-top: 10px;
    text-align: center;
    .img-part {
      width: 90%;
      height: 180px;
      margin: 0px auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 20;
      .img-box {
        width: 90%;
        height: 130px;
        margin: 0 auto;
        padding: 5px 0;
        background-color: #fff;
        border-radius: 15px 15px 0 0;
        .item-img {
          width: 130px;
          height: 130px;
          border-radius: 15px;
        }
      }
    }
    .info-part {
      width: 90%;
      height: 200px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 5;
      margin: 0 auto;
      border-radius: 15px;
      background-color: #e6c090;
    }
    .part-box {
      width: 90%;
      height: 180px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 30;
      margin: 0 auto;
      padding-bottom: 15px;
      border-radius: 30px 30px 15px 15px;
      background-image: linear-gradient(#efdec3, #e6c090);
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, .4);
      .info-title {
        margin: 30px 0 15px;
        padding: 0 15px;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
      }
      .price {
        color: #f60027;
        .noprice {
          font-size: 14px;
          height: 25px;
        }
      }
      .buy-btn-box {
        margin-bottom: 15px;
        .buy-btn {
          width: 60%;
          margin: 15px auto;
          padding: 3px 5px;
          border-radius: 30px;
          background-color: #f60027;
          .btn-text {
            font-size: 13px;
            color: #fff;
            font-weight: bold;
          }
          .btn-icon {
            width: 20px;
            height: 20px;
            margin-left: 10px;
            border-radius: 50%;
            background-color: #efdec3;
          }
        }
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
