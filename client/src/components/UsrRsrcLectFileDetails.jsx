import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '../assets/arrow-narrow-left-dimmed.svg'
import { Root, CurrentPage, Outline, OutlineItem, OutlineChildItems, Viewport, Pages, Page, CanvasLayer, TextLayer, AnnotationLayer, Thumbnails, Thumbnail, TotalPages, CurrentZoom, CustomLayer,  } from '@fileforge/pdfreader';
import { useAddFiletoUserMutation } from '../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCompletedfiles } from '../slices/userInfoSlice';

const UsrRsrcLectFileDetails = () => {

  
  const file = useSelector(state => state.resourceFilter.currentFile.file)
  const index = useSelector(state => state.resourceFilter.currentFile.index)
  const fileTitle = useSelector(state => state.resourceFilter.currentFile.fileTitle)
  const totalFiles = useSelector(state => state.resourceFilter.currentFile.totalFiles)
  const isFileMatched = useSelector(state => state.resourceFilter.currentFile.isFileMatched)
  const resource = useSelector(state => state.resourceFilter.currentFile.resource)

  const [fileMatched, setFileMatched] = useState(isFileMatched)
  console.log("File", file)
  // console.log("resource", resource)
  // console.log("index", index)
  // console.log("fileTitle", fileTitle)
  // console.log("totalFiles", totalFiles)
  const navigate = useNavigate()
  const dispatch = useDispatch();


  if(!file){
    navigate('/resources/')
  }

  const [addFiletoUser ,{isLoading: addFileLoading, isError: addFileError}] = useAddFiletoUserMutation();

  const completeHandler = async () => {
    setFileMatched(true)
    const res = await addFiletoUser({file:{year:new Date().getFullYear(), fileId:file._id}}).unwrap();
    dispatch(setCompletedfiles({type:'add', fileId:file._id}))
  }





  if(file.assetType == 'video'){
    return (
      <>
        <div className="file_details rounded-[12px] border border-[#ECECEC] p-6">
          <div className="file_details_top_bar flex justify-between items-center mb-6">
              <button onClick={() => navigate(-1)} className="flex gap-2 items-center text-[#727374] px-4 py-3 bg-[#131514] rounded-md">
                <img src={ArrowLeft} alt="" /> Back To Resource
              </button>

              {!fileMatched && <div onClick={completeHandler} className="bg-primary-blue h-11 inline-flex items-center px-6 rounded-[100px] cursor-pointer">Mark as Done</div>}
              
            </div>

            <div className="file_meta flex items-center justify-between py-4">
              <p className="t">{fileTitle}</p>
              <div className="flex gap-4">
                <p>Activity {index+1}/{totalFiles}</p>
                <p className="flex items-center gap-2"><span className='block w-2 h-2 rounded-full bg-white'></span>5 mins</p>
              </div>
            </div>



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
        <div className="file_details">
          <div className="file_details_top_bar flex justify-between items-center mb-6">
            <button onClick={() => navigate(-1)} className="flex gap-2 items-center text-[#727374] px-4 py-3 bg-[#131514] rounded-md">
              <img src={ArrowLeft} alt="" /> Back To Resource
            </button>

            {!fileMatched && <div onClick={completeHandler} className="bg-primary-blue h-11 inline-flex items-center px-6 rounded-[100px] cursor-pointer">Mark as Done</div>}
            
          </div>

          <div className="file_meta flex items-center justify-between py-4">
            <p className="t">{fileTitle}</p>
            <div className="flex gap-4">
              <p>Activity {index+1}/{totalFiles}</p>
              <p className="flex items-center gap-2"><span className='block w-2 h-2 rounded-full bg-white'></span>5 mins</p>
            </div>
          </div>

          <h1 className="font-medium text-3xl mb-4 ">{resource.title}</h1>
          <p className="mb-6">{resource.description}</p>

          <Root fileURL={file.url} className="m-4 overflow-hidden border-0">
            <div className="p-3 flex gap-4"></div>
            {/* <div className="grid grid-cols-[24rem,1fr] h-[500px] overflow-hidden"> */}
            
            <div className="flex gap-6 overflow-hidden h-[100vh]">
      
              <Thumbnails className="w-full max-w-[120px] p-4 flex flex-col gap-4 items-center py-4 h-full overflow-y-auto overflow-x-hidden">
                <Thumbnail className="transition-all w-[88px] h-[124px] hover:shadow-lg hover:outline hover:outline-gray-300 mb-4" />
                
              </Thumbnails>




              <Viewport className=" py-4 w-full pdf_view">
                <Pages className="w-full">
                  <Page className="shadow-xl w-full  outline outline-black/5 overflow-hidden">
                    <CanvasLayer className="w-full" />
                    <TextLayer className="w-full" />
                    <AnnotationLayer className="w-full" />
                  </Page>
                </Pages>
              </Viewport>
            </div>
          </Root>            
  
  
  
        </div>
      </>
    )
  }


}

export default UsrRsrcLectFileDetails