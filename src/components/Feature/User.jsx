import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    signup: (state, action) => {
      state.user = action.payload;
    },
    signin: (state, action) => {
      state.user = action.payload;
    },
    node: (state, action) => {
      state.user = action.payload;
    },
     logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { signup ,signin,node} = userSlice.actions;

export const selecUser = (state) => state.user.user;

export default userSlice.reducer;
