const router = require("express").Router();
const { validateTrackingNumber } = require("../modules/validation");
const { connection } = require("../modules/connection.js");

// GET parcel information
router.get("/parcel", (req, res) => {
  // If no tracking number in the query, return with 404 error.
  if (!req.query.trackingNumber)
    return res.status(404).render("error", {
      code: "404",
      message: "No tracking number provided!",
    });

  req.query.trackingNumber = req.query.trackingNumber.trim();

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

  // Search for the entered parcel
  connection.query(
    "SELECT * FROM parcel INNER JOIN delivery WHERE trackingNumber = ?",
    [req.query.trackingNumber],
    async (error, results) => {
      if (error) {
        return res.status(500).render("error", {
          message: "Something went wrong!",
          code: "500",
        });
      } else if (results.length === 0) {
        return res.status(404).render("index", {
          numbers,
          error_message:
            "Tracking number not found! Please double-check the number. Contact support if error persists.",
        });
      } else {
        // all clear
        // Preparation of conetect obect to be sent to handlebars
        let contextObject = {};
        contextObject.trackingNumber = results[0].trackingNumber;
        contextObject.customerName = results[0].customerName;
        contextObject.sourceLocation = results[0].sourceLocation;
        contextObject.destinationLocation = results[0].destinationLocation;

        /*
        Create an array of the form:[
          {
            date:,
            details: [
              {time, location, status}
            ]
          },
          ...
        ]
        */
        let deliveries = [];
        for (let result of results) {
          // Add each delivery detail to a detailsObject
          let detailsObject = {};
          detailsObject.currentCity = result.currentCity;
          detailsObject.currentProvince = result.currentProvince;
          detailsObject.status = result.status;

          // Time conversion
          let hours = result.date.getHours();
          let mins = result.date.getMinutes() + 1;
          let period = "AM";

          if (hours > 11) {
            period = "PM";
            hours = hours % 12;

            if (hours == 0) hours = 12;
          }

          detailsObject.time = `${hours}:${mins} ${period}`;

          // Check if the current date is already in the deliveries array
          let date = result.date
            .toUTCString() // convert date to Fri, Jan 08, 2021 24:59:59 GMT
            .split(" ") // change that to an array ["Fri,", "Jan", "08", "2021" ..]
            .splice(0, 3) // get the first 3 elements of the array
            .join(" "); // Join them with spaces to get: Fri, Jan 08
          let added = false;
          for (let delivery of deliveries) {
            if (delivery.date == date) {
              // If date is already in the list, then just push the details there.
              delivery.details.push(detailsObject);
              added = true; // set added to false
              break;
            }
          }

          // If not added yet, that means date is not found, so create new obj in deliveries
          if (!added) {
            // Push that object to the deliveries array
            let tempObject = {};
            tempObject.date = date;
            tempObject.details = [detailsObject];

            deliveries.push(tempObject);
          }
        }

        //cAdd deliveries to the context object
        contextObject.deliveries = deliveries;

        res.status(200).render("parcelDetails", contextObject);
      }
    }
  );
});

module.exports = router;
