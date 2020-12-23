'use strict'
const md5 = require('md5')
const HashSalt = ':wangning@666'
const BaseController = require('./base')
const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
}

class UserController extends BaseController {
  async login() {
    this.success('登录成功')
  }
  async register() {
    const { ctx } = this
    try {
      // 校验传递的参数
      ctx.validate(createRule)
    } catch (error) {
      return this.error('参数校验失败', -1, error.errors)
    }

    const { email, passwd, nickname, captcha } = ctx.request.body

    // 检验验证码
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }


    // 校验邮箱是否重复
    if (await this.checkEmail(email)) {
      this.error('邮箱重复了')
    } else {
      const ret = await ctx.model.User.create({
        email,
        nickname,
        passwd: md5(passwd + HashSalt),
      })

      if (ret._id) {
        this.success('注册成功')
      }
    }
  }

  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email })
    return user
  }

  async verify() {
    // 检验用户是否存在
    this.success('验证成功')
  }

  async info() {
    this.success('查询成功')
  }
}

module.exports = UserController
