
const cloudinary = require("../config/cloudinary")
const multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Anh',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{width: 500, height: 500, crop: 'limit'}],
})
const upload = multer({
    storage: storage
})

module.exports= upload
