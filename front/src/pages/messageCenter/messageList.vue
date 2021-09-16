<template>
  <view class="list-content">
    <!-- 操作菜单栏 -->
    <view class="top-menus">
    	<view class="segmented-box">
    	  <uni-segmented-control
    	    :current="typeCurrent"
    	    :values="typeItems"
    	    :style-type="textType"
    	    :active-color="styles.subThemeColor"
    	    @clickItem="onClickTypeItem"
    	  />
    	</view>
      <view class="edit-box">
        <view
          v-show="!showComplete"
          class="edit-text"
          @click="handleEdit"
        >
          编辑
        </view>
        <view
          v-show="showComplete"
          class="finish-text"
          @click="handleEdit"
        >
          完成
        </view>
      </view>
    </view>
    <!-- 消息内容列表 -->
    <view v-if="!emptyList" class="content-list">
      <nut-leftslip class="list-item" v-for="(item, index) of messageArr" :key="index">
        <div slot="slip-main" class="slip-main">
          <view class="uni-list">
            <checkbox-group @change="checkboxChange($event, item.title)">
              <view class="list-item-box flex-box">
                <view class="check-btn" v-show="showComplete">
                  <checkbox
                    style="transform:scale(0.8)"
                    :value="item.title"
                    :checked="item.isChecked"
                    @change="checkCurrItem"
                  />
                </view>
                <view class="list-item-info">
                  <view class="item-info-img-box">
                    <image :src="item.imgUrl" class="item-info-img"></image>
                  </view>
                  <view class="item-info-text">
                    <view class="item-info-desc">{{item.title}}</view>
                    <view class="item-info-norms">{{item.desc}}</view>
                  </view>
                </view>
              </view>
            </checkbox-group>
          </view>
        </div>
        <div slot="slipbtns" class="slipbtns">
          <text class="del-btn">删除</text>
        </div>
      </nut-leftslip>

      <view class="bottom-menu flex-box" v-show="showComplete">
        <view class="check-all">
          <checkbox-group @change="checkboxChangeAll">
            <checkbox style="transform:scale(0.8)" :checked="isAllChecked" />
            <view class="">全选</view>
          </checkbox-group>
        </view>
        <view class="right-box flex-box">
          <view class="total-num flex-box">
            已选{{totalNum}}条消息
          </view>
          <view class="submit-delete flex-box">
            <nut-button
              type="light"
              class="del-btn"
              @click="submitDelete"
            >删除</nut-button>
          </view>
        </view>
      </view>
    </view>
    <!-- 无询价商品时显示 -->
    <view v-if="emptyList" class="empty-message-list" >
      <image src="../../static/imgs/empty-msg.png" class="empty-img"></image>
      <view class="empty-tips">暂无消息通知，去其他地方逛逛吧！</view>
    </view>
  </view>
</template>

<script>
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'MessageList',
  data() {
    return {
      typeCurrent: 0,
      typeItems: ['未读', '已读'],
      textType: 'text',
      // activeColor: '#14aa79',
      editState: false,
      showComplete: false,
      isAllChecked: false,
      count: 0,
      totalNum: 0,
      emptyList: false,
      messageArr: [{
        title: '1.合和精品推荐 | 全新一代高承重免铣槽平开滑撑JHKC12B',
        desc: '高效快装，加倍耐用',
        imgUrl: 'https://img.jumiweb.com/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202107/20210717164716501401.jpg'
      }, {
        title: '2.合和精品推荐 | 全新一代高承重免铣槽平开滑撑JHKC12B',
        desc: '高效快装，加倍耐用',
        imgUrl: 'https://img.jumiweb.com/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202107/20210717164716501401.jpg'
      }, {
        title: '3.合和精品推荐 | 全新一代高承重免铣槽平开滑撑JHKC12B',
        desc: '高效快装，加倍耐用',
        imgUrl: 'https://img.jumiweb.com/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202107/20210717164716501401.jpg'
      }]
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  mounted() {
    this.initStatus()
  },
  methods: {
    initStatus() {
      this.messageArr.forEach(val => val.isChecked = false)
      this.count = this.messageArr.length
    },
    onClickTypeItem() {

    },
    handleEdit() {
      this.showComplete = !this.showComplete
    },
    // 选择每一项
    checkboxChange(e, title) {
      let messageArr = this.messageArr
      let titles = e.detail.value
      for (let i = 0, lenI = messageArr.length; i < lenI; ++i) {
        const item = messageArr[i]
        if(titles.includes(item.num)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
      }
      let temp = []
      // 找到被修改的商品对象
      let index = this.messageArr.findIndex(val => val.title === title)
      // 选中状态取反
      this.messageArr[index].isChecked = !this.messageArr[index].isChecked
      if (this.messageArr[index].isChecked === true) {
        this.totalNum += 1
      } else {
        if(this.totalNum !== 0) {
          this.totalNum -= 1
        }
      }
      temp = this.messageArr.every(val => val.isChecked)
      if (temp) {
        this.isAllChecked = true
      } else {
        this.isAllChecked = false
      }
    },
    // 全选
    checkboxChangeAll(e) {
      this.isAllChecked = !this.isAllChecked
      this.messageArr.forEach(val => {
        val.isChecked = this.isAllChecked
        val.checked = this.isAllChecked
      })
      if(this.isAllChecked === true) {
        this.totalNum = this.messageArr.length
      } else {
        this.totalNum = 0
      }
    },
    submitDelete() {
      let _this = this
      let items = this.messageArr
      let checkedArr = []
      items.forEach((val) => {
        if (val.isChecked) {
          checkedArr.push(val)
        }
      })
      if (checkedArr.length) {
        this.$dialog({
          title: "确定删除？",
          content: "",
          closeOnPopstate: true,
          closeBtn: false,  //显式右上角关闭按钮
          onOkBtn(event) {  //确定按钮点击事件
            for (let i = 0; i < checkedArr.length; i++) {
              let index = _this.messageArr.findIndex(val => val.num === checkedArr[i].num)
              _this.messageArr.splice(index, 1)
            }
            _this.count = _this.messageArr.length
            if (_this.messageArr.length === 0) {
              _this.isAllChecked = !_this.isAllChecked
              _this.emptyList = true
              _this.showComplete = !_this.showComplete
            }
            if (_this.totalNum > 0) {
              _this.totalNum -= checkedArr.length
            }
            // console.log('this.items', _this.items)
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
  }
}
</script>

<style lang="scss" scoped>
.list-content {
  width: 100%;
  background-color: #f5f5f5;
  .top-menus {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 2px solid #eee;
    background-color: #fff;
    .segmented-box {
      flex: 2;
      font-size: 15px;
      color: #666;
    }
    .edit-box {
      flex: 4;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 15px;
      .edit-text {
        color: #666;
      }
      .finish-text {
        color: #fc4545;
      }
    }
  }
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-list {
  width: 100%;
  margin-top: 100px;
}
.list-item {
  .slip-main {
    flex-direction: column;
    padding: 0 10px;
  }
}
.del-btn {
  height: 100%;
  width: 45px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 15px;
  text-align: center;
  color: #fff;
  background-color: #fc4545;
}
.list-item-box {
  width: 100%;
  height: 200rpx;
  border-bottom: 2rpx solid #eee;
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
      padding-left: 24rpx;
      .item-info-desc {
        margin: 8rpx;
        font-size: 30rpx;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-info-norms {
        margin: 0 8rpx 8rpx;
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
.bottom-menu {
  z-index: 150;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  padding: 0 10px;
  background-color: #fff;
  .check-all {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #666;
  }
  .right-box {
    flex: 4;
    display: flex;
    .total-num {
      flex: 1;
      font-size: 14px;
      color: #666;
    }
    .submit-delete {
      flex: 1;
      .del-btn {
        width: 70%;
        color: #fff;
        border-radius: 30rpx;
        background-color: #f5222f;
      }
    }
  }
}
.empty-message-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 10px;
  .empty-img {
    width: 200px;
    height: 200px;
  }
  .empty-tips {
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
