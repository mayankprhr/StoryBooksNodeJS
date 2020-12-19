const express= require('express')
const router = express.Router()


//@desc     login/Landing page
//@desc     GET

router.get('/',(req,res)=>{

    res.render('login',{
        layout:'login'
    })
})

//@desc     Dashboard
//@route    GET/Dashboard

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

module.exports=router