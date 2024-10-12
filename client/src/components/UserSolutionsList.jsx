import React from 'react'
import UserSolutionListItem from './UserSolutionListItem'


const UserSolutionsList = ({solutions}) => {
  

  if(!solutions){
    return "Loading..."
  }

  // console.log("solutions on list comp",solutions )
  if(solutions.length == 0 ){
    return "No solution found!"
  }

  return (
    <div className='flex gap-6  flex-wrap'>

      {solutions.map(solution => <UserSolutionListItem key={solution._id} solution={solution} />)}

    </div>
  )
}

export default UserSolutionsList