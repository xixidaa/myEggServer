'use strict'
const { Service } = require('egg')
const nodeMailer = require('nodemailer')
const userEmail = '17862511099@163.com'
const transporter = nodeMailer.createTransport({
  service: '163',
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: 'URVTSNUNYPFLICHC', // 授权码 不是邮箱密码
  },
})

// service主要负责通用逻辑
class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html,
    }
    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

module.exports = ToolService
