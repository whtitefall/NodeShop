var express = require('express')
var router = express.Router()


router.get('/',(req,res)=>{
    res.send('admin area')
})



router.get('/add-page',(req,res)=>{
    var title = ''
    var slug = ''
    var content = ''

    res.render('admin/add_page',{
        title,
        slug,
        content
    })
})



router.post('/add-page',(req,res)=>{

    // validator middleware 
    // req.checkBody('title','title must have a value').notEmpty()
    // req.checkBody('content','content must have a value').notEmpty()

    // body is body parser
    var title = req.body.title
    var slug = req.body.slug // .replace(/\s+g, '-').toLowercase()
    if (slug == '') slug =title
 
    var content = req.body.content

    // var errors = req.validationErrors

    // res.render('admin/add_page',{
    //     title,
    //     slug,
    //     content
    // })
})


//exports

module.exports = router