import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
  dateRange:{},
  status:"All"
}

const monthAiListSlice = createSlice({
  name: 'monthaiFilter',
  initialState,
  reducers:{
    setStatus : (state,action) => {
      state.status = action.payload;
    },
    setDate:(state,action) => {
      state.dateRange = action.payload;
    },
    setSearchTerm :(state,action) => {
      state.searchTerm = action.payload
    }
  }
})

export const {setStatus, setDate, setSearchTerm } = monthAiListSlice.actions;
export default monthAiListSlice.reducer;