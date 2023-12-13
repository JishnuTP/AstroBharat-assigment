import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import "./AstrologersList.css";
import { toast } from "react-hot-toast";
import axios from "axios";

function AstrologersList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [astrologers, setAstrologers] = useState([]);
  const [search, setSearch] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminKey");
    navigate("/admin");
  };

  const handleAstrologerdelete = async (id) => {
    try {
      const response = await axios.post("/api/admin/delete-astrologer-by-id", {
        id: id,
      });
      if (response.data.success) {
        getData();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somethin went wrong");
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("/api/admin/astrologers-list");
      if (response.data.success) {
        setAstrologers(response.data.astrologers);
        console.log(astrologers);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
            <h1>Astrolegers List</h1>

            <Link to="/admin-add-astrologer" className="btn btn-secondary mt-4 mb-2">
              Add astrologer
            </Link>
            <div class="input-group flex-nowrap mt-2 mb-2">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa fa-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Astrologername"
                aria-describedby="addon-wrapping"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="main-box clearfix">
                    <div class="table-responsive">
                      <table class="table astrologer-list">
                        <thead>
                          <tr>
                            <th>
                              <span>Astrologer</span>
                            </th>
                            <th>
                              <span>Created</span>
                            </th>
                            <th class="text-center">
                              <span>Status</span>
                            </th>
                            <th>
                              <span>Email</span>
                            </th>
                            <th>
                              <span>Gender</span>
                            </th>
                            <th>
                              <span>Languages</span>
                            </th>
                            <th>
                              <span>Specialties</span>
                            </th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {astrologers
                            .filter((astrologer) => {
                              return search.toLowerCase() === ""
                                ? astrologer
                                : astrologer.name.toLowerCase().includes(search);
                            })
                            .map((astrologer) => (
                              <>
                                <tr>
                                  <td>
                                    <img
                                      src={astrologer?.profile}
                                      alt={astrologer?.profile}
                                      key={astrologer?.id}
                                    />
                                    <p class="astrologer-link">{astrologer?.name}</p>
                                  </td>
                                  <td>{astrologer?.createdAt}</td>
                                  <td class="text-center">
                                    <span class="label label-default">
                                      Active
                                    </span>
                                  </td>
                                  <td>
                                    <p>{astrologer?.email}</p>
                                  </td>
                                  <td>
                                    <p> {astrologer?.gender ? (astrologer.gender) : (<span style={{ color: 'red' }}>No gender data available</span>)}</p>
                                  </td>
                                  <td>
                                    {astrologer?.languages && astrologer.languages.length > 0 ? (
                                      <p>{astrologer.languages.join(', ')}</p>
                                    ) : (
                                      <span style={{ color: 'red' }}>No language data available </span>
                                    )}
                                  </td>
                                  <td>
                                    {astrologer?.specialties && astrologer.specialties.length > 0 ? (
                                      <p>{astrologer.specialties.join(', ')}</p>
                                    ) : (
                                      <span style={{ color: 'red' }}>No specialty data available </span>
                                    )}
                                  </td>
                                  <td style={{ width: "20%" }}>
                                    <Link
                                      to={`/admin-astrologer-edit?id=${astrologer?._id}`}
                                      class="table-link"
                                    >
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </Link>
                                    <Link
                                      onClick={() => handleAstrologerdelete(astrologer?._id)}
                                      class="table-link danger"
                                    >
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
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

export default AstrologersList;
