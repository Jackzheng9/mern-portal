import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allNotifications:[],
  readNotifications:[]
}

const notifiationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers:{
    setAllNotifications : (state,action) => {
      console.log("payload",action.payload)
      state.allNotifications = action.payload
    },
    setReadNotifications : (state,action) => {
      state.readNotifications = [...state.readNotifications, ...action.payload]
    }
  }
})

export const {setAllNotifications,setReadNotifications } = notifiationSlice.actions;
// export const {setAllNotifications} = notifiationSlice.actions;
export default notifiationSlice.reducer;