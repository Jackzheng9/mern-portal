import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allNotifications:[],
  readNotifications:[],
  personalNotifications:[]
}

const notifiationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers:{
    setAllNotifications : (state,action) => {
      console.log("payload",action.payload)
      // state.allNotifications = [...action.payload]
    },
    setReadNotifications : (state,action) => {
      state.readNotifications = [...action.payload]
    },
    setPersonalNotifications : (state,action) => {
      state.personalNotifications = [...action.payload]
    }
  }
})

export const {setAllNotifications,setReadNotifications,setPersonalNotifications } = notifiationSlice.actions;
export default notifiationSlice.reducer;