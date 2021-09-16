const express = require('express')
const Result = require('../models/Result')
const boom = require('boom')
const {
  getHotWords,
  searchGoods,
  getGoodsDetail
} = require('../services/search')

const router = express.Router()

/**
 * @api {get} /api/v2/search/hotWord 获取热搜词
 * @apiDescription 获取热搜词
 * @apiName 获取热搜词/api/v2/search/hotWord
 * @apiGroup 搜索模块
 * @apiSuccess {json} result 响应格式
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 200,
 *      "message": "获取数据成功",
 *      "data": [{
 *        ...
 *      }]
 *  }
 * @apiVersion 0.0.1
 */
router.get('/search/hotWord', (req, res, next) => {
	getHotWords().then(results => {
    if (!results || results.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      new Result(results, '获取数据成功').success(res)
    }
  })
})

/**
 * @api {post} /api/v2/search/searchGoods 根据关键词搜索商品
 * @apiDescription 根据关键词搜索商品
 * @apiName 根据关键词搜索商品/api/v2/search/searchGoods
 * @apiGroup 搜索模块
 * @apiParam (query) {String} search 搜索词,query参数
 * @apiSuccess {json} result 响应格式
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 200,
 *      "message": "获取数据成功",
 *      "data": [{
 *        ...
 *      }]
 *  }
 * @apiVersion 0.0.1
 */
router.post('/search/searchGoods', (req, res, next) => {
  if (req.query.search) {
    searchGoods(req.query.search).then(results => {
      if (!results || results.length === 0) {
        new Result('获取数据失败').fail(res)
      } else {
        new Result(results, '获取数据成功').success(res)
      }
    })
  } else {
    next(boom.badRequest('缺少请求参数'))
  }
})

/**
 * @api {post} /api/v2/search/getGoodsDetail 获取商品详情信息
 * @apiDescription 获取商品详情信息
 * @apiName 获取商品详情信息/api/v2/search/getGoodsDetail
 * @apiGroup 产品信息模块
 * @apiParam (body) {String} goodsId 商品id, body参数
 * @apiSuccess {json} result 响应格式
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 200,
 *      "message": "获取数据成功",
 *      "data": {
 *        ...
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.post('/search/getGoodsDetail', (req, res, next) => {
  if(req.body.goodsId) {
    getGoodsDetail(req.body.goodsId).then(result => {
      if (!result) {
        new Result('获取数据失败').fail(res)
      } else {
        let [...tempArr ] = result[0]
        let resData = tempArr[0]
        resData['carouselList'] = result[1]
        resData['detail'] = result[2]
        resData['comments'] = result[3]
        new Result(resData, '获取数据成功').success(res)
      }
    })
  } else {
    next(boom.badRequest('缺少请求参数'))
  }
})

module.exports = router