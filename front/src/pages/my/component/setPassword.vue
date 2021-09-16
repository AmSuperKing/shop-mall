<template>
	<view class="wrapper">
		<!-- 顶部标题 -->
		<view class="detail-title">
			<image
        class="detail-back"
        src="../../../static/myicons/left.png"
        @click="back"
      ></image>
			<span class="info">
        <text class="detail-title-text">设置密码</text>
      </span>
		</view>
		<!-- 输入旧密码 -->
		<view class="box">
			<view class="box-case">
				<image class="inputPasswordImg"
          src="../../../static/myicons/password.png"
        ></image>
				<input
          class="input-Message"
          type="text"
          placeholder="请输入旧密码"
          placeholder-style	="text-align: left;font-size: 13px;"
          v-model="info.passwordA"
          :password="!meetA"
        />
				<image
          v-show="!meetA"
          class="inputPasswordImg"
          src="../../../static/myicons/unsee.png"
          @click="seeA"
        ></image>
				<image
          v-show="meetA"
          class="inputPasswordImg"
          src="../../../static/myicons/see.png"
          @click="seeA"
        ></image>
			</view>
		</view>
		<!-- 输入新密码 -->
		<view class="box">
			<view class="box-case">
				<image
          class="inputPasswordImg"
          src="../../../static/myicons/password.png"
        ></image>
				<input
          class="input-Message"
          type="text"
          placeholder="请输入6-12位新密码"
          placeholder-style="text-align: left;font-size: 13px;"
          v-model="info.passwordB"
          :password="!meetB"
        />
				<image
          v-show="!meetB"
          class="inputPasswordImg"
          src="../../../static/myicons/unsee.png"
          @click="seeB"
        ></image>
				<image
          v-show="meetB"
          class="inputPasswordImg"
          src="../../../static/myicons/see.png"
          @click="seeB"
        ></image>
			</view>
		</view>
		<!-- 再次输入新密码 -->
		<view class="box">
			<view class="box-case">
				<image
          class="inputPasswordImg"
          src="../../../static/myicons/password.png"
        ></image>
				<input
          class="input-Message"
          type="text"
          placeholder="确认新密码"
          placeholder-style	="text-align: left;font-size: 13px;"
          v-model="info.passwordC"
          :password="!meetC"
        />
				<image
          v-show="!meetC"
          class="inputPasswordImg"
          src="../../../static/myicons/unsee.png"
          @click="seeC"
        ></image>
				<image
          v-show="meetC"
          class="inputPasswordImg"
          src="../../../static/myicons/see.png"
          @click="seeC"
        ></image>
			</view>
		</view>
		<!-- 确定按钮 -->
		<view class="button">
			<nut-button block shape="circle">确定</nut-button>
		</view>
	</view>
</template>

<script>
export default {
  name: 'SetPassword',
  data() {
    return {
      val: '',
      meetA: false,
      meetB: false,
      meetC: false,
      info: {},
      delta:0
    }
  },
  onLoad(option) { //option为object类型，会序列化上个页面传递的参数
  },
  methods: {
    seeB() {
      this.meetB=!this.meetB
    },
    seeC() {
      this.meetC=!this.meetC
    },
    back() {
      let currPages = getCurrentPages()
      if(currPages.length < 2){
        uni.switchTab({
          url:'/'
        })
      } else {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.wrapper {
  text-align: center;
  // 顶部框
  .detail-title {
    height: 55px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: $theme-color;
    .detail-back {
      width: 35px;
      height: 30px;
      color: #FFFFFF;
    }
    .info {
      padding-left: 20%;
      padding-right: 20%;
      width: 60%;
      display: flex;
      justify-content: center;
      text-align: center;
      .detail-title-text {
        color: #FFFFFF;
        font-size: 15px;
        padding-right: 30px;
      }
    }
  }
  // 旧密码
  .box {
    width: 80%;
    padding-top: 5%;
    padding-left: 10%;
    padding-right: 10%;
    .box-case {
      display: flex;
      white-space: inherit;
      border: none;
      border-bottom: 2rpx solid #eee;
      .inputPasswordImg {
        height: 27px;
        width: 30px;
        color: #eee;
      }
      .input-Message {
        width: 100%;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 10px;
      }
    }
  }
}
.box-img-one {
  text-align: right;
}
.box-img-two {
  text-align: left;
}
.button {
  width: 60%;
  padding-top: 10%;
  padding-left: 20%;
  padding-right: 20%;
}
</style>
