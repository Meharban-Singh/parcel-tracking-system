const router = require("express").Router();

//login handle
router.get('/login',(req,res)=>{
    res.status(200).render("login");
})

module.exports = router;
