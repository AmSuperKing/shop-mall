<template>
  <view class="menu-gallary">
    <view
      class="item"
      v-for="item of mainTypes"
      :key="item.mainTypeId"
      @click="toTypePage(item)"
    >
      <image class="item-img" :src="item.mainTypeImg" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script>
import { homeApi } from '@/api/homeApi'

export default {
  name: 'MenuGallary',
  data() {
    return {
      mainTypes: []
    }
  },
  mounted() {
    this.getMainTypes()
  },
  methods: {
    getMainTypes() {
      homeApi.getMainTypes().then(res => {
        if (res && res.data) {
          this.mainTypes = res.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    toTypePage(item) {
      // console.log(item)
      this.$store.dispatch('converse/setItem', item)
    	this.$Router.push({
        path: '/pages/goodsType/goodsType',
        query: {
          menuItem: item.mainTypeId,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-gallary {
  min-height: 300px;
  padding: 5px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  .item {
    display: inline-block;
    width: 100%;
    height: 100%;
    box-shadow: 0 3px 4px #008461;
    .item-img {
      width: 100%;
      height: 100%;
    }
  }
  .item:first-child {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  .item:nth-child(3) {
    grid-column-start: 1;
    grid-row-start: 3;
    grid-row-end: 5;
  }
}
</style>
