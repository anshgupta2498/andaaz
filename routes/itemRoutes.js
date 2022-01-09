const express = require('express')
const itemRouter = express.Router();
const itemController = require('./../controllers/itemController')
const authController = require('./../controllers/authController')

itemRouter.get('/', (req, res, next) => {
        return res.json({
            name: "Ansh"
        })
    })
    // itemRouter.get('/item/:id', itemController.getItemById)
itemRouter.get('/item/:id', itemController.getItemById)
itemRouter.post('/', itemController.getCategorizedItems)
itemRouter.get('/', itemController.getAllItems)
itemRouter.post('/item', itemController.createItem)


module.exports = itemRouter