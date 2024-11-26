import React from 'react'
import { Link } from 'react-router-dom'

const HomeSolution = ({solution}) => {
  console.log("solution", solution)
  return (
    <Link to= {`/solutions/${solution.slug}`} className="solution bg-[#1C1C1C] w-1/3">
      <img className='w-full h-[233px]' src={solution.image} alt="" />
      <div className="sol_content px-6 pb-6 mt-6">
        <h2 className="text-lg font-medium mb-4">{solution.title}</h2>
        <p className="">{solution.shortDesc}</p>
      </div>
    </Link>
  )
}

export default HomeSolution