import React from 'react'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../../slices/userApiSlice'
import AdminSideMenu from './AdminSideMenu'


const UserList = () => {
  const {data, isLoading, isError, error } = useGetUsersQuery()
  if(error){
    console.log(error)
    console.log(isError)
  }
  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>Loading</div>
  console.log(data)


  return (
    <div className="flex">
      <div className="sidebar w-1/3">
        <AdminSideMenu />
      </div>
      <div className="main w-2/3 px-12">
        <h2 className="text-2xl mb-1">List of available users</h2>
        <p className='text-xl mb-4'>Click on any user name to edit the user</p>
      
        <ul className='userNameList'>
          {data && (
            data.users.map(user => <li key={user._id}><Link to={`/admin/users/${user._id}`}>{user.firstName} {user.lastName}</Link></li>)

          )}
          
        </ul>
      </div>
    </div>
  )
}

export default UserList