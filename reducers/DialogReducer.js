import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogs: {},
};

export const dialogSlice = createSlice({
  name: "DialogReducer",
  initialState,
  reducers: {
    toggleDialog: (state, action) => {
      if (state.dialogs.hasOwnProperty(action.payload)) {
        state.dialogs[action.payload] = !state.dialogs[action.payload];
      } else {
        state.dialogs[action.payload] = true;
      }
    },

    throwException: (state, action) => {
      state.exception = action.payload;
      if (state.dialogs.hasOwnProperty("exception")) {
        state.dialogs.exception = !state.dialogs.exception;
        if (state.dialogs.exception == false) {
          state.exception = null;
        }
      } else {
        state.dialogs.exception = true;
      }
    },
  },
});

export const { toggleDialog, throwException } = dialogSlice.actions;

export default dialogSlice.reducer;
