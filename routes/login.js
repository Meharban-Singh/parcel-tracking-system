const router = require("express").Router();

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
module.exports = router;
