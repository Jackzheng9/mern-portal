import React, { useState } from 'react'
import Pencil from '../../assets/pencil-white.svg'
import Desktop from '../../assets/desktop.svg'
import Badge from '../../assets/Badge.svg'
import dayjs from 'dayjs'
import { useEditUserMutation } from '../../slices/userApiSlice'
import { toast } from 'react-toastify'
import { configureStore } from '@reduxjs/toolkit'




const Password = ({user}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
 
  
  const [editUser, {isError, error}] = useEditUserMutation()
  
  const browsers = user.browserInfo;

  const changePassHandler = async (e) => {
    e.preventDefault();

    if(password === newPassword){
      toast.error("New Password and Old Password must not be same!")
      return;
    }

    if(newPassword !== confirmNewPassword){
      toast.error("New Password and confirm new password do not match!")
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New Password must be at least 6 characters long!");
      return;
    }


    const data = {
      password,
      newPassword
    }

    try {
      const apiRes = await editUser(data).unwrap();
      toast.success("Password changed successfully!")
    } catch (error) {
      console.log("error",error)
      toast.error(error.data.message)
    }
    
    

  }

  return (
    <div className='mt-8'>
      <div className="page_title flex justify-between items-center border-b border-[#282828] pb-5">
        <div>
          <h1 className="font-semibold text-lg">Password</h1>
          <p className="text-[#667085]">Please enter your current password to change your password.</p>
        </div>

        {!showEdit && <div onClick={() => setShowEdit(true)} className="flex gap-2 bg-primary-blue rounded-[100px] items-center px-6 h-11 cursor-pointer ">
          <img src={Pencil} alt="" /> Change Password
        </div> }
        
      </div>

      {showEdit && (
        <div className="editPasssword my-11">
        <form onSubmit={changePassHandler}>
          
          <div className="formgroup flex gap-8 mb-10">
            <label className='w-[232px]' htmlFor="">Current password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='border border-[#282828] h-11 flex items-center px-6 bg-transparent rounded-md' type="password" placeholder='••••••••' required  />
          </div>

          <div className="formgroup flex gap-8 mb-10">
            <label className='w-[232px]' htmlFor="">New password</label>
            <div>
              <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border border-[#282828] h-11 flex items-center px-6 bg-transparent rounded-md' type="password" placeholder='••••••••' required  />
              <p className='text-[#667085] mt-2'>Your new password must be more than 6 characters.</p>
            </div>
            
          </div>
          <div className="formgroup flex gap-8">
            <label className='w-[232px]' htmlFor="">Confirm New password</label>
            <div>
              <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className='border border-[#282828] h-11 flex items-center px-6 bg-transparent rounded-md' type="password" placeholder='••••••••' required />
            </div>
            
          </div>

          <div className="flex justify-end gap-4">
              <div onClick={() => setShowEdit(false)} className="flex h-11 items-center px-6 border rounded-[100px] cursor-pointer bg-white text-black font-semibold text-sm">Cancel</div>
              <button className='flex items-center h-11 rounded-[100px] bg-primary-blue px-6 font-semibold text-sm'>Save</button>
            </div>


        </form>
      </div>
      )}

      


      <div className="loggedIn mt-6 ">
        <p className="text-sm font-medium">Where you’re logged in</p>
        <p className="text-sm text-[#667085] pb-5 border-b border-[#282828]">We’ll alert you via olivia@untitledui.com if there is any unusual activity on your account.</p>

        <ul className='mt-1'>

          {browsers.map((browser,index)=>{

            return (<li key={index} className="flex gap-4 mt-5 border-b border-[#282828] pb-5">
              <div className=""><img src={Desktop} className='' alt="" /></div>
              <div className="">
                <div className="flex gap-2 items-center">
                  <p className='text-medium text-sm'>{browser.name} on {browser.platform}, version: {browser.version}</p>
                  {index == 0 ? <img src={Badge} alt="" /> : '' }
                </div>
                
                <p className='text-medium text-sm text-[#667085]'>
                  {dayjs(browser.time).format('MMMM D, YYYY [at] h:mm A')}
                </p>
              </div>
            </li>)
          })}


        </ul>
      </div>


    </div>
  )
}

export default Password