import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route,useParams,useSearchParams,useNavigate  } from "react-router-dom";
import LinkedInImage from '../assets/LinkedInImage.svg'
import BlueDot from '../assets/BlueDot.svg'
import ArrowRightUp from '../assets/arrow-right-up.svg'
import SolImg from '../assets/solution-1.png'
import ArrowRightTopRed from '../assets/arrow-right-top-red.svg'
import SolutionImg from '../assets/solution-1.png'
import NetEmail from '../assets/NetEmail.svg'
import NetRadio from '../assets/NetRadio.svg'
import NetFolder from '../assets/NetFolder.svg'

import NetCal from '../assets/NetCal.svg'
import RedBar from '../assets/RedBar.svg'
import HomeHero from '../assets/HomeHero.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetDeepDivesQuery } from '../slices/deepDiveApiSlice';
import Loader from './Loader';
import HomeMonthlyAi from './HomeMonthlyAi';
import { useGetAllSolutionQuery } from '../slices/solutionApiSlice';
import HomeSolution from './HomeSolution';
import { useEditUserMutation } from '../slices/userApiSlice';
import { setPersonalNotifications } from '../slices/userInfoSlice';

const Home = () => {
  const [searchParams] = useSearchParams();
  // console.log("Params",searchParams.get("setpass"))

  const navigate = useNavigate();
  const user = useSelector(state => state.auth);
  // console.log("User:", user)


  useEffect(() => {
    

    /*
    if(searchParams.get("setpass")){
      navigate('/setpassword')
      return;
    }

    if(!searchParams.get("setpass") && !user.userInfo){
      toast.info("Please login to see the page!")
      //navigate('/login')
      return;
    }
    if(user && ( user.userInfo.role == 'superAdmin' || user.userInfo.role == 'admin') ){
      navigate('/admin/dashboard')
    }

    */

  },[])

  const {data, isLoading }= useGetDeepDivesQuery();
  const {data:solData, isLoading:solLoading, isError, error }= useGetAllSolutionQuery();
  
  if(isLoading || solLoading){
    return <Loader />
  }

  if(isError){
    console.log("Error", error)
    return 'Something went wrong!'
  }

  
  // console.log("data", data)
  // console.log("sol data", solData)
  let activeDeepDives = data.deepdives.filter(deepdive => deepdive.active);
  // console.log("activeDeepDives",activeDeepDives)

  let deepDivesTypes = activeDeepDives.filter(item => item.type == 'deepdive');
  let latestDeepDive = deepDivesTypes[0]
  // console.log("deepDivesTypes", deepDivesTypes)
  let aiSaasTypes = activeDeepDives.filter(item => item.type == 'aisaas');
  let latestAiSaas = aiSaasTypes[0]
  let monthAiTypes = activeDeepDives.filter(item => item.type == 'monthai');
  // console.log("monthAiTypes", monthAiTypes);
  let monthAiVideos = monthAiTypes.filter(post => post.postType == 'video')
  let monthAiBlogs = monthAiTypes.filter(post => post.postType == 'blog')
  // console.log("monthAiVideos", monthAiVideos)

  const solutions = solData.solutions;
  const [editUser ] = useEditUserMutation()

  const linkedInHandler = async () => {
    console.log("Adding linkedin notification")
    
    const data = {
      personalNotifications: {
        message:"Linkedin Click",
        notificationType:"linkedinDone"
      }
    }

    const apiRes = await editUser(data).unwrap();


  }

  return (
    <>

      {/* <div className="linkedIn flex gap-11 px-24 py-[22px] bg-[#282828] items-center">
        <img src={LinkedInImage} alt="" />
        <div className="">
          <h1 className='text-white text-4xl font-semibold mb-4' >Join our LinkedIn community</h1>
          <p className="">We’re excited to have you here. Explore the Dashboard to stay updated with announcements, special events, and virtual meeting sign-ups. Head</p>
          <Link className="font-semibold bg-primary-blue px-6 py-3 rounded-[100px] mt-4 inline-block" to="#" >Join Community</Link>

        </div>
      </div> */}

      <div className="home_hero px-12 py-20 rounded-2xl" style={{ backgroundImage: `url(${HomeHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero_text max-w-[516px]">
          <h1 className="font-semibold text-4xl mb-4">Be Part of the Conversation</h1>
          <p className="mb-7">Stay ahead of the curve by joining our community, where you’ll find invaluable resources, expert-led webinars, and live events that keep you connected and informed.</p>
          <button onClick={linkedInHandler} className='bg-primary-blue h-11 flex items-center px-6 rounded-[100px] font-semibold'>Join our Community</button>
        </div> 
      </div>

      {/* <div className="tag flex gap-4 items-center mt-11 mb-9">
        <img src={BlueDot} alt="" />
        <p className="text-lg font-semibold">THIS MONTH’S TOPIC: LIFE SCIENCE</p>
      </div> */}

      <div className="deepdive mt-16">
        
        <div className="flex items-start gap-4">
          <p className="text-4xl font-semibold">This Month’s Deep Dive</p>
          <p className="text-xl font-semibold mt-2">(Artificial Intelligence)</p>
        </div>
        
        <div className="deep_row flex mt-8 gap-6">
          
          <div className="w-full">
            <img className='rounded-2xl w-full' src={latestDeepDive.image} alt="" />
            <div className="flex gap-4 mt-6 items-start">
              <img className='mt-2' src={RedBar} alt="" />
              <div className="t">
                <p className="text-3xl mb-3 ">{latestDeepDive.title}</p>
                <p className="text-lg mb-6">{latestDeepDive.description}</p>

                <a className='font-semibold underline' href={latestDeepDive.link}>Learn more</a>
              </div>
            </div>
          </div>

          <div className="w-full">
            <img className='rounded-2xl w-full ' src={latestAiSaas.image} alt="" />
            <div className="flex gap-4 mt-6">
              <img className='' src={RedBar} alt="" />
              <div className="t">
                <p className="text-3xl mb-3 ">{latestAiSaas.title}</p>
                <p className="text-lg mb-6">{latestAiSaas.description}</p>

                <a className='font-semibold underline' href={latestAiSaas.link} >Learn more</a>
              </div>
            </div>
          </div>


        </div>

      </div>

      <div className="home_network bg-[#1E1E1E] rounded-2xl py-16 px-4 mt-16" >
          <div className="max-w-[638px] w-full mx-auto">
            <div className="flex gap-4 justify-center mb-8">
              <img src={NetEmail} className='w-10 h-10' alt="" />
              <img src={NetFolder} className='w-10 h-10' alt="" />
              <img src={NetRadio} className='w-10 h-10' alt="" />
              <img src={NetCal} className='w-10 h-10' alt="" />
            </div>
            <p className="text-[40px] font-semibold text-center">Your Network for Success</p>
            <p className="text-lg font-medium text-center text-[#F2F2F2]">Unlock exclusive benefits, personalized insights, and a community that’s ready to help you succeed. Join us today and start your journey to becoming a key player in our field.</p>
            <button className='mx-auto bg-primary-blue rounded-[100px] mt-8 px-6 h-12 flex items-center font-semibold'>Grow with Us</button>
          </div>
      </div>

      <div className="month_ai mt-16">
        <HomeMonthlyAi video={monthAiVideos[0]} blog={monthAiBlogs[0]} />
        <HomeMonthlyAi video={monthAiVideos[1]} blog={monthAiBlogs[1]} />
        <HomeMonthlyAi video={monthAiVideos[2]} blog={monthAiBlogs[2]} />


      </div>

      <div className="home_network bg-[#1E1E1E] rounded-2xl py-16 px-4 mt-16" >
          <div className="max-w-[762px] w-full mx-auto">
            <p className="text-4xl font-semibold text-center mb-6">Connect with Like-minded Professionals</p>
            <p className="text-lg font-medium text-center text-[#F2F2F2]">Our community is more than just a group of people; it’s a thriving ecosystem of innovation, support, and growth. Join us to be part of the conversation and make your mark</p>
            <button className='mx-auto bg-primary-blue rounded-[100px] mt-8 px-6 h-12 flex items-center font-semibold'>Become a Member</button>
          </div>
      </div>




      <div className="main_content mt-16 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className='text-5xl font-semibold'>Solutions For You</h1>
          <Link className='flex gap-1 items-center' to="/solutions/">Explore All <img src={ArrowRightUp} alt="" /></Link>
        </div>

        <div className="solutions_area_wrap flex gap-6 justify-between">

          {solutions.map(solution => <HomeSolution key={solution._id} solution={solution} />)}

        </div>

        {/* <div className="resources_area mt-8">
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
        </div> */}

      </div>
    </>
  )
}

export default Home