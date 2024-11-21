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
import UploadIcon from '../../assets/UploadIcon.svg'
import TermsIcon from '../../assets/terms-icon.svg'
import InfoIcon from '../../assets/info-circle.svg'
import KeyIcon from'../../assets/key-icon.svg'
import Close from'../../assets/ButtonCloseWhiteX.svg'
import LogoutRed from'../../assets/LogoutRed.svg'
import ProfileIcon from'../../assets/userIcon.svg'
import UserImage from'../../assets/UserImage.png'
import PencliCircled from'../../assets/PencliCircled.svg'
import ChangePass from'../../assets/ChangePass.svg'
import LogOutIcon from'../../assets/logOutIcon.svg'
import { logOut } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../utils/imageUpload'
import Loader from '../Loader';
import { useEditUserMutation,useQueryUserByEmailQuery } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';



const AdminLayout = () => {
  
  const user = useSelector(state =>  state.auth.userInfo);
  // const userEmail = useSelector(state =>  state.auth.userInfo.email);
  // console.log("user from admin layout", userEmail)
  // const {data, isLoading:queryLoading, isError:queryError, error} = useQueryUserByEmailQuery({email:userEmail})
  
  // if(queryLoading){
  //   return <Loader />
  // }
  
  // if(queryError){
  //   console.log("Error", error)
  //   return 'Something went wrong!'
  // }
  // console.log("data", data)
  // const user = data.user[0];




  const [showUserOptions, setShowUserOptions] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [image, setImage] = useState(user.image ? user.image : UserImage)
  const [showPassForm, setShowPassForm] = useState('')
  const [password, setPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')




  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logOutHandler = () => {
    dispatch(logOut())
    navigate('/login')
  }

  const userOptionsHandler = () => {
    setShowUserOptions(!showUserOptions)
  }

  const [editUser, {isLoading, isError}] = useEditUserMutation()


  const imageHandler = async (e) => {
    // console.log("Process image");
    setShowLoader(true)
    const file = e.target.files[0];
    // console.log("file", file)
    const uploaded = await uploadImage(file);
    console.log("Uploaded", uploaded)
    setImage(uploaded.url);
    // setShowImageUpload(false)
    const data = {
      image:uploaded.url
    }
    try {
      const apiRes = await editUser(data).unwrap();
      console.log("apiRes",apiRes)
    } catch (error) {
      console.log(error)
    }
    

    setShowLoader(false)
  }

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
    }finally{
      setShowPassForm(false)
    }
    
    

  }



  return (
    <>

      {showLoader && <Loader />}
      <div className="admin_container mx-auto px-[40px] max-w-[1480px] relative">
        
        <div className="header flex justify-between items-center py-5 ">
          <img src={BlueLogo} alt="" />
          <div className='flex justify-end gap-4 items-center'>
            <div className="cursor-pointer relative">
              <img onClick={userOptionsHandler} className='w-10 h-10 rounded-[100%]' src={image} alt="" />

              {showUserOptions && (
                <ul className="user_dropdown absolute top-[100%] py-8 px-6 mt-2 bg-[#111116] z-10 rounded right-0">
                  <li onClick={() => {setShowUserOptions(false);  setShowProfile(true)}} className='flex gap-2 font-medium px-2 py-4 mb-2.5'><img src={ProfileIcon} alt="" />Profile</li>
                  <li onClick={() => {setShowUserOptions(false);  setShowLogout(true)}} className='flex gap-2 font-medium px-2 py-4'><img src={LogOutIcon} alt="" /> Logout</li>
                </ul>
              )}
              


            </div>
          </div>
        </div>

        {showLogout && (
          <div className="logout_modal absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center backdrop-blur z-10 ">
            <div className="modal_inner rounded-lg px-6 py-4 bg-[#111116] w-full max-w-[400px]">
              <div className="flex justify-between ">
                <img src={LogoutRed} className='' alt="" />
                <img onClick={() => setShowLogout(false)} src={Close} className='cursor-pointer' alt="" />
              </div>

              <p className="text-lg font-semibold mt-4 mb-1">Logout</p>
              <p className="text-sm text-[#B0B0B0] ">Are you sure you want to Logout?</p>

              <div className="ctas flex justify-center gap-6 mt-8">
                <button onClick={() => setShowLogout(false)} className='text-sm font-semibold text-[#B0B0B0] border border-[#B0B0B0] rounded-lg h-11 flex items-center px-6'>Cancel</button>
                <button onClick={logOutHandler} className='bg-[#D92D20] text-white text-sm font-semibold rounded-lg h-11 flex items-center px-6 '>Logoout</button>
              </div>

            </div>
          </div>

        )}

        {showProfile && (
          <div className="logout_modal absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center backdrop-blur z-10 ">
            <div className="modal_inner rounded-lg px-6 py-4 bg-[#111116] w-full max-w-[632px]">
              <div className="flex justify-between ">
                <p className='text-2xl font-semibold text-white'>Profile </p>
                <img onClick={() => setShowProfile(false)} src={Close} className='cursor-pointer' alt="" />
              </div>

              <div className="profileImage relative w-[100px] cursor-pointer">
              <label htmlFor="solImg" className='cursor-pointer'>
                <img className='w-[100px] h-[100px] rounded-[100%]' src={image} alt="" />
                <img className='absolute bottom-0 right-0' src={PencliCircled} alt="" />
              </label>
              <input id="solImg" className='hidden' type="file" onChange={imageHandler} />
              </div>
              

              <p className="text-sm mt-8 mb-1.5">Email</p>
              <p className="mb-5">{user.email}</p>

              {!showPassForm && (
                <div className="flex justify-between">
                  <div className="t">
                    <p className="text-sm mt-8 mb-1.5">Password</p>
                    <p className="text-sm">***********</p>
                  </div>
                  <img onClick={() => setShowPassForm(true)} className='cursor-pointer max-w-[168px]' src={ChangePass} alt="" />
                </div>

              )}
              
              {showPassForm && (
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

                  <div className="flex justify-end gap-4 mt-8">
                      {/* <div onClick={() => setShowPassForm(false)} className="flex h-11 items-center px-6 border rounded-[100px] cursor-pointer bg-white text-black font-semibold text-sm">Cancel</div> */}
                      <button className='flex items-center h-11 rounded-[100px] bg-primary-blue px-6 font-semibold text-sm'>Save New Password</button>
                    </div>


                </form>
              </div>
              )}
              
              
            </div>
          </div>

        )}
        

        <div className="admin_content flex gap-4">
          
          <div className="admin_left_bar w-full max-w-[264px] pr-6 basis-0 grow-[1]">
            <ul className="admin_lists flex flex-col gap-2">
              <li><NavLink className={`flex gap-3 font-semibold text-base py-3 px-4 rounded-md `} to="/admin/dashboard"><img src={DashIcon} alt="" />Dashboard</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/home-content"><img src={HomeIcon} alt="" />Home Content</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/solutions/"><img src={SolIcon} alt="" />Manage Solutions</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/resources"><img src={CalIcon} alt="" />Monthly Content</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/terms"><img src={TermsIcon} alt="" />Terms & Conditions</NavLink></li>
              <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/support"><img src={InfoIcon} alt="" />Support</NavLink></li>
              {/* <li><NavLink className='flex gap-3 font-semibold text-base py-3 px-4 rounded-md' to="/admin/demo"><img src={KeyIcon} alt="" />Demo Request</NavLink></li> */}
            </ul>
          </div>
          <div className="admin_right_content basis-0 grow-[2] max-w-[1112px]">
            <Outlet />
          </div>
        </div>

        
      </div>
    </>
  )
}

export default AdminLayout