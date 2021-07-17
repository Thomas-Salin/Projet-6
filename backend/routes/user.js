const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multerPhoto = require('../middleware/multer-config-photos');
const userController = require('../controllers/user');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/', userController.getAllUser);

router.get('/:id', userController.getOneUser);

router.put('/:id/photo_profil', userController.modifyUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;