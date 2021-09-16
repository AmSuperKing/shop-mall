<template>
  <view class="list-wrapper">
    <view class="shopCar-List-length">
      <text class="shopCar-text">全部共计{{count}}件</text>
      <text
        class="shopCar-handle-btn"
        v-if="!showComplete"
        @click="handleProduct"
      >编辑</text>
      <text
        class="shopCar-handle-btn green-text"
        v-if="showComplete"
        @click="handleProduct"
      >完成</text>
    </view>
    <view class="for-each" v-for="item of items" :key="item.name">
      <view class="item-title">
        <view class="checkBoxAllChoose flex-box">
          <checkbox
            class="checkbox"
            :color="styles.themeColor"
            style="transform:scale(0.8)" 
            :value="item.value"
            :checked="item.isChecked"
            @click="checkCurrItem(item)"
          />
        </view>
        <text class="checkTitleText">{{ item.shopItemTitle }}</text>
      </view>
      <view
        class="detail-card"
        v-for="shopItem of items[item.name].shopItems"
        :key="shopItem.shopid"
      >
        <view class="detail">
          <view class="checkbox-choose flex-box">
            <span>
              <checkbox
                value="cb"
                :checked="shopItem.isChecked"
                :color="styles.themeColor"
                style="transform:scale(0.8)"
                @click="checkChildItem(item, shopItem)"
              />
            </span>
          </view>
          <view class="detail-img flex-box" @click="toProductDetail">
            <view class="detail-big flex-box">
              <image class="detailone" :src="shopItem.src"></image>
            </view>
          </view>
          <view
            class="detail-text"
            :class="shopItem.shopid === items[item.name].shopItems.length-1 ? '' : 'forProduct'"
            @click="toProductDetail"
          >
            <view class="detail-text-big">
              <view class="detail-text-item-name">{{ shopItem.shopItemName }}</view>
              <button
                class="detail-button uni-button"
                @click="switchActionSheet"
              >{{ shopItem.norms }}</button>
              <view class="detail-text-second">
                <view class="info-txt">￥{{ shopItem.price }}</view>
                <view class="info-txt">最低批量：{{ shopItem.littleFrequency }}</view>
                <view class="info-txt">商品号:{{ shopItem.workOrderId }}</view>
              </view>
              <view class="inputNumber">
                <text class="inputNumberText"><span>数量:</span></text>
                <view class="num-box">
                  <view class="num-step-input">
                    <step-input-box
                      :min="1"
                      :max="100000"
                      v-model="shopItem.numberItem"
                      @change="numberChange($event, item, shopItem)"
                    />
                  </view>
                </view>
              </view>
              <view class="littleAllMoney">
                <text>小计：</text>
                <nut-price
                  class="littleAllMoney-pay"
                  :price="shopItem.allPrice"
                  :need-symbol="true"
                  :thousands="true"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="bottom-menu">
      <view class="check-all flex-box">
        <checkbox-group @change="checkboxChangeAll">
          <checkbox
            :color="styles.themeColor"
            style="transform:scale(0.8)"
            :checked="isAllChecked"
          />
          <view>全选</view>
        </checkbox-group>
      </view>
      <view class="totalNum">
        <nut-price
          class="littleAllMoney-pay"
          :price="allPrice"
          :need-symbol="true"
          :thousands="true"
        />
        已选{{totalNum}}件商品
      </view>
        
      <view class="btns-box">
        <nut-button
          v-if="showComplete"
          type="light"
          class="submit-delete flex-box"
          @click="submitDelete"
        >删除</nut-button>
        <nut-button
          v-if="!showComplete"
          type="light"
          class="submit-delete flex-box"
          @click="submitPay"
        >支付</nut-button>
      </view>
    </view>
    
    <view>
      <nut-actionsheet
        :is-visible="isVisible"
        @close="switchActionClose"
      >
        <div slot="custom" class="custom-wrap contacts">
          <span class="">{{ inputTitle }}</span>
          <view class="contacts-input">
            <input
              class="contacts-input-set"
              type="text"
              placeholder="请输入"
              v-model="inputMessage"
            />
          </view>
          <view class="contacts-buttons">
            <button
              type="default"
              class="contacts-buttona"
              @click="switchActionClose"
            >取消</button>
            <button
              type="primary"
              class="contacts-buttonb"
              @click="switchActionUpdate"
            >确定</button>
          </view>
        </div>
      </nut-actionsheet>
    </view>
  </view>
</template>

<script>
import StepInputBox from '@/components/stepInputBox/stepInputBox'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'ShopCarList',
  components: {
    StepInputBox
  },
  data() {
    return {
      count: 0,
      totalNum: 0,
      allPrice: 0,
      showComplete: false,
      isVisible: false,
      inputTitle: '',
      inputMessage: 'WSZ7110C 蓝色',
      isAllChecked: false,
      items:[
      	// 第一产品
      	{
      	  shopItemTitle:'商品大类1',
      	  value:'aaa',
      	  isAllChecked: false,
      	  name:0,
      	  isChecked:false,
      	  shopItems:[{
            shopid:0,
            src:'../../static/shopCar/shop1.jpg',
            shopItemName:'角阀 WSZ7110C 304 亚光 KG 角阀 WSZ7110C 304 亚光 KG',
            norms:'WSZ7110C 蓝色',
            price:29.24,
            littleFrequency:'1',
            workOrderId:'136301130030',
            isChecked:false,
            allPrice:29.24,
            numberItem:1
          }]
      	},
      	// 第二产品
      	{
      	  shopItemTitle:'商品大类2',
      	  value:'bbb',
      	  isAllChecked: false,
      	  name:1,
      	  isChecked:false,
      	  shopItems:[
            {
              shopid:0,
              src:'../../static/shopCar/shop3.jpg',
              shopItemName:'角阀 WSZ7110C 304 亚光 KG',
              norms:'WSZ7110C 蓝色',
              price:29.24,
              littleFrequency:'1',
              workOrderId:'136301130030',
              isChecked:false,
              allPrice:29.24,
              numberItem:1
            },
            // 第二子产品
            {
              shopid:1,
              src:'../../static/shopCar/shop3.jpg',
              shopItemName:'角阀 WSZ7110C 304 亚光 KG',
              norms:'WSZ7110C 蓝色',
              price:29.24,
              littleFrequency:'1',
              workOrderId:'136301130030',
              isChecked:false,
              allPrice:29.24,
              numberItem:1
            }
          ]
      	}
      ]
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
      this.items.forEach(val => {
        val.isChecked = false
        this.count=this.count+val.shopItems.length
      })
    },
    handleProduct() {
      this.showComplete = !this.showComplete
    },
    // 局部全选
    checkCurrItem(item) {
      this.items[item.name].isChecked = !this.items[item.name].isChecked
      // console.log('局部全选', this.items, this.items[item.name].isChecked)
      this.items[item.name].shopItems.forEach(product => {
        product.isChecked = this.items[item.name].isChecked
      })
      this.tryTotalNumber()
      this.trySaveAll()
      // console.log('局部全选',this.items)
      this.$forceUpdate()
    },
    // 全选
    checkboxChangeAll(e) {
      this.isAllChecked = !this.isAllChecked
      // console.log('全选', this.items, this.isAllChecked)
      this.items.forEach(val => {
        val.isChecked = this.isAllChecked
        val.checked = this.isAllChecked
        val.shopItems.forEach(shopItem => {
    	    shopItem.isChecked=this.isAllChecked
        })
      })
      // console.log('全选后', this.items, this.isAllChecked)
      if(this.isAllChecked === true) {
        this.totalNum = this.items.length
      } else {
        this.totalNum = 0
      }
      this.tryTotalNumber()
      this.$forceUpdate()
    },
    // 子产品选择
    checkChildItem(item,shopItem) {
      // console.log('子产品选择', this.items[item.name])
      this.items[item.name].shopItems[shopItem.shopid].isChecked = !this.items[item.name].shopItems[shopItem.shopid].isChecked
      if (this.items[item.name].shopItems.length === 1) {
        // console.log('子产品只有一种', this.items[item.name].isChecked)
        this.items[item.name].isChecked = this.items[item.name].shopItems[0].isChecked
      } else {
        for (let i = 0; i < this.items[item.name].shopItems.length; i++) {
          // console.log('进入到子产品进行循环', this.items[item.name].shopItems[i].isChecked)
          if (i+1 < this.items[item.name].shopItems.length) {
            if (this.items[item.name].shopItems[i].isChecked != this.items[item.name].shopItems[i+1].isChecked) {
              this.items[item.name].isChecked=false
              break
            }
          } else if (i+1 === this.items[item.name].shopItems.length) {
            // console.log('进入到大类是否确定赋值', this.items[item.name].isChecked)
            this.items[item.name].isChecked = this.items[item.name].shopItems[0].isChecked
          }
        }
      }
      this.trySaveAll()
      this.tryTotalNumber()
    },
    numberChange(e, item, shopItem) {
      // console.log('shopItem', e, item, shopItem)
      let itemIndex = this.items.findIndex(val => val.name === item.name)
      // console.log('itemIndex', itemIndex)
      let shopItemIndex = item.shopItems.findIndex(val => val.shopid === shopItem.shopid)
      // console.log('shopItemIndex', shopItemIndex)
      this.items[itemIndex].shopItems[shopItemIndex].numberItem = e
      let price = this.items[itemIndex].shopItems[shopItemIndex].price
      let num = this.items[itemIndex].shopItems[shopItemIndex].numberItem
      this.items[itemIndex].shopItems[shopItemIndex].allPrice = price * num
      this.tryTotalNumber()
      this.$forceUpdate()
    },
    submitDelete() {
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
          closeBtn: false,  //显式右上角关闭按钮
          onOkBtn(event) {  //确定按钮点击事件
            // console.log('this.items', items)
            this.close() //关闭对话框
          },
          onCancelBtn(event) {  //取消按钮点击事件，默认行为关闭对话框
            this.close()
          }
        })
      } else {
        this.$toast.text('请先选择商品')
      }
    },
    submitPay() {
      this.$toast.text('前往支付中...')
    },
    toProductDetail() {
      uni.navigateTo({
        url: '/pages/productDetail/detail'
      })
    },
    // 联系人弹框打开
    switchActionSheet() {
      this.inputTitle='规格'
      this.isVisible = !this.isVisible;
    },
    // 弹框关闭-清除
    switchActionClose(){
      this.inputMessage=''
      this.isVisible = !this.isVisible
      this.$forceUpdate()
    },
    //  弹框关闭-赋值
    switchActionUpdate(){
      if (this.inputTitle==='联系人') {
        this.infoMessage.contacts=this.inputMessage
      } else if (this.inputTitle==='手机号') {
        this.infoMessage.phoneNumber=this.inputMessage
      } else if (this.inputTitle==='邮箱') {
        this.infoMessage.email=this.inputMessage
      }
      this.isVisible = !this.isVisible
      this.$forceUpdate()
    },
    // 局部改变时，判断是否符合全选
    trySaveAll() {
      if (this.items.length === 1) {
        this.isAllChecked = this.items[0].isChecked
      } else if (this.items.length > 1) {
        for (let i=0; i < this.items.length; i++) {
          // console.log('this.items.length', this.items.length)
          if (i+1 < this.items.length) {
            if (this.items[i].isChecked != this.items[i+1].isChecked) {
              this.isAllChecked = false
              break
            }
          } else if (i+1 === this.items.length) {
            this.isAllChecked = this.items[0].isChecked
          }
        }
      }
      this.tryTotalNumber()
    },
    // 获取选中商品数量
    tryTotalNumber(){
      this.totalNum = 0
      this.allPrice = 0
        for(let j = 0; j < this.items.length; j++) {
          for(let i = 0; i < this.items[j].shopItems.length; i++) {
            // console.log('this.totalNum', j, i, this.totalNum, this.allPrice)
            if(this.items[j].shopItems[i].isChecked === true) {
              // console.log('this.allPrice',this.allPrice)
              // console.log('this.items[j].shopItems[i].allprice')
              // console.log(this.items[j].shopItems[i].allPrice)
              this.allPrice = this.allPrice + this.items[j].shopItems[i].allPrice
              this.totalNum = this.totalNum + 1
            }
          }
        }
      this.$forceUpdate()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.list-wrapper {
  background-color: #f5f5f5;
  .shopCar-List-length {
    width: 100%;
    height: 40px;
    padding: 5px 0;
    font-size: 15px;
    color: #666;
    background-color: #f5f5f5;
    .shopCar-text {
      display: inline-block;
      padding-left: 20px;
      line-height: 40px;
    }
    .shopCar-handle-btn {
      display: block;
      width: 50px;
      line-height: 40px;
      float: right;
    }
    .green-text {
      color: $sub-theme-color;
    }
  }
  .for-each {
    margin-bottom: 10px;
    padding-top: 15px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    .item-title {
      display: flex;
      padding-bottom: 5px;
      .checkBoxAllChoose {
        flex: 1;
        .checkbox {}
      }
      .checkTitleText {
        flex: 5;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
      }
    }
    .detail-card {
      margin-bottom: 10px;
      border-bottom: 1px dashed #ddd;
      .detail {
        min-height: 200px;
        display: flex;
        padding-bottom: 10px;
        .checkbox-choose {
          flex: 1;
        }
        .detail-img {
          width: 100%;
          height: 100%;
          flex:2;
          .detail-big {
            width: 100%;
            height: 100%;
            .detailone {
              width: 180rpx;
              height: 180rpx;
            }
          }
        }
        .detail-text {
          flex: 3;
          font-size: 12px;
          .detail-text-big {
            width: 95%;
            .detail-text-item-name {
              margin-bottom: 5px;
              font-size: 14px;
              color: #666;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .detail-button {
              width: 100%;
              height: 34px;
              margin-bottom: 5px;
              font-size: 12px;
              color: #D3D3D3;
              border: none;
              border-radius: 10px;
              text-align: left;
            }
          }
          .detail-text-second {
            margin-bottom: 5px;
            color: #333;
            .info-txt {
              margin-bottom: 4px;
            }
          }
          .inputNumber {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .inputNumberText{
              flex: 1;
              white-space: nowrap;
              font-size: 15px;
              color: #999;
            }
            .num-box {
              flex: 2;
            }
          }
          .littleAllMoney {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            white-space:nowrap;
            padding-bottom: 5px;
            .littleAllMoney-pay {
              font-size: 15px;
              color: red;
            }
          }
        }
      }
    }
  }
  .bottom-menu {
    z-index: 99;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    .check-all {
      flex: 1;
      font-size: 12px;
      color: #666;
    }
    .totalNum {
      font-size: 14px;
      display: flex;
      flex: 2;
      flex-direction:column;
      color: #666;
    }
    .btns-box {
      flex:3;
      .submit-delete {
        width: 90%;
        margin: 0 auto;
        color: #fff;
        border-radius: 15px;
        background-color: #f5222f;
      }
    }
    .check-all-isAllChecked {
      color: $theme-color;
    }
  }
  .contacts {
    text-align: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 25px;
    font-size: 20px;
    .contacts-input {
      padding-top: 30px;
      .contacts-input-set {
        width: 80%;
        padding-left: 10%;
        padding-right: 10%;
        border: none;
        border-bottom: 1px solid #eee;
      }
      .contacts-buttons {
        padding-top: 30px;
        display: flex;
        justify-content: center;
        .contacts-buttona {
          width: 40%;
        }
        .contacts-buttonb {
          background-color: $theme-color;
          width: 40%;
        }
      }
    }
  }
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail-card:last-child {
  border-bottom: none;
}
.uni-button::after {
	width: 0;
	height: 0;
}
</style>
