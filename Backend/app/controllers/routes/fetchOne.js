const express = require("express");
const route = express.Router();

const con = require("../Database/Connection");

route.get("/", (req, res) => {
  const empid = req.query.empid;
  let sql = "SELECT * FROM employee where empid=?";
  con.query(sql, [empid], (error, data) => {
    if (error) {
      res.send({ status: false, message: "inserted failed" });
    } else {
      return res.json(data);
    }
  });
});

module.exports = route;
