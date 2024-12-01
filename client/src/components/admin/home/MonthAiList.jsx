import React, { useState } from 'react'
import { MonthAiListItem } from './MonthAiListItem'

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
      
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MonthAiList