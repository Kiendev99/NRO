const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploadImage = require('../config/cloudinary.config')

router.get('/filter', ctrls.getFilteredProducts);

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get('/', ctrls.getProducts)
router.get('/:pid', ctrls.getProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin],ctrls.deleteProduct)
router.put('/:pid', [verifyAccessToken, isAdmin],ctrls.updateProduct)

router.put('/upload/:pid', [verifyAccessToken, isAdmin],uploadImage.array('images',10), ctrls.uploadImageProduct)


router.put('/ratings',verifyAccessToken, ctrls.ratings)

module.exports = router