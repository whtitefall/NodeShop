var mongoose = require('mongoose')

// page schema 

var Pageshchema = mongoose.Schema({

    title:{
        type:String,
        require: true ,
    },
    slug:{
        type:String,
        require: true ,
    },
    content:{
        type:String,
        require: true ,
    },
    sorting:{
        type:Number,
 
    }
})


var Page = module.exports = mongoose.model('Page',Pageshchema)

