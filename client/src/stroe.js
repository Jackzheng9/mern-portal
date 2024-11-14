import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import apiSlice from "./slices/apiSlice";
import usersListSliceReducer from "./slices/usersListSlice";
import solutionListSliceReducer from './slices/SolutionListSlice'
import resourceListSliceReducer from './slices/ResourceListslice'
import notificationReducer from './slices/NotificationSlice'


const store = configureStore({
  reducer:{
    auth:authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    usersFilter:usersListSliceReducer,
    solutionsFilter:solutionListSliceReducer,
    resourceFilter:resourceListSliceReducer,
    notification:notificationReducer,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
})


export default store;