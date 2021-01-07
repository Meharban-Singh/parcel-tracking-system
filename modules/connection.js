const mysql = require("mysql");
// Add local .env variable files.
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_SERVER_HOST,
  user: process.env.MYSQL_SERVER_USER,
  password: process.env.MYSQL_SERVER_PASSWORD,
  database: process.env.MYSQL_SERVER_DB,
});

connection.connect((err) => {
  if (err)
    console.log("An error occured while trying to connent to the database!");
  else console.log("Connected to DB!");
});

module.exports = {connection};