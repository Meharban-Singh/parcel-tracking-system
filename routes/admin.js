const router = require("express").Router();
const { connection } = require("../modules/connection.js");
const bcrypt = require("bcrypt"); // to hash the password
const { validatePassword, validateEmailAddress } = require("../modules/validation.js");
const SALT_ROUNDS = 10;

//admin handler
router.get('/admin',(req,res)=>{
    res.status(200).render("admin");
})

//employee homepage handler -- employee/parcels
router.get("/employee/parcels",(req,res)=>{
    res.status(200).render("employeeHome");
})

//open registration page
router.get("/admin/register",(req,res)=>{
    res.status(200).render("register");
})

//open admin personal information
router.get("/admin/employeeinfo",(req,res)=>{
    res.status(200).render("admininfo");
})

//add parcel form
router.get("/admin/addparcel",(req,res)=>{
    res.status(200).render("addParcel");
})

//register employee
router.post("/admin/processRegistration", (req,res)=>{
    //get values entered by user
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    //check if user entered first name
    if(!fname){
        console.log("fname entry")
        return res.status(400).render("register", {
            error_message: "No first name provided!",
        });
    }//check if user entered last name
    else if(!lname){
        return res.status(400).render("register", {
            error_message: "No last name provided!"
        });
    }//check if user entered email address
    else if(!email){
        return res.status(400).render("register",{
            error_message: "No email address provided!"
        });
    }//check is email is valid
    else if(!validateEmailAddress(email)){
        return res.status(400).render("register",{
            error_message: "Invalid email address."
        })
    }//check if password is entered
    else if(!req.body.password){
        return res.status(400).render("register",{
            error_message: "No password provided!"
        });
    } //check if password is valid
    else if(!validatePassword(req.body.password)){
        return res.status(400).render("register",{
            error_message: "Password must be 8-16 characters long, and have at least one Uppercase, one lowercase, one symbol and one digit."
        })
    }
    else{
        //check id account with given email already exists
        connection.query(
            "SELECT * FROM employee WHERE email = ?",
            [email],
            async function (error, results) {
                if(error){
                    console.log(error);
                    return res.status(500).render("register",{
                        code: "500",
                        message: "Something went wrong, please try again!"
                    })
                }else if(results.length>0){
                    res.status(400).render("register",{
                        error_message: "An account with this email address already exists."
                    })
                }//if not prior account exist, create new one
                else{
                    //hash the password
                    let password;
                    bcrypt.hash(req.body.password,SALT_ROUNDS, function(err,hash){
                        if(err){
                            res.status(400).render("register",{
                                error_message: "An error occured, please try again!"
                            })
                        }else{
                            password=hash;
                            //insert new emp info into DB
                            connection.query(
                                "INSERT INTO employee (fname, lname, email, password) VALUES (?, ?, ?, ?)",
                                [fname, lname, email, password],
                                async function(errors, result){
                                    if(errors){
                                        res.status(400).render("register",{
                                            error_message: "Processing error, please try again!"
                                        })
                                    }else{
                                        res.status(200).render("register",{
                                            message: "Registration successful!"
                                        })
                                    }
                                }
                            )
                        }
                    })                    
                }
        })
    }
   
})

module.exports = router;
