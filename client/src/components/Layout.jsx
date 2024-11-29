import React, { useState,useEffect } from 'react'
import { Outlet, Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Logo from '../assets/logo.svg'
import Settings from '../assets/settingsGray.svg'
import Twitter from '../assets/twitter.svg'
import LinkedIn from '../assets/linkedIn.svg'
import Notification from '../assets/notificationGray.svg'
import NotificationWhite from '../assets/notificationWhite.svg'
import dayjs from 'dayjs';
import { logOut } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEditUserMutation, useQueryUserByEmailQuery } from '../slices/userApiSlice';
import { useGetNotificationsQuery } from '../slices/notificationApiSlice';


import Notifications from './Notifications';
import Loader from './Loader';
import { resetUserInfoState } from '../slices/userInfoSlice';


const Layout = () => {

  const [searchParams] = useSearchParams();
  const [showAccOptions, setShowAccOptions] = useState(false)
  const [showNotiPanel, setShowNotiPanel] = useState(false)
  const [allNotifications, setAllNotifications] = useState(false)
  const [personalNotifications, setPersonalNotifications] = useState(false)
  const [readNotifications, setReadNotifications] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoadingState, setIsLoadingState] = useState(true)
  const user = useSelector(state => state.auth.userInfo)
  //const userInfo = useSelector(state => state.userInfo.userInfo)

    
  const {data, isLoading:notiLoading, isError:notiIsError} = useGetNotificationsQuery()
  const {data:userData, isLoading:userLoading, isError:userError, error} = useQueryUserByEmailQuery({email:user.email})


  const [editUser, {isLoading, isError} ] = useEditUserMutation()



  const [unreadIds,setUnreadIds] = useState(null)






  useEffect(() => {
    
    if(searchParams.get("setpass")){
      navigate('/setpassword')
      return;
    }

    /*
    if( Object.keys(userInfo).length == 0){
      // console.log("Navigating to login screen...")
      navigate('/login')
      return
    }

    */

    

    if(notiLoading || userLoading){
      console.log("Loading running!")
      setIsLoadingState(true)
    }else if(error){
      console.log("error",error)

    }else{
      console.log("Loading completed")
      setIsLoadingState(false)
      // console.log("All Notifications data", data)
      setAllNotifications(data.notifications)

      console.log("User data from api", userData.user[0])
      setUserInfo(userData.user[0]);
      const apiUser = userData.user[0];
      

      const thisDate = dayjs().date();
      const thisDay = dayjs().day();
      // console.log("thisDay", thisDay)

      setPersonalNotifications(apiUser.personalNotifications);
      setReadNotifications(apiUser.notifications)



      const personalNotifications = apiUser.personalNotifications;
      const scheduleNotifications = personalNotifications.filter(item => item.notificationType == 'schedulemeeting')
      const linkedinNotifications = personalNotifications.filter(item => item.notificationType == 'linkedinDone')
      // console.log("linkedinNotifications", linkedinNotifications)
      const customSolNotifications = personalNotifications.filter(item => item.notificationType == 'customsolutions')
  
      if(customSolNotifications.length == 0){
        const data = {
          personalNotifications: {
            message:"Explore tailored AI solutions for your business. Schedule a meeting with our experts to discuss customization options.",
            notificationType:"customsolutions"
          }
        }
        
        const edituser = async () => {
          const apiRes = await editUser(data).unwrap();
          console.log("apiRes", apiRes)
        }
    
        edituser();
  
      }
  
      if(customSolNotifications.length > 0){
  
        const latestCustomSol = customSolNotifications[customSolNotifications.length -1 ];
  
        const latestCustomSolDate = latestCustomSol.createdAt;
        
        const isInCurrentMonth = dayjs(latestCustomSolDate).isSame(dayjs(), 'month');
        const isInLastMonth = dayjs(latestCustomSolDate).isSame(dayjs().subtract(1, 'month'), 'month');
    
        if (isInCurrentMonth) {
            console.log("The latest scheduled date is in the current month.");
        } else if (isInLastMonth) {
            console.log("The latest scheduled date is in the last month.");
        } else {
            console.log("The latest scheduled date is neither in the current month nor in the last month.");
            
            const data = {
              personalNotifications: {
                message:"Explore tailored AI solutions for your business. Schedule a meeting with our experts to discuss customization options.",
                notificationType:"customsolutions"
              }
            }
        
            const edituser = async () => {
              const apiRes = await editUser(data).unwrap();
              console.log("apiRes", apiRes)
            }
        
            edituser();     
        }
  
  
  
  
  
  
  
      }
      
      if(thisDay == 1){
        console.log("this day running!")
        if(!linkedinNotifications || linkedinNotifications.length == 0){
          const data = {
            personalNotifications: {
              message:"Join our LinkedIn community to connect with industry peers and stay updated on the latest trends!",
              notificationType:"linkedin"
            }
          }
          
          const edituser = async () => {
            const apiRes = await editUser(data).unwrap();
            console.log("apiRes", apiRes)
          }
      
          edituser();
  
        }
      }
      
      if(!scheduleNotifications || scheduleNotifications.length == 0){
        console.log("Run create schedule notification if nothing found!")
        const data = {
          personalNotifications: {
            message:"Ready to discuss your AI solutions? Schedule a meeting with our tech experts now!",
            notificationType:"schedulemeeting"
          }
        }
    
        const edituser = async () => {
          const apiRes = await editUser(data).unwrap();
          console.log("apiRes", apiRes)
        }
    
        edituser();
    
    
      }
    
      if(thisDate == 1){
        
        console.log("personal notifications", personalNotifications)
        const latestScheduled = scheduleNotifications[scheduleNotifications.length -1 ];
        console.log("latestScheduled",latestScheduled)
        const latestScheduledDate = latestScheduled.createdAt;
        console.log("latestScheduledDate", latestScheduledDate)
        const isInCurrentMonth = dayjs(latestScheduledDate).isSame(dayjs(), 'month');
        const isInLastMonth = dayjs(latestScheduledDate).isSame(dayjs().subtract(1, 'month'), 'month');
    
        if (isInCurrentMonth) {
            console.log("The latest scheduled date is in the current month.");
        } else if (isInLastMonth) {
            console.log("The latest scheduled date is in the last month.");
        } else {
            console.log("The latest scheduled date is neither in the current month nor in the last month.");
            
            const data = {
              personalNotifications: {
                message:"Ready to discuss your AI solutions? Schedule a meeting with our tech experts now!",
                notificationType:"schedulemeeting"
              }
            }
        
            const edituser = async () => {
              const apiRes = await editUser(data).unwrap();
              console.log("apiRes", apiRes)
            }
        
            edituser();     
        }
        
      }




    }
    



  },[notiLoading, userLoading])

  // console.log("isLoadingState",isLoadingState)

  if(isLoadingState){
    console.log("Loading state running!")
    return <Loader />
  }



  

  const accountOptionsHandler = () => {
    setShowAccOptions(!showAccOptions)
  }


  const logoutHandler = () => {
    dispatch(logOut())
    dispatch(resetUserInfoState())
    navigate('/login')
  }

  

  const handleUnreadIds = (ids) => {
    setUnreadIds(ids)
  }
  


  const toggleNotification = async () => {
    if(showNotiPanel){
      console.log("unreadIds", unreadIds)
      if(unreadIds){
        const apiRes = await editUser({notifications:unreadIds}).unwrap()
      }
      
    }
    setShowNotiPanel(!showNotiPanel)
    
  }


  let userInitial = `${user.firstName.slice(0,1)}${user.lastName.slice(0,1)}`;
  userInitial = userInitial.toUpperCase()


  return (
    <>

      <div className="header">
        <div className="container">
          <div className="flex justify-between gap-2 py-4 items-center relative">
            <Link to="/"><img src={Logo} alt="" /></Link>
            <div className="main_menu_wrap">
              <ul className='flex gap-2'>
                <li><NavLink className="text-gray-nine" to="/">Home</NavLink></li>
                <li><NavLink className="text-gray-nine" to="/solutions">Solutions</NavLink></li>
                <li><NavLink className="text-gray-nine" to="/resources">Resources</NavLink></li>
              </ul>
            </div>

            <div className="right_menu_wrap">
              <ul className='flex gap-4 items-center'>
                <li><NavLink to=""><div className="header_cta bg-primary-blue rounded-[100px] px-6 h-12 flex items-center">Let's Build</div></NavLink></li>
                <li><NavLink to="/settings"><img src={Settings} alt="" /></NavLink></li>
                <li>
                  {!showNotiPanel && <img onClick={toggleNotification} className="cursor-pointer" src={Notification} alt="" /> }
                  {showNotiPanel && <img onClick={toggleNotification} className=" cursor-pointer" src={NotificationWhite} alt="" /> }
                  { showNotiPanel && <Notifications all={allNotifications} personal = {personalNotifications} read={readNotifications} handleUnreadIds={handleUnreadIds} />}
                </li>
                <li className='relative'>
                  <div onClick={accountOptionsHandler} className="initials bg-dark-blue text-lg font-medium h-12 w-12 rounded-[100px] flex items-center justify-center cursor-pointer">
                    {userInfo.image ? <img src={userInfo.image} /> : userInitial }
                  </div>

                  {showAccOptions && (
                    <ul className="absolute top-[100%] min-w-[180px] bg-black p-4 w-full l-0">
                      <li onClick={logoutHandler} className='cursor-pointer'>Logout</li>
                      <li className='cursor-pointer'><Link to="/profile">Profile</Link></li>
                      {/* <li className='cursor-pointer'><Link to="/settings">Settings</Link></li> */}
                    </ul>
                  )}
                  
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>

      <div className="main_content container">
        <Outlet />
      </div>

      <div className="footer container py-4">
        <div className="flex justify-between">
          <div className="footer_left flex items-center gap-3 text-[#EFEFEF]">
            <p className="">&copy; 2024 - All rights reserved</p>
            <p className="">|</p>
            <p className="">DisruptREADY - Innovate Fearlessly</p>
          </div>

          <div className="footer_right flex gap-6">
            <Link to=""><img src={Twitter} alt="" /></Link>
            <Link to=""><img src={LinkedIn} alt="" /></Link>
          </div>
        </div>
      </div>



    </>
  )
}

export default Layout