const express = require('express');
const commentController = require('../controllers/commentaire');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, commentController.createComment);

router.get('/gif/:id', auth,  commentController.getGifComment);

router.get('/user/:id', auth, commentController.getCommentUser);
  
router.delete('/:id', auth, commentController.deleteGifComment);


module.exports = router;