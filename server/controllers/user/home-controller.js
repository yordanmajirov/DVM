module.exports = {
  index: (req, res) => {
    let isAuthenticated = false
    if (req.user) {
      isAuthenticated = true
    }
    res.render('home/index', {isAuthenticated : isAuthenticated, home : true})
  },
  privacy: (req, res) => {
    let isAuthenticated = false
    if (req.user) {
      isAuthenticated = true
    }
    res.render('home/privacy', {isAuthenticated : isAuthenticated})
  },

  contactPost: (req, res) => {
    let isAuthenticated = false
    if (req.user) {
      isAuthenticated = true
    }
    let Message = require('mongoose').model('Message')
    
    let messageArgs = {
      from : req.body.email,
      subject : req.body.subject,
      text : req.body.message,
      replied : false
    }
    
    Message
    .create(messageArgs)
    .then(message => {
      res.render('home/result', {
          message : 'We will get back to you as soon as possible.'
      })
    })
    .catch(err => {
      res.locals.globalError = "Message not sent!"
      res.redirect(`/`)
    })
  },
  faq: (req, res) => {
    let Article = require('mongoose').model('Article')
    let page = 1
        if(req.query.page && !isNaN(req.query.page)){
            page = req.query.page
        }
        let pageSize = 20
        let count = -1
        Article.find({})
        .then(articles => {
            if (articles.length < 1){
                count = 1
            } else {
                count = articles.length
            }
            let maxPage = 1
            maxPage = Math.ceil(count / pageSize)
            if (page > maxPage) { page = maxPage }
            Article.find({})
                .skip((page-1)*pageSize)
                .limit(pageSize)
                .sort('date')
                .then(articles => {
                    let pagination = {
                        previous: 1,
                        current: page,
                        next: maxPage,
                        max: maxPage
                    }
                    if (page > 1){
                        pagination.previous = parseInt(page - 1)
                    }
                    if (page < maxPage){
                        pagination.next = parseInt(page + 1)
                    }
                    res.render('home/faq', {
                        articles: articles,
                        pagination : pagination,
                    })
                })
        })
  },
  readArticle: (req, res) => {
    let id = req.params.id
    let Article = require('mongoose').model('Article')
    Article.findById(id).then(article => {
      res.render('home/article', {
        article: article
      })
    })
  }
}
