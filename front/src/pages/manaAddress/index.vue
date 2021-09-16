<template>
  <view class="wrapper">
    <header-nav
      ref="headerNav"
      title="地址管理"
      backUrl="/pages/my/my"
    ></header-nav>
    <!-- 地址列表 -->
    <view class="addr-list">
      <uni-row
        class="item flex-box"
        v-for="(item, index) in addrList"
        :key="index"
      >
        <uni-col class="addr-info" :span="20">
          <view class="user-info">
            <text class="user-name">{{item.name}}</text>
            <text class="user-phone">{{item.phone}}</text>
            <text v-if="item.defaultTag" class="default-tag">默认</text>
          </view>
          <view class="addr-text">{{item.region}}{{item.detail}}</view>
        </uni-col>
        <uni-col class="edit" :span="4">
          <image
            src="../../static/icons/edit.png"
            class="edit-icon"
            @click="editAddr(item)"
          ></image>
        </uni-col>
      </uni-row>
    </view>
    <!-- 新增按钮 -->
    <view class="add-addr">
      <button type="warn" class="add-btn" @click="addNewAddr">新增地址</button>
    </view>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'

export default {
  name: 'ManaAddress',
  components: {
    HeaderNav
  },
  data() {
    return {
      addrList: [{
        name: '张三',
        phone: '13800138000',
        region: '广东省佛山市三水区',
        detail: '云东海街道永业路1号',
        defaultTag: true
      }]
    }
  },
  activated() {
    // console.log('activated')
  },
  deactivated() {
    // console.log('deactivated')
  },
  methods: {
    editAddr(addr) {
      uni.$emit('currAddr', {addrData: addr})
      this.$Router.push('/pages/manaAddress/edit')
      // uni.navigateTo({
      //   url: '/pages/manaAddress/edit',
      //   success: (res) => {
      //     res.eventChannel.emit('currAddr', {addrData: addr})
      //   }
      // })
    },
    addNewAddr() {
      uni.navigateTo({
        url: '/pages/manaAddress/add'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

page {
  background-color: #f5f5f5;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addr-list {
  margin-top: 55px;
  .item {
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 15px;
    background-color: #fff;
    .addr-info {
      .user-info {
        margin-bottom: 15px;
        .user-name {
          font-size: 15px;
          color: #333;
        }
        .user-phone {
          margin-left: 15px;
          font-size: 15px;
          color: #333;
          font-weight: bold;
          font-family: 'Times New Roman', Times, serif;
        }
        .default-tag {
          margin-left: 15px;
          padding: 1px 5px;
          font-size: 12px;
          color: #fff;
          border-radius: 5px;
          background-color: $theme-color;
        }
      }
      .addr-text {
        font-size: 14px;
        color: #999;
      }
    }
    .edit {
      text-align: center;
      .edit-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.add-addr {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  background-color: transparent;
  .add-btn {
    width: 80%;
  }
}
</style>
