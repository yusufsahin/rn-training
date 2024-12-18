import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import workitemReducer from './workitemSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    workitems: workitemReducer,
  },
});
