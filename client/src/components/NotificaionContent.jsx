import React,{useEffect, useState} from 'react'
import NotifyIcon from '../assets/notify_icon.svg'
import { useEditUserMutation } from '../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import Loader from './Loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setUnReadNotifications } from '../slices/NotificationSlice';
import OutsideClickHandler from "react-outside-click-handler";

const NotificaionContent = ({all, read, personal, handleUnreadIds, outSideClickHandler}) => {
  console.log("All", all)
  console.log("Read", read)
  console.log("Personal", personal)
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false)

  // const combined = [...all, ...personal]
  const combined = [...all, ...personal].sort((a, b) => dayjs(b.createdAt) - dayjs(a.createdAt));
  // console.log("combined", combined)
  

// const notInNewRead = combined.filter(notification => !newRead.includes(notification._id));
// console.log("Notifications not in newRead", notInNewRead);




  const unReadNotifications = combined.filter(notification => !read.includes(notification._id))
  console.log("unReadNotifications", unReadNotifications)
  const unReadIds = unReadNotifications.map(item => item._id);
  // console.log("unReadIds",unReadIds)
  
  useEffect(() =>{
    if(unReadIds.length > 0){
      handleUnreadIds(unReadIds)
    }

  },[])


  const [showAllNoti, setShowAllNoti] = useState(true)



  const [editUserMutation ] = useEditUserMutation();

  const handleOutSideClick = (e) => {
    outSideClickHandler(e)
  }






  return (
    <OutsideClickHandler onOutsideClick={handleOutSideClick}>
      <div className="notifications_panel absolute w-[452px] max-w-full top-[100%] right-0 py-8 px-6 bg-black z-10">
        {showLoader && <Loader />}
        <div className="notifications_header flex justify-between items-center mb-8">
          <p className="font-medium">Notifications</p>
          <p className="cursor-pointer text-primary-blue font-semibold">Mark All as read</p>
        </div>
        <div className="notifications_content">
          <div className="notifications_list_header flex gap-4 items-center mb-6">
            <p onClick={() => setShowAllNoti(true)} className= {`cursor-pointer px-3 py-2  ${showAllNoti ? 'font-bold border-b border-primary-blue' : '' } `}>All</p>
            <p onClick={() => setShowAllNoti(false)} className={`cursor-pointer px-3 py-2 ${!showAllNoti ? 'font-bold border-b border-primary-blue' : '' }`}>Unread ({unReadNotifications.length})</p>
          </div>

          {showAllNoti && (
          <div className="notifications_list">
            <ul>
              
              {combined.map(notification => <li  key={notification._id} className='flex gap-6 items-center justify-between mb-6 cursor-pointer'>
                <div><img src={NotifyIcon} className='min-w-11' alt="" /></div>
                <div className="w-[230px]">
                  <p className="noti_title text-[#BFC0C1] font-semibold text-sm mb-2">{notification.title}</p>
                  <p className="noti_text text-[#BFC0C1] text-xs">{notification.message}</p>
                </div>
                <div className="min-w-[55px]">
                  <p className='text-[#BFC0C1]'>{dayjs(notification.createdAt).fromNow()}</p>
                </div>
              </li>)}



            </ul>
          </div>

          )}

          {!showAllNoti && (
          <div className="notifications_list">
            <ul>
              
              {unReadNotifications.map(notification => <li key={notification._id} className='flex gap-6 items-center justify-between mb-6 cursor-pointer'>
                <div><img src={NotifyIcon} className='min-w-11' alt="" /></div>
                <div className="w-[230px]" >
                  <p className="noti_title text-[#BFC0C1] font-semibold text-sm mb-2">{notification.title}</p>
                  <p className="noti_text text-[#BFC0C1] text-xs">{notification.message}</p>
                </div>
                <div className="min-w-[55px]">
                  <p className='text-[#BFC0C1]'>{dayjs(notification.createdAt).fromNow()}</p>
                </div>
              </li>)}

            </ul>
          </div>

          )}




        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default NotificaionContent