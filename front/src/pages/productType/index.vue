<template>
  <view class="page-wrapper">
    <!-- 顶部导航栏 -->
    <type-header
      ref="typeHeader"
      :title="pageTitle"
    ></type-header>
    <!-- 分类按钮组 -->
    <view class="top-types">
    	<uni-segmented-control
        :current="typeCurrent"
        :values="typeItems"
        :style-type="textType"
        :active-color="styles.themeColor"
        @clickItem="onClickTypeItem"
      />
    </view>
    <view class="content">
      <!-- 头部图 -->
      <type-page-banner
        ref="typePageBanner"
        :bannerImg="bannerImg"
      ></type-page-banner>
      <!-- 推荐卡片 -->
      <rec-list-card ref="recListCard"></rec-list-card>
      <!-- 筛选栏 -->
      <filter-bar
        ref="filterBar"
        top="110px"
        @sortByPriceDown="sortByPriceDown"
        @sortByPriceUp="sortByPriceUp"
        @sortBySaleDown="sortBySaleDown"
        @sortBySaleUp="sortBySaleUp"
        @showCondition="showCondition"
      >
      </filter-bar>
      <!-- 筛选弹出层 -->
      <nut-popup
        v-model="showPopupOption"
        position="right"
        round
        class="option-popup"
      >
        <option-content
          ref="optionContent"
          :isToolOrEle="isToolOrEle"
          @handleCondition="handleCondition"
        ></option-content>
      </nut-popup>
      <!-- 分割标题 -->
      <line-header
        ref="lineHeader"
        :title="typeItems[typeCurrent]"
      ></line-header>
      <!-- boxCard推荐 -->
      <box-card
        ref="boxCard"
        :title="typeItems[typeCurrent]+'综合场馆'"
        :bgColor="cardColor.end"
        :titleStartColor="cardColor.start"
        :titleEndColor="cardColor.end"
      ></box-card>
      <!-- 卡片列表 -->
      <type-page-list ref="typePageList"></type-page-list>
    </view>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import TypeHeader from '@/components/typeHeader/typeHeader'
import TypePageBanner from '@/components/typePageBanner'
import RecListCard from '@/components/recListCard/recListCard'
import FilterBar from '@/components/filterBar/filterBar'
import OptionContent from './components/optionContent'
import LineHeader from './components/lineHeader'
import BoxCard from '@/components/boxCard/boxCard'
import TypePageList from '@/components/typePageList/typePageList'
import BackTop from '@/components/backTop'
import styles from '@/assets/scss/variables.scss'
import { homeApi } from '@/api/homeApi'

export default {
  name: 'HotelProduct',
  components: {
    TypeHeader,
    TypePageBanner,
    RecListCard,
    FilterBar,
    OptionContent,
    LineHeader,
    BoxCard,
    TypePageList,
    BackTop
  },
  data() {
    return {
      typeItems: [],
      typeCurrent: 0,
      textType: 'text',
      // activeColor: '#008461',
      bannerImg: 'hotel.jpg',
      pageTitle: '',
      cardColor: {},
      showPopupOption: false,
      isToolOrEle: false,
      typeInfo: {}
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  onLoad() {
    let params = {}
    uni.$once('pageParams', (data) => {
      params = data.params
    })
  },
  mounted() {
    this.getSaleTypeInfo()
  },
  methods: {
    getSaleTypeInfo() {
      let id = this.$Route.query.typeId
      if (id) {
        uni.showLoading({
          title: '数据加载中...'
        })
        homeApi.getSaleTypeItem(id).then(res => {
          if (res && res.data) {
            this.typeInfo = res.data
            this.pageTitle = res.data.title
            this.bannerImg = res.data.bannerUrl
            if (res.data.typeItems && res.data.typeItems.length) {
              for (let item of res.data.typeItems) {
                this.typeItems.push(item.name)
              }
            }
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          uni.hideLoading()
        })
      }
    },
    onClickTypeItem(e) {
      // console.log('onClickTypeItem', this.typeItems[e.currentIndex])
      if (this.typeCurrent !== e.currentIndex) {
      	this.typeCurrent = e.currentIndex
      }
    },
    sortByPriceDown() {
      // console.log('sortByPriceDown')
    },
    sortByPriceUp() {
      // console.log('sortByPriceUp')
    },
    sortBySaleDown() {
      // console.log('sortBySaleDown')
    },
    sortBySaleUp() {
      // console.log('sortBySaleUp')
    },
    showCondition() {
      // console.log('showCondition')
      this.showPopupOption = !this.showPopupOption
    },
    handleCondition(val) {
      this.showPopupOption = false
      // console.log('handleCondition', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  min-height: 100vh;
  background-color: #3ed18d;
}
.top-types {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  z-index: 2021;
  padding: 15px 10px 5px;
  background-color: #fff;
}
.content {
  min-height: 90vh;
  margin-top: 110px;
  padding-bottom: 20px;
}
.option-popup {
  width: 80%;
  height: calc(100vh - 110px);
  margin-top: 110px;
  background-color: #f5f5f5;
}
</style>