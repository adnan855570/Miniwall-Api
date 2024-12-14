const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/audios'); // Save in uploads/audio directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const audioUpload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
}).single('audio');

module.exports = audioUpload;
