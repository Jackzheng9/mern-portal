import React, { useState } from 'react'
import { useEditUserMutation } from '../../slices/userApiSlice'
import Loader from '../Loader'
import { copyWithStructuralSharing } from '@reduxjs/toolkit/query'
import { toast } from 'react-toastify'




const ProfileContent = ({user, showEdit, setShowEdit}) => {
  console.log("user", user)

  const [firstName, setFirstName] = useState(user.firstName ? user.firstName : "")
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : '')
  const [email, setEmail] = useState(user.email  ? user.email : '') 
  const [phone, setPhone] = useState(user.phoneNumber ? user.phoneNumber : '') 
  const [city, setCity] = useState(user.city ? user.city : '') 
  const [state, setState] = useState(user.state ? user.state : '') 
  const [country, setCountry] = useState(user.country ? user.country : '') 
  const [timezone, setTimezone] = useState(user.timezone ? user.timezone : '')

  const [editUser,{isLoading, isError}] = useEditUserMutation();
  if(isLoading){
    return <Loader />
  }

  if (isError){
    return 'Something went wrong!'
  }






  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      country,
      timezone

    }


    try {
      const apiRes = await editUser(data).unwrap();
      setShowEdit(false);
      toast.success("Profile saved")
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong!")
    }

  }


  return (
    <div>

      {!showEdit && (
        <div className="profile_content">
          <p className="text-[40px] text-[#F8F8F8] font-semibold mb-8">Personal  Info</p>
          <div className='profile_info'>
            
            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">First Name</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.firstName}</p>
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Last Name</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.lastName}</p>
              </div>

            </div>

            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Email</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.email}</p>
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Phone Number</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.phone}</p>
              </div>

            </div>

            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">City</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.city}</p>
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Sate/Province</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.state}</p>
              </div>

            </div>

            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Country</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.country}</p>
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Time zone</p>
                <p className="text-[#F8F8F8] font-medium text-sm">{user.timezone}</p>
              </div>

            </div>


          </div>
        </div>

      )}
      

      {showEdit && (
        <div className="edit_profile_content">
        <p className="text-[40px] text-[#F8F8F8] font-semibold mb-8">Edit Personal  Info</p>
        <div className='profile_info'>

          <form onSubmit={formSubmitHandler}>
          
            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">First Name</p>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='First Name' type="text" />
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Last Name</p>
                <input value={lastName} onChange={e => setLastName(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='Last  Name' type="text" />
              </div>

            </div>

            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Email</p>
                <input value={email} onChange={e => setEmail(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='Email' type="text" />
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Phone Number</p>
                <input value={phone} onChange={e => setPhone(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='Phone Number' type="text" />
              </div>

            </div>

            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">City</p>
                <input value={city} onChange={e => setCity(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='City' type="text" />
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Sate/Province</p>
                <input value={state} onChange={e => setState(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='State/Province' type="text" />
              </div>

            </div>

            <div className='info_row flex mb-4'>
              
              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Country</p>
                <input value={country} onChange={e => setCountry(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='Country' type="text" />
              </div>

              <div className='w-full max-w-[300px]'>
                <p className="text-[#8E8E8E] mb-1.5">Time zone</p>
                <input value={timezone} onChange={e => setTimezone(e.target.value)} className='h-11 flex px-3.5 items-center bg-[#131514] rounded-md' placeholder='Time Zone' type="text" />
              </div>

            </div>

            <div className="flex justify-end gap-4">
              <div onClick={() => setShowEdit(false)} className="flex h-11 items-center px-6 border rounded-[100px] cursor-pointer bg-white text-black font-semibold text-sm">Cancel</div>
              <button className='flex items-center h-11 rounded-[100px] bg-primary-blue px-6 font-semibold text-sm'>Save</button>
            </div>


          </form>


        </div>
      </div>

      )}
      


    </div>
  )
}

export default ProfileContent