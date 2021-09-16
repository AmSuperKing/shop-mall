<template>
	<view class="detail">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  title="个人抬头"
		  color="#fff"
		  :bgColor="styles.themeColor"
		></header-nav>
        <div class="detail-header-invoice">
			<text class="detail-header-info">开票信息</text>
		</div>
		<view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>发票抬头：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="个人"  v-model.trim="required"/>
		</view>
        <view class="detail-invoice-button">
            <!-- <button class="saveButton" type="primary">保存</button> -->
            <nut-button class="saveButton" block shape="circle">保存</nut-button>
        </view>
	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'MyDetail',
  components: {
    HeaderNav
  },
  data() {
    return {
        required:'个人'
    }
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

<style long="scss" scoped>
@import '@/assets/scss/variables.scss';
/* #ifndef APP-NVUE */
page {
  background-color: #f5f5f5;
}
/* #endif */
.detail {
	height: 100%;
    margin-top: 65px;
}
.detail-header-invoice {
    height: 30px;
    width: 100%;
    display: flex;
}
.detail-header-info {
    margin-left: 25px;
    font-size: 18px;
    margin-top: 4px;
    margin-bottom: 4px;
    align-items: center;
}
.detail-header {
	display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
    background-color: #ffffff;
 }
.detail-header-text-left {
	margin-left: 17px;
	font-size: 15px;
	color: rgb(102, 102, 102);
 }
 .detail-header-text-left-required {
     color: #fa5157;
 }
.detail-header-text-right {
  margin-right: 10px;
  font-size: 14px;
  color: #000000;
}
.detail-invoice-button {
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    margin-top: 40px;
    height: 30px;
}
.saveButton {
    border-radius: 12px;
}
</style>
