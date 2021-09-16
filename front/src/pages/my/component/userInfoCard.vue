<template>
  <view class="card-content">
    <!-- 用户信息卡片 -->
    <view class="user-info-card" @click="toDetail">
      <uni-row class="demo-uni-row flex-box" :width="nvueWidth">
      	<uni-col :span="6" class="flex-box">
      		<image class="avatar-logo" src="@/static/logo_handp.png" mode="aspectFit"></image>
      	</uni-col>
      	<uni-col :span="14" class="info-text">
      		<view class="user-name">{{userInfo.usernameCn || '用户登录'}}</view>
          <view class="role-and-phone">
            <view class="user-role">
              <uni-icons type="person-filled" color="#fff" size="15"></uni-icons>
              角色
            </view>
            <view class="user-phone">tel:{{userInfo.phone || '-'}}</view>
          </view>
      	</uni-col>
      	<uni-col :span="4">
      		<view class="right-icon flex-box">
            <uni-icons type="arrowright" color="#666" size="25"/>
          </view>
      	</uni-col>
      </uni-row>
    </view>
    <!-- 名片栏 -->
    <view class="business-info-card">
    	<nut-row class="info-content" flexWrap="wrap">
        <nut-col :span="7" class="info-item col-flex-box">
          <view class="contact-title">联系人</view>
          <view class="contact-text">
            {{userInfo.department || '部门'}} : {{userInfo.username || '姓名'}}
          </view>
        </nut-col>
        <nut-col :span="7" class="info-item col-flex-box">
          <view class="contact-title">登录名</view>
          <view class="contact-text">{{userInfo.username || '-'}}</view>
        </nut-col>
        <nut-col :span="10" class="info-item col-flex-box">
          <view class="contact-title">邮箱</view>
          <view class="contact-text">{{userInfo.email || '-'}}</view>
        </nut-col>
    	</nut-row>
    </view>
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfoCard',
  data() {
    return {
      nvueWidth: 730
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    getDetail() {
      const hasToken = getToken()
      if (hasToken) {
        try {
          // get user info
          this.$store.dispatch('self/getInfo')
        } catch (error) {
          // remove token and go to login page to re-login
          this.$store.dispatch('self/resetToken')
          this.$toast.text(error || 'Has Error')
        }
      }
    },
    toDetail() {
      this.$Router.push('/pages/my/component/myDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

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
.user-info-card {
  min-height: 80px;
  margin-top: 50px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px 0 #e5e5e5;
}
.avatar-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid $theme-color;
  box-shadow: 0 6px 8px 0 $theme-color-alpha3;
}
.info-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .user-name {
    margin: 10px 0;
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .role-and-phone {
    .user-role {
      display: inline-block;
      padding: 0 6px;
      margin-right: 10px;
      font-size: 13px;
      color: #fff;
      text-align: center;
      font-weight: bold;
      border-radius: 15px;
      background-color: #4c4d4d;
    }
    .user-phone {
      display: inline-block;
      font-size: 15px;
      color: #444;
    }
  }
}
.right-icon {
  min-height: 80px;
}
.business-info-card {
  min-height: 90px;
  margin-top: -10px;
  .info-content {
    width: 95%;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 1px #000;
    background-color: $theme-color;
    .info-item {
      min-height: 80px;
      .contact-title {
        font-size: 15px;
        margin-bottom: 15px;
      }
      .contact-text {
        font-size: 12px;
      }
    }
    
  }
}
</style>
