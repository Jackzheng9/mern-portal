import React from 'react'
import VideoIcon from '../assets/video_icon.svg'
import PdfIcon from '../assets/pdf_icon.svg'
import GreenCheck from '../assets/GreenCheck.svg'
import GrayCheck from '../assets/GrayCheck.svg'
import { useAddFiletoUserMutation, useRemoveFileFromUserMutation, useQueryUserByEmailQuery } from '../slices/userApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { setCredentials } from '../slices/authSlice'
import { Link } from 'react-router-dom'
import { setCurrentFile } from '../slices/ResourceListslice'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'



const UserResourceLectureFile = ({file, year, resource, lessonCompleteHandler}) => {
  // console.log("file",file)
  const fileId = file._id;
  // console.log("fileId",fileId)
  const curYear = dayjs().year();
  
  const userEmail = useSelector(state => state.auth.userInfo.email);
  
  // console.log("userEmail", userEmail)
  const {data, isLoading: userLoading } = useQueryUserByEmailQuery({email:userEmail})
  // if(!userLoading){
  //   console.log("data",data)
  // }
  const user = data.user[0]

  
  const [addFiletoUser ,{isLoading: addFileLoading, isError: addFileError}] = useAddFiletoUserMutation();
  
  const [removeFileFromUser ,{isLoading: removeFileLoading, isError: removeFileError}] = useRemoveFileFromUserMutation();
  
  
  const curYearFiles = user?.completedFiles?.filter(file => file.year == curYear )

  // console.log("curYearFiles", curYearFiles)

  const isFileMatched = curYearFiles?.some(curFile => curFile.fileId === fileId);
  // console.log("isFileMatched", isFileMatched);

  const dispatch = useDispatch()
  const fileCompleteHandler = async () => {
    // console.log("check clicked!")
    
    if(isFileMatched){
      const res = await removeFileFromUser({fileId}).unwrap()
      // console.log("Remove res", res)
      // const newFiles = res.completedFiles;
      lessonCompleteHandler()
    }else{
      const res = await addFiletoUser({file:{year, fileId}}).unwrap();
      // console.log("Api res", res)
      // const newFiles = res.completedFiles;
      lessonCompleteHandler()

    }

    
  }

  const navigate = useNavigate()
  const showFileDetailsHandler = (fileId) => {
    // console.log("File ID", fileId)
    dispatch(setCurrentFile({file, resource}))
    navigate('/resources/file/')
  }

  return (
    <li  className='flex justify-between items-center mb-6'>
      <div onClick={() => showFileDetailsHandler(fileId)} className="cursor-pointer flex gap-2">
        <img src={file.assetType == 'image' ? PdfIcon : VideoIcon } alt="" />
        <p className="">{file.assetName}</p>
      </div>

      <div className="">
        <img className='cursor-pointer' onClick={fileCompleteHandler} src={isFileMatched ? GreenCheck : GrayCheck} alt="" />
      </div>
      
    </li>
  )
}

export default UserResourceLectureFile