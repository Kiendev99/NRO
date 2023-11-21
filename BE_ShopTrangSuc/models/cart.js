const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      size: {
        type: Number,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      image: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: 'Product',
      }
    }
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
