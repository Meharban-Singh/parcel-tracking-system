const router = require("express").Router();

//home handle - opens employee homepage
router.get('/home',(req,res)=>{
    res.status(200).render("employeeHome");
})

module.exports = router;
