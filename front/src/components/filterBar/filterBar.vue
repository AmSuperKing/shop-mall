<template>
  <view class="bar-wrapper">
    <!-- 固定筛选栏 -->
    <view
      v-show="fixedBarVisible"
      class="fixed-filter-bar"
      :style="'position: fixed;left: 0;right: 0;top: '+top+';'"
    >
      <view class="filter-box">
        <view class="filter-option flex-box" @click="clickPriceFilter">
          <text
            class="option-text"
            :class="priceOption?'active-text':''"
          >价格</text>
          <view class="icons">
            <uni-icons
              type="arrowup"
              :color="priceUp?'#f5222f':'#666'"
              size="12"
            />
            <uni-icons
              type="arrowdown"
              :color="priceDown?'#f5222f':'#666'"
              size="12"
            />
          </view>
        </view>
        
        <view class="filter-option flex-box" @click="clickSaleFilter">
          <text
            class="option-text"
            :class="saleOption?'active-text':''"
          >销量</text>
          <view class="icons">
            <uni-icons
              type="arrowup"
              :color="saleUp?'#f5222f':'#666'"
              size="12"
            />
            <uni-icons
              type="arrowdown"
              :color="saleDown?'#f5222f':'#666'"
              size="12"
            />
          </view>
        </view>
        
        <view class="filter-option flex-box" @click="clickConditionFilter">
          <text
            class="option-text"
          >筛选</text>
          <view class="icons">
            <image src="../../static/icons/filter.png" class="filter-icon"></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 筛选栏 -->
    <view id="filterBar" class="filter-box">
      <view class="filter-option flex-box" @click="clickPriceFilter">
        <text
          class="option-text"
          :class="priceOption?'active-text':''"
        >价格</text>
        <view class="icons">
          <uni-icons
            type="arrowup"
            :color="priceUp?'#f5222f':'#666'"
            size="12"
          />
          <uni-icons
            type="arrowdown"
            :color="priceDown?'#f5222f':'#666'"
            size="12"
          />
        </view>
      </view>
      
      <view class="filter-option flex-box" @click="clickSaleFilter">
        <text
          class="option-text"
          :class="saleOption?'active-text':''"
        >销量</text>
        <view class="icons">
          <uni-icons
            type="arrowup"
            :color="saleUp?'#f5222f':'#666'"
            size="12"
          />
          <uni-icons
            type="arrowdown"
            :color="saleDown?'#f5222f':'#666'"
            size="12"
          />
        </view>
      </view>
      
      <view class="filter-option flex-box" @click="clickConditionFilter">
        <text
          class="option-text"
        >筛选</text>
        <view class="icons">
          <image src="../../static/icons/filter.png" class="filter-icon"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    top: {
      type: String,
      default: '55px'
    }
  },
  data() {
    return {
      priceFilter: false,
      priceOption: false,
      priceUp: false,
      priceDown: false,
      saleOption: false,
      saleUp: false,
      saleDown: false,
      fixedBarVisible: false
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
      let barTop = document.getElementById('filterBar').offsetTop
      this.fixedBarVisible = (currTop > (barTop + 50)) ? true : false
    },
    clickPriceFilter() {
      if (!this.priceDown) {
        this.priceOption = true
        this.priceUp = false
        this.priceDown = true
        this.$emit('sortByPriceDown')
      } else {
        this.priceUp = true
        this.priceDown = false
        this.$emit('sortByPriceUp')
      }
    },
    clickSaleFilter() {
      if (!this.saleDown) {
        this.saleOption = true
        this.saleUp = false
        this.saleDown = true
        this.$emit('sortBySaleDown')
      } else {
        this.saleUp = true
        this.saleDown = false
        this.$emit('sortBySaleUp')
      }
    },
    clickConditionFilter() {
      this.$emit('showCondition')
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-wrapper {
  width: 100%;
  background-color: transparent;
  .filter-box {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    display: flex;
    background-color: #fff;
    border-radius: 15px;
    .filter-option {
      flex: 1;
      height: 100%;
      text-align: center;
      color: #666;
      .option-text {
        font-size: 15px;
      }
      .icons {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 2px;
        padding-left: 2px;
      }
    }
  }
}
.fixed-filter-bar {
  z-index: 99;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .2);
}
.filter-icon {
  width: 15px;
  height: 15px;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.active-text {
  color: #f5222f;
}
</style>
