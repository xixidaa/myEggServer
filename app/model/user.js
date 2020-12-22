'use strict'
// 用户相关模型

module.exports = app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    email: { type: String, required: true },
    passwd: { type: String, required: true },
    nickname: { type: String, required: true },
    avatar: { type: String, required: false, default: '' },
  }, {
    timestamps: true,
  })

  return mongoose.model('User', UserSchema)
}
