import React, { useState } from 'react'
import Pencil from '../../assets/pencil-white.svg'
import { useEditUserMutation } from '../../slices/userApiSlice'
import Loader from '../Loader'
import { toast } from 'react-toastify'


const CompanyDetails = ({details}) => {

  console.log("Details", details);

  const [companyName, setComapnyName] = useState(details  ? details?.companyName : '');
  const [website, setWebsite] = useState(details ? details?.website : '');
  const [desc, setDesc] = useState(details ? details?.desc : '');

  const [showEdit, setShowEdit] = useState(false)

  

  const [editUser, {isLoading, isError}] = useEditUserMutation();
  if(isLoading){
    return <Loader />
  }

  if (isError){
    return 'Something went wrong!'
  }

  const editHandler = async (e) => {
    e.preventDefault();
    const data = {
      companyDetails : {
        companyName,
        website,
        desc
        }
    }

    console.log("data", data)

    const apiRes = await editUser(data).unwrap();
    console.log("apiRes", apiRes);
  }

  return (
    <div className='mt-8'>
      
      <div className="page_title flex justify-between">
        <div>
          <h1 className="font-semibold text-lg">Company Profile</h1>
          <p className="text-[#667085]">Update your Company logo and company details here.</p>
        </div>

        <div onClick={() => setShowEdit(!showEdit)} className="flex gap-2 bg-primary-blue rounded-[100px] items-center px-6 h-11 cursor-pointer ">
          <img src={Pencil} alt="" /> Edit Details
        </div>
      </div>

      {!showEdit && (
        <div className="info_content">
          <div className="mt-11">
            <p className="settings_name font-medium text-sm mb-4">Username</p>
            <p className="settings_value text-[#667085] text-sm pb-5 border-b border-b-[#282828]">{companyName}</p>   
          </div>
          <div className="mt-11">
            <p className="settings_name font-medium text-sm mb-4">Website</p>
            <p className="settings_value text-[#667085] text-sm pb-5 border-b border-b-[#282828]">{website}</p>   
          </div>
          <div className="mt-11">
            <p className="settings_name font-medium text-sm mb-4">About company</p>
            <p className="settings_value text-[#667085] text-sm pb-5 border-b border-b-[#282828]">{desc}</p>   
          </div>
        </div>


      )}
      


      {showEdit && (
        <div className="edit">
          <form onSubmit={editHandler}>
            <div className="info_content">
              <div className="mt-11">
                <p className="settings_name font-medium text-sm mb-4">Username</p>
                <input className="settings_value bg-transparent rounded-lg border border-[#282828] h-11 flex items-center px-4 text-sm w-full" value={companyName} onChange={e => setComapnyName(e.target.value)} />   
              </div>
              <div className="mt-11">
                <p className="settings_name font-medium text-sm mb-4">Website</p>
                <input value={website} onChange={e => setWebsite(e.target.value)}  className="settings_value bg-transparent rounded-lg border border-[#282828] h-11 flex items-center px-4 text-sm w-full" /> 
              </div>
              <div className="mt-11">
                <p className="settings_name font-medium text-sm mb-4">About company</p>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} className="settings_value bg-transparent rounded-lg border border-[#282828] h-11 py-2 flex items-center px-4 text-sm w-full" />
              </div>
            </div>

            <button>Submit</button>
          </form>
        </div>

      )}




    </div>
  )
}

export default CompanyDetails