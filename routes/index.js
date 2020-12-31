const router = require("express").Router();

// Render all the homepage
router.get("/", (req, res) => {
  // Prepare recent numbers list from cookies if they exist
  let numbers = [];

  /*
   * If we have any previous numbers in cookies,
   * add them to the array so it can be later rendered in handlebars
   */
  if (req.cookies.numbers)
    for (number of req.cookies.numbers) numbers.push(number);

  res.status(200).render("index", { numbers });
});

module.exports = router;
