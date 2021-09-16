<template>
  <view class="wrapper">
    <header-nav
      ref="headerNav"
      title="我的评价"
      color="#fff"
      :bgColor="styles.themeColor"
    ></header-nav>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'MyComment',
  components: {
    HeaderNav
  },
  data() {
    return {}
  },
  computed: {
    styles() {
      return styles
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
