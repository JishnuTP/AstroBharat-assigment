import React from 'react'
import { Navigate } from 'react-router-dom'


function ProtectAdminRoute(prop) {
  if (localStorage.getItem("adminKey")) {
    return prop.children
  } else {
    return <Navigate to="/admin" />
  }
}


export default ProtectAdminRoute