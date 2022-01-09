const express = require('express')
const orderController = require('./../controllers/orderController')
const authController = require('./../controllers/authController')
const orderRouter = express.Router();

orderRouter.post('/order/pay', authController.verifyToken, orderController.pay)
orderRouter.get('/order/:id', authController.verifyToken, orderController.getOrderById)
orderRouter.post('/order/create', authController.verifyToken, orderController.createObj)

module.exports = orderRouter