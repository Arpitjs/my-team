let multer = require('multer')
let sharp = require('sharp')
let catchAsync = require('../utils/catchAsync')
let AppError = require('../utils/appError')
let handlerFactory = require('./handlerFactory')
let Program = require('../programModel')

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

exports.uploadPhotos =  upload.fields([
    { name: 'abcd', maxCount: 10 },
    { name: 'photos', maxCount: 10 },
    {name: 'photos3', maxCount: 10}
])

exports.resizePhotos = catchAsync(async (req, res, next) => {
    // if (!req.files.photos || !req.files.abcd) return next()
    if(req.files.abcd) {
    req.body.abcd = []
   await Promise.all(req.files.abcd.map(async (file, i) => {
       let filename = `tour-${Date.now()}-${i + 1}.jpeg`
       await sharp(file.buffer)
       .resize(500,500)
       .toFormat('jpeg')
       .jpeg({ quality: 90 })
       .toFile(`public/img/arpit/${filename}`)
       req.body.abcd.push(filename)
   }) 
   )} else if(req.files.photos3) {
    req.body.photos3 = []
    await Promise.all(req.files.photos3.map(async (file, i) => {
        let filename = `tour-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
        .resize(500,500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/arpit/${filename}`)
        req.body.photos3.push(filename)
    }) 
    )}
   else if(req.files.photos) {
    // console.log('codee here')
    // } else if(req.body.photos) {
     req.body.photos = []
     console.log('req.files>>>', req.files)
    await Promise.all(req.files.photos.map(async (file, i) => {
        let filename = `tour-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
        .resize(500,500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/programs/${filename}`)
        req.body.photos.push(filename)
    })
    )
}
    return next()
})

exports.updateProgram = catchAsync(async (req, res, next) => {
    console.log('req ko body',req.body)
    let doc = await Program.findByIdAndUpdate(req.id, req.body, { runValidators: true, new: true } )
    console.log('doc is', doc)
    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success!',
        data: { doc }
    })
})

exports.createTour = handlerFactory.createOne(Program)
exports.deleteTour = handlerFactory.deleteOne(Program)
