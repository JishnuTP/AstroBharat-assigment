import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "./HomePage.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };

  const getdata = async () => {
    try {

      const response = await axios.post(
        "/api/astrologer/get-astrologer-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

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
                to="/"
                className={
                  location.pathname === "/homePage"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Home
              </Link>

              <Link
                to="/astrologer-profile"
                className={
                  location.pathname === "/astrologer-profile"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Astrologer Profile
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="home-container-right">
          <div className="main-container">
            <h1 style={{ fontStyle: "oblique" }}>Home page</h1>
            <p>Welcome back {data?.name}</p>
          </div>
          <hr />
          <img
            src="https://img.freepik.com/free-psd/astrology-banner-template-with-planets_23-2148508867.jpg?t=st=1702449843~exp=1702450443~hmac=50ac2008ddbe85b3065f96d7fbdeff1da47ae12b6ce5a3dc46d3359042f58afa"
            alt="Welcome Image"
            style={{ width: '100%', marginTop: '4px', height: "80%", }}
          />

        </div>
      </div>
    </>
  );
}

export default HomePage;
