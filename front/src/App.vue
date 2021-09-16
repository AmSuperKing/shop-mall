<script>
	export default {
		// 应用生命周期仅可在App.vue中监听，在其它页面监听无效
		onLaunch: function() {
			// 当uni-app 初始化完成时触发（全局只触发一次）
			// console.log('App Launch')
		},
		onShow: function() {
			// 当 uni-app 启动，或从后台进入前台显示
			// console.log('App Show')
		},
		onHide: function() {
			// 当 uni-app 从前台进入后台
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
<style lang="scss">
$specColor: #008461;
/* 修改复选框默认样式 */
/* #ifdef H5 */
uni-checkbox .uni-checkbox-input {
  border-radius: 50% !important;
  color: #ffffff !important;
}

uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
  color: #fff;
  background: $specColor;
}

.uni-checkbox-input.uni-checkbox-input-checked {
  border: none !important;
}

/* #endif */
/* 微信中样式 */
/* #ifdef APP-PLUS ||MP-WEIXIN */
checkbox .wx-checkbox-input {
  border-radius: 50% !important;
  color: #ffffff !important;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  color: #fff;
  background: $specColor;
}

.wx-checkbox-input.wx-checkbox-input-checked {
  border: none !important;
}

/* #endif */
</style>
