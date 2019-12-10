'use strict'

const shortid = require('shortid')

module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const userSchema = new Schema({
    username: String,
    exercises: [{ description: String, duration: Number, date: Date }],
    _id: { type: String, default: shortid.generate }
  })

  const User = mongoose.model('User', userSchema)

  const addUser = (username, callback) => {
    User.create({ username }, (err, user) => {
      if (err) return callback(err)
      callback(null, user)
    })
  }

  const getUserByName = (username, callback) => {
    User.findOne({ username }, (err, user) => {
      if (err) return callback(err)
      callback(null, user)
    })
  }

  const getUserById = (userId, callback) => {
    User.findById(userId, (err, user) => {
      if (err) return callback(err)
      callback(null, user)
    })
  }

  const getUsers = (callback) => {
    User.find({}, (err, users) => {
      if (err) return callback(err)
      callback(null, users)
    })
  }

  return { addUser, getUserById, getUserByName, getUsers }
}
