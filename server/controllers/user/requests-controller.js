let Request = require('mongoose').model('Request')

module.exports = {
  quoteGet: (req, res) => {
    let Item = require('mongoose').model('Item')
    Item.find({}).sort('name').then(items => {
      res.render('home/quote', { 
        items : items,
      })
    })
  },
  quotePost: (req, res) => {
    let requestArgs = req.body
    requestArgs.replied = false
    Request.create(requestArgs).then(request => {
      res.render('home/result', {
          message : 'Your request have been recieved. We will contact you shortly with your quote.'
      })
    }).catch(err => {
      res.render('home/index', { 
        globalError : 'Error sending request. '
      })
    })
  },
}