const router = require("express").Router();

//admin handler
router.get('/admin',(req,res)=>{
    res.status(200).render("admin");
})

//employee homepage handler -- employee/parcels
router.get("/employee/parcels",(req,res)=>{
    res.status(200).render("employeeHome");
})
module.exports = router;
