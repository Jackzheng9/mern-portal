import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import MsgIcon from '../../assets/msg_icon.svg'
import TimeIcon from '../../assets/time_icon.svg'
import TickIcon from '../../assets/tick_icon.svg'
import Search from '../../assets/search.svg'
import AllIcon from '../../assets/all_icon.svg'
import VerDots from '../../assets/ver-dots.svg'
import { useGetUsersQuery } from '../../slices/userApiSlice'
import dayjs from 'dayjs'



const Admin = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.userInfo)
  const statusFilterTerm = useSelector(state => state.usersFilter.status)
  const searchFilterTerm = useSelector(state => state.usersFilter.searchTerm)
  //console.log("status filter",  statusFilterTerm)
  // console.log("day", dayjs().get('date'))

  
  const {data, isLoading, isError, error, isSuccess } = useGetUsersQuery()
  useEffect(() => {
    console.log("user",user)
    console.log("data",data)
    // setUserList(data.users)
    if(!user){
      toast.error("Please login to view this page!")
      navigate('/login')
    }else if(user.role ==='user'){
      console.log(user.role)
      toast.error("You are not allowed to view this page! Only Admin can!")
      navigate('/')
    }



  },[])

  const dispatch = useDispatch();

  
  if(error){
    console.log(error)
    console.log(isError)
  }
  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>Loading</div>
  console.log(data)

  /*
  let usersList = data.users.filter(user => user.firstName == "test")
  console.log("Users list", usersList)
  */

  const formatDate= (userDate) => {
    let formattedDate = dayjs(userDate).format('MM/DD/YYYY');
    return formattedDate;
  }

  const statusFilterHandler = (user) => {
    if(statusFilterTerm == "All"){
      return true;
    }else{
      return user.status ===  statusFilterTerm;
    }    
  }

  const searchFilterHandler = (user) => {
    return user?.company?.toLowerCase()?.includes(searchFilterTerm);
  }


  return (
    <>
      <div className="dashboard_summary flex gap-6 w-full justify-between">
        
        <div className="dashboard_summary_col flex gap-4 items-center px-6 py-8 bg-[#1B1B1F] w-full">
          <img src={MsgIcon} className='w-14' alt="" />
          <div className="flex flex-col">
            <p className="text-[#E7E7E7] text-sm font-semibold">Total Requests</p>
            <p className="font-bold text-xl text-bold color-white">0000</p>
            <p className="text-sm text-[#E7E7E7]">All request including pending, accepted</p>
          </div>
        </div>

        <div className="dashboard_summary_col flex gap-4 items-center px-6 py-8 bg-[#1B1B1F] w-full">
          <img src={TimeIcon} className='w-14' alt="" />
          <div className="flex flex-col">
            <p className="text-[#E7E7E7] text-sm font-semibold">Pending Requests</p>
            <p className="font-bold text-xl text-bold color-white">0000</p>
            <p className="text-sm text-[#E7E7E7]">Total of 10</p>
          </div>
        </div>

        <div className="dashboard_summary_col flex gap-4 items-center px-6 py-8 bg-[#1B1B1F] w-full">
          <img src={TickIcon} className='w-14' alt="" />
          <div className="flex flex-col">
            <p className="text-[#E7E7E7] text-sm font-semibold">Accepted Requests</p>
            <p className="font-bold text-xl text-bold color-white">0000</p>
            <p className="text-sm text-[#E7E7E7]">Total of 10</p>
          </div>
        </div>


      </div>

      <div className="users_list">
        <div className="user_list_header flex justify-between">
          <p className="">Access Request</p>
          <div className="flex items-center gap-4">
            <div className="search flex gap-2">
              <input type="text" className='hidden' />
              <img src={Search} alt="" />
            </div>
            <div className="date">
              <form action="">
                <select className='text-black' name="date" id="">
                  <option value="">12 Jun - 12 Jul</option>
                </select>
              </form>
            </div>
            <div className="flex gap-1 items-center">
              <p className="">All</p> <img src={AllIcon} alt="" />
            </div>
          </div>
        </div>

        <div className="user_list_col_name flex justify-between text-[#B0B0B0]">
          <p className="w-full">Company Name</p>
          <p className="w-full">Request Date</p>
          <p className="w-full">Status</p>
          <p className="w-full">Actons</p>
        </div>

      </div>
      <ul>
        {
          data.users.filter(statusFilterHandler).filter(searchFilterHandler).map(user => 
            <li key={user._id} className='flex justify-between'>
              <span className='w-full flex'>{user.company}</span>
              <span className='w-full flex'>{ formatDate (user.createdAt)}</span>
              <span className='w-full flex'>{user.status}</span>
              <span className='w-full flex'><img className='cursor-pointer' src={VerDots} alt="" /></span>            
            </li>)
        }
      </ul>

      




        {/* {user && (<>
            <h2 className="text-2xl">Welcome {user.firstName} {user.lastName}!</h2>
            <p className="mt-12">Here is your account information!</p>
            <p className="mb-1"><span className="font-bold">Role:</span> {user.role} </p>
            <p className="mb-1"><span className="font-bold">Email:</span> {user.email} </p>
            <p className="mb-1"><span className="font-bold">Phone:</span> {user.phone} </p>
            <p className="mb-1"><span className="font-bold">Company:</span> {user.company} </p>
            <p className="mb-1"><span className="font-bold">Account Status:</span> {user.status} </p>
          </>
        )} */}
    </>

  )
}

export default Admin