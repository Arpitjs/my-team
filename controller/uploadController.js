let catchAsync = require('../utils/catchAsync')
let User = require('../userModel')
let AppError = require('../utils/appError')

exports.updateMe = catchAsync(async (req, res, next) => {
    console.log(req.body)
    let doc = await User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true })
    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success!',
        data: { doc }
    })
})

