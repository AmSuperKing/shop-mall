<template>
	<view class="tabs">
		<scroll-view
      ref="tabbar1"
      id="tab-bar"
      class="tab-bar"
      :scroll="false"
      :scroll-x="true"
      :show-scrollbar="false"
		  :scroll-into-view="scrollInto"
    >
			<view style="flex-direction: column;">
				<view style="flex-direction: row;">
					<view
            class="uni-tab-item"
            v-for="(tab,index) in tabList"
            :key="tab.id"
            :id="tab.id"
            :ref="'tabitem'+index"
					  :data-id="index"
            :data-current="index"
            @click="ontabtap">
						<text
              class="uni-tab-item-title"
              :class="tabIndex==index ? 'uni-tab-item-title-active' : ''"
            >{{tab.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="tab-bar-line"></view>
		<view
      class="tab-box"
      ref="swiper1"
      :current="tabIndex"
      :duration="300"
      @change="onswiperchange"
		  @animationfinish="animationfinish"
    >
			<view class="swiper-item">
				<!-- #ifndef MP-ALIPAY -->
				<!-- <newsPage class="page-item" :nid="page.newsid" ref="page"></newsPage> -->
        <view class="goods-item-list">
          <view class="goods-item">
            <view
              class="goods-item-content"
              v-for="(item, index) of goodsListAll"
              :key="index"
              @click="toDetail(item)"
            >
              <view class="content-box" >
                <image
                  :src="item.coverImg"
                  class="goods-item-img"
                ></image>
                <view class="goods-enquery-icon-box">
                  <image src="../../../static/icons/askPrice.png" class="goods-enquery-icon"></image>
                </view>
                <view class="goods-item-title">{{item.goodsName + item.goodsModel}}</view>
              </view>
            </view>
          </view>
        </view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
import { homeApi } from '@/api/homeApi'
// #ifdef APP-PLUS
const dom = weex.requireModule('dom')
// #endif

// import newsPage from './news-page.vue'

// 缓存每页最多
const MAX_CACHE_DATA = 100
// 缓存页签数量
const MAX_CACHE_PAGE = 3
const TAB_PRELOAD_OFFSET = 1

export default {
  data() {
    return {
      tabList: [{
        id: "tab01",
        name: '最新',
        newsid: 0
      }, {
        id: "tab02",
        name: '大公司',
        newsid: 23
      }, {
        id: "tab03",
        name: '内容',
        newsid: 223
      }, {
        id: "tab04",
        name: '消费',
        newsid: 221
      }, {
        id: "tab05",
        name: '娱乐',
        newsid: 225
      }],
      tabIndex: 0,
      cacheTab: [],
      scrollInto: "",
      navigateFlag: false,
      indicatorLineLeft: 0,
      indicatorLineWidth: 0,
      isTap: false,
      goodsListAll:[]
          }
  },
  mounted() {
    this._lastTabIndex = 0
    this.swiperWidth = 0
    this.tabbarWidth = 0
    this.tabListSize = {}
    this._touchTabIndex = 0
    // #ifndef MP-ALIPAY
    this.pageList = this.$refs.page
    // #endif
    // #ifdef MP-ALIPAY
    this.pageList = []
    for (var i = 0; i < this.tabList.length; i++) {
      this.pageList.push(this.$refs['page' + i][0])
    }
    // #endif
    // this.switchTab(this.tabIndex);
    this.getTabbarItemsSize()
    this.$nextTick(() => {
      this.getTypeList()
      this.getRecGoods()
    })
  },
  methods: {
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      //let offsetIndex = this._touchTabIndex = Math.abs(index - this._lastTabIndex) > 1
      this.tabIndex = index
      // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      this.isTap = true
      var currentSize = this.tabListSize[index]
      this.getRecGoods()
      this.updateIndicator(currentSize.left, currentSize.width)
      this._touchTabIndex = index
      // #endif

      // this.switchTab(index)
    },
    getRecGoods() {
      uni.showLoading({
        title: '数据加载中'
      })
      homeApi.getRecGoods().then(res => {
        if (res && res.data) {
          this.goodsListAll = res.data
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        uni.hideLoading()
      })
    },
    onswiperchange(e) {
      // 注意：百度小程序会触发2次

      // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      let index = e.target.current || e.detail.current
      // this.switchTab(index)
      // #endif
    },
    onswiperscroll(e) {
      if (this.isTap) {
        return
      }

      var offsetX = e.detail.dx
      var preloadIndex = this._lastTabIndex
      if (offsetX > TAB_PRELOAD_OFFSET) {
        preloadIndex++
      } else if (offsetX < -TAB_PRELOAD_OFFSET) {
        preloadIndex--
      }
      if (preloadIndex === this._lastTabIndex ||
      preloadIndex < 0 ||
      preloadIndex > this.pageList.length - 1) {
        return
      }
      if (this.pageList[preloadIndex].dataList.length === 0) {
        this.loadTabData(preloadIndex)
      }

      // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      var percentage = Math.abs(this.swiperWidth / offsetX)
      var currentSize = this.tabListSize[this._lastTabIndex]
      var preloadSize = this.tabListSize[preloadIndex]
      var lineL = currentSize.left + (preloadSize.left - currentSize.left) / percentage
      var lineW = currentSize.width + (preloadSize.width - currentSize.width) / percentage
      this.updateIndicator(lineL, lineW)
      // #endif
    },
    getTypeList() {
      uni.showLoading({
        title: '数据加载中'
      })
      homeApi.getSubTypes().then(res => {
        if(res) {
        for(let i = 0;i < 5; i++) {
          this.tabList[i].name = res.data[i].subMainTypeName
        }
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        uni.hideLoading()
      })
    },
    animationfinish(e) {
      // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      let index = e.detail.current
      this.tabIndex = index
      if (this._touchTabIndex === index) {
        this.isTap = false
      }
      this._lastTabIndex = index
      this.getRecGoods()
      // this.switchTab(index)
      this.updateIndicator(this.tabListSize[index].left, this.tabListSize[index].width)
      // #endif
    },
    getTabbarItemsSize() {
      // #ifdef APP-NVUE
      dom.getComponentRect(this.$refs.tabbar1, res => {
        this.tabbarWidth = res.size.width
      })
      dom.getComponentRect(this.$refs['swiper1'], res => {
        this.swiperWidth = res.size.width
      })
      for (var i = 0; i < this.tabList.length; i++) {
        this.getElementSize(dom, this.$refs['tabitem' + i][0], i)
      }
      // #endif

      // #ifdef MP-WEIXIN || H5 || MP-QQ
      uni.createSelectorQuery().in(this).select('.tab-box').fields({
        dataset: true,
        size: true,
      }, (res) => {
        this.swiperWidth = res.width
      }).exec()
      uni.createSelectorQuery().in(this).selectAll('.uni-tab-item').boundingClientRect((rects) => {
        rects.forEach((rect) => {
          this.tabListSize[rect.dataset.id] = rect
        })
      }).exec()
      // #endif

      // #ifdef APP-NVUE || H5 || MP-WEIXIN || MP-QQ
      setTimeout(() => {
        this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width)
      }, 100)
      // #endif
    },
    getElementSize(dom, ref, id) {
      dom.getComponentRect(ref, res => {
        this.tabListSize[id] = res.size
      })
    },
    updateIndicator(left, width) {
      this.indicatorLineLeft = left
      this.indicatorLineWidth = width
    },
    switchTab(index) {
      if (this.pageList[index].dataList.length === 0) {
        this.loadTabData(index)
      }

      if (this.tabIndex === index) {
        return
      }

      // 缓存 tabId
      if (this.pageList[this.tabIndex].dataList.length > MAX_CACHE_DATA) {
        let isExist = this.cacheTab.indexOf(this.tabIndex)
        if (isExist < 0) {
          this.cacheTab.push(this.tabIndex)
        }
      }

      this.tabIndex = index

      // #ifdef APP-NVUE
      this.scrollTabTo(index)
      // #endif
      // #ifndef APP-NVUE
      this.scrollInto = this.tabList[index].id
      // #endif

      // 释放 tabId
      if (this.cacheTab.length > MAX_CACHE_PAGE) {
        let cacheIndex = this.cacheTab[0]
        this.clearTabData(cacheIndex)
        this.cacheTab.splice(0, 1)
      }
    },
    scrollTabTo(index) {
      const el = this.$refs['tabitem' + index][0]
      let offset = 0
      // TODO fix ios offset
      if (index > 0) {
        offset = this.tabbarWidth / 2 - this.tabListSize[index].width / 2
        if (this.tabListSize[index].right < this.tabbarWidth / 2) {
          offset = this.tabListSize[0].width
        }
      }
      dom.scrollToElement(el, {
        offset: -offset
      })
    },
    loadTabData(index) {
      this.pageList[index].loadData()
    },
    clearTabData(index) {
      this.pageList[index].clear()
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
/* #ifndef APP-PLUS */
page {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

.tabs {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
  /* #ifdef MP-ALIPAY || MP-BAIDU */
  height: 100vh;
  /* #endif */
}

.tab-bar {
  width: 750upx;
  height: 84upx;
  flex-direction: row;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

/* #ifndef APP-NVUE */
.tab-bar ::-webkit-scrollbar {
    display: none;  
    width: 0 !important;  
    height: 0 !important;  
    -webkit-appearance: none;  
    background: transparent;  
}
/* #endif */

.scroll-view-indicator {
  position: relative;
  height: 2px;
  background-color: transparent;
}

.scroll-view-underline {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  background-color: #007AFF;
}

.scroll-view-animation {
  transition-duration: 0.2s;
  transition-property: left;
}

.tab-bar-line {
  height: 1upx;
  background-color: #cccccc;
}

.tab-box {
  flex: 1;
}

.uni-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  padding-left: 20px;
  padding-right: 20px;
}

.uni-tab-item-title {
  color: #555;
  font-size: 30upx;
  height: 80upx;
  line-height: 80upx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.uni-tab-item-title-active {
  color: #007AFF;
}

.swiper-item {
  flex: 1;
  flex-direction: column;
  /* height: 1140px; */
}

.page-item {
  flex: 1;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
    
.goods-item-list {
  width: 100%;
  /* background-color: #f5f5f5; */
}
.goods-item {
  width: 100%;
  /* height: 100px; */
  padding: 10px;
  box-sizing: border-box;
}
.goods-item-content {
  /* margin-top: 260px; */
  display: inline-block;
  width: 50%;
  padding: 10rpx 0;
}
.content-box {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20rpx 0;
  border-radius: 20rpx;
  background-color: #fff;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
}
.goods-item-img {
  display: inline-block;
  width: 20vh;
  height: 20vh;
}
.goods-enquery-icon-box {
  width: 100%;
  height: 40rpx;
  text-align: right;
}
.goods-enquery-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 20rpx;
}
.goods-item-title {
  height: 100%;
  padding: 0 20rpx;
  margin: 20rpx 0;
  text-align: justify;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
