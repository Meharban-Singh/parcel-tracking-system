const router = require("express").Router();
const { validateTrackingNumber } = require("../modules/validation");

// GET parcel information
router.get("/parcel", (req, res) => {
  // If no tracking number in the query, return with 404 error.
  if (!req.query.trackingNumber)
    return res.status(404).render("error", {
      code: "404",
      message: "No tracking number provided!",
    });

  // Validation of input
  if (!validateTrackingNumber(req.query.trackingNumber))
    return res.status(400).render("error", {
      code: "400",
      message: "Invalid tracking number!",
    });

  // Add the new number to the cookies
  let numbers = req.cookies.numbers || [];

  // If the number is already in the array, remove it from the array
  let index = numbers.indexOf(req.query.trackingNumber);
  if (index > -1) {
    numbers.splice(index, 1); //remove that element
  }

  // Add new number to the top of the array
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
