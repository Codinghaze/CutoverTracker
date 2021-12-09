import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
};

export const templateSlice = createSlice({
  name: "TemplateReducer",
  initialState,
  reducers: {
    loadedTemplates: (state, action) => {
      state.templates = action.payload;
    },
  },
});

export const { loadedTemplates } = templateSlice.actions;

export default templateSlice.reducer;
