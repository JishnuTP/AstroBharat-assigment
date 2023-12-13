// import React, { useState } from "react";
import "./Register.css";
import logo from "../../logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useState } from "react";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      //validation
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      dispatch(showLoading());

      const response = await axios.post("/api/astrologer/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirected to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="login__wrapper">
        <div className="loginForm__container">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="text-center mb-3">Register Form</h2>

          <form
            className="d-flex flex-column  align-items-center"
            onSubmit={handleRegister}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                placeholder="Mathew John"
                className="form-control me-5"
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="form-control me-5"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="**************"
                className="form-control me-5"
                id="exampleInputPassword1"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>

          <Link to="/login" className="text-white mt-2">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
