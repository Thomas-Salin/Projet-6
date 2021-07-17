const express = require('express');
const gifController = require('../controllers/gif');
const auth = require('../middleware/auth');
const multerGif = require('../middleware/multer-config-gif');
const router = express.Router();


router.post('/', gifController.createGif);

router.get('/', gifController.getAllGif);

router.get('/:id', gifController.getOneGif);

router.get('/user/:id', gifController.getGifUser);

router.delete('/:id', gifController.deleteGif)


module.exports = router;