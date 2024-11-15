import React from 'react'
import dayjs from 'dayjs'

export const MonthAiListItem = ({item, deleteHandler}) => {
  console.log("Item", item)

  const formatDate = (userDate) => {
    let formattedDate = dayjs(userDate).format("MM/DD/YYYY");
    return formattedDate;
  };



  return (
    <>
      <div className="flex  mt-2 mb-2">
        <div className='grow-[2] flex gap-2 items-center w-[409px]'>
          <div className=""><img className='max-w-[76px]' src={item.image} alt="" /></div>
          <div className="t">
            <p className="font-medium mb-2">{item.title}</p>
            <p className="text-[#B0B0B0] text-xs">{item.description}</p>
          </div> 
        </div>
        <div className='grow-[1]'>
              {item.active && (<div className="button inline">
                <p className='text-[#027A48] border border-[#027A48] rounded-[100px] h-6 inline-flex items-center px-2 justify-center'>Active</p>
              </div>) }
              
              {!item.active && <div className="button">
                <p className='text-[#F79009] border border-[#F79009] rounded-[100px] h-6 inline-flex items-center px-2 justify-center'>Inactive</p>
              </div> }          
        </div>
        <div className='grow-[1]'>{item.postType}</div>
        <div className='grow-[1]'>{formatDate(item.createdAt)}</div>
        <div className='grow-[1]'>Actions</div>
      </div>      
    </>
  )
}
