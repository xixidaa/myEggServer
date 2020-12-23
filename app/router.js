'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const jwtMiddleware = app.middleware.jwt({ app })
  router.get('/', controller.home.index)
  // 验证码服务
  router.get('/captcha', controller.utils.captcha)
  // 邮箱验证码
  router.get('/sendCode', controller.utils.sendCode)

  router.group({ name: 'user', prefix: '/user',
  }, router => {
    const { register, login, verify, info } = controller.user

    router.post('/register', register)
    router.post('/login', login)
    router.get('/verify', verify)
    // 插入token检验中间件
    router.get('/info', jwtMiddleware, info)
  })
}
