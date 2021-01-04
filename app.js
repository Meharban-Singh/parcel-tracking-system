const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");

app.set("PORT", process.env.PORT || 3000);

// Handlebars engine and extension
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Use statc files
app.use(express.static(__dirname + "/public"));

// Middlewares
app.use(cookieParser());

// rountes
app.use(require("./routes/index"));
app.use(require("./routes/track"));
app.use(require("./routes/error")); // this MUST be the last middleware so that ir handles all 'other' routes

// Start the server
app.listen(app.get("PORT"), () =>
  console.log(`Listening to requests on http://localhost:${app.get("PORT")}`)
);
