import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useGetResourceBySlugQuery } from '../slices/resourcesApiSlice';
import { useQueryUserByEmailQuery } from '../slices/userApiSlice';
import { useCreateNotificationMutation } from '../slices/notificationApiSlice';
import { useEditUserMutation } from '../slices/userApiSlice';
import Loader from './Loader';
import UserResourceLecture from './UserResourceLecture';
import { useSelector } from 'react-redux';




const UserResourceDetails = () => {

  const [showLoader, setShowLoader] = useState(false)

  const {slug} = useParams();
  const {data, isLoading, isError} = useGetResourceBySlugQuery(slug);

  const user = useSelector(state => state.auth.userInfo)
  const {data:userData, isLoading:userLoading} = useQueryUserByEmailQuery({email:user.email});
  const [editUser, {isLoading:editLoading, isError:editError, error}] = useEditUserMutation();
  console.log("userData", userData);


  useEffect(() => {
    console.log("Use effect running!")
  },[])

  if(isLoading || userLoading ){
    return <Loader />
  }

 

  const resource =  data.resource;
  // console.log("Resource Details Page", resource)

  const lessonCompleteHandler = () => {
    console.log("Lesson completed!")
    const userRes = userData.user[0];
    console.log("userRes", userRes)

    const completedFiles = userRes.completedFiles;
  
  
    const allCompletedIds = completedFiles.map(file => file.fileId)
  
    const allFileIds = resource.lectures.flatMap(lecture => lecture.files.map(file => file._id));
  
  
    const allFilesCompleted = allFileIds.every(fileId => allCompletedIds.includes(fileId));
    console.log("All files completed? ", allFilesCompleted )
    
    if (allFilesCompleted) {
      const data = {
        personalNotifications :{
          message: `All lessons of`,
          notificationType: 'lessoncompleted',
          resourceId : 'abc123'
        }    
      };
  
      const notiCreateFunc = async () => {
        const editUserRes = await editUser(data).unwrap();
        console.log("editUserRes:", editUserRes);
        console.log("All lessons completed of this resource!")
      };
  
      //notiCreateFunc();
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