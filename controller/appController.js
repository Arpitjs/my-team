let userModel = require('../userModel')
let catchAsync = require('../utils/catchAsync')
let programModel = require('../programModel')
let AppError = require('../utils/appError')

exports.getOverview = async (req, res, next) => {
    try {
        res.status(200).render('base')
    }catch (e) {
        res.status(400).render()
    }
}

// exports.programs = (req, res) => {
//     console.log('this route is hit')
//     res.status(200).render('programs')
// }

exports.getAllUsers = catchAsync(async(req,res, next) => {
   let users =  await userModel.find()
   if(req.body.role = 'admin')
    res.status(200).json({ users })
})

//view ko
exports.login = (req, res) => {
    res.status(200).render('login', {
        title: 'Log into yer account.'
    })
}

exports.programs = catchAsync(async (req,res, next) => {
    let prog = await programModel.findOne({slug: req.params.slug })
    if (!prog) return next(new AppError('there is no program of that name!', 404))
    res.status(200).render('programs', {
         prog
         })
})

exports.getProgram = catchAsync(async (req, res, next) => {
    let prog = await programModel.findOne({id: req.params.id})
    if (!prog) {
        return next(new AppError('there is no program of that name!', 404))
    }
    res.status(200).render('program', {
        prog
    })
})