const router = require("express").Router();

//loginpage handler
router.get('/loginpage',(req,res)=>{
    res.status(200).render("login");
})

module.exports = router;
