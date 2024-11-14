import React, { useState } from 'react'
import CarouselComponent from './Carousel'
import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDownWhite from '../../assets/ArrowDownWhite.svg'
import MonthlyDeepDive from './home/MonthlyDeepDive'
import CreateMonthlyDeepDive from './home/CreateMonthlyDeepDive'
import RedX from "../../assets/RedX.svg";
import Close from "../../assets/Close-dimmed.svg";
import { useDeleteDeepDiveMutation } from '../../slices/deepDiveApiSlice'
import Loader from '../Loader'
import { toast } from 'react-toastify'


const HomeContent = () => {

  const[showCreateDeepDive, setShowCreateDeepDive] = useState(false);
  const[showSelector, setShowSelector] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [monthlyId, setMonthlyId] = useState(false)

  const uploadSelectHandler = (selector) =>{
    // console.log("selector",selector)
    setShowSelector(false)
    if(selector == 'deepdive'){
      setShowCreateDeepDive(true)
    }
  }

  const deepDivePanelCloseHandler = () => {
    setShowCreateDeepDive(false)
  }

  const [deleteDeepDive,{isLoading, isError, error}] = useDeleteDeepDiveMutation()

  const deleteContentHandler = async (type, id) => {
    console.log("delete " + type + '-'+ id);
    setShowDelete(true)
    if(type=='monthly'){
      setMonthlyId(id)
    }
    
  }

  const deleteItemHandler = async (id) => {
    console.log(id)
    const data = {
      id:monthlyId
    }
    setShowLoader(true);
    setShowDelete(false)


    try {
      const deleteItem = await deleteDeepDive(data).unwrap();
      console.log(deleteItem);
      toast.success("Deleted successfully!")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }finally{
      setShowLoader(false);
    }
 
    
    
  }



  const editItemHandler = () =>{
    console.log("Edit post!")
    // toast.success("hola")
  }



  return (
    <div className='home_content_wrap relative bg-[#5D5D5D33]/20'>
      <div className='flex justify-between items-center'>
        <p className='font-medium text-2xl'>Home Content</p>
        <div className="relative">
          <div onClick={() => setShowSelector( !showSelector) }  className="bg-primary-blue rounded-[100px] flex items-center pl-9 pr-11 h-11 gap-2 cursor-pointer">
            <img src={ArrowUp} alt="" />
            <p className="">Upload Content</p>
            <img src={ArrowDownWhite} alt="" />
          </div>
          {showLoader && <Loader />}
          {showSelector && (
            <ul className="upload_select absolute top-[100%] left-0 bg-[#111116] border border-[#222227] rounded outline-none py-8 px-6 z-10">
              <li onClick={() => uploadSelectHandler('deepdive')} className='cursor-pointer text-[#B0B0B0] hover:text-white font-medium' >Monthly Deep Dive</li>
              <li onClick={() => uploadSelectHandler('aisaas')} className='cursor-pointer text-[#B0B0B0] hover:text-white font-medium' >AI Saas tool</li>
              <li onClick={() => uploadSelectHandler('monthai')} className='cursor-pointer text-[#B0B0B0] hover:text-white font-medium' >This month in AI</li>
            </ul>

          )}
          
        </div>   
      </div>

      <MonthlyDeepDive deleteHandler={deleteContentHandler} />
      {showCreateDeepDive && <CreateMonthlyDeepDive closeHandler={deepDivePanelCloseHandler} /> }
      
      {showDelete && (

        <div className="deletePan fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-sm flex items-center justify-center">

          <div className="max-w-[358px] w-full  mx-auto top-[30%] bg-[#111116] p-6 left-[30%] rounded-md backdrop-blur-sm">
              <div className="flex justify-between mb-4">
                <img src={RedX} alt="" />
                <img onClick={() => setShowDelete(false)} className='cursor-pointer' src={Close} alt="" />
              </div>
              <h2 className="text-white text-lg font-semibold mb-1">Delete Content</h2>
              <p className="text-[#B0B0B0] mb-8">Are you sure you want to delete the uploaded? This action cannot be undone.</p>

              <div className="flex justify-between ">
                <button onClick={() => setShowDelete(false)} className='h-11 flex items-center px-11 border border-white rounded-[100px]'>Cancel</button>

                <button onClick={deleteItemHandler} className='h-11 flex items-center px-11 border border-[#F04438] bg-[#F04438] rounded-[100px]'>Delete</button>
              </div>
          </div>

        </div>

      )}





           
      
    </div>
    
  )
}

export default HomeContent