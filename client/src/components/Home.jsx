import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route,useParams,useSearchParams,useNavigate  } from "react-router-dom";
import LinkedInImage from '../assets/LinkedInImage.svg'
import BlueDot from '../assets/BlueDot.svg'
import ArrowRightUp from '../assets/arrow-right-up.svg'
import CtaBgRight from '../assets/CtaBgRight.svg'
import CtaBgLeft from '../assets/CTABGLeft.svg'
import CheckWhiteCircled from '../assets/CheckWhiteCircled.svg'
import DollarWhiteCircled from '../assets/DollarWhiteCircled.svg'
import UserHomeLowerCtaBg from '../assets/UserHomeLowerCtaBg.png'
import Close from '../assets/xwhite.svg'
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
import { useGetSolutionsQuery } from '../slices/solutionApiSlice';
import HomeSolution from './HomeSolution';
import { useEditUserMutation } from '../slices/userApiSlice';
import { setPersonalNotifications } from '../slices/userInfoSlice';
import YouTubeVideo from '../utils/YouTubeVideo'







const Home = () => {
  const [searchParams] = useSearchParams();
  // console.log("Params",searchParams.get("setpass"))
  // console.log("Params",searchParams.get("admin"))

  const navigate = useNavigate();
  const user = useSelector(state => state.auth);
  // console.log("User:", user)
  const [isErrorFound,setIsErrorFound] = useState(false)
  const [showVidPlayer,setShowVidPlayer] = useState(false)
  const [videoId,setVideoId] = useState('')

  const showVideoPlayer = (video_id) => {
    setVideoId(video_id)
    setShowVidPlayer(true)
  }

  useEffect(() => {
    
    if(isErrorFound){
      navigate('/login')
    }
    
    if(searchParams.get("setpass")){
      //navigate('/setpassword')
      return;
    }    
    

    if(!searchParams.get("setpass") && !user.userInfo){
      toast.info("Please login to see the page!")
      navigate('/login')
      return;
    }
    if(user && ( user.userInfo.role == 'superAdmin' || user.userInfo.role == 'admin') ){
      navigate('/admin/dashboard')
    }

    

  },[isErrorFound])


 
  const {data, isLoading,isError:deepDiveError }= useGetDeepDivesQuery();
  const {data:solData, isLoading:solLoading, isError, error }= useGetSolutionsQuery();
  const [editUser ] = useEditUserMutation()


  if(isLoading || solLoading){
    // console.log("Loading running from home.jsx")
    return <Loader />
  }

  if(isError || deepDiveError){
    console.log("Error", error)
    console.log("message", error.message)
    // toast.error("Login expired, please login back.")
    // return "Something went wrong!"
    setIsErrorFound(true)
  }

  
  console.log("data", data)
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


      <div className="home_hero px-12 py-20 rounded-2xl" style={{ backgroundImage: `url(${HomeHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero_text max-w-[516px]">
          <h1 className="font-semibold text-4xl mb-4">Be Part of the Conversation</h1>
          <p className="mb-7">Stay ahead of the curve by joining our community, where you’ll find invaluable resources, expert-led webinars, and live events that keep you connected and informed.</p>
          <button onClick={linkedInHandler} className='bg-primary-blue h-11 flex items-center px-6 rounded-[100px] font-semibold'>Join our Community</button>
        </div> 
      </div>



      <div className="deepdive mt-16">
        
        <div className="flex items-start gap-4">
          <p className="text-4xl leading-[52px] font-semibold">This Month’s Deep Dive</p>
          <p className="text-xl font-semibold mt-2">(Artificial Intelligence)</p>
        </div>
        
        <div className="deep_row flex mt-8 gap-6 pb-10">
          
          <div className="w-full">
            <img className='rounded-2xl w-full h-[400px]' src={latestDeepDive.image} alt="" />
            <div className="flex gap-4 mt-6 items-start">
              
              <div className="">
                <div className='flex items-center gap-3 mb-3'>
                  <img className='mt-2' src={RedBar} alt="" />
                  <p className="text-3xl  ">{latestDeepDive.title}</p>
                </div>
                
                <p className="text-lg mb-6">{latestDeepDive.description}</p>

                <a className='font-semibold underline' href={latestDeepDive.link}>Learn more</a>
              </div>
            </div>
          </div>

          <div className="w-full">
            <img className='rounded-2xl w-full h-[400px]' src={latestAiSaas.image} alt="" />
            <div className="flex gap-4 mt-6 ">
              
              <div className="">
              
                <div className='flex gap-3 items-center mb-3'>
                  <img className='' src={RedBar} alt="" />
                  <p className="text-3xl">{latestAiSaas.title}</p>
                  <p className="text-3xl font-semibold bg-primary-blue rounded-[100px] h-14 flex items-center px-6 ">{latestAiSaas.toolName}</p>
                </div>
                <p className="text-lg mb-6">{latestAiSaas.description}</p>

                <div className="best mt-6">
                  <div className="flex gap-2 items-center ">
                    <img src={CheckWhiteCircled} alt="" /> <p className='text-sm font-semibold'>Best for:</p>
                  </div>
                  <p className="leading-[26px] mt-2">{latestAiSaas.bestFor}</p>
                </div>

                <div className="best mt-4">
                  <div className="flex gap-2 items-center ">
                    <img src={DollarWhiteCircled} alt="" /> <p className='text-sm font-semibold'>Pricing:</p>
                  </div>
                  <p className="leading-[26px] mt-2">{latestAiSaas.pricing}</p>
                </div>

                <a className='font-semibold underline mt-6 block' href={latestAiSaas.link} >Learn more</a>
              </div>
            </div>
          </div>


        </div>

      </div>

      <div className="home_network bg-[#1E1E1E] rounded-2xl py-16 px-4 mt-16 relative overflow-hidden" >
          <div className="max-w-[638px] w-full mx-auto ">
            <div className="flex gap-4 justify-center mb-8">
              <img src={NetEmail} className='w-10 h-10' alt="" />
              <img src={NetFolder} className='w-10 h-10' alt="" />
              <img src={NetRadio} className='w-10 h-10' alt="" />
              <img src={NetCal} className='w-10 h-10' alt="" />
            </div>
            <p className="text-[40px] font-semibold text-center">Your Network for Success</p>
            <p className="text-lg font-medium text-center text-[#F2F2F2]">Unlock exclusive benefits, personalized insights, and a community that’s ready to help you succeed. Join us today and start your journey to becoming a key player in our field.</p>
            <button className='mx-auto bg-primary-blue rounded-[100px] mt-8 px-6 h-12 flex items-center font-semibold'>Grow with Us</button>
            <img src={CtaBgLeft} className='absolute w-[600px] -left-[100px] top-0' alt="" />
            <img src={CtaBgRight} className='absolute w-[600px] -right-[100px] bottom-0' alt="" />
          </div>
      </div>

      <div className="month_ai mt-16 ">
        <p className="font-semibold text-4xl mb-8 mt-2">This Month in AI - What Did You Miss? </p>
        <HomeMonthlyAi videoPlayer={showVideoPlayer} video={monthAiVideos[0]} blog={monthAiBlogs[0]} />
        <div className="h-9"></div>
        <HomeMonthlyAi videoPlayer={showVideoPlayer} video={monthAiVideos[1]} blog={monthAiBlogs[1]} />
        <div className="h-9"></div>
        <HomeMonthlyAi videoPlayer={showVideoPlayer} video={monthAiVideos[2]} blog={monthAiBlogs[2]} />


      </div>

      <div className="home_network bg-[#1E1E1E] rounded-2xl py-16 px-4 mt-16 relative" >
          <div className="max-w-[762px] w-full mx-auto">
            <p className="text-4xl font-semibold text-center mb-6">Connect with Like-minded Professionals</p>
            <p className="text-lg font-medium text-center text-[#F2F2F2]">Our community is more than just a group of people; it’s a thriving ecosystem of innovation, support, and growth. Join us to be part of the conversation and make your mark</p>
            <button className='mx-auto bg-primary-blue rounded-[100px] mt-8 px-6 h-12 flex items-center font-semibold'>Become a Member</button>
          </div>
          <img src={UserHomeLowerCtaBg} className='absolute bottom-0' alt="" />
      </div>




      <div className="main_content mt-16 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className='text-5xl font-semibold mb-8'>Solutions For You</h1>
          <Link className='flex gap-1 items-center' to="/solutions/">Explore All <img src={ArrowRightUp} alt="" /></Link>
        </div>

        <div className="solutions_area_wrap flex gap-6 justify-between">

          {solutions.map(solution => <HomeSolution key={solution._id} solution={solution} />)}

        </div>

      </div>

      {showVidPlayer && (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center backdrop-blur-md">
          <div className="yt_content relative">
            <img onClick={() => setShowVidPlayer(false)} src={Close} className='w-14 absolute -top-14 -right-6 cursor-pointer' alt="" />
            <YouTubeVideo video_id={videoId} />
          </div>
          
        </div>
      )}

      
    </>
  )
}

export default Home