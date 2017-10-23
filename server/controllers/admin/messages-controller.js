let Message = require('mongoose').model('Message')
module.exports = {
    archive: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let page = 1
        if (req.query.page && !isNaN(req.query.page)){
            page = req.query.page
        }
        let pageSize = 20
        let count = -1
        Message.find({ replied : true })
        .then(messages => {
            if (messages.length < 1){
                count = 1
            } else {
                count = messages.length
            }
            let maxPage = 1
            maxPage = Math.ceil(count / pageSize)
            if (page > maxPage) { page = maxPage }
            Message.find({ replied : true })
                .skip((page-1)*pageSize)
                .limit(pageSize)
                .then(messages => {
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
                    
                    res.render('admin/messages/browse', {
                        messages: messages,
                        pagination: pagination,
                        isAuthenticated: isAuthenticated,
                        status: 'Read'
                    })
                })
        })
    },
    browse: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let page = 1
        if (req.query.page && !isNaN(req.query.page)){
            page = req.query.page
        }
        let pageSize = 20
        let count = -1
        Message.find({ replied : false })
        .then(messages => {
            if (messages.length < 1){
                count = 1
            } else {
                count = messages.length
            }
            let maxPage = 1
            maxPage = Math.ceil(count / pageSize)
            if (page > maxPage) { page = maxPage }
            Message.find({ replied : false})
                .skip((page-1)*pageSize)
                .limit(pageSize)
                .then(messages => {
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
                    
                    res.render('admin/messages/browse', {
                        messages: messages,
                        pagination: pagination,
                        isAuthenticated: isAuthenticated,
                        status: 'Unread'
                    })
                })
        })
    },
    details: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        Message.findById(id).then(message => {
            res.render('admin/messages/details', {
                message: message,
                isAuthenticated: isAuthenticated
            })
        })
    },
    deleteGet: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        Message.findById(id).then(message => {
            res.render('admin/messages/delete', {
                message: message,
                isAuthenticated: isAuthenticated
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
        Message.findOneAndRemove({_id : id}).then(result => {
            res.locals.globalError = `Message ${id} deleted.`
            res.redirect(`/admin/messages`)
        })
    },
    markRead: (req, res) => {
        let isAuthenticated = false
        if (req.user) {
            isAuthenticated = true
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        Message.findById(id).then(message => {
            message.replied = true
            message.save()
            res.redirect('/admin/messages')
        })
    }
}