import React, { useState } from 'react'
import Logo from '../assets/LogoBlue.svg'
import LeftBg from '../assets/login-left-bottom-bg.png'
import RightBg from '../assets/Login-right-top-bg.png'
import Checkbox from '../assets/Checkbox.svg'
import CheckboxSelected from '../assets/Checkbox-blue-selected.svg'
import Key from '../assets/key.svg'
import { useLoginMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useEditUserMutation } from '../slices/userApiSlice';
import { setInitialInfo } from '../slices/userInfoSlice';
import dayjs from 'dayjs';

import Loader from './Loader';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 

  const [login,{isLoading, isError, error}] = useLoginMutation()
  
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [editUser] = useEditUserMutation()

  const formHandler = async (e) => {
    e.preventDefault();
    if(password.length < 6){
      toast.error("Password should be at least 6 characters long");
      return;
    }
    const formData = {
      email,password, rememberMe
    }
    // console.log("data", formData)

    
    try {
      const apiData = await login(formData).unwrap();
      toast.success("Login successful!")
      dispatch(setCredentials(apiData))
      dispatch(setInitialInfo(apiData))
      
      if(apiData.role == 'admin' || apiData.role == 'superAdmin'){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.data.message)
    }

    
    
  }



  return (
    <>
      <div className="login_wrap">
        {/* <div className="max-w-[540px] rounded-xl   mx-auto mt-[158px] bg-gradient-to-br from-[#ECECEC] to-[#494340] p-[1px] relative"> */}
        <div className="max-w-[540px] rounded-xl   mx-auto my-[158px] p-[1px] relative">
          <div className="bg-[#222227] backdrop-blur  rounded-xl p-10 relative z-20">
            <img src={Logo} alt="" className='mx-auto h-11' />
            <div className="mt-6 flex flex-col justify-center items-center">
              <p className="text-3xl font-semibold mb-3">Log in to your account</p>
              <p className="text-[#E7E7E7]">Welcome back! Please enter your details.</p>
            </div>
            <form onSubmit={formHandler} action="" className='mt-8'>


              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="email" className='text-white'>Email</label>
                  <input type="email" id="email" className='bg-[#1C1C1C] text-input  px-4 py-2 rounded-md w-full text-[#8E8E8E]' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>




              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="password" className='text-white'>Password</label>
                  <input type="password" id="password" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>

              

              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <input type="submit" className='text-white bg-primary-blue font-semibold text-base leading-6 py-3 text-center w-full rounded-3xl border border-primary-blue cursor-pointer' value="Login" />
              </div>


            </form>

          </div>

          <img src={LeftBg} className='hidden absolute w-[600px] left-[-20%] bottom-[-20%] z-10' alt="" />
          <img src={RightBg} className='hidden absolute w-[800px] right-[-20%] top-[-20%] z-10' alt="" />
        </div>
      </div>
    </>
  )
}

export default AdminLogin