<template>
  <view class="card-wrapper">
    <view
      class="card-item"
      v-for="(item, index) of recCardList"
      :key="index"
      @click="toDetail(item)"
    >
      <view
        class="item-box flex-box"
        :style="'background-image: linear-gradient('+item.bgStart+','+item.bgEnd+');'"
      >
        <view class="left-part">
          <view
            class="title-btn flex-box"
            :style="'background-image: linear-gradient('+item.btnStart+','+item.btnEnd+');'"
          >
            好物推荐
            <uni-icons type="arrowright" color="#fff" size="15" />
          </view>
          <view v-if="item.price" class="parice">
            <nut-price  
              :price="item.price" 
              :decimalDigits="2" 
              :needSymbol="true" 
              :thousands="true"
            />
          </view>
          <div v-else class="parice">
            <span class="noprice">待咨询</span>
          </div>
        </view>
        <view class="right-part flex-box">
          <image :src="item.coverImg" class="item-img"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { classifyApi } from '@/api/classifyApi'
export default {
  name: 'RecListCard',
  data() {
    return {
      recList: [],
      colors: [{
        btnStart: '#f8af61',
        btnEnd: '#fa8328',
        bgStart: '#fbb492',
        bgEnd: '#fa8328'
      }, {
        btnStart: '#8dcffe',
        btnEnd: '#9198e5',
        bgStart: '#8dcffe',
        bgEnd: '#9198e5'
      }, {
        btnStart: '#9ae7ea',
        btnEnd: '#00ffff',
        bgStart: '#9ae7ea',
        bgEnd: '#00ffff'
      }, {
        btnStart: '#56df90',
        btnEnd: '#008461',
        bgStart: '#56df90',
        bgEnd: '#008461'
      }],
      recCardList:[]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getRecommend()
    })
  },
  methods: {
    getRecommend() {
      this.recCardList = []
      classifyApi.getRecommend().then(res => {
        if (res && res.data) {
          for (var i = 0; i < 4; i++) {
            this.recCardList.push({ ...res.data[i], ...this.colors[i] })
          }
          // this.recommmend[0].sale=0
        }
      }).catch(e => {
        console.log(e)
      })
    },
    toDetail(item) {
      if (item.goodsId) {
        this.$Router.push(`/pages/productDetail/detail?goodsId=${item.goodsId}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  min-height: 140px;
  padding: 10px 0;
  .card-item {
    width: 50%;
    display: inline-block;
    margin: 10px 0;
    .item-box {
      width: 90%;
      min-height: 50px;
      margin: 0 auto;
      padding: 10px 5px;
      border-radius: 10px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, .4);
      .left-part {
        flex: 1;
        .title-btn {
          margin: 10px 0;
          padding: 2px;
          font-size: 12px;
          color: #fff;
          border: 1px solid #fff;
          border-radius: 15px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
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
      .right-part {
        flex: 1;
        .item-img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
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
