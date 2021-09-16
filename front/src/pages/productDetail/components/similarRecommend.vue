<template>
  <view class="content-wrapper">
    <view class="title-tips">
      <view class="rec-title">
        您可能也会看
      </view>
      <view class="rec-num-text">
        共<text>{{total}}</text>个推荐商品
      </view>
    </view>

    <view>
    	<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
    		<view class="scroll-view-item_H" v-for="item of recList" :key="item.goodsId">
          <view class="more-rec-img-box">
            <image
              :src="item.coverImg"
              class="more-rec-img"
            ></image>
          </view>
          <view class="more-rec-title">
            <view class="rec-title-text">
              {{item.goodsName + item.goodsModel}}
            </view>
          </view>
          <view v-if="item.price" class="more-rec-price">
            ¥{{item.price}}
          </view>
          <view v-else class="more-rec-price">
            待咨询
          </view>
        </view>
    	</scroll-view>
    </view>
  </view>
</template>

<script>
import { homeApi } from '@/api/homeApi'

export default {
  name: 'SimilarRecommend',
  data() {
    return {
      recList: [],
      total: 0
    }
  },
  mounted() {
    this.getRecGoods()
  },
  methods: {
    scroll(e) {
    	// console.log(e)
    },
    getRecGoods() {
      homeApi.getRecGoods().then(res => {
        // console.log('similar getRecGoods', res.data)
        this.recList = res.data
        this.total = res.data.length
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin: 10px 0;
  background-color: #FFFFFF;  .title-tips {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    .rec-title {
      flex: 1;
      padding-left: 10px;
      border-left: 5px solid #f5222f;
    }
    .rec-num-text {
      flex: 1;
      padding-right: 10px;
      text-align: right;
      color: #999;
    }
  }
}
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item_H {
  width: 150px;
  height: 200px;
  display: inline-block;
  padding: 10px;
  border-right: 1px solid #eee;
  font-size: 14px;
  .more-rec-img-box {
    display: inline-block;
    height: 60%;
    width: 100%;
    .more-rec-img {
      width: 100%;
      height: 100%;
    }
  }
  .more-rec-title {
    width: 100%;
    height: 20%;
    .rec-title-text {
      width: 100%;
      height: 100%;
      display: -webkit-box; 
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: justify;
      color: #999;
    }
  }
  .more-rec-price {
    width: 100%;
    height: 20%;
    text-align: left;
    color: #f5222f;
  }
}
</style>
