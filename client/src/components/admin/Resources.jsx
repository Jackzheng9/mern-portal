import React, { useState } from 'react'
import ArrowUp from '../../assets/arrow-up.svg'
import SearchIcon from '../../assets/searchLarge.svg'
import Bars from '../../assets/bars.svg'
import FolderIcon from '../../assets/FolderIcon.svg'
import BluePlus from '../../assets/BluePlus.svg'
import BtnCloseLg from '../../assets/BtnCloseLg.svg'
import UploadIcon from '../../assets/UploadIcon.svg'
import PlusWhite from '../../assets/PlusWhite.svg'
import ArrowUpBlue from '../../assets/ArrowUpBlue.svg'
import { useCreateResourceMutation } from '../../slices/resourcesApiSlice'
import slugify from 'slugify'
import {toast} from 'react-toastify'
import ResourceList from './ResourceList'
import Loader from '../Loader'
import UploadResource from './UploadResource'

const Resources = () => {

  const [showUpload, setShowUpload] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [monthlyTag, setMonthlyTag] = useState("")
  const [resourceTitle, setResourceTitle] = useState("")
  const [month, setMonth] = useState("")
  const [resourceDescription, setResourceDescription] = useState("")
  const [resShortDescription, setResShortDescription] = useState("")
  const [resourceImage, setResourceImage] = useState('')
  const [resourceImageName, setResourceImageName] = useState('')
  const [lectures, setLectures] = useState([{title:"", desc:"", files:[], image:"", imgName:""}])
  const [tempFiles, setTempFiles] = useState([])
  const [showLoader, setShowLoader] = useState(false)

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;


  const submitImage = (e) => {
    console.log("Image uploaded")
    console.log(e.target.files[0])
    const data = new FormData();
    data.append('file', e.target.files[0]);
    // data.append('upload_preset', 'ey3f99zw');
    
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

  const uploadFileHandler = async (index) => {
    console.log("Index",index)
    console.log("Uploaded clicked!")
    console.log("temp files", tempFiles)
  
    tempFiles.map(async (file) => {
      if(file.type=='image/png' || file.type=='image/svg' || file.type=='image/jpg'){
        const uploaded =  await uploadImageNew(file);
        console.log("Uploaded", uploaded)
        let currentLecture = [...lectures]
        console.log("Current Lectures", currentLecture)
        let curFiles = currentLecture[index].files
        console.log("Current files", curFiles)
        let newFiles = [...curFiles, {url:uploaded.url, assetType:uploaded.resource_type}]
        currentLecture[index].files = newFiles;
        setLectures(currentLecture)
        
      }else if(file.type=='video/mp4'){
        const uploaded = await uploadVideo(file)
        console.log("Uploaded file:", uploaded)
        let currentLecture = [...lectures]
        let curFiles = currentLecture[index].files
        let newFiles = [...curFiles, {url:uploaded.url, assetType:uploaded.resource_type}]
        currentLecture[index].files = newFiles;
        setLectures(currentLecture)        
      }
    })
  }



  const lectureAddHandler = (e) => {
    let newfield = {title:"", desc:"", files:[], image:"", imgName:""}
    setLectures([...lectures, newfield])
  }


  const [createResource, {isLoading, isError}] = useCreateResourceMutation()

  const monthChangeHandler = (e) => {
    console.log("month changed:", e.target.value)
    setMonth(e.target.value)
  }


  const publishHandler = async (status) => {

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
      status
    }

    console.log("resoruceData", resoruceData)
    

    /*
    try {
      const resData = await createResource(resoruceData).unwrap();
      console.log("resData",resData)
      toast.success(`Solution ${resourceTitle} has been created successfully!`)
      setShowUpload(false)
    } catch (error) {

      console.log("Error",error)
      if(error?.data?.error?.code == 11000){
        toast.error("There is alreay a solution with same title. Please try changing Solution Title.")
      }else{
        //toast.error(error.data.message)
      }
    }


    */
  
    
  }

  const showUploadContent = () => {
    setShowUpload(true)
  }

  const hideUploadContent = () => setShowUpload(false)

  return (
    <div className='px-6 relative'>
      <div className="flex items-center justify-between">
          <p className="">Monthly Content</p>
          <div onClick={() => setShowUpload(true) } className="bg-primary-blue rounded-[100px] flex items-center pl-9 pr-11 h-11 gap-2 cursor-pointer">
            <img src={ArrowUp} alt="" />
            <p className="">Upload Content</p>
          </div>
      </div>

      {showLoader && <Loader />}
      



      

      <div className="flex justify-between mt-8">
        <form action="">
          <div className="relative">
            <img className='absolute left-[14px] top-[12px] ' src={SearchIcon} alt="" />
            <input className='searchBordered h-11 bg-transparent rounded-lg pl-11' placeholder="Search" type="text" />
          </div>
        </form>

        <div className="flex gap-1 items-center">
          <p className="text-gray-300 font-medium">All</p> <img src="" alt="" />
          <img src={Bars} className='w-5' alt="" />
        </div>

      </div>

      <ResourceList showUpload={showUploadContent} />

      {showUpload && <UploadResource hideUploadContent={hideUploadContent} />}

    </div>
  )
}

export default Resources