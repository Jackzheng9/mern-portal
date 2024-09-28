import apiSlice from "./apiSlice";

const SOLUTION_URL = '/api/solutions'

export const solutionApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) =>({
    addSolution: builder.mutation({
      query : (data) =>({
        url:`${SOLUTION_URL}/newsolution`,
        method: "POST",
        body:data
      })
    }),


  })
})


export const {useAddSolutionMutation} = solutionApiSlice;