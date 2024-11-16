import React, { useState } from 'react'
import {useEditTermsMutation } from '../../../slices/termsApiSlice';

const TermsEdit = ({content}) => {
  const [termsContent, setTermsContent] = useState(content)


  const [editTerms, {isLoading, isError}] = useEditTermsMutation()

  const editHandler = async (e) => {
    e.preventDefault();
    const data = {
      content: termsContent
    }
    console.log("Content", termsContent);
    const editRes = await editTerms(data).unwrap();
    console.log("editRes", editRes)
  }





  return (
    <>
      <form onSubmit={editHandler} className='mt-8'>
        <textarea className='bg-transparent bg-[#1B1B1F] p-8 w-full border-none outline-none ' name="" value={termsContent} onChange={e => setTermsContent(e.target.value)} id=""></textarea>

        <div className="buttons_wrap flex justify-between mt-8">
          <button className='rounded-[100px] h-11 flex items-center px-8 border border-white'>Cancel</button>

          <div className="flex gap-4">
            <button className='rounded-[100px] h-11 flex items-center px-8 border border-white'>View</button>
            <button type="submit" className='rounded-[100px] h-11 flex items-center px-8 bg-primary-blue'>Upload</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default TermsEdit