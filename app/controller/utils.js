'use strict'
const svgCaptcha = require('svg-captcha')
const BaseController = require('./base')
const fse = require('fs-extra')

class UtilsController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3,
    })

    // 存储在session
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
  // 邮箱验证码
  async sendCode() {
    const { ctx } = this
    const email = ctx.query.email
    const code = Math.random().toString().slice(2, 6)
    console.log('邮箱: ' + email + '验证码' + code)
    ctx.session.emailCode = code

    const subject = 'wn的验证码'
    const text = ''
    const html = `<h2>小王社区</h2><a href="http://www.baidu.com"><span>${code}</span></a>`

    const hasSend = await this.service.tools.sendMail(email, subject, text, html)

    if (hasSend) {
      this.message('发送成功')
    } else {
      this.error('发送失败')
    }
  }

  // 上传文件
  async uploadFile() {
    const { ctx } = this
    const file = ctx.request.files[0]
    if (!file) {
      return this.error('请至少上传一张图片', -1)
    }
    const filename = file.filename
    await fse.move(file.filepath, this.config.UPLOAD_DIR + `/${filename}`)
    this.message({
      url: `/public/${filename}`,
    })
  }
}

module.exports = UtilsController
