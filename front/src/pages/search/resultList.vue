<template>
  <view class="content">
    <!-- 分类导航栏 -->
    <view v-if="typeFilterVisible" class="type-filter">
      <view class="type-params">
        <view class="text-box">
          <text class="type-text">{{mainType}}</text>
          <text class="type-text">/</text>
          <text class="type-text">{{subType}}</text>
        </view>
      </view>
      <view class="more-type" @click="showClassify">
        更多分类
        <image src="../../static/icons/more.png" class="more-icon"></image>
      </view>
    </view>
    <!-- 精品速购与超值好物提示导航栏 -->
    <view v-if="showTips" class="tips-bar">
      <view class="type-params">
        <view class="text-box">
          <text class="type-text">{{typeTitle}}</text>
        </view>
      </view>
    </view>
    <!-- 导航菜单start -->
    <view
      class="nav-menu"
      :class="(typeFilterVisible||showTips)?'have-type-fixed':'none-type-fixed'"
    >
      <view class="menu-item">
        <view class="item-text" @click="clickPrice">
          <view class="text">价格</view>
          <view class="icons">
            <uni-icons type="arrowdown" color="#999" size="13" />
          </view>
        </view>
      </view>
      
      <view class="menu-item">
        <view class="item-text" @click="clickSales">
          <view class="text" :class="activeSale?'active-text':''">销量</view>
          <view class="icons">
            <uni-icons type="arrowup" :color="activeUp?'#f5222f':'#999'" size="12"/>
            <uni-icons type="arrowdown" :color="activeDown?'#f5222f':'#999'" size="12"/>
          </view>
        </view>
      </view>
      
      <view class="menu-item">
        <view class="item-text" v-show="showList" @click="listOrGrid">
          <view class="text">列表</view>
          <view class="icons">
            <image src="../../static/icons/list.png" class="img-icon"></image>
          </view>
        </view>
        
        <view class="item-text" v-show="!showList" @click="listOrGrid">
          <view class="text">宫格</view>
          <view class="icons">
            <image src="../../static/icons/grid.png" class="img-icon"></image>
          </view>
        </view>
      </view>
      
      <view class="menu-item">
        <view class="item-text" @click="filterProduct">
          <view class="text">筛选</view>
          <view class="icons">
            <image src="../../static/icons/filter.png" class="img-icon"></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 导航菜单end -->
    
    <!-- 搜结果列表 -->
    <search-product-list
      v-if="haveResult"
      ref="searchProductList"
      :class="(typeFilterVisible||showTips)?'header-margin-big':'header-margin-small'"
    >
    </search-product-list>
    <!-- 搜索结果为空 -->
    <no-result
      v-if="!haveResult"
      ref="noResult"
      :class="(typeFilterVisible||showTips)?'header-margin-big':'header-margin-small'"
    >
    </no-result>
    
    <!-- 分类弹出层 -->
    <nut-popup
      v-model="classifyFilter"
      round
      position="right"
      class="classify-filter"
    >
      <goods-about
        v-if="classifyFilter"
        ref="menuLinkage"
        :useInResult="true"
        @submitTypes="receivedTypes"
      ></goods-about>
    </nut-popup>
    <!-- 价格筛选弹出层 -->
    <nut-popup
      v-model="showPriceFilter"
      round
      position="top"
      :overlay="true"
      class="price-filter"
    >
      <radio-group @change="radioChange">
      	<label class="radio-item" v-for="(item, index) in items" :key="item.value">
      		<view class="radio-select">
      			<radio
              :value="item.value"
              :checked="index === current"
              :color="styles.themeColor"
              style="transform:scale(0.7)"
            />
      		</view>
      		<view class="radio-text">{{item.name}}</view>
      	</label>
      </radio-group>
    </nut-popup>
    
    <!-- 条件筛选弹出层 -->
    <nut-popup
      v-model="conditionFilter"
      round
      position="right"
      class="condition-filter"
      :class="(typeFilterVisible||showTips)?'filter-height-small':'filter-height-big'"
    >
      <view class="condition-content">
        <!-- 价格区间 -->
        <view class="price-condition">
          <view class="price-title">
            价格区间（¥）
          </view>
          <view class="price-area">
            <view class="min-price flex-container">
              <uni-easyinput
                class="num-input"
                trim="all"
                type="number"
                v-model="minPrice"
                placeholder="最低价"
              >
              </uni-easyinput>
            </view>
            <view class="h-line">—</view>
            <view class="max-price flex-container">
              <uni-easyinput
                class="num-input"
                trim="all"
                type="number"
                v-model="maxPrice"
                placeholder="最高价"
              >
              </uni-easyinput>
            </view>
          </view>
        </view>
        
        <!-- 分类 -->
        <custom-collapse ref="typeCondition" class="type-collapse">
          <custom-collapse-item
            title="分类"
            style="font-size: 15px;"
            :open="openType"
            :showAnimation="true"
          >
            <template v-slot:title>
              <text>分类</text>
            </template>
            <view class="type-items">
              <view
                class="type-item"
                v-for="(item, index) of typeItem"
                :key="index"
                :class="item.select?'red-style':'gray-style'"
                @click="selectTypeItem(item, index)"
              >
                {{item.word}}
              </view>
            </view>
          </custom-collapse-item>
        </custom-collapse>
        
        <!-- 型号 -->
        <custom-collapse ref="modelCondition" class="type-collapse">
          <custom-collapse-item
            title="型号"
            :open="openModel"
            :showAnimation="true"
          >
            <view class="type-items">
              <view
                class="type-item"
                v-for="(item, index) of modelItem"
                :key="index"
                :class="item.select?'red-style':'gray-style'"
                @click="selectModelItem(item, index)"
              >
                {{item.word}}
              </view>
            </view>
          </custom-collapse-item>
        </custom-collapse>
        
        <!-- 材质 -->
        <custom-collapse ref="materialCondition" class="type-collapse" style="margin-bottom: 120rpx;">
          <custom-collapse-item
            title="材质"
            :open="openMaterial"
            :showAnimation="true"
          >
            <view class="type-items">
              <view
                class="type-item"
                v-for="(item, index) of materialItem"
                :key="index"
                :class="item.select?'red-style':'gray-style'"
                @click="selectMaterialItem(item, index)"
              >
                {{item.word}}
              </view>
            </view>
          </custom-collapse-item>
        </custom-collapse>
        
        <!-- 按钮组 -->
        <view class="btns">
          <nut-button 
            type="light"
            shape="circle"
            class="gray-border light-btn"
            @click="resetSelectParam"
          >
            重置
          </nut-button>
          <nut-button
            shape="circle"
            class="primary-btn"
            @click="confirmConditionSearch"
          >
            确定
          </nut-button>
        </view>
      </view>
    </nut-popup>
  </view>
</template>

<script>
import CustomCollapse from '@/components/customCollapse/customCollapse'
import CustomCollapseItem from '@/components/customCollapseItem/customCollapseItem'
import SearchProductList from './components/searchProductList'
import NoResult from './components/noResult'
// import MenuLinkage from '@/components/menuLinkage'
import GoodsAbout from '@/pages/classify/component/goodsAbout'
import styles from '@/assets/scss/variables.scss'
import { searchApi } from '@/api/searchApi'

export default {
  name: 'ResultList',
  components: {
    CustomCollapse,
    CustomCollapseItem,
    SearchProductList,
    NoResult,
    GoodsAbout
    // MenuLinkage
  },
  data() {
    return {
      searchWord: '',
      showList: true,
      activeSale: false,
      activeUp: false,
      activeDown: false,
      classifyFilter: false,
      showPriceFilter: false,
      conditionFilter: false,
      haveResult: false,
      priceSort: '',
      minPrice: '',
      maxPrice: '',
      openType: true,
      openModel: true,
      openMaterial: true,
      typeFilterVisible: false,
      mainType: '',
      subType: '',
      showTips: false,
      typeTitle: '精品好物',
      items: [{
      		value: 'default',
      		name: '默认'
      	},
      	{
      		value: 'order',
      		name: '价格由低到高',
      		checked: 'true'
      	},
      	{
      		value: 'price',
      		name: '只看有价格'
      	},
        {
        	value: 'reverse',
        	name: '价格由高到低'
        },
      ],
      current: 0,
      typeItem: [{
        select: false,
        word: '拉手'
      }, {
        select: false,
        word: '铝门窗单品'
      }, {
        select: false,
        word: '家装'
      }, {
        select: false,
        word: '卫浴配件'
      }, {
        select: false,
        word: 'MACO五金'
      }, {
        select: false,
        word: '高端铝合金C槽'
      }],
      modelItem: [{
        select: false,
        word: 'KLS20210701'
      }, {
        select: false,
        word: 'KLS20210711'
      }, {
        select: false,
        word: 'KLS20210704'
      }, {
        select: false,
        word: 'KLS20210712'
      }, {
        select: false,
        word: 'KLS20210764'
      }, {
        select: false,
        word: 'KLS20210709'
      }],
      materialItem: [{
        select: false,
        word: '铝合金'
      }, {
        select: false,
        word: '锌合金'
      }, {
        select: false,
        word: '合成铜'
      }],
      selectTypeArr: [],
      selectModelArr: [],
      selectMaterialArr: []
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  mounted() {

  },
  methods: {
    getSearchResult() {
      if (this.searchWord) {
        uni.showLoading({
          title: '数据加载中'
        })
        searchApi.searchGoods(this.searchWord).then(res => {
          // console.log('search res:', res.data.data)
          if (res && res.data && res.data.data && res.data.data.length > 0) {
            this.haveResult = true
            this.$nextTick(() => {
              this.$refs.searchProductList.searchData = res.data.data
            })
          } else {
            this.haveResult = false
            this.$nextTick(() => {
              this.$refs.noResult.searchWord = this.searchWord
            })
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          uni.hideLoading()
        })
      }
    },
    showClassify() {
      this.classifyFilter = !this.classifyFilter
      if (this.classifyFilter) {
        this.$nextTick(() => {
          this.$refs.menuLinkage.switchName = this.mainType
          this.$refs.menuLinkage.switchToMenu()
        })
      }
    },
    receivedTypes(mainType, subType) {
      this.mainType = mainType
      this.subType = subType
      this.classifyFilter = false
    },
    clickPrice() {
      // console.log('click price')
      this.showPriceFilter = !this.showPriceFilter
    },
    clickSales() {
      // console.log('click sales')
      this.showPriceFilter = false
      this.activeSale = true
      if (this.activeUp === false) {
        this.activeUp = true
        this.activeDown = false
      } else if (this.activeUp === true) {
        this.activeUp = false
        this.activeDown = true
      }
    },
    listOrGrid() {
      // console.log('click listOrGrid')
      this.showList = !this.showList
      this.showPriceFilter = false
      this.$refs.searchProductList.showGrid = !this.$refs.searchProductList.showGrid
    },
    filterProduct() {
      // console.log('click filterProduct')
      this.conditionFilter = !this.conditionFilter
      this.showPriceFilter = false
    },
    radioChange(evt) {
      // console.log('radioChange:', evt.detail.value)
    	for (let i = 0; i < this.items.length; i++) {
    		if (this.items[i].value === evt.detail.value) {
    			this.current = i;
    			break;
    		}
    	}
    },
    selectTypeItem(item, index) {
      this.typeItem[index].select = !this.typeItem[index].select
      let findIndex = this.selectTypeArr.indexOf(item.word)
      if (findIndex > -1) {
        this.selectTypeArr.splice(findIndex, 1)
      } else {
        this.selectTypeArr.push(item.word)
      }
      // console.log('this.selectTypeArr:', this.selectTypeArr)
    },
    selectModelItem(item, index) {
      this.modelItem[index].select = !this.modelItem[index].select
      let findIndex = this.selectModelArr.indexOf(item.word)
      if (findIndex > -1) {
        this.selectModelArr.splice(findIndex, 1)
      } else {
        this.selectModelArr.push(item.word)
      }
      // console.log('this.selectModelArr:', this.selectModelArr)
    },
    selectMaterialItem(item, index) {
      this.materialItem[index].select = !this.materialItem[index].select
      let findIndex = this.selectMaterialArr.indexOf(item.word)
      if (findIndex > -1) {
        this.selectMaterialArr.splice(findIndex, 1)
      } else {
        this.selectMaterialArr.push(item.word)
      }
      // console.log('this.selectMaterialArr:', this.selectMaterialArr)
    },
    resetSelectParam() {
      this.minPrice = ''
      this.maxPrice = ''
      this.typeItem.forEach(val => val.select = false)
      this.selectTypeArr = []
      this.modelItem.forEach(val => val.select = false)
      this.selectModelArr = []
      this.materialItem.forEach(val => val.select = false)
      this.selectMaterialArr = []
      // console.log(this.typeItem, this.selectTypeArr)
      // console.log(this.modelItem, this.selectModelArr)
      // console.log(this.materialItem, this.selectMaterialArr)
    },
    confirmConditionSearch() {
      // console.log('confirmConditionSearch')
      this.conditionFilter = false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  .type-filter {
    height: 35px;
    display: flex;
    align-items: flex-start;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    z-index: 2030;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    .type-params {
      flex: 3;
      padding-left: 10px;
      .text-box {
        min-width: 120px;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        color: #fff;
        background-color: #14aa79;
        .type-text {
          padding: 0 4px;
        }
      }
    }
    .more-type {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      .more-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
  .nav-menu {
    width: 100%;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    .menu-item {
      width: 25%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 14px;
      .item-text {
        color: #999;
        display: flex;
        flex-direction: row;
        .text {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding-right: 10rpx;
        }
        .icons {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .img-icon {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}
.tips-bar {
  height: 35px;
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 2030;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  .type-params {
    padding-left: 10px;
    .text-box {
      min-width: 80px;
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      text-align: center;
      color: #fff;
      background-color: #14aa79;
      .type-text {
        padding: 0 4px;
      }
    }
  }
}
.active-text {
  color: #f5222f;
}
.price-filter {
  height: 20%;
  margin-top: calc(60px + 35px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.radio-item {
  width: 50%;
  display: inline-flex;
  flex-direction: row;
  margin: 10rpx 0;
  .radio-select {
    flex: 1;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
  }
  .radio-text {
    flex: 3;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #666;
  }
}
.condition-filter {
  width: 80%;
  background-color: #f5f5f5;
  .condition-content {
    padding-bottom: 20rpx;
    .price-condition {
      background-color: #fff;
      padding: 40rpx 0;
      .price-title {
        padding-left: 12px;
        font-size: 15px;
        color: #333;
      }
      .price-area {
        display: flex;
        flex-direction: row;
        margin-top: 20rpx;
        .min-price {
          flex: 5;
          .num-input {
            width: 80%;
          }
        }
        .h-line {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
        .max-price {
          flex: 5;
          .num-input {
            width: 80%;
          }
        }
      }
    }
    .btns {
      width: 80vw;
      position: fixed;
      bottom: 20rpx;
      right: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 20rpx;
      background-color: transparent;
      .light-btn {
        width: 40%;
      }
      .primary-btn {
        width: 40%;
      }
    }
  }
}
.classify-filter {
  width: 100%;
  height: calc(100vh - 60px - 35px);
  margin-top: calc(60px + 35px);
  z-index: 2035 !important;
}
.flex-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 28rpx;
}
.uni-collapse-cell--open {
  background-color: #fff;
}
.type-collapse {
  margin-top: 16rpx;
  .type-items {
    padding: 10rpx 20rpx 30rpx;
    .type-item {
      display: inline-block;
      margin-right: 30rpx;
      margin-bottom: 20rpx;
      padding: 8rpx 16rpx;
      text-align: center;
      font-size: 15px;
      border-radius: 10rpx;
    }
  }
}
.gray-style {
  color: #666;
  border: 2rpx solid #eee;
  background-color: #fff;
}
.red-style {
  color: #f5222f;
  border: 2rpx solid #f5222f;
  background-color: #ffebec;
}
.gray-border {
  border: 2rpx solid #eee;
}
.have-type-fixed {
  position: fixed;
  top: calc(60px + 35px);
  left: 0;
  right: 0;
  z-index: 2030;
}
.none-type-fixed {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 2030;
}
.header-margin-big {
  margin-top: calc(60px + 35px + 35px);
}
.header-margin-small {
  margin-top: calc(60px + 35px);
}
.filter-height-big {
  height: calc(100vh - 60px - 35px);
  margin-top: calc(60px + 35px);
}
.filter-height-small {
  height: calc(100vh - 60px - 35px - 35px);
  margin-top: calc(60px + 35px + 35px);
}
</style>
