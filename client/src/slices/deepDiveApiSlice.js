import apiSlice from "./apiSlice";

const DEEPDIVE_URL = '/api/deepdive'

export const deepDiveApiSlice = apiSlice.injectEndpoints({
  
  endpoints:(builder) =>({
    
    createDeepDive: builder.mutation({
      query : (data) =>({
        url:`${DEEPDIVE_URL}/new`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['DeepDive'],

    }),
   
    getDeepDives:builder.query({
      query:() => ({
        url:`${DEEPDIVE_URL}/`,
        method: "GET" ,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
      providesTags: ['DeepDive'],
    }),
   
    editDeepDive:builder.mutation({
      query:(data) => ({
        url:`${DEEPDIVE_URL}/edit`,
        method: "POST" ,
        body:data,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
      invalidatesTags: ['DeepDive'],
    }),

    deleteDeepDive:builder.mutation({
      
      query:(data) => ({
        url:`${DEEPDIVE_URL}/delete`,
        method: "POST" ,
        body:data,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
      invalidatesTags: ['DeepDive'],
    }),


  })
})


export const {useCreateDeepDiveMutation, useEditDeepDiveMutation, useGetDeepDivesQuery, useDeleteDeepDiveMutation} = deepDiveApiSlice;