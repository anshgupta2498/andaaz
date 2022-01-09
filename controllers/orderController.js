const mongoose = require('mongoose')
const Order = require('./../models/orderModel');

exports.pay = (req, res, next) => {
    var card = '12121212'
    var expiry = '2023-04'
    var cvv = '123'
    var name = 'Ansh Gupta'
    if (card == req.body.cardNo &&
        expiry == req.body.expiry &&
        cvv == req.body.cvv &&
        name == req.body.name
    )
        return res.status(200).json({
            message: `Card Details Validated. Order places`
        });
    return res.status(400).json({
        message: 'Invalid Card Details'
    })
}

exports.createObj = async(req, res, next) => {
    if (!req.body) {
        return res.status(404).json({
            message: 'Please provide order detaials'
        })
    }
    let order = {}
    order.item = req.body.item
    order.user = req.body.user
    order.totalPrice = req.body.totalPrice
    order.shippingAddress = req.body.shippingAddress
    try {
        const order_created = await Order.create(req.body)
        return res.status(200).json({
            message: `Order placed`,
            order_created
        });
    } catch (e) {
        res.status(400).json({ message: 'There was some error in placing the order' })
    }
}


exports.getOrderById = async(req, res, next) => {
    var order_id = req.params.id
    const order = await Order.findById(order_id).populate('item.item_id')
    return res.status(200).json({
        message: `Order placed`,
        order
    });
}