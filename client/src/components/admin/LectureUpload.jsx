import React from 'react'
import ArrowUpBlue from '../../assets/ArrowUpBlue.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import { useState } from 'react'
import X from '../../assets/Close-dimmed.svg'
// import Loader from '../Loader'
import Video from '../../assets/Video.svg'
import PDF from '../../assets/PDF.svg'

const LectureUpload = ({lecture,tempFiles, index,fileChangeHandler,lectureChangeHandler,uploadFileHandler,showUploadPan, setShowUploadPan, removeTempFile}) => {

  const [showLoader, setShowLoader] = useState(false)
  
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;




  return (
    <div className="px-4 mb-4" key={index}>
                
      <div className="mb-4">
        <div  onClick={() => setShowUploadPan(true)} className="flex gap-2">
          <label className='inline-flex cursor-pointer gap-4 items-center text-primary-blue border border-primary-blue h-11 pl-6 pr-5 rounded-[100px]'> <img src={ArrowUpBlue} alt="" /> Upload Video or PDF</label>
          
        </div>
        

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
                <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload  <span className='text-gray-300'>or drag and drop PDF, Video </span> </p>
              </label>
              <input onChange={(event) => fileChangeHandler(index,event)} id={`lecimage-${index}`} className='hidden' type="file" name="files" multiple/>

              <ul className='flex gap-4 wrap'>
                {tempFiles.map((tempFile,tempIndex) => {
                  // console.log("temp file", tempFile)
                  let image;
                  if(tempFile.type == 'application/pdf'){
                    image = PDF
                  }else if(tempFile.type == 'video/mp4'){
                    image = <Video />
                  }
                  return(
                    <li key={tempFile.name} className='grow basis-0 w-full relative'>
                      <img className='w-6'  src={tempFile.type == 'application/pdf' ? PDF : Video} alt="" /> {tempFile.name}
                      <img onClick={() => removeTempFile(tempIndex) } className='absolute w-10 -top-4 -right-4 cursor-pointer' src={X} alt="" />
                    </li>
                  )
                })}
              </ul>
              
              
            </div>
            <div className="flex justify-end gap-4">
              <p onClick={() => setShowUploadPan(false)} className="h-11 flex items-center px-5 border rounded-[100px] cursor-pointer">Cancel</p>
              <div onClick={() => uploadFileHandler(index)} className="cursor-pointer h-11 flex items-center px-5 border border-primary-blue rounded-[100px] cursor-pointer bg-primary-blue">
              Upload
            </div>
            </div>

              


          </div>


        </div>
        )}




                  
        
      </div>

      <div className="mb-4 flex flex-col gap-1.5">
        <label htmlFor="">Title</label>
        <input className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="title" type="text" placeholder='Title' value={lecture.title} onChange={(event) => lectureChangeHandler(index,event)} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="">Description</label>
        <input className='px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="desc" type="text" placeholder='Description' value={lecture.desc} onChange={(event) => lectureChangeHandler(index,event)} />
      </div>

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


      
    </div>
  )
}

export default LectureUpload