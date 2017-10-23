const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let articleSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    headline: { type : String,  required : REQUIRED_VALIDATION_MESSAGE },
    content: { type : String,  required : REQUIRED_VALIDATION_MESSAGE },
    tags: {type : String }
})
articleSchema.method({})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article
