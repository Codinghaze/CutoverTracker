import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  tempTemplate: {},
};

export const templateSlice = createSlice({
  name: "TemplateReducer",
  initialState,
  reducers: {
    resetTempTemplate: (state, action) => {
      state.tempTemplate = {};
    },
    setTempTemplateData: (state, action) => {
      state.tempTemplate[action.payload.type] = action.payload.value;
    },
    loadedTemplates: (state, action) => {
      state.templates = action.payload;
    },
  },
});

export const { loadedTemplates, setTempTemplateData, resetTempTemplate } =
  templateSlice.actions;

export default templateSlice.reducer;
