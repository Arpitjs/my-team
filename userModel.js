let mongoose = require('mongoose')
let validator = require('validator')
let bcrypt = require('bcryptjs')

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('not a valid email!')
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    photos: {
        type: [String]
    }
})

userSchema.pre('save', async function (next) {
   this.password =  await bcrypt.hash(this.password, 16)
   next()
})

userSchema.methods.correctPassword = async function(p1, p2) {
    return await bcrypt.compare(p1, p2)
}

userModel = mongoose.model('myteam', userSchema)

module.exports = userModel