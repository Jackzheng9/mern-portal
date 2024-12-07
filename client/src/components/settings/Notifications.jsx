import React, { useState } from 'react'
import { useEditUserMutation } from '../../slices/userApiSlice'
import { toast } from 'react-toastify'



const Notifications = ({user}) => {

  console.log("user", user)
  const [checkBoxChecked, setCheckBoxChecked] = useState(user.notiSettings ? user.notiSettings.email : true);
  const [appCheckBoxChecked, setAppCheckBoxChecked] = useState(user.notiSettings ? user.notiSettings.app: true);
  
  

  const [editUser ] = useEditUserMutation();

  const checkClick = async (e) =>{
    setCheckBoxChecked(prev => !prev);

        const data = {
            notiSettings: {
                email: !checkBoxChecked,
                app: appCheckBoxChecked
            }
        }

    //console.log("data",data)
    
    try {
      const apiRes = await editUser(data).unwrap();
      toast.success("Settings updated!")
    } catch (error) {
      toast.error(error.message)
    }

  }


  const appCheckClick = async (e) =>{

    setAppCheckBoxChecked(prev => !prev);

        const data = {
            notiSettings: {
                email: checkBoxChecked,
                app: !appCheckBoxChecked
            }
        }
        //console.log("data",data)
    
    try {
      const apiRes = await editUser(data).unwrap();
      toast.success("Settings updated!")
    } catch (error) {
      toast.error(error.message)
    }


  }

  




  return (
    <div className='mt-8'>

      <div className="page_title flex justify-between border-b border-[#282828] pb-5">
        <div>
          <h1 className="font-semibold text-lg">Notifications</h1>
          <p className="text-[#667085]">Select when and how you’ll be notified.</p>
        </div>        
      </div>

      <div className="flex justify-between mt-6 gap-8">
        <div className='w-full max-w-[300px]'>
          <p className='text-sm font-medium'>General notifications</p>
          <p className='text-sm text-[#667085]'>Select when you’ll be notified when the following changes occur.</p>
        </div>

        <div className="w-full ">
          
          <div className="w-full flex justify-between items-center border-b border-[#282828] pb-5">
            <p className="text-[#667085]">Allow  email notifications</p>
            <div className="publish_action flex gap-2 items-center font-medium">
              <label className="switch" htmlFor='switch'>
                <input onChange={checkClick} type="checkbox" id="switch" checked={checkBoxChecked} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="w-full flex justify-between items-center border-b border-[#282828] pb-5">
            <p className="text-[#667085]">In app notification</p>
            <div className="publish_action flex gap-2 items-center font-medium">
              <label className="switch" htmlFor='switch2'>
                <input onChange={appCheckClick} type="checkbox" id="switch2" checked={appCheckBoxChecked} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
                    
        </div>
      </div>


    </div>
  )
}

export default Notifications