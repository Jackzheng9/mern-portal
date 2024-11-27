import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useGetResourceBySlugQuery } from '../slices/resourcesApiSlice';
import { useEditUserMutation } from '../slices/userApiSlice';
import Loader from './Loader';
import UserResourceLecture from './UserResourceLecture';
import { useSelector, useDispatch } from 'react-redux';
import { setCompletedfiles } from '../slices/userInfoSlice';
import { setPersonalNotifications } from '../slices/userInfoSlice';


const UserResourceDetails = () => {

  const [showLoader, setShowLoader] = useState(false)

  const {slug} = useParams();
  const {data, isLoading, isError} = useGetResourceBySlugQuery(slug);

  

  const [editUser, {isLoading:editLoading, isError:editError, error}] = useEditUserMutation();

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo.userInfo)
  // console.log("userinfo from redux", userInfo)
  
  if(isLoading ){
    return <Loader />
  }
  

  const resource =  data.resource;
  console.log("Resource Details Page", resource)

  






const lessonCompleteHandler = (type,fileId) => {

  console.log("Lesson check clicked!", type, fileId)
  dispatch(setCompletedfiles({type,fileId}))
// test
  
  const completedFiles = userInfo.completedFiles;
  console.log("completed file from redux:", completedFiles)

  const allCompletedIds = completedFiles.map(file => file.fileId)
  
  
  const allFileIds = resource.lectures.flatMap(lecture => lecture.files.map(file => file._id));
  const allFilesCompleted = allFileIds.every(fileId => allCompletedIds.includes(fileId));
  //console.log("All files completed? ", allFilesCompleted )

// test




  console.log("allFilesCompleted from inside trigger", allFilesCompleted)
  
  if(allFilesCompleted){
    console.log("Trigger new notification for this user")
    
    const data ={personalNotifications: {
      message: "Congratulations on completing your course! You've taken a big step in transforming your company. Explore more resources or schedule a meeting with our tech experts to keep the momentum going!",
      resourceId:resource._id,
      notificationType:'coursecompleted'
    }}

    const addEvent  = async () => {
      const apiRes = await editUser(data).unwrap();
      console.log("apiRes", apiRes)
    }

    const personalNotification = {
        message: "Congratulations on completing your course! You've taken a big step in transforming your company. Explore more resources or schedule a meeting with our tech experts to keep the momentum going!",
        resourceId:resource._id,
        notificationType:'coursecompleted'
      }
    dispatch(setPersonalNotifications(personalNotification))

    addEvent()

    
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