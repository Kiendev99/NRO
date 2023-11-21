const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')


const asyncHandler = require('express-async-handler')


// Thêm Giỏ hàng
const createOrder = asyncHandler(async(req,res)=>{
    const { _id } = req.user
    const { coupon } = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product','title price')
    const products = userCart?.cart?.map(el => ({
        product:el.product._id,
        count: el.quantity,
        size: el.size
    }))
    let total = userCart?.cart?.reduce((sum,el) => el.product.price * el.quantity + sum , 0)
    const createData = {products,total,orderBy: _id}
    if(coupon){
        const selecteCoupon = await Coupon.findById(coupon)
        total = Math.round(total * (1 - +selecteCoupon.discount / 100) / 1000) * 1000 || total
        createData.total = total
        createData.coupon = coupon
    }
    const response = await Order.create(createData)
    return res.json({
        success : response ? 'Thêm Order thành công' : false,
        response : response ? response : 'Ko thêm Order được!!'
    })
})



const updateStatus = asyncHandler(async(req,res)=>{
    const { oid } = req.params
    const { status } = req.body
    if(!status) throw new Error('Yeu cau trang thai')
    const response = await Order.findByIdAndUpdate(oid, { status }, {new:true})
    return res.json({
        success : response ? 'Thêm Order thành công' : false,
        response : response ? response : 'Ko thêm Order được!!'
    })
})



const getUserOrder = asyncHandler(async(req,res)=>{
    const { _id } = req.user
    const response = await Order.find({orderBy : _id})
    return res.json({
        success : response ? 'Thêm Order thành công' : false,
        response : response ? response : 'Ko thêm Order được!!'
    })
})



const getAllOrders = asyncHandler(async(req,res)=>{
    const response = await Order.find()
    return res.json({
        success : response ? 'Hien thi Order thành công' : false,
        response : response ? response : 'Ko thêm Order được!!'
    })
})

module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getAllOrders
}