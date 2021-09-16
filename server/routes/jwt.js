const expressJwt = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  algorithms: ['HS256'],
  credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: [
    '/',
    '/uuid',
    '/login',
    '/api/v2/goods/typeList',
    '/api/v2/goods/getMainTypes',
    '/api/v2/goods/getSubTypes',
    '/api/v2/goods/recommend',
    '/api/v2/goods/getSaleTypeInfo',
    '/api/v2/goods/getSaleTypeItem',
    '/api/v2/goods/getBriefInfo',
    '/api/v2/search/hotWord',
    '/api/v2/search/searchGoods',
    '/api/v2/search/getGoodsDetail',
    '/api/v2/goods/getTopSell',
    '/api/v2/info/getNewProductBanner'
  ] // 设置 jwt 认证白名单
})

module.exports = jwtAuth