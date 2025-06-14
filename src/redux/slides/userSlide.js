import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  familyName: "",
  userName: "",
  userPhone: "",
  userEmail: "",
  userAddress: "",
  userWard: "",
  userDistrict: "",
  userCity: "",
  userImage: "",
  access_token: "",
  isLoggedIn: false,
  allUser: [], // Danh sách tất cả các status
  detailUser: {}, // Chi tiết một status cụ thể
  isAdmin: false,
  coins: 0, // Số xu của user
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
        userWard = "",
        userDistrict = "",
        userCity = "",
        userImage = "",
        access_token = "",
        isAdmin,
        coins = 0,
      } = action?.payload;
      // console.log("action", action.payload);
      state.id = _id;
      state.userName = userName || userEmail;
      state.familyName = familyName;
      state.userPhone = userPhone;
      state.userEmail = userEmail;
      state.userAddress = userAddress;
      state.userWard = userWard;
      state.userDistrict = userDistrict;
      state.userCity = userCity;
      state.userImage = userImage;
      state.access_token = access_token;
      state.isLoggedIn = !!access_token;
      state.isAdmin = isAdmin;
      state.coins = coins;
    },
    resetUser: (state) => {
      state.id = "";
      state.userName = "";
      state.familyName = "";
      state.userPhone = "";
      state.userEmail = "";
      state.userAddress = "";
      state.userWard = "";
      state.userDistrict = "";
      state.userCity = "";
      state.userImage = "";
      state.access_token = "";
      state.isAdmin = false;
      state.isLoggedIn = false;
      state.coins = 0;
    },

    setAllUser: (state, action) => {
      state.allUser = action.payload; // Lưu danh sách user từ API
    },
    setDetailUser: (state, action) => {
      state.detailUser = action.payload;
    }, // Lưu chi tiết một user từ API

    // Cập nhật số xu
    updateUserCoins: (state, action) => {
      state.coins = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUser,
  resetUser,
  setAllUser,
  setDetailUser,
  updateUserCoins,
} = userSlice.actions;

export default userSlice.reducer;
