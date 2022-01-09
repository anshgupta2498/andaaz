const express = require('express')
const itemRouter = express.Router();
const itemController = require('./../controllers/itemController')
const authController = require('./../controllers/authController')

itemRouter.get('/item/:id', itemController.getItemById)
itemRouter.post('/', itemController.getCategorizedItems)
itemRouter.get('/', itemController.getAllItems)
itemRouter.post('/item', itemController.createItem)


module.exports = itemRouter