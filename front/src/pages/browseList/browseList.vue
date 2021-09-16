<template>
  <view class="list-content">
    <!-- 操作菜单栏 -->
    <view class="top-menus">
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
    <!-- 内容列表 -->
    <view v-if="!emptyList" class="content-list">
      <nut-leftslip class="list-item" v-for="(item, index) of browseList" :key="index">
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
                    <view class="item-info-norms">商品号：{{item.num}}</view>
                    <view class="item-info-price">¥{{item.price}}</view>
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
            已选{{totalNum}}条记录
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
    <view v-if="emptyList" class="empty-list" >
      <image src="../../static/imgs/empty.png" class="empty-img"></image>
      <view class="empty-tips">暂无浏览记录，去其他地方逛逛吧！</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'BrowseList',
  data() {
    return {
      editState: false,
      showComplete: false,
      isAllChecked: false,
      count: 0,
      totalNum: 0,
      emptyList: false,
      browseList: [{
        title: '1锌铝合金拔叉执手CZH30静电粉末喷涂传动机构用执手',
        num: 'CP2022108160816721',
        price: 998.68,
        imgUrl: 'https://img-8memttkzse2ptmwsin60wg.jumitop.cn/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202102/20210222142832154193.jpg?imageView2/2/q/75'
      }, {
        title: '2锌铝合金拔叉执手CZH30静电粉末喷涂传动机构用执手',
        num: 'CP2022108160816721',
        price: 998.68,
        desc: '静电粉末喷涂传动机构用执手',
        imgUrl: 'https://img-8memttkzse2ptmwsin60wg.jumitop.cn/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202102/20210222142832154193.jpg?imageView2/2/q/75'
      }, {
        title: '3锌铝合金拔叉执手CZH30静电粉末喷涂传动机构用执手',
        num: 'CP2022108160816721',
        price: 998.68,
        desc: '静电粉末喷涂传动机构用执手',
        imgUrl: 'https://img-8memttkzse2ptmwsin60wg.jumitop.cn/UpLoad/8mEmTtkzsE2pTMwSIn60Wg--/Images/202102/20210222142832154193.jpg?imageView2/2/q/75'
      }]
    }
  },
  mounted() {
    this.initStatus()
  },
  methods: {
    initStatus() {
      this.browseList.forEach(val => val.isChecked = false)
      this.count = this.browseList.length
    },
    handleEdit() {
      this.showComplete = !this.showComplete
    },
    // 选择每一项
    checkboxChange(e, title) {
      let browseList = this.browseList
      let titles = e.detail.value
      for (let i = 0, lenI = browseList.length; i < lenI; ++i) {
        const item = browseList[i]
        if(titles.includes(item.num)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
      }
      let temp = []
      // 找到被修改的商品对象
      let index = this.browseList.findIndex(val => val.title === title)
      // 选中状态取反
      this.browseList[index].isChecked = !this.browseList[index].isChecked
      if (this.browseList[index].isChecked === true) {
        this.totalNum += 1
      } else {
        if(this.totalNum !== 0) {
          this.totalNum -= 1
        }
      }
      temp = this.browseList.every(val => val.isChecked)
      if (temp) {
        this.isAllChecked = true
      } else {
        this.isAllChecked = false
      }
    },
    // 全选
    checkboxChangeAll(e) {
      this.isAllChecked = !this.isAllChecked
      this.browseList.forEach(val => {
        val.isChecked = this.isAllChecked
        val.checked = this.isAllChecked
      })
      if(this.isAllChecked === true) {
        this.totalNum = this.browseList.length
      } else {
        this.totalNum = 0
      }
    },
    submitDelete() {
      let _this = this
      let items = this.browseList
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
              let index = _this.browseList.findIndex(val => val.num === checkedArr[i].num)
              _this.browseList.splice(index, 1)
            }
            _this.count = _this.browseList.length
            if (_this.browseList.length === 0) {
              _this.isAllChecked = !_this.isAllChecked
              _this.emptyList = true
              _this.showComplete = !_this.showComplete
            }
            if (_this.totalNum > 0) {
              _this.totalNum -= checkedArr.length
            }
            _this.initStatus()
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
    top: 55px;
    left: 0;
    right: 0;
    z-index: 99;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-bottom: 2px solid #eee;
    background-color: #f5f5f5;
    .edit-box {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      float: right;
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
  min-height: 100px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
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
        width: 90px;
        height: 90px;
        box-shadow: 0 3px 4px rgba(0, 0, 0, .1);
      }
    }
    .item-info-text {
      flex: 3;
      padding-left: 12px;
      .item-info-desc {
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-info-norms {
        margin: 8px 0;
        font-size: 13px;
        color: #999;
      }
      .item-info-price {
        margin-bottom: 8px;
        font-size: 14px;
        color: #f5222f;
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
        border-radius: 10px;
        background-color: #f5222f;
      }
    }
  }
}
.empty-list {
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
