<template>
  <view class="new-address">
    <header-nav
      ref="headerNav"
      title="修改地址"
      backUrl="/pages/manaAddress/index"
    ></header-nav>
    <view class="add-form">
    	<uni-forms
        :rules="rules"
        :modelValue="formData"
        label-width="80"
        ref="form"
        validate-trigger="bind"
        err-show-type="undertext"
      >
        <uni-forms-item name="name" required label="用户名">
          <input
            type="text"
            v-model="formData.name"
            class="uni-input-border bottom-line"
            @blur="binddata('name', $event.detail.value)"
            placeholder="请填写用户名"
          />
        </uni-forms-item>
        <!-- 使用原生input，需要绑定binddata -->
        <uni-forms-item name="phone" required label="手机号">
          <input
            type="text"
            v-model="formData.phone"
            class="uni-input-border bottom-line"
            @blur="binddata('phone', $event.detail.value)"
            placeholder="请填写手机号"
          />
        </uni-forms-item>
        <uni-forms-item name="region" required label="所在地区">
          <picker
            mode="multiSelector"
            :value="multiIndex"
            :range="regionData"
            @change="changeVal"
            @columnchange="bindMultiPickerColumnChange"
            @cancel="cancelPick"
          >
            <uni-row class="region-row flex-box bottom-line">
              <uni-col :span="21">
                <view class="region">
                  <text v-if="tipsVisible" class="tips-text">请选择所在地区</text>
                  <view v-if="!tipsVisible">
                    <!-- <text class="region-margin">{{region.province}}</text>
                    <text  class="region-margin">{{region.city}}</text>
                    <text>{{region.area}}</text> -->
                    <text>{{formData.region}}</text>
                  </view>
                </view>
              </uni-col>
              <uni-col class="flex-box" :span="3">
                <uni-icons type="arrowright" color="#333" size="18" />
              </uni-col>
            </uni-row>
          </picker>
        </uni-forms-item>
        <uni-forms-item name="detail" required label="详细地址">
        	<uni-easyinput
            type="textarea"
            v-model="formData.detail"
            :maxlength="50"
            placeholder="请填写收货详细地址"
          ></uni-easyinput>
        </uni-forms-item>
    	</uni-forms>
      <uni-row class="set-default">
        <uni-col class="set-title" :span="16">
          <view class="title-text">设为默认收货地址</view>
        </uni-col>
        <uni-col class="set-switch" :span="8">
          <switch
            :color="styles.themeColor"
            style="transform:scale(0.7)"
            :checked="formData.defaultTag"
          />
        </uni-col>
      </uni-row>
    </view>
    
    <uni-row class="btns">
      <uni-col :span="12">
        <button class="del-btn" type="default" @click="delCurrAddr">删除</button>
      </uni-col>
      <uni-col :span="12">
        <button class="commit-btn" type="warn" @click="submitForm('form')">保存</button>
      </uni-col>
    </uni-row>

    <uni-popup ref="alertDialog" type="dialog">
    	<uni-popup-dialog
        type="error"
        title="确认删除"
        content="是否删除当前收货地址？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'
import regionData from '@/assets/region/region.js'

export default {
  name: 'NewAddress',
  components: {
    HeaderNav
  },
  data() {
    return {
      formData: {
      	name: '',
      	phone: '',
        region: '',
        detail: '',
        defaultTag: false
      },
      tipsVisible: true,
      region: {
        province: '',
        city: '',
        area: ''
      },
      provinces: [],
      cities: [],
      areas: [],
      showPopup: false,
      multiIndex: [0, 0, 0],
      regionData: [],
      rules: {
      	name: {
      		rules: [{
      				required: true,
      				errorMessage: '请填写用户名'
      			},
      			{
      				minLength: 1,
      				maxLength: 15,
      				errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
      			}
      		]
      	},
      	phone: {
      		rules: [{
      				required: true,
      				errorMessage: '请填写手机号'
      			},
      			{
      				format: 'number',
      				errorMessage: '手机号必须是数字'
      			}
      		]
      	},
        detail: {
          rules: [{
            required: true,
            errorMessage: '请填写详细收货地址'
          }]
        }
      }
    }
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    uni.$once('currAddr', (data) => {
      console.log('data.addrData', data)
      this.formData = data.addrData
      this.tipsVisible = false
    })
  },
  computed: {
    styles() {
      return styles
    }
  },
  mounted() {
    if (this.formData.region) {
      this.initCity()
    }
  },
  methods: {
    initCity() {
      const [...addr] = regionData
      addr.forEach(item => this.provinces.push(item.name))
      addr[0].children.forEach(item => this.cities.push(item.name))
      addr[0].children[0].children.forEach(item => this.areas.push(item.name))
      this.regionData = [this.provinces, this.cities, this.areas]
      const reg = /.+?(省|市|自治区|自治州|县|区)/g
      const regionArr = this.formData.region.match(reg)
      // console.log('regionArr', regionArr)
      if (regionArr && regionArr.length > 0) {
        this.region.province = regionArr[0]
        this.region.city = regionArr[1]
        this.region.area = regionArr[2]
        let index = this.provinces.findIndex(item => item === regionArr[0])
        if (index !== -1) {
          this.provinceChange(index)
          this.findCurrAddr(regionArr)
        }
      }
      // console.log(this.regionData)
    },
    changeVal(e) {
      // console.log('changeVal', e.detail.value)
      const indexArr = e.detail.value
      this.region.province = this.regionData[0][indexArr[0]]
      this.region.city = this.regionData[1][indexArr[1]]
      this.region.area = this.regionData[2][indexArr[2]]
      this.tipsVisible = false
      this.formData.region = this.region.province + this.region.city + this.region.area
    },
    bindMultiPickerColumnChange(e) {
      // console.log('修改的列为：' + e.detail.column + '，索引值为：' + e.detail.value)
      switch (e.detail.column) {
        case 0: //拖动第1列，省改变
        	this.provinceChange(e.detail.value)
        	break
        case 1: //拖动第2列，城市改变
        	this.cityChange(e.detail.value)
        	break
        case 1: //拖动第3列，区改变
        	this.areaChange(e.detail.value)
        	break
      }
    },
    provinceChange(index) {
      this.multiIndex[0] = index
      this.multiIndex[1] = 0
      this.multiIndex[2] = 0
      this.cities = []
      this.areas = []
      const [...addr] = regionData
      addr[this.multiIndex[0]].children.forEach(item => this.cities.push(item.name))
      addr[this.multiIndex[0]].children[this.multiIndex[1]].children.forEach(item =>{
        this.areas.push(item.name)
      })
      this.regionData = [this.provinces, this.cities, this.areas]
      // console.log(this.regionData)
      this.$forceUpdate()
    },
    cityChange(index) {
      this.multiIndex[1] = index
      this.multiIndex[2] = 0
      this.areas = []
      const [...addr] = regionData
      addr[this.multiIndex[0]].children[this.multiIndex[1]].children.forEach(item =>{
        this.areas.push(item.name)
      })
      this.regionData = [this.provinces, this.cities, this.areas]
      // console.log(this.regionData)
      this.$forceUpdate()
    },
    areaChange(index) {
      this.multiIndex[2] = index
    },
    cancelPick() {
      if (this.formData.region === '' ||
      this.formData.region === undefined ||
      this.formData.region === null) {
        this.tipsVisible = true
      }
    },
    findCurrAddr(arr) {
      let cityIndex = this.cities.findIndex(item => item === arr[1])
      if (cityIndex !== -1) this.multiIndex[1] = cityIndex
      this.cityChange(cityIndex)
      let areaIndex = this.areas.findIndex(item => item === arr[2])
      if (areaIndex !== -1) this.multiIndex[2] = areaIndex
    },
    /**
     * 手动提交
     * @param {Object} form
     */
    submitForm(form) {
    	this.$refs.form.validate().then(res => {
        if (this.formData.region === '' ||
        this.formData.region === undefined ||
        this.formData.region === null) {
          this.$toast.text('请选择所在地区')
          return
        }
        // console.log('验证表单后返回数据信息：', res)
        // console.log('this.formData', this.formData)
        const paramObj = {
          username: this.formData.name,
          phone: this.formData.phone,
          region: this.formData.region,
          addrDetail: this.formData.detail,
          defaultTag: this.formData.defaultTag
        }
        console.log('用户地址：', paramObj)
        this.redirectToPrePage()
      }).catch(err => {
        // console.log('表单错误信息：', err)
      })
    },
    delCurrAddr() {
    	this.$refs.alertDialog.open()
    },
    dialogConfirm() {
    	// console.log('确认删除')
    	this.redirectToPrePage()
    },
    dialogClose() {
    	// console.log('点击取消')
    },
    redirectToPrePage() {
      uni.showLoading({
      	title: ''
      })
      setTimeout(() => {
      	uni.hideLoading()
      	this.$refs.alertDialog.close()
        uni.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
page {
  background-color: #f5f5f5;
}
/* #endif */

.add-form {
  margin-top: 55px;
  padding: 10px;
  background-color: #fff;
}
.uni-input-border {
  flex: 1;
  padding: 0 10px;
  height: 35px;
  font-size: 14px;
  color: #333;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-line {
  border-bottom: 1px solid #eee;
}
.region-row {
  height: 35px;
  padding-left: 10px;
  color: #333;
  .region {
    .tips-text {
      color: #808080;
    }
  }
}
.set-default {
  padding-top: 10px;
  border-top: 1px solid #eee;
  .set-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
    color: #666;
    .title-text {
      height: 35px;
      line-height: 35px;
    }
  }
  .set-switch {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.btns {
  margin-top: 20px;
  background-color: transparent;
  .del-btn {
    width: 90%;
    font-size: 16px;
    background-color: #fff;
  }
  .commit-btn {
    width: 90%;
    font-size: 16px;
  }
}
.region-margin {
  margin-right: 5px;
}
</style>
