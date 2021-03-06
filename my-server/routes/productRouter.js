const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
//router.put('/', productController.update)
//router.delete('/:id', productController.delete)



module.exports = router