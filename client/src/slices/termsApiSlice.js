import apiSlice from "./apiSlice";

const TERMS_URL = '/api/terms'

export const termsApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) =>({

    getTerms: builder.query({
      query : () =>({
        url:`${TERMS_URL}/`,
        method: "GET",
      }),
      providesTags:["Terms"]
    }),


    editTerms: builder.mutation({
      query : (data) =>({
        url:`${TERMS_URL}/edit`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Terms'],
    }),


  })
})


export const {useGetTermsQuery, useEditTermsMutation} = termsApiSlice;