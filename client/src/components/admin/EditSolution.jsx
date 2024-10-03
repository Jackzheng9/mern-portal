import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSolutionBySlugQuery } from '../../slices/solutionApiSlice';
import EditSolutionForm from './EditSolutionForm';

const EditSolution = () => {
  const {slug} = useParams();
  // console.log("slug", slug)
  const {data, isLoading, isError } = useGetSolutionBySlugQuery(slug);
  console.log("data from solution by id",data)
  let content = '';
  if(isLoading){
    content = "Loading..."
  }
  if(!isLoading && isError){
    content = "Something went wrong!"
  }
  if(!isLoading && !isError && data){
    content = <EditSolutionForm solution = {data.solution} />
  }
  return (
    <div>{content}</div>
  )
}

export default EditSolution