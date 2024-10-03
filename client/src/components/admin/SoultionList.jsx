import FolderIcon from '../../assets/FolderIcon.svg'
import BluePlus from '../../assets/BluePlus.svg'
import { useState,useEffect } from 'react'
import { useGetAllSolutionQuery } from '../../slices/solutionApiSlice'

import SolutionListItem from './SolutionListItem'


const SoultionList = ({showUpload}) => {
  
  const [showNothing, setShowNothing] = useState(false)
  const [loading, setLoading] = useState(true)
  const {data, isLoading, isError} = useGetAllSolutionQuery();
  console.log("data",data);

 

  useEffect(() => {
    console.log("Use Effect working!")
  },[])


  return (
    <>
      {isLoading && <>Loading....</>}
      { data && data.solutions.length == 0 && <>
          <div className="nothing_found flex flex-col mx-auto items-center">
            <img src={FolderIcon} className='mx-auto block w-20 mb-4'  alt="" />
            <p className="text-[#F6F6F6] text-lg font-semibold mx-auto mb-2">No Content found</p>
            <p className="text-gray-300">No content found! the requested content is missing or unavailable.</p>
            <div onClick={() => showUpload()} className="h-11 inline-flex items-center pl-9 pr-11 gap-2 border border-blue-600 rounded-[100px] mx-auto mt-6 cursor-pointer text-blue-600 hover:bg-black hover:text-white">
              <img src={BluePlus} alt="" className="" />
              <p className="">Upload Content</p>
            </div>
        </div>      
      </>}

      {data && data.solutions.length !== 0 && <>
        <div className="flex text-gray-300 mt-5">
          
          <div className="grow-[2] basis-0">Solution</div>
          <div className="grow basis-0">Visibility</div>
          <div className="grow basis-0">Request Date</div>
          <div className="grow basis-0">Category</div>
          <div className="grow basis-0">Actions</div>

        </div>

        {/* {data.solutions.map(solution => {
          return (
            <div className="flex py-5">

              <div className=" flex items-center gap-4 grow-[2] basis-0"><img src={solution.image} className='w-8 h-8' alt="" /><p className="">{solution.title}</p></div>
              <div className="grow basis-0">{solution.status}</div>
              <div className="grow basis-0">date</div>
              <div className="grow basis-0">{solution.category}</div>
              <div className="grow basis-0"><img src={VerDots} className='' alt="" /></div>
      
            </div>   


          )
        })} */}


        {data.solutions.map(solution => <SolutionListItem key={solution._id} solution={solution} />)}


        {/* <div className="flex py-5">

          <div className=" flex gap-4 grow-[2] basis-0"><img src="" className='w-8' alt="" /><p className="">Supply Chain Automation</p></div>
          <div className="grow basis-0">Published</div>
          <div className="grow basis-0">7/21/2024</div>
          <div className="grow basis-0">Category</div>
          <div className="grow basis-0"><img src={VerDots} className='' alt="" /></div>

        </div> */}

      </> }
    
    </>
  )
}

export default SoultionList