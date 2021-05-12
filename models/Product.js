const mongoose = require('mongoose')

const ProdSchema = mongoose.Schema({
    created_by: { type: String }, // username for the creator
    product_name: { type: String }, // the name of the product
    amount: { type: String }, // cost of the product
    product_link: { type: String }, // link to download the product after payment has been made
    currency: { type: String }, 
    cover_image: { type: String },
    created: {
        type: Date,
        default: Date.now
    },
    description: { type: String }, // some text by the creator to make the product enticing to their audience.
})

module.exports = mongoose.model('Product', ProdSchema)