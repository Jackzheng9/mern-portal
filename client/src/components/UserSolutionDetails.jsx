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
  // console.log("solution", solution)


  // const romans = ["I","II","III","IV","V","VI","VII","VIII","IX","X"]

  return (
    <div className='solution_content'>
      
      <div className="solution_header flex gap-16 mt-12 items-center">
        <div className="w-full">
          <h1 className="font-semibold text-5xl color-[#F8F8F8] mb-8 leading-tight">{solution.title}</h1>
          <p className="text-xl">The supply chain is the backbone of any business. Our AI-driven supply chain automation solutions streamline and optimize every aspect of your supply chain, from procurement to delivery. By leveraging advanced algorithms and machine learning, we enable real-time tracking, predictive analytics, and intelligent decision-making.
          Our solution adapts to your business needs, ensuring a more efficient and responsive supply chain.</p>

        </div>

        <div className="w-full">
          <img src={solution.image} alt="" />
        </div>

      </div>

      <div className="solution_benefits mt-12">
        <h2 className="text-5xl font-semibold mb-8">Benefits</h2>
        
        <div className="benefits_wrap flex gap-4">
          
          {solution.benefits.map(benefit => {
            return (
              <div className="benefit flex flex-col items-center text-center p-6">
                <img className='w-20 mb-9' src={benefit.image} alt="" />
                <p className="font-semibold text-lg mb-6">{benefit.title} </p>
                <p className="">{benefit.desc} </p>
              </div>
            )
          })}

        </div>
      </div>

      <div className="solution_workflow mt-12">
        <h2 className="text-5xl text-center font-semibold mb-8">Workflow</h2>

        {solution.workflows.map(workflow => (
          <div className="workflow_item flex mb-8">
            <div className="w-full p-16 text-3xl font-bold uppercase border-r border-[#414141]">{workflow.title}</div>
            <div className="w-full p-20">
              <p className="">{workflow.desc}</p>
              <img src={workflow.image} alt="" />
            </div>
          </div>

        ))}

      </div>

      <div className="solution_workflow mt-12 flex">
        <div className="flex flex-col w-full">
          <div className="max-w-[386px]">
            <h2 className="text-5xl font-semibold mb-4">Tools and technology</h2>
            <p className="">Essential resources and systems that facilitate the development, implementation, and optimization of various processes and solutions across industries, driving innovation and efficiency.</p>
          </div>

          
        </div>

        <div className=" w-full">
          {solution.tools.map((tool,index) => (
            <div className="workflow_item flex flex-col p-8 bg-[#1C1C1C] mb-4 relative">
              {index == 0 ? (<img className='w-8 absolute -left-3' src={Roman1} />) : null}
              {index == 1 ? (<img className='w-8 absolute -left-3' src={Roman2} />) : null}
              {index == 2 ? (<img className='w-8 absolute -left-3' src={Roman3} />) : null}
              {index == 3 ? (<img className='w-8 absolute -left-3' src={Roman4} />) : null}
              <h3 className="mb-3 text-2xl font-bold">{tool.title}</h3>
              <p className="text-[#BFC0C1]">{tool.desc}</p>
            </div>

          ))}

        </div>
        

      </div>

      <div className="features mt-12">
        <h2 className="text-5xl font-semibold mb-14 ">Features</h2>
        <div className="flex features_wrap gap-4">

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
        <h2 className="text-5xl font-semibold mb-14 ">Our Process</h2>
        <div className="tabs_area">
          
          <div className="tabs_title">
            <ul className='flex tabs_title_list' >
              <li onClick={() => setActiveTab(1)} className={`font-bold text-2xl py-8 px-16 cursor-pointer ${activeTab == 1 ? "border-b-4 border-[#0049FF]" : null}`}>Planning and propsel</li>
              <li onClick={() => setActiveTab(2)} className={`font-bold text-2xl py-8 px-16 cursor-pointer ${activeTab == 2 ? "border-b-4 border-[#0049FF]" : null}`}>Design and Planning</li>
              <li onClick={() => setActiveTab(3)} className={`font-bold text-2xl py-8 px-16 cursor-pointer ${activeTab == 3 ? "border-b-4 border-[#0049FF]" : null}`}>Development and Deployment</li>
            </ul>
          </div>

          <div className="tabs_content">
            
            {activeTab == 1 && (
              <div className="bg-[#1C1C1C] mt-11">
                
              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">1- Initial Call</p>
                  <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1hr</p>

                </div>
                
                <p className="text-[#BFC0C1]">Objective: Discuss the client's problems, issues, and requirements.
                Participants: Client, Project Manager, Business Analyst.</p>
              </div>              
              
              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">2- Proposal Document Preparation</p>
                  <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]">Objective: Prepare a document outlining the proposed solution, including features, relative information, and expected outcomes.
                Participants: Project Manager, Business Analyst, Solution Architect.</p>
              </div>            
              

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">3- Discussion on Proposed Solution</p>
                  <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 2hr</p>

                </div>
                
                <p className="text-[#BFC0C1]">Objective: Review and discuss the proposed solution document with the client to ensure alignment and address any concerns.
                Participants: Client, Project Manager, Business Analyst, Solution Architect.</p>
              </div>

              <div className="tab_content_point mb-4 p-14">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-2xl">4- Approval of Proposed Solution</p>
                  <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1 w</p>

                </div>
                
                <p className="text-[#BFC0C1]">Objective: Obtain formal approval from the client on the proposed solution.
                Participants:  Client, Project Manager.</p>
              </div>


            </div>

            )}


            {activeTab == 2 && (
              <div className="bg-[#1C1C1C] mt-11">
              
                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">1- Design & Planning</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1hr</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Discuss the client's problems, issues, and requirements.
                  Participants: Client, Project Manager, Business Analyst.</p>
                </div>              
                
                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">2- Proposal Document Preparation</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1 w</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Prepare a document outlining the proposed solution, including features, relative information, and expected outcomes.
                  Participants: Project Manager, Business Analyst, Solution Architect.</p>
                </div>            
                

                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">3- Discussion on Proposed Solution</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 2hr</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Review and discuss the proposed solution document with the client to ensure alignment and address any concerns.
                  Participants: Client, Project Manager, Business Analyst, Solution Architect.</p>
                </div>

                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">4- Approval of Proposed Solution</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1 w</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Obtain formal approval from the client on the proposed solution.
                  Participants:  Client, Project Manager.</p>
                </div>


              </div> 

            )}


            {activeTab == 3 && (
              <div className="bg-[#1C1C1C] mt-11">
                
                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">Development</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1hr</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Discuss the client's problems, issues, and requirements.
                  Participants: Client, Project Manager, Business Analyst.</p>
                </div>              
                
                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">2- Proposal Document Preparation</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1 w</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Prepare a document outlining the proposed solution, including features, relative information, and expected outcomes.
                  Participants: Project Manager, Business Analyst, Solution Architect.</p>
                </div>            
                

                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">3- Discussion on Proposed Solution</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 2hr</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Review and discuss the proposed solution document with the client to ensure alignment and address any concerns.
                  Participants: Client, Project Manager, Business Analyst, Solution Architect.</p>
                </div>

                <div className="tab_content_point mb-4 p-14">
                  <div className="flex justify-between mb-4">
                    <p className="font-bold text-2xl">4- Approval of Proposed Solution</p>
                    <p className="time bg-[#F87A46] px-8 h-8 flex items-center font-medium rounded-[100px] text-black">Dur: 1 w</p>

                  </div>
                  
                  <p className="text-[#BFC0C1]">Objective: Obtain formal approval from the client on the proposed solution.
                  Participants:  Client, Project Manager.</p>
                </div>


              </div>

            )}        
                       


          </div>


        </div>
      </div>

      <CTA />


    </div>
  )
}

export default UserSolutionDetails