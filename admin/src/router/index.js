import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    menuId: 'M0002',
    name: '主页',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      menuId: 'M000001',
      hidden: true,
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    hidden: true,
    menuId: 'M0001',
    meta: { title: '用户', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'user',
        hidden: true,
        menuId: 'M00011',
        component: () => import('@/views/user/user'),
        meta: { title: '用户管理', icon: 'el-icon-user' }
      },
      {
        path: 'role',
        menuId: 'M00012',
        hidden: true,
        component: () => import('@/views/user/role'),
        meta: { title: '角色管理', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/productList',
    hidden: true,
    menuId: 'M0003',
    meta: { title: '商品', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'productList',
        hidden: true,
        menuId: 'M00031',
        component: () => import('@/views/product/productList'),
        meta: { title: '商品管理', icon: 'el-icon-shopping-bag-1' }
      },
      {
        path: 'productClassify',
        menuId: 'M00032',
        hidden: true,
        component: () => import('@/views/product/productClassify'),
        meta: { title: '商品分类', icon: 'el-icon-s-grid' }
      },
      {
        path: 'productComment',
        menuId: 'M00033',
        hidden: true,
        component: () => import('@/views/product/productComment'),
        meta: { title: '商品评论', icon: 'el-icon-chat-line-round' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderList',
    hidden: true,
    menuId: 'M0004',
    meta: { title: '订单', icon: 'el-icon-shopping-cart-full' },
    children: [
      {
        path: 'orderList',
        hidden: true,
        menuId: 'M00041',
        component: () => import('@/views/order/orderList'),
        meta: { title: '订单管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/coupons',
    hidden: true,
    menuId: 'M0005',
    meta: { title: '营销', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'coupons',
        hidden: true,
        menuId: 'M00051',
        component: () => import('@/views/market/coupons'),
        meta: { title: '优惠卷', icon: 'el-icon-s-ticket' }
      },
      {
        path: 'couponsUserReceive',
        hidden: true,
        menuId: 'M00052',
        component: () => import('@/views/market/couponsUserReceive'),
        meta: { title: '用户领取记录', icon: 'el-icon-thumb' }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/invoice',
    hidden: true,
    menuId: 'M0006',
    meta: { title: '财务', icon: 'el-icon-s-finance' },
    children: [
      {
        path: 'invoice',
        hidden: true,
        menuId: 'M00061',
        component: () => import('@/views/financial/invoice'),
        meta: { title: '发票管理', icon: 'el-icon-document' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    hidden: true,
    menuId: 'M0007',
    meta: { title: '内容', icon: 'el-icon-reading' },
    children: [
      {
        path: 'article',
        hidden: true,
        menuId: 'M00071',
        component: () => import('@/views/content/article'),
        meta: { title: '文章管理', icon: 'el-icon-news' }
      },
      {
        path: 'message',
        hidden: true,
        menuId: 'M00072',
        component: () => import('@/views/content/message'),
        meta: { title: '消息管理', icon: 'el-icon-chat-dot-round' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/icons',
    hidden: true,
    menuId: 'M0008',
    meta: { title: '设置', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'icons',
        hidden: true,
        menuId: 'M00081',
        component: () => import('@/views/setting/icons'),
        meta: { title: '图标管理', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'carousel',
        hidden: true,
        menuId: 'M00082',
        component: () => import('@/views/setting/carousel'),
        meta: { title: '轮播设置', icon: 'el-icon-data-board' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
