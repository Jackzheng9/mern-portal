import React, { useState } from 'react'
import Pencil from '../../assets/PencilBlue.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import { Months } from '../../utils/months'
import { useEditResourceMutation } from '../../slices/resourcesApiSlice'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import ResourceLectureDetails from './ResourceLectureDetails'
import dayjs from 'dayjs'


const ResourceDetailsContent = ({resource}) => {
  // console.log("Resource", resource)
  const [title, setTitle] = useState(resource.title)
  const [description, setDescription] = useState(resource.description)
  const [image, setImage] = useState(resource.image)
  const [imgName, setImgName] = useState(resource.imgName)
  const [shortDesc, setShortDesc ] = useState(resource.shortDesc)
  const [tag, setTag ] = useState(resource.tag)
  const [lectures, setLectures ] = useState(resource.lectures)
  const [month, setMonth ] = useState(resource.month)
  const [year, setYear ] = useState(resource.year)
  const [showLoader ,setShowLoader] = useState(false)
  const [showTitleEdit, setShowTitleEdit] = useState(false)
  const [tempFiles, setTempFiles] = useState([])
  const [showUploadPan, setShowUploadPan ] = useState(false)
  const [showSave, setShowSave] = useState(false)

  const currentYear = dayjs().year();
  const startYear =  currentYear - 5;
  const endYear =  currentYear + 10;

  console.log("currentYear", currentYear)
  console.log("year", year)
  console.log("start", startYear)
  console.log("end", endYear)

  const yearOptions = [];
  for (let i = startYear; i <= endYear; i++) {
    yearOptions.push(<option key={i} value={i}>{i}</option>);
  }
  console.log("yearOptions", yearOptions)

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
    .then(data => setImage(data.url))
    setImgName(e.target.files[0].name)

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
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,{
      method:"POST",
      body:data
    });
    
    const res = await uploaded.json()
    // console.log("result", res)
    return res;
  }

  const uploadPdf = async (file) => {
    // setShowLoader(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/pdf/upload/`,{
      method:"POST",
      body:data
    });
    
    const res = await uploaded.json()
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

  const deleteLectureFile = (index, fileIndex) => {
    let currentLectures = [...lectures];
    let targetLecture = currentLectures[index]
    const files = targetLecture.files;
    let newFiles = files.filter((file,index) => index!=fileIndex )
    currentLectures[index] = {...currentLectures[index], files:newFiles}
    setLectures(currentLectures)
  }
 
  const uploadFileHandler = async (index) => {
    // console.log("Index",index)
    // console.log("Upload clicked!")
    console.log("temp files", tempFiles)    
    setShowLoader(true)

    let currentLectures = [...lectures]
    let curFiles = currentLectures[index].files

    const uploadPromises = tempFiles.map(async (file) => {

      if (file.type == 'application/pdf' || file.type == 'image/png' || file.type == 'image/svg' || file.type == 'image/jpg') {
        const uploaded = await uploadImageNew(file);
        console.log("Uploaded", uploaded);
        return { url: uploaded.url, assetType: uploaded.resource_type, assetName: uploaded.display_name };
      } else if (file.type == 'video/mp4') {
        const uploaded = await uploadVideo(file);
        console.log("Uploaded file:", uploaded);
        return { url: uploaded.url, assetType: uploaded.resource_type, assetName: uploaded.display_name };
      }
    });


    const uploadedFiles = await Promise.all(uploadPromises);
    currentLectures[index] = { ...currentLectures[index], files: [...curFiles, ...uploadedFiles] };
    setLectures(currentLectures)
    setShowUploadPan(false);
    console.log("all operation done!")
    
    setTempFiles([])
    setShowLoader(false)

  }
  
  const uploadVideo = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload/`,{
      method:"POST",
      body:data
    });
    const res = await uploaded.json()
    return res;
  }

  const lectureChangeHandler = async (index,event) => {
    
    let stateData = [...lectures];
    console.log("Event fired for index-", index)
    console.log("Cureent lectures", stateData)
    let currLecture = stateData[index]
    console.log("Cureent lecture", currLecture)
    currLecture = {...currLecture, 'imgName' : 'test'}
    
    if(event.target.name === 'image'){
      console.log("Img",event.target.files[0])
      currLecture = {...currLecture, 'imgName' : event.target.files[0].name}
      const imageUrl = await uploadImage(event.target.files[0])
      currLecture = {...currLecture, 'image' :  imageUrl}
      stateData[index] = currLecture
      setLectures(stateData);
    }else{
      currLecture = {...currLecture, [event.target.name] :  event.target.value}
      stateData[index] = currLecture
      setLectures(stateData);
    }
 

  }


  const lectureAddHandler = (e) => {
    let newfield = {title:"", desc:"", files:[], image:"", imgName:""}
    setLectures([...lectures, newfield])
  }



  const monthChangeHandler = (e) => {
    console.log("month changed:", e.target.value)
    setMonth(e.target.value)
  }

  const showUploadPanHandler = () => {
    setShowUploadPan(true);
    setTempFiles([])
  }

  const [editResource,{isLoading, isError}] = useEditResourceMutation();

  const publishHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true)

    const resoruceData = {
      id:resource._id,
      title,
      description,
      shortDesc,
      image,
      imgName,
      lectures,
      tag,
      month,
      year

    }

    console.log("resoruceData", resoruceData)

  
    try {
      const resData = await editResource(resoruceData).unwrap();
      console.log("resData",resData)
      toast.success(`Resource - ${title} has been updated successfully!`)
      // setShowUpload(false)
    } catch (error) {
      console.log("Error",error)
      if(error?.data?.error?.code == 11000){
        toast.error("There is alreay a solution with same title. Please try changing Solution Title.")
      }else{
        toast.error(error.data.message)
      }
    } finally{
      setShowLoader(false)
      // setShowUpload(false)
    }

    

  }

  const cancelEditHandler = () => {
    setShowSave(false)
    setShowTitleEdit(false)
  }

  const titleEditShowHandler = () => {
    setShowTitleEdit(true)
    setShowSave(true)
  }

  
  
  return (
    <>
      {showLoader && <Loader />}
      
      <div className="title_section mb-12">
        
        {!showTitleEdit && (
          <div className="title_content flex gap-6">
            <div className="basis-0 grow">
              <img src={resource.image} alt="" />
            </div>
            <div className="basis-0 grow-[2]">
              
              <div  className="flex justify-between">
                <p className="tag font-semibold text-gray-100 uppercase">{resource.tag}</p>
                <div onClick={titleEditShowHandler} className="flex gap-2 pl-9 pr-11 h-11 items-center border border-primary-blue rounded-[100px] text-primary-blue cursor-pointer"><img src={Pencil} className='' alt="" />Edit</div>
              </div>
              
              <p className="text-gray-100 text-base font-semibold my-2">{resource.title}</p>
              <p className="text-gray-300 text-lg">{resource.description}</p>
            </div>
          </div>

        )}
        
        {showTitleEdit && (
        <div className="title_edit_part">
          
          <form action="">
            
            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="">Monthly Tag</label>
              <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={tag} onChange={(e) => setTag(e.target.value)} placeholder='Monthly Tag goes here...' />
            </div>

            <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-5">
              
              <label htmlFor="solImg" className='cursor-pointer'>
                <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
                <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
              </label>
              <input onChange={submitImage} id="solImg" className='hidden' type="file" />
              <div className="flex items-center gap-2">
                <img src={image} alt="" className='w-10' />
                <p className="">{imgName}</p>
              </div>
              
            </div>                

            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="">Deep Dive Title</label>
              <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Deep dive title goes here...' />
            </div>

            <div className="inputGroup flex flex-col gap-1.5 mb-5">
              <label htmlFor="">Description</label>
              <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={description} placeholder='Description.....' onChange={e => setDescription(e.target.value)} />
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
              <select value={year} onChange={(e) => setYear(e.target.value)} name="year" id="year" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow'>
                {yearOptions}
              </select>
            </div>



            <div className="inputGroup flex flex-col gap-1.5 mb-5">
              <label htmlFor="">Short Description</label>
              <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={shortDesc} placeholder='Short Description.....' onChange={e => setShortDesc(e.target.value)} />
            </div>

          </form>

          
          <div className="save_section flex justify-between">
            <button className='border rounded-[100px] h-11 px-5 ' onClick = { cancelEditHandler }>Cancel</button>
            <button className='border bg-primary-blue border-primary-blue rounded-[100px] h-11 px-5' onClick = { publishHandler }>Save Changes</button>
          </div>     

        </div>

        )}

      </div>

      <div className="lecture_section">

        <div className="lecture_content mt-5 p-6">
          {lectures.map( (lecture,index) => {
            return (
              <ResourceLectureDetails key={index} lecture={lecture} tempFiles={tempFiles} index={index} fileChangeHandler={fileChangeHandler} lectureChangeHandler={lectureChangeHandler} uploadFileHandler={uploadFileHandler} removeTempFile={removeTempFile} showUploadPan={showUploadPan} setShowUploadPan = {setShowUploadPan} deleteLectureFile={deleteLectureFile} publishHandler = {publishHandler} cancelEditHandler={cancelEditHandler} setShowSave = {setShowSave} />
            )
          })}
        </div>

      </div>
      
      
      
          
    </>
  )
}

export default ResourceDetailsContent