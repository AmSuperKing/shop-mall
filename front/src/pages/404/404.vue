<template>
	<view class="not-found">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  title=""
		  color="#fff"
		  :bgColor="styles.themeColor"
		></header-nav>
		<view class="tips-content">
			<image src="../../static/imgs/404.png" class="err-img"></image>
			<text>迷路啦，没有找到对应的页面</text>
			<button class="back-btn" @click="backHome">返回首页</button>
		</view>
	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'

export default {
	name: 'ErrorPage',
	components: {
    HeaderNav
  },
	data() {
		return {

		}
	},
	computed: {
    styles() {
      return styles
    }
  },
	onLoad(...options){
		// console.log(options)
		// console.log(this.$Route)
	},
	methods: {
		backHome() {
			this.$Router.replaceAll('/')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

page {
	background-color: #f5f5f5;
}
.not-found {
	overflow: hidden;
	.tips-content {
		margin-top: 55px;
		text-align: center;
		font-size: 15px;
		color: $theme-color;
		.err-img {
			display: block;
			width: 300px;
			height: 300px;
			margin: 0 auto;
		}
		.back-btn {
			width: 200px;
			margin-top: 30px;
			background-color: $theme-color;
			font-size: 16px;
			color: #fff;
		}
	}
}
</style>
