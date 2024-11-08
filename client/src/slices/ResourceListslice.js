import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
  currentFile:{}
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
    }
  }
})

export const {setSearchTerm,setCurrentFile } = resourceListSlice.actions;
export default resourceListSlice.reducer;