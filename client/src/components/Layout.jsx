import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";
import Logo from '../assets/logo.svg'
import Settings from '../assets/settingsGray.svg'
import Twitter from '../assets/twitter.svg'
import LinkedIn from '../assets/linkedIn.svg'
import Notification from '../assets/notificationGray.svg'

const Layout = () => {
  return (
    <>

      <div className="header">
        <div className="container">
          <div className="flex justify-between gap-2 py-4 items-center">
            <Link to="/"><img src={Logo} alt="" /></Link>
            <div className="main_menu_wrap">
              <ul className='flex gap-2'>
                <li><NavLink className="text-gray-nine" to="/">Home</NavLink></li>
                <li><NavLink className="text-gray-nine" to="/solutions">Solutions</NavLink></li>
                <li><NavLink className="text-gray-nine" to="/resources">Resources</NavLink></li>
              </ul>
            </div>

            <div className="right_menu_wrap">
              <ul className='flex gap-4 items-center'>
                <li><NavLink to=""><div className="header_cta bg-primary-blue rounded-[100px] px-6 h-12 flex items-center">Let's Build</div></NavLink></li>
                <li><NavLink to=""><img src={Settings} alt="" /></NavLink></li>
                <li><NavLink to=""><img src={Notification} alt="" /></NavLink></li>
                <li><NavLink to=""><div className="initials bg-dark-blue text-lg font-medium h-12 w-12 rounded-[100px] flex items-center justify-center">MG</div></NavLink></li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>

      <div className="main_content container">
        <Outlet />
      </div>

      <div className="footer container py-4">
        <div className="flex justify-between">
          <div className="footer_left flex items-center gap-3 text-[#EFEFEF]">
            <p className="">&copy; 2024 - All rights reserved</p>
            <p className="">|</p>
            <p className="">DisruptREADY - Innovate Fearlessly</p>
          </div>

          <div className="footer_right flex gap-6">
            <Link to=""><img src={Twitter} alt="" /></Link>
            <Link to=""><img src={LinkedIn} alt="" /></Link>
          </div>
        </div>
      </div>



    </>
  )
}

export default Layout