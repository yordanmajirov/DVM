const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://admin:admin@ds115573.mlab.com:15573/rem-test',
    ADMIN_USERNAME: 'admin',
    ADMIN_PASSWORD: '123456',
    SESSION_SECRET: '123456',
    port: 3000
  },
  staging: {
  },
  production: {
    db: process.env.DB_PATH,
    port: process.env.PORT,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
  }
}
