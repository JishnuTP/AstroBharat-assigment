import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { toast } from "react-hot-toast";
import axios from "axios";

function AddAstrologer() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminKey");
    navigate("/admin");
  };

  const addAstrologer = async (e) => {
    try {
      e.preventDefault();

      if (!e.target.name.value.match(/^[A-Za-z\s]+$/)) {
        toast.error("Invalid name format");
        return;
      }

      if (!e.target.email.value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
        toast.error("Invalid email format");
        return;
      }
      const passwordValue = e.target.password.value.trim();

      if (passwordValue.length < 5) {
        toast.error("Password must be at least 5 characters long");
        return;
      }
      const res = await axios.post("/api/admin/add-astrologer", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/astrologers-list");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
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
            <h1>Add Astrologer</h1>
            {/* Template Start */}

            <form onSubmit={addAstrologer}>
              <div className="form-group">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Full Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="John mathew"
                          name="name"
                          required
                          pattern="[A-Za-z\s]+"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="email@example.com"
                          name="email"
                          required
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Password</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="*********"
                          name="password"
                          required
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-3"></div>
                      <div class="col-sm-9 text-secondary">
                        <button className="btn btn-primary px-4" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Template End */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAstrologer;
