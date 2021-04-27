const express = require('express');
const router = express.Router();
  
const pictureController= require('../controllers/picture.js')
const user = require('../controllers/user')


router.get('/getPicture/:uid',pictureController.getPicture)
router.post('/addPicture',pictureController.addPicture)
router.get('/getPictureHistory/:uid',pictureController.getPictureHistory)
router.delete('/deleteFromHistory/:uid/:pid',pictureController.deleteFromHistory)
router.get('/:fileName',pictureController.display)


router.post('/addUser',user.addUser )
router.get('/login/:mail/:password',user.login )
module.exports = router;