<template>
  <view class="wrapper">
    <view class="header-search">
      <header-search ref="headerSearch"></header-search>
    </view>
    <view class="menu-linkage">
      <goods-about ref="goodsAbout"></goods-about>
    </view>
  </view>
</template>

<script>
import HeaderSearch from './headerSearch'
import GoodsAbout from '@/pages/classify/component/goodsAbout'
import { mapGetters } from 'vuex'

export default {
  name: 'GoodsType',
  components: {
    HeaderSearch,
    GoodsAbout
  },
  data() {
    return {
      switchItem: ''
    }
  },
  computed: {
    currSelectItem() {
      return this.$store.state.currSelectItem
    },
    ...mapGetters([
      'currSelectItem'
    ])
  },
  watch: {
    currSelectItem(newVal, oldVal) {
      if (newVal) {
        this.switchName = newVal.name
        this.deliveryParam()
      }
    }
  },
  mounted() {
    this.deliveryParam()
  },
  activated() {
    this.deliveryParam()
  },
  methods: {
    deliveryParam() {
      this.switchItem = this.currSelectItem
      // console.log('this.switchItem', this.currSelectItem)
      if (this.switchItem) {
        this.$refs.goodsAbout.switchItem = this.switchItem
        this.$refs.goodsAbout.getListData()
      } else {
        this.$toast.text('获取参数出错')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  .header-search {
    border-bottom: 1px solid #eee;
  }
  .menu-linkage {
    margin-top: 60px;
  }
}
</style>
