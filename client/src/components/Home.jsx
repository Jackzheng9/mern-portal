import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route,useParams,useSearchParams,useNavigate  } from "react-router-dom";
import LinkedInImage from '../assets/LinkedInImage.svg'
import BlueDot from '../assets/BlueDot.svg'
import ArrowRightUp from '../assets/arrow-right-up.svg'
import SolImg from '../assets/solution-1.png'
import ArrowRightTopRed from '../assets/arrow-right-top-red.svg'
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("setpass"))

  const navigate = useNavigate();


  useEffect(() => {
    if(searchParams.get("setpass")){
      navigate('/setpassword')
    }

  },[])


  return (
    <>
      <div className="linkedIn flex gap-11 px-24 py-[22px] bg-[#282828] items-center">
        <img src={LinkedInImage} alt="" />
        <div className="">
          <h1 className='text-white text-4xl font-semibold mb-4' >Join our LinkedIn community</h1>
          <p className="">We’re excited to have you here. Explore the Dashboard to stay updated with announcements, special events, and virtual meeting sign-ups. Head</p>
          <Link className="font-semibold bg-primary-blue px-6 py-3 rounded-[100px] mt-4 inline-block" to="#" >Join Community</Link>

        </div>
      </div>

      <div className="tag flex gap-4 items-center mt-11 mb-9">
        <img src={BlueDot} alt="" />
        <p className="text-lg font-semibold">THIS MONTH’S TOPIC: LIFE SCIENCE</p>
      </div>

      <div className="main_content">
        <div className="flex items-center justify-between mb-6">
          <h1 className='text-5xl font-semibold'>Solutions For You</h1>
          <Link className='flex gap-1 items-center' to="#">Explore All <img src={ArrowRightUp} alt="" /></Link>
        </div>

        <div className="solutions_area_wrap flex gap-6 justify-between">

          <Link to="" className="solution bg-[#1C1C1C] w-1/3">
            <img className='w-full h-[233px]' src={SolImg} alt="" />
            <div className="sol_content px-6 pb-6 mt-6">
              <h2 className="text-lg font-medium mb-4">Solution name</h2>
              <p className="">We’re excited to have you here. Explore the Dashboard to stay updated with announcements, special events, and virtual meeting sign-ups. Head</p>
            </div>
          </Link>

          <Link to="" className="solution bg-[#1C1C1C] w-1/3">
            <img className='w-full h-[233px]' src={SolImg} alt="" />
            <div className="sol_content px-6 pb-6 mt-6">
              <h2 className="text-lg font-medium mb-4">Solution name</h2>
              <p className="">We’re excited to have you here. Explore the Dashboard to stay updated with announcements, special events, and virtual meeting sign-ups. Head</p>
            </div>
          </Link>
          
          <Link to="" className="solution bg-[#1C1C1C] w-1/3">
            <img className='w-full h-[233px]' src={SolImg} alt="" />
            <div className="sol_content px-6 pb-6 mt-6">
              <h2 className="text-lg font-medium mb-4">Solution name</h2>
              <p className="">We’re excited to have you here. Explore the Dashboard to stay updated with announcements, special events, and virtual meeting sign-ups. Head</p>
            </div>
          </Link>

        </div>

        <div className="resources_area mt-8">
          <h1 className='text-5xl font-semibold'>External Resources</h1>
          <div className="resource_wrap flex gap-6">
            
            <div className="resource flex flex-col gap-4 p-6">
              <p className="font-medium text-lg">Connect your CRM</p>
              <p className="text-[#999999]">Save your time managing yopur CRM by syncing with DATU</p>
              <Link className='flex h-12 items-center' to=""><p className="text-[#FF6314]">See All CRM Intergrations</p><img src={ArrowRightTopRed} alt="" /></Link>
            </div>            
            <div className="resource flex flex-col gap-4 p-6">
              <p className="font-medium text-lg">Connect your CRM</p>
              <p className="text-[#999999]">Save your time managing yopur CRM by syncing with DATU</p>
              <Link className='flex h-12 items-center' to=""><p className="text-[#FF6314]">See All CRM Intergrations</p><img src={ArrowRightTopRed} alt="" /></Link>
            </div>            
            <div className="resource flex flex-col gap-4 p-6">
              <p className="font-medium text-lg">Connect your CRM</p>
              <p className="text-[#999999]">Save your time managing yopur CRM by syncing with DATU</p>
              <Link className='flex h-12 items-center' to=""><p className="text-[#FF6314]">See All CRM Intergrations</p><img src={ArrowRightTopRed} alt="" /></Link>
            </div>


          </div>
        </div>

      </div>
    </>
  )
}

export default Home