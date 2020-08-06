const boom = require('boom')
const Product = require('../models/Product')

exports.createProduct = async(req, res) => {
    try {
        const products = new Product(req.body)
        return products.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.findMyProducts = async(req, res) => {
    try {
        const username = req.body.username;
        const creator_products = Product.find({'created_by': username})
        return creator_products
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.updateProduct = async(req, res) => {
    try {
        const id = req.body.id
        const product = req.body
        const { ...updateData } = product
        const update = await Product.findByIdAndUpdate(id, updateData, { new: true })
        return update
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteProduct = async (req, reply) => {
    try {
        var id = req.body.id
        var product = Product.findByIdAndDelete(id)
        return product
    } catch (error) {
        throw boom.boomify(error)
    }
}