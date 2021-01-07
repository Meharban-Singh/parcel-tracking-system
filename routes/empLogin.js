const router = require("express").Router();
const { connection } = require("../modules/connection.js");
const { validateEmailAddress } = require("../modules/validation.js");


//employee login handle
router.get('/empLogin',(req,res)=>{
    var username = req.body.username;
    //req.body.username; //working on it, always returns null

    var password = req.body.password;

    //check if username is entered
    if (!username)
    return res.status(404).render("error", {
      code: "404",
      message: "No username provided!",
    });
    
    //check if password is entered
    else if (!password)
    return res.status(404).render("error", {
      code: "404",
      message: "No password provided!",
    });
    
    //validate email address
    else if (!validateEmailAddress(req.query.username))
    return res.status(400).render("error", {
      code: "400",
      message: "Invalid email address!",
    });

    //if both values entered, check values in DB
    else{
       connection.query("SELECT * FROM EMPLOYEE WHERE EMAIL = ? AND PASSWORD = ?", [username, password], function(error, results){
            if (results.length > 0) {
                res.redirect('/home');
            } else {
            res.send("Incorrect Username and/or Password!");
        }			
        res.end();
    });
    } 
});
      
   

module.exports = router;
