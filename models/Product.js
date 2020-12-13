const mongoose = require('mongoose')

const ProdSchema = mongoose.Schema({
    created_by: String, // username for the creator
    product_name: String, // the name of the product
    amount: String, // cost of the product
    product_link: String, // link to download the product after payment has been made
    currency: String, 
    cover_image: String,
    created: {
        type: Date,
        default: Date.now
    },
    description: String, // some text by the creator to make the product enticing to their audience.
})

module.exports = mongoose.model('Product', ProdSchema)