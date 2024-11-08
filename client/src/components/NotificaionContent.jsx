import React,{useState} from 'react'
import NotifyIcon from '../assets/notify_icon.svg'
import { useEditUserMutation } from '../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setReadNotifications } from '../slices/NotificationSlice';
import Loader from './Loader';


const NotificaionContent = ({all,read}) => {
  // console.log("All", all)
  // console.log("Read", read)
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false)

  const unReadNotifications = all.filter(notification => !read.some(readItem => readItem.notification === notification._id))
  // console.log("unReadNotifications", unReadNotifications)

  const [showAllNoti, setShowAllNoti] = useState(true)
  const [editUserMutation ] = useEditUserMutation();

  const addNotiToUser = async (notification) => {
    setShowLoader(true)
    console.log("Adding - ", notification)
    const addNoti = await editUserMutation({notification}).unwrap();
    dispatch(setReadNotifications({notification, readStatus:true}))
    console.log("API Res: ", addNoti);
    setShowLoader(false)
  }

  return (
      <div className="notifications_panel absolute w-[452px] max-w-full top-[100%] right-0 py-8 px-6 bg-black">
        {showLoader && <Loader />}
        <div className="notifications_header flex justify-between items-center mb-8">
          <p className="font-medium">Notifications</p>
          <p className="cursor-pointer text-primary-blue font-semibold">Mark All as read</p>
        </div>
        <div className="notifications_content">
          <div className="notifications_list_header flex gap-4 items-center mb-6">
            <p onClick={() => setShowAllNoti(true)} className= {`cursor-pointer px-3 py-2  ${showAllNoti ? 'font-bold border-b border-primary-blue' : '' } `}>All</p>
            <p onClick={() => setShowAllNoti(false)} className={`cursor-pointer px-3 py-2 ${!showAllNoti ? 'font-bold border-b border-primary-blue' : '' }`}>Unread (12)</p>
          </div>

          {showAllNoti && (
          <div className="notifications_list">
            <ul>
              
              {all.map(notification => <li onClick={() => addNotiToUser(notification._id) } key={notification._id} className='flex gap-6 items-center justify-between mb-6'>
                <div><img src={NotifyIcon} className='min-w-11' alt="" /></div>
                <div>
                  <p className="noti_title font-semibold text-sm mb-2">{notification.title}</p>
                  <p className="noti_text text-[#BFC0C1] text-xs">{notification.message}</p>
                </div>
                <div className="min-w-[55px]">
                  <p className='text-[#BFC0C1]'>1m ago</p>
                </div>
              </li>)}



            </ul>
          </div>

          )}

          {!showAllNoti && (
          <div className="notifications_list">
            <ul>
              
            {unReadNotifications.map(notification => <li key={notification._id} className='flex gap-6 items-center justify-between mb-6'>
                <div><img src={NotifyIcon} className='min-w-11' alt="" /></div>
                <div>
                  <p className="noti_title font-semibold text-sm mb-2">{notification.title}</p>
                  <p className="noti_text text-[#BFC0C1] text-xs">{notification.message}</p>
                </div>
                <div className="min-w-[55px]">
                  <p className='text-[#BFC0C1]'>1m ago</p>
                </div>
              </li>)}



            </ul>
          </div>

          )}




        </div>
      </div>
  )
}

export default NotificaionContent