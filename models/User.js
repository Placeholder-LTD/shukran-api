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
    password: String,
    fullname: String,
    craft_type: String,
    account_name: String,
    account_number: String,
    summary: String,
    country: String,
    bank: String,
    phone: String,
    redirect: String,
    audience_size: String,
    primary_link: String,
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
        filename: String,
        file_type: String, // mime type
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
        file_id: String,
        description: String, // some text by the creator to make the product enticing to their audience.
    }],
    /* subscribers: [{
        email: String,
        amount: Number,
        due_time: String,
        start_time: String,
        permissions: [{
            id: String, // actually numbers as string
            file: String // the file id
        }],
    }] */
})

module.exports = mongoose.model('User', userSchema, 'users')