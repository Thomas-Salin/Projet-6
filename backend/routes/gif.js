const express = require('express');
const gifController = require('../controllers/gif');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config-gif');
const router = express.Router();


router.post('/', multer, gifController.createGif);

router.get('/', auth, gifController.getAllGif);

router.get('/:id', auth, gifController.getOneGif);

router.get('/user/:id', auth, gifController.getGifUser);

router.delete('/:id', gifController.deleteGif)


module.exports = router;