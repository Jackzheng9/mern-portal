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
      state.dateRange = action.payload;
    },
    
  }
})

export const {setStatus, setDate, setSearchTerm } = usersListSlice.actions;
export default usersListSlice.reducer;