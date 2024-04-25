const express = require("express");
const route = express.Router();
const con = require("../Database/Connection");

route.patch("/", (req, res) => {
  const details = {
    empid: req.body.empid,
  };
  // Preparing the SQL query
  const sql = `UPDATE employee SET empName = ?, age = ?, sal = ? WHERE empid = ?`;

  // Executing the query
  con.query(
    sql,
    // [employeeUpdates.name, employeeUpdates.age, employeeUpdates.salary, empid],
    (error, results) => {
      if (error) throw error;
      console.log("Employee updated successfully", results);
    }
  );

  // Closing the connection
  con.end();
});
module.exports = route;
