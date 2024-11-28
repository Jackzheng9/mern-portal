import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allNotifications:[],
  unReadNotifications:[]
}

const notifiationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers:{
    setAllNotifications : (state,action) => {
      console.log("payload",action.payload)
      state.allNotifications = action.payload
    },
    setUnReadNotifications : (state,action) => {
      state.unReadNotifications = [...action.payload]
    }
  }
})

export const {setAllNotifications,setUnReadNotifications } = notifiationSlice.actions;
// export const {setAllNotifications} = notifiationSlice.actions;
export default notifiationSlice.reducer;