import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("login action: ", action);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      // const response = accountsApi.endpoints.getAccountDetails(action);
      // console.log("response: ", response);
      state.user = action.payload.user;
    },
    logout: (state) => {
      console.log("inside AuthSlice logout");
      state.token = "";
      delete localStorage.token;
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
