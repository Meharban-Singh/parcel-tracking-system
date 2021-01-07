const router = require("express").Router();
const { connection } = require("../modules/connection.js");
const { validateEmailAddress } = require("../modules/validation.js");

//employee login handle
router.post("/empLogin", (req, res) => {
  var username = req.body.username;
  //req.body.username; //working on it, always returns null

  var password = req.body.password;
  console.log(username, password);
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
  else if (!validateEmailAddress(req.body.username))
    return res.status(400).render("error", {
      code: "400",
      message: "Invalid email address!",
    });
  //if both values entered, check values in DB
  else {
    connection.query(
      "SELECT * FROM EMPLOYEE WHERE EMAIL = ? AND PASSWORD = ?",
      [username, password],
      async function (error, results) {
        if (!results) {
          res.send("No account exists for that username!");
        } else {
          if (results.length > 0) {
            res.redirect("/home");
          } else {
            res.status(401).render("error", {
              code: "401",
              message: "Email and password do not match",
            });
          }
        }
      }
    );
  }
});
module.exports = router;
