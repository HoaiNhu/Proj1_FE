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
  allUser: [], // Danh sách tất cả các status
  detailUser: {}, // Chi tiết một status cụ thể
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

    setAllUser: (state, action) => {
      state.allUser = action.payload; // Lưu danh sách user từ API
    },
    setDetailUser: (state, action) => {
      state.detailUser = action.payload;
    }, // Lưu chi tiết một user từ API
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, setAllUser, setDetailUser } =
  userSlice.actions;

export default userSlice.reducer;
