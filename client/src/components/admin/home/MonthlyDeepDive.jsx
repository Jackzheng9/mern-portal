import React from 'react'
import FolderIcon from '../../../assets/FolderIcon.svg'
import BluePlus from '../../../assets/BluePlus.svg'
import { useGetDeepDivesQuery } from '../../../slices/deepDiveApiSlice'
import Loader from '../../Loader'
import { DeepDivesList } from './DeepDivesList'


const MonthlyDeepDive = ({deleteHandler}) => {

  const {data, isLoading, isError, error} = useGetDeepDivesQuery();

  if(isLoading){
    return <Loader />
  }
  if(isError){
    console.log("Error occured", error )
  }

  // console.log("data", data)

  return (
    <>
      {data.deepdives.length == 0 ? (

        <section className="monthly_deep_dive mt-6">
          <div className="nothing_found flex flex-col mx-auto items-center">
            <img src={FolderIcon} className='mx-auto block w-20 mb-4'  alt="" />
            <p className="text-[#F6F6F6] text-lg font-semibold mx-auto mb-2">No Content found</p>
            <p className="text-gray-300">No content found! the requested content is missing or unavailable.</p>
            <div onClick={() => showUpload()} className="h-11 inline-flex items-center pl-9 pr-11 gap-2 border border-blue-600 rounded-[100px] mx-auto mt-6 cursor-pointer text-blue-600 hover:bg-black hover:text-white">
              <img src={BluePlus} alt="" className="" />
              <p className="">Upload Content</p>
            </div>
          </div>
        </section>
      ) : <DeepDivesList deepdives={data.deepdives} deleteHandler={deleteHandler} />}
      
    </>
    
  )
}

export default MonthlyDeepDive