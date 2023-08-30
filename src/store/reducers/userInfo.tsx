import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: "",
  password: "",
  role: "",
};

const loggedUser = localStorage.getItem("userDataJson");

if (loggedUser !== null) {
  initialState = JSON.parse(loggedUser);
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addInStore(state, { payload }) {
      state = { ...payload };
      return state;
    },
    removeInStore(state) {
      state = initialState;
      return state;
    },
  },
});

export const { addInStore, removeInStore } = userInfoSlice.actions;
export default userInfoSlice.reducer;
