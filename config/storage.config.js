const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'corner-food',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, next) {
        next(null, file.originalname);
    }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;