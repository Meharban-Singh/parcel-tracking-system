const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
app.set("PORT", process.env.PORT || 3000);

// Handlebars engine and extension
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Middlewares
app.use(cookieParser());

// Render all the homepage
app.get("/", (req, res) => {
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

// GET parcel information
app.get("/parcel", (req, res) => {
  // If no tracking number in the query, return with 404 error.
  if (!req.query.trackingNumber)
    return res
      .status(404)
      .render("error", {
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

// Start the server
app.listen(app.get("PORT"), () =>
  console.log(`Listening to requests on http://localhost:${app.get("PORT")}`)
);
