import React from 'react'
import SolImg from '../assets/solution-1.png'
import {Link} from 'react-router-dom'


const UserSolutionListItem = ({solution}) => {
  return (
    <Link to={`/solutions/${solution.slug}`} className="single_solution bg-[#1C1C1C] rounded-xl w-[30%]">
      <img src={SolImg} className='rounded-t-xl' alt="" />
      <div className="solInfo p-6">
        <h2 className="text-lg font-medium ">{solution.title}</h2>
        <p className="leading-6">{solution.shortDesc}</p>
      </div>
    </Link>
  )
}

export default UserSolutionListItem