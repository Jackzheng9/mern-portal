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

    getResourceBySlug: builder.query({
      query : (slug) =>({
        url:`${RESOURCES_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: ['Resources'],
    }),

    editResource: builder.mutation({
      query : (data) =>({
        url:`/api/resources/edit`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Resources'],
    }),

    deleteResource: builder.mutation({
      query : (data) =>({
        url:`${RESOURCES_URL}/delete`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Resources'],
    }),

  })
})


export const {useGetSignatureMutation, useCreateResourceMutation, useGetResourceQuery, useGetResourceBySlugQuery, useEditResourceMutation, useDeleteResourceMutation} = resourceApiSlice;