const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.signToken = function(_id) {
    return jwt.sign({
            _id
        },
        process.env.JSON_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
}

exports.login = async(req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }
    var user = await User.findOne({ email: req.body.email }).select('+password').populate('cart.itemId');
    if (!user)
        return res.status(400).json({ message: 'Either email or password is wrong' });
    if (!(await user.matchPassword(user.password, req.body.password))) {
        return res.status(401).json({ message: 'Either username or password is wrong' });
    }
    const token = this.signToken(user._id);
    // user.token = token
    user = user.toObject();
    delete user.password
    return res.status(200).json({ message: 'Log In Successful!', user, token });
}

exports.signUp = async(req, res, next) => {
    let user = {}
    user.name = req.body.name;
    user.email = req.body.email,
        user.password = req.body.password,
        user.passwordConfirm = req.body.passwordConfirm
    user.address = req.body.address

    user.mobile = req.body.mobile
    user.gender = req.body.gender
    user.photo = req.body.photo
    try {
        const createdUser = await User.create(user);
        const token = this.signToken(createdUser._id);
        return res.status(200).json({
            message: `User saved!`,
            createdUser,
            token
        });
    } catch (e) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'User with this email/mobile already exists. Try using different email or mobile number.'
        });
    }
}

exports.verifyToken = async(req, res, next) => {
    try {
        if ((!req.headers.authorization) || !(req.headers.authorization.startsWith("Bearer "))) {
            return res.status(400).json({ message: 'Token Not Found' })
        }
        const token = req.headers.authorization.split(' ')[1];

        // 2. VERIFY THE TOKEN - THAT THE TOKEN HAS NOT BEEN TAMPERED
        // if valid- returns the payload (id,issuedAt,expireOn) else returns nothing
        if (!decoded)
            return res.status(400).json({ message: `The token was either invalid or expired` });
        const currentUser = await User.findById(decoded._id);
        if (!currentUser)
            return res.status(400).json({ message: 'Token Invalid' })
        if (req.headers.logincheck == 'true')
            return res.status(200).json({ message: 'Success', currentUser });
        req.user = currentUser
        next();
    } catch (e) {
        res.status(400).json({ message: 'There was some error in verifying the token' })
    }
}