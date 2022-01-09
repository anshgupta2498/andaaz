const express = require('express')
const userRouter = express.Router();
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

userRouter.get('/', (req, res, next) => {
    return res.json({
        name: "Ansh"
    })
})
userRouter.post('/user', authController.signUp)
userRouter.post('/login', authController.login)
userRouter.post('/addToCart', authController.verifyToken, userController.addToCart)
userRouter.post('/verify', authController.verifyToken)
userRouter.post('/updateMe', authController.verifyToken, userController.updateMe)

module.exports = userRouter