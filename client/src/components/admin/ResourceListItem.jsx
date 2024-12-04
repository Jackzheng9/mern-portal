import React from 'react'
import ResourceListOptions from './ResourceListOptions'
import dayjs from 'dayjs'
import { Months } from '../../utils/months'

const ResourceListItem = ({resource}) => {

  const formatDate = (userDate) => {
    let formattedDate = dayjs(userDate).format("MM/DD/YYYY");
    return formattedDate;
  };

  


  return (
    <div className="flex items-center py-4 justify-between text-gray-300 font-medium relative">

      <div className=" flex items-center gap-4 grow-[2] basis-0"><img src={resource.image} className='w-8 h-8' alt="" /><p className="text-white">{resource.title}</p></div>
      <div className="grow basis-0">{resource.status}</div>
      <div className="grow basis-0">{Months[resource.month]} </div>
      <div className="grow basis-0">{resource.tag}</div>
      <ResourceListOptions resource={resource} />
      
    </div> 
  )
}

export default ResourceListItem