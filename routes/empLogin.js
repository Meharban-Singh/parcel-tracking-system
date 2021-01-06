const router = require("express").Router();
var connection = require("../modules/connection.js");


//login handle
router.get('/empLogin',(req,res)=>{
    var username = req.query.username;
    var password = req.query.password;

    if(username && password){
       connection.query("SELECT * FROM EMPLOYEE WHERE EMAIL = ? AND PASSWORD = ?", [username, password], function(error, results){
            if (results.length > 0) {
                res.redirect('/home');
            } else {
            res.send("Incorrect Username and/or Password!");
        }			
        res.end();
    });
    } else {
    res.send("Please enter Username and Password!");
    res.end();
}
       }
       );
       
   

module.exports = router;
