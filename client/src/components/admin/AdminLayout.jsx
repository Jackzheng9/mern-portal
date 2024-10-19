import React, { useState } from 'react'
import { Outlet, NavLink } from "react-router-dom";
import BlueLogo from '../../assets/LogoBlue.svg'
import Settings from '../../assets/settings.svg'
import Notification from '../../assets/notification.svg'
import User from '../../assets/user.png'
import DashIcon from '../../assets/dash-icon.svg'
import HomeIcon from '../../assets/home-icon.svg'
import SolIcon from '../../assets/sol-icon.svg'
import CalIcon from '../../assets/cal-icon.svg'
import TermsIcon from '../../assets/terms-icon.svg'
import InfoIcon from '../../assets/info-circle.svg'
import KeyIcon from'../../assets/key-icon.svg'
import { logOut } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminLayout = () => {
  const [showUserOptions, setShowUserOptions] = useState(false)
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOutHandler = () => {
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <>
      <div className="admin_container mx-auto px-[40px] max-w-[1480px]">
        
        <div className="header flex justify-between items-center py-5 ">
          <img src={BlueLogo} alt="" />
          <div className='flex justify-end gap-4 items-center'>
            <div className="flex gap-1 items-center">
              <div className="cursor-pointer "><img src={Settings} alt="" /></div>
              <div className="cursor-pointer "><img src={Notification} alt="" /></div>
            </div>
            <div className="cursor-pointer relative">
              <img className='w-10' src={User} alt="" />
              <ul className="user_dropdown absolute top-[100%] p-2 mt-2 rounded bg-gray-600">
                <li onClick={logOutHandler} className=''>Logout</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="admin_content flex gap-4">
          <div className="admin_left_bar min-w-[264px] pr-6">
            <ul className="admin_lists flex flex-col gap-2">
              <li><NavLink className={`flex gap-3 font-semibold text-base py-3 px-4 rounded-md `} to="/admin/dashboard"><img src={DashIcon} alt="" />Dashboard</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/homecontent"><img src={HomeIcon} alt="" />Home Content</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/solutions/"><img src={SolIcon} alt="" />Manage Solutions</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/resources"><img src={CalIcon} alt="" />Monthly Content</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/terms"><img src={TermsIcon} alt="" />Terms & Conditions</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/support"><img src={InfoIcon} alt="" />Support</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/demo"><img src={KeyIcon} alt="" />Demo Request</NavLink></li>
            </ul>
          </div>
          <div className="admin_right_content w-full">
            <Outlet />
          </div>
        </div>

        
      </div>
    </>
  )
}

export default AdminLayout