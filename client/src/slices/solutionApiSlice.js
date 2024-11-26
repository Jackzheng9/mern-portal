import apiSlice from "./apiSlice";

const SOLUTION_URL = '/api/solutions'

export const solutionApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) =>({

    addSolution: builder.mutation({
      query : (data) =>({
        url:`${SOLUTION_URL}/newsolution`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Solutions'],
    }),

    getAllSolution: builder.query({
      query : () =>({
        url:`${SOLUTION_URL}/`,
        method: "GET",
      }),
      providesTags: ['Solutions'],
    }),

    getSolutions: builder.query({
      query : () =>({
        url:`${SOLUTION_URL}/all`,
        method: "GET",
      }),
      providesTags: ['Solutions'],
    }),

    getSolutionBySlug: builder.query({
      query : (slug) =>({
        url:`${SOLUTION_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: ['Solutions'],
    }),

    editSolution: builder.mutation({
      query : (data) =>({
        url:`${SOLUTION_URL}/edit`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Solutions'],
    }),

    deleteSolution: builder.mutation({
      query : (data) =>({
        url:`${SOLUTION_URL}/delete`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Solutions'],
    }),


  })
})


export const {useAddSolutionMutation, useGetAllSolutionQuery, useGetSolutionBySlugQuery, useEditSolutionMutation, useGetSolutionsQuery, useDeleteSolutionMutation} = solutionApiSlice;