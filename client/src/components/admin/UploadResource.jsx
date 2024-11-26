import React, { useState } from 'react'
// import ArrowUp from '../../assets/arrow-up.svg'
// import SearchIcon from '../../assets/searchLarge.svg'
// import Bars from '../../assets/bars.svg'
// import FolderIcon from '../../assets/FolderIcon.svg'
// import BluePlus from '../../assets/BluePlus.svg'
import BtnCloseLg from '../../assets/BtnCloseLg.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import PlusWhite from '../../assets/PlusWhite.svg'

import { useCreateResourceMutation } from '../../slices/resourcesApiSlice'
import { useCreateNotificationMutation } from '../../slices/notificationApiSlice'
import slugify from 'slugify'
import {toast} from 'react-toastify'
// import ResourceList from './ResourceList'
import Loader from '../Loader'
import LectureUpload from './LectureUpload'
import dayjs from 'dayjs'


const UploadResource = ({hideUploadContent,setShowUpload}) => {
  
  // const [showUpload, setShowUpload] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [monthlyTag, setMonthlyTag] = useState("")
  const [resourceTitle, setResourceTitle] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [resourceDescription, setResourceDescription] = useState("")
  const [resShortDescription, setResShortDescription] = useState("")
  const [resourceImage, setResourceImage] = useState('')
  const [resourceImageName, setResourceImageName] = useState('')
  const [lectures, setLectures] = useState([{title:"", desc:"", files:[], image:"", imgName:""}])
  const [tempFiles, setTempFiles] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const [showUploadPan, setShowUploadPan] = useState(false)
  

  const currentYear = dayjs().year();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  


  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;


  const submitImage = (e) => {
    console.log("Image uploaded")
    console.log(e.target.files[0])
    const data = new FormData();
    data.append('file', e.target.files[0]);
    
    data.append('upload_preset',upload_preset );
    data.append('cloud_name',cloud_name);
    const uploaded = fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,{
      method:"POST",
      body:data
    })
    .then(res => res.json())
    .then(data => setResourceImage(data.url))
    setResourceImageName(e.target.files[0].name)

  }

  const uploadImage = (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,{
      method:"POST",
      body:data
    })
    .then(res => res.json())
    .then(data => data.url)
    return uploaded
  }

  const uploadImageNew = async (file) => {
    setShowLoader(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,{
      method:"POST",
      body:data
    });
    
    const res = await uploaded.json()
    setShowLoader(false);
    // console.log("result", res)
    return res;
  }

  const uploadPdf = async (file) => {
    setShowLoader(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/pdf/upload/`,{
      method:"POST",
      body:data
    });
    
    const res = await uploaded.json()
    setShowLoader(false);
    // console.log("result", res)
    return res;
  }

  const fileChangeHandler = (index, event) => {
    console.log("Index", index);
    const files = event.target.files;
    console.log("Files", files);
    let tempFiles = [];
    [...files].map(file => {
      console.log("Name", file.name, file.type)
      tempFiles.push(file)
    })
    setTempFiles(tempFiles);
  }

  const removeTempFile = (tempIndex) =>{
    console.log("remove temp file", tempIndex)
    const curTempFiles = [...tempFiles]
    const newFiles = curTempFiles.filter((file, index) => index != tempIndex)
    console.log("New files", newFiles)
    setTempFiles(newFiles)
  }
 
  const uploadFileHandler = async (index) => {
    console.log("Index",index)
    console.log("Upload clicked!")
    console.log("temp files", tempFiles)
    setShowLoader(true)

    tempFiles.map(async (file) => {
      if(file.type=='application/pdf' || file.type=='image/png' || file.type=='image/svg' || file.type=='image/jpg'){
        const uploaded =  await uploadImageNew(file);
        console.log("Uploaded", uploaded)
        let currentLecture = [...lectures]
        console.log("Current Lectures", currentLecture)
        let curFiles = currentLecture[index].files
        console.log("Current files", curFiles)
        let newFiles = [...curFiles, {url:uploaded.url, assetType:uploaded.format, assetName:uploaded.
          display_name}]
        currentLecture[index].files = newFiles;
        setLectures(currentLecture)
        setShowUploadPan(false)
        setShowLoader(false)
        
      }else if(file.type=='video/mp4'){
        const uploaded = await uploadVideo(file)
        console.log("Uploaded file:", uploaded)
        let currentLecture = [...lectures]
        let curFiles = currentLecture[index].files
        let newFiles = [...curFiles, {url:uploaded.url, assetType:uploaded.resource_type,assetName:uploaded.
          display_name}]
        currentLecture[index].files = newFiles;
        setLectures(currentLecture)  
        setShowUploadPan(false)      
        setShowLoader(false)      
      }
    })

    // setShowLoader(false)
  }
  
  const uploadVideo = async (file) => {
    setShowLoader(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload/`,{
      method:"POST",
      body:data
    });
    const res = await uploaded.json()
    setShowLoader(false);
    // console.log("result", res)
    return res;
  }

  const lectureChangeHandler = async (index,event) => {
    let stateData = [...lectures];
    // console.log("Event fired!")

    if(event.target.name === 'image'){
      //console.log("Img",event.target.files[0])
      stateData[index]["imgName"]  = event.target.files[0].name
      const imageUrl = await uploadImage(event.target.files[0])
      //console.log("Url", imageUrl)
      stateData[index]["image"] = imageUrl;
      //console.log("image saved")
      setLectures(stateData);
    }else{
      stateData[index][event.target.name] = event.target.value;
      setLectures(stateData);
    }

  }


  const lectureAddHandler = (e) => {
    let newfield = {title:"", desc:"", files:[], image:"", imgName:""}
    setLectures([...lectures, newfield])
  }

  const [createResource, {isLoading, isError}] = useCreateResourceMutation()
  const [createNotification] = useCreateNotificationMutation()

  const monthChangeHandler = (e) => {
    // console.log("month changed:", e.target.value)
    setMonth(e.target.value)
  }
  const yearChangeHandler = (e) => {
    setYear(e.target.value)
  }

  const showUploadPanHandler = () => {
    setShowUploadPan(true);
    setTempFiles([])
  }


  const publishHandler = async (status) => {

    setShowLoader(true)
    // console.log("Category:", category)
    const slug = slugify(resourceTitle,{
      lower: true,
      strict: true,
      trim: true         
    })

    const resoruceData = {
      title:resourceTitle,
      description: resourceDescription,
      shortDesc: resShortDescription,
      image:resourceImage,
      lectures,
      slug,
      status,
      tag:monthlyTag,
      month,
      year,

    }

    const notificationData = {
      title:`New resource- ${resourceTitle} released`,
      message:`New resource- "${resourceTitle}" released`,
      type:"monthlycontent"
    }

    console.log("resoruceData", resoruceData)

    try {
      const resData = await createResource(resoruceData).unwrap();
      const notiData = await createNotification(notificationData).unwrap()
      console.log("resData",resData)
      console.log("notiData",notiData)
      toast.success(`Solution ${resourceTitle} has been created successfully!`)
      // setShowUpload(false)
    } catch (error) {
      console.log("Error",error)
      if(error?.data?.error?.code == 11000){
        toast.error("There is alreay a solution with same title. Please try changing Solution Title.")
      }else{
        console.log("error", error)
        toast.error(error.data.message)
      }
    } finally{
      setShowLoader(false)
      setShowUpload(false)
    }

  }

  const showUploadContent = () => {
    setShowUpload(true)
  }



  return (
    <div className="upload_solution left-0 top-0 w-full h-full bg-black">
      <div className="upload_solution_inner container py-11">
        
        {showLoader && <Loader />}
        <div className="flex justify-between">
          <p className="text-2xl">Upload Monthly Content</p>
          <img onClick={hideUploadContent} src={BtnCloseLg} alt="" className="cursor-pointer" />
        </div>

        <div className=''>
          <form action="">
            
            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="">Monthly Tag</label>
              <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={monthlyTag} onChange={(e) => setMonthlyTag(e.target.value)} placeholder='Monthly Tag goes here...' />
            </div>

            <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-5">
              <label htmlFor="solImg" className='cursor-pointer'>
                <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
                <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
              </label>
              <input onChange={submitImage} id="solImg" className='hidden' type="file" />
              <div className="flex items-center gap-2">
                <img src={resourceImage} alt="" className='w-10' />
                <p className="">{resourceImageName}</p>
              </div>
              
            </div>                

            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="">Deep Dive Title</label>
              <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} placeholder='Deep dive title goes here...' />
            </div>

            <div className="inputGroup flex flex-col gap-1.5 mb-5">
              <label htmlFor="">Description</label>
              <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={resourceDescription} placeholder='Description.....' onChange={e => setResourceDescription(e.target.value)} />
            </div>



            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="category">Month</label>
              <select value={month} onChange={monthChangeHandler } name="month" id="month" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow'>
                <option value="">Select One</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>

            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="year">Year</label>
              <select onChange={yearChangeHandler} id="year" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow'>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>


            <div className="inputGroup flex flex-col gap-1.5 mb-5">
              <label htmlFor="">Short Description</label>
              <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={resShortDescription} placeholder='Short Description.....' onChange={e => setResShortDescription(e.target.value)} />
            </div>




            <div className="solution_area_title flex justify-between mb-4">
              <div className="flex flex-col gap-1">
                <p className="text-lg">Lectures</p>
                {/* <p className="text-gray-300 text-xs">You can upload up to 6  benefits</p> */}
              </div>

              <div onClick={lectureAddHandler} className="flex gap-2 items-center bg-primary-blue rounded-[100px] h-11 pl-9 pr-11 cursor-pointer">
                <img src={PlusWhite} className='w-6' alt="" />
                <p className="font-semibold">Add </p>
              </div>
              
            </div>

            {lectures.map((lecture, index) => <LectureUpload fileChangeHandler={fileChangeHandler} key={index} lecture={lecture} index={index} uploadFileHandler={uploadFileHandler} lectureChangeHandler={lectureChangeHandler} tempFiles={tempFiles} showUploadPanHandler={showUploadPanHandler} showUploadPan={showUploadPan} setShowUploadPan={setShowUploadPan} removeTempFile={removeTempFile} />)}
          


          </form>

          <div className="flex justify-between">
            <div className="">
              <div onClick={hideUploadContent}  className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Cancel</div>
            </div>
            <div className="flex gap-4">
              <div onClick={() => publishHandler("Unpublished")} className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Save as Draft</div>
              <div className="bg-primary-blue rounded-[100px] h-11 flex items-center justify-center px-5 cursor-pointer" onClick={() => publishHandler("Published")}>Publish</div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default UploadResource;

