const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createdCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.create(req.body)
    return res.json({
        success : response ? 'Thêm BlogCategory thành công' : false,
        createdCategory : response ? response : 'Ko thêm BlogCategory được!!'
    })
})



const getAllCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.find().select('title _id')
    return res.json({
        success : response ? 'Hiển thị BlogCategory thành công' : false,
        getAllCategory : response ? response : 'Ko hiển thị BlogCategory được!!'
    })
})



const updateCategory = asyncHandler(async(req,res)=>{
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid,req.body,{new:true})
    return res.json({
        success : response ? 'Cập nhập BlogCategory thành công' : false,
        updateCategory : response ? response : 'Ko cập nhập category được!!'
    })
})



const deleteCategory = asyncHandler(async(req,res)=>{
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndDelete(bcid)
    return res.json({
        success : response ? 'Xóa BlogCategory thành công' : false,
        deleteCategory : response ? response : 'Ko xóa category được!!'
    })
})

module.exports = {
    createdCategory,
    getAllCategory,
    updateCategory,
    deleteCategory

}
