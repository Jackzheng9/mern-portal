import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchTerm:"",
}

const faqSlice = createSlice({
  name: 'faqFiler',
  initialState,
  reducers:{
    setSearchTerm :(state,action) => {
      state.searchTerm = action.payload
    },
  }
})

export const {setSearchTerm,setStatus } = faqSlice.actions;
export default faqSlice.reducer;