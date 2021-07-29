const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config-photos');
const userController = require('../controllers/user');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/', userController.getAllUser);

router.get('/:id', userController.getOneUser);

router.put('/:id/photo_profil', multer, userController.modifyUser);

router.put('/:id/user_admin', auth, userController.modifyAdminUser);

router.put('/:id/user_noadmin', auth, userController.modifyNoAdminUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;