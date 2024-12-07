import React, { useState } from 'react'
import UserProfile from '../assets/UserProfile.png'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useQueryUserByEmailQuery } from '../slices/userApiSlice'
import Loader from './Loader'
import ProfileContent from './profile/ProfileContent'

const Profile = () => {
  const [showEdit, setShowEdit] = useState(false)
 
  const userEmail = useSelector(state =>  state.auth.userInfo.email);
  //console.log("Email", userEmail)
  const  {data, isLoading, isError} = useQueryUserByEmailQuery({email: userEmail});
  
  if(isLoading){
    return <Loader />
  }

  if(isError){
    return 'Something went wrong!';
  }

  // console.log("data", data)
  const user = data.user[0];
  // console.log("User", user)

  


  return (
    <div className='py-11'>
    {!showEdit && (
      
      <div className="profile_header flex justify-between items-center mb-8">
        
        <div className="flex gap-6 items-center">
          <img src={user.image ? user.image : UserProfile} className='rounded-[100%] w-[154px] h-[154px]' alt="" />
          <div className="">
            <p className="text-[#F8F8F8] font-semibold text-2xl mb-4">{user.firstName} {user.lastName}</p>
            <p className="text-lg font-medium text-[#F8F8F8] mb-2">DAT U member</p>
            <p className="text-sm font-medium text-[#F8F8F8]">Joined on {dayjs(user.createdAt).format('MMMM D, YYYY')}</p>
          </div>
        </div>

        
          <div onClick={() => setShowEdit(true)} className="flex bg-primary-blue rounded-[100px] h-11 items-center px-6 cursor-pointer">Edit profile</div>
        
        
        
      </div>

    )}

      <ProfileContent user={user} showEdit={showEdit} setShowEdit={setShowEdit} />

    </div>
  )
}

export default Profile