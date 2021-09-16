const express = require('express')
const boom = require('boom')
const loginRouter = require('./login')
const homeRouter = require('./home')
const searchRouter = require('./search')
const goodsRouter = require('./goods')
const infoRouter = require('./info')
const jwtAuth = require('./jwt')
const Result = require('../models/Result')
var uuid = require('node-uuid')

// 注册路由
const router = express.Router()

router.use(jwtAuth)

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

router.get('/uuid', (req, res) => {
  let str = uuid.v1()
	let user_id = str.replace(/-/g, '')
  res.json(user_id)
})

// 通过 loginRouter 来处理 /login 路由，对路由处理进行解耦
router.use('/login', loginRouter)

router.use('/api/v2', homeRouter, searchRouter, goodsRouter, infoRouter)

// catch 404 and forward to error handler
/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则会拦截正常请求
 */
 router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

// error handler
router.use((err, req, res, next) => {
  console.log('err:', { err })
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  if (err.name && err.name === 'UnauthorizedError') {
    const { status = 401 } = err
    new Result(null, 'Token验证失败', {
      error: status,
      errorMsg: err.inner.message
    }).jwtError(res.status(status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null, msg, {
      error: statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})

module.exports = router
