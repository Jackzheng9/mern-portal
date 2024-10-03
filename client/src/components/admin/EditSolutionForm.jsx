import React, { useState } from 'react'
import UploadIcon from '../../assets/UploadIcon.svg'
import PlusWhite from '../../assets/PlusWhite.svg'
import ArrowUpBlue from '../../assets/ArrowUpBlue.svg'
import { useEditSolutionMutation } from '../../slices/solutionApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EditSolutionForm = ({solution}) => {
  // console.log("solution from edit form page",solution)
  const [solutionTitle, setSolutionTitle] = useState(solution.title)
  const [category, setCategory] = useState(solution.category)
  const [solutionDescription, setSolutionDescription] = useState(solution.description)
  const [solutionImage, setSolutionImage] = useState(solution.image)
  const [solutionImageName, setSolutionImageName] = useState('')
  const [benefits, setBenefits] = useState(solution.benefits)
  const [workflows, setWorkflows] = useState(solution.workflows)
  const [tools, setTools] = useState(solution.tools)
  const [features, setFeatures] = useState(solution.features)

  const navigate = useNavigate();

  const categoryChangeHandler = (e) => {
    console.log("cat changed:", e.target.value)
    setCategory(e.target.value)
  }

  const submitImage = (e) => {
    console.log("Image uploaded")
    console.log(e.target.files[0])
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'ey3f99zw');
    data.append('cloud_name', 'dj1eiczym');
    const uploaded = fetch('https://api.cloudinary.com/v1_1/dj1eiczym/image/upload/',{
      method:"POST",
      body:data
    })
    .then(res => res.json())
    .then(data => setSolutionImage(data.url))
    setSolutionImageName(e.target.files[0].name)

  }

  const uploadImage = (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ey3f99zw');
    data.append('cloud_name', 'dj1eiczym');
    const uploaded = fetch('https://api.cloudinary.com/v1_1/dj1eiczym/image/upload/',{
      method:"POST",
      body:data
    })
    .then(res => res.json())
    .then(data => data.url)
    return uploaded
  }

  const benefitChangeHandler = async (index,event) => {
    let stateData = [...benefits];
    // console.log("Event fired!")

    if(event.target.name === 'image'){
      //console.log("Img",event.target.files[0])
      stateData[index]["imgName"]  = event.target.files[0].name
      const imageUrl = await uploadImage(event.target.files[0])
      //console.log("Url", imageUrl)
      stateData[index]["image"] = imageUrl;
      //console.log("image saved")
      setBenefits(stateData);
    }else{
      stateData[index][event.target.name] = event.target.value;
      setBenefits(stateData);
    }

  }
  const workflowChangeHandler = async (index,event) => {
    let stateData = [...workflows];
    // console.log("Event fired!")

    if(event.target.name === 'image'){
      //console.log("Img",event.target.files[0])
      stateData[index]["imgName"]  = event.target.files[0].name
      const imageUrl = await uploadImage(event.target.files[0])
      //console.log("Url", imageUrl)
      stateData[index]["image"] = imageUrl;
      //console.log("image saved")
      setWorkflows(stateData);
    }else{
      stateData[index][event.target.name] = event.target.value;
      setWorkflows(stateData);
    }

  }
  const toolChangeHandler = async (index,event) => {
    let stateData = [...tools];
    stateData[index][event.target.name] = event.target.value;
    setTools(stateData);
  }
  const featureChangeHandler = async (index,event) => {
    let stateData = [...features];

    if(event.target.name === 'image'){
      stateData[index]["imgName"]  = event.target.files[0].name
      const imageUrl = await uploadImage(event.target.files[0])
      stateData[index]["image"] = imageUrl;
      setFeatures(stateData);
    }else{
      stateData[index][event.target.name] = event.target.value;
      setFeatures(stateData);
    }

  }

  const benefitAddHandler = (e) => {
    let newfield = {title:"", desc:"", image:"",imgName:""}
    setBenefits([...benefits, newfield])

  }
  const workflowAddHandler = (e) => {
    let newfield = {title:"", desc:"", image:"",imgName:""}
    setWorkflows([...workflows, newfield])

  }
  const toolAddHandler = (e) => {
    let newfield = {title:"", desc:""}
    setTools([...tools, newfield])

  }
  const featureAddHandler = (e) => {
    let newfield = {title:"", desc:"", image:"",imgName:""}
    setFeatures([...features, newfield])

  }

  const [ editSolution ,{isLoading, isError}] = useEditSolutionMutation()

  const publishHandler = async (status) => {

    const data = {
      id:solution._id,
      title:solutionTitle,
      category:category,
      description: solutionDescription,
      image:solutionImage,
      benefits,
      workflows,
      tools,
      features,
      status
    }

    console.log("data", data)

    try {
      const resData = await editSolution(data).unwrap();
      console.log(resData)
      toast.success(`Post has been edited successfully!`)
      navigate(`/admin/solutions/${solution.slug}`)
    } catch (error) {
      console.log(error)
      if(error.data.error.code == 11000){
        toast.error("There is alreay a solution with same title. Please try changing Solution Title.")
      }else{
        toast.error(error.data.message)
      }
    }
    
  }


  return (
    <>
    
    <div className="upload_solution left-0 top-0 w-full h-full bg-black">
          <div className="upload_solution_inner container py-11">
            


            <div className=''>
              <form action="">
                
                <div className="inputGroup flex flex-col gap-1.5 mb-7">
                  <label htmlFor="">Title</label>
                  <input type="text" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' value={solutionTitle} onChange={(e) => setSolutionTitle(e.target.value)} placeholder='Title goes here...' />
                </div>

                <div className="inputGroup flex flex-col gap-1.5 mb-7">
                  <label htmlFor="category">Category</label>
                  <select value={category} onChange={categoryChangeHandler } name="category" id="category" className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow'>
                    <option value="">Select One</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div className="inputGroup flex flex-col gap-1.5 bg-[#1B1B1F] rounded-2xl px-12 py-6 mb-5">
                  <label htmlFor="solImg" className='cursor-pointer'>
                    <img className='w-12 mx-auto block' src={UploadIcon} alt="" />
                    <p className="max-w-64 mx-auto text-primary-blue text-center">Click to upload Thumbnail <span className='text-gray-600'>or drag and drop SVG, PNG, JPG </span> </p>
                  </label>
                  <input onChange={submitImage} id="solImg" className='hidden' type="file" />
                  <div className="flex items-center gap-2">
                    <img src={solutionImage} alt="" className='w-10' />
                    <p className="">{solutionImageName}</p>
                  </div>
                  
                </div>

                <div className="inputGroup flex flex-col gap-1.5 mb-5">
                  <label htmlFor="">Description</label>
                  <textarea className='h-32 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow flex items-start' value={solutionDescription} placeholder='Description.....' onChange={e => setSolutionDescription(e.target.value)} />
                </div>




                <div className="solution_area_title flex justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">Benefits</p>
                    <p className="text-gray-300 text-xs">You can upload up to 6  benefits</p>
                  </div>

                  <div onClick={benefitAddHandler} className="flex gap-2 items-center bg-primary-blue rounded-[100px] h-11 pl-9 pr-11 cursor-pointer">
                    <img src={PlusWhite} className='w-6' alt="" />
                    <p className="font-semibold">Add </p>
                  </div>
                  
                </div>

                {benefits.map((benefit, index) => {
                  return(
                  <div className="px-4 mb-4" key={index}>
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <label className='inline-flex cursor-pointer gap-4 items-center text-primary-blue border border-primary-blue h-11 pl-6 pr-5 rounded-[100px]' htmlFor={`image-${index}`}> <img src={ArrowUpBlue} alt="" /> Upload Icon</label>
                        <div className="flex items-center gap-2">
                          <img className='h-10 mt-2' src={benefit.image} key={benefit.image} alt="" />
                          <p className="">{benefit.imgName}</p>
                        </div>
                        
                      </div>

                      <input className='hidden' name="image" id={`image-${index}`} type="file" onChange={(event) => benefitChangeHandler(index,event)}/>
                      
                    </div>

                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor="">Title</label>
                      <input className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="title" type="text" placeholder='Title' value={benefit.title} onChange={(event) => benefitChangeHandler(index,event)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="">Description</label>
                      <input className='px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="desc" type="text" placeholder='Description' value={benefit.desc} onChange={(event) => benefitChangeHandler(index,event)} />
                    </div>
                    
                  </div>
                  )
                })}

                <div className="solution_area_title flex justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">Workflow</p>
                    {/* <p className="text-gray-300 text-xs">You can upload up to 6  workflows</p> */}
                  </div>

                  <div onClick={workflowAddHandler} className="flex gap-2 items-center bg-primary-blue rounded-[100px] h-11 pl-9 pr-11 cursor-pointer">
                    <img src={PlusWhite} className='w-6' alt="" />
                    <p className="font-semibold">Add </p>
                  </div>
                </div>
                {workflows.map((workflow, index) => {
                  return(
                  <div className="px-4 mb-4" key={index}>
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <label className='inline-flex cursor-pointer gap-4 items-center text-primary-blue border border-primary-blue h-11 pl-6 pr-5 rounded-[100px]' htmlFor={`workflowimage-${index}`}> <img src={ArrowUpBlue} alt="" /> Upload Icon</label>
                        <div className="flex items-center gap-2">
                          <img className='h-10 mt-2' src={workflow.image} key={workflow.image} alt="" />
                          <p className="">{workflow.imgName}</p>
                        </div>
                        
                      </div>

                      <input className='hidden' name="image" id={`workflowimage-${index}`} type="file" onChange={(event) => workflowChangeHandler(index,event)}/>
                      
                    </div>

                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor="">Title</label>
                      <input className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="title" type="text" placeholder='Title' value={workflow.title} onChange={(event) => workflowChangeHandler(index,event)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="">Description</label>
                      <input className='px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="desc" type="text" placeholder='Description' value={workflow.desc} onChange={(event) =>workflowChangeHandler(index,event)} />
                    </div>
                    
                  </div>
                  )
                })}

                <div className="solution_area_title flex justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">Tools and technology</p>
                  </div>

                  <div onClick={toolAddHandler} className="flex gap-2 items-center bg-primary-blue rounded-[100px] h-11 pl-9 pr-11 cursor-pointer">
                    <img src={PlusWhite} className='w-6' alt="" />
                    <p className="font-semibold">Add </p>
                  </div>
                </div>

                {tools.map((tool, index) => {
                  return(
                  <div className="px-4 mb-4" key={index}>

                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor="">Title</label>
                      <input className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="title" type="text" placeholder='Title' value={tool.title} onChange={(event) => toolChangeHandler(index,event)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="">Description</label>
                      <input className='px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="desc" type="text" placeholder='Description' value={tool.desc} onChange={(event) =>toolChangeHandler(index,event)} />
                    </div>
                    
                  </div>
                  )
                })}

                <div className="solution_area_title flex justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg">Features</p>
                  </div>

                  <div onClick={featureAddHandler} className="flex gap-2 items-center bg-primary-blue rounded-[100px] h-11 pl-9 pr-11 cursor-pointer">
                    <img src={PlusWhite} className='w-6' alt="" />
                    <p className="font-semibold">Add </p>
                  </div>
                </div>
                {features.map((feature, index) => {
                  return(
                  <div className="px-4 mb-4" key={index}>
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <label className='inline-flex cursor-pointer gap-4 items-center text-primary-blue border border-primary-blue h-11 pl-6 pr-5 rounded-[100px]' htmlFor={`featureimage-${index}`}> <img src={ArrowUpBlue} alt="" /> Upload Icon</label>
                        <div className="flex items-center gap-2">
                          <img className='h-10 mt-2' src={feature.image} key={feature.image} alt="" />
                          <p className="">{feature.imgName}</p>
                        </div>
                        
                      </div>

                      <input className='hidden' name="image" id={`featureimage-${index}`} type="file" onChange={(event) => featureChangeHandler(index,event)}/>
                      
                    </div>

                    <div className="mb-4 flex flex-col gap-1.5">
                      <label htmlFor="">Title</label>
                      <input className='h-10 px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="title" type="text" placeholder='Title' value={feature.title} onChange={(event) => featureChangeHandler(index,event)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="">Description</label>
                      <input className='px-3 py-2 bg-transparent border border-[#3D3D3D] rounded-lg text-gray-300 inputShadow' name="desc" type="text" placeholder='Description' value={feature.desc} onChange={(event) =>featureChangeHandler(index,event)} />
                    </div>
                    
                  </div>
                  )
                })}
                


              </form>
              <div className="flex justify-between">
                <div className="">
                  <div onClick={() => setShowUpload(false)} className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Cancel</div>
                </div>
                <div className="flex gap-4">
                  <div onClick={() => publishHandler("Unpublished")} className="border h-11 flex items-center px-5 rounded-[100px] cursor-pointer">Save as Draft</div>
                  <div className="bg-primary-blue rounded-[100px] h-11 flex items-center justify-center px-5 cursor-pointer" onClick={() => publishHandler("Published")}>Publish</div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
    
    
    
    </>
  )
}

export default EditSolutionForm