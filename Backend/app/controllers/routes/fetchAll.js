const express = require("express");

const route = express.Router();
const con = require("../Database/Connection");

route.get("/", (req, res) => {
  const sql = "SELECT * FROM employee ";

  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});
module.exports = route;
