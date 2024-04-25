const db = require("../../../app/node-mysql-server/db-con");

exports.deleteAll = (req, res) => {
  const sql = "TRUNCATE TABLE appuser";

  db.query(sql, (err) => {
    if (err) return res.json({ message: "Error on clear all datas" });
    return res.json({ message: "cleared successfully" });
  });
};
