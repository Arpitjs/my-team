let multer = require('multer')
let sharp = require('sharp')
let catchAsync = require('../utils/catchAsync')
let User = require('../userModel')
let AppError = require('../utils/appError')

let multerStorage = multer.memoryStorage()

let multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] == 'image') {
        cb(null, true)
    } else {
        cb(new AppError('Not an image!', 400), false)
    }
}

let upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

// // multer middlewares
// exports.uploadUserPhoto = upload.single('photo')

// exports.resizePhoto = catchAsync(async (req, res, next) => {
//     if (!req.file) return next()
//     req.file.filename = `program-${Date.now()}.jpeg`
//     await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({quality: 90})
//     .toFile(`public/img/programs/${req.file.filename}`)
//     next()
// })

// exports.updateMe = catchAsync(async (req, res, next) => {
//     console.log(req.file)
//     let filteredBody = {}
//     if (req.file) filteredBody.photo = req.file.filename
//     let updatedUser = await User.findByIdAndUpdate(req.user, filteredBody, {
//         new: true,
//         runValidators: true
//     })
//     res.status(200).json({
//         status: 'success',
//         data: updatedUser
//     })
// })

exports.uploadPhotos =  upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'photos', maxCount: 10 }
])

exports.resizePhotos = catchAsync(async (req, res, next) => {
    if (!req.files.photos) return next()
     req.body.photos = []
    await Promise.all(req.files.photos.map(async (file, i) => {
        let filename = `tour-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/programs/${filename}`)
        req.body.photos.push(filename)
    })
    )
    console.log(req.body)
    return next()
})

exports.updateMe = catchAsync(async (req, res, next) => {
    console.log(req.body.photos)
    let doc = await User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true })
    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success!',
        data: { doc }
    })
})
