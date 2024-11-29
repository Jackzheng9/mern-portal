import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSetNewPassMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import Loader from './Loader';

const NewPassword = () => {
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const { token } = useParams();
  console.log("token", token)


  const navigate = useNavigate()


  const [ setNewPass,{isLoading, isError}] = useSetNewPassMutation();

  if(isLoading){
    return <Loader />
  }


  const passFromHandler = async (e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword){
      toast.error("Password and Confirm Password do not matched!")
      return;
    }

    if(newPassword.length < 6){
      toast.error("Password should be at least 6 characters long");
      return;
    }

    const data = {
      newPassword,
      token
    }

    console.log("data",data)

    
    try {
      const setPassUser = await setNewPass(data).unwrap();
      console.log("setPassUser",setPassUser)
      toast.success("Password saved successfully!")
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error.data.message)
    }

    

  }


  return (
    <>
      <div className="max-w-[540px] rounded-xl   mx-auto my-[158px] bg-gradient-to-br from-[#ECECEC] to-[#494340] p-[1px]">
        <div className="bg-[#070707] backdrop-blur  rounded-xl p-10">
          <img src={Logo} alt="" className='mx-auto' />


          <form onSubmit={passFromHandler} action="" className='mt-4'>


            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="password" className='text-white'>Password</label>
                <input type="password" id="password" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
              </div>
            </div>

            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="confirmpassword" className='text-white'>Confirm Password</label>
                <input type="password" id="confirmpassword" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>
            </div>

            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <input type="submit" className='text-white bg-primary-blue font-semibold text-base leading-6 py-3 text-center w-full rounded-3xl border border-primary-blue cursor-pointer' value="Set Password" />
            </div>


          </form>

          





        </div>
      </div>
    </>
  )
}

export default NewPassword