import React from 'react'
import { Link } from 'react-router-dom'
import { logOut } from '../../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminSideMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutHandler = () => {
    dispatch(logOut())
    navigate('/login')
  }
  return (
    <>
      <ul className="side_menu flex flex-col gap-1 my-3">
        <li className='cursor-pointer' ><Link to="/admin/users" >Users</Link></li>
        <li className='cursor-pointer' ><Link to="/admin/solutions" >Solutions</Link></li>
        <li className='cursor-pointer' onClick={logOutHandler} >Logout</li>
      </ul>
    </>
  )
}

export default AdminSideMenu