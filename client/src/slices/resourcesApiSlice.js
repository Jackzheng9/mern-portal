import apiSlice from "./apiSlice";

const RESOURCES_URL = '/api/resources'

export const resourceApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) =>({

    getSignature: builder.mutation({
      query : (data) =>({
        url:`/api/gensignature`,
        method: "POST",
        body:data
      }),
    }),

    createResource: builder.mutation({
      query : (data) =>({
        url:`/api/resources/newresource`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Resources'],
    }),

    getResource: builder.query({
      query : () =>({
        url:`/api/resources/`,
        method: "GET"
      }),
      providesTags: ['Resources'],
    }),









  })
})


export const {useGetSignatureMutation, useCreateResourceMutation, useGetResourceQuery} = resourceApiSlice;