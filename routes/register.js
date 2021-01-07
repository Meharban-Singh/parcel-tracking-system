const router = require("express").Router();

//registeration handler
router.get('/register',(req,res)=>{
    res.status(200).render("register");
})

module.exports = router;
