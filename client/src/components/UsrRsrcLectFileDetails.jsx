import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UsrRsrcLectFileDetails = () => {
  const file = useSelector(state => state.resourceFilter.currentFile.file)
  const resource = useSelector(state => state.resourceFilter.currentFile.resource)
  console.log("File", file)
  console.log("resource", resource)
  const navigate = useNavigate()

  if(!file){
    navigate('/resources/')
  }

  if(file.assetType == 'video'){
    return (
      <>
        <div className="file_details rounded-[12px] border border-[#ECECEC] p-6">
          <h1 className="font-medium text-3xl mb-4 ">{resource.title}</h1>
          <p className="mb-6">{resource.description}</p>
          
          <video className='rounded-[12px]' width="100%" controls onError={(e) => console.error("Video failed to load:", e)}>
            <source src={file.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>      
  
  
  
  
        </div>
      </>
    )
  }else{
    return (
      <>
        <div className="file_details rounded-[12px] border border-[#ECECEC] p-6">
          <h1 className="font-medium text-3xl mb-4 ">{resource.title}</h1>
          <p className="mb-6">{resource.description}</p>
          
          <h2 className='text-2xl'>PDF content will be here...</h2>     
  
  
  
  
        </div>
      </>
    )
  }


}

export default UsrRsrcLectFileDetails