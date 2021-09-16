<template>
  <div class="scroll_wrapper">
    <!-- 左侧 -->
    <div class="menu_wrapper">
      <ul class="menu_list">
        <li
          class="menu_item"
          :class="{on:index === currentIndex}"
          v-for="(good, index) of goods"
          :key="index"
          @click="checkMenu(index)"
        >
          {{good.name}}
        </li>
      </ul>
    </div>
    <!-- 右侧 -->
    <div class="goods_wrapper">
      <ul class="goods_list" ref="goods_list">
        <li class="goods_item" v-for="(good,index) of goods" :key="index">
          <div class="title">{{good.name}}</div>
          <div class="good_list">
            <div
              class="good_item"
              v-for="(food, index2) of good.foods"
              :key="index2"
              @click="toDetail(good.name, food.name)"
            >
              <div class="item-box">
                <image src="../static/imgs/MS-A.png" class="good_item_img"></image>
                <div class="good_item_title">{{food.name}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 返回顶部按钮 -->
      <div class="back-top-box" v-show="showBackTop" @click="backTop">
        <div class="back-page-top">
          <nut-icon type="top" color="#2e2d2d"></nut-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name: 'GoodsAbout',
  data() {
    return {
      goods: [{
        name: '热门推荐',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }]
      }, {
        name: '门窗配件',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }]
      }, {
        name: '紧固件',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }]
      }, {
        name: '工程五金',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }]
      }, {
        name: '精装五金',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }]
      }, {
        name: '酒店产品',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }]
      }, {
        name: '厨房卫浴',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }, {
          name: '小白子'
        }]
      }, {
        name: '智能家居',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白子'
        }, {
          name: '小白啊'
        }]
      }, {
        name: '智慧社区',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }, {
          name: '小白子'
        }]
      }, {
        name: '化学建材',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }, {
          name: '小白子'
        }]
      }, {
        name: '油漆涂料',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }, {
          name: '小白太'
        }, {
          name: '小白子'
        }, {
          name: '小白子'
        }]
      }, {
        name: '装饰材料',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }]
      }, {
        name: '灯具照明',
        foods: [{
          name: '小白'
        }, {
          name: '小白菜'
        }, {
          name: '小白丸'
        }, {
          name: '小白郎'
        }]
      }],
      tops: [],
      scrollY: 0,
      switchName: '',
      showBackTop: false
    }
  },
  mounted() {
    // 进行初始化滚动
    this.initScroll()
    // 收集右侧商品列表各个分类的高度
    this.initTops()
  },
  computed: {
    currentIndex() {
      const {scrollY, tops} = this
      // 找到当前商品分类联动匹配的菜单分类的下标索引,实现联动左侧菜单列表
      let currIndex = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index+1]
      })
      return currIndex
    }
  },
  methods: {
    initScroll() {
      // 初始化左边菜单滚动
      new Bscroll('.menu_wrapper', {
        click: true
      })
      // 初始化右边菜单滚动
      this.goodsScroll = new Bscroll('.goods_wrapper', {
        click: true,
        /** 
         * probeType说明：
         * 1: 只有滚动的时候会触发scroll事件 会截流,
         * 2: 只有滚动的时候会实时的触发scroll事件 不会节流,
         * 3: 滚动的时候会实时触发scroll事件,惯性滑动的时候也会触发scroll事件
         */
        probeType: 2
      })
      // 监听商品分类列表的滚动,得到实时滚动的位置
      this.goodsScroll.on('scroll', ({x,y}) => {
        this.scrollY = Math.abs(y)
        // console.log('右侧滚动', y)
      })
      // probeType使用值2,只有滚动是才会触发scroll事件,
      // 因为惯性滑动不会触发事件,但是我们又需要最终滑动停止的位置,
      // 可以使用better-scroll的scrollEnd事件监听滚动停止时的位置,得到滚动停止的位置
      this.goodsScroll.on('scrollEnd', ({x, y}) => {
        this.scrollY = Math.abs(y)
        if (this.scrollY > 350) {
          this.showBackTop = true
        } else {
          this.showBackTop = false
        }
      })
    },
    initTops() {
      let lis = this.$refs.goods_list.children
      let top = 0
      let tops = []
      tops.push(top)
      // 将获得的商品列表的类数组转化为数组进行遍历获取到每个商品分类到顶部的高度
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // console.log('各个分类列表距离顶部:', tops)
      this.tops = tops
    },
    // 实现左边菜单点击联动右侧商品分类列表
    checkMenu(index) {
      const {tops} = this
      const scrollY = tops[index]
      this.scrollY = scrollY
      /**
       * scrollTo()
       * 是better-scroll 模块的方法 用于滑动到指定位置
       * 第一个参数:横轴方向(也就是坐标轴的x轴方向)滑动的大小
       * 第二个参数:纵轴方向(y轴方向)滑动的大小
       */
      // y轴方向滑动的大小为对应商品分类收集的高度的负值
      this.goodsScroll.scrollTo(0, -scrollY, 300)
    },
    switchToMenu() {
      let i = this.goods.findIndex((value) => value.name === this.switchName)
      if (i !== -1) {
        const {tops} = this
        const scrollY = tops[i]
        this.scrollY = scrollY
        this.goodsScroll.scrollTo(0, -scrollY, 300)
      }
    },
    toDetail(mainType, subType) {
      let currPages = getCurrentPages()
      let currRoute = currPages[currPages.length - 1].route
      if (currRoute === 'pages/search/result') {
        this.$emit('submitTypes', mainType, subType)
      } else {
        this.$Router.push({ path: '/pages/search/result', query: { mainType: mainType, subType: subType }})
      }
    },
    backTop() {
      this.goodsScroll.scrollTo(0, 0, 700)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.scroll_wrapper {
  display: flex;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  .menu_wrapper {
    min-width: 15vw;
    background-color: #f5f5f5;
    .menu_list {
      .menu_item {
        padding: 15px;
        text-align: center;
        font-size: 14px;
        color: #666;
        &.on {
          color: #fff;
          font-weight: bold;
          background-color: $sub-theme-color;
        }
      }
    }
  }
  .goods_wrapper {
    flex: 1;
    .goods_list {
      .goods_item {
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        .title {
          margin: 5px 0;
          padding: 10px 0 10px 15px;
          font-size: 15px;
          font-weight: 600;
          color: #666;
          background-color: #fff;
        }
        .good_list {
          width: 100%;
          .good_item {
            display: inline-block;
            width: 33%;
            text-align: center;
            font-size: 14px;
            color: #666;
            .item-box {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              .good_item_img {
                display: block;
                width: 90px;
                height: 90px;
              }
              .good_item_title {
                height: 15px;
                margin-top: 5px;
                line-height: 15px;
              }
            }
          }
        }
      }
    }
  }
}

.back-top-box {
  position: fixed;
  right: 36rpx;
  bottom: 160rpx;
  width: 45px;
  height: 45px;
  background-color: transparent;
  .back-page-top {
    background-color: rgba(255, 255, 255, .7);
    color: #2e2d2d;
    display: flex;
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.35);
  }
}
</style>
