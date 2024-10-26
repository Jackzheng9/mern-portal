import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetResourceBySlugQuery } from '../../slices/resourcesApiSlice';
import ArrowLeft from '../../assets/arrow-left.svg'
import PencilWhite from '../../assets/pencil-white.svg'
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import ResourceDetailsContent from './ResourceDetailsContent';


const ResourceDetails = () => {
  const {slug} = useParams();
  // console.log("slug", slug)

  let solution = {}
  const {data, isLoading, isError } = useGetResourceBySlugQuery(slug);
  // console.log("data",data)
  // console.log('isError',isError)
  
  if(isLoading){
    return <Loader />
  }
  return (
    <>
      <div className="header flex justify-between">
        <Link to='/admin/resources/' className="flex gap-2 text-2xl font-semibold w-[250px] items-center">
          <img className='w-6' src={ArrowLeft} alt="" /> Monthly content
        </Link>

        {/* <Link to={`/admin/resources/${data.resource.slug}/edit`} className="flex gap-2 items-center w-[200px] bg-primary-blue justify-center h-11 rounded-[100px] cursor-pointer ">
          <img src={PencilWhite} alt="" />Edit details
        </Link> */}

      </div>

      

      <div className="content mt-8">
        <ResourceDetailsContent resource={data.resource} />        
      </div>
    </>
  )
}

export default ResourceDetails