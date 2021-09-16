<template>
  <view class="page-wrapper">
    <!-- 顶部搜索一栏 -->
    <view class="header-nav">
      <view class="back-icon-box" @click="backPrePage">
        <image src="../../static/icons/back.png" class="back-icon"></image>
      </view>
      <view class="header-search-bar">
        <view class="input-wrapper">
          <view class="search-icon-box" @click="getSearchResult">
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
                @focus="searchWordFocus"
                @input="clearInput"
                @confirm="getSearchResult"
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
    <!-- 结果列表 -->
    <result-list
      ref="resultList"
      class="result-list"
    />
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import ResultList from './resultList'
import BackTop from '@/components/backTop'

export default {
  name: 'SearchResult',
  components: {
    ResultList,
    BackTop
  },
  data() {
    return {
      searchWord: '',
      showClearIcon: false,
      mainType: '',
      subType: '',
      showTips: false,
      typeTitle: ''
    }
  },
  onLoad(option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('searchWord', (data) => {
      console.log('onLoad received last delivery:', data)
      this.searchWord = data.data
    })
    eventChannel.on('typeParams', (data) => {
      // console.log('typeParams', data)
      this.mainType = data.mainType
      this.subType = data.subType
    })
    uni.$on('tipsControll', (data) => {
      // console.log('tipsControll', data.data)
      this.showTips = data.data.showTips
      this.typeTitle = data.data.typeTitle
    })
    eventChannel.emit('currSearchWord', {data: this.searchWord})
  },
  mounted() {
    this.deliveryParams()
  },
  methods: {
    deliveryParams() {
      if (this.mainType) {
        this.$refs.resultList.mainType = this.mainType
        this.$refs.resultList.subType = this.subType
        this.$refs.resultList.typeFilterVisible = true
      }
      if (this.showTips) {
        // console.log('showTips')
        this.$refs.resultList.showTips = true
        this.$refs.resultList.typeTitle = this.typeTitle
      }
      if (this.searchWord) {
        this.getSearchResult()
      }
    },
    backPrePage() {
      let currPages = getCurrentPages()
      if (currPages.length < 2) {
        uni.switchTab({
          url: '/'
        })
      } else {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('currSearchWord', {data: this.searchWord})
        uni.navigateBack({
          delta: 1
        })
      }
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
    searchWordFocus() {
      // console.log('searchWordFocus')
      this.$refs.resultList.showPriceFilter = false
      this.$refs.resultList.conditionFilter = false
    },
    getSearchResult() {
      // console.log('search word: ', this.searchWord)
      this.$refs.resultList.searchWord = this.searchWord
      this.$refs.resultList.getSearchResult()
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
    z-index: 2030;
    display: flex;
    background-color: #fff;
    .back-icon-box {
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
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-input {
        width: 90%;
        text-align: left;
      }
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
  .result-list {
    margin-top: 60px;
  }
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
</style>
