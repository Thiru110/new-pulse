const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pulse", // Corrected the database name here
});

db.connect((err) => {
  if (err) console.log(err);
  console.log("Successfully connected to the database.");
});

module.exports = db; // Export using module.exports for CommonJS
