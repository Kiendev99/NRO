const Cart = require('../models/cart');
const userModel = require ('../models/user');

// const asyncHandler = require ('../middlewares/errHandler')
const getCartByUser = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId).populate("products._id");
    console.log(cart);

    return res.status(200).json({
      message: "Thông tin giỏ hàng",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

const addToCart = async (req, res) => {
  const productId = req.body.product;
  const quantity = req.body.quantity || 1;
  const size = req.body.size;
  const userId = req.body.userId

  try {
    const user = await userModel.findById(userId);
    const cart = await Cart.findById(user.cart);

    if (!cart) {
      const newCart = new Cart({
        products: [{ product: productId, quantity, size }],
      });

      const data = await newCart.save();
      user.cart = data._id;
      await user.save();
    } else {
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity: quantity ,size:size});
      }

      await cart.save();
    }

    return res.status(200).json({
      message: "Sản phẩm đã được thêm vào giỏ hàng",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};




const updateQuantity = async (req, res) => {
  const { id, size } = req.params;
  const { quantity, change } = req.body;

  try {
    const cartItem = await Cart.findOne({ id, size });

    if (cartItem) {
      if (change === 'increase') {
        cartItem.quantity += 1;
      } else if (change === 'decrease') {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          await Cart.deleteOne({ _id: cartItem._id });
          res.json({ message: 'Đã xóa khỏi giỏ hàng' });
          return;
        }
      } else if (Number.isInteger(quantity) && quantity >= 1) {
        cartItem.quantity = quantity;
      } else {
        res.status(400).json({ error: 'Invalid request' });
        return;
      }

      const itemTotal = cartItem.quantity * cartItem.product[0].productId.price;
      cartItem.total = Number.isNaN(itemTotal) ? 0 : itemTotal;

      await cartItem.save();

      const cartItems = await Cart.find().populate("product.productId");
      const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);

      res.json({ message: 'Cập nhật số lượng thành công', cart: cartItem, totalQuantity, totalPrice });
    } else {
      res.status(404).json({ error: 'Sản phẩm không trong giỏ hàng' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi kết nối' });
  }
};


// Giả sử bạn có một route hoặc hàm để người dùng đăng nhập, bạn có thể cập nhật như sau:

const deleteCart = async (req, res) => {
  const { _id } = req.user;
  const { cartId } = req.body;

  if (!cartId) {
      return res.status(400).json({ success: false, error: 'Cart ID is required.' });
  }

  try {
      const user = await User.findById(_id).select('cart');

      if (!user) {
          return res.status(404).json({ success: false, error: 'User not found.' });
      }

      // Find the index of the cart item to be removed
      const cartIndex = user.cart.findIndex(cartItem => cartItem._id.toString() === cartId);

      if (cartIndex === -1) {
          return res.status(404).json({ success: false, error: 'Cart item not found.' });
      }

      // Remove the cart item using splice
      user.cart.splice(cartIndex, 1);

      // Save the updated user
      await user.save();

      // Recalculate total amount for the entire cart
      const updatedUser = await User.findById(_id).select('cart');
      const totalAmount = updatedUser?.cart?.reduce((sum, item) => sum + item.total, 0) || 0;

      return res.status(200).json({
          success: true,
          message: 'Mục giỏ hàng đã được xóa thành công',
          totalAmount: totalAmount,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


const viewCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("product.productId");
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);

    res.json({ cart: cartItems, totalQuantity, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi kết nối' });
  }
};

module.exports = {
  updateQuantity,
  addToCart,
  viewCart,
  getCartByUser,
  deleteCart
};
