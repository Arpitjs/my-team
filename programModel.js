let mongoose = require('mongoose')
let slugify = require('slugify')

let programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 5
    },
    about: {
        type: String
    },
    photos: {
        type: [String]
    },
    abcd: {
        type: [String]
    },
    photos3: {
        type: [String]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    slug: String
})

programSchema.index({ slug: 1 })

programSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

programModel = mongoose.model('program', programSchema)

module.exports = programModel