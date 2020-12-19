const path= require('path')
const express= require('express')
const dotenv= require('dotenv')
const connectDB=require('./config/db')
const exphbs=require('express-handlebars')
const session=require('express-session')
const passport=require('passport')
//morgan for logging
const morgan=require('morgan')


//load config
dotenv.config({path:'./config/config.env'})

//passsport
require('./config/passport')(passport)

connectDB()

const app =express()

//logging
if (process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/',require('./routes/index'))

//handlebars
app.engine('.hbs',exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs'); 

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

//passport moiddlewawr
app.use(passport.initialize())
app.use(passport.session())

const PORT=process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`))

