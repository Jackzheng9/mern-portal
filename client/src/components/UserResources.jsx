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

  let resources = data.resources.filter(resource => resource.year == curYear)

  const yearChangeHandler = (e) => {
    console.log("selected year", e.target.value)

  }
 
  return (
    <>
      <section className="px-4 tab:px-16 h-[351px] tab:h-[480px] w-full flex items-center " style={{ backgroundImage: `url(${HeroImg})` }}>
        <div className="max-w-[800px]">
          <h2 className="text-2xxl tab:text-4xl font-medium mb-4">Elevate Your Team's Potential</h2>
          <p className="mb-4">Your team deserves the best resources for professional growth, regardless of their experience level. Partner with Datu for Teams to provide a premier platform for creative learning and development.</p>
          <a href="" className="font-semibold px-6 h-11 inline-flex items-center rounded-[100px] bg-primary-blue">Begin Your Course</a>
        </div>
      </section>

      <section className="deep_dives mt-8">
        <div className="">
          <h1 className='text-2xxl tab:text-5xl font-semibold'>Deep dives</h1>
        </div>

        <div className="resource_title_area flex gap-8 justify-between items-center mt-8">
          <form action="">
            <div className="relative">
              <img className='absolute left-[14px] top-[12px] ' src={SearchIcon} alt="" />
              <input className='searchBordered h-11 bg-[#131514] rounded-lg pl-11 min-w-auto tab:min-w-[321px]' placeholder="Search" type="text" />
            </div>
          </form>
          <div className="">
            <select onChange={(e) => setCurYear(e.target.value)} value={curYear} name="" id="" className=' border border-[#282828] rounded-sm py-2.5 px-3.5 bg-[#131514] text-[#727374]'>
              <option value="">Year </option>
              <option value="2024" >2024</option>
              <option value="2025" >2025</option>
              <option value="2026" >2026</option>
              <option value="2027" >2027</option>
              <option value="2028" >2028</option>
              <option value="2029" >2029</option>
              <option value="2030" >2030</option>

            </select>
          </div>
        </div>
      </section>


      <section className="monthly_section mt-11 mb-10">
        <div className="tab_titles">
          <ul className='flex justify-between border-b border-[#282828] pb-2 gap-6 overflow-x-auto'>
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