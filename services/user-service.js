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

module.exports = { createNewUser, getAllUsers }
