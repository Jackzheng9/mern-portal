import apiSlice from "./apiSlice";

const NOTIFICATION_URL = '/api/notifications'

export const notificationApiSlice = apiSlice.injectEndpoints({
  
  endpoints:(builder) =>({
    
    createNotification: builder.mutation({
      query : (data) =>({
        url:`${NOTIFICATION_URL}/new`,
        method: "POST",
        body:data
      }),
      providesTags: ['Notifications'],

    }),
   
    getNotifications:builder.query({
      query:() => ({
        url:`${NOTIFICATION_URL}/`,
        method: "GET" ,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
      providesTags: ['Notifications'],
    }),


  })
})


export const {useCreateNotificationMutation, useGetNotificationsQuery} = notificationApiSlice;