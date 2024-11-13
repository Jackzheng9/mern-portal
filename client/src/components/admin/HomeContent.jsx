import React from 'react'
import CarouselComponent from './Carousel'
import ArrowUp from '../../assets/arrow-up.svg'
import MonthlyDeepDive from './home/MonthlyDeepDive'
import CreateMonthlyDeepDive from './home/CreateMonthlyDeepDive'




const HomeContent = () => {

  return (
    <div className='home_content_wrap relative bg-[#5D5D5D33]/20'>
      <div className='flex justify-between items-center'>
        <p className='font-medium text-2xl'>Home Content</p>
        <div  className="bg-primary-blue rounded-[100px] flex items-center pl-9 pr-11 h-11 gap-2 cursor-pointer">
            <img src={ArrowUp} alt="" />
            <p className="">Upload Content</p>
          </div>      
      </div>

      <MonthlyDeepDive />
      <CreateMonthlyDeepDive />
      
    </div>
    
  )
}

export default HomeContent