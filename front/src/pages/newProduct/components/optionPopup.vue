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
      <view v-if="!isCollapseTypes" class="type-list">
        <view
          v-if="!isCollapseTypes"
          class="item"
          v-for="(item, index) of typeList"
          :key="index"
          :class="item.isChecked?'red-style':'grey-style'"
          @click="selectItem(item, index)"
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
  name: 'OptionPopup',
  components: {

  },
  data() {
    return {
      optionParams: {
        minPrice: null,
        maxPrice: null,
        types: []
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
      }]
    }
  },
  methods: {
    initTypesData() {
      this.typeList.forEach(val => val.isChecked = false)
    },
    selectItem(item, i) {
      if (item.isChecked) {
        let index = this.optionParams.types.findIndex(val => val === item.type)
        if (index !== -1) {
          this.optionParams.types.splice(index, 1)
        }
      } else {
        this.optionParams.types.push(item.type)
      }
      // console.log('selected types:', this.optionParams.types)
      this.typeList[i].isChecked = !this.typeList[i].isChecked
      this.$forceUpdate()
    },
    resetCondition() {
      this.typeList.forEach(val => val.isChecked = false)
      this.optionParams.types = []
      this.optionParams.minPrice = null
      this.optionParams.maxPrice = null
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
