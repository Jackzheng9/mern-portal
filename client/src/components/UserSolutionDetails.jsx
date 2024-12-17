import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { useGetSolutionBySlugQuery } from '../slices/solutionApiSlice';
import Roman1 from '../assets/roman-1.svg'
import Roman2 from '../assets/roman-2.svg'
import Roman3 from '../assets/roman-3.svg'
import Roman4 from '../assets/roman-4.svg'
import CTA from './CTA';

const UserSolutionDetails = () => {
  const {slug} = useParams();
  //console.log(slug)
  const [activeTab, setActiveTab] = useState(1)
  const {data, isLoading, isError} = useGetSolutionBySlugQuery(slug);
  console.log("Data",data)

  if(isLoading){
    return 'Loading...'
  }

  if(!isLoading && isError){
    return 'Something went wrong!'
  }

  const solution = data.solution;

  return (
    <div className='solution_content'>
      
      <div className="solution_header flex flex-col tab:flex-row gap-8 tab:gap-16 mt-12 items-center">
        <div className="w-full">
          <h1 className="font-semibold text-3xxl tab:text-5xl color-[#F8F8F8] mb-4 tab:mb-8 leading-tight">{solution.title}</h1>
          <p className="text-xl">The supply chain is the backbone of any business. Our AI-driven supply chain automation solutions streamline and optimize every aspect of your supply chain, from procurement to delivery. By leveraging advanced algorithms and machine learning, we enable real-time tracking, predictive analytics, and intelligent decision-making.
          Our solution adapts to your business needs, ensuring a more efficient and responsive supply chain.</p>

        </div>

        <div className="w-full">
          <img className='rounded-lg w-full h-[358px] tab:h-auto' src={solution.image} alt="" />
        </div>

      </div>

      <div className="solution_benefits mt-12">
        <h2 className="text-2xxl tab:text-5xl font-semibold mb-8">Benefits</h2>
        
        <div className="benefits_wrap flex flex-wrap ">
          
          {solution.benefits.map(benefit => {
            return (
              <div className="benefit flex flex-col items-center text-center p-6 w-1/2 md:w-1/4">
                <img className='w-20 mb-9' src={benefit.image} alt="" />
                <p className="font-semibold text-lg mb-6 text-center ">{benefit.title} </p>
                <p className="text-[#BFC0C1]">{benefit.desc} </p>
              </div>
            )
          })}

        </div>
      </div>

      <div className="solution_workflow mt-12">
        <h2 className="text-2xxl tab:text-5xl text-center font-semibold mb-8">Workflow</h2>

        {solution.workflows.map(workflow => (
          <div className="workflow_item flex flex-col tab:flex-row mb-8">
            <div className="w-full p-4 tab:p-16 text-2xl tab:text-3xl font-bold uppercase border-r border-[#414141]">{workflow.title}</div>
            <div className="w-full px-4 py-2 tab:px-20 tab:py-20">
              <p className="text-[#BFC0C1]">{workflow.desc}</p>
              <img src={workflow.image} className='mt-8 block mx-auto' alt="" />
            </div>
          </div>

        ))}

      </div>

      <div className="solution_workflow mt-12 flex flex-col tab:flex-row">
        <div className="flex flex-col w-full">
          <div className="max-w-[386px]">
            <h2 className="text-2xxl tab:text-5xl font-semibold mb-4">Tools and technology</h2>
            <p className="text-[#BFC0C1]">Essential resources and systems that facilitate the development, implementation, and optimization of various processes and solutions across industries, driving innovation and efficiency.</p>
          </div>

          
        </div>

        <div className=" w-full">
          {solution.tools.map((tool,index) => (
            <div className="workflow_item flex flex-col p-8 bg-[#1C1C1C] mb-4 relative">
              {index == 0 ? (<img className='w-8 absolute -left-3' src={Roman1} />) : null}
              {index == 1 ? (<img className='w-8 absolute -left-3' src={Roman2} />) : null}
              {index == 2 ? (<img className='w-8 absolute -left-3' src={Roman3} />) : null}
              {index == 3 ? (<img className='w-8 absolute -left-3' src={Roman4} />) : null}
              <h3 className="mb-3 text-base tab:text-2xl font-bold">{tool.title}</h3>
              <p className="text-[#BFC0C1] text-sm tab:text-base">{tool.desc}</p>
            </div>

          ))}

        </div>
        

      </div>

      <div className="features mt-12">
        <h2 className="text-2xxl tab:text-5xl font-semibold mb-6 tab:mb-14 ">Features</h2>
        <div className="flex flex-col tab:flex-row features_wrap gap-4">

          {solution.features.map(feature => (
            
            <div className="feature px-10 py-6 bg-[#1C1C1C]">
              <img src={feature.image} alt="" className="mb-6" />
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-[#BFC0C1]">{feature.desc}</p>
            </div>

          ))}

        </div>
      </div>

      <div className="process mt-24">
        <h2 className="text-2xxl tab:text-5xl font-semibold mb-6 tab:mb-14 ">Our Process</h2>
        <div className="tabs_area">
          
          <div className="tabs_title">
            <ul className='flex tabs_title_list' >
              <li onClick={() => setActiveTab(1)} className={`font-bold text-sm sm:text-base md:text-2xl py-6 tab:py-8 px-3.5 tab:px-16 cursor-pointer text-center ${activeTab == 1 ? "border-b-4 border-[#0049FF]" : null}`}>Planning and propsel</li>
              <li onClick={() => setActiveTab(2)} className={`font-bold text-sm sm:text-base md:text-2xl py-6 tab:py-8 px-3.5 tab:px-16 cursor-pointer text-center ${activeTab == 2 ? "border-b-4 border-[#0049FF]" : null}`}>Design and Planning</li>
              <li onClick={() => setActiveTab(3)} className={`font-bold text-sm sm:text-base md:text-2xl py-6 tab:py-8 px-3.5 tab:px-16 cursor-pointer text-center ${activeTab == 3 ? "border-b-4 border-[#0049FF]" : null}`}>Development and Deployment</li>
            </ul>
          </div>

          <div className="tabs_content mt-6 tab:mt-11">
            
            {activeTab == 1 && (
              <div className="bg-[#1C1C1C] ">
                
              <div className="tab_content_point mb-4 p-8 tab:p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">1- Initial Call</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0 shrink-0">Dur: 1hr</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Discuss the client's problems, issues, and requirements.<br/>
                <b>Participants:</b> Client, Project Manager, Business Analyst.</p>
              </div>              
              
              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">2- Proposal Document Preparation</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Prepare a document outlining the proposed solution, including features, relative information, and expected outcomes.<br/>
                <b>Participants:</b> Project Manager, Business Analyst, Solution Architect.</p>
              </div>            
              

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">3- Discussion on Proposed Solution</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 2hr</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Review and discuss the proposed solution document with the client to ensure alignment and address any concerns.<br/>
                <b>Participants:</b> Client, Project Manager, Business Analyst, Solution Architect.</p>
              </div>

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">4- Approval of Proposed Solution</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Obtain formal approval from the client on the proposed solution.<br/>
                <b>Participants:</b>  Client, Project Manager.</p>
              </div>


            </div>

            )}


            {activeTab == 2 && (
              <div className="bg-[#1C1C1C]">
                
              <div className="tab_content_point mb-4 p-8 tab:p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">1- Planning and Research</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 2 days</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Conduct initial research and define the project's scope, objectives, and requirements.<br/>
                <b>Participants:</b> Software Business Analyst</p>
              </div>              
              
              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">2- Wireframes and Design</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 2 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Based on the project scope, create UI and UX designs for the tool, ensuring user-friendly interfaces and workflows.<br/>
                <b>Participants:</b> Designer, Project Manager</p>
              </div>            
              

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">3- Get Approval from the Client</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Present wireframes and designs to the client for review and obtain feedback.<br/>
                <b>Participants:</b> Project Manager, Client</p>
              </div>

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">4- Work on Feedback and Finalize Design</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Incorporate client feedback, refine the designs, and finalize the tool's UI/UX.<br/>
                <b>Participants:</b> Designer, Project Manager</p>
              </div>


            </div>

            )}

            {activeTab == 3 && (
              <div className="bg-[#1C1C1C] ">
                
              <div className="tab_content_point mb-4 p-8 tab:p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">1- Frontend Development</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 3-4 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Develop the user interface based on the approved designs, ensuring responsiveness and interactivity.<br/>
                <b>Participants:</b> Frontend Developers</p>
              </div>              
              
              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">2- Backend Development</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 4-6 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Build and integrate server-side logic, databases, and APIs to support frontend functionality.<br/>
                <b>Participants:</b> Backend Developers</p>
              </div>            
              

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">3- Quality Assurance (QA)</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 2 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Test the tool for functionality, usability, and performance, ensuring it meets all requirements.<br/>
                <b>Participants:</b> QA Engineers</p>
              </div>

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">4- Deployment</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Deploy the finalized tool to the production environment, ensuring proper configuration and readiness.<br/>
                <b>Participants:</b> Development Team, DevOps Engineers</p>
              </div>

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">5- Delivery</p>
                  <p className="time bg-[#F87A46] px-2 h-8 flex items-center font-medium rounded-[100px] text-black shrink-0">Dur: 1-2 days</p>

                </div>
                
                <p className="text-[#BFC0C1]"><b>Objective:</b> Hand over the tool to the client with all necessary documentation and provide initial training or support as needed.<br/>
                <b>Participants:</b> Development Team, Project Manager, Client</p>
              </div>


            </div>

            )}



      
                       


          </div>


        </div>
      </div>

      <div className="h-8"></div>
      <CTA />


    </div>
  )
}

export default UserSolutionDetails