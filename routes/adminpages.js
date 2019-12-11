var express = require('express')
var router = express.Router()


router.get('/',(req,res)=>{
    res.send('admin area')
})

router.get('/test',(req,res)=>{
    res.send('test')
})

//exports

module.exports = router