import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
  dateRange:"",
  status:"All"
}

const usersListSlice = createSlice({
  name: 'usersFilter',
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

export const {setStatus, setDate, setSearchTerm } = usersListSlice.actions;
export default usersListSlice.reducer;