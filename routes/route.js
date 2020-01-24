let express = require('express')
let router = express.Router()
let appController = require('../controller/appController')
let authController = require('../controller/authController')
let uploadController = require('../controller/uploadController')

router.get('/hello', appController.hello)
router.get('/', authController.isLoggedIn, appController.getOverview)
router.get('/programs', authController.isLoggedIn, appController.programs)
router.get('/login', authController.isLoggedIn, appController.login)
router.get('/logout', authController.isLoggedIn, authController.logout)


router.get('/users', authController.protect, authController.restrictTo(), appController.getAllUsers)
router.post('/signUp', authController.signUp)
router.post('/login', authController.login)
router.patch('/updateMe', authController.protect, 
uploadController.uploadPhotos,
 uploadController.resizePhotos,
  uploadController.updateMe)

module.exports = router