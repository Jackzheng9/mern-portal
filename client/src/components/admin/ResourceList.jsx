import FolderIcon from '../../assets/FolderIcon.svg'
import BluePlus from '../../assets/BluePlus.svg'
import { useState,useEffect } from 'react'
import { useGetResourceQuery } from '../../slices/resourcesApiSlice'
import ResourceListItem from './ResourceListItem';
import Loader from '../Loader'
import { useSelector } from 'react-redux';



const ResourceList = ({showUpload}) => {
  
  const [showNothing, setShowNothing] = useState(false)
  const [loading, setLoading] = useState(true)
  const {data, isLoading, isError} = useGetResourceQuery();
  console.log("data",data);
  const searchTerm = useSelector(state => state.resourceFilter.searchTerm)
 console.log("searchTerm", searchTerm)

  useEffect(() => {
    console.log("Use Effect working!")
  },[])

  const searchFilterHandler = (resource) => {
    return resource?.title?.toLowerCase()?.includes(searchTerm.toLowerCase());
  }


  return (
    <>
      {isLoading && <Loader />}
      { data && data.resources.length == 0 && <>
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

      {data && data.resources.length !== 0 && <>
        <div className="flex text-gray-300 mt-5">
          
          <div className="grow-[2] basis-0">Content</div>
          <div className="grow basis-0">Visibility</div>
          <div className="grow basis-0">Month</div>
          <div className="grow basis-0">Monthly Tag</div>
          <div className="grow basis-0">Actions</div>

        </div>

        {data.resources.filter(searchFilterHandler).map(resource => <ResourceListItem key={resource._id} resource={resource} />)}


      </> }
    
    </>
  )
}

export default ResourceList