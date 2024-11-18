import React, { useState } from 'react'
import {useEditTermsMutation } from '../../../slices/termsApiSlice';
import {toast} from 'react-toastify'
import X from '../../../assets/X.svg'

import Editor from 'react-simple-wysiwyg';

const TermsEdit = ({content, setShowEdit}) => {

  const [html, setHtml] = useState(content);
  const [showPreview, setShowPreview] = useState(false);


  const [editTerms, {isLoading, isError}] = useEditTermsMutation()

  const editHandler = async (e) => {
    e.preventDefault();
    const data = {
      content: html
    }
    
    try {
      const editRes = await editTerms(data).unwrap();
      toast.success('Edited successfully!')
    } catch (error) {
      toast.error('Something went wrong!')
      console.log("edit error : ", error)
    }finally{
      setShowEdit(false)
    }

    
    // console.log("editRes", editRes)
  }

  function onChange(e) {
    setHtml(e.target.value);
    console.log("html", html)
  }



  return (
    <div className='relative'>
      
      <form onSubmit={editHandler} className='mt-8'>


        <Editor value={html} onChange={onChange} />

        <div className="buttons_wrap flex justify-between mt-8">
          <button onClick={() => setShowEdit(fasle)} className='rounded-[100px] h-11 flex items-center px-8 border border-white'>Cancel</button>

          <div className="flex gap-4">
            <div onClick={() => setShowPreview(true)} className='cursor-pointer rounded-[100px] h-11 flex items-center px-8 border border-white'>View</div>
            <button type="submit" className='rounded-[100px] h-11 flex items-center px-8 bg-primary-blue'>Update</button>
          </div>
        </div>
      </form>

      {showPreview && (
        <div className="showPreview absolute top-0 w-full h-full backdrop-blur">
          <div className='terms_detail w-[80%] bg-black mx-auto top-[50px] p-11'>
            <div className="flex justify-between">
              <p className="font-medium text-lg text-white">Privacy Policy</p>
              <button onClick={() => setShowPreview(false)} className='h-11 flex items-center px-6'><img className='w-6' src={X} alt="" /></button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>

      )}
      
      
    </div>
  )
}

export default TermsEdit