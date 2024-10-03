import React from 'react'

import SolutionListOptions from './SolutionListOptions'

const SolutionListItem = ({solution}) => {
  return (
    <div className="flex items-center py-5">

      <div className=" flex items-center gap-4 grow-[2] basis-0"><img src={solution.image} className='w-8 h-8' alt="" /><p className="">{solution.title}</p></div>
      <div className="grow basis-0">{solution.status}</div>
      <div className="grow basis-0">date</div>
      <div className="grow basis-0">{solution.category}</div>
      <SolutionListOptions solution={solution} />
      
    </div> 
  )
}

export default SolutionListItem