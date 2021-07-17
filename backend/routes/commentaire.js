const express = require('express');
const commentController = require('../controllers/commentaire');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', commentController.createComment);

router.get('/gif/:id', commentController.getGifComment);

router.get('/user/:id',commentController.getCommentUser);
  
router.delete('/:id',  commentController.deleteGifComment);


module.exports = router;