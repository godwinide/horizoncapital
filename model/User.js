const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    leverage: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clearPassword: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    deposits: {
        type: Number,
        required: false,
        default: 0
    },
    earnings: {
        type: Number,
        required: false,
        default: 0
    },
    withdrawn: {
        type: Number,
        required: false,
        default: 0
    },
    withdrawal_fee: {
        type: Number,
        required: false,
        default: 0
    },
    account_plan: {
        type: String,
        required: false,
        default: "STARTER ($1,000 - $10,000)"
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    activated: {
        type: Boolean,
        required: false,
        default: false
    },
    upgraded: {
        type: Boolean,
        required: false,
        default: false
    },
    pin: {
        type: Number,
        required: false,
        default: Number(String(Math.random()).slice(2, 8))
    },
    userIP: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

module.exports = User = model("User", UserSchema);