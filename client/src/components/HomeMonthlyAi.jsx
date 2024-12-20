import React from 'react'
import YouTubPlay from '../assets/YouTubePlay.svg'
import GrayBar from '../assets/GrayBar.svg'
import YellowBar from '../assets/YellowBar.svg'




const HomeMonthlyAi = ({video, blog,videoPlayer}) => {
  // console.log("video", video);
  const showVideo = (videoId) => {
    videoPlayer(videoId)
  }

  return (
    <div className="row flex-col md:flex-row  flex gap-8">

    <div className="basis-0 grow-[2]">
      <div className='cursor-pointer' onClick={() => showVideo(video.videoId)}>
        <img src={video.image} className='rounded-2xl w-full h-[272px]' alt="" />
        <div className="flex gap-5 mt-4">
          <img src={GrayBar} className='' alt="" />
          <div className='pr-2'>
            <p className="text-2xl font-semibold mb-3">
              {video.title.split(' ').slice(0, 7).join(' ') + (video.title.split(' ').length > 7 ? '...' : '')}


            </p>
            <p className=" mb-3">{video.description}</p>
          </div>
        </div>
      </div>

      
      
    </div>

    <div className="basis-0 grow-[1]">
      <a href={blog.link}>
        <img src={blog.image} className='rounded-2xl w-full h-[272px]' alt="" />
        <div className="flex gap-5 mt-4">
          <img src={YellowBar} className='' alt="" />
          <div className='pr-2'>
            <p className="text-2xl font-semibold mb-3">
              {blog.title.split(' ').slice(0, 4).join(' ') + (video.title.split(' ').length > 4 ? '...' : '')}
            </p>
            <p className=" mb-3">{blog.description}</p>
          </div>
        </div>
      </a>

    </div>


  </div>
  )
}

export default HomeMonthlyAi