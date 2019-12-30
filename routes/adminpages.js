var express = require('express')
var router = express.Router()

var Page = require('../models/page')

router.get('/',(req,res)=>{
    Page.find({}).sort({sorting:1}).exec((err,pages)=>{
       res.render('admin/pages',{
           pages:pages 
       })
   })
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
    if (slug == '') slug = title
 
    var content = req.body.content

    Page.findOne({slug:slug},(error,page)=>{
        if(page){
            req.flash('danger','page slug exists choose another ')
            res.render('admin/add_page',{
                title,
                slug,
                content
            })

        }else{
            var page = new Page({
                title,
                slug,
                content, 
                sorting : 100
            })

            page.save((error)=>{
                if(error){
                    return console.log(error)
                }
            
                req.flash('success','page added!')
                res.redirect('/admin/pages')
            
            })
        }
    })

    // var errors = req.validationErrors

    // res.render('admin/add_page',{
    //     title,
    //     slug,
    //     content
    // })
})

// POST reorder pages 
router.post('/reorder-pages',(req,res)=>{
    var ids = req.body['id[]']

    var count = 0 

    for (var i = 0 ; i< ids.length ; i++){
        var id = ids[i]
        count++

        (function(count){
            Page.findById(id,(err,page) =>{
                page.sorting = count 
                page.save(function(err){
                    if(err){
                        return console.log(err)
                    }
                })
            })

        })(count)
        

    }
})


//exports

module.exports = router