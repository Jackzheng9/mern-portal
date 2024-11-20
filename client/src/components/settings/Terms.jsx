import React from 'react'
import { useGetTermsQuery } from '../../slices/termsApiSlice'
import Loader from '../Loader';

const Terms = () => {


  const {data, isLoading, isError } = useGetTermsQuery();
  if(isLoading){
    return <Loader />
  }
  if(isError){
    return 'Something went wrong!'
  }

  console.log("data", data)
  const content = data.terms[0].content




  return (
    
    <div className='mt-8'>
      <div className="page_title flex justify-between">
        <div>
          <h1 className="font-semibold text-lg">Privacy Policy</h1>
          <p className="text-[#667085]">Your privacy is important to us at Untitled. We respect your privacy regarding any information we may collect from you across our website.</p>
        </div>        
      </div>

      <div className="terms_content my-11 text-sm" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>

  )
}

export default Terms