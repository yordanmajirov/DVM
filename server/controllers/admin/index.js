const users = require('./users-controller')
const items = require('./items-controller')
const requests = require('./requests-controller')
const messages = require('./messages-controller')
const articles = require('./articles-controller')
module.exports = {
  users: users,
  requests: requests,
  items : items,
  messages : messages,
  articles : articles
}
