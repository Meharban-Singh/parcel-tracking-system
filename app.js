const express = require("express");
const app = express();

app.set("PORT", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hi");
});

// Start the server
app.listen(app.get("PORT"), () =>
  console.log(`Listening to requests on http://localhost:${app.get("PORT")}`)
);
