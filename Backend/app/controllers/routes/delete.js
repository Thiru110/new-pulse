const express = require("express");
const route = express.Router();
const con = require("../Database/Connection");

route.delete("/", (req, res) => {
  const empid = req.body.empid;

  // Check if empid is provided
  if (!empid) {
    return res
      .status(400)
      .send({ status: false, message: "Employee ID is required" });
  }

  const sql = "DELETE FROM employee WHERE empid = ?";

  con.query(sql, [empid], (error, results) => {
    if (error) {
      console.error("Error deleting the employee:", error);
      return res.status(500).send({
        status: false,
        message: "Error deleting the employee",
        error: error.message,
      });
    }
    if (results.affectedRows > 0) {
      console.log(`Employee with ID ${empid} deleted successfully.`);
      res.send({
        status: true,
        message: `Employee with ID ${empid} deleted successfully.`,
      });
    } else {
      console.log(`Employee with ID ${empid} not found.`);
      res.status(404).send({
        status: false,
        message: `Employee with ID ${empid} not found.`,
      });
    }
  });
});


module.exports = route;
