const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

// load environement configuration
dotenv.config()

const app = express()
const UserService = require('./services/user-service')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/api/exercise/users', (req, res, next) => {
  UserService.getAllUsers((err, allUsers) => {
    if (err) return next(err)
    res.json(allUsers)
  })
})

app.get('/api/exercise/log', (req, res, next) => {
  UserService.searchUsers(req, (err, result) => {
    if (err) return next(err)
    res.json(result)
  })
})

app.post('/api/exercise/new-user', (req, res, next) => {
  UserService.createNewUser(req, (err, user) => {
    if (err) return next(err)
    res.json(user)
  })
})

app.post('/api/exercise/add', (req, res, next) => {
  UserService.addExercise(req, (err, exercise) => {
    if (err) return next(err)
    res.json(exercise)
  })
})

// Not found middleware
app.use((req, res, next) => {
  next({ status: 404, message: 'not found' })
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  console.log('error', err)

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt').send(errMessage)
})

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
