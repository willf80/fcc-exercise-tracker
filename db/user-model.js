'use strict'

module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const userSchema = new Schema({ userName: String, _id: String })
  this.User = mongoose.model('User', userSchema)

  const addUser = (userName, callback) => {
    this.User.create({ userName: userName, _id: 'Y0dEezg' }, (err, user) => {
      if (err) return callback(err)
      callback(null, user)
    })
  }

  const getUser = (userName, callback) => {
    this.User.findOne({ userName: userName }, (err, user) => {
      if (err) return callback(err)
      callback(null, user)
    })
  }

  const getUsers = (callback) => {
    this.User.find({}, (err, users) => {
      if (err) return callback(err)
      callback(null, users)
    })
  }

  return { addUser, getUser, getUsers }
}
