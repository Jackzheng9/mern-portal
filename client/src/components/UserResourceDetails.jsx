import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetResourceBySlugQuery } from '../slices/resourcesApiSlice';
import { useEditUserMutation, useQueryUserByEmailQuery } from '../slices/userApiSlice';
import Loader from './Loader';
import UserResourceLecture from './UserResourceLecture';
import { useSelector, useDispatch } from 'react-redux';
import { setCompletedfiles } from '../slices/userInfoSlice';
import { setPersonalNotifications } from '../slices/userInfoSlice';
import { logOut } from '../slices/authSlice';


const UserResourceDetails = () => {

  const [eventRun, setEventRun] = useState(false)

  const {slug} = useParams();
  const userEmail = useSelector(state => state.auth.userInfo.email)
  // console.log("userEmail", userEmail)
  const {data, isLoading, isError} = useGetResourceBySlugQuery(slug);
  const {data:userData, isLoading:userLoading} = useQueryUserByEmailQuery({email:userEmail})

  const navigate = useNavigate();

  const [editUser, {isLoading:editLoading, isError:editError, error}] = useEditUserMutation();

  const dispatch = useDispatch();




  if(isLoading || userLoading){
    return <Loader />
  }
  // console.log("userData",userData)
  const userInfo = userData.user[0]
  // console.log("userinfo from redux", userInfo)
  const resource =  data.resource;
  // console.log("Resource Details Page", resource)
    
  const completedFiles = userInfo.completedFiles;
  // console.log("completed file from redux:", completedFiles)
  if(!completedFiles){
    dispatch(logOut())
    navigate('/login');
  }
  let allCompletedIds = completedFiles.map(file => file.fileId)
  
  

const lessonCompleteHandler = async (type,fileId) => {

  // console.log("Lesson check clicked!", type, fileId)


  if(type=='add'){
    allCompletedIds = [...allCompletedIds, fileId]
    const allFileIds = resource.lectures.flatMap(lecture => lecture.files.map(file => file._id));
    const allFilesCompleted = allFileIds.every(fileId => allCompletedIds.includes(fileId));
    console.log("allFilesCompleted from add logic", allFilesCompleted)
    
    
    if(allFilesCompleted){
      //console.log("Trigger new notification for this user")
      
      const data ={personalNotifications: {
        message: "Congratulations on completing your course! You've taken a big step in transforming your company. Explore more resources or schedule a meeting with our tech experts to keep the momentum going! -1",
        resourceId:resource._id,
        notificationType:'coursecompleted'
      }}
      let apiRes;
      const addEvent  = async () => {
        apiRes = await editUser(data).unwrap();
        //console.log("apiRes", apiRes)
      }
      await addEvent()
      
      const newNotification = apiRes.user.personalNotifications.filter(item => item.resourceId == resource._id)
      //console.log("newNotification",newNotification)
      const lastNotification = newNotification[newNotification.length - 1];
      const newNotiId = lastNotification._id
      //console.log("New noti id", newNotiId)




      const personalNotificationData = {
          message: "Congratulations on completing your course! You've taken a big step in transforming your company. Explore more resources or schedule a meeting with our tech experts to keep the momentum going!",
          resourceId:resource._id,
          notificationType:'coursecompleted',
          _id:newNotiId
        }
      dispatch(setPersonalNotifications(personalNotificationData))
  

    }


  }
  


}


  return (
    <>
      
      <section className="px-16 h-[480px] w-full flex items-center mb-4" style={{ backgroundImage: `url(${resource.image})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
        <div className="max-w-[800px]">
          <h2 className="text-4xl font-medium mb-4">{resource.title}</h2>
          <p className="mb-4">{resource.description}</p>
        </div>
      </section>

      <section className="">
        {resource.lectures.map(lecture => <UserResourceLecture key={lecture._id} lecture={lecture} year={resource.year} resource={resource} lessonCompleteHandler={lessonCompleteHandler}/>)}
      </section>


    </>
  )
}

export default UserResourceDetails
