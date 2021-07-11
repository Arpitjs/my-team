let catchAsync = require('../utils/catchAsync')
let AppError = require('../utils/AppError')

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        let doc = await Model.findByIdAndDelete(req.params.id)
        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }
        res.status(204).json({
            status: 'success!',
            data: null
        })
    })

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        let doc = await Model.create(req.body)
        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }
        res.status(201).json({
            status: 'success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            data: { doc }
        })
    })


