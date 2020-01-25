let express = require('express')
let router = express.Router()
let appController = require('../controller/appController')
let authController = require('../controller/authController')
let uploadController = require('../controller/uploadController')
let programController = require('../controller/programCtrl')

router.get('/', authController.isLoggedIn, appController.getOverview)
router.get('/programs/:slug', authController.isLoggedIn, appController.programs)
router.get('/login', authController.isLoggedIn, appController.login)
router.get('/logout', authController.isLoggedIn, authController.logout)
router.get('/program/:id', appController.getProgram)

router.get('/users', authController.protect, authController.restrictTo(), appController.getAllUsers)
router.post('/signUp', authController.signUp)
router.post('/login', authController.login)
router.patch('/updateMe', authController.protect, uploadController.updateMe)

router.post('/createTour', authController.protect, programController.createTour)
router.patch('/updateTour',
authController.protect,
authController.idIs,
programController.uploadPhotos,
programController.resizePhotos,
programController.updateProgram)

module.exports = router