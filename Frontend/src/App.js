import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "./pages/LoginPage/loginpage";
import Register from "./pages/RegisterPage/register";
import Main from "./pages/Attendance/main.js";
import Forgot from "./pages/ForgotPassPage/forgot.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resetpage from "./pages/ResetPasspage/resetpage.js";
import Sidebar1 from "./Usecase/Sidebar/sidebar";
import Home from "./Usecase/Allpages/Home.js";
import Admin from "./Usecase/Allpages/Admin.js";
import Projectdetails from "./Usecase/projectdetails/project-details";
import "./Usecase/Title/title.css";
import "./Usecase/Sidebar/sidebar.css";
import "./Usecase/projectdetails/project.css";
import User from "./Usecase/Allpages/User.js";
import Task from "./Usecase/Allpages/Signup.js";

import "./Usecase/projectdetails/button.css";
import "./Usecase/rightdiv/right-cont.css";
import "./Usecase/Allpages/table.css";
import "./Usecase/Allpages/user.css";
import "./Usecase/Allpages/taskdetails.css";
import Datas from "./pages/content/datas.js";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Router>
        <Routes>
          {/* Routes with Sidebar */}
          <Route
            path="/home"
            element={
              <>
                <Sidebar1 />
                <Home />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Sidebar1 />
                <Admin />
              </>
            }
          />
          <Route
            path="/projectdetails"
            element={
              <>
                <Sidebar1 />
                <Projectdetails />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                <Sidebar1 />
                <User />
              </>
            }
          />
          <Route
            path="/attendance-home"
            element={
              <>
                <Sidebar1 />
                <Main />
              </>
            }
          />
          <Route
            path="/task"
            element={
              <>
                <Sidebar1 />
                <Task />
              </>
            }
          />

          {/* Routes without Sidebar */}
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Resetpage />} />
          <Route path="/forgotpass" element={<Forgot />} />
          <Route path="/allData" element={<Datas />} />
          <Route
            path="*"
            element={
              <main
                style={{
                  // padding: "5rem",
                  // fontSize: "2rem",
                  // textAlign: "center",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <div style={{ display: "grid", placeItems: "center" }}>
                  <div
                    class="container"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "72px", margin: "0px" }}>404</h1>
                    <p style={{ fontSize: "24px" }}>
                      Oops! The page you are looking for cannot be found.
                    </p>
                    <a
                      style={{
                        backgroundColor: "#007BFF",
                        borderRadius: "5px",
                        color: "white",
                        textDecoration: "none",
                        marginTop: "20px",
                        padding: "10px 20px",
                        fontSize: " 18px",
                      }}
                      href="/"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              </main>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
