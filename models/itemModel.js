const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item_category: {
        type: String,
        enum: ['Footwear', 'Bottomwear', 'Topwear', 'Watches', 'Jewellery', 'Home', 'Electronics', 'Toys'],
        required: [true, 'An item must be linked to a category']
    },
    item_brand: {
        type: String,
        required: [true, 'Please provide the item brand']
    },
    item_title: {
        type: String,
        required: [true, 'An item must have a title']
    },
    item_description: {
        type: String,
        required: [true, 'An item must have a description']
    },
    item_price: {
        type: String,
        required: [true, 'An item must have a price']
    },
    item_image: {
        type: String,
        required: [true, 'An item must have an image']
    },
    item_gender: {
        type: String,
        enum: ['Male', 'Female', 'Unisex', 'NA'],
        default: 'NA'
    }
})

Item = mongoose.model('Item', itemSchema);

module.exports = Item