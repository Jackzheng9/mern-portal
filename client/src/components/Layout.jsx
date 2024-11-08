import React, { useState,useEffect } from 'react'
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.svg'
import Settings from '../assets/settingsGray.svg'
import Twitter from '../assets/twitter.svg'
import LinkedIn from '../assets/linkedIn.svg'
import Notification from '../assets/notificationGray.svg'
import NotificationWhite from '../assets/notificationWhite.svg'

import { logOut } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';



import Notifications from './Notifications';


const Layout = () => {
  const user = useSelector(state => state.auth.userInfo)
  const userEmail = user.email;

  const [showAccOptions, setShowAccOptions] = useState(false)
  const [showNotiPanel, setShowNotiPanel] = useState(false)
  

  const accountOptionsHandler = () => {
    setShowAccOptions(!showAccOptions)
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut())
    navigate('/login')
  }



  const toggleNotification = () => {
    setShowNotiPanel(!showNotiPanel)
  }

  
  
  
  
  


  


  



/*
  const allItems = [{id:1, title:"Item 1"}, {id:2, title:"Item 2"},{id:3, title:"Item 3"}, {id:4, title:"Item 4"}]
  const readItems = [{id:1, text:"Item 1"}, {id:3, text:"Item 3"}]

  const notInReadItems = allItems.filter(item => 
    !readItems.some(readItem => readItem.id === item.id)
  );
// console.log("notInReadItems", notInReadItems)

*/





  
  
 
 

  
  





  return (
    <>

      <div className="header">
        <div className="container">
          <div className="flex justify-between gap-2 py-4 items-center relative">
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
                <li>
                  {!showNotiPanel && <img onClick={toggleNotification} className="cursor-pointer" src={Notification} alt="" /> }
                  {showNotiPanel && <img onClick={toggleNotification} className=" cursor-pointer" src={NotificationWhite} alt="" /> }
                  { showNotiPanel && <Notifications />}
                </li>
                <li className='relative'>
                  <div onClick={accountOptionsHandler} className="initials bg-dark-blue text-lg font-medium h-12 w-12 rounded-[100px] flex items-center justify-center cursor-pointer">MG</div>
                  {showAccOptions && (
                    <ul className="absolute top-[100%] w-full l-0">
                      <li onClick={logoutHandler} className='cursor-pointer'>Logout</li>
                    </ul>
                  )}
                  
                </li>
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