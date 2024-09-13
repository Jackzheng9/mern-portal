import React, { useEffect, useState, useRef } from 'react'
import AdminSideMenu from './AdminSideMenu'
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useLazyGetUserByIdQuery } from '../../slices/userApiSlice';
import { FaPencilAlt } from "react-icons/fa";
import { useEditUserAdminMutation } from '../../slices/userApiSlice';
import { useSelector } from 'react-redux';



const AdminUserEdit =  () => {
  const [isEditing,setIsEditing] = useState(false);
  const [status,setStatus] = useState(null);
  const [role,setRole] = useState(null);
  const [email,setEmail] = useState(null);
  const [firstName,setFirstName] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [company,setCompany] = useState(null);
  const [phone,setPhone] = useState(null);

  
  const statusRef = useRef()
  const roleRef = useRef()
  let { id } = useParams();
  //const {data, isLoading: isLoadingUser, isError: isErrorUser, Error} = useGetUserByIdQuery({id})
  const [editUser, {isLoading: isLoadingEdit, isError: isErrorEdit}] = useEditUserAdminMutation()
  const [trigger]= useLazyGetUserByIdQuery({id})

  const loggedInUser = useSelector(state => state.auth.userInfo)

  useEffect(()=>{
    const fetchData = async () => {
      const data = await trigger({id}).unwrap();
      const userData = data.user;
      // console.log(userData)
      setStatus(userData.status)
      setRole(userData.role)
      setEmail(userData.email)
      setFirstName(userData.firstName)
      setLastName(userData.lastName)
      setPhone(userData.phone)
      setCompany(userData.company)
    }

    fetchData()
    
    console.log(loggedInUser)    

  },[])





  // if (isLoadingUser || isLoadingEdit) return <div>Loading</div>
  if (isLoadingEdit) return <div>Loading</div>
  // if (isErrorUser || isErrorEdit) return <div>Error: {Error}</div>
  if ( isErrorEdit) return <div>Error: {Error}</div>
  // console.log('user',data);


  const editHandler = () => {
    setIsEditing(true)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(statusRef.current.value)
    console.log(roleRef.current.value)
    const data = {role:roleRef.current.value, status:statusRef.current.value, email}
    const editedUser = await editUser(data).unwrap();
    // console.log("editedUser", editedUser)
    setIsEditing(false)
    setStatus(editedUser.status)
    setRole(editedUser.role)
  }

  return (
    <div className="flex">
      <div className="sidebar w-1/3">
        <AdminSideMenu />
      </div>
      <div className="main w-2/3 relative px-12">
        <div className="absolute right-10 top-10 flex w-auto p-4 flex-col items-center gap-2 border border-white rounded cursor-pointer" onClick={editHandler}>
            <FaPencilAlt/>
            Edit User
        </div>
        <h2 className="text-2xl">User details page.</h2>
        <div className="userInfo mt-10">
          <p className="mb-1"><span className="font-bold">Name:</span> {firstName} {lastName} </p>
          <p className="mb-1"><span className="font-bold">Role:</span> {role} </p>
          <p className="mb-1"><span className="font-bold">Email:</span> {email} </p>
          <p className="mb-1"><span className="font-bold">Phone:</span> {phone} </p>
          <p className="mb-1"><span className="font-bold">Company:</span> {company} </p>
          <p className="mb-1"><span className="font-bold">Account Status:</span> {status} </p>
        </div>
        {isEditing && (
          <div className="userEdit">
            <form onSubmit={submitHandler}>
              
              <div className="form_group flex flex-col gap-2">
                <label htmlFor="status">Status</label>
                <select className='text-black' name="" id="status" defaultValue={status} ref={statusRef}>
                  <option value="pending" >Pending</option>
                  <option value="approved" >Approved</option>
                </select>
              </div>

              <div className="form_group flex flex-col gap-2">
                <label htmlFor="status">Role</label>
                <select className='text-black' name="" id="status" defaultValue={role} ref={roleRef} >
                  <option value="user" >User</option>
                  <option value="admin" >Admin</option>
                  <option value="superAdmin" >Super Admin</option>
                </select>
              </div>

              <input type="submit" value="Edit user" />


            </form>
        </div>

        )}


      </div>
    </div>
  )
}

export default AdminUserEdit