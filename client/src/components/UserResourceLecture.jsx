import React, { useState } from 'react'
import UserResourceLectureFile from './UserResourceLectureFile'
import ArrowDown from '../assets/ArrowDown.svg'
import { shallowEqual } from 'react-redux'

const UserResourceLecture = ({lecture,year, resource}) => {
  // console.log("Lecture", lecture)
  const [showFiles, setShowFiles] = useState(false)
  return (
    <>
      <div className="title_part flex items-center gap-8">

        <div className="max-w-[300px]"><img src={lecture.image} alt="" /></div>
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
            {lecture.files.map(file => <UserResourceLectureFile key={file._id} file={file} year={year} resource ={resource} />)}
          </ul>
        </div>

      )}
      

    </>
  )
}

export default UserResourceLecture