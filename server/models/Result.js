const {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKEN_EXPIRED
} = require('../utils/constant')

class Result {
  constructor(data, message = '操作成功', options) {
    this.data = null
    if (arguments.length === 0) {
      this.message = '操作成功'
    } else if (arguments.length === 1) {
      this.message = data
    } else {
      this.data = data
      this.message = message
      if (options) {
        this.options = options
      }
    }
  }

  createResult() {
    if (!this.code) {
      this.code = CODE_SUCCESS
    }
    let base = {
      code: this.code,
      message: this.message
    }
    if (this.data) {
      base.data = this.data
    }
    if (this.options) {
      base = { ...base, ...this.options }
    }
    console.log('base:', base)
    return base
  }

  json(res) {
    res.json(this.createResult())
  }

  success(res) {
    this.code = CODE_SUCCESS
    this.json(res)
  }

  fail(res) {
    this.code = CODE_ERROR
    this.json(res)
  }

  jwtError(res) {
    this.code = CODE_TOKEN_EXPIRED
    this.json(res)
  }
}

module.exports = Result