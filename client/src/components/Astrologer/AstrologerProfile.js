// 
import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "./AstrologerProfile.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";

function AstrologerProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [data, setData] = useState("");
  const [url, setUrl] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64) => {
    dispatch(showLoading());

    const response = await axios.post(
      "/api/astrologer/uploadImage",
      {
        image: base64,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    dispatch(hideLoading());

    if (response.data.success) {
      setUrl(response.data);
      toast.success("Profile updated successfully");
    } else {
      console.log("Error uploading image");
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }
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
  }, [url]);

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
          <h1 className="text-center">Astrologer Profile</h1>
          <div className="main-container">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={data?.profile}
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="my-3">
                        <h4>{data?.name}</h4>
                        <input
                          type="file"
                          id="actual-btn"
                          hidden
                          onChange={uploadImage}
                        />
                        <label
                          htmlFor="actual-btn"
                          className="btn btn-primary m-3"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row mt-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data?.name}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data?.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Gender</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data?.gender || "//Please edit and fill data//"}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Languages</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data?.languages?.length ? data.languages.map((lang) => lang).join(', ') : "//Please edit and fill data//"}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Specialties</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data?.specialties?.length ? data.specialties.map((spec) => spec).join(', ') : "//Please edit and fill data//"}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <Link
                          to="/astrologer-profile-edit"
                          className="btn btn-info"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AstrologerProfile;
