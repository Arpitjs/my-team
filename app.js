let express = require('express')
let app = express()
let path = require('path')
let routes = require('./routes/route')
let mongoose = require('mongoose')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(cookieParser())

app.use(morgan('dev'))
app.use('/', routes)

let db = "mongodb://localhost:27017/myteam"
mongoose.connect(db,  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('db connected'))

app.use((err, req, res, next) => {
    console.log(' i am err handling middleware')
    next(err)
})

app.all('*', (req, res) => res.status(200).json({msg: 'no such route'}))

let port = 4200
app.listen(port, () => console.log('success! @', port))

  
  