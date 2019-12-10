'use strict'

const mongoose = require('../db/config/mongoose')
const UserService = require('../db/user-model')(mongoose)

const createNewUser = (request, callback) => {
  const username = request.body.username

  UserService.getUserByName(username, (err, user) => {
    if (!err && user) {
      const error = { message: 'username already taken' }
      return callback(error)
    }

    UserService.addUser(username, (addErr, data) => {
      if (addErr) return callback(addErr)
      // Return dto
      const { username, _id } = data // dto
      callback(null, { username, _id })
    })
  })
}

const getAllUsers = (callback) => {
  UserService.getUsers((err, users) => {
    if (err) return callback(err)
    callback(null, users)
  })
}

const addExercise = (request, callback) => {
  const exercise = request.body

  const { date } = exercise
  if (!date || !(/^\d{4}-\d{2}-\d{2}$/.test(date.trim()))) {
    exercise.date = new Date()
  } else {
    exercise.date = new Date(date)
  }

  UserService.getUserById(exercise.userId, (err, user) => {
    if (err || !user) {
      const error = { message: 'unknow _id' }
      return callback(error)
    }

    UserService.insertExercise(user, exercise, (err, newUser) => {
      if (err) return callback(err)
      const data = {
        _id: newUser.get('_id'),
        username: newUser.get('username'),
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toUTCString()
      }
      callback(null, data)
    })
  })
}

module.exports = { createNewUser, getAllUsers, addExercise }
