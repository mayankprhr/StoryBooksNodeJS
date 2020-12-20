const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

 //Handlebars is a simple templating language. It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular text with embedded Handlebars expressions.
//morgan for logging

//load config
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)

//DB Connection
connectDB()

const app =express()

//body parser

//logging using morgan
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//handlebars
app.engine('.hbs',exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs'); 

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
  })
)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//set global var

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))


//Port and listening
const PORT=process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in  ${process.env.NODE_ENV} mode on  port ${PORT}  URI` ))

