import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const {token } = action.payload;

      state.token = token;
      AsyncStorage.setItem('token', token);
    },
    logout: (state) => {

      state.token = null;
      AsyncStorage.removeItem('token');
    },
    rehydrate: (state, action) => {
      state.token = action.payload.token; // Restore token from AsyncStorage
    },

  },
});

export const { setCredentials, logout ,rehydrate} = authSlice.actions;
export default authSlice.reducer;
