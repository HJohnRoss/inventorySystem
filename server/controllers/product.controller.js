const { Product } = require('../models/product.model')

module.exports.findAll = (req, res) => {
  Product.find({})
    .then(products => res.json(products))
    .catch(err => res.json(err))
}

module.exports.oneProduct = (req, res) => {
  Product.findById({ _id: req.params.id })
    .then(product => res.json(product))
    .catch(err => res.json(err))
}

module.exports.createProduct = (req, res) => {
  const { productName, skus, quantity } = req.body
  Product.create({
    productName,
    skus,
		quantity
  })
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err))
}

module.exports.deleteProduct = (req, res) => {
  Product.deleteOne({_id: req.params.id})
    .then(deleted => res.jsoon(deleted))
    .catch(err => res.json(err))
}

module.exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(updatedProduct => res.jason(updatedProduct))
    .catch(err => res.json(err))
}