let userModel = require('../userModel')
let catchAsync = require('../utils/catchAsync')

exports.getOverview = async (req, res, next) => {
    try {
        res.status(200).render('base')
    }catch (e) {
        res.status(400).render()
    }
}

exports.hello = (req, res, next) => {
   next('fuck you!!!')
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

exports.programs = (req,res) => {
    res.status(200).render('programs')
}