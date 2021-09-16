const express = require('express')
const Result = require('../models/Result')
const { login, getUserInfo } = require('../services/user')
const { md5 } = require('../utils/index')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')

const router = express.Router()

/**
 * @api {post} /login 用户登录
 * @apiDescription 用户登录
 * @apiName 登录login
 * @apiGroup 用户登录模块
 * @apiParam (body) {String} username 用户名，body参数发送
 * @apiParam (body) {String} password 密码，body参数发送
 * @apiSuccess {json} result 响应格式
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 200,
 *      "message": "登录成功",
 *      "data" : {
 *          "token": "..."
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.post(
	'/',
	[
		body('username').isString().withMessage('用户名需为字符'),
		body('password').isString().withMessage('密码需为字符')
	],
	(req, res, next) => {
		const err = validationResult(req)
		if (!err.isEmpty()) {
			const [{ msg }] = err.errors
			next(boom.badRequest(msg))
		} else {
			let { username, password } = req.body
			password = md5(`${password}${PWD_SALT}`)
			login(username, password).then(user => {
				if (!user || user.length === 0) {
					new Result('登录失败').fail(res)
				} else {
          const [{ userId }] = user
					const token = jwt.sign(
						{ userId },
						PRIVATE_KEY,
						{ expiresIn: JWT_EXPIRED }
					)
          let dataParam = {
            token: 'Bearer ' + token
          }
					new Result(dataParam, '登录成功').success(res)
				}
			})
		}
})

/**
 * @api {get} /login/getUserInfo 获取当前登录信息
 * @apiDescription 获取当前登录信息
 * @apiName 获取当前登录信息/login/getUserInfo
 * @apiGroup 用户登录模块
 * @apiHeader (headers) {String} Authorization token，附带请求头
 * @apiSuccess {json} result 响应格式
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 200,
 *      "message": "查询成功",
 *      "data": {
 *        ...
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.get('/getUserInfo', (req, res, next) => {
  if (req.user && req.user.userId) {
    const user_id = req.user.userId
    getUserInfo(user_id).then(result => {
      if (result.length > 0) {
        let tempObj = {}
        Object.assign(tempObj, result[0])
        tempObj.password = ''
        new Result(tempObj, '查询成功').success(res)
      }
    })
  }
})

module.exports = router