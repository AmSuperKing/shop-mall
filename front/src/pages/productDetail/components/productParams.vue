<template>
  <view class="content">
    <!-- 固定顶部标题 -->
    <view v-show="showFixedHeader" class="fixed-header-title">
      <view
        class="title-text"
        :class="activeIndex===1?'red-text':'gray-text'"
        @click="goToProductParams"
      >
        商品参数
      </view>
      <view
        class="title-text"
        :class="activeIndex===2?'red-text':'gray-text'"
        @click="goToProductDetail"
      >
        商品详情
      </view>
      <view
        class="title-text"
        :class="activeIndex===3?'red-text':'gray-text'"
        @click="goToProductComment"
      >
        商品评价
      </view>
    </view>
    <!-- 标题 -->
    <view class="header-title">
      <view class="title-text" @click="goToProductParams">
        商品参数
      </view>
      <view class="title-text" @click="goToProductDetail">
        商品详情
      </view>
      <view class="title-text" @click="goToProductComment">
        商品评价
      </view>
    </view>
    <!-- 参数列表 -->
    <view id="detailParams" class="params-list">
      <view class="params">
        <view class="line">
          <view class="line-title">
            商品类别
          </view>
          <view class="line-content gray-border-top">
            {{goodsInfo.blongType}}
          </view>
        </view>
        
        <view class="line">
          <view class="line-title">
            商品型号
          </view>
          <view class="line-content">
            {{goodsInfo.goodsModel}}
          </view>
        </view>
        
        <view class="line">
          <view class="line-title">
            材质
          </view>
          <view class="line-content">
            {{goodsInfo.material}}
          </view>
        </view>
        
        <view class="line">
          <view class="line-title">
            表面处理
          </view>
          <view class="line-content">
            {{goodsInfo.process}}
          </view>
        </view>
      </view>
    </view>
    <!-- 图片详情 -->
    <view id="detailImgs" class="detail-imgs">
      <view
        class="detail-img-box"
        v-for="(item, index) of goodsInfo.detail"
        :key="index"
      >
        <image
          :src="item.imgUrl"
          class="detail-img"
          mode="scaleToFill"
        ></image>
      </view>
    </view>
    <!-- 评价 -->
    <view id="detailComments" class="comment-list">
      <view class="comment-title">
        评价
        <uni-icons type="chat" color="#f5222f" size="18" />
      </view>
      <view v-if="haveComments">
        <view class="comments-box">
          <view class="comment-content">
            宝贝很好很不错，质量很好，下次有需要会继续购买，爱了爱了。
            以后绝对要安利给我的朋友们
            宝贝很好很不错，质量很好，下次有需要会继续购买，爱了爱了。
            以后绝对要安利给我的朋友们
          </view>
          <view class="author-and-time">
            <text class="comment-author">等雨听风</text>
            <text class="comment-time">2021-07-26 10:09:46</text>
          </view>
        </view>
      </view>
      <view v-else class="no-comment">
        暂无评价
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ProductParams',
  data() {
    return {
      goodsInfo: {},
      haveComments: false,
      imgList: [],
      showFixedHeader: false,
      activeIndex: 1
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let currTop = document.documentElement.scrollTop
      let detailParamsTop = document.getElementById('detailParams').offsetTop
      let detailImgsTop = document.getElementById('detailImgs').offsetTop
      let detailCommentsTop = document.getElementById('detailComments').offsetTop
      if (currTop > detailParamsTop + 40) {
        this.showFixedHeader = true
      } else {
        this.showFixedHeader = false
      }
      if (currTop > detailParamsTop && currTop < detailImgsTop - 1) {
        this.activeIndex = 1
      } else if (currTop > detailImgsTop && currTop < detailCommentsTop - 300) {
        this.activeIndex = 2
      } else if (currTop > detailCommentsTop - 300) {
        this.activeIndex = 3
      }
    },
    goToProductParams() {
      // let targetId= document.getElementById('detailParams')
      // targetId.scrollIntoView({ behavior:"smooth", block: "center", inline: "start"})
      let detailParamsTop = document.getElementById('detailParams').offsetTop
      this.scrollToPosition(detailParamsTop)
    },
    goToProductDetail() {
      // let targetId= document.getElementById('detailImgs')
      // targetId.scrollIntoView({ behavior:"smooth", block: "start", inline: "start"})
      let detailImgsTop = document.getElementById('detailImgs').offsetTop
      this.scrollToPosition(detailImgsTop)
    },
    goToProductComment() {
      // let targetId= document.getElementById('detailComments')
      // targetId.scrollIntoView({ behavior:"smooth", block: "center", inline: "start"})
      let detailCommentsTop = document.getElementById('detailComments').offsetTop
      this.scrollToPosition(detailCommentsTop)
    },
    scrollToPosition(position) {
      uni.pageScrollTo({
        scrollTop: position,
        duration: 300
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  .fixed-header-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, .1);
    .title-text {
      flex: 1;
      padding: 10px 15px;
      text-align: center;
      font-size: 15px;
    }
  }
  .header-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    .title-text {
      width: 80px;
      padding: 10px 15px;
      font-size: 15px;
    }
  }
  .params-list {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    background-color: #fff;
    .params {
      width: 90%;
      padding-bottom: 10px;
      font-size: 14px;
      color: #999;
      .line {
        width: 100%;
        display: flex;
        flex-direction: row;
        .line-title {
          flex: 1;
          padding: 8px 0;
          text-align: center;
          background-color: #f5f9fe;
        }
        .line-content {
          flex: 3;
          padding: 5px;
          padding-left: 10px;
          border: 1px solid #eee;
          border-top: none;
        }
      }
    }
  }
  .detail-imgs {
    // width: 100%;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    padding-top: 15px;
    background-color: #fff;
    .detail-img-box {
      // width: 100%;
      margin: 0 auto;
      .detail-img {
        width: 100vw;
        min-height: 100vw;
      }
    }
  }
  .comment-list {
    width: 100%;
    min-height: 300px;
    margin-top: 10px;
    background-color: #fff;
    .comment-title {
      width: 100%;
      padding: 10px 10px 10px 15px;
      font-size: 15px;
      color: #333;
      border-bottom: 1px solid #eee;
    }
    .comments-box {
      padding: 10px;
      border-bottom: 1px solid #eee;
      .comment-content {
        text-align: justify;
        font-size: 14px;
        color: #666;
      }
      .author-and-time {
        margin-top: 10px;
        font-size: 13px;
        color: #999;
        .comment-author {
          margin-right: 10px;
        }
      }
    }
    .no-comment {
      padding-top: 25%;
      text-align: center;
      font-size: 15px;
      color: #999;
    }
  }
}

.gray-border-top {
  border-top: 1px solid #eee !important;
}
.gray-text {
  color: #666;
}
.red-text {
  color: #f5222f;
}
</style>
