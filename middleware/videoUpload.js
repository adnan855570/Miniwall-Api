const multer = require('multer');

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos'); // Directory to save videos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const videoUpload = multer({
    storage: videoStorage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Max 50MB
    fileFilter: (req, file, cb) => {
        // Accept only video files
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Only video files are allowed!'), false);
        }
        cb(null, true);
    },
}).single('video'); // Ensure the field name matches Postman's field key

module.exports = videoUpload;
