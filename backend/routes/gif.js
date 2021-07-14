const express = require('express');
const gifController = require('../controllers/gif');

const router = express.Router();

router.post('/', gifController.createGif);

router.post('/:id/commentaire', gifController.createCommentaire);

router.get('/', gifController.getAllGif);
  
router.get('/:id/commentaire', gifController.getGifCommentaire);

router.delete('/:id', gifController.deleteGif)

router.delete('/:id/commentaire', gifController.deleteGifCommentaire);





module.exports = router;