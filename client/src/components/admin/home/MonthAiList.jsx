import React from 'react'
import { MonthAiListItem } from './MonthAiListItem'

const MonthAiList = ({items, deleteHandler}) => {
  // console.log(items)
  return (
    <>
      <div className="flex text-[#B0B0B0] mt-8">
        <div className='grow-[2] w-[409px]'>Company Name</div>
        <div className='grow-[1]'>Visibility</div>
        <div className='grow-[1]'>Type</div>
        <div className='grow-[1]'>Date</div>
        <div className='grow-[1]'>Actions</div>
      </div>
      {items.map(item => <MonthAiListItem key={item._id} item={item} deleteHandler={deleteHandler} />)}
    </>
  )
}

export default MonthAiList