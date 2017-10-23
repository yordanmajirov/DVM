let Article = require('mongoose').model('Article')

module.exports = {
    browse: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect(`/`)
        }
        let page = 1
        if(req.query.page && !isNaN(req.query.page)){
            console.log('req.query.page='+req.query.page)
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
                    res.render('admin/articles/browse', {
                        articles: articles,
                        pagination : pagination,
                        isAuthenticated: isAuthenticated
                    })
                })
        })
    },
    createGet: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect(`/`)
        }
        res.render('admin/articles/create', {
            isAuthenticated: isAuthenticated
        })
    },
    createPost: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect(`/`)
        }
        let articleArgs = req.body
        if (!articleArgs.headline){
            let globalError = 'Invalid article headline'
            res.render('armin/articles/create', {
                article: articleArgs,
                globalError: globalError
            })
        } else if (!articleArgs.content) {
            let globalError = 'Invalid article headline'
            res.render('armin/articles/create', {
                article : articleArgs,
                globalError: globalError
            })
        }
        Article
        .create(articleArgs)
        .then(article => {
            res.redirect('/admin/articles')
        })
        .catch(err => {
            if(err){
                console.log(err)
                return
            }
        })
    },
    editGet: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect(`/`)
        }
        let id = req.params.id
        Article.findById(id).then(article => {
            res.render('admin/articles/edit', {
                article: article,
                isAuthenticated: isAuthenticated
            })
        })
    },
    editPost: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        let articleArgs = req.body
        if (!articleArgs.headline){
            let globalError = 'Invalid headline.'
            res.render('admin/article/edit', {
                article: articleArgs,
                globalError: globalError
            })
        } else if (!articleArgs.content) {
            let globalError = 'Invalid content.'
            res.render('admin/article/edit', {
                article: articleArgs,
                globalError: globalError
            })
        }
        Article.findOneAndUpdate({_id:id}, {
            headline: articleArgs.headline, 
            content: articleArgs.content 
        }).then(result => {
            res.redirect('/admin/articles');
        }).catch(err => {
            console.log(err)
        })
    },
    deleteGet: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect(`/`)
        }
        let id = req.params.id
        Article.findById(id).then(article => {
            res.render('admin/articles/delete', {
                article :article,
                isAuthenticated : isAuthenticated
            })
        })
    },
    deletePost: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        Article.findOneAndRemove({_id : id}).then(result => {
            res.redirect('/admin/articles')
        })
    }
}