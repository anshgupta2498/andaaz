const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    item: [{
        item_id: {
            ref: 'Item',
            type: mongoose.Schema.ObjectId,
            required: [true, 'An order must be associate with an item']
        },
        quantity: {
            type: Number,
            required: [true, 'Item Qty not found']
        },
        _id: false
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'An order must be associated to a user']
    },
    shippingAddress: {
        house: {
            type: String,
            required: [true, 'Please provide the house number']
        },
        street: {
            type: String,
            required: [true, 'Please provide the street name']
        },
        city: {
            type: String,
            required: [true, 'Please provide the city']
        },
        state: {
            type: String,
            required: [true, 'Please provide the state']
        }
    },
    totalPrice: {
        type: String,
        required: [true, 'Order total is a must']
    }
})

Order = mongoose.model('Order', orderSchema);

module.exports = Order