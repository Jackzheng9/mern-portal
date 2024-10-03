import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
}

const solutionListSlice = createSlice({
  name: 'solutionsFilter',
  initialState,
  reducers:{
    setSearchTerm :(state,action) => {
      state.searchTerm = action.payload
    }
  }
})

export const {setSearchTerm } = solutionListSlice.actions;
export default solutionListSlice.reducer;