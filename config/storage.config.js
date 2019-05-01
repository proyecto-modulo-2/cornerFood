const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'corner-food',
    api_key: process.env.CLOUDINARY_API_KEY || '597672671598768',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'A8wG2p-sccJI3Ib_NwAokhbluuQ',
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'corner-food',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, next) {
        next(null, file.originalname);
    }
});

const uploadCloud = multer ({ storage: storage });

module.exports = uploadCloud;