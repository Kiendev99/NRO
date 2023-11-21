const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')



const createdCoupon = asyncHandler(async(req,res)=>{
    const { name, discount,exipiry} = req.body
    if(!name || !discount || !exipiry) throw new Error("Ko dc bo trong")
    const response = await Coupon.create({
        ...req.body,
        exipiry: Date.now() + + exipiry*24*60*60*1000
    })
    return res.json({
        success : response ? 'Thêm Coupon thành công' : false,
        createdCoupon : response ? response : 'Ko thêm Coupon được!!'
    })
})




const getCoupons = asyncHandler(async(req,res)=>{
    const response = await Coupon.find().select('-createAt -updateAt')
    return res.json({
        success : response ? 'Thêm Coupon thành công' : false,
        getCoupons : response ? response : 'Ko thêm Coupon được!!'
    })
})




const updateCoupon = asyncHandler(async(req,res)=>{
    const { cid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Ko dc bo trong')
    if(req.body.exipiry) req.body.exipiry = Date.now() + + req.body.exipiry*24*60*60*1000
    const response = await Coupon.findByIdAndUpdate(cid,req.body,{new:true})
    return res.json({
        success : response ? 'Cap nhap Coupon thành công' : false,
        updateCoupon : response ? response : 'Ko thêm Coupon được!!'
    })
})




const deleteCoupon = asyncHandler(async(req,res)=>{
    const { cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.json({
        success : response ? 'Xoa Coupon thành công' : false,
        deleteCoupon : response ? response : 'Ko xoa Coupon được!!'
    })
})
module.exports = {
    createdCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
}