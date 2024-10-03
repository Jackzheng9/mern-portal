import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSolutionBySlugQuery } from '../../slices/solutionApiSlice';

const SolutionDetails = () => {
  const {slug} = useParams();

  const {data, isLoading, isError } = useGetSolutionBySlugQuery(slug);
  console.log("data",data)
  return (
    <div>SolutionDetails of {slug}</div>
  )
}

export default SolutionDetails