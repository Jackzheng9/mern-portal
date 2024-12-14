import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CTABG from '../assets/CTABG.png'
import { useEditUserMutation } from '../slices/userApiSlice'

const CTA = () => {

  const [editUser,{isLoading}] = useEditUserMutation()
  const navigate = useNavigate()

  const scheduleMeetingHandler = async () => {
    const data = {
      personalNotifications : {
        message:"Thank you for meeting with [Tech Person]. Don't forget to review the discussed solutions and next steps.",
        notificationType:'schedulemeeting',
      }
    }
    const apiRes = await editUser(data).unwrap();
    // console.log("apiRes", apiRes)
    navigate('/contact')
}




  return (
    <div className='bg-[#131514] py-[102px] px-[109px] flex justify-between items-center footer_cta'>
      <div className="max-w-[699px]">
        <h2 className="text-4xl font-semibold mb-4">Book a Call for a Custom AI Solution</h2>
        <p className="">If you're interested in a similar tool, schedule a meeting to discuss your needs. We'll create a custom solution tailored to your business requirements.</p>
      </div>
      <div className="">
        <p onClick={scheduleMeetingHandler} className="bg-primary-blue px-6 h-12 flex items-center font-semibold rounded-[100px] cursor-pointer">Schedule Now</p>
      </div>

    </div>
  )
}

export default CTA