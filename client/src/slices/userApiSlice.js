import apiSlice from "./apiSlice";

const USERS_URL = '/api/users'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) =>({
    register: builder.mutation({
      query : (data) =>({
        url:`${USERS_URL}/register`,
        method: "POST",
        body:data
      })
    }),
    login:builder.mutation({
      query:(data) => ({
        url:`${USERS_URL}/login`,
        method: "POST",
        body:data
      })
    }),
    getUsers:builder.query({
      query:() => ({
        url:`${USERS_URL}/admin/users`,
        method: "GET" ,
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),
    getUserById:builder.query({
      query:({id}) => ({
        url:`${USERS_URL}/admin/users/${id}`,
        method: "GET",
      })
    }),
    getUserByEmail:builder.mutation({
      query:(data) => ({
        url:`${USERS_URL}/getUser`,
        method: "POST",
        body:data
      })
    }),
    editUserAdmin:builder.mutation({
      query:(data) => ({
        url:`${USERS_URL}/admin/useredit`,
        method: "POST",
        body:data
      })
    }),
    editUser:builder.mutation({
      query:(data) => ({
        url:`${USERS_URL}/edituser`,
        method: "POST",
        body:data
      })
    }),
    setUserPass:builder.mutation({
      query:(data) => ({
        url:`${USERS_URL}/setpassword`,
        method: "POST",
        body:data
      })
    }),

  })
})


export const {useRegisterMutation, useLoginMutation, useGetUsersQuery, useGetUserByIdQuery, useEditUserMutation, useLazyGetUserByIdQuery, useGetUserByEmailMutation, useEditUserAdminMutation, useSetUserPassMutation } = userApiSlice;