import React from "react";
import logo from "../../logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminHome() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminKey");
    navigate("/admin");
  };

  return (
    <>
      <div className="home-container">
        <div className="home-container-left">
          <div className="side-nav">
            <div className="logo">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="nav-lists">
              <Link
                to="/adminHome"
                className={
                  location.pathname === "/adminHome"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Home
              </Link>

              <Link
                to="/astrologers-list"
                className={
                  location.pathname === "/astrologers-list"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Astrologer List
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="home-container-right">
          <div className="main-container">
            <h1>Admin Home</h1>
            <p>Welcome back admin</p>
          </div>
          <hr />
          <div>
            <h3 style={{ textAlign: "center" }}>Admin Page Overview:</h3>
            <ul>
            </ul>

            <ul>

              <li>Admin page for astrologers profile management.</li>
              <br />

              <h5>#section of Admin side</h5>
              <li>Hompege</li>
              <li>Astrologers listing</li>
              <li>Astrologers Adding</li>
              <li>Editing profile</li>
              <li>Deleting profile</li>

              <br />

              <h5>Extra</h5>
              <li>Form validation Done</li>
              <li>Search</li>


            </ul>
          </div>



        </div>
      </div>
    </>
  );
}

export default AdminHome;
