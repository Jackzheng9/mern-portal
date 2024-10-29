import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
}

const resourceListSlice = createSlice({
  name: 'resourcesFilter',
  initialState,
  reducers:{
    setSearchTerm :(state,action) => {
      state.searchTerm = action.payload
    }
  }
})

export const {setSearchTerm } = resourceListSlice.actions;
export default resourceListSlice.reducer;