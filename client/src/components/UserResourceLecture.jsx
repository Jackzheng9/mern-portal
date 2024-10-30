import React from 'react'
import UserResourceLectureFile from './UserResourceLectureFile'

const UserResourceLecture = ({lecture,year}) => {
  // console.log("Lecture", lecture)
  return (
    <>
      <div className="title_part flex items-center gap-8">
        <div className="max-w-[300px]"><img src={lecture.image} alt="" /></div>
        <div className="">
          <h2 className="font-medium text-2xl mb-4">{lecture.title}</h2>
          <p className="">{lecture.desc}</p>
        </div>
      </div>

      <div className="files_part mt-10">
        <ul className="files">
          {lecture.files.map(file => <UserResourceLectureFile key={file._id} file={file} year={year} />)}
        </ul>
      </div>
    </>
  )
}

export default UserResourceLecture