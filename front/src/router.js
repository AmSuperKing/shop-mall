import store from './store'
import {
  RouterMount,
  createRouter,
  runtimeQuit
} from 'uni-simple-router'
import { getToken } from '@/utils/auth'

const whiteList = [
  '/pages/account/login',
  '/pages/account/register',
	'/pages/account/resetPassword',
  '/pages/index/index',
  '/pages/classify/classify',
  '/pages/my/my',
  '/pages/search/search',
  '/pages/search/result',
	'/pages/productDetail/detail',
  '/pages/goodsType/goodsType',
  '/pages/hotSale/hotSale',
  '/pages/topSelling/topSelling',
  '/pages/newProduct/index',
  '/pages/productType/index',
  '/pages/help/index',
  '/pages/help/contact',
  '/pages/account/agreement',
  '/pages/404/404'
]

let first = null
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	APP: {
		animation: {
			animationType: 'slide-in-top',
			animationDuration: 300
		},
		loadingPageHook: (view) => {
			view.hide()
		}
	},
	applet: {
		animationDuration: 300
	},
	routerErrorEach:({type, level, ...args}) => {
		// console.log({type, level, ...args})
		if (type === 3) {
			router.$lockStatus = false
			// #ifdef APP-PLUS
			if(level == 1 && args.uniActualData.from === 'backbutton') {
				runtimeQuit()
			}
			// #endif
		} else if (type ===0 ) {
			router.$lockStatus = false
		}
		
	},
	debugger: true,
	routes: [
		...ROUTES,
		{
		  path: '*',
		  redirect: (...args) => {
			  // console.log(args)
			  return {name:'404'}
		  }
		},
	]
})
// console.log(router)
// let count = 0
router.beforeEach((to, from, next) => {
	// count++
  // console.log('beforeEach--开始跳转to', to)
  // console.log('from', from)
	// if (to.name == 'index' && to.BACKTYPE == 'navigateBack') {
	// 	next(false)
	// } else {
	// 	next()
	// }
  const hasToken = getToken()
  
	if (hasToken) {
    if (to.path === '/pages/account/login') {
      // if is logged in, redirect to the home page
      next({ path: from.path })
    } else {
      const hasGetUserInfo = store.getters.userInfo
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          store.dispatch('self/getInfo')
          next()
        } catch (error) {
          store.dispatch('self/resetToken')
          this.$toast.text(error || 'Has Error')
          next(`/pages/account/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    store.dispatch('self/logout')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/pages/account/login?redirect=${to.path}`)
    }
  }
	// if (count == 1) {
	// 	next({
	// 		path:'/pages/account/login',
	// 		NAVTYPE:'replaceAll'
	// 	})
	// } else {
	// 	next()
	// }
	
})
router.afterEach((to, from, next) => {
	// console.log('afterEach---跳转结束')
})

export {
	router,
	RouterMount
}