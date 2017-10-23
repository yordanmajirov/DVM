const mongoose = require('mongoose')
const User = require('../data/User')
const Item = require('../data/Item')
const Request = require('../data/Request')
const Message = require('../data/Message')
const Article = require('../data/Article')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }
    console.log('MongoDB ready!')

    User.seedAdminUser(settings)
    Item.generate()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
