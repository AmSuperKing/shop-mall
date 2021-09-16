const express = require('express')
const Result = require('../models/Result')
const boom = require('boom')
const {
  getNewProductBanner
} = require('../services/info')

const router = express.Router()

/**
 * @api {get} /api/v2/goods/getNewProductBanner 获取新品首发banner
 * @apiDescription 获取新品首发banner
 * @apiName 获取新品首发banner/api/v2/goods/getNewProductBanner
 * @apiGroup 信息模块
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
router.get('/info/getNewProductBanner', (req, res, next) => {
	getNewProductBanner().then(result => {
    if (!result || result.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      new Result(result[0], '获取数据成功').success(res)
    }
  })
})

module.exports = router