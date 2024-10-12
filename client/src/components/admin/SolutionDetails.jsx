import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSolutionBySlugQuery } from '../../slices/solutionApiSlice';
import ArrowLeft from '../../assets/arrow-left.svg'
import PencilWhite from '../../assets/pencil-white.svg'
import { Link } from 'react-router-dom';


const SolutionDetails = () => {
  const {slug} = useParams();
  // console.log("slug", slug)

  let solution = {}
  const {data, isLoading, isError } = useGetSolutionBySlugQuery(slug);
  console.log("data",data)
  console.log('isError',isError)
  
  if(isLoading){
    return 'Loading....'
  }
  return (
    <>
      <div className="header flex justify-between">
        <Link to='/admin/solutions/' className="flex gap-2 text-2xl font-semibold w-[250px] items-center">
          <img className='w-6' src={ArrowLeft} alt="" /> Monthly content
        </Link>

        <Link to={`/admin/solutions/${data.solution.slug}/edit`} className="flex gap-2 items-center w-[200px] bg-primary-blue justify-center h-11 rounded-[100px] cursor-pointer ">
          <img src={PencilWhite} alt="" />Edit details
        </Link>

      </div>

      

      <div className="content mt-8">
        <p className="font-semibold mb-2">{data.solution.title}</p>
        <p className="text-[#B0B0B0] mb-5">{data.solution.description}</p>
        <p className="text-[#B0B0B0] mb-5">Short Description: {data.solution.shortDesc}</p>
        <img className='w-full' src={data.solution.image} alt="" />

        <p className="font-medium text-lg mt-5 mb-10 ">Benefits</p>

        {data.solution.benefits.map(benefit => <div key={benefit.title} className='mb-6'>
          <img className='mb-2' src={benefit.image} alt="" />
          <p className='mb-2'>{benefit.title}</p>
          <p className='text-[#B0B0B0]'>{benefit.desc}</p>

        </div>)}

        <p className="font-medium text-lg mt-11 mb-10 ">Workflow</p>     
        {data.solution.workflows.map(benefit => <div key={benefit.title} className='mb-6'>
          <p className='mb-2'>{benefit.title}</p>
          <p className='text-[#B0B0B0]'>{benefit.desc}</p>
          <img className='mt-2' src={benefit.image} alt="" />
        </div>)}


        <p className="font-medium text-lg mt-11 mb-10 ">Tools and technology</p>     
        {data.solution.tools.map(benefit => <div key={benefit.title} className='mb-6'>
          <p className='mb-2'>{benefit.title}</p>
          <p className='text-[#B0B0B0]'>{benefit.desc}</p>
        </div>)}

        <p className="font-medium text-lg mt-11 mb-10 ">Features</p>     
        {data.solution.features.map(benefit => <div  key={benefit.title}  className='mb-6'>
          <img className='mb-2' src={benefit.image} alt="" />
          <p className='mb-2'>{benefit.title}</p>
          <p className='text-[#B0B0B0]'>{benefit.desc}</p>
        </div>)}



      </div>
    </>
  )
}

export default SolutionDetails