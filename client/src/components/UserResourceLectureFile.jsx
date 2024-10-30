import React from 'react'
import VideoIcon from '../assets/video_icon.svg'
import PdfIcon from '../assets/pdf_icon.svg'
import GreenCheck from '../assets/GreenCheck.svg'
import GrayCheck from '../assets/GrayCheck.svg'
import { useAddFiletoUserMutation, useRemoveFileFromUserMutation } from '../slices/userApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { setCredentials } from '../slices/authSlice'
import { Link } from 'react-router-dom'

const UserResourceLectureFile = ({file, year}) => {
  // console.log("file",file)
  const fileId = file._id;
  // console.log("fileId",fileId)
  const curYear = dayjs().year();
  
  const user = useSelector(state => state.auth.userInfo);
  // console.log("User", user)
  
  const [addFiletoUser ,{isLoading: addFileLoading, isError: addFileError}] = useAddFiletoUserMutation();
  
  const [removeFileFromUser ,{isLoading: removeFileLoading, isError: removeFileError}] = useRemoveFileFromUserMutation();
  
  
  const curYearFiles = user?.completedFiles?.filter(file => file.year == curYear )

  // console.log("curYearFiles", curYearFiles)

  const isFileMatched = curYearFiles?.some(curFile => curFile.fileId === fileId);
  // console.log("isFileMatched", isFileMatched);

  const dispatch = useDispatch()
  const fileCompleteHandler = async () => {
    console.log("check clicked!")
    if(isFileMatched){
      const res = await removeFileFromUser({fileId}).unwrap()
      // console.log("Remove res", res)
      const newFiles = res.completedFiles;
      const newUserInfo = {user,completedFiles:newFiles }
      dispatch( setCredentials(newUserInfo) )
    }else{
      const res = await addFiletoUser({file:{year, fileId}}).unwrap();
      // console.log("Api res", res)
      const newFiles = res.completedFiles;
      const newUserInfo = {user,completedFiles:newFiles }
      dispatch( setCredentials(newUserInfo) )
    }
  }
  const fileDetailsHandler = (fileId) => {
    console.log("File ID", fileId)
  }

  return (
    <li  className='flex justify-between items-center mb-6'>
      <div onClick={() => fileDetailsHandler(fileId)} className="cursor-pointer flex gap-2">
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