import React, { useState } from 'react'
import UserResourceLectureFile from './UserResourceLectureFile'
import ArrowDown from '../assets/ArrowDown.svg'
import { shallowEqual } from 'react-redux'

const UserResourceLecture = ({lecture,year, resource, lessonCompleteHandler}) => {
  // console.log("Lecture", lecture)
  const lectTotalFiles = lecture.files.length;
  // console.log("lectTotalFiles",lectTotalFiles)
  const [showFiles, setShowFiles] = useState(false)
  return (
    <div className='mb-6'>
      <div className="title_part flex items-center gap-8">

        {/* <div className="max-w-[300px]"><img src={lecture.image} alt="" /></div> */}
        <div className="w-[300px] h-[180px] rounded-lg " style={{ backgroundImage: `url(${lecture.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} ></div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-2xl mb-4">{lecture.title}</h2>
            <img onClick={() => setShowFiles(!showFiles)} src={ArrowDown} className='cursor-pointer w-6' alt="" />
          </div>
          
          <p className="">{lecture.desc}</p>
        </div>



      </div>

      {showFiles && (
        <div className="files_part mt-10">
          <ul className="files">
            {lecture.files.map((file,index) => <UserResourceLectureFile lessonCompleteHandler={lessonCompleteHandler} key={file._id} file={file} year={year} resource ={resource} title={lecture.title} index={index} totalFiles={lectTotalFiles} />)}
          </ul>
        </div>

      )}
      

    </div>
  )
}

export default UserResourceLecture