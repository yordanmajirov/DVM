const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let messageSchema = new mongoose.Schema({
  from: { type: String, required : REQUIRED_VALIDATION_MESSAGE },
  subject: { type : String,  required : REQUIRED_VALIDATION_MESSAGE },
  text: { type : String,  required : REQUIRED_VALIDATION_MESSAGE },
  replied: { type : Boolean, def : false }
})
messageSchema.method({})

let Message = mongoose.model('Message', messageSchema)
module.exports = Message
