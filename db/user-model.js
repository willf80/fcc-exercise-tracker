'use strict'

const shortid = require('shortid')

module.exports = (mongoose) => {
  const Schema = mongoose.Schema

  // User Schema + Model
  const userSchema = new Schema({
    username: { type: String, required: true },
    exercises: [{
      description: { type: String, required: true },
      duration: { type: Number, required: true },
      date: Date
    }],
    _id: { type: String, default: shortid.generate }
  })
  // User Model
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
    User.find({}).select('username _id').exec((err, users) => {
      if (err) return callback(err)
      callback(null, users)
    })
  }

  // exercise = { userId, description, duration, date }
  // callback = (err, data) => {}
  const insertExercise = (userDocument, exercise, callback) => {
    userDocument.exercises.push(exercise)
    userDocument.markModified('exercises')
    userDocument.save((err) => {
      if (err) return callback(err)
      callback(null, userDocument)
    })
  }

  return { addUser, getUserById, getUserByName, getUsers, insertExercise }
}
