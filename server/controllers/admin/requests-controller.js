let Request = require('mongoose').model('Request')

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
        Request.find({ replied : true })
        .then(requests => {
            if (requests.length < 1){
                count = 1
            } else {
                count = requests.length
            }
            let maxPage = 1
            maxPage = Math.ceil(count / pageSize)
            if (page > maxPage) { page = maxPage }
            Request.find({ replied : true })
                .skip((page-1)*pageSize)
                .limit(pageSize)
                .then(requests => {
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
                    
                    res.render('admin/requests/browse', {
                        requests: requests,
                        pagination: pagination,
                        isAuthenticated: isAuthenticated,
                        status: 'Read'
                    })
                })
        })
    },
    
    browse : (req, res) => {
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
        Request.find({ replied : false })
        .then(requests => {
            if (requests.length < 1){
                count = 1
            } else {
                count = requests.length
            }
            let maxPage = 1
            maxPage = Math.ceil(count / pageSize)
            if (page > maxPage) { page = maxPage }
            Request.find({ replied : false })
                .skip((page-1)*pageSize)
                .limit(pageSize)
                .then(requests => {
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
                    
                    res.render('admin/requests/browse', {
                        requests: requests,
                        pagination: pagination,
                        isAuthenticated: isAuthenticated,
                        status: 'Unread'
                    })
                })
        })
    },
    deleteGet: (req, res) => {
        let isAuthenticated = false
        if (req.user){
            isAuthenticated = true;
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        Request.findById(id).then(request => {
            res.render('admin/requests/delete', {request, isAuthenticated :isAuthenticated})
        })
    },    
    deletePost: (req, res) => {
        let isAuthenticated = false
        if (req.user){
            isAuthenticated = true;
        } else {
            res.redirect('/')
        }
        let id = req.params.id
        Request.findOneAndRemove({_id : id}).then(result => {
            res.redirect('/admin/requests')
        })
    },
    details : (req, res) => {
        let isAuthenticated = false 
        if (req.user) {
            isAuthenticated = true
        }
        let id = req.params.id
        Request
        .findById(id)
        .populate({path: 'items'})
        .then(request => {
            console.log(request)
            res.render('admin/requests/details', {
                request: request, 
                items: request.items,
                isAuthenticated : isAuthenticated
            })
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
        Request.findById(id).then(request => {
            request.replied = true
            request.save()
            res.redirect('/admin/requests')
        })
    }
}