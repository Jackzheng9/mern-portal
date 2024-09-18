import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useLazyGetUserByIdQuery } from '../../slices/userApiSlice';
import ChevronRight from '../../assets/chevron-right.svg'
import ArrowLeft from '../../assets/arrow-narrow-left.svg'
import { Link } from 'react-router-dom';


const AdminUserDetails =  () => {
  let { id } = useParams();
  const [user, setUser] = useState({})

  const [trigger]= useLazyGetUserByIdQuery({id})
  useEffect(()=>{
    const fetchData = async () => {
      const data = await trigger({id}).unwrap();
      const userData = data.user;
      console.log(userData)
      setUser(userData)
      /*
      setStatus(userData.status)
      setRole(userData.role)
      setEmail(userData.email)
      setFirstName(userData.firstName)
      setLastName(userData.lastName)
      setPhone(userData.phone)
      setCompany(userData.company)
      */
    }

    fetchData()
       

  },[])


  return (
    <>
      <div className="admin_breadcrumb flex items-center gap-3 mb-4">
        <Link to="/admin/dashboard" className="text-gray-300">Dashboard</Link>
        <p className=""><img src={ChevronRight} alt="" /></p>
        <Link to="/admin/dashboard" className="text-gray-300">Access Requests</Link>
        <p className=""><img src={ChevronRight} alt="" /></p>
        <p className="text-primary-blue">Company detail's</p>
      </div>

      <div className="flex justify-between">

        <Link to="/admin/dashboard" className="backBtn flex gap-2"><img src={ArrowLeft} alt="" /> <p className="text-white text-2xl">Company details</p></Link>

        <div className="flex gap-2">
          <p className="text-base font-raleway font-semibold" >Status</p>   
          <span className="w-full flex"> <span className={`status_text border rounded-2xl text-xs font-medium h-[22px] flex items-center px-[6px] py-[8px] ${user.status == 'Accepted' ? 'border-[#027A48] text-[#027A48]' : ""} ${user.status == 'Rejected' ? 'border-[#F04438] text-[#F04438]' : ""} ${user.status == 'Pending' ? 'border-[#F79009] text-[#F79009]' : ""}`}>{user.status}</span> </span>


        </div>

      </div>
      
    </>
  )

}

export default AdminUserDetails