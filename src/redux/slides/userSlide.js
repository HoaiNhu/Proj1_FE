import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  familyName: "",
  userName: "",
  userPhone: "",
  userEmail: "",
  userAddress: "",
  userImage: "",
  access_token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        familyName = "",
        userName = "",
        userPhone = "",
        userEmail = "",
        userAddress = "",
        userImage = "",
        access_token = "",
      } = action?.payload;
      // console.log("action", action.payload);
      state.id = _id;
      state.userName = userName || userEmail;
      state.familyName = familyName;
      state.userPhone = userPhone;
      state.userEmail = userEmail;
      state.userAddress = userAddress;
      state.userImage = userImage;
      state.access_token = access_token;
      state.isLoggedIn = !!access_token;
    },
    resetUser: (state) => {
      state.id = "";
      state.userName = "";
      state.familyName = "";
      state.userPhone = "";
      state.userEmail = "";
      state.userAddress = "";
      state.userImage = "";
      state.access_token = "";

      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
