import React, { useState } from 'react'
import ArrowUp from '../../assets/arrow-up.svg'
import SearchIcon from '../../assets/searchLarge.svg'
import Bars from '../../assets/bars.svg'
import FolderIcon from '../../assets/FolderIcon.svg'
import BluePlus from '../../assets/BluePlus.svg'
import BtnCloseLg from '../../assets/BtnCloseLg.svg'

const Solutions = () => {
  const [showUpload, setShowUpload] = useState(true)



  return (
    <div className='px-6 relative'>
      <div className="flex items-center justify-between">
          <p className="">Manage Solutions</p>
          <div className="bg-primary-blue rounded-[100px] flex items-center pl-9 pr-11 h-11 gap-2">
            <img src={ArrowUp} alt="" />
            <p className="">Upload Content</p>
          </div>
      </div>

      <div className="flex justify-between mt-8">
        <form action="">
          <div className="relative">
            <img className='absolute left-[14px] top-[12px] ' src={SearchIcon} alt="" />
            <input className='searchBordered h-11 bg-transparent rounded-lg pl-11' placeholder="Search" type="text" />
          </div>
        </form>

        <div className="flex gap-1 items-center">
          <p className="text-gray-300 font-medium">All</p> <img src="" alt="" />
          <img src={Bars} className='w-5' alt="" />
        </div>

      </div>

      <div className="nothing_found flex flex-col mx-auto items-center">
          <img src={FolderIcon} className='mx-auto block w-20 mb-4'  alt="" />
          <p className="text-[#F6F6F6] text-lg font-semibold mx-auto mb-2">No Content found</p>
          <p className="text-gray-300">No content found! the requested content is missing or unavailable.</p>
          <div className="h-11 inline-flex items-center pl-9 pr-11 gap-2 border border-blue-600 rounded-[100px] mx-auto mt-6 cursor-pointer text-blue-600 hover:bg-black hover:text-white">
            <img src={BluePlus} alt="" className="" />
            <p className="">Upload Content</p>
            
          </div>
          

      </div>

      {showUpload && (
        
        <div className="upload_solution left-0 top-0 w-full h-full bg-black">
          <div className="upload_solution_inner container py-11">
            <div className="flex justify-between">
              <p className="text-2xl">Upload Solution</p>
              <img onClick={() => setShowUpload(false)} src={BtnCloseLg} alt="" className="cursor-pointer" />
            </div>
          </div>
          
        </div>

      )}






    </div>
  )
}

export default Solutions