var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var config = require('./config/db')
var app = express()

var bodyParser = require('body-parser')
var session = require('express-session')
var expressValidate = require('express-validator')

// db 
mongoose.connect(config.database,{useNewUrlParser: true , useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connnected ')
});


//view engine 
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

// public folder
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// global vars 
app.locals.errors = null 

// express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
//validate middleware

// app.use(expressValidate);

// messages middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//set routes 

var pages = require('./routes/pages')
var adminpages = require('./routes/adminpages')

app.use('/',pages)
app.use('/admin/pages',adminpages)



//start server
var port = 3000

app.listen(port,()=>{
    console.log(`running on port  ${port}`)
})
