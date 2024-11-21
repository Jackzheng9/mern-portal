import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
  currentFile:{},
  status:'All'
}

const resourceListSlice = createSlice({
  name: 'resourcesFilter',
  initialState,
  reducers:{
    setSearchTerm :(state,action) => {
      state.searchTerm = action.payload
    },
    setCurrentFile : (state,action) =>{
      state.currentFile = action.payload
    },
    setStatus : (state, action) => {
      state.status = action.payload
    }
  }
})

export const {setSearchTerm,setCurrentFile,setStatus } = resourceListSlice.actions;
export default resourceListSlice.reducer;