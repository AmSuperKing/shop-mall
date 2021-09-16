<template>
	<view class="container">
		<!-- 滚动区域 -->
		<view class="scroll-panel" id="scroll-panel">
			<view class="list-box">
				<view class="left">
					<scroll-view scroll-y="true" 
					:style="{ 'height':scrollHeight }"
					:scroll-into-view="leftIntoView"
					:scroll-with-animation="true"
					>
						<view class="item" 
							v-for="(item, index) in classifyList"
							:key="index" 
							:class="{ 'active':index == leftIndex }" 
							:id="'left-'+index"
							:data-index="index"
							@tap="leftTap"
						>{{item.mainTypeName}}</view>
			    </scroll-view>
			</view>
			<view class="main">
				<swiper class="swiper"
				:style="{ 'height':scrollHeight }" 
				:current="leftIndex"
            	@change="swiperChange"
				vertical="true"
            	duration="300">
					<swiper-item v-for="(item,index) of classifyList" :key="index">
							<scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }">
								<view class="item">
									<view class="title">
										<view>{{item.mainTypeName}}</view>
									</view>
								<uni-row
								class="goods"
								v-for="(item2,index2) of item.subMainType"
								:key="index2"
								@click.native="toSearch"
								>
									<uni-col :span="10">
										<view class="img-box">
										<image :src="item2.subMainTypeImg" mode=""></image>
										</view>
									</uni-col>
									<uni-col :span="14">
										<view>
										<view>{{item2.subMainTypeName}}</view>
										</view>
									</uni-col>
								</uni-row>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { classifyApi } from '@/api/classifyApi'

export default {
  data() {
    return {
      scrollHeight: '500px',
      leftIndex: 0,
      classifyList: [],
      switchItem: {}
    }
  },
  computed: {
    // 计算左侧滚动位置定位
    leftIntoView() {
      return `left-${this.leftIndex > 5 ? (this.leftIndex-5) : 0}`
    }
  },
  mounted() {
    // 等待DOM挂载完成
    this.$nextTick(() => {
      // 在非H5平台，nextTick回调后有概率获取到错误的元素高度，则添加200ms的延迟来减少BUG的产生
      setTimeout(() => {
        // 等待滚动区域初始化完成
        this.initScrollView().then(() => {
          // 获取列表数据，代码从此处开始
          this.getListData()
        })
      }, 200)
    })
  },
  methods: {
    /* 初始化滚动区域 */
    initScrollView() {
      return new Promise((resolve, reject) => {
        let view = uni.createSelectorQuery().select('#scroll-panel')
        view.boundingClientRect(res => {
          this.scrollHeight = `${res.height}px`
          this.$nextTick(() => {
            resolve()
          })
        }).exec()
      })
    },
    /* 获取列表数据 */
    getListData() {
      uni.showLoading({
        title: '数据加载中'
      })
      classifyApi
        .getClassify().then(res => {
          if (res && res.data) {
            this.classifyList = res.data
            this.switchToMenu()
          }
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          uni.hideLoading()
        })
    },
    switchToMenu() {
      if (this.switchItem && this.classifyList && this.classifyList.length) {
        let index = this.classifyList.findIndex(val => val.mainTypeId === this.switchItem.mainTypeId)
        if (index !== -1) {
          this.leftIndex = index
        }
      }
    },
    // 左侧导航点击
    leftTap(e) {
      let index = e.currentTarget.dataset.index
      this.leftIndex = Number(index)
    },
    // 轮播图切换
    swiperChange(e) {
      let index = e.detail.current
      this.leftIndex = Number(index)
    },
    toSearch() {
      this.$Router.push('/pages/search/result')
    }
  }
}
</script>

<style lang="scss" scoped>
page, .container {
	height: 100vh;
}
/* 容器 */
.container{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
  margin-top: 60px;
	
	&>view {
		width: 100%;
	}
	
	.scroll-panel {
		flex-grow: 1;
		height: 0;
		overflow: hidden;
	}
	
	.bottom-panel {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);		
	}
}
	
.list-box{
	display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
	font-size: 14px;
	
	.left{
		width: 100px;
		background-color: #f6f6f6;
		line-height: 40px;
		box-sizing: border-box;
		font-size: 15px;
		
		.item{
			padding-left: 5px;
			position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active,&:active{
				color: #fff;
				background-color: #42b983;
			}
		}
	}
	.main{
		background-color: #fff;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		.swiper{
			height: 500px;
		}

		.title{
			line-height: 32px;
      padding-left: 10px;
			font-size: 14px;
			font-weight: bold;
			color: #666;
			background-color: #f5f5f5;
			position: sticky;
			top: 0;
			z-index: 999;
		}
		
		.item{
			padding-bottom: 10rpx;
		}
		
		.goods{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			align-content: center;
			margin-bottom: 5px;
      padding: 3px;
      border-bottom: 1px solid #eee;
			
      .img-box {
        text-align: center;
      }
      
			& image{
				width: 80px;
				height: 80px;
				margin: 0 auto;
        border: 1px solid #42b983;
			}
			
			.describe{
				font-size: 14px;
				color: #999;
			}
			
			.money{
				font-size: 14px;
				color: #efba21;
			}
		}
	}
}
</style>
