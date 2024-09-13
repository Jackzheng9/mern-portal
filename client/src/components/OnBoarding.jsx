import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import Radio from '../assets/radio.svg'
import RadioSelected from '../assets/radio - selected.svg'
import Success from '../assets/success.svg'
import ArrowLeft from '../assets/arrow-left.svg'
import Loading from '../assets/loading.gif'
import { useEditUserMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {

  const [step , setStep] = useState(1)
  const [width, setWidth] = useState(0)
  const [loading, setLoading] = useState(false)

  const [industry,setIndustry] = useState('')
  const [employee,setEmployee] = useState('')
  const [goal,setGoal] = useState('')
  const [workflow,setWorkflow] = useState('')
  const [manualWorks,setManualWorks] = useState('')
  const [mainIssue,setMainIssue] = useState('')
  const [improveArea,setImproveArea] = useState('')
  const [achieveArea,setAchieveArea] = useState('')

  const totalStep = 8;
  let currentPercentage = (step/totalStep) *100;
  currentPercentage = Math.ceil(currentPercentage);
  // console.log(currentPercentage )

  const divRef = useRef(null);

  const user = useSelector(state => state.auth.userInfo);
  const firstLetter = user.firstName.slice(0,1).toUpperCase();
  const lastLetter = user.lastName.slice(0,1).toUpperCase();
  const userShort = firstLetter+lastLetter
  // console.log(userShort)
  // console.log(user)

  const [ editUser, {isLoading, isError, }] = useEditUserMutation()
  const navigate = useNavigate();

  useEffect(() => {
    if(step !==9){
      const fullWidth = divRef.current.offsetWidth;
      // console.log(fullWidth)
      const calculatedWidth = Math.ceil((fullWidth*currentPercentage) / 100);
      // console.log(calculatedWidth)
      setWidth(calculatedWidth)
      // console.log(width)
    }


  }, [width,step])


  const nextHandler = () => {
    setStep((step) => step + 1)
  }

  const prevHandler = () => {
    setStep((step) => step - 1)
  }
  const skipHandler = () => {
    setStep((step) => step + 1)
  }

  const industryHandler = (e) => {
    setIndustry(e.target.value)
  }

  const employeeHandler = (e) => {
    setEmployee(e.target.value)
  }
  const goalHandler = (e) => {
    setGoal(e.target.value)
  }
  const workflowHandler = (e) => {
    setWorkflow(e.target.value)
  }
  const manualWorksHandler = (e) => {
    setManualWorks(e.target.value)
  }
  const mainIssueHandler = (e) => {
    setMainIssue(e.target.value)
  }
  const improveAreaHandler = (e) => {
    setImproveArea(e.target.value)
  }
  const achieveHandler = (e) => {
    setAchieveArea(e.target.value)
  }


  const submitForm = async (e) => {
    //e.preventDefault();
    const data = {industry,employee, goal,workflow,manualWorks,mainIssue,improveArea,achieveArea }
    console.log("data",data)
    setLoading(true)
    try {
      const apiRes = await editUser(data).unwrap();
      console.log(apiRes)
      console.log(apiRes.success)
      if(apiRes.success){
        setLoading(false)
          setStep(9)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const loginRouteHandler = () => {
    navigate('/login')
  }


  return (
    <>
      <section className="sec-header py-4">
        <div className="container">
          <div className="header flex flex-row flex-nowrap justify-between items-center">
            <Link to="/"><img src={Logo} alt="" /></Link>
            <div className="user_av">
              <p className="bg-primary-blue text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-medium font-poppins">{userShort}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="settings_steps mt-24 mb-40">
        <div className="container">
          <div className="settings_outer max-w-[740px] mx-auto bg-gradient-to-r from-[#ECECEC] to-[#494340] w-100 h-100 p-[1px] rounded-xl">
            <div className="settings_inner   p-10 bg-black rounded-xl">
              
              {step !==9 && ( <>
                <div className="step_box flex items-center gap-6">
                  <div className="stepbar_wrap relative w-full" ref={divRef}>
                    <div className="steptotal absolute top-0 h-2 w-full bg-[#FF631480]/50"></div>
                    <div className="stepcurrent absolute top-0 h-2 bg-[#FF6314]" style={{ width: `${width}px` }}></div>
                  </div>
                  <div className="stepCount">{step}/{totalStep}</div>
                </div>

                <div className="formContent mt-12">
                  <form >

                    {step == 1 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">What industry does your company operate in?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "industry" id ="technology" value="Technology" onChange={industryHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4 ' htmlFor="technology">
                          <img className='normal' src={Radio} alt="" />
                          <img className='selected' src={RadioSelected} alt="" />                       
                            Technology
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "industry" id ="healthcare" value="Healthcare" onChange={industryHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="healthcare">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" /> 
                            Healthcare
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "industry" id ="Finance" value="Finance" onChange={industryHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="Finance">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Finance
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "industry" id ="Education" value="Education" onChange={industryHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="Education">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Education            
                          </label>
                        </div>
                      </div>

                    </div>
                    )}
                    {step == 2 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">How many employees does your company have?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "employee" id ="1t10" value="1-10 employees" onChange={employeeHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4 ' htmlFor="1t10">
                          <img className='normal' src={Radio} alt="" />
                          <img className='selected' src={RadioSelected} alt="" />                       
                            1-10 employees
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "employee" id ="11to50" value="11-50 employees" onChange={employeeHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="11to50">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" /> 
                            11-50 employees
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "employee" id ="51t200" value="51-200 employees" onChange={employeeHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="51t200">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            51-200 employees
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "employee" id ="201t500" value="201-500 employees" onChange={employeeHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="201t500">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            201-500 employees            
                          </label>
                        </div>
                      </div>

                    </div>
                    )}

                    {step == 3 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">What are the main goals and objectives of your company?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "goal" id ="increaseRevenue" value="Increase revenue and profitability" onChange={goalHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="increaseRevenue">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Increase revenue and profitability
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "goal" id ="customerSatisfaction" value="Enhance customer satisfaction and loyalty" onChange={goalHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="customerSatisfaction">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Enhance customer satisfaction and loyalty
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "goal" id ="marketPresence" value="Expand market presence and reach" onChange={goalHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="marketPresence">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Expand market presence and reach
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "goal" id ="innovate" value="Innovate and develop new products or services" onChange={goalHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="innovate">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Innovate and develop new products or services
                          </label>
                        </div>
                      </div>

                    </div>
                    )}

                    {step == 4 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">Can you describe your current workflow?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "workflow" id ="fullyManual" value="Fully manual" onChange={workflowHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="fullyManual">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Fully manual
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "workflow" id ="mostlyManual" value="Mostly manual with some automation" onChange={workflowHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="mostlyManual">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                         
                            Mostly manual with some automation
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "workflow" id ="balanced" value="Balanced mix of manual and automated processes" onChange={workflowHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="balanced">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                        
                            Balanced mix of manual and automated processes
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "workflow" id ="auto" value="Mostly automated with minimal manual intervention" onChange={workflowHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="auto">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />                       
                            Mostly automated with minimal manual intervention
                          </label>
                        </div>
                      </div>

                    </div>
                    )}

                    {step == 5 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">Which processes in your workflow are currently done manually?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "manualWorks" id ="dataEntry" value="Data entry and data processing" onChange={manualWorksHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="dataEntry">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Data entry and data processing
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "manualWorks" id ="reporting" value="Reporting and documentation" onChange={manualWorksHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="reporting">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Reporting and documentation
                            </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "manualWorks" id ="qnt" value="Quality assurance and testing" onChange={manualWorksHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="qnt">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Quality assurance and testing
                            </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "manualWorks" id ="customer" value="Customer support and communication" onChange={manualWorksHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="customer">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Customer support and communication
                          </label>
                        </div>
                      </div>

                    </div>
                    )}                
                    {step == 6 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">What are the main issues or challenges you face with your current workflow?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "mainIssue" id ="highError" value="High error rates and inaccuracies"  onChange={mainIssueHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="highError">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            High error rates and inaccuracies
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "mainIssue" id ="timeConsuming" value="Time-consuming and inefficient processes"  onChange={mainIssueHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="timeConsuming">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Time-consuming and inefficient processes
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "mainIssue" id ="scalability" value="Lack of scalability and flexibility" onChange={mainIssueHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="scalability">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Lack of scalability and flexibility
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "mainIssue" id ="communication" value="Poor communication and collaboration among team members" onChange={mainIssueHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="communication">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Poor communication and collaboration among team members
                          </label>
                        </div>
                      </div>

                    </div>
                    )}
                                      
                    {step == 7 && (
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">Have you identified any areas where you think automation could improve your workflow?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "improveArea" id ="dataE" value="Data entry and data processing"  onChange={improveAreaHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="dataE">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Data entry and data processing
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "improveArea" id ="taskManagement" value="Task scheduling and project management"  onChange={improveAreaHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="taskManagement">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Task scheduling and project management
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "improveArea" id ="customersns" value="Customer support and service"  onChange={improveAreaHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="customersns">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Customer support and service
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "improveArea" id ="qant" value="Quality assurance and testing" onChange={improveAreaHandler} />
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="qant">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Quality assurance and testing
                          </label>
                        </div>
                      </div>

                    </div>
                    )}

                    {step == 8 && ( 
                      <div className="formStep1">
                      <h2 className="text-4xl font-raleway font-semibold mb-12">What do you want to achieve through your DATU experience?</h2>

                      <div className="formGroup flex flex-col gap-5">

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio" className="onboarding" name = "goalArea" id ="ienp" value="Increase efficiency and productivity" onChange={achieveHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="ienp">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Increase efficiency and productivity
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "goalArea" id ="idanr" value="Improve data accuracy and reliability" onChange={achieveHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="idanr">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Improve data accuracy and reliability
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "goalArea" id ="ecens" value="Enhance customer experience and satisfaction" onChange={achieveHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="ecens">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Enhance customer experience and satisfaction
                          </label>
                        </div>

                        <div className="inputGroup flex gap-4 py-7 px-6 bg-primary-black">
                          <input type="radio"  className="onboarding" name = "goalArea" id ="roc" value="Reduce operational costs" onChange={achieveHandler}/>
                          <label className='font-raleway text-lg font-semibold cursor-pointer flex gap-4' htmlFor="roc">
                            <img className='normal' src={Radio} alt="" />
                            <img className='selected' src={RadioSelected} alt="" />
                            Reduce operational costs
                          </label>
                        </div>
                      </div>

                    </div>
                    )}
  


                    <div className="formButton flex justify-between items-center mt-[18px]">
                      <div onClick={prevHandler} className="prev cursor-pointer border rounded-[100px] px-[24px] py-[10px] font-medium hover:bg-primary-black hover:border-primary-blue">Back</div>
                        
                      
                      <div className="nextPrev flex items-center gap-6">
                        <p onClick={skipHandler} className="skip text-base font-medium cursor-pointer hover:text-primary-blue">Skip</p>
                        
                        {step !== 8 && (
                          <div onClick={nextHandler} className="next cursor-pointer bg-primary-blue border border-black text-white px-[65px] py-[10px] rounded-[100px] font-semibold hover:bg-primary-black hover:border-primary-blue ">Next</div>
                        )}
                        

                        {step == 8 && (
                          <div onClick={submitForm} className="next cursor-pointer bg-primary-blue border border-black text-white px-[65px] py-[10px] rounded-[100px] font-semibold hover:bg-primary-black hover:border-primary-blue ">Done</div>

                        )}

                      </div>
                    </div>



                  </form>
                </div>

              </>
              )}

              {step == 9 && (
                <div className="flex items-center justify-center flex-col">
                  <img src={Success} alt="" />
                  <p className="text-[30px] text-center mt-6 mb-3">You have successfully completed the onboarding process.</p>
                  <p className="text-center">You're now ready to explore all the features we offer. If you need any assistance, feel free to reach out to our support team.</p>
                  <div className="my-8 next cursor-pointer bg-primary-blue border border-black text-white px-6 py-3 rounded-[100px] font-semibold hover:bg-primary-black hover:border-primary-blue ">Explore Dashboard</div>
                  <div className="flex gap-2 cursro-pointer cursor-pointer" onClick={loginRouteHandler}><img src={ArrowLeft} alt="" /><span className="text-sm">Back to log in</span></div>
                </div>
              )}

              {loading && (
                <div className="loading fixed w-full h-full top-0 left-0 bg-black flex items-center justify-center">
                  <img src={Loading} className='w-52 mx-auto block' alt="" />
                </div>

              )}

              

            </div>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default OnBoarding