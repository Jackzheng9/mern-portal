import { createSlice } from "@reduxjs/toolkit";
/*
const initialState = {
  role : "",
  status : "",
  firstName : "",
  lastName : "",
  email : "",
  phone : "",
  city : "",
  state : "",
  country : "",
  timezone : "",
  image : "",
  role : "",
  role : "",
  role : "",
  role : "",
}

*/
const initialState = {
  userInfo:{}
}

const usersInfotSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers:{
    setInitialInfo : (state,action) => {
      state.userInfo = action.payload;
    },
    setPersonalEvents:(state,action) => {
      console.log("Payload", action.payload)
    },
    setCompletedfiles : (state,action) => {
      // console.log("Completed file action", action.payload)
      // console.log(" file id", action.payload.fileId)
      // state.userInfo.completedFiles.map(file => console.log(file.fileId))
      
      
      if(action.payload.type=='add'){
        
        state.userInfo = {
          ...state.userInfo,
          completedFiles: [...(state.userInfo.completedFiles || []), { year: '2024', fileId: action.payload.fileId} ] 
        }
          
      }else {
        state.userInfo = { 
          ...state.userInfo,
          completedFiles: (state.userInfo.completedFiles || []).filter(file => file.fileId != action.payload.fileId) 
        } 
      }
    

    },
    setPersonalNotifications:(state,action) => {
      console.log("Personal notification payload",action.payload)
      state.userInfo.personalNotifications = state.userInfo.personalNotifications || [];
      // Add the new notification
      state.userInfo.personalNotifications.push(action.payload);
    }
  }
})

export const {setInitialInfo, setPersonalEvents, setCompletedfiles,setPersonalNotifications} = usersInfotSlice.actions;
export default usersInfotSlice.reducer;