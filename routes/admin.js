const router = require("express").Router();

//login handle
router.get('/admin',(req,res)=>{
    res.status(200).render("admin");
})

module.exports = router;
