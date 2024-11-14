import React, { useState } from 'react'
import CarouselComponent from './Carousel'
import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDownWhite from '../../assets/ArrowDownWhite.svg'
import MonthlyDeepDive from './home/MonthlyDeepDive'
import CreateMonthlyDeepDive from './home/CreateMonthlyDeepDive'
import RedX from "../../assets/RedX.svg";
import Close from "../../assets/Close-dimmed.svg";
import { useDeleteDeepDiveMutation,useEditDeepDiveMutation } from '../../slices/deepDiveApiSlice'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { EditItemProvider } from '../../context/editItemContext'
import Pencil from '../../assets/PencilBlue.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import uploadImage from '../../utils/imageUpload'


const HomeContent = () => {

  const[showCreateDeepDive, setShowCreateDeepDive] = useState(false);
  const[showSelector, setShowSelector] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [monthlyId, setMonthlyId] = useState(false)
  const [deepDiveItem, setDeepDiveItem] = useState({})
  const [showEdit, setShowEdit] = useState(false);
  

  const[title, setTitle] = useState('')
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');
  const [imageName,setImageName] = useState('');
  const [link,setLink] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [checkBoxChecked, setCheckBoxChecked] = useState(true)


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



  const editItemHandler = (type,item) => {
    console.log("Edit post! " + " " +  type + " " + item)
    // console.log("item", item)
    setDeepDiveItem(item)
    setTitle(item.title)
    setDescription(item.description)
    setImage(item.image)
    setLink(item.link)


    setShowEdit(true)
  }
  const imageChangeHandler = async (e) => {
    // console.log("Process image");
    setShowLoader(true)
    const file = e.target.files[0];
    // console.log("file", file)
    const uploaded = await uploadImage(file);
    console.log("Uploaded", uploaded)
    setImage(uploaded.url);
    setShowImageUpload(false)
    setShowLoader(false)
    // setImageName(file.name)
  }

  const checkClick = (e) =>{
    setCheckBoxChecked(!checkBoxChecked)
  }

  const [ editDeepDive ,{isLoading : editLoading, isError:editIsError, error:editError} ] = useEditDeepDiveMutation()

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Edit item:",title, image, description, link, checkBoxChecked )
    const data = {
      title, image, description, link, active:checkBoxChecked,id:deepDiveItem._id
    }

    
    try {
      const editedItem = await editDeepDive(data).unwrap();
      console.log("editedItem", editedItem)
      toast.success("Edit done successfully!")
    } catch (error) {
      console.log(error)
    }finally{
      setShowEdit(false)
    }
  }


  return (
    <EditItemProvider editItemHandler={editItemHandler}>
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

        {showEdit && (

          <form onSubmit={editSubmitHandler}>
          
            <div className="edit_deepDive_container fixed left-0 top-0 w-[100%] h-[100vh] backdrop-blur-sm flex items-center justify-center">
              <div className="max-w-[720px] w-full h-full mx-auto top-[0] bg-[#111116] p-6 left-[30%] rounded-md overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div className="">
                    <p className="text-2xl font-semibold mb-1">Monthly Deep  Dive</p>
                    <p className="text-[#B0B0B0] mb-8">Edit the details For the monthly deep  dive</p>
                  </div>
                  <div className="">
                    <img onClick={() => {setShowEdit(false);setShowImageUpload(false)}} className='cursor-pointer' src={Close} alt="" />
                  </div>
                </div>
                
                {!showImageUpload && (
                  <>
                    <img className='w-full' src={image} alt="" />
                  
                    <div className="editimagebtn inline-flex gap-2 items-center py-2.5 border-b border-primary-blue px-5 mt-8 cursor-pointer">
                      <img src={Pencil} alt="" />
                      <p onClick={() => setShowImageUpload(true)} className="text-primary-blue font-semibold">Change Image</p>
                    </div>
                  </>

                )}
                

                {showImageUpload && (
                  <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-7">
                    <label htmlFor="solImg" className='cursor-pointer'>
                      <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
                      <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
                    </label>
                    <input onChange={imageChangeHandler} id="solImg" className='hidden' type="file" />
                    <div className="flex items-center gap-2">
                      <p onClick={() => setShowImageUpload(false)} className="border border-white h-11 px-5 flex items-center font-semibold cursor-pointer rounded-[100px]">Cancel</p>
                      {/* <img src={image} alt="" className='w-10' /> */}
                    </div>
                    
                  </div>
                )}
                
                <div className="inputGroup flex flex-col gap-1.5 mb-7">
                  <label htmlFor="">Title</label>
                  <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={title} onChange={(e) => setTitle(e.target.value)}  placeholder='Title goes here...' required />
                </div>
                

                <div className="inputGroup flex flex-col gap-1.5 mb-5">
                  <label htmlFor="">Description</label>
                  <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description.....'  />
                </div>

                <div className="inputGroup flex flex-col gap-1.5 mb-7">
                  <label htmlFor="">Link to the post:</label>
                  <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={link} onChange={(e) => setLink(e.target.value)}  placeholder='https://somelink.com/' required />
                </div>

                <div className="publish_action mb-12 flex gap-2 items-center font-medium">
                  <label className="switch" htmlFor='switch'>
                    <input onChange={checkClick} type="checkbox" id="switch" checked={checkBoxChecked} />
                    <span className="slider round"></span>
                  </label>
                  {checkBoxChecked && <p className="t">Active</p> }
                  {!checkBoxChecked && <p className="t">Inactive</p> }
                  
                </div>

                <div className="flex justify-between">
                  <div className="">
                    <div onClick={() => {setShowEdit(false);setShowImageUpload(false)}} className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Cancel</div>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="bg-primary-blue rounded-[100px] h-11 flex items-center justify-center px-5 cursor-pointer">Update</button>
                  </div>
                </div>


              </div>
            </div>

          </form>

        )}

        



            
        
      </div>
    </EditItemProvider>
    
  )
}

export default HomeContent