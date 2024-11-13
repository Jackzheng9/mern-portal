import React, { useState } from 'react'
import CarouselComponent from './Carousel'
import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDownWhite from '../../assets/ArrowDownWhite.svg'
import MonthlyDeepDive from './home/MonthlyDeepDive'
import CreateMonthlyDeepDive from './home/CreateMonthlyDeepDive'




const HomeContent = () => {

  const[showCreateDeepDive, setShowCreateDeepDive] = useState(false);
  const[showSelector, setShowSelector] = useState(false);


  const uploadSelectHandler = (selector) =>{
    // console.log("selector",selector)
    setShowSelector(false)
    if(selector == 'deepdive'){
      setShowCreateDeepDive(true)
    }
  }

  const deepDivePanelCloseHandler = () => {
    setShowCreateDeepDive(false)
  } 


  return (
    <div className='home_content_wrap relative bg-[#5D5D5D33]/20'>
      <div className='flex justify-between items-center'>
        <p className='font-medium text-2xl'>Home Content</p>
        <div className="relative">
          <div onClick={() => setShowSelector( !showSelector) }  className="bg-primary-blue rounded-[100px] flex items-center pl-9 pr-11 h-11 gap-2 cursor-pointer">
            <img src={ArrowUp} alt="" />
            <p className="">Upload Content</p>
            <img src={ArrowDownWhite} alt="" />
          </div>
          {showSelector && (
            <ul className="upload_select absolute top-[100%] left-0 bg-[#111116] border border-[#222227] rounded outline-none py-8 px-6 z-10">
              <li onClick={() => uploadSelectHandler('deepdive')} className='cursor-pointer text-[#B0B0B0] hover:text-white font-medium' >Monthly Deep Dive</li>
              <li onClick={() => uploadSelectHandler('aisaas')} className='cursor-pointer text-[#B0B0B0] hover:text-white font-medium' >AI Saas tool</li>
              <li onClick={() => uploadSelectHandler('monthai')} className='cursor-pointer text-[#B0B0B0] hover:text-white font-medium' >This month in AI</li>
            </ul>

          )}
          
        </div>   
      </div>

      <MonthlyDeepDive />
      {showCreateDeepDive && <CreateMonthlyDeepDive closeHandler={deepDivePanelCloseHandler} /> }
      
      
    </div>
    
  )
}

export default HomeContent