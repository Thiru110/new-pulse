import React, { useState, useEffect } from "react";

import axios from "axios";

import { MdDownload } from "react-icons/md"; // Assuming you have imported the FiDownload icon

import { HiOutlineDownload } from "react-icons/hi";

import "./datas.css";

const Datas = () => {
  const [userData, setUserData] = useState([]);

  const [filteredUserData, setFilteredUserData] = useState([]); // State to store filtered user data

  const [error, setError] = useState(null);

  const [searchEmail, setSearchEmail] = useState(""); // State to store the search email

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get("http://localhost:8000/attendance_app")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      });
  };
  const downloadCSV = (data) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };
  const handleSearch = () => {
    // Filter user data based on searchEmail
    const filteredData = userData.filter((user) =>
      user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredUserData(filteredData);
  };
  return (
    <>
      <div className="admincon">
        <h2>User Data</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />

          <button onClick={handleSearch} style={{ height: "30px" }}>
            Search
          </button>
        </div>

        {error && <p>{error}</p>}

        <div className="table-container">
          <table border="2" className="table">
            <thead>
              <tr>
                <th id="attend-th">User ID</th>
                <th id="attend-th">Date</th>
                <th id="attend-th">Time</th>
                <th id="attend-th">Activity Type</th>
                <th id="attend-th">Comments</th>
                <th id="attend-th">
                  <HiOutlineDownload />
                </th >
                {/* New column for download button */}
              </tr>
            </thead>
            <tbody>
              {filteredUserData.map((user) => (
                <tr key={user.id}>
                  <td id="attend-td">{user.Userid}</td>
                  <td id="attend-td">{user.Date}</td>
                  <td id="attend-td">{user.Time}</td>
                  <td id="attend-td">{user.Activity_type}</td>
                  <td id="attend-td">{user.Comments}</td>
                  <td>
                    {/* Download button */}
                    <button onClick={() => downloadCSV([user])}>
                      <MdDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Datas;
