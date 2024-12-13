import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  access_token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { userName, userEmail, access_token } = action?.payload;
      console.log("action", action.payload);
      state.userName = userName || userEmail;
      state.userEmail = userEmail;
      state.access_token = access_token;
      state.isLoggedIn = !!access_token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
