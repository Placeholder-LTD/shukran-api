const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: [true, 'Seems username already exists'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'Seems email already exists'],
        validate: [isEmail, 'Please provide a valid email']
    },
    password: { type: String },
    fullname: { type: String },
    craft_type: { type: String },
    account_name: { type: String },
    account_number: { type: String }, // 8-digits for UK banks/creators
    sort_code: { type: String }, // for UK creators/banks ... 6-digits
    summary: { type: String },
    country: { type: String },
    bank: { type: String },
    phone: { type: String },
    redirect: { type: String },
    audience_size: { type: String },
    primary_link: { type: String },
    picture_id: {
        type: String,
        default: '1aMDqEuCDesg0cTpHJj0IHehEDUEk3l_F', // '1l6Yn2_89KDaDZhH67Ge4Z6T8x7C0Q91J' // red shapes pattern
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    folder_id: { // google folder id
        type: String,
        default: null
    },
    content: [{
        filename: { type: String },
        file_type: { type: String }, // mime type
        created_at: {
            type: Date,
            default: Date.now
        },
        web_view_link: {
            type: String,
            default: null
        },
        web_content_link: {
            type: String,
            default: null
        },
        threshold: {
            amount: {
                type: Number,
                default: 0.00 // 0.00 means it's free
            },
            currency: { type: String }
        },
        file_id: { type: String },
        description: { type: String }, // some text by the creator to make the product enticing to their audience.
    }],
    /* subscribers: [{
        email: { type: String },
        amount: { type: Number },
        due_time: { type: String },
        start_time: { type: String },
        permissions: [{
            id: { type: String }, // actually numbers as string
            file: { type: String } // the file id
        }],
    }] */
})

module.exports = mongoose.model('User', userSchema, 'users')