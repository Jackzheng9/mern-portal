import React, { useState } from 'react'
import FolderIcon from '../../../assets/FolderIcon.svg'
import BluePlus from '../../../assets/BluePlus.svg'
import UploadIcon from '../../../assets/UploadIcon.svg'
import CloseIcon from '../../../assets/Close-dimmed.svg'
import UploadBG from '../../../assets/HomeContentUploadBg.png'
import uploadImage from '../../../utils/imageUpload'
import slugify from 'slugify'
import { useCreateDeepDiveMutation } from '../../../slices/deepDiveApiSlice'
import { useCreateNotificationMutation } from '../../../slices/notificationApiSlice'
import { toast } from 'react-toastify'



const CreateMonthlyDeepDive = ({closeHandler,type}) => {
  console.log("type",type)

  const [checkBoxChecked,setCheckBoxChecked] = useState(true)
  const [title,setTitle] = useState('');
  const [toolName,setToolName] = useState('');
  const [bestFor,setBestFor] = useState('');
  const [pricing,setPricing] = useState('');
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');
  const [imageName,setImageName] = useState('');
  const [link,setLink] = useState('');
  const [postType, setPostType] = useState('');
  const [videoId, setVideoId] = useState('');


  const [ createDeepDive , {isLoading, isError}] = useCreateDeepDiveMutation();
  const [ createNotification ] = useCreateNotificationMutation();

  const checkClick = (e) =>{
    setCheckBoxChecked(!checkBoxChecked)
  }

  const imageHandler = async (e) => {
    console.log("Process image");
    const file = e.target.files[0];
    console.log("file", file)
    const uploaded = await uploadImage(file);
    console.log("Uploaded", uploaded)
    setImage(uploaded.url);
    setImageName(file.name)
  }
 
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Form submit")
    const slug = slugify(title,{
      lower: true,
      strict: true,
      trim: true,        
    })
    const data = {
      title,
      description,
      image,
      active:checkBoxChecked,
      slug,
      link,
      type,
      postType,
      toolName,
      bestFor,
      pricing,
      videoId
    }

    console.log("data", data)

    const notificationData = {
      title: `Home content published` ,
      message:`New resource available: ${title}. Explore the latest insights and tools. `,
      type: 'homecontent'
    }
    
    try {
      const apiRes = await createDeepDive(data).unwrap();
      const notiRes = await createNotification(notificationData).unwrap();
      console.log("Api Res", apiRes)
      console.log("Noti Res", notiRes)
      toast.success(`"${title}" has been created successfully!`)
      closeHandler();

    } catch (error) {
      console.log("error",error)
      if(error.data.error.code == 11000){
        toast.error(`Please use a different title for the post. "${title}" is alreay used in another post.`)
      }
    }

    
    
  }


  return (
    <div className='create_monthly w-full absolute flex justify-center top-[0px] backdrop-blur-[2px]'>
      <div className="create_monthly_inner w-full max-w-[720px] bg-[#1B1B1F] p-11">
        <div className="flex justify-between items-start ">
          <div className=''>
            {type == 'deepdive' && (
              <>
                <h1 className="font-semibold text-2xl mb-1">Monthly Deep  Dive</h1>
                <p className="text-[#B0B0B0]">Upload the details For the monthly deep  dive</p>
              </>
            )}
            {type == 'aisaas' && (
              <>
                <h1 className="font-semibold text-2xl mb-1">AI Saas Tool</h1>
                <p className="text-[#B0B0B0]">Upload the details For the monthly tool</p>
              </>
            )}
            {type == 'monthai' && (
              <>
                <h1 className="font-semibold text-2xl mb-1">This Month in AI - What Did You Miss? </h1>
                <p className="text-[#B0B0B0]">Upload the work history csv file downloaded from the Aegis</p>
              </>
            )}
            
          </div>
          <img onClick={closeHandler} className='cursor-pointer' src={CloseIcon} alt="" />
        </div>
        

        <form className='mt-10' onSubmit={submitHandler}>
          {type == 'monthai' && (

            <div className="mb-8">
              <input className='radio_input' type="radio" id="video" name="posttype" value="video" checked={postType === 'video'} onChange={() => setPostType('video')}/><label htmlFor="video">Video</label>
              <input className='radio_input' type="radio" id="blog" name="posttype" value="blog" checked={postType === 'blog'} onChange={() => setPostType('blog')}/><label htmlFor="blog">Blog</label>
            </div>
          )}
          

          <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl p-1 mb-7">
            <div className="border border-dashed border-[#3D3D3D] rounded-xl p-6" >
              <label htmlFor="solImg" className='cursor-pointer'>
                <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
                <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload <span className='text-[#B0B0B0]'>or drag and drop SVG, PNG, JPG </span> </p>
              </label>
              <input id="solImg" className='hidden' type="file" onChange={imageHandler} />
              <div className="flex items-center gap-2">
                <img src={image} alt="" className='w-10' />
                <p className="">{imageName}</p>
              </div>
            </div>  
          </div>

          <div className="inputGroup flex flex-col gap-1.5 mb-7">
            <label htmlFor="">Title</label>
            <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={title} onChange={(e) => setTitle(e.target.value)}  placeholder='Title goes here...' required />
          </div>

          {type == "aisaas" && (
            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="">Tool Name</label>
              <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={toolName} onChange={(e) => setToolName(e.target.value)}  placeholder='Tool name goes here...' required />
            </div>

          )}

          
          

          <div className="inputGroup flex flex-col gap-1.5 mb-5">
            <label htmlFor="">Description</label>
            <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description.....'  />
          </div>
          {type != 'monthai' && (
            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              <label htmlFor="">Link to the post:</label>              
              <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={link} onChange={(e) => setLink(e.target.value)}  placeholder='https://somelink.com/' required />
            </div>

          )}



          {type == 'monthai' && (
            <>
            <div className="inputGroup flex flex-col gap-1.5 mb-7">
              {/* <label htmlFor="">Link to the post:</label> */}
              {postType == 'video' ? 'Video Id:' : 'Link to the post:' }
              
              {postType == 'blog' && (
                <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={link} onChange={(e) => setLink(e.target.value)}  placeholder='https://somelink.com/' required />
              )}
              

              {postType == 'video' && (
                <>
                  <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={videoId} onChange={(e) => setVideoId(e.target.value)}  placeholder='668nUCeBHyY' required />
                  <p className="help text-xs mt-2 text-gray-300">Help: If the YouTube url is "https://www.youtube.com/watch?v=668nUCeBHyY", then the video id is "668nUCeBHyY". So basically what is after "v=" in the url is the video ID</p>
                </>
              )}
              
            </div>            
            
            </>
          )}

          {type == "aisaas" && (
            <>
              <div className="inputGroup flex flex-col gap-1.5 mb-7">
                <label htmlFor="">Best For</label>
                <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={bestFor} onChange={(e) => setBestFor(e.target.value)}  placeholder='Best For...' required />
              </div>
              <div className="inputGroup flex flex-col gap-1.5 mb-7">
                <label htmlFor="">Pricing</label>
                <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={pricing} onChange={(e) => setPricing(e.target.value)}  placeholder='Pricing...' required />
              </div>
            </>
          )}




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
              <div onClick={closeHandler} className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Cancel</div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-primary-blue rounded-[100px] h-11 flex items-center justify-center px-5 cursor-pointer">Publish</button>
            </div>
          </div>




        </form>

                


      </div>
    </div>
  )
}

export default CreateMonthlyDeepDive