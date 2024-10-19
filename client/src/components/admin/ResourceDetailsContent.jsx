import React from 'react'

const ResourceDetailsContent = ({resource}) => {
  return (
    <>
      <div className="flex gap-6">
        <div className="">
          <img src={resource.image} alt="" />
        </div>
        <div className="">
          <p className="tag">{resource.tag}</p>
        </div>
      </div>
    
    </>
  )
}

export default ResourceDetailsContent