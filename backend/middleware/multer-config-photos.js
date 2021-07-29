const multer = require('multer');

const mimeTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'photos')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = mimeTypes[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});



module.exports = multer({ storage: storage }).single('photoProfil');