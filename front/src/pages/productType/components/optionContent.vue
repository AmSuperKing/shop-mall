<template>
  <view class="option-content">
    <!-- 价格 -->
    <view class="price-range">
      <view class="title-text">价格区间（¥）</view>
      <view class="price-input-box flex-box">
        <view class="price-input flex-box">
          <uni-easyinput
            class="num-input"
            trim="all"
            type="number"
            v-model="optionParams.minPrice"
            placeholder="最低价"
          />
        </view>
        <view class="line flex-box">—</view>
        <view class="price-input flex-box">
          <uni-easyinput
            class="num-input"
            trim="all"
            type="number"
            v-model="optionParams.maxPrice"
            placeholder="最高价"
          />
        </view>
      </view>
    </view>
    
    <!-- 分类 -->
    <view class="type-part">
      <view class="title" @click="isCollapseTypes=!isCollapseTypes">
        <view class="title-text">分类</view>
        <view class="arrow-icon">
          <uni-icons
            :type="isCollapseTypes?'arrowdown':'arrowup'"
            color="#666"
            size="20"
          />
        </view>
      </view>
      <view v-show="!isCollapseTypes" class="type-list">
        <view
          v-show="!isCollapseTypes"
          class="item"
          v-for="(item, index) of typeList"
          :key="index"
          :class="item.isChecked?'red-style':'grey-style'"
          @click="selectOption(item, index)"
        >
          {{item.type}}
        </view>
      </view>
    </view>
    
    <!-- 种类 -->
    <view v-if="isToolOrEle" class="type-part">
      <view class="title" @click="isCollapseSpecies=!isCollapseSpecies">
        <view class="title-text">种类</view>
        <view class="arrow-icon">
          <uni-icons
            :type="isCollapseSpecies?'arrowdown':'arrowup'"
            color="#666"
            size="20"
          />
        </view>
      </view>
      <view v-show="!isCollapseSpecies" class="type-list">
        <view
          v-show="!isCollapseSpecies"
          class="item"
          v-for="(item, index) of speciesList"
          :key="index"
          :class="item.isChecked?'red-style':'grey-style'"
          @click="selectOption(item, index)"
        >
          {{item.type}}
        </view>
      </view>
    </view>
    
    <!-- 功能 -->
    <view v-if="isToolOrEle" class="type-part">
      <view class="title" @click="isCollapseUse=!isCollapseUse">
        <view class="title-text">功能</view>
        <view class="arrow-icon">
          <uni-icons
            :type="isCollapseUse?'arrowdown':'arrowup'"
            color="#666"
            size="20"
          />
        </view>
      </view>
      <view v-show="!isCollapseUse" class="type-list">
        <view
          v-show="!isCollapseUse"
          class="item"
          v-for="(item, index) of useList"
          :key="index"
          :class="item.isChecked?'red-style':'grey-style'"
          @click="selectOption(item, index)"
        >
          {{item.type}}
        </view>
      </view>
    </view>
    
    <!-- 型号 -->
    <view v-if="isToolOrEle" class="type-part">
      <view class="title" @click="isCollapseModel=!isCollapseModel">
        <view class="title-text">型号</view>
        <view class="arrow-icon">
          <uni-icons
            :type="isCollapseModel?'arrowdown':'arrowup'"
            color="#666"
            size="20"
          />
        </view>
      </view>
      <view v-show="!isCollapseModel" class="type-list">
        <view
          v-show="!isCollapseModel"
          class="item"
          v-for="(item, index) of modelList"
          :key="index"
          :class="item.isChecked?'red-style':'grey-style'"
          @click="selectOption(item, index)"
        >
          {{item.type}}
        </view>
      </view>
    </view>
    
    <!-- 规格 -->
    <view v-if="isToolOrEle" class="type-part">
      <view class="title" @click="isCollapseSize=!isCollapseSize">
        <view class="title-text">规格</view>
        <view class="arrow-icon">
          <uni-icons
            :type="isCollapseSize?'arrowdown':'arrowup'"
            color="#666"
            size="20"
          />
        </view>
      </view>
      <view v-show="!isCollapseSize" class="type-list">
        <view
          v-show="!isCollapseSize"
          class="item"
          v-for="(item, index) of sizeList"
          :key="index"
          :class="item.isChecked?'red-style':'grey-style'"
          @click="selectOption(item, index)"
        >
          {{item.type}}
        </view>
      </view>
    </view>
    
    <!-- 按钮组 -->
    <view class="btns-box flex-box">
      <nut-buttongroup shape="circle" class="btns">
        <nut-button type="light" class="btn" @click="resetCondition">重置</nut-button>
        <nut-button  class="btn" @click="handleCondition">确定</nut-button>
      </nut-buttongroup>
    </view>
  </view>
</template>

<script>
export default {
  name: 'OptionContent',
  props: {
    isToolOrEle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionParams: {
        minPrice: null,
        maxPrice: null,
        types: [],
        species: [],
        useTypes: [],
        models: [],
        sizes: []
      },
      isCollapseTypes: false,
      typeList: [{
        type: '墙面装饰材料'
      }, {
        type: '家居家纺'
      }, {
        type: '家具家私'
      }, {
        type: '防火材料'
      }, {
        type: '建筑辅材'
      }, {
        type: '工具辅材'
      }],
      isCollapseSpecies: false,
      speciesList: [{
        type: '头部防护'
      }, {
        type: '手部防护'
      }, {
        type: '足部防护'
      }],
      isCollapseUse: false,
      useList: [{
        type: '防砸'
      }],
      isCollapseModel: false,
      modelList: [{
        type: 'TLX-A-Z462'
      }],
      isCollapseSize: false,
      sizeList: [{
        type: '86'
      }]
    }
  },
  methods: {
    initTypesData() {
      this.typeList.forEach(val => val.isChecked = false)
      this.speciesList.forEach(val => val.isChecked = false)
      this.useList.forEach(val => val.isChecked = false)
      this.modelList.forEach(val => val.isChecked = false)
      this.sizeList.forEach(val => val.isChecked = false)
    },
    selectOption(item, i) {
      let typeIndex = this.typeList.findIndex(val => val.type === item.type)
      let speciesIndex = this.speciesList.findIndex(val => val.type === item.type)
      let useIndex = this.useList.findIndex(val => val.type === item.type)
      let modelIndex = this.modelList.findIndex(val => val.type === item.type)
      let sizeIndex = this.sizeList.findIndex(val => val.type === item.type)
      if (item.isChecked) {
        if (speciesIndex !== -1) {
          this.speciesList[speciesIndex].isChecked = false
          let index = this.optionParams.species.findIndex(val => val === item.type)
          if (index !== -1) {
            this.optionParams.species.splice(index, 1)
          }
        } else if (typeIndex !== -1) {
          this.typeList[typeIndex].isChecked = false
          let index = this.optionParams.types.findIndex(val => val === item.type)
          if (index !== -1) {
            this.optionParams.types.splice(index, 1)
          }
        } else if (useIndex !== -1) {
          this.useList[useIndex].isChecked = false
          let index = this.optionParams.useTypes.findIndex(val => val === item.type)
          if (index !== -1) {
            this.optionParams.useTypes.splice(index, 1)
          }
        } else if (modelIndex !== -1) {
          this.modelList[modelIndex].isChecked = false
          let index = this.optionParams.models.findIndex(val => val === item.type)
          if (index !== -1) {
            this.optionParams.models.splice(index, 1)
          }
        } else if (sizeIndex !== -1) {
          this.sizeList[sizeIndex].isChecked = false
          let index = this.optionParams.sizes.findIndex(val => val === item.type)
          if (index !== -1) {
            this.optionParams.sizes.splice(index, 1)
          }
        }
      } else if (speciesIndex !== -1) {
        this.optionParams.species.push(item.type)
        this.speciesList[speciesIndex].isChecked = true
      } else if (typeIndex !== -1) {
        this.optionParams.types.push(item.type)
        this.typeList[typeIndex].isChecked = true
      } else if (useIndex !== -1) {
        this.optionParams.useTypes.push(item.type)
        this.useList[useIndex].isChecked = true
      } else if (modelIndex !== -1) {
        this.optionParams.models.push(item.type)
        this.modelList[modelIndex].isChecked = true
      } else if (sizeIndex !== -1) {
        this.optionParams.sizes.push(item.type)
        this.sizeList[sizeIndex].isChecked = true
      }
      // console.log('selected optionParams:', this.optionParams)
      this.$forceUpdate()
    },
    resetCondition() {
      this.typeList.forEach(val => val.isChecked = false)
      this.speciesList.forEach(val => val.isChecked = false)
      this.useList.forEach(val => val.isChecked = false)
      this.modelList.forEach(val => val.isChecked = false)
      this.sizeList.forEach(val => val.isChecked = false)
      this.optionParams.minPrice = null
      this.optionParams.maxPrice = null
      this.optionParams.types = []
      this.optionParams.species = []
      this.optionParams.useTypes = []
      this.optionParams.models = []
      this.optionParams.sizes = []
      this.$forceUpdate()
    },
    handleCondition() {
      this.$emit('handleCondition', this.optionParams)
    }
  }
}
</script>

<style lang="scss" scoped>
.option-content {
  padding-bottom: 120rpx;
  .price-range {
    padding-top: 20px;
    background-color: #fff;
    .price-input-box {
      display: flex;
      padding: 10px;
      font-size: 15px;
      .price-input {
        flex: 2;
        .num-input {
          width: 90%;
        }
      }
      .line {
        flex: 1;
      }
    }
  }
  .type-part {
    margin-top: 15px;
    background-color: #fff;
    .title {
      display: flex;
      padding: 10px 0;
      .title-text {
        flex: 2;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .arrow-icon {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 15px;
      }
    }
    .type-list {
      padding: 0 10px 10px;
      .item {
        display: inline-block;
        margin: 5px;
        padding: 5px;
        font-size: 14px;
        border-radius: 10px;
      }
    }
  }
  .btns-box {
    width: 80vw;
    position: fixed;
    right: 0;
    bottom: 15px;
    .btns {
      width: 90%;
      white-space: nowrap;
      .btn {
        border: 1px solid #eee;
      }
      .btn:first-child {
        border-right: none;
      }
      .btn:last-child {
        border-left: none;
      }
    }
  }
}
.title-text {
  padding-left: 15px;
  font-size: 15px;
  color: #333;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.red-style {
  color: #f5222f;
  border: 1px solid #f5222f;
  background-color: #ffebec;
}
.grey-style {
  color: #666;
  border: 1px solid #eee;
  background-color: #fff;
}
</style>
