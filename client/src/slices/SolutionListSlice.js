import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
  status:"All"
}

const solutionListSlice = createSlice({
  name: 'solutionsFilter',
  initialState,
  reducers:{
    setSearchTerm :(state,action) => {
      state.searchTerm = action.payload
    },
    setStatus : (state,action) => {
      state.status = action.payload
    }
  }
})

export const {setSearchTerm,setStatus } = solutionListSlice.actions;
export default solutionListSlice.reducer;