const express = require('express')
const Result = require('../models/Result')
const { body, validationResult } = require('express-validator')
const {
  getTypeList,
  getGoodsRandom,
  getSaleTypeInfo,
  getSaleTypeItem,
  getSubTypes,
  getBriefInfo
} = require('../services/home')
const boom = require('boom')

const router = express.Router()

/**
 * @api {get} /api/v2/goods/typeList 获取产品分类信息
 * @apiDescription 获取产品分类信息
 * @apiName 获取产品分类信息/api/v2/goods/typeList
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
router.get('/goods/typeList',(req, res, next) => {
  getTypeList().then(result => {
    if (!result || result.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      const mainType = result[0]
      const subMainType = result[1]
      for (let i = 0; i < mainType.length; i++) {
        let tempArr = []
        for (let j = 0; j < subMainType.length; j++) {
          if (subMainType[j].parentType === mainType[i].mainTypeId) {
            tempArr.push(subMainType[j])
          }
        }
        mainType[i]['subMainType'] = tempArr
      }
      new Result(mainType, '获取数据成功').success(res)
    }
  })
})

/**
 * @api {get} /api/v2/goods/getMainTypes 获取产品分类大类
 * @apiDescription 获取产品分类大类
 * @apiName 获取产品分类大类/api/v2/goods/getMainTypes
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
router.get('/goods/getMainTypes',(req, res, next) => {
  getTypeList().then(result => {
    if (!result || result.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      const mainType = result[0]
      new Result(mainType, '获取数据成功').success(res)
    }
  })
})

/**
 * @api {get} /api/v2/goods/getSubTypes 获取产品分类小类
 * @apiDescription 获取产品分类小类
 * @apiName 获取产品分类小类/api/v2/goods/getSubTypes
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
 router.get('/goods/getSubTypes',(req, res, next) => {
  getSubTypes().then(result => {
    if (!result || result.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      new Result(result, '获取数据成功').success(res)
    }
  })
})

/**
 * @api {post} /api/v2/goods/recommend 获取产品推荐
 * @apiDescription 获取产品推荐
 * @apiName 获取产品推荐/api/v2/goods/recommend
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
router.post('/goods/recommend', (req, res, next) => {
    console.log('******************************************')
    console.log()
    console.log('/goods/recommend', req.body)
    getGoodsRandom(req.body).then(result => {
      if (!result || result.length === 0) {
        new Result('获取数据失败').fail(res)
      } else {
        new Result(result, '获取数据成功').success(res)
      }
    })
  }
)

/**
 * @api {get} /api/v2/goods/getSaleTypeInfo 获取销售类信息
 * @apiDescription 获取销售类信息
 * @apiName 获取销售类信息/api/v2/goods/getSaleTypeInfo
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
router.get('/goods/getSaleTypeInfo',(req, res, next) => {
  getSaleTypeInfo().then(result => {
    if (!result || result.length === 0) {
      new Result('获取数据失败').fail(res)
    } else {
      new Result(result, '获取数据成功').success(res)
    }
  })
})

/**
 * @api {get} /api/v2/goods/getSaleTypeItem 获取销售类详细信息
 * @apiDescription 获取销售类详细信息
 * @apiName 获取销售类详细信息/api/v2/goods/getSaleTypeItem
 * @apiParam {String} id 销售类id,query参数
 * @apiGroup 产品信息模块
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
router.get('/goods/getSaleTypeItem', (req, res, next) => {
  const id = req.query.typeId
  if (id) {
    getSaleTypeItem(id).then(result => {
      if (!result || result.length === 0) {
        new Result('获取数据失败').fail(res)
      } else {
        if (result[0].length !== 0 && result[1].length !== 0) {
          const resData = result[0][0]
          resData['typeItems'] = result[1]
          new Result(resData, '获取数据成功').success(res)
        } else {
          new Result([], '获取数据成功').success(res)
        }
      }
    })
  } else {
    next(boom.badRequest('缺少请求参数'))
  }
})

/**
 * @api {get} /api/v2/goods/getBriefInfo 获取热销/新品/精选/超值概略信息
 * @apiDescription 获取热销/新品/精选/超值概略信息
 * @apiName 获取热销/新品/精选/超值概略信息/api/v2/goods/getBriefInfo
 * @apiGroup 产品信息模块
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
router.get('/goods/getBriefInfo', (req, res, next) => {
  getBriefInfo().then(results => {
    if (!results || !results[0].length || !results[1].length || !results[2].length || !results[3].length) {
      new Result('获取数据失败').fail(res)
    } else {
      if (results[0].length && results[1].length && results[2].length && results[3].length) {
        let resData = {
          hotSale: results[0],
          newProduct: results[1],
          highQuality: results[2],
          bargain: results[3]
        }
        new Result(resData, '获取数据成功').success(res)
      } else {
        new Result([], '获取数据成功').success(res)
      }
    }
  })
})

module.exports = router