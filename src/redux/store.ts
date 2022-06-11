import {
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userEventsReducer from "./user-events";

const rootReducer = combineReducers({
    userEvents: userEventsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store;
