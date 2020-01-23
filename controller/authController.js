let jwt = require('jsonwebtoken')
let catchAsync = require('../utils/catchAsync')
let jwtSecret = 'heelofromtheotherside'
let { promisify } = require('util')
let AppError = require('../utils/appError')

let signToken = id =>  jwt.sign({id}, jwtSecret)

let sendToken = (user, statusCode, res) => {
    let token = signToken(user._id)
    res.cookie('jwt', token)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    let newUser = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    sendToken(newUser, 201, res)
})

exports.login = catchAsync(async(req, res, next) => {
    let {password, email } = req.body
    if(!password && !email) return next('oh come on')
    let user = await userModel.findOne({email})
    if(!user) return next('no such user with that email')
    let isMatch = await user.correctPassword(password, user.password)
    if(!isMatch) return next('incorrect password!')
    sendToken(user, 200, res)
})

exports.logout = async(req, res, next) => {
    try {
       await res.clearCookie('jwt')
       res.redirect('/')

    } catch (e) {
        console.log('couldnt clear it')
    }
    res.status(200).json()
}

exports.protect = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt
    }
    if(!token) next('provide a token please')
    let decoded = await promisify(jwt.verify)(token, jwtSecret)
    let user = await userModel.findById(decoded.id)
    req.user = user
    res.locals.user = user
    next()
}

exports.restrictTo = () => {
    return (req, res, next) => {
        if(req.user.role !== 'admin') return next(new AppError('not allowed', 403))
        next()
    }
}

exports.isLoggedIn = async(req, res, next) => {
    if(req.cookies.jwt) {
      //  verify token
      let decoded = await promisify(jwt.verify)(
          req.cookies.jwt, jwtSecret)
      // check if user still exists
      let user = await userModel.findById(decoded.id)
      if (!user) return next()
      res.locals.user = user
      console.log('code has entered this block', res.locals.user)
     return next()
  } 
  next()
  }