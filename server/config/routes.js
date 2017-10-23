const user = require('../controllers/user')
const admin = require('../controllers/admin')
const auth = require('./auth')
module.exports = (app) => {
  
  app.use((req, res, next) => {
    let isAdmin = auth.isAuthenticated & auth.isInRole('Admin')
    res.locals.isAdmin = isAdmin
  })
  app.get('/', user.home.index)

  app.get('/privacy', user.home.privacy)
  app.get('/frequently-asked-questions', user.home.faq)
  
  app.post('/contactus', user.home.contactPost)

  app.get('/quick-quote', user.requests.quoteGet)
  app.post('/quick-quote', user.requests.quotePost)

  // app.get('/users/register', user.users.registerGet)
  // app.post('/users/register', user.users.registerPost)
  
  app.get('/login', admin.users.loginGet)
  app.post('/login', admin.users.loginPost)
  app.get('/logout', auth.isAuthenticated,auth.isInRole('Admin'), admin.users.logout)

  app.get('/admin/requests', auth.isAuthenticated, auth.isInRole('Admin'), admin.requests.browse)
  app.get('/admin/requests/archive', auth.isAuthenticated, auth.isInRole('Admin'), admin.requests.archive)
  app.get('/admin/requests/details/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.requests.details)
  app.get('/admin/requests/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.requests.deleteGet)
  app.post('/admin/requests/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.requests.deletePost)
  app.post('/admin/requests/mark-read/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.requests.markRead)

  app.get('/admin/articles', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.browse)
  app.get('/admin/articles/create', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.createGet)
  app.post('/admin/articles/create', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.createPost)
  app.get('/admin/articles/edit/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.editGet)
  app.post('/admin/articles/edit/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.editPost)
  app.get('/admin/articles/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.deleteGet)
  app.post('/admin/articles/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.articles.deletePost)

  app.get('/admin/items', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.browse)
  app.get('/admin/items/create', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.createGet)
  app.post('/admin/items/create', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.createPost)
  app.get('/admin/items/edit/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.editGet)
  app.post('/admin/items/edit/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.editPost)
  app.get('/admin/items/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.deleteGet)
  app.post('/admin/items/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.items.deletePost)

  app.get('/admin/messages', auth.isAuthenticated, auth.isInRole('Admin'), admin.messages.browse)
  app.get('/admin/messages/archive', auth.isAuthenticated, auth.isInRole('Admin'), admin.messages.archive)
  app.get('/admin/messages/details/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.messages.details)
  app.post('/admin/messages/mark-read/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.messages.markRead)
  app.get('/admin/messages/delete/:id', auth.isAuthenticated, auth.isInRole('Admin'), admin.messages.deleteGet)
  app.post('/admin/messages/delete/:id', auth.isAuthenticated,auth.isInRole('Admin'), admin.messages.deletePost)
  
  
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
