import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import TemplateReducer from "./reducers/TemplateReducer";
import GlobalReducer from "./reducers/GlobalReducer";
import DialogReducer from "./reducers/DialogReducer";
export const store = configureStore({
  reducer: {
    template: TemplateReducer,
    global: GlobalReducer,
    dialog: DialogReducer,
  },
  middleware: [logger],
});
