const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let requestSchema = new mongoose.Schema({
  name: { type: String, def : 'Not provided by user.'},
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  phone: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  date: { type: Date, def : 'Not provided by user.'},
  from: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  to: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  replied: {type : Boolean, def: false},
  message: { type: String, def : 'No message.'}
})
requestSchema.method({})

let Request = mongoose.model('Request', requestSchema)
module.exports = Request
