const productController = require('../controllers/product.controller')

module.exports = function(app) {
  app.get('/api/all', productController.findAll)
  app.get('/api/:id', productController.oneProduct)
  app.post('/api/product/create', productController.createProduct)
  app.delete('/api/product/delete/:id', productController.deleteProduct)
  app.put('/api/product/update/:id', productController.updateProduct)
}