// Users Resources Page
import React, { useState } from 'react'
import HeroImg from '../assets/resource_hero.png'
import SearchIcon from '../assets/searchLarge.svg'
import ArrowDown from '../assets/chevron-down.svg'
import dayjs from 'dayjs'
import { useGetResourceQuery } from '../slices/resourcesApiSlice'
import Loader from './Loader'
import UserResourceItem from './UserResourceItem'

const UserResources = () => {
  const month = dayjs().month();
  const [curMonth,setCurMonth] = useState(month)
  const [curYear, setCurYear] = useState(dayjs().year())

  const {data, isLoading, isError} = useGetResourceQuery()
  if(isLoading){
    return <Loader />
  }

  if(isError){
    return "Something went wrong!"
  }

  const resources = data.resources.filter(resource => resource.year == curYear)

  return (
    <>
      <section className="px-16 h-[480px] w-full flex items-center " style={{ backgroundImage: `url(${HeroImg})` }}>
        <div className="max-w-[800px]">
          <h2 className="text-4xl font-medium mb-4">Elevate Your Team's Potential</h2>
          <p className="mb-4">Your team deserves the best resources for professional growth, regardless of their experience level. Partner with Datu for Teams to provide a premier platform for creative learning and development.</p>
          <a href="" className="font-semibold px-6 h-11 inline-flex items-center rounded-[100px] bg-primary-blue">Begin Your Course</a>
        </div>
      </section>

      <section className="deep_dives mt-8">
        <div className="">
          <h1 className='text-5xl font-semibold'>Deep dives</h1>
        </div>

        <div className="resource_title_area flex justify-between items-center mt-8">
          <form action="">
            <div className="relative">
              <img className='absolute left-[14px] top-[12px] ' src={SearchIcon} alt="" />
              <input className='searchBordered h-11 bg-transparent rounded-lg pl-11' placeholder="Search" type="text" />
            </div>
          </form>
          <div className="">
            <select name="" id="" className='bg-transparent border border-[#282828] rounded-sm py-2.5 px-3.5 bg-[#131514] text-[#727374]'>
              <option value="">Year </option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>
        </div>
      </section>


      <section className="monthly_section mt-11 mb-10">
        <div className="tab_titles">
          <ul className='flex justify-between'>
            {Array.from({ length: 12 }, (_, index) => (
              <li 
                key={index} 
                onClick={() => setCurMonth(index)} 
                className={`cursor-pointer ${curMonth === index ? 'text-white' : 'text-[#999999]'}`}
              >
                {dayjs().month(index).format('MMMM')}
              </li>
            ))}
            
          </ul>
        </div>

        <div className="tab_contents">


          {Array.from({ length: 12 }, (_, index) => (
            curMonth === index && (
              resources.filter(resource => resource.month == index).map(resource => (
                <UserResourceItem key={resource._id} resource={resource} />
              ))
            )
          ))}
          

        </div>
      </section>
    </>
  )
}

export default UserResources