import FolderIcon from '../../assets/FolderIcon.svg'
import BluePlus from '../../assets/BluePlus.svg'
import LeftArrow from '../../assets/page-arrow-left.svg'
import RightArrow from '../../assets/page-arrow-right.svg'
import { useState,useEffect } from 'react'
import { useGetResourceQuery } from '../../slices/resourcesApiSlice'
import ResourceListItem from './ResourceListItem';
import Loader from '../Loader'
import { useSelector } from 'react-redux';



const ResourceList = ({showUpload}) => {
  
  const [showNothing, setShowNothing] = useState(false)
  const [loading, setLoading] = useState(true)
  const {data, isLoading, isError} = useGetResourceQuery();
  // console.log("data",data);
  const searchTerm = useSelector(state => state.resourceFilter.searchTerm);
  const statusFilterTerm = useSelector(state => state.resourceFilter.status)
  // console.log("searchTerm", searchTerm)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  useEffect(() => {
    // console.log("Use Effect working!")
  },[])

  const searchFilterHandler = (resource) => {
    return resource?.title?.toLowerCase()?.includes(searchTerm.toLowerCase());
  }
  const statusFilterHandler = (user) => {
    if(statusFilterTerm == "All"){
      return true;
    }else{
      return user.status ===  statusFilterTerm;
    }    
  }

  if(isLoading){
    return <Loader />
  }

  const filteredResources = data.resources.filter(searchFilterHandler).filter(statusFilterHandler)

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const getPaginationNumbers = () => {
    const paginationNumbers = [];
    const maxPagesToShow = 5; // Total number of page buttons to show
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - (maxPagesToShow - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(i);
    }

    // Add ellipses if needed
    if (startPage > 1) {
      paginationNumbers.unshift('...');
      paginationNumbers.unshift(1);
    }
    if (endPage < totalPages) {
      paginationNumbers.push('...');
      paginationNumbers.push(totalPages);
    }

    return paginationNumbers;
  };





  return (
    <>
      {/* {isLoading && <Loader />} */}
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
        <div className="flex text-gray-300 mt-8 justify-between text-sm">
          
          <div className="grow-[2] basis-0">Content</div>
          <div className="grow basis-0">Visibility</div>
          <div className="grow basis-0">Month</div>
          <div className="grow basis-0">Monthly Tag</div>
          <div className="grow basis-0 max-w-[97px] flex justify-center">Actions</div>

        </div>

        {/* {data.resources.filter(searchFilterHandler).filter(statusFilterHandler).map(resource => <ResourceListItem key={resource._id} resource={resource} />)} */}


        {paginatedResources.map(resource => <ResourceListItem key={resource._id} resource={resource} />)}


        <div className="pagination text-[#5D5D5D] flex justify-between items-center mt-4">
          <button className='flex gap-3.5 items-center' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <img src={LeftArrow} alt="" /> Previous
          </button>

          <div className="pageNumbers">
          {getPaginationNumbers().map((page, index) => (
            <button
              className={`px-4 py-2.5 ${currentPage == page ? 'bg-[#1B1B1F] text-[#454545]' : ''}`}
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
          </div>

          <button className='flex gap-3.5 items-center' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
            <img src={RightArrow} alt="" />
          </button>
        </div>







      </> }
    
    </>
  )
}

export default ResourceList