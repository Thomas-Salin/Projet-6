const express = require('express');
const commentController = require('../controllers/commentaire');
const router = express.Router();


router.post('/', commentController.createComment);

router.get('/gif/:id', commentController.getGifComment);
  
router.delete('/:id', commentController.deleteGifComment);


module.exports = router;