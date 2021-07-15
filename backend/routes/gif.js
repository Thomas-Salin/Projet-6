const express = require('express');
const gifController = require('../controllers/gif');
const router = express.Router();



router.post('/', gifController.createGif);

router.get('/', gifController.getAllGif);

router.get('/:id', gifController.getOneGif);
  
router.delete('/:id', gifController.deleteGif)







module.exports = router;