import React, { useState } from 'react'
import FolderIcon from '../../../assets/FolderIcon.svg'
import BluePlus from '../../../assets/BluePlus.svg'
import UploadIcon from '../../../assets/UploadIcon.svg'
import CloseIcon from '../../../assets/Close-dimmed.svg'





const CreateMonthlyDeepDive = () => {

  const [checkBoxChecked,setCheckBoxChecked] = useState(true)

  const checkClick = (e) =>{
    console.log(e.target.checked)
    console.log("clicked!")
    setCheckBoxChecked(!checkBoxChecked)
  }


  return (
    <div className='create_monthly w-full h-full absolute flex justify-center top-[0px] backdrop-blur-[2px]'>
      <div className="create_monthly_inner w-full max-w-[720px] bg-black p-11">
        <div className="flex justify-between items-start ">
          <div className=''>
            <h1 className="font-semibold text-2xl mb-1">Monthly Deep  Dive</h1>
            <p className="text-[#B0B0B0] mb-8">Upload the details For the monthly deep  dive</p>
          </div>
          <img className='cursor-pointer' src={CloseIcon} alt="" />
        </div>
        

        <form action="">
          <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-7">
            <label htmlFor="solImg" className='cursor-pointer'>
              <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
              <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
            </label>
            <input id="solImg" className='hidden' type="file" />
            <div className="flex items-center gap-2">
              {/* <img src={solutionImage} alt="" className='w-10' /> */}
              {/* <p className="">{solutionImageName}</p> */}
            </div>
            
          </div>

          <div className="inputGroup flex flex-col gap-1.5 mb-7">
            <label htmlFor="">Title</label>
            <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow'  placeholder='Title goes here...' />
          </div>

          <div className="inputGroup flex flex-col gap-1.5 mb-5">
            <label htmlFor="">Description</label>
            <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' placeholder='Description.....'  />
          </div>

          <div className="publish_action mb-12 flex gap-2 items-center font-medium">
            <label className="switch" htmlFor='switch'>
              <input onChange={checkClick} type="checkbox" id="switch" checked={checkBoxChecked} />
              <span className="slider round"></span>
            </label>
            {checkBoxChecked && <p className="t">Active</p> }
            {!checkBoxChecked && <p className="t">Inactive</p> }
            
          </div>

          <div className="flex justify-between">
            <div className="">
              <div onClick={() => setShowUpload(false)} className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Cancel</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary-blue rounded-[100px] h-11 flex items-center justify-center px-5 cursor-pointer" onClick={() => publishHandler("Published")}>Publish</div>
            </div>
          </div>




        </form>

                


      </div>
    </div>
  )
}

export default CreateMonthlyDeepDive