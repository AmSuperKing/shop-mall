<template>
  <view class="page-wrapper">
    <!-- 顶部搜索一栏 -->
    <view class="header-nav">
      <view class="back-icon-box" @click="backPrePage">
        <image src="../../static/icons/back.png" class="back-icon"></image>
      </view>
      <view class="search-input-wrapper">
        <view class="input-wrapper">
          <view class="search-icon-box" @click="toSearchPage">
            <image
              src="../../static/icons/search.png"
              class="search-icon"
            >
            </image>
          </view>
          <view class="content-input-box">
            <view class="uni-input-wrapper">
              <input
                class="uni-input"
                placeholder="请输入商品名称/型号/品牌"
                maxlength="120"
                v-model="searchWord"
                @input="clearInput"
                @confirm="toSearchPage"
              />
              <text
                v-if="showClearIcon"
                class="uni-icon"
                @click="clearIcon"
              >
                <uni-icons
                  color="#999999"
                  size="18"
                  type="clear"
                />
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 热搜 -->
    <view class="hot-search-wrapper">
      <view class="hot-search-title">
        <image src="../../static/search/hot.png" class="hot-icon"></image>
        <text class="hot-title">热门搜索</text>
      </view>
      <view class="hot-search-words">
        <view
          class="search-word"
          v-for="(item, index) of hotSearchWords"
          :key="index"
          :style="textColors[index]"
          @click="clickHotSearchWord(item.searchWord)"
        >
          <view class="word">
            {{item.searchWord}}
          </view>
        </view>
      </view>
    </view>
    
    <!-- 历史记录 -->
    <view class="history-search-wrapper" v-show="historyList.length">
      <view class="history-search-title">
        <image
          src="../../static/icons/delete.png"
          class="history-icon"
          @click="clearHistory"
        >
        </image>
        <text class="history-title">历史记录</text>
      </view>
      <view class="history-search-words">
        <view
          class="search-word"
          v-for="(item, i) of historyList"
          :key="i"
          @click="clickHotSearchWord(item)"
        >
          <view class="word">
            {{item}}
          </view>
        </view>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <view class="guess-like-wrapper">
      <view class="guess-like-title">
        <image src="../../static/search/like.png" class="like-icon"></image>
        <text class="like-title">你可能喜欢</text>
      </view>
      <view class="guess-like-list">
        <view
          class="list-item"
          v-for="item of recLikeList"
          :key="item.goodsId"
          @click="toDetail(item)"
        >
          <view class="item-img-box">
            <image :src="item.coverImg" class="item-img"></image>
          </view>
          <view class="item-info-box">
            <view class="item-title">
              {{item.goodsName + item.goodsModel}}
              <view class="sale-num">销量：{{item.sale}}</view>
            </view>
            <view class="item-price">
              <view class="item-tag">
                <uni-tag
                  v-if="!item.price"
                  type="success"
                  size="small"
                  :mark="true"
                  text="待咨询"
                />
              </view>
              <view class="price-num">
                <nut-price
                  v-if="item.price"
                  :price="item.price" 
                  :decimalDigits="2" 
                  :needSymbol="true" 
                  :thousands="true"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import BackTop from '@/components/backTop'
import { homeApi } from '@/api/homeApi'
import { searchApi } from '@/api/searchApi'

export default {
  name: 'Search',
  components: {
    BackTop
  },
  data() {
    return {
      searchWord: '',
      showClearIcon: false,
      hotSearchWords: [],
      recLikeList: [],
      textColors: [],
      historyList: [],
      colors: [{
        color: '#e9454f'
      }, {
        color: '#fe8705'
      }, {
        color: '#739af3'
      }, {
        color: '#cf73f3'
      }, {
        color: '#56df90'
      }, {
        color: '#00ffff'
      }],
      userName: 'admin'
    }
  },
  mounted() {
    this.initColor()
    this.getHotSearchWords()
    this.getHistoryList()
    this.getRecList()
  },
  methods: {
    getHotSearchWords() {
      uni.showLoading({
        title: '数据加载中...'
      })
      searchApi.getHotSearchWords().then(res => {
        // console.log('getHotSearchWords', res.data)
        this.hotSearchWords = res.data
        if (this.hotSearchWords.length > 0) {
          this.initColor()
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        uni.hideLoading()
      })
    },
    getRecList() {
      uni.showLoading({
        title: '数据加载中...'
      })
      homeApi.getRecGoods().then(res => {
        // console.log('guess like getRecGoods', res.data)
        this.recLikeList = res.data
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        uni.hideLoading()
      })
    },
    clearInput(event) {
      if (event.detail.value.length > 0) {
        this.showClearIcon = true
      } else {
        this.showClearIcon = false
      }
    },
    clearIcon() {
      this.searchWord = ''
      this.showClearIcon = false
    },
    initColor() {
      let colorsLen = this.colors.length
      for (let i = 0; i < this.hotSearchWords.length; i++) {
        let ran = Math.floor(Math.random() * colorsLen)
        this.textColors.push(this.colors[ran])
      }
    },
    getHistoryList() {
      let temp = []
      uni.showLoading({
        title: '数据加载中...'
      })
      uni.getStorage({
        key: this.userName,
        success: (res) => {
          temp = JSON.parse(res.data)
          // console.log('getStorage:', temp)
        }
      })
      if (temp) {
        this.historyList = temp
      } else {
        this.historyList = []
        uni.setStorage({
          key: this.userName,
          data: JSON.stringify(this.historyList),
          success: () => {}
        })
      }
      uni.hideLoading()
    },
    backPrePage() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        uni.switchTab({
          url: '/'
        })
      } else {
        uni.navigateBack({
          delta: 1
        })
      }
    },
    toSearchPage() {
      let word = this.searchWord.trim()
      if (word) {
        this.toSearch(word)
      }
    },
    clickHotSearchWord(word) {
      console.log(word)
      if (word) {
        this.searchWord = word
        this.toSearch(word)
      }
    },
    toSearch(word) {
      let findIndex = this.historyList.indexOf(word)
      if (findIndex > -1) {
        this.historyList.splice(findIndex, 1)
        this.historyList.unshift(word)
        uni.setStorage({
          key: this.userName,
          data: JSON.stringify(this.historyList),
          success: () => {}
        })
      } else {
        this.historyList.unshift(word)
        uni.setStorage({
          key: this.userName,
          data: JSON.stringify(this.historyList),
          success: () => {}
        })
      }
      uni.navigateTo({
        url: `/pages/search/result`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          currSearchWord: (data) => {
            // console.log('target page return:', data)
            this.searchWord = data.data
          }
        },
        success: (res) => {
          res.eventChannel.emit('searchWord', { data: word })
        }
      })
    },
    clearHistory() {
      let _this = this
      this.$dialog({
        title: "确定清空历史记录？",
        closeOnPopstate: true,
        closeBtn: false,  //显式右上角关闭按钮
        onOkBtn(event) {  //确定按钮点击事件
          _this.historyList = []
          uni.removeStorage({
            key: _this.userName,
            success: (res) => {
              _this.$toast.text('删除历史记录成功')
            }
          })
          this.close() //关闭对话框
        },
        onCancelBtn(event) {  //取消按钮点击事件，默认行为关闭对话框
          this.close()
        }
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
.page-wrapper {
  width: 100%;
  .header-nav {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    background-color: #fff;
    .back-icon-box {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .back-icon {
        width: 25px;
        height: 25px;
      }
    }
    .header-search-bar {
      flex: 5;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-input {
        width: 90%;
        text-align: left;
      }
    }
    .search-input-wrapper {
      flex: 5;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .input-wrapper {
        width: 90%;
        height: 32px;
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border: 2rpx solid #eee;
        border-radius: 5px;
        background-color: #f5f5f5;
        .search-icon-box {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .search-icon {
            width: 20px;
            height: 20px;
          }
        }
        .content-input-box {
          flex: 6;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .hot-search-wrapper {
    width: 100%;
    margin-top: 60px;
    .hot-search-title {
      width: 100%;
      padding: 20rpx 30rpx 20rpx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .hot-icon {
        width: 20px;
        height: 20px;
        margin-left: 10rpx;
      }
      .hot-title {
        margin-left: 20rpx;
        font-size: 16px;
        color: #d9210a;
      }
    }
    .hot-search-words {
      width: 100%;
      padding: 0 40rpx 20rpx 60rpx;
      box-sizing: border-box;
      .search-word {
        display: inline-block;
        margin-top: 20rpx;
        margin-right: 30rpx;
        text-align: center;
        font-size: 15px;
        .word {
          max-width: 240rpx;
          padding: 8rpx 20rpx;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          border-radius: 10px;
          background-color: #f7f7f7;
        }
      }
    }
  }
  .history-search-wrapper {
    width: 100%;
    .history-search-title {
      width: 100%;
      padding: 20rpx 30rpx 20rpx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .history-icon {
        width: 20px;
        height: 20px;
        margin-left: 10rpx;
      }
      .history-title {
        margin-left: 20rpx;
        font-size: 15px;
        color: #666;
      }
    }
    .history-search-words {
      width: 100%;
      padding: 0 40rpx 20rpx 60rpx;
      box-sizing: border-box;
      .search-word {
        display: inline-block;
        margin-top: 20rpx;
        margin-right: 30rpx;
        text-align: center;
        font-size: 16px;
        color: #666;
        .word {
          max-width: 240rpx;
          padding: 8rpx 20rpx;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          border-radius: 30rpx;
          background-color: #f7f7f7;
        }
      }
    }
  }
  .guess-like-wrapper {
    .guess-like-title {
      width: 100%;
      padding: 20rpx 30rpx 20rpx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .like-icon {
        width: 20px;
        height: 20px;
        margin-left: 10rpx;
      }
      .like-title {
        margin-left: 20rpx;
        font-size: 16px;
        color: #333;
      }
    }
    .guess-like-list {
      width: 100%;
      .list-item {
        display: flex;
        flex-direction: row;
        padding: 30rpx 0;
        border-bottom: 2rpx solid #eee;
        .item-img-box {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .item-img {
            width: 190rpx;
            height: 190rpx;
            border: 1px solid #14AA79;
          }
        }
        .item-info-box {
          flex: 2;
          .item-title {
            width: 90%;
            margin-bottom: 30rpx;
            font-size: 15px;
            color: #555;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .sale-num {
              margin-top: 8px;
              font-size: 13px;
              color: #999;
            }
          }
          .item-price {
            font-size: 28rpx;
            .query-state {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 130rpx;
              height: 36rpx;
              text-align: center;
              font-size: 13px;
              color: #f5222f;
              border: 2rpx solid #f5222f;
              border-radius: 10rpx;
              background: #fff;
            }
            .price-num {
              color: #f5222f;
            }
          }
        }
      }
    }
  }
}
.text-gray {
  color: #999;
}
.uni-input-wrapper {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  padding: 4px 13px;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #f5f5f5;
}

.uni-input {
  height: 28px;
  line-height: 28px;
  font-size: 15px;
  padding: 0px;
  flex: 1;
  background-color: #f5f5f5;
}

.uni-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: uniicons;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  width: 24px;
  height: 24px;
  line-height: 24px;
  color: #999999;
}

.uni-tag-text {
  font-size: 12px;
}
</style>
