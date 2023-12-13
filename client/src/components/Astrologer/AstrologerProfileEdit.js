// import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "./AstrologerProfile.css";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";

function AstrologerProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [data, setData] = useState("");

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

  const editAstrologer = async (e) => {
    try {
      e.preventDefault();

      // Client-side validation
      if (!e.target.name.value.match(/^[A-Za-z\s]+$/)) {
        toast.error("Invalid name format");
        return;
      }

      if (!e.target.email.value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
        toast.error("Invalid email format");
        return;
      }

      const genderValue = e.target.gender.value.trim().toLowerCase();

      if (genderValue !== "male" && genderValue !== "female") {
        toast.error("Gender must be 'male' or 'female'");
        return;
      }

      dispatch(showLoading());
      const response = await axios.put(
        "/api/astrologer/edit-astrologer-profile",
        {
          name: e.target.name.value ? e.target.name.value : data.name,
          email: e.target.email.value ? e.target.email.value : data.email,
          gender: e.target.gender.value ? e.target.gender.value : data.gender,
          languages: e.target.languages.value
            ? e.target.languages.value.split(',').map(lang => lang.trim())
            : data.languages,
          specialties: e.target.specialties.value
            ? e.target.specialties.value.split(',').map(spec => spec.trim())
            : data.specialties,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data)
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Profile Updated Successfully");
        navigate("/astrologer-profile");
      }
    } catch (error) {
      toast.error("Something Went Wrong " + error);
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
                  location.pathname === "/astrologer-profile" ||
                    location.pathname === "/astrologer-profile-edit"
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
          <h1 className="text-center">Edit Profile</h1>
          <div className="main-container">
            <form onSubmit={editAstrologer}>
              <div className="form-group">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={data?.name}
                          name="name"
                          required
                          pattern="[A-Za-z\s]+$"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={data?.email}
                          name="email"
                          required
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Gender</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={data?.gender ?? ""}
                          name="gender"
                          required
                        />
                      </div>
                    </div>
                    <h6>More Details</h6>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Languages</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          // value={data?.languages?.join(', ') ?? ""}
                          placeholder={data?.languages?.join(', ') ?? ""}
                          name="languages"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Specialties</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={data?.specialties?.join(', ') ?? ""}
                          name="specialties"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <button className="btn btn-primary px-4" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AstrologerProfileEdit;
