import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetResourceBySlugQuery } from '../slices/resourcesApiSlice';
import Loader from './Loader';
import UserResourceLecture from './UserResourceLecture';

const UserResourceDetails = () => {
  const {slug} = useParams();
  const {data, isLoading, isError} = useGetResourceBySlugQuery(slug);

  if(isLoading){
    return <Loader />
  }
  const resource =  data.resource; 
  console.log("Resource", resource)


  return (
    <>
      <section className="px-16 h-[480px] w-full flex items-center mb-4" style={{ backgroundImage: `url(${resource.image})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
        <div className="max-w-[800px]">
          <h2 className="text-4xl font-medium mb-4">{resource.title}</h2>
          <p className="mb-4">{resource.description}</p>
        </div>
      </section>

      <section className="">
        {resource.lectures.map(lecture => <UserResourceLecture key={lecture._id} lecture={lecture} year={resource.year} resource={resource} />)}
      </section>


    </>
  )
}

export default UserResourceDetails