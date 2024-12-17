// Users Solutions Page
import React, { useState } from 'react'
import SearchIcon from '../assets/search-dim.svg'
import ctaspiralbg from '../assets/ctaspiralbg.png'

import UserSolutionsList from './UserSolutionsList'
import { Link, useNavigate } from 'react-router-dom'
import { useGetSolutionsQuery } from '../slices/solutionApiSlice'
import { setSearchTerm } from '../slices/SolutionListSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEditUserMutation } from '../slices/userApiSlice'

const UserSolutions = () => {
  const [searcFormTerm, setSearchFormTerm] = useState('')
  const {data, isLoading, isError} = useGetSolutionsQuery();
  // console.log("data", data)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchFilterTerm = useSelector(state => state.solutionsFilter.searchTerm)
  // console.log("term from slice",searchFilterTerm )

  const [editUser,{isLoading:userLoading, isError:userError}] = useEditUserMutation();
  if(isLoading || userLoading){
    return <p>Loading Data...</p>
  }

  if(!isLoading && isError){
    return <p>Something went wrong! Please try later.</p>
  }

  const searchChangeHandler = (e) => {
    console.log("search term changed!")
    setSearchFormTerm(e.target.value)

    dispatch(setSearchTerm(e.target.value))

  }

  const searchFilterHandler = (solution) => {
    return solution?.title?.toLowerCase()?.includes(searchFilterTerm);
  }

  let filteredSolutions = data.solutions.filter(searchFilterHandler);
  console.log("filtered items",filteredSolutions )

  const scheduleMeetingHandler = async () => {
      const data = {
        personalNotifications : {
          message:'Meeting clicked!',
          notificationType:'schedulemeeting',
        }
      }
      //const apiRes = await editUser(data).unwrap();
      // console.log("apiRes", apiRes)
      navigate('/contact')
  }


  return (
    <>
      <div className="solution_header rounded-xl bg-[#1C1C1C] border border-[#282828] py-6 tab:py-9 px-6 flex flex-col items-center justify-center">
        <p className="font-semibold text-2xxl tab:text-[40px] mb-4 tab:mb-6 mx-auto text-center ">Harness AI for Business Success</p>
        <p className="text-center">Leverage AI to streamline operations, make data-driven decisions, and achieve business excellence.</p>
        
        <form className='max-w-[628px] w-full mx-auto mt-6' action="">
          <div className="relative search_box_icon">
            <img className='absolute search_icon h-4 w-4' src={SearchIcon} alt="" />
            <input type="text" className='h-16 w-full rounded-[100px] pl-14 bg-[#131514] border border-[#282828] ' placeholder='Search' value={searcFormTerm} onChange={searchChangeHandler} />
          </div>
        </form>
      </div>

      <div className="solution_content mt-9">

        <div className="mb-9">
          <h1 className="mb-6 font-semibold text-2xxl tab:text-5xl">Solutions For You</h1>
          <UserSolutionsList solutions={filteredSolutions} />
        </div>

        

        <div className="">
          <h1 className="mb-6 font-semibold text-2xxl tab:text-5xl">Available Solutions </h1>
          <UserSolutionsList solutions={filteredSolutions} />
        </div>

        <div className="solution_cta mt-8 relative py-12 tab:py-[102px] px-4 tab:px-[109px] flex flex-col tab:flex-row items-start tab:items-center justify-between rounded-xl bg-[#131514] gap-6">
          
          <div className="w-full tab:max-w-[60%] relative z-20">
            <p className="font-semibold text-2xxl  tab:text-4xl mb-4">Book a Call for a Custom AI Solution</p>
            <p className="">If you're interested in a similar tool, schedule a meeting to discuss your needs. We'll create a custom solution tailored to your business requirements.</p>
          </div>

          <div className=" relative z-20">
            <Link to="" className="bg-primary-blue rounded-[100px] h-11 inline-flex items-center px-6 cursor-pointer">
              <p onClick={scheduleMeetingHandler} className="cursor-pointer">Schedule Now</p>
            </Link>
          </div>

          <img src={ctaspiralbg} className='absolute z-10 left-0 w-full' alt="" />


        </div>

      </div>
    </>
  )
}

export default UserSolutions