import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import Key from '../assets/key.svg'
import { useLoginMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login,{isLoading, isError, error}] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formHandler = async (e) => {
    e.preventDefault();
    if(password.length < 6){
      toast.error("Password should be at least 6 characters long");
      return;
    }
    const data = {
      email,password
    }

    try {
      const apiData = await login(data).unwrap();
      // const apiData = await register(data);
      console.log(apiData)
      toast.success("Login successful!")
      dispatch(setCredentials(apiData))
      if(apiData.role == 'admin' || apiData.role == 'superAdmin'){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
      console.log(error.data.msg)
      toast.error(error.data.message)
    }
    
  }


  return (
    <>
      <div className="max-w-[540px] rounded-xl   mx-auto my-[158px] bg-gradient-to-br from-[#ECECEC] to-[#494340] p-[1px]">
        <div className="bg-[#070707] backdrop-blur  rounded-xl p-10">
          <img src={Logo} alt="" className='mx-auto' />
          <form onSubmit={formHandler} action="" className='mt-4'>


            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="email" className='text-white'>Email</label>
                <input type="email" id="email" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
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

          <Link to="/register/" className="flex flex-col gap-4 justify-center items-center">
            <img className='w-8 h-8' src={Key} alt="" />
            <p className="font-mediul">Request An Access</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login