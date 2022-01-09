const User = require('./../models/userModel');
const mongoose = require('mongoose');
exports.getUserById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        // const result = await user.matchPassword(user.password, "hahaha");
        console.log(result);
        res.status(200).json({
            status: 'OK',
            message: `Showing user with id: ${req.params.id}`,
            user
        });
    } catch (e) {
        res.status(404).json({ message: `User with id ${req.params.id} not found` })
    }
}

exports.addToCart = async(req, res, next) => {
    console.log(req.body.itemId);
    try {
        const user = await User.findOneAndUpdate({ email: req.body.email }, { $push: { cart: { itemId: mongoose.Types.ObjectId(req.body.itemId) } } }, {
            new: true,
            runValidators: true
        });
        console.log(user)
        res.status(200).json({
            message: `Added to cart`,
            user
        });
    } catch (e) {
        res.status(400).json({ message: `There was some issue in adding the item to cart. please try again later` })
    }
}

exports.updateMe = async(req, res, next) => {
    console.log("in")
    console.log(req.body.cart);
    try {
        const user = await User.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
            runValidators: true
        });
        console.log(user)
        res.status(200).json({
            message: `Updated User`,
            user
        });
    } catch (e) {
        return res.status(404).json({ message: 'Err.. User not found' })
    }
}