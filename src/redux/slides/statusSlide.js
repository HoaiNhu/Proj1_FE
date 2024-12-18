import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  statusCode: "",
  statusName: "",
  statusDescription: "",
  access_token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const {
        _id = "",
        statusCode = "",
        statusName = "",
        statusDescription = "",
        access_token = ""
      } = action?.payload;
      // console.log("action", action.payload);
      state.id = _id;
      state.statusCode = statusCode;
      state.statusName = statusName;
      state.statusDescription = statusDescription;
      state.access_token = access_token;
      state.isLoggedIn = !!access_token;
    },
    resetStatus: (state) => {
      state.id = "";
      state.statusCode = "";
      state.statusName = "";
      state.statusDescription = "";
      state.access_token = "";

      state.isLoggedIn = false;
    },
  },                   
});

// Action creators are generated for each case reducer function
export const { updateStatus, resetStatus } = userSlice.actions;

export default userSlice.reducer;
