import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Astrologer/Register";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Astrologer/Login";
import HomePage from "./components/Astrologer/HomePage";
import AstrologerProfile from "./components/Astrologer/AstrologerProfile";
import AstrologerProfileEdit from "./components/Astrologer/AstrologerProfileEdit";


import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import PublicAdminRoute from "./components/Admin/PublicAdminRoute";
import ProtectAdminRoute from "./components/Admin/ProtectAdminRoute";
import AstrologersList from "./components/Admin/AstrologersList";
import AdminAstrologerEdit from "./components/Admin/AdminAstrologerEdit";
import AddAstrologer from "./components/Admin/AddAstrologer";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Astrologer Side */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/astrologer-profile"
          element={
            <ProtectedRoute>
              {" "}
              <AstrologerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/astrologer-profile-edit"
          element={
            <ProtectedRoute>
              {" "}
              <AstrologerProfileEdit />
            </ProtectedRoute>
          }
        />
        {/* Admin side */}
        <Route
          path="/admin"
          element={
            <PublicAdminRoute>
              {" "}
              <AdminLogin />{" "}
            </PublicAdminRoute>
          }
        />
        <Route
          path="/adminHome"
          element={
            <ProtectAdminRoute>
              {" "}
              <AdminHome />{" "}
            </ProtectAdminRoute>
          }
        />
        <Route path="/astrologers-list" element={
          <ProtectAdminRoute>
            <AstrologersList />
          </ProtectAdminRoute>
        }/>
        <Route path="/admin-astrologer-edit" element={
          <ProtectAdminRoute>
            <AdminAstrologerEdit  />
          </ProtectAdminRoute>
        } />
        <Route path="/admin-add-astrologer" element={
          <ProtectAdminRoute>
            <AddAstrologer/>
          </ProtectAdminRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
