import apiSlice from "./apiSlice";

const SUPPORT_URL = '/api/support'

export const supportApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) =>({

    createSupport: builder.mutation({
      query : (data) =>({
        url:`${SUPPORT_URL}/new`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Support'],
    }),

    getSupport: builder.query({
      query : () =>({
        url:`${SUPPORT_URL}`,
        method: "GET"
      }),
      providesTags: ['Support'],
    }),



    editSupport: builder.mutation({
      query : (data) =>({
        url:`${SUPPORT_URL}/edit`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Support'],
    }),


    deleteSupport: builder.mutation({
      query : (data) =>({
        url:`${SUPPORT_URL}/delete`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Support'],
    }),






  })
})


export const {useCreateSupportMutation, useGetSupportQuery, useEditSupportMutation, useDeleteSupportMutation} = supportApiSlice;