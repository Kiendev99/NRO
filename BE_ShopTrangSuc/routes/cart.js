// routes/cartRoutes.js

const express = require('express');
const cartController = require('../controllers/cart');

const router = express.Router();


router.get('/getCartUser/:id', cartController.getCartByUser);
router.post('/addToCart', cartController.addToCart);
router.delete('/deleteCart/:id', cartController.deleteCart);
router.put('/updateQuantity/:id', cartController.updateQuantity);
router.get('/viewCart/:id', cartController.viewCart);

module.exports = router;
