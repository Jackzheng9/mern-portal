import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useGetNotificationsQuery } from '../slices/notificationApiSlice';
import { useQueryUserByEmailQuery } from '../slices/userApiSlice';
import Loader from './Loader';
import NotificaionContent from './NotificaionContent';

const Notifications = ({all, personal, read, handleUnreadIds, outSideClickHandler}) => {

  // console.log("All Notifications", all)
  // console.log("readNotifications", read)
  // console.log("personal notifications", personal)


  /*
  const user = useSelector(state => state.auth.userInfo)
  const userEmail = user.email;  
  const dispatch = useDispatch();


  const allNotifications = useSelector(state => state.notification.allNotifications);
  const readNotifications = useSelector(state => state.notification.readNotifications);

  const {data, isLoading, isError, isSuccess } = useGetNotificationsQuery();
  const {data: userData, isLoading: userLoading, isError: userError, isSuccess:userSuccess } = useQueryUserByEmailQuery({email:userEmail});



  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      dispatch(setAllNotifications(data.notifications));
      
    }

    if(userSuccess){
      console.log("userData - Notifications", userData.user[0].notifications)
      dispatch(setReadNotifications(userData.user[0].notifications))
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading || userLoading) return <Loader />;
  if(isError || userError) return 'Something went wrong';

  */

  return (
    <div><NotificaionContent all={all} read = {read} personal={personal} handleUnreadIds={handleUnreadIds} outSideClickHandler={outSideClickHandler} /></div>
  )
}

export default Notifications