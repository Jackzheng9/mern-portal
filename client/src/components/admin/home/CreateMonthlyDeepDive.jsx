import React, { useState } from 'react'
import FolderIcon from '../../../assets/FolderIcon.svg'
import BluePlus from '../../../assets/BluePlus.svg'
import UploadIcon from '../../../assets/UploadIcon.svg'
import CloseIcon from '../../../assets/Close-dimmed.svg'
import uploadImage from '../../../utils/imageUpload'
import slugify from 'slugify'
import { useCreateDeepDiveMutation } from '../../../slices/deepDiveApiSlice'
import { toast } from 'react-toastify'





const CreateMonthlyDeepDive = ({closeHandler,type}) => {
  console.log("type",type)

  const [checkBoxChecked,setCheckBoxChecked] = useState(true)
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');
  const [imageName,setImageName] = useState('');
  const [link,setLink] = useState('');


  const [ createDeepDive , {isLoading, isError}] = useCreateDeepDiveMutation();

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
    console.log("Form submit")
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
      type

    }

    // console.log("data", data)
    try {
      const apiRes = await createDeepDive(data).unwrap();
      console.log("Api Res", apiRes)
      toast.success(`"${title}" has been created successfully!`)
      closeHandler();

    } catch (error) {
      console.log(error)
      if(error.data.error.code == 11000){
        toast.error(`Please use a different title for the post. "${title}" is alreay used in another post.`)
      }
    }
    
  }


  return (
    <div className='create_monthly w-full absolute flex justify-center top-[0px] backdrop-blur-[2px]'>
      <div className="create_monthly_inner w-full max-w-[720px] bg-black p-11">
        <div className="flex justify-between items-start ">
          <div className=''>
            <h1 className="font-semibold text-2xl mb-1">Monthly Deep  Dive</h1>
            <p className="text-[#B0B0B0] mb-8">Upload the details For the monthly deep  dive</p>
          </div>
          <img onClick={closeHandler} className='cursor-pointer' src={CloseIcon} alt="" />
        </div>
        

        <form onSubmit={submitHandler}>

          <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-7">
            <label htmlFor="solImg" className='cursor-pointer'>
              <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
              <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
            </label>
            <input id="solImg" className='hidden' type="file" onChange={imageHandler} />
            <div className="flex items-center gap-2">
              <img src={image} alt="" className='w-10' />
              <p className="">{imageName}</p>
            </div>
            
          </div>

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