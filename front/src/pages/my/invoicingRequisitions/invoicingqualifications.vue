<template>
	<view class="detail">
		<!-- 顶部导航 -->
		<header-nav
		  ref="headerNav"
		  title="增票资质"
		  color="#fff"
		  :bgColor="styles.themeColor"
		></header-nav>
    <div>
      <uni-steps class="steps" :options="options" :active="0"></uni-steps>
    </div>
    <div class="detail-header-invoice">
			<text class="detail-header-info">请完善资料，提交审核认证开通</text>
		</div>
		<view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>发票抬头：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="请输入发票抬头"  v-model.trim="pushObj.required"/>
		</view>
    <view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>单位税号：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="请输入单位税号"  v-model.trim="pushObj.taxNo"/>
		</view>
    <view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>注册地址：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="请输入注册地址"  v-model.trim="pushObj.address"/>
		</view>
    <view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>注册电话：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="请输入注册电话"  v-model.trim="pushObj.phone"/>
		</view>
    <view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>开户银行：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="请输入开户银行"  v-model.trim="pushObj.bankName"/>
		</view>
    <view class="detail-header">
			<text class="detail-header-text-left">
                <text class="detail-header-text-left-required">*</text>银行账号：</text>
            <input class="detail-header-text-right uni-input" name="nickname" placeholder="请输入银行账号"  v-model.trim="pushObj.bankAccount"/>
		</view>
    <view class="readAgreement">
      <view class="check-all flex-box">
        <checkbox-group class="checkButton" @change="checkFauntion">
          <checkbox
            :color="styles.themeColor"
            style="transform:scale(0.8)"
            :checked="pushObj.check"
          />
        </checkbox-group>
      </view>
      <view class="check-text">我已阅读并同意</view>
      <text class="showButton" isLink title="展示弹出层" :showIcon="true" @click.native="show= true">
        《增值税专票确认书》
      </text>
      <nut-popup class="showBook" v-model="show">
        <view class="showBook-body">
          <view class="showBook-convention">
          <text class="showBook-convention-title">标题</text>
          </view>
          <view class="showBook-convention">
            <text class="showBook-convention-text">中华民族自古崇尚“富贵不能淫，贫贱不能移，威武不能屈，杀身以成仁”的民族节气。爱国主义作为民族精神，
            更是中华民族传统美德的核心。</text>
          </view>
          <view class="showBook-convention">
            <text class="showBook-convention-text">历史上，中国屡遭外敌入侵，国破则家亡，使人们的爱国之情强烈地表现出来，并升华成为国献身的情操和精神，因此出现了岳飞的“精忠报国”、
            魏源的“师夷长技以制夷”、孙中山的“驱除鞑虏，恢复中华”。爱国主义成为推动中华民族不断前进的巨大力量。</text>
          </view>
        </view>
        <view class="showBook-convention-button">
            <!-- <button class="saveButton" type="warn" color="#008461" @click="show=false">我已了解</button> -->
            <nut-button class="saveButton" block shape="circle" @click="show=false">我已了解</nut-button>
        </view>
      </nut-popup>
    </view>
    <view class="detail-invoice-button">
            <!-- <button class="saveButton" type="primary">提交</button> -->
            <nut-button class="saveButton" block shape="circle">保存</nut-button>
    </view>

	</view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import styles from '@/assets/scss/variables.scss'

export default {
  name: 'MyDetail',
  components: {
    HeaderNav
  },
  data() {
    return {
        options:[
          {title: '提交信息'},
          {title: '审核信息'},
          {title: '已开通'}
        ],
        pushObj:{
        required:'',
        taxNo:'',
        address:'',
        phone:'',
        bankName:'',
        bankAccount:'',
        check:false},
        show:false
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  methods: {
    checkFauntion(){
      this.pushObj.check=!this.pushObj.check
      this.$forceUpdate()
    }
  }
}
</script>

<style long="scss" scoped>
@import '@/assets/scss/variables.scss';
/* #ifndef APP-NVUE */
page {
  background-color: #f5f5f5;
}
/* #endif */
.detail {
	height: 100%;
    margin-top: 65px;
}
.detail-header-invoice {
  margin-top: 10px;
  height: 30px;
  width: 100%;
  display: flex;
}
.detail-header-info {
    margin-left: 25px;
    font-size: 18px;
    margin-top: 4px;
    margin-bottom: 4px;
    align-items: center;
}
.detail-header {
	display: flex;
  margin-top: 3px;
  margin-bottom: 3px;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
  background-color: #ffffff;
 }
 .steps {
   padding-top: 10px;
 }
.detail-header-text-left {
	margin-left: 17px;
	font-size: 15px;
	color: rgb(102, 102, 102);
 }
 .detail-header-text-Other-left {
   margin-left: 25px;
	font-size: 15px;
	color: rgb(102, 102, 102);
 }
 .detail-header-text-left-required {
     color: #fa5157;
 }
 .check-all {
    font-size: 12px;
    color: #666;
    display: flex;
  }
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-text {
  align-items: center;
}
.detail-header-text-right {
  margin-right: 10px;
  font-size: 14px;
  color: #000000;
}
.detail-invoice-button {
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    margin-top: 40px;
    height: 30px;
}
.saveButton {
    border-radius: 12px;
}
.readAgreement {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.checkButton {
  width: 29px;
  height: 24px;
}
.showButton {
  color: #f30330;
}
.showBook {
  margin-top: 5%;
  margin-right: 5%;
  height: 80vh;
  border-radius: 12px;
  width: 90%;
}
.showBook-body {
  height: 70vh;
  border-radius: 12px;
}
.showBook-convention {
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
  display: flex;
  justify-content: center;
}
.showBook-convention-title {
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.showBook-convention-text {
  text-indent: 2em;
  font-size: 14px;
  margin-top: 10px;
}
.showBook-convention-button {
  margin-right: 25%;
  margin-left: 25%;
  width: 50%;
}
</style>
