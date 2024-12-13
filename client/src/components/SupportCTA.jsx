import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CTABG from '../assets/CTABG.png'
import { useEditUserMutation } from '../slices/userApiSlice'

const SupportCta = () => {

  const [editUser,{isLoading}] = useEditUserMutation()
  const navigate = useNavigate()

  const scheduleMeetingHandler = async () => {
    const data = {
      personalNotifications : {
        message:'Meeting clicked!',
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
        <h2 className="text-4xl font-semibold mb-4">Need Support?</h2>
        <p className="">Need assistance? We're here to help! If you can't find the answer you're looking for, contact our support team through our contact page, email, or phone. Your success is our priority!</p>
      </div>
      <div className="">
        <p onClick={scheduleMeetingHandler} className="bg-primary-blue px-6 h-12 flex items-center font-semibold rounded-[100px] cursor-pointer">Schedule Now</p>
      </div>

    </div>
  )
}

export default SupportCta