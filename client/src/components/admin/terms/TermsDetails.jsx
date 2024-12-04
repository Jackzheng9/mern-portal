import React from 'react'

const TermsDetails = ({content}) => {
  // console.log("Content", content)
  return (
    <div className='terms_detail text-[#B0B0B0]' dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default TermsDetails