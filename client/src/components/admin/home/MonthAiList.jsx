import React, { useState } from 'react'
import { MonthAiListItem } from './MonthAiListItem'
import ArrowLeft from '../../../assets/page-arrow-left.svg'
import ArrowRight from '../../../assets/page-arrow-right.svg'

const MonthAiList = ({items, deleteHandler}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=''>
      <div className="flex text-[#B0B0B0] mt-8 pl-6">
        <div className='grow-[2] w-full max-w-[409px]'>Company Name</div>
        <div className='grow flex-1'>Visibility</div>
        <div className='grow flex-1'>Type</div>
        <div className='grow flex-1'>Date</div>
        <div className='grow flex-1 max-w-[94px]'>Actions</div>
      </div>
      {currentItems.map(item => <MonthAiListItem key={item._id} item={item} deleteHandler={deleteHandler} />)}
      
      <div className="pagination py-6 flex justify-between text-[#5D5D5D]">
        <button  className='flex gap-2 items-center'
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          <img className='w-5' src={ArrowLeft} alt="" />
          Previous
        </button>
        <div className="pages ">
        
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`${currentPage === index + 1 ? 'current' : ''} font-medium text-sm leading-5 py-2.5 px-4`} >
              {index + 1}
              
            </button>
          ))}
        </div>
        
        <button className='flex gap-2 items-center' 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
          <img className='w-5' src={ArrowRight} alt="" />
        </button>
      </div>
    </div>
  )
}

export default MonthAiList