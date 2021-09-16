<template>
  <view class="wrapper">
    <!-- 顶部导航栏 -->
    <header-nav
      ref="headerNav"
      title="新品首发"
    ></header-nav>
    <view class="content">
      <!-- 头部图 -->
      <type-page-banner
        ref="typePageBanner"
        :bannerImg="bannerImg"
      ></type-page-banner>
      <!-- 筛选栏 -->
      <filter-bar
        id="fixedFilterBar"
        ref="filterBar"
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
        <option-popup
          ref="optionPopup"
          @handleCondition="handleCondition"
        ></option-popup>
      </nut-popup>
      <!-- 标题 -->
      <view class="content-title flex-box">
        <image src="../../static/icons/new.png" class="new-icon"></image>
        <text class="title-text">新品首发</text>
        <image src="../../static/icons/new.png" class="new-icon"></image>
      </view>
      <!-- BoxCard -->
      <box-card
        ref="boxCard"
        title="新品首发综合场"
        :bgColor="styles.themeColor"
        :titleStartColor="styles.subThemeColor"
        :titleEndColor="styles.themeColor"
      >
      </box-card>
      <!-- List -->
      <type-page-list ref="typePageList"></type-page-list>
    </view>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import TypePageBanner from '@/components/typePageBanner'
import FilterBar from '@/components/filterBar/filterBar'
import OptionPopup from './components/optionPopup'
import BoxCard from '@/components/boxCard/boxCard'
import TypePageList from '@/components/typePageList/typePageList'
import BackTop from '@/components/backTop'
import styles from '@/assets/scss/variables.scss'
import { infoApi } from '@/api/infoApi'

export default {
  name: 'NewProduct',
  components: {
    HeaderNav,
    TypePageBanner,
    FilterBar,
    OptionPopup,
    BoxCard,
    TypePageList,
    BackTop
  },
  data() {
    return {
      showPopupOption: false,
      bannerImg: ''
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  mounted() {
    this.getBannerImg()
  },
  methods: {
    getBannerImg() {
      infoApi.getNewProductBanner().then(res => {
        // console.log('getBannerImg', res.data)
        if (res.data && res.data.bannerUrl) {
          this.bannerImg = res.data.bannerUrl
        }
      }).catch(e => {
        console.log(e)
      })
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
@import '@/assets/scss/variables.scss';

page {
  background-color: $sub-theme-color;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  min-height: 90vh;
  margin-top: 55px;
  padding-bottom: 20px;
  .img-box {
    width: 100%;
    height: 600rpx;
    .banner-img {
      width: 100%;
      height: 100%;
    }
  }
}
.option-popup {
  width: 80%;
  height: calc(100vh - 55px);
  margin-top: 55px;
  background-color: #f5f5f5;
}
.content-title {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: #fff;
  .new-icon {
    width: 60px;
    height: 60px;
  }
  .new-icon:first-child {
    transform: rotate(180deg);
  }
  .title-text {
    margin: 0 20px;
    font-weight: bold;
  }
}
</style>
