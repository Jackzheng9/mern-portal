import React, { useState } from 'react'
import CompanyDetails from './settings/CompanyDetails';
import Password from './settings/Password';
import { useSelector } from 'react-redux';
import { useQueryUserByEmailQuery } from '../slices/userApiSlice';
import Loader from './Loader';
import Notifications from './settings/Notifications';
import Terms from './settings/Terms';
import Faqs from './settings/Faqs';

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
  // console.log("user", user);




  return (
    <>
    
      <div className="settings_content mt-20 min-h-[80vh]">
        <h1 className="mb-14 text-3xl font-semibold" >Settings</h1>

        <ul className="tab_titles flex gap-2 text-[#667085]">
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'company' ? 'active text-white' : ''}`} onClick={() => setActiveTab('company')}>Company details</li>
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'password' ? 'active text-white' : ''}`} onClick={() => setActiveTab('password')}>Password</li>
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'notifications' ? 'active text-white' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</li>
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'terms' ? 'active text-white' : ''}`} onClick={() => setActiveTab('terms')}>Terms and Conditions</li>
          <li className={`px-3 py-2 cursor-pointer font-semibold ${activeTab === 'faqs' ? 'active text-white' : ''}`} onClick={() => setActiveTab('faqs')}>Help and Support</li>
        </ul>

        <div className="tab_content">
          {activeTab === 'company' && <CompanyDetails user={user} /> }
          {activeTab === 'password' && <Password user={user} />}
          {activeTab === 'notifications' && <Notifications user={user} />}
          {activeTab === 'terms' && <Terms />}
          {activeTab === 'faqs' && <Faqs />}
        </div>

      </div>
      
    </>
  )
}

export default Settings