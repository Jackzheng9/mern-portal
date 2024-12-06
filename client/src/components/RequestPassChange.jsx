import React, { useState } from 'react'
import Key from '../assets/ForgetKey.svg'
import ArrowLeft from '../assets/arrow-left.svg'
import LeftBg from '../assets/login-left-bottom-bg.png'
import RightBg from '../assets/Login-right-top-bg.png'
import Mail from '../assets/MailBox.svg'
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useReqPassChangeMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import Loader from './Loader';

const RequestPassChange = () => {
  const [userFound, setUserFound] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ reqPassChange,{isLoading, isError}] = useReqPassChangeMutation();

  if(isLoading){
    return <Loader />
  }

  const formHandler = async (e) => {
    e.preventDefault();
    // console.log("email", email)
    const data = {
      email
    }

    try {
      const apiData = await reqPassChange(data).unwrap();
      console.log("apiData",apiData)
      toast.success("An email with reset password link sent to your inbox. Please check there!")
      //navigate('/login')
      setUserFound(true)   
    } catch (error) {
      console.log(error)
      toast.error(error.data.message)
    }
    
  }

  const passFromHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password do not matched!")
      return;
    }

    if(password.length < 6){
      toast.error("Password should be at least 6 characters long");
      return;
    }

    const data = {
      password,email
    }

    try {
      const setPassUser = await setUserPass(data).unwrap();
      console.log("setPassUser",setPassUser)
      toast.success("Password saved successfully!")
      dispatch(setCredentials(setPassUser))
      navigate('/onboarding')
    } catch (error) {
      console.log(error)
      toast.error(error.data.message)
    }

  }


  return (
    <>
      <div className="max-w-[540px] rounded-xl   mx-auto my-[158px] bg-gradient-to-br from-[#ECECEC] to-[#494340] p-[1px] relative">
        <div className="bg-[#000] relative z-20 backdrop-blur  rounded-xl p-10">



          {!userFound && (
            <>
              <img src={Key} alt="" className='mx-auto' />
              <h1 className="mt-6 font-bold text-3xl mb-3 text-center">Forgot password?</h1>
              <p className="text-[#B0B0B0] text-sm text-center">No worries, we’ll send you reset instructions.</p>


              <form onSubmit={formHandler} action="" className='mt-8'>


              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="email" className='text-white'>Email</label>
                  <input type="email" id="email" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>

              <div className="form-group flex flex-col md:flex-row w-full mb-6">
                <input type="submit" className='text-white bg-primary-blue font-semibold text-base leading-6 py-3 text-center w-full rounded-3xl border border-primary-blue cursor-pointer' value="Reset Password" />
              </div>


              </form>
              <Link to='/login' className='flex gap-2 items-center font-semibold justify-center'><img src={ArrowLeft} alt="" /> Back to log in</Link>
            </>
          )}


          {userFound && (
          <>
              <img src={Mail} alt="" className='mx-auto' />
              <h1 className="mt-6 font-bold text-3xl mb-3 text-center">Check your email</h1>
              <p className="text-[#B0B0B0] text-sm text-center">`We sent a password reset link to ${email}`</p>

              <p className="text-[#B0B0B0] text-center my-8">Didn’t receive the email? <span className='text-primary-blue cursor-pointer' onClick={formHandler}> Click to resend </span> </p>

              <Link to='/login' className='flex gap-2 items-center font-semibold justify-center'><img src={ArrowLeft} alt="" /> Back to log in</Link>    
          
          

          </>

          )}





        </div>
        <img src={LeftBg} className='absolute w-[600px] left-[-20%] bottom-[-20%] z-10' alt="" />
        <img src={RightBg} className='absolute w-[800px] right-[-20%] top-[-20%] z-10' alt="" />

      </div>
    </>
  )
}

export default RequestPassChange