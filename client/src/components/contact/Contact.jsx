import React, { useEffect } from 'react'
import SingleQuestion from './SingleQuestion'
import { useGetSupportQuery } from '../../slices/supportApiSlice'
import Loader from '../Loader'

const Contact = () => {

  const {data, isLoading, isError} = useGetSupportQuery();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if(isLoading){
    return <Loader />
  }

  // console.log("data", data);
  const faqs = data.supports;



  return (
    <div className='py-[100px]'>
      
      <div className="contact_head flex gap-16">
        <div className="">
          <h1 className='font-semibold text-[88px] leading-[100px] max-w-[616px] uppercase -tracking-[2px]'>Let’s Build something amazing!</h1>
          <div className="contact_desc px-6 py-8 backdrop-blur relative -top-10 max-w-[616px]">
            <p className="t">We're just one click away to help you take your brand or product from great to incredible. <br /><br />
            Fill in the form to share more details about your project.</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {/* <div className="p-6 bg-white w-full h-auto">
            
          </div> */}
          <div  data-url="https://calendly.com/henryhaysceo/riley-calndly?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=f4f4f4" className="calendly-widget calendly-inline-widget h-[600px] w-[320px]"></div>
          

        </div>
      </div>

      <div className="faq_section mt-[100px] ">
        <h2 className='font-semibold text-[88px] leading-[100px] uppercase -tracking-[2px]'>Frequently Asked Questions</h2>
        <div className="question_part relative -top-[40px] backdrop-blur">
          {faqs.map(faq => <SingleQuestion key={faq._id} faq={faq} />)}
          
          
        </div>
      </div>

    </div>
  )
}

export default Contact