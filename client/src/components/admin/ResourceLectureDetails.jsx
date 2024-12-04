import React, { useState } from 'react'
import Pencil from '../../assets/PencilBlue.svg'
import X from '../../assets/Close-dimmed.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import VideoIcon from '../../assets/video_icon.svg'
import PdfIcon from '../../assets/pdf_icon.svg'
import DeleteIcon from '../../assets/Delete_icon.svg'
import UploadBlueIcon from '../../assets/upload-blue-arrow.svg'
import ArrowTop from '../../assets/chevron-top.png'
import ArrowDown from '../../assets/chevron-bottom.png'



const ResourceLectureDetails = ({lecture,tempFiles, index,fileChangeHandler,lectureChangeHandler,uploadFileHandler, removeTempFile, deleteLectureFile, setShowSave, cancelEditHandler, publishHandler}) => {
  console.log("Current Lecture", lecture)
  // console.log("Current index", index)
  // console.log("Files",lecture.files)
  const [showUploadPan,setShowUploadPan] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [showLectFiles,setShowLectFiles] = useState(false)

  const uploadFiles = (index) =>{
    setShowUploadPan(false);
    uploadFileHandler(index)
  }


  const deleteHandler = (index, fileIndex) => {
    console.log("Delete called!")
    deleteLectureFile(index, fileIndex)
  }

  const cancelEdit = () => {
    setShowEdit(false)
    // setShowSave(false)
    cancelEditHandler()
  }

  const setEdit = () => {
    setShowEdit(true)
    setShowSave(true)
  }

  const lecturePublishHandler = (e) => {
    setShowEdit(false)
    publishHandler(e)
  }


  return (
    <>
      {!showEdit &&  (
        <div className="lecture_content mb-8">
          <div className=" flex gap-4 mb-6">
            
            <div className="grow  basis-0 max-w-[200px]">
              <img src={lecture.image} alt="" className=' h-[180px] rounded-lg'/>
            </div>
            
            <div className="grow-[2] basis-0">
              <div className="edit_btn flex justify-end mb-6">
                <div onClick={setEdit} className="flex gap-2 pl-9 pr-11 h-11 items-center border border-primary-blue rounded-[100px] text-primary-blue cursor-pointer">
                  <img src={Pencil} className='' alt="" />Edit
                </div>
              </div>
              <div className="titleRow flex justify-between items-center mb-4">
                <p className="font-medium text-2xl ">{lecture.title}</p>
                <div>
                  {showLectFiles && <img onClick={() => setShowLectFiles(!showLectFiles)} src={ArrowTop} alt="" className='cursor-pointer' />}
                  {!showLectFiles && <img onClick={() => setShowLectFiles(!showLectFiles)} src={ArrowDown} alt="" className='cursor-pointer' />}
                  
                  
                </div>

              </div>
              
              <p className="">{lecture.desc}</p>
              
      
            </div>


          </div>
          {showLectFiles && (

            <div className="lecture_files">
            {lecture.files.map((file,fileIndex) => {
              return(
                <li className="flex justify-between items-center mb-2" key={fileIndex}>
                  <div className="flex gap-4 items-center">
                    <img src={(file.assetType == 'pdf' || file.assetType == 'image' ) ? PdfIcon : VideoIcon} alt="" />
                    {file.assetName}
                  </div>
                </li>
              )
            })}

            </div>
          )}

        </div>
      )}
      
      
      {showEdit && (
        <div className="lecture_edit mb-11">
        
        <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-5">
          <label htmlFor={`image-${index}`} className='cursor-pointer'>
            <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
            <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
          </label>
          <input onChange={(event) => lectureChangeHandler(index,event)} id={`image-${index}`} className='hidden' type="file" name="image"/>
          <div className="flex items-center gap-2">
            <img src={lecture.image} alt="" className='w-10' />
            <p className="">{lecture.imgName}</p>
          </div>
          
        </div>

        <div className="mb-4 flex flex-col gap-1.5">
          <label htmlFor="">Title</label>
          <input className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="title" type="text" placeholder='Title' value={lecture.title} onChange={(event) => lectureChangeHandler(index,event)} />
        </div>

        <div className="flex flex-col gap-1.5 mb-11">
          <label htmlFor="">Description</label>
          <input className='px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="desc" type="text" placeholder='Description' value={lecture.desc} onChange={(event) => lectureChangeHandler(index,event)} />
        </div>

        {lecture.files.map((file,fileIndex) => {
          return(
            <li className="flex justify-between items-center mb-2" key={fileIndex}>
              <div className="flex gap-4 items-center">
                <img src={(file.assetType == 'pdf' || file.assetType == 'image' ) ? PdfIcon : VideoIcon} alt="" />
                {file.assetName}
              </div>
              <div onClick={() => deleteHandler(index, fileIndex)} className ="delete cursor-pointer"><img src={DeleteIcon} alt="" /></div>
            </li>
          )
        })}


        {showUploadPan && (

          <div className="uploadPan">
            <div className="lect_upload_inner w-full max-w-[632px] mx-auto">
              <div className="flex items-center justify-between mb-10">
                <p className="text-2xl font-semibold">Upload Lecture Assets</p>
                <img onClick={() => setShowUploadPan(false)} className='cursor-pointer' src={X} alt="" />
              </div>
              <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-5">
                <label htmlFor={`lecimage-${index}`} className='cursor-pointer'>
                  <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
                  <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload<span className='text-gray-300'>or drag and drop PDF, Video </span> </p>
                </label>
                <input onChange={(event) => fileChangeHandler(index,event)} id={`lecimage-${index}`} className='hidden' type="file" name="files" multiple/>

                <ul className='flex gap-4 wrap'>
                  {tempFiles.map((tempFile,tempIndex) => {
                    // console.log("temp file", tempFile)
                    
                    return(
                      <li key={tempFile.name} className='grow basis-0 w-full relative'>
                        <img className='w-6'  src={tempFile.type == 'application/pdf' ? PdfIcon : VideoIcon } alt="" /> {tempFile.name}
                        <img onClick={() => removeTempFile(tempIndex) } className='absolute w-10 -top-4 -right-4 cursor-pointer' src={X} alt="" />
                      </li>
                    )
                  })}
                </ul>
                
                
              </div>

              <div className="flex justify-end gap-4">
                <p onClick={() => setShowUploadPan(false)} className="h-11 flex items-center px-5 border rounded-[100px] cursor-pointer">Cancel</p>
                <div onClick={() => uploadFiles(index)} className="cursor-pointer h-11 flex items-center px-5 border border-primary-blue rounded-[100px] cursor-pointer bg-primary-blue">
                  Upload
                </div>
              </div>
            </div>
          </div>
        )}

        <button onClick={() => setShowUploadPan(true)} className='rounded-[100px] border border-primary-blue text-primary-blue h-11 flex items-center px-11 gap-2 my-11 cursor-pointer'> <img src={UploadBlueIcon} alt="" /> Upload files</button>


        <div className="save_section flex justify-between">
          <button className='border rounded-[100px] h-11 px-5 ' onClick={() => setShowEdit(false)}>Cancel</button>
          <button className='border bg-primary-blue border-primary-blue rounded-[100px] h-11 px-5' onClick = { lecturePublishHandler }>Save Changes</button>
        </div>

      
      </div>

      )}
      

    </>

  )
}

export default ResourceLectureDetails