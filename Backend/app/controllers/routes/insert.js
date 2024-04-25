const express = require("express");

const route = express.Router();

const con = require("../Database/Connection");

route.post("/", (req, res) => {
  const details = {
    empid: req.body.empid,
    empName: req.body.empName,
    age: req.body.age,
    sal: req.body.sal,
  };
  const sql = "INSERT INTO employee SET ?";

  con.query(sql, details, (err) => {
    if (err) {
      return res.send({
        status: false,
        message: "inserted failed",
        error: err.message,
      });
    } else {
      return res.send({ staus: true, message: "created successfully" });
    }
  });
});

module.exports = route;
