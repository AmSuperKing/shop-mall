<template>
  <view class="tools-list">
    <view class="tool">
    	<view class="tool-title">我的工具</view>
    	<view class="tool-list flex-box">
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="goToMyCollection">
    				<image class="tool-item-icon" src="@/static/myicons/Collection.png"></image>
    				<text class="tool-item-text">我的收藏</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="goToMess">
    				<image class="tool-item-icon" src="@/static/myicons/message.png"></image>
    				<text class="tool-item-text">消息中心</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="toBrowseList">
    				<image class="tool-item-icon" src="@/static/myicons/footprint.png"></image>
    				<text class="tool-item-text">我的足迹</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="coupon">
    				<image class="tool-item-icon" src="@/static/myicons/preferential.png"></image>
    				<text class="tool-item-text">优惠券</text>
    			</view>
    		</span>
    	</view>
    	<view class="tool-list flex-box">
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="toManaAddress">
    				<image class="tool-item-icon" src="@/static/myicons/address.png"></image>
    				<text class="tool-item-text">地址管理</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box">
    				<image class="tool-item-icon" src="@/static/myicons/scanning.png"></image>
    				<text class="tool-item-text">名片扫描</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="invoicingRequisition">
    				<image class="tool-item-icon" src="@/static/myicons/invoice.png"></image>
    				<text class="tool-item-text">开票资料</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box">
    				<image class="tool-item-icon" src="@/static/myicons/Printing.png"></image>
    				<text class="tool-item-text">申请开票</text>
    			</view>
    		</span>
    	</view>
    	<view class="tool-list flex-box">
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box">
    				<image class="tool-item-icon" src="@/static/myicons/member.png"></image>
    				<text class="tool-item-text">会员权益</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="toHelpCenter">
    				<image class="tool-item-icon" src="@/static/myicons/help.png"></image>
    				<text class="tool-item-text">帮助中心</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="toSetting">
    				<image class="tool-item-icon" src="@/static/myicons/setting.png"></image>
    				<text class="tool-item-text">设置中心</text>
    			</view>
    		</span>
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="showService">
    				<image class="tool-item-icon" src="@/static/myicons/attendant.png"></image>
    				<text class="tool-item-text">在线客服</text>
    			</view>
    		</span>
    	</view>
    	<view class="tool-list flex-box">
    		<span class="tool-list-item">
    			<view class="tool-box col-flex-box" @click="focusPublicWechat">
    				<image class="tool-item-icon" src="@/static/myicons/public.png"></image>
    				<text class="tool-item-text">关注公众号</text>
    			</view>
    		</span>
    	</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ToolsList',
  data() {
    return {}
  },
  methods: {
	goToMyCollection(){
		uni.navigateTo({
			url: `/pages/my/myCollection/myCollection`
		})
	},
    goToMess() {
      uni.navigateTo({
        url: '/pages/messageCenter/messageCenter'
      })
    },
	coupon() {
      uni.navigateTo({
        url: '/pages/my/coupon/coupon'
      })
    },
    toBrowseList() {
      uni.navigateTo({
        url: '/pages/browseList/index'
      })
    },
    toManaAddress() {
      uni.navigateTo({
        url: '/pages/manaAddress/index'
      })
    },
    toHelpCenter() {
      uni.navigateTo({
        url: '/pages/help/index'
      })
    },
    toSetting() {
      uni.navigateTo({
        url: '/pages/my/component/myDetail'
      })
    },
	invoicingRequisition(){
		uni.navigateTo({
        url: '/pages/my/invoicingRequisitions/invoicingRequisition'
      })
	},
    showService() {
      this.$emit('showService')
    },
    focusPublicWechat() {
      // console.log('focusPublicWechat')
      this.$dialog({
        type:"image",
        link:"",
        imgSrc:"/static/imgs/wechat.jpg",
        lockBgScroll:true,
        customClass: "nut-dialog-image",
        onClickImageLink: () => {
          // console.log(this) // this指向该Dialog实例
          return false  // 返回false可阻止默认的链接跳转行为
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col-flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tool {
  width: 95%;
	margin: 15px auto;
  padding-top: 15px;
  border-radius: 10px;
	box-shadow: 0 4px 6px 0 #e5e5e5;
	background-color: #ffffff;
	.tool-title {
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #666;
	}
	.tool-list {
		padding: 25px 0 10px;
		.tool-list-item {
			display: inline-block;
			width: 24%;
			text-align: center;
      padding-bottom: 10rpx;
			.tool-box {
				width: 100%;
				height: 100%;
				.tool-item-icon {
					height: 40px;
					width: 40px;
					margin: 0 auto;
				}
				.tool-item-text {
					font-size: 12px;
					margin: 0 auto;
				}
				.tool-item-icon-no {
					color: #FFFFFF;
					height: 40px;
					width: 40px;
					margin: 0 auto;
				}
				.tool-item-text-no {
					color: #FFFFFF;
					font-size: 12px;
					margin: 0 auto;
				}
			}
		}
	}
}
.nut-dialog-image {
  width: 300px;
  height: 300px;
}
</style>
