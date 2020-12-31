const router = require("express").Router();

//NOT FOUND ERROR = THIS MUST BE THE LAST FUNTION
router.get("*", (req, res) => {
  res.status(404).render("error", {
    code: "404",
    message: "Not Found",
  });
});

//INTERNAL SERVER ERROR
router.use(function (req, res, next) {
  res.status(500).render("error", {
    code: "500",
    message: "Internal server error",
  });
});

module.exports = router;
