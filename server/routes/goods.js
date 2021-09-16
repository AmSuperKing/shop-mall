const express = require('express')
const Result = require('../models/Result')
const boom = require('boom')
const {
  getTopSell
} = require('../services/goods')

const router = express.Router()

/**
 * @api {get} /api/v2/goods/getTopSell 获取热销排行数据
 * @apiDescription 获取热销排行数据
 * @apiName 获取热销排行数据/api/v2/goods/getTopSell
 * @apiGroup 产品信息模块
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
router.get('/goods/getTopSell', (req, res, next) => {
	getTopSell().then(results => {
    if (!results || results.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      new Result(results, '获取数据成功').success(res)
    }
  })
})

module.exports = router