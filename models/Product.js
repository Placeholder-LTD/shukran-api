const mongoose = require('mongoose')

const ProdSchema = mongoose.Schema({
    created_by: String, //username for the creator
    product_name: String, //the name of the product
    amount: String, // cost of the product
    product_link: String, //link to download the product after payment has been made
    //(there is a way we can reset google docs to add a poduct and then allow that link be downloadable).
    currency: String, //Obviously 
    cover_image: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', ProdSchema)