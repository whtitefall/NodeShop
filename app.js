var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var config = require('./config/db')
var app = express()


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



app.get('/',(req,res)=>{
    res.render('index')
})
//start server
var port = 3000

app.listen(port,()=>{
    console.log(`running on port  ${port}`)
})
