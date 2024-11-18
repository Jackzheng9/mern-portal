import React, { useState } from 'react'
import CompanyDetails from './settings/CompanyDetails';
import { useSelector } from 'react-redux';
import { useQueryUserByEmailQuery } from '../slices/userApiSlice';
import Loader from './Loader';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const user_email = useSelector(state => state.auth.userInfo.email);
  // console.log("user_email", user_email)

  const {data, isLoading, isError} = useQueryUserByEmailQuery({email:user_email})

  if(isLoading){
    return <Loader />
  }

  if (isError){
    return 'Something went wrong!'
  }

  const user = data.user[0];
  console.log("user", user);




  return (
    <>
    
      <div className="settings_content mt-20 ">
        <h1 className="mb-6" >Settings</h1>

        <ul className="tab_titles flex gap-2 text-[#667085]">
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'company' ? 'active text-white' : ''}`} onClick={() => setActiveTab('company')}>Company details</li>
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'password' ? 'active text-white' : ''}`} onClick={() => setActiveTab('password')}>Password</li>
        </ul>

        <div className="tab_content">
          {activeTab === 'company' && <CompanyDetails details={user.companyDetails} /> }
          {activeTab === 'password' && <div>Password content here</div>}
        </div>

      </div>
      
    </>
  )
}

export default Settings