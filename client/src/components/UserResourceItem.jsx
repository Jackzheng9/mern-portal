import React from 'react'
import BlueDot from '../assets/BlueDot.svg'
import Lock from '../assets/lock.svg'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const UserResourceItem = ({resource}) => {
  // console.log("resource", resource)
  const curMonth = dayjs().month();
  const resourceMonth = resource.month;

  if(curMonth < resourceMonth ){
    return (
      <div href="" className='max-w-full md:max-w-[300px] mt-11 inline-block relative'>
        <img className='absolute top-3 right-5 w-8' src={Lock} alt="" />
        <div className="tag flex gap-1 items-center mb-11"><img className='w-2' src={BlueDot} alt="" /> <p className="uppercase"></p> {resource.tag}</div>
        <img className='mb-6 rounded-lg w-full md:w-auto' src={resource.image} alt="" />
        <p className="mb-4 text-2xl font-medium">{resource.title}</p>
        <p className="">{resource.shortDesc}</p>
      </div>
    )    
  }

  return (
    <Link to={`/resources/${resource.slug}`} className='max-w-full md:max-w-[300px] mt-11 inline-block'>
      <div className="tag flex gap-1 items-center mb-11"><img className='w-2' src={BlueDot} alt="" /> <p className="uppercase"></p> {resource.tag}</div>
      <img className='mb-6 rounded-lg w-full md:w-auto' src={resource.image} alt="" />
      <p className="mb-4 text-2xl font-medium">{resource.title}</p>
      <p className="">{resource.shortDesc}</p>
    </Link>
  )
}

export default UserResourceItem