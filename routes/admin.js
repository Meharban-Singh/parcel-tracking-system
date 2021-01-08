const router = require("express").Router();

//admin handler
router.get('/admin',(req,res)=>{
    res.status(200).render("admin");
})

//employee homepage handler -- employee/parcels
router.get("/employee/parcels",(req,res)=>{
    res.status(200).render("employeeHome");
})

//parcel list handler -- admin/parcels
router.get("/admin/myParcels",(req,res)=>{
    res.status(200).render("adminparcels");
})

//open registration page
router.get("/admin/register",(req,res)=>{
    res.status(200).render("register");
})

//open admin personal information
router.get("/admin/employeeinfo",(req,res)=>{
    res.status(200).render("admininfo");
})

module.exports = router;
