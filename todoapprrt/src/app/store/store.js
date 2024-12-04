import { configureStore } from "@reduxjs/toolkit";
import todoReducers from "../../features/Todos/todoSlice"
const store = configureStore({
   reducer: {
    todos:todoReducers
   }  
});
export default store;