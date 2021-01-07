const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const exphbs = require("express-handlebars");

app.set("PORT", process.env.PORT || 3000);

// Handlebars engine and extension
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Use statc files
app.use(express.static(__dirname + "/public"));

// Connect to MySQL server
require("./modules/connection.js");

// Middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use(require("./routes/index"));
app.use(require("./routes/loginpage"));
app.use(require("./routes/empLogin"));
app.use(require("./routes/home"));
app.use(require("./routes/admin"));
app.use(require("./routes/track"));
app.use(require("./routes/error")); // this MUST be the last middleware so that ir handles all 'other' routes

// Start the server
app.listen(app.get("PORT"), () =>
  console.log(`Listening to requests on http://localhost:${app.get("PORT")}`)
);
