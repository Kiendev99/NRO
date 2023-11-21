const e = require('express')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify') //npm i slugify

// Thêm sản phẩm
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Ko được bỏ trống')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? 'Thêm sản phẩm thành công' : false,
        createdProduct: newProduct ? newProduct : 'KO thêm được sản phẩm mới'
    })
})
// Hiển thị 1 sản phẩm
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? 'Hiển thị sản phẩm thành công' : false,
        productData: product ? product : 'KO có sản phẩm'
    })
})
// Hiển thị tất cả sản phẩm
// Filtering, sorting & pagination (Lọc Sắp xếp và phân trang)
const getProducts = asyncHandler(async (req, res) => {
    const queries = {...req.query}
    // tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit','sort','page','fields']
    excludeFields.forEach(el => delete queries[el]);

    //Format lại các operators cho đúng cú pháp mongoose 
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formattedQueries = JSON.parse(queryString)
    // Filtering lọc
    if(queries?.title) formattedQueries.title = {$regex:queries.title,$options:'i'}
	
    // Pagination
    const page = +req.query.page || 1; // Trang hiện tại
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS // Số lượng sản phẩm trên mỗi trang
    const skip = (page -1) * limit
    try {

        // Tạo đối tượng truy vấn
        let queryCommand = Product.find(formattedQueries);



        // Fields limiting (Hạn chế trường)
          if (req.query?.fields) {
            const fieldsToInclude = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fieldsToInclude);
        }


        //Sắp xếp
        if (req.query?.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryCommand = queryCommand.sort(sortBy);
        } else {
            queryCommand = queryCommand.sort('_id'); // Sắp xếp theo trường _id mặc định nếu không có trường sort được chỉ định
        }



        // Phân trang
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments(formattedQueries);
        queryCommand = queryCommand.skip(startIndex).limit(limit);
        queryCommand.skip(skip).limit(limit)



        // Thực thi truy vấn
        const response = await queryCommand.exec();
        

        // Đếm số lượng sản phẩm thỏa mãn điều kiện
        const counts = await Product.find(formattedQueries).countDocuments();


        // Tạo đối tượng phân trang 
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }
        return res.status(200).json({
            success: response.length > 0 ? 'Hiển thị sản phẩm thành công' : false,
            counts,
            productDatas: response.length > 0 ? response : 'Không có sản phẩm',
            pagination
        });
    } catch (err) {
        throw new Error(err.message);
    }


   
    
   
})
const getFilteredProducts = async (req, res) => {
    try {
        const { title, minPrice, maxPrice } = req.query;

        const filterConditions = {};

        if (title) {
            filterConditions.title = { $regex: title, $options: 'i' };
        }

        if (minPrice) {
            filterConditions.price = { $gte: parseFloat(minPrice) };
        }

        if (maxPrice) {
            filterConditions.price = {
                ...filterConditions.price,
                $lte: parseFloat(maxPrice),
            };
        }

        const filteredProducts = await Product.find(filterConditions);

        return res.status(200).json({
            success: filteredProducts.length > 0,
            productData: filteredProducts.length > 0 ? filteredProducts : 'Không có sản phẩm phù hợp',
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
// cập nhập sản phẩm
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? 'Cập nhập sản phẩm thành công' : false,
        updatedProduct: updatedProduct ? updatedProduct : 'KO cập nhập được sản phẩm'
    })
})

// Xóa sản phẩm
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? 'Xóa sản phẩm thành công' : false,
        deletedProduct: deletedProduct ? deletedProduct : 'KO xóa được sản phẩm'
    })
})
// upload images
const uploadImageProduct = asyncHandler(async(req,res)=>{
   
    const {pid} = req.params
    if(!req.files)  throw new Error('Ko được bỏ trống')
    const response = await Product.findByIdAndUpdate(pid,{$push: {images: {$each:req.files.map(el => el.path)}}}, {new:true})

    return res.status(200).json({
        status:response ? 'Thêm ảnh thành công' : false,
        updateProduct : response ? response : 'Ko thêm được ảnh vào sản phẩm'
    })
})







//
const ratings = asyncHandler( async(req,res)=>{
    const {_id} = req.user
    const {star,comment,pid} = req.body
    if(!star || !pid) throw new Error('KO dc bo trong')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    // console.log({alreadyRating});
    if(alreadyRating){
        //update star & coment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating}
        }, {
            $set:{"ratings.$.star":star,"ratings.$.comment":comment}
        },{new:true})

    }else{
        //add start %comment
        await Product.findByIdAndUpdate(pid,{
            $push:{ratings: {star,comment,postedBy:_id}}
        },{new:true})
       
    }
    // sum ratings

    const updateProduct = await Product.findById(pid)
    const ratingCount = updateProduct.ratings.length
    const sumRatings = updateProduct.ratings.reduce((sum,el) => sum + +el.star,0)
    updateProduct.totalRatings = Math.round(sumRatings * 10/ratingCount) / 10
    await updateProduct.save()

    return res.status(200).json({
        status:true
    })
})


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    uploadImageProduct,
    ratings,
    getFilteredProducts
}