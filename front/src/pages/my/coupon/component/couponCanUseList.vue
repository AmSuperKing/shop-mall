<template>
  <view class="list-wrapper">
    <view class="top-menu">
      <text class="top-menu-info">全部共{{count}}张优惠券</text>
      <text
        v-show="!showComplete"
        class="top-menu-btn"
        @click="handleProduct"
      >编辑</text>
      <text
        v-show="showComplete"
        class="top-menu-btn green-text"
        @click="handleProduct"
      >完成</text>
    </view>
    
    <view class="have-enquiry-list" v-if="!emptyList">
      <view class="uni-list" v-for="item of items" :key="item.num">
        <checkbox-group @change="checkboxChange($event, item.num)">
          <view class="list-item-box flex-box">
            <view class="check-btn" v-show="showComplete">
              <checkbox
                color="#f5222f"
                style="transform:scale(0.8)"
                :value="item.num"
                :checked="item.isChecked"
                @change="checkCurrItem"
              />
            </view>
            <view class="list-item-info" @click="gotoDetail">
              <view class="item-info-img-box">
                <image src="../../../../static/myicons/coupon.png" class="item-info-img"></image>
              </view>
              <view class="item-info-text">
                <view class="item-info-desc">
                  <view class="desc-text">{{item.name}}</view>
                </view>
                <view class="item-info-num">优惠券编码号：{{item.num}}</view>
                <view class="item-info-num">额度：
                  <nut-price  
                    :price="item.price" 
                    :decimalDigits="2" 
                    :needSymbol="true" 
                    :thousands="true"
                    style="color:red;"
                  />
                </view>
              </view>
            </view>
          </view>
        </checkbox-group>
      </view>
      <view v-show="showComplete" class="bottom-menu">
        <view class="check-all flex-box">
          <checkbox-group @change="checkboxChangeAll">
            <checkbox
              color="#f5222f"
              style="transform:scale(0.8)"
              :checked="isAllChecked"
            />
            <view>全选</view>
          </checkbox-group>
        </view>
        <view class="info-and-btn flex-box">
          <view class="totalNum">
            已选{{totalNum}}张优惠券
          </view>
          <view class="submitDelete">
            <nut-button
              type="light"
              class="del-btn"
              @click="submitDelete"
            >
              丢弃优惠券
            </nut-button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 无询价商品时显示 -->
    <view class="empty-enquiry-list" v-if="emptyList">
      <image src="../../../../static/imgs/empty-car.png" class="empty-img"></image>
      <view class="empty-tips">询价篮暂无优惠券，去浏览参与活动看看吧</view>
      <nut-button shape="circle" class="go-browse-btn" @click="goToHome">去浏览</nut-button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'EnquiryProductList',
  data() {
    return {
      count: 0,
      showComplete: false,
      emptyList: false,
      items: [{
        name: '激光测距仪最大测距80M 激光测距仪最大测距80M 激光测距仪最大测距80M 激光测距仪最大测距80M ',
        norms: '最大测距80M',
        num: '1587010400031',
        price: 15213.122
      }, {
        name: '可使用的优惠券',
        norms: '最大测距80M',
        num: '1587010400032'
      }, {
        name: '激光测距仪最大测距80M 3',
        norms: '最大测距80M',
        num: '1587010400033'
      }, {
        name: '激光测距仪最大测距80M 4',
        norms: '最大测距80M',
        num: '1587010400034'
      }, {
        name: '激光测距仪最大测距80M 5',
        norms: '最大测距80M',
        num: '1587010400035'
      }, {
        name: '激光测距仪最大测距80M 6',
        norms: '最大测距80M',
        num: '1587010400036'
      }],
      isAllChecked: false,
      totalNum: 0
    }
  },
  mounted() {
    this.initStatus()
  },
  methods: {
    handleProduct() {
      this.showComplete = !this.showComplete
    },
    initStatus() {
      this.items.forEach(val => val.isChecked = false)
      this.count = this.items.length
    },
    // 全选
    checkboxChangeAll(e) {
      this.isAllChecked = !this.isAllChecked
      this.items.forEach(val => {
        val.isChecked = this.isAllChecked
        val.checked = this.isAllChecked
      })
      if(this.isAllChecked === true) {
        this.totalNum = this.items.length
      } else {
        this.totalNum = 0
      }
    },
    // 选择每一项
    checkboxChange(e, num) {
      let items = this.items
      let nums = e.detail.value
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i]
        if(nums.includes(item.num)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
      }
      let temp = []
      // 找到被修改的商品对象
      let index = this.items.findIndex(val => val.num === num)
      // 选中状态取反
      this.items[index].isChecked = !this.items[index].isChecked
      if (this.items[index].isChecked === true) {
        this.totalNum += 1
      } else {
        if(this.totalNum !== 0) {
          this.totalNum -= 1
        }
      }
      temp = this.items.every(val => val.isChecked)
      if (temp) {
        this.isAllChecked = true
      } else {
        this.isAllChecked = false
      }
    },
    submitDelete() {
      let _this = this
      let items = this.items
      let checkedArr = []
      items.forEach((val) => {
        if (val.isChecked) {
          checkedArr.push(val)
        }
      })
      if (checkedArr.length) {
        this.$dialog({
          title: "确定删除选择的询价商品？",
          content: "删除后将无法找回相关记录",
          closeOnPopstate: true,
          closeBtn: false,  //显式右上角关闭按钮
          onOkBtn(event) {  //确定按钮点击事件
            for (let i = 0; i < checkedArr.length; i++) {
              let index = _this.items.findIndex(val => val.num === checkedArr[i].num)
              _this.items.splice(index, 1)
            }
            _this.count = _this.items.length
            if (_this.items.length === 0) {
              _this.isAllChecked = !_this.isAllChecked
              _this.emptyList = true
              _this.showComplete = !_this.showComplete
            }
            if (_this.totalNum > 0) {
              _this.totalNum -= checkedArr.length
            }
            this.close() //关闭对话框
          },
          onCancelBtn(event) {  //取消按钮点击事件，默认行为关闭对话框
            this.close()
          }
        })
      } else {
        this.$toast.text('请先选择要操作的商品数据')
      }
      
    },
    goToHome() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    gotoDetail(){
      // console.log('调用去详情页面')
      uni.navigateTo({
        url: '/pages/productDetail/detail'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  background-color: #f5f5f5;
  .top-menu {
    height: 40px;
    margin-top: 0px;
    padding: 8rpx 0;
    font-size: 15px;
    color: #666;
    .top-menu-info {
      display: inline-block;
      padding-left: 40rpx;
      line-height: 40px;
    }
    .top-menu-btn {
      display: block;
      width: 100rpx;
      line-height: 40px;
      float: right;
    }
  }
  .have-enquiry-list {
    min-height: 50vh;
    border-radius: 20rpx;
    background-color: #fff;
  }
  .empty-enquiry-list {
    width: 100%;
    padding-bottom: 30rpx;
    text-align: center;
    background-color: #fff;
    .empty-img {
      width: 500rpx;
      height: 500rpx;
    }
    .empty-tips {
      font-size: 28rpx;
      color: #666;
    }
    .go-browse-btn {
      width: 500rpx;
      margin-top: 30rpx;
    }
  }
}
.list-item-box {
  height: 250rpx;
  display: flex;
  .check-btn {
    flex: 1;
    text-align: center;
  }
  .list-item-info {
    flex: 4;
    display: flex;
    .item-info-img-box {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .item-info-img {
        width: 160rpx;
        height: 160rpx;
      }
    }
    .item-info-text {
      flex: 3;
      box-sizing: border-box;
      border-bottom: 2rpx solid #eee;
      .item-info-desc {
        margin: 8rpx;
        font-size: 15px;
        color: #333;
        .desc-text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .item-info-norms, .item-info-num{
        margin: 0 8rpx 8rpx;
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}

.bottom-menu {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 55px;
  padding-bottom: 5px;
  position: fixed;
  bottom: 0px;
  z-index: 150;
  background-color: #fff;
  .check-all {
    flex: 1;
    font-size: 12px;
    color: #666;
  }
  .info-and-btn {
    display: flex;
    flex: 4;
    align-items: center;
    .totalNum {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #666;
      // margin-top: 10px
    }
    .submitDelete {
      flex: 1;
      text-align: center;
      .del-btn {
        width: 80%;
        padding-left: 10%;
        padding-right: 10%;
        color: #fff;
        background-color: #f5222f;
        white-space:nowrap;
        border-radius: 30rpx;
      }
    }
  }
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.green-text {
  color: #14aa79;
}
</style>
