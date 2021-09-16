<template>
  <view class="contact-wrapper">
    <!-- 头部导航 -->
    <header-nav
      ref="headerNav"
      title="联系方式"
      backUrl="/pages/help/index"
    />
    <!-- 文字描述 -->
    <view class="desc-content">
      <view class="tips-title">全球业务</view>
      <view class="tips-text">
        合和建筑五金的业务遍布全国各个省市和地区，
        为了更好对每个区域进行管理，为客户提供优质的产品和服务，
        我们在全国设置有14个业务网点/分支机构。
      </view>
    </view>
    <!-- 标题框 -->
    <view class="list-title">合和业务网点</view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item, index) of contactList"
        :key="index"
      >
        <view class="area">{{item.area}}</view>
        <uni-row>
          <uni-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <view class="num">联系人：{{item.name}}</view>
          </uni-col>
          <uni-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <view class="num">联系方式：{{item.phone}}</view>
          </uni-col>
        </uni-row>
      </view>
    </view>
    <!-- 返回顶部按钮 -->
    <back-top />
  </view>
</template>

<script>
import HeaderNav from '@/components/headerNav/headerNav'
import BackTop from '@/components/backTop'

export default {
  name: 'Contact',
  components: {
    HeaderNav,
    BackTop
  },
  data() {
    return {
      contactList: [{
        area: '华东大区',
        name: '麦经理',
        phone: 13500268335
      }, {
        area: '华中大区',
        name: '谢经理',
        phone: 13500268227
      }, {
        area: '西南大区',
        name: '陈经理',
        phone: 13923200877
      }, {
        area: '华南大区',
        name: '罗经理',
        phone: 18928512911
      }, {
        area: '上海办事处总',
        name: '李经理',
        phone: 13703066307
      }, {
        area: '北方分公司',
        name: '马经理',
        phone: 15810416239
      }, {
        area: '东北大区',
        name: '姜经理',
        phone: 13898186112
      }, {
        area: '广州区域',
        name: '龙经理',
        phone: 13500268330
      }, {
        area: '佛山区域',
        name: '丘经理',
        phone: 13927795315
      }, {
        area: '粤东区',
        name: '李经理',
        phone: 18928512925
      }, {
        area: '粤南区',
        name: '刘经理',
        phone: 13925967730
      }, {
        area: '粤西区',
        name: '陆经理',
        phone: 13500268385
      }, {
        area: '粤北区',
        name: '邝经理',
        phone: 13927739270
      }, {
        area: '深圳分公司',
        name: '潘经理',
        phone: 18928512966
      }, {
        area: '海外地区',
        name: '曹经理',
        phone: 13928691711
      }]
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.desc-content {
  margin-top: 55px;
  padding: 10px;
  background-color: #f5f5f5;
  .tips-title {
    font-size: 20px;
    color: $theme-color;
  }
  .tips-text {
    margin: 10px 0;
    font-size: 15px;
    color: #666;
  }
}
.list-title {
  display: inline-block;
  margin: 10px 0;
  padding: 10px;
  font-size: 20px;
  color: #fff;
  background-color: $theme-color;
}
.list {
  padding-bottom: 20px;
  .list-item {
    width: 80%;
    min-height: 80px;
    margin: 10px auto;
    padding: 10px 15px;
    background-color: #f5f5f5;
    .area {
      margin: 10px 0;
      font-weight: bold;
      font-size: 16px;
      color: #000;
    }
    .num {
      margin-top: 10px;
      font-size: 15px;
      color: #666;
    }
  }
}
</style>
