import React from 'react'
import { useGetSupportQuery } from '../../slices/supportApiSlice'
import Loader from '../Loader'
import FaqItem from './FaqItem'
import SupportCta from '../SupportCTA'

const Faqs = () => {

  const {data, isLoading, isError} = useGetSupportQuery()
  if(isLoading){
    return <Loader />
  }
  if(isError){
    return 'Something went wrong!'
  }

  const supports = data.supports;
  //  console.log(supports)
  const activeSupports = supports.filter(support => support.active);
  //console.log("activeSupports", activeSupports)


  return (
    <div className='mt-8 mb-12'>
      <div className="page_title flex justify-between">
        <div>
          <h1 className="font-semibold text-lg">FAQ’s</h1>
          <p className="text-[#667085]">Our FAQ section provides answers to common questions about our products and services. Find detailed information and helpful insights to assist with your inquiries</p>
        </div>        
      </div>

      <div className="faqs my-11">
        {activeSupports.map((support,index) => <FaqItem faq={support} key={index} />)}
      </div>
      <SupportCta />
      
    </div>
  )
}

export default Faqs