import React, { useState } from 'react'
import LeftBg from '../assets/login-left-bottom-bg.png'
import RightBg from '../assets/Login-right-top-bg.png'
import Check from '../assets/GreenYes.svg'
import Key from '../assets/ForgetKey.svg'
import Eye from '../assets/EyePass.svg'
import ArrowLeft from '../assets/arrow-left.svg'
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSetNewPassMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import Loader from './Loader';
import { setInitialInfo } from '../slices/userInfoSlice'




const NewPassword = () => {
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState(null)
  const { token } = useParams();
  console.log("token", token)


  const navigate = useNavigate()
  const dispatch = useDispatch()


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
      // navigate('/login')
      setUser({...setPassUser.user})
      setIsSuccess(true)

    } catch (error) {
      console.log(error)
      toast.error(error.data.message)
      navigate('/reset-password')
    }

    

  }

  const doMagic = (e) => {
    e.preventDefault();
    console.log("doing magical login")
    dispatch(setCredentials({...user}))
    dispatch(setInitialInfo({...user}))
    navigate('/') 
  }


  return (
    <>
      <div className="max-w-[540px] rounded-xl   mx-auto my-[158px] bg-gradient-to-br from-[#ECECEC] to-[#494340] p-[1px] relative">
        <div className="bg-[#000] backdrop-blur  rounded-xl p-10 relative z-20">
          
          {!isSuccess && (<>
            <img src={Key} alt="" className='mx-auto' />
            <h1 className="mt-6 font-bold text-3xl mb-3 text-center">Set new password</h1>
            <p className="text-[#B0B0B0] text-sm text-center max-w-[360px] mx-auto">Your new password must be different to previously used passwords.</p>

            <form onSubmit={passFromHandler} action="" className='mt-4'>


              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="password" className='text-white'>Password</label>
                  <div className="relative">
                    <input  type={showPassword ? "text" : "password"} id="password" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='★★★★★★' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    <img onClick={() => setShowPassword(!showPassword)}   className='absolute right-3.5 top-[50%] -translate-y-[50%] cursor-pointer' src={Eye} alt="" />
                  </div>
                </div>
              </div>

              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="confirmpassword" className='text-white'>Confirm Password</label>


                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} id="confirmpassword" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='★★★★★★' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <img onClick={() => setShowConfirmPassword(!showConfirmPassword)}   className='absolute right-3.5 top-[50%] -translate-y-[50%] cursor-pointer' src={Eye} alt="" />
                  </div>



                </div>
              </div>

              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <input type="submit" className='text-white bg-primary-blue font-semibold text-base leading-6 py-3 text-center w-full rounded-3xl border border-primary-blue cursor-pointer' value="Reset Password" />
              </div>


            </form>          
          </>)}


          {isSuccess && (<>
            <img src={Check} alt="" className='mx-auto' />
            <h1 className="mt-6 font-bold text-3xl mb-3 text-center">Password reset</h1>
            <p className="text-[#B0B0B0] text-sm text-center max-w-[360px] mx-auto">Your password has been successfully reset. Click below to log in magically.</p>

            <form onSubmit={doMagic} className='mt-4'>


              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <input type="submit" className='text-white bg-primary-blue font-semibold text-base leading-6 py-3 text-center w-full rounded-3xl border border-primary-blue cursor-pointer' value="Continue" />
              </div>


            </form>          
          </>)}


          <Link to='/login' className='flex gap-2 items-center font-semibold justify-center'><img src={ArrowLeft} alt="" /> Back to log in</Link>           





        </div>

        <img src={LeftBg} className='absolute w-[600px] left-[-20%] bottom-[-20%] z-10' alt="" />
        <img src={RightBg} className='absolute w-[800px] right-[-20%] top-[-20%] z-10' alt="" />
      </div>
    </>
  )
}

export default NewPassword