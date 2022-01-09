const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty. Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty. Please provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    address: [{
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
        },
        _id: false
    }],
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    }],
    cart: [new mongoose.Schema({
        qty: { type: Number, default: 1 },
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        _id: false
    })],
    mobile: {
        type: String,
        required: [true, 'Please provide your mobile number']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Please set the gender']
    },
    password: {
        type: String,
        minLength: 8,
        required: [true, "Password cannot be empty. Please provide a password"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(val) {
                return val === this.password
            },
            message: "Password don't match. Please try again"
        }
    },
    photo: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png'
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined
    next();
});
userSchema.pre(/^find/, function(next) {
    this.populate('cart.itemId');
    next();
});
userSchema.methods.matchPassword = async function(hashedPassword, proposedPassword) {
    const result = await bcrypt.compare(proposedPassword, hashedPassword);
    return result
}
User = mongoose.model('User', userSchema);

module.exports = User