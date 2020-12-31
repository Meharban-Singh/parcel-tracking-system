const router = require("express").Router();

// GET parcel information
router.get("/parcel", (req, res) => {
  // If no tracking number in the query, return with 404 error.
  if (!req.query.trackingNumber)
    return res.status(404).render("error", {
      code: "404",
      message: "No tracking number provided!",
    });

  // Add the new number to the cookies
  let numbers = req.cookies.numbers || [];
  numbers.unshift(req.query.trackingNumber);

  // If more than 10 numbers are stored, delete them. We only store 10 most recent numbers
  if (numbers.length >= 10) numbers.length = 10;

  // Reset the cookies in the browser
  res.cookie("numbers", numbers, {
    maxAge: "604800000", // Cookie expires after 1 week.
  });

  res.status(200).render("");
});

module.exports = router;
