let Item = require('mongoose').model('Item')

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
        Item.find({})
        .then(items => {
            if (items.length < 1){
                count = 1
            } else {
                count = items.length
            }
            let maxPage = 1
            maxPage = Math.ceil(count / pageSize)
            if (page > maxPage) { page = maxPage }
            Item.find({})
                .skip((page-1)*pageSize)
                .limit(pageSize)
                .sort('name')
                .then(items => {
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
                    
                    res.render('admin/items/browse', {
                        items: items,
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
        res.render('admin/items/create', {
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
        let itemArgs = req.body
        if (!itemArgs.name){
            res.locals.globalError = 'Invalid item name'
            res.redirect('/admin/items/create')
        } else if (!itemArgs.price) {
            itemArgs.price = 0
        }
        Item
        .create(itemArgs)
        .then(item => {
            res.redirect('/admin/items')
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
        Item.findById(id).then(item => {
            res.render('admin/items/edit', {
                item: item,
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
        let itemArgs = req.body
        if (!itemArgs.name){
            res.locals.globalError = 'Invalid item name'
            res.redirect('/admin/items/edit')
        } else if (!itemArgs.price) {
            itemArgs.price = 0
        }
        Item.findOneAndUpdate({_id:id}, {
            name: itemArgs.name, 
            price: itemArgs.price 
        }).then(result => {
            res.redirect('/admin/items');
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
        Item.findById(id).then(item => {
            res.render('admin/items/delete', {
                item : item,
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
        Item.findOneAndRemove({_id : id}).then(result => {
            res.locals.globalError = 'Item #id: '+ id +' deleted.'
            res.redirect('/admin/items')
        })
    }
}