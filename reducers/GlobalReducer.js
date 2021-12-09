import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "",
};

export const globalSlice = createSlice({
  name: "GlobalReducer",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { changeTab } = globalSlice.actions;

export default globalSlice.reducer;
