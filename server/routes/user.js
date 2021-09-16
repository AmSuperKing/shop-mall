const express = require('express')
const Result = require('../models/Result')
const { register } = require('../services/user')
const { md5 } = require('../utils/index')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
var uuid = require('node-uuid')

const router = express.Router()

router.post(
	'/user/register',
	[
		body('phone').isString().withMessage('手机号需为字符'),
		body('verifyCode').isString().withMessage('验证码需为字符'),
		body('password').isString().withMessage('验证码需为字符')
	],
	(req, res, next) => {
		const err = validationResult(req)
		console.log(err)
		if (!err.isEmpty()) {
			const [{ msg }] = err.errors
			next(boom.badRequest(msg))
		} else {
			let { phone, password } = req.body
			password = md5(`${password}${PWD_SALT}`)
			let str = uuid.v1()
			let user_id = str.replace(/-/g, '')
			let user_name = phone + user_id.slice(0, 5)
			let user_nameCn = 'user_' + phone
			register(user_id, user_name, user_nameCn, password, phone).then(result => {
				console.log(result)
			})
		}
})

module.exports = router