<template>
  <view class="menu-tabbar">
    <view
      class="menu-item"
      v-for="(item, index) of menuList"
      :key="index"
    >
      <view class="icon-box" @click="menuClick(item, index)">
        <image
          v-if="localIcon && (currIndex === index ? false : true)"
          :src="item.icon"
          class="icon"
        ></image>
        <image
          v-if="localIcon && (currIndex === index ? true : false)"
          :src="item.activeIcon"
          class="icon"
        ></image>
        <image
          v-if="httpIcon && (currIndex === index ? false : true)"
          :src="item.icon"
          class="icon"
        ></image>
        <image
          v-if="httpIcon && (currIndex === index ? true : false)"
          :src="item.activeIcon"
          class="icon"
        ></image>
      </view>
      <view
        class="menu-word"
        :class="currIndex === index ? 'active-color' : 'normal-color'"
      >{{item.title}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MenuTabbar',
  props: {
    menuList: {
      type: Array,
      default: []
    },
    currActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currIndex: 0,
      localIcon: false,
      httpIcon: false
    }
  },
  mounted() {
    this.initMenuList()
    this.currIndex = this.currActive
  },
  methods: {
    initMenuList() {
      if (this.menuList.length > 0) {
        for (let i = 0; i < this.menuList.length; i++) {
          if (this.menuList[i].icon.startsWith('/') ||
          this.menuList[i].icon.startsWith('./') ||
          this.menuList[i].icon.startsWith('../')) {
            this.localIcon = true
            this.httpIcon = false
          } else if (this.menuList[i].icon.startsWith('http://') ||
          this.menuList[i].icon.startsWith('https://')) {
            this.httpIcon = true
            this.localIcon = false
          }
        }
        // console.log(this.menuList)
      }
    },
    menuClick(item, index) {
      this.currIndex = index
      this.$emit('tabSwitch', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-tabbar {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .menu-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-box {
      .icon {
        width: 30px;
        height: 30px;
      }
    }
    .menu-word {
      font-size: 12px;
    }
  }
}
.normal-color {
  color: #999;
}
.active-color {
  color: #d81e06;
}
</style>
