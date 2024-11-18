import React from 'react'

const TermsDetails = ({content}) => {
  // console.log("Content", content)
  return (
    <div className='terms_detail' dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default TermsDetails