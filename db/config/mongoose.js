const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_LAB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

module.exports = mongoose
