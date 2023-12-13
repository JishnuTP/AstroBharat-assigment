import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../../logo.svg";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminAstrologerEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminKey");
    navigate("/admin");
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const getData = async (id) => {
    try {
      const id = searchParams.get("id");
      dispatch(showLoading());
      const res = await axios.post("/api/admin/get-astrologer-data", {
        id: id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
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

      const id = searchParams.get("id");
      dispatch(showLoading());
      const response = await axios.put("/api/admin/edit-astrologer-info", {
        name: e.target.name.value ? e.target.name.value : data.name,
        email: e.target.email.value ? e.target.email.value : data.email,
        gender: e.target.gender.value ? e.target.gender.value : data.gender,
        languages: e.target.languages.value
          ? e.target.languages.value.split(",").map((lang) => lang.trim())
          : data.languages,
        specialties: e.target.specialties.value
          ? e.target.specialties.value.split(",").map((spec) => spec.trim())
          : data.specialties,
        id: id,
      });



      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Profile Updated Successfully");
        navigate("/astrologers-list");
      }
    } catch (error) {
      toast.error("Something Went Wrong " + error);
    }
  };

  useEffect(() => {
    getData();
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
                Astrologers List
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="home-container-right">
          <div className="main-container">
            <h1>Edit Astrologer Details</h1>
            {/* Template Start */}

            <form onSubmit={editAstrologer}>
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
                          placeholder={data?.name}
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
                          placeholder={data?.email}
                          name="email"
                          required
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Gender</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input
                          type="text"
                          class="form-control"
                          placeholder={data?.gender ? data.gender : "//Enter gender//"}
                          name="gender"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Languages</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input
                          type="text"
                          class="form-control"
                          placeholder={data?.languages && data.languages.length > 0 ? data.languages.join(', ') : "//add data//"}

                          name="languages"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Specialities</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input
                          type="text"
                          class="form-control"
                          placeholder={data?.specialties && data.specialties.length > 0 ? data.specialties.join(', ') : "//add data//"}
                          name="specialties"
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

export default AdminAstrologerEdit;
