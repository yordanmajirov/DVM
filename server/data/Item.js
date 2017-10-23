const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let itemSchema = new mongoose.Schema({
  name: {type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true},
  price: { type : Number, required: REQUIRED_VALIDATION_MESSAGE }
})
itemSchema.method({})

let Item = mongoose.model('Item', itemSchema)
module.exports = Item

module.exports.generate = () => {
  let itemsList = [
    "Air Cooler","Animal Cage","Arm Chair","Arm Chair(large)","Bag (Small)","Bag (Medium)",
    "Bag (Large)","BBQ (Small)","BBQ (Large)","Bed (Bunks)","Bed (Double)","Bed (King)",
    "Bed (Mattress Only King)","Bed (Mattress Only Queen)","Bed (Single)","Bedside Drawers",
    "Bedside Table","Bicycle","Bird Cage","Buffet (Small)","Buffet (Large)","Camping Equipment",
    "Carton (Small)","Carton (Large)","Carton (Oversized)","Ceramic Item (Large)","Ceramic Item (small)",
    "Chair Dining","Chair Dining (With Arms)","Chair Office (small)","Change Table","Chest","Childs Chair",
    "Childs Play Centre","Childs Table","Clock Large (standing)","Clock Small (wall)","Coat Rack","Couch (2 Seater)",
    "Couch (2.5 Seater)","Couch (3 Seater)","Couch (4 Seater)","Desk","Desk & Hutch large","Filing Cabinet (Small)",
    "Filling Cabinet (Large)","Freezer (Chest - Small)","Freezer (Chest - Large)","Freezer (Upright - Small)",
    "Freezer (Upright- Large)","Fridge (Bar)","Fridge (Small)","Fridge (Medium)","Fridge (Large)","Hat Stand","High Chair","Ironing Board","Organ",
    
    "Other (Please describe in the field below)",
    
    "Piano","Potted Plants (Small)","Potted Plants (Medium)",
    "Potted Plants (Large)","Rocking Chair","Sewing Machine","Sewing Machine (Trundle)","Slide","Sofa Bed","Speakers (Small)",
    "Speakers (Surround)","Stereo (Small)","Stereo (Large)","Stool","Stove","Suitcase (Small)","Suitcase (Large)","Surf Board","Table (Dining small up to 4 people)",
    "Table (Folding)","Table (Hall)","Table (Large Please state estimate size in message.)","Table (Small)","Table Plastic",
    "Tent","Tool Box (Large)","Tool Box (Small)","Towel Rack","Trampoline","TV (Up to 90 cm)","TV (Large over 90cm)",
    "TV Cabinet (Small)", "TV Cabinet (Large)","TV Plasma/LCD","TV Projector Screen","Wall Unit (Small)","Wall Unit (Large)"
    ,"Wardrobe (2 Door)","Wardrobe (3 Door)","Wardrobe (4 Doors)","Washing Machine (Small)","Washing Machine (Large)"
]
  itemsList.forEach(itemName => {
    Item
    .findOne({name: itemName })
    .then(item => {
      if (!item) {
        Item.create({
          name : itemName,
          price: 0
        }).then().catch(err => {
          console.log(err)
        })
      }
    })
  })
}