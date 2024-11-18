import React, { useState } from 'react'
import VerDots from '../../../assets/ver-dots.svg'
import AngelDownBlue from '../../../assets/AngelDownBlue.svg'
import Pencil from '../../../assets/pencil-white.svg'
import Delete from '../../../assets/DeleteWhite.svg'
import X from '../../../assets/Close-dimmed.svg'
import OutsideClickHandler from "react-outside-click-handler";
import { useEditSupportMutation, useDeleteSupportMutation } from '../../../slices/supportApiSlice'
import { toast } from 'react-toastify'
import Loader from '../../Loader'
import Editor from 'react-simple-wysiwyg';




export const SupportListItem = ({faq}) => {
  // console.log("faq", faq)

  const [showAnswer, setShowAnswer] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [checkBoxChecked, setCheckBoxChecked] = useState(faq.active);

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value)
  }

  const checkClick = (e) =>{
    setCheckBoxChecked(!checkBoxChecked)
  }

  const optionsToggleHandler = () => {
    setShowOptions(!showOptions)
  }

  const outSideClickHandler = (e) => {
    // console.log("e",e)
    if (e.target.classList.contains("dive_options")) {
    } else {
      setShowOptions(false);
    }
  };

  const [editSupport, {isLoading, isError}] = useEditSupportMutation();
  const [deleteSupport ,{isLoading:deleteLoading}]= useDeleteSupportMutation()

  if(isLoading || deleteLoading ){
    return <Loader />
  }
  if(isError){
    return 'Something went wrong'
  }


  const editHandler = async (e) => {
    e.preventDefault();
    const data = {
      question,
      answer,
      id:faq._id,
      active: checkBoxChecked

    }

    try {
      const apiRes = await editSupport(data).unwrap();
      console.log("apiRes", apiRes)
      toast.success('FAQ edit is successful!');
      setShowEdit(false)
    } catch (error) {
      toast.error("Something went wrong!")      
    }
  }
  const deleteHandler = (id) => {
    
  }

  const deleteShowHandler = async (id) => {
    const data = {
      id
    }
    
    try {
      const apiRes = await deleteSupport(data).unwrap();
      toast.success("Deleted successfully!")
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }




  return (
    <div className=''>

      <div className="faqs_header flex justify-between text-[#B0B0B0] mt-8">
        
        <div className="content w-full pr-4">
          
          <div onClick={() => setShowAnswer(!showAnswer)} className="question flex justify-between items-center cursor-pointer mb-4">
            <p className="text-white font-medium">{question}</p>
            <img src={AngelDownBlue}  className="w-4" alt="" />
          </div>

          {showAnswer && (
            <div className="answer">
              {answer}
            </div>
          )}
          

        </div>

        <div className="actions flex gap-4 relative">
              {faq.active && (<div className="button">
                <p className='text-[#027A48] border border-[#027A48] rounded-[100px] h-6 flex items-center px-4'>Active</p>
              </div>) }
              
              {!faq.active && <div className="button">
                <p className='text-[#F79009] border border-[#F79009] rounded-[100px] h-6 flex items-center px-4'>Inactive</p>
              </div> }

          <OutsideClickHandler onOutsideClick={outSideClickHandler}>
            <img onClick={optionsToggleHandler} src={VerDots} className='cursor-pointer' alt="" />
            
            {showOptions && (

            <div className="min-w-[163px] dive_options absolute p-4 rounded-md right-7 top-2 z-10 flex flex-col gap-4 bg-black">

              <div onClick={() => setShowEdit(true)} className="option_modal flex gap-2 cursor-pointe text-[#B0B0B0] hover:text-white cursor-pointer flex gap-2">
                <img src={Pencil} className='' alt="" /> Edit
              </div>
              <div onClick={() => deleteShowHandler(faq._id)}  className="option_modal flex gap-2 cursor-pointer text-[#B0B0B0] hover:text-white flex gap-2" >
              <img src={Delete} className='' alt="" /> Delete
              </div>

            </div>
            )}

          </OutsideClickHandler>



        </div>
      </div>

      {showEdit && (

        <div className="createFaq absolute w-full h-full min-h-[80vh] left-0 top-0 backdrop-blur flex justify-center ">
          <div className="create_support_content p-11 bg-black max-w-[80%] mx-auto">
            
            <div className="flex justify-between">
              <div className='max-w-[60%]'>
                <h1 className='font-medium text-lg'>Edit FAQ</h1>
                {/* <p className="text-[#B0B0B0]">Create a new Frequently Asked Question entry. Provide a clear and concise question and answer to help users find information quickly.</p> */}
              </div>
              <img onClick={() => setShowEdit(false)} src={X} className='cursor-pointer' alt="" />
            </div>

            <div className="form_section mt-8">
              <form onSubmit={editHandler}>

                <div className="input_group">
                  <label className='text-lg font-semibold block mb-1.5'  htmlFor="ques">Question</label>
                  <input value={question} onChange={(e) => setQuestion(e.target.value)} className='bg-transparent rounded-lg h-11 px-3 flex items-center border border-[#3D3D3D] w-full ' type="text" id="ques" placeholder='Question goes here...' />
                </div>

                <div className="input_group">
                  <label className='text-lg font-semibold block mb-1.5' htmlFor="que">Answer</label>
                  {/* <input className='bg-transparent rounded-lg h-11 px-3 flex items-center border border-[#3D3D3D] w-full ' type="text" id="ques" placeholder='Question goes here...' /> */}
                  <Editor value={answer} onChange={onChangeAnswer} />
                </div>

                <div className="publish_action mb-12 flex gap-2 items-center font-medium mt-5">
                  <label className="switch" htmlFor='switch'>
                    <input onChange={checkClick} type="checkbox" id="switch" checked={checkBoxChecked} />
                    <span className="slider round"></span>
                  </label>
                  {checkBoxChecked && <p className="t">Active</p> }
                  {!checkBoxChecked && <p className="t">Inactive</p> }
                  
                </div>

                <div className="flex justify-end gap-4">
                  <div onClick={() => setShowEdit(false)} className="flex h-11 items-center rounded-[100px] border px-6 cursor-pointer">Cancel</div>
                  <button className='flex h-11 items-center rounded-[100px] bg-primary-blue px-6'>Publish</button>
                </div>

              </form>
            </div>
          </div>
        </div>

        )}

        {showDelete && (
        <div className="createFaq absolute w-full h-full min-h-[80vh] left-0 top-0 backdrop-blur flex justify-center ">
        <div className="create_support_content p-11 bg-black max-w-[80%] mx-auto">
          
          <div className="flex justify-between">
            <div className='max-w-[60%]'>
              <h1 className='font-medium text-lg'>Edit FAQ</h1>
              {/* <p className="text-[#B0B0B0]">Create a new Frequently Asked Question entry. Provide a clear and concise question and answer to help users find information quickly.</p> */}
            </div>
            <img onClick={() => setShowEdit(false)} src={X} className='cursor-pointer' alt="" />
          </div>

        </div>
      </div>

        )}


      
    </div>
  )
}
