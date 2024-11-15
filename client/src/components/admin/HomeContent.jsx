import React, { useState } from 'react'
import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDownWhite from '../../assets/ArrowDownWhite.svg'
import MonthlyDeepDive from './home/MonthlyDeepDive'
import CreateMonthlyDeepDive from './home/CreateMonthlyDeepDive'
import RedX from "../../assets/RedX.svg";
import Close from "../../assets/Close-dimmed.svg";
import Search from '../../assets/search.svg'
import CheckBox from '../../assets/Checkbox.svg'
import CheckBoxSelected from '../../assets/Checkbox-blue-selected.svg'
import { useDeleteDeepDiveMutation,useEditDeepDiveMutation } from '../../slices/deepDiveApiSlice'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { EditItemProvider } from '../../context/editItemContext'
import Pencil from '../../assets/PencilBlue.svg'
import AllIcon from '../../assets/all_icon.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import uploadImage from '../../utils/imageUpload'
import { useGetDeepDivesQuery } from '../../slices/deepDiveApiSlice'
import MonthAiList from './home/MonthAiList'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useDispatch,useSelector } from 'react-redux'
import { setStatus,setDate,setSearchTerm } from '../../slices/monthAiListSlice'
import dayjs from 'dayjs'




const HomeContent = () => {

  const[showCreateDeepDive, setShowCreateDeepDive] = useState(false);
  const[showSelector, setShowSelector] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [monthlyId, setMonthlyId] = useState(false)
  const [deepDiveItem, setDeepDiveItem] = useState({})
  const [showEdit, setShowEdit] = useState(false);
  const [createItemType, setCreateItemType] = useState('');
  const [editItemType, setEditItemType] = useState('');
  

  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [showCal, setShowCal] = useState(false)
  const [showStateSelector, setShowStateSelector] = useState(false)
  const [selectedDate, setSelectedDate] = useState('Select Date');


  const statusFilterTerm = useSelector(state => state.monthai.status)
  const searchFilterTerm = useSelector(state => state.monthai.searchTerm)
  const startDate = useSelector(state => state.monthai.dateRange.startDate)
  const endDate = useSelector(state => state.monthai.dateRange.endDate)
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);





  const[title, setTitle] = useState('')
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');
  const [imageName,setImageName] = useState('');
  const [postType,setPostType] = useState('');
  const [link,setLink] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [checkBoxChecked, setCheckBoxChecked] = useState()


  const uploadSelectHandler = (selector) =>{
    // console.log("selector",selector)
    setShowSelector(false)
    if(selector == 'deepdive'){
      setCreateItemType('deepdive')
      setShowCreateDeepDive(true)
    }else if(selector == 'aisaas'){
      setCreateItemType('aisaas')
      setShowCreateDeepDive(true)
    }else if(selector=='monthai'){
      setCreateItemType('monthai')
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
    setMonthlyId(id)
    // if(type=='monthly'){
      
    // }
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
    setCheckBoxChecked(item.active)
    setPostType(item.postType)
    setEditItemType(type)
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

  const dispatch = useDispatch();

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


  const dateChangeHandler = (item) => {
    //console.log("date selection",item.selection )
    setDateState([item.selection])
    let startDate = `${item.selection.startDate}`;
    let endDate = `${item.selection.endDate}`;
    dispatch(setDate({startDate,endDate}))
    let showStartDate = dayjs(item.selection.startDate).format('D MMM')
    let showEndDate = dayjs(item.selection.endDate).format('D MMM')

    if(startDate !== endDate){
      setShowCal(false)
      setSelectedDate(`${showStartDate} - ${showEndDate}`)
    }else{
      setSelectedDate(`${showStartDate}`)
    }
   
  }

  const showCalHandler = () => {
    setShowCal(!showCal)
  }

  const contentClickHandler = (e) => {
    const dateContainer = document.querySelector('.date');
    if (dateContainer && dateContainer.contains(e.target)){
    } else{
      setShowCal(false)
    }

    const searchContainer = document.querySelector('.search')
    if (searchContainer && searchContainer.contains(e.target)){

    } else{
      setShowSearch(false)
    }

    const statusContainer = document.querySelector('.status_selector_trigger')
    if (statusContainer && statusContainer.contains(e.target)){
    } else{
      setShowStateSelector(false)
    }




  }

  const searchFieldShowHandler  = () => {
    setShowSearch(true)
  }

  const searchInputHandler = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm)
    dispatch(setSearchTerm(searchTerm))
  }

  const showStatusSelectorHandler = () => {
    setShowStateSelector(true)
  }

  const statusSelectHandler = (e) => {
    console.log("Status", e.target.closest('li').getAttribute('data-value'))
    dispatch(setStatus(e.target.closest('li').getAttribute('data-value')))
    setShowStateSelector(false)
  }

  const statusFilterHandler = (item) => {
    if(statusFilterTerm == "All"){
      return true;
    }else if(statusFilterTerm == "Active"){
      return item.active;
    }else{
      return !item.active;
    }
  }


  const dateFilterHandler = (user) => {
    if(startDate){
      const createDate = dayjs( user.createdAt)
      const createDateFormatted = dayjs( user.createdAt).format('DD/MM/YYYY')
      let startDateFormatted = dayjs( startDate).format('DD/MM/YYYY')
      let endDateFormatted = dayjs( endDate).format('DD/MM/YYYY')

      if(startDateFormatted == endDateFormatted){
        return startDateFormatted == createDateFormatted;
      }

      const oneDayBefore = dayjs(startDate).subtract(1, 'day');
      const oneDayAfter = dayjs(endDate).add(1, 'day');  
      if( dayjs(createDate).isAfter(dayjs(oneDayBefore),'d') && dayjs(createDate).isBefore(dayjs(oneDayAfter),'d') ){
        return true
      }
      return false
    }else{
      return true
    }

  }

  const searchFilterHandler = (item) => {
    return item?.title?.toLowerCase()?.includes(searchFilterTerm);
  }




  const {data, isLoading:queryLoading, isError:queryIsError, error:queryError} = useGetDeepDivesQuery();


  if(isLoading || queryLoading){
    return <Loader />
  }
  if(isError || queryIsError ){
    console.log("Error occured", error )
  }


  // console.log("Data", data)

  const deepDives = data.deepdives.filter(item => item.type == 'deepdive');
  const aisaas = data.deepdives.filter(item => item.type == 'aisaas');
  let monthai = data.deepdives.filter(item => item.type == 'monthai');
  // console.log("monthai", monthai)
  // monthai = monthai.filter(statusFilterHandler).filter(searchFilterHandler).filter(dateFilterHandler)
  monthai = monthai.filter(searchFilterHandler).filter(dateFilterHandler).filter(statusFilterHandler);
  // console.log("monthai filtered", monthai)

  return (
    <EditItemProvider editItemHandler={editItemHandler}>
      <div onClick={contentClickHandler} className='home_content_wrap relative bg-[#5D5D5D33]/20'>
        
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
        
        <p className="text-lg font-semibold">Monthly Deep Dive</p>
        <MonthlyDeepDive items={deepDives}  deleteHandler={deleteContentHandler} />
        
        <p className="text-lg font-semibold mt-8">AI Saas Tool</p>
        <MonthlyDeepDive items={aisaas}  deleteHandler={deleteContentHandler} />
        
        <div  className="flex justify-between items-center">
          <p className="text-lg font-semibold mt-8">This Month in AI - What Did You Miss? </p>
          
          <div  className="flex items-center gap-4">
            <div className="search flex gap-2">
              {showSearch && <input type="text" className='bg-black border text-white' value={searchText} onChange={searchInputHandler} />}       
              <img onClick={searchFieldShowHandler} src={Search} alt="" />
            </div>
            
            <div className="date">
              <p onClick={showCalHandler} className="">{selectedDate}</p>
              {showCal && (
                <DateRangePicker
                  onChange={dateChangeHandler}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={dateState}
                  direction="horizontal"
                  DefinedRange={false}
                  inputRanges={[]}
                />

              )}
            </div>
            
            <div className="status_selector flex gap-1 items-center">
              <p className="status_selector_trigger flex flex-row gap-1 items-center" onClick={showStatusSelectorHandler} >All <img src={AllIcon} alt="" /></p> 
              
              {showStateSelector && (
                <div className="statusSelect w-[200px] bg-[#565b56] px-4 py-5 rounded">
                  <ul>
                    <li onClick={statusSelectHandler} data-value="All" className='flex gap-2'>{statusFilterTerm !=="All" && <img src={CheckBox} alt="" /> } {statusFilterTerm =="All" && <img src={CheckBoxSelected} alt="" /> }  All</li>
                    <li onClick={statusSelectHandler} data-value="Active" className='flex gap-2'>{statusFilterTerm !=="Active" && <img src={CheckBox} alt="" /> } {statusFilterTerm =="Active" && <img src={CheckBoxSelected} alt="" /> } Active</li>
                    <li  onClick={statusSelectHandler} data-value="Inactive" className='flex gap-2'>{statusFilterTerm !=="Inactive" && <img src={CheckBox} alt="" /> } {statusFilterTerm =="Inactive" && <img src={CheckBoxSelected} alt="" /> } Inactive</li>
                  </ul>
                </div>
              )}
            </div>



          </div>


        </div>
        
        <MonthAiList items={monthai}  deleteHandler={deleteContentHandler} />





        {showCreateDeepDive && <CreateMonthlyDeepDive type={createItemType} closeHandler={deepDivePanelCloseHandler} /> }
        
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