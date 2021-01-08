const router = require("express").Router();
const { connection } = require("../modules/connection.js");
const { validateEmailAddress } = require("../modules/validation.js");
const bcrypt = require("bcrypt"); // to hash the password

//login handler
router.get("/login", (req, res) => {
  res.status(200).render("login");
});

//employee login handle
router.post("/processLogin", (req, res) => {
  //get values of email and password entered by user
  let email = req.body.email.trim().toLowerCase();
  let password = req.body.password.trim();
  let signIn = req.body.stay_signed_in;

  //check if email is entered
  if (!email) {
    return res.status(400).render("login", {
      error_message: "No email provided!",
    });
  } else if (!password) {
    //check if password is entered
    return res.status(400).render("login", {
      error_message: "No password provided!",
    });
  } else if (!validateEmailAddress(req.body.email)) {
    //validate email address
    return res.status(400).render("login", {
      error_message: "Invalid email address format!",
    });
  } else {
    //if both values entered, check values in DB
    connection.query(
      "SELECT * FROM employee WHERE email = ?",
      [email],
      async function (error, results) {
        if (error) {
          console.error(error);
          return res.status(500).render("error", {
            code: "500",
            messsage: "Something went wrong.",
          });
        } else if (results.length === 0) {
          res.status(200).render("login", {
            error_message: "No account exists for that email!",
          });
        } else {
          // No errors so far, need to check if password is correct.
          bcrypt.compare(password, results[0].password, function (err, result) {
            if (err) {
              return res.status(500).render("error", {
                code: "500",
                message: "Something went wrong!",
              });
            }

            if (result) {
              // Correct!
              if (results[0].role == 1) {
                // redirect to admin page
                res.status(202).redirect("/admin");
              } else {
                //redirect to /employee
                res.status(202).redirect("/employee/parcels");
              }
            } else {
              // password is incorrect
              res.status(200).render("login", {
                error_message: "Email and password do not match",
              });
            }
          });
        }
      }
    );
  }
});
module.exports = router;
