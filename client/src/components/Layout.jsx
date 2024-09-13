import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <ul className='flex gap-2'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/solutions">Solutions</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
      <Outlet />
      <p className="text-sm">Footer will be here</p>
    </>
  )
}

export default Layout