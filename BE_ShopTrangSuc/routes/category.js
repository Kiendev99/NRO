const router = require('express').Router()
const ctrls = require('../controllers/category')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', [verifyAccessToken, isAdmin],ctrls.createdCategory)
router.get('/',  ctrls.getAllCategory)
router.put('/:pcid',[verifyAccessToken, isAdmin], ctrls.updateCategory)
router.delete('/:pcid', [verifyAccessToken, isAdmin],ctrls.deleteCategory)



module.exports = router