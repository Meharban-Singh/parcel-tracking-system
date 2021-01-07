const router = require("express").Router();

//registeration handler
router.post('/register',(req,res)=>{
    res.status(200).render("register");
})

module.exports = router;
