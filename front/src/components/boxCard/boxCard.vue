<template>
  <view class="card-wrapper">
    <view class="card" :style="'background-color: '+bgColor+';'">
      <view class="card-title">
        <view class="title-img">
          <image src="../../static/imgs/salute.png" class="salute-img"></image>
        </view>
        <view
          class="title-txt"
          :style="'background-image: linear-gradient('+titleStartColor+','+titleEndColor+');'"
        >{{title}}</view>
        <view class="title-img">
          <image src="../../static/imgs/salute.png" class="salute-img"></image>
        </view>
      </view>
      <view class="card-list">
        <view
          class="list-item flex-box"
          v-for="(item, index) of recCardList"
          :key="index"
          @click="toDetail(item)"
        >
          <view class="item-img">
            <image :src="item.coverImg" class="img"></image>
          </view>
          <view class="item-info">
            <view class="info-title">
              {{ item.goodsName }}
            </view>
            <view class="info-btn">
              <text v-if="item.price" class="price-num-part">¥{{ item.price }}</text>
              <text v-else class="price-num-part">待咨询</text>
              <text class="buy-btn-part">购买</text>
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
  name: 'BoxCard',
  props: {
    title: {
      type: String,
      default: '综合场馆'
    },
    bgColor: {
      type: String,
      default: '#8fbffc'
    },
    titleStartColor: {
      type: String,
      default: '#7ba6f8'
    },
    titleEndColor: {
      type: String,
      default: '#3b54ab'
    }
  },
  data() {
    return {
      recCardList:[]
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getRecommend()
    })
  },
  methods: {
    toDetail(item) {
      if (item.goodsId) {
        this.$Router.push(`/pages/productDetail/detail?goodsId=${item.goodsId}`)
      }
     
    },
    getRecommend() {
      this.recCardList=[]
      classifyApi.getRecommend().then(res=>{
        if(res){
          for(var i=0;i<2;i++){
            this.recCardList.push(res.data[i])
          }
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 100%;
  background-color: transparent;
  .card {
    width: 90%;
    min-height: 500rpx;
    margin: 0 auto;
    padding: 5px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 -4px 2px 0 rgba(0, 0, 0, 0.2), 0 -6px 6px 0 rgba(0, 0, 0, 0.2);
    .card-title {
      display: flex;
      margin: 10px auto;
      .title-img {
        flex: 1;
        text-align: center;
        .salute-img {
          width: 50px;
          height: 50px;
        }
      }
      .title-img:last-child {
        transform: rotateY(180deg)
      }
      .title-txt {
        flex: 3;
        height: 20px;
        padding: 5px 10px;
        border-radius: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        border: 2px solid #fff;
      }
    }
    .card-list {
      width: 100%;
      .list-item {
        width: 90%;
        margin: 15px auto;
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        .item-img {
          flex: 1;
          .img {
            width: 100px;
            height: 100px;
          }
        }
        .item-info {
          flex: 2;
          min-height: 100px;
          .info-title {
            margin-bottom: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 15px;
            color: #333;
            font-weight: 500;
          }
          .info-btn {
            display: inline-block;
            border-radius: 15px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            background-color: #fa363b;
            .price-num-part {
              display: inline-block;
              padding: 5px 15px;
              border-radius: 15px;
            }
            .buy-btn-part {
              display: inline-block;
              padding: 5px 15px;
              color: #fa363b;
              font-weight: 500;
              border-radius: 15px;
              background-color: #fddfe0;
            }
            .parice {
          text-align: center;
          color: #fff;
          .noprice {
            font-size: 14px;
            color: #fff;
          }
        }
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
