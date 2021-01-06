const router = require("express").Router();

//login handle
router.get('/home',(req,res)=>{
    res.status(200).render("employeeHome");
})

module.exports = router;
