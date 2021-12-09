import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "",
  user: null,
  tempUser: {},
};

export const globalSlice = createSlice({
  name: "GlobalReducer",
  initialState,
  reducers: {
    setTempUserData: (state, action) => {
      state.tempUser[action.payload.type] = action.payload.value;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { changeTab, setUser, setTempUserData } = globalSlice.actions;

export default globalSlice.reducer;
