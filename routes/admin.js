const router = require("express").Router();

//admin handler
router.get('/admin',(req,res)=>{
    res.status(200).render("admin");
})

module.exports = router;
